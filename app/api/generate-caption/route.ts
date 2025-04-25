import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": "https://techigem.com",
    "X-Title": "TechIGem",
  },
});

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
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

    return NextResponse.json({
      caption: completion.choices[0].message.content
    });
  } catch (error) {
    console.error("Error generating caption:", error);
    return NextResponse.json(
      { error: "Failed to generate caption" },
      { status: 500 }
    );
  }
} 