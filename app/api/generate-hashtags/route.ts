import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Get API key from environment or use fallback
const apiKey = process.env.OPENAI_API_KEY || "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";

if (!apiKey) {
  throw new Error('API key is required');
}

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: apiKey,
  defaultHeaders: {
    "HTTP-Referer": "https://techigem.com",
    "X-Title": "TechIGem",
  },
});

export const runtime = 'edge';

interface HashtagOptions {
  category: string;
  count: number;
  includeTrending: boolean;
  includeNiche: boolean;
  includeLocation: boolean;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { prompt, options } = body as { prompt: string; options: HashtagOptions };

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { 
          error: "Valid prompt is required",
          details: "Please provide a valid text prompt"
        },
        { 
          status: 400,
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
          }
        }
      );
    }

    console.log('Generating hashtags for prompt:', prompt, 'with options:', options);

    const systemPrompt = `You are an expert Instagram hashtag generator. Create relevant and engaging hashtags that will help increase post visibility.
Category: ${options.category}
Number of hashtags: ${options.count}
${options.includeTrending ? 'Include trending hashtags.' : ''}
${options.includeNiche ? 'Include niche-specific hashtags.' : ''}
${options.includeLocation ? 'Include location-based hashtags.' : ''}
Format the response as a list of hashtags, one per line.`;

    const completion = await openai.chat.completions.create({
      model: "meta-llama/llama-3.2-1b-instruct:free",
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: `Generate relevant Instagram hashtags for: ${prompt}`
        }
      ],
      max_tokens: 150,
      temperature: 0.7,
    });

    console.log('API Response:', completion);

    const hashtags = completion.choices[0]?.message?.content;

    if (!hashtags) {
      console.error('No hashtags generated in response');
      return NextResponse.json(
        { 
          error: "No hashtags generated",
          details: "The AI model did not generate any hashtags"
        },
        { 
          status: 500,
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
          }
        }
      );
    }

    // Process hashtags into an array
    const hashtagArray = hashtags
      .split('\n')
      .map(tag => tag.trim())
      .filter(tag => tag.startsWith('#'))
      .slice(0, options.count);

    return NextResponse.json(
      { hashtags: hashtagArray },
      { 
        status: 200,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
      }
    );
  } catch (error) {
    console.error("Error generating hashtags:", error);
    return NextResponse.json(
      { 
        error: "Failed to generate hashtags",
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { 
        status: 500,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
      }
    );
  }
}

// Handle OPTIONS request for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
} 