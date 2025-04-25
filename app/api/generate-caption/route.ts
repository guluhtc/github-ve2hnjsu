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

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { prompt } = body;

    if (!prompt || typeof prompt !== 'string') {
      return new NextResponse(
        JSON.stringify({ 
          error: "Valid prompt is required",
          details: "Please provide a valid text prompt"
        }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    console.log('Generating caption for prompt:', prompt);

    const completion = await openai.chat.completions.create({
      model: "meta-llama/llama-3.2-1b-instruct:free",
      messages: [
        {
          role: "system",
          content: "You are an expert Instagram caption writer. Create engaging, creative, and relevant captions that will help increase engagement."
        },
        {
          role: "user",
          content: `Generate an engaging Instagram caption for: ${prompt}`
        }
      ],
      max_tokens: 150,
      temperature: 0.7,
    });

    console.log('API Response:', completion);

    const caption = completion.choices[0]?.message?.content;

    if (!caption) {
      console.error('No caption generated in response');
      return new NextResponse(
        JSON.stringify({ 
          error: "No caption generated",
          details: "The AI model did not generate a caption"
        }),
        { 
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    return new NextResponse(
      JSON.stringify({ caption }),
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error("Error generating caption:", error);
    return new NextResponse(
      JSON.stringify({ 
        error: "Failed to generate caption",
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
} 