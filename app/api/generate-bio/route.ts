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

interface BioOptions {
  style: string;
  tone: string;
  length: number;
  includeEmojis: boolean;
  includeCallToAction: boolean;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { prompt, options } = body as { prompt: string; options: BioOptions };

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

    console.log('Generating bio for prompt:', prompt, 'with options:', options);

    // Calculate max tokens based on length percentage
    const maxTokens = Math.floor(150 * (options.length / 100));

    const systemPrompt = `You are an expert Instagram bio writer. Create engaging, creative, and relevant bios that will help increase profile engagement.
Style: ${options.style}
Tone: ${options.tone}
${options.includeEmojis ? 'Use appropriate emojis to enhance the message.' : ''}
${options.includeCallToAction ? 'Include a call to action at the end.' : ''}
Keep the bio length appropriate for Instagram.`;

    const completion = await openai.chat.completions.create({
      model: "meta-llama/llama-3.2-1b-instruct:free",
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: `Generate an engaging Instagram bio for: ${prompt}`
        }
      ],
      max_tokens: maxTokens,
      temperature: 0.7,
    });

    console.log('API Response:', completion);

    const bio = completion.choices[0]?.message?.content;

    if (!bio) {
      console.error('No bio generated in response');
      return NextResponse.json(
        { 
          error: "No bio generated",
          details: "The AI model did not generate a bio"
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

    return NextResponse.json(
      { bio },
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
    console.error("Error generating bio:", error);
    return NextResponse.json(
      { 
        error: "Failed to generate bio",
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