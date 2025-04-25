import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY || "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",
  defaultHeaders: {
    "HTTP-Referer": "https://techigem.com",
    "X-Title": "TechIGem",
  },
});

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { error: "Valid prompt is required" },
        { status: 400 }
      );
    }

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

    const caption = completion.choices[0]?.message?.content;

    if (!caption) {
      throw new Error('No caption generated');
    }

    return NextResponse.json({ caption });
  } catch (error) {
    console.error("Error generating caption:", error);
    return NextResponse.json(
      { error: "Failed to generate caption" },
      { status: 500 }
    );
  }
} 