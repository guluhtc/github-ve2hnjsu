import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  throw new Error('API key is required');
}

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: apiKey,
  defaultHeaders: {
    "HTTP-Referer": "https://techigem.com",
    "X-Title": "TechIGem Bio Generator",
  },
});

export const runtime = 'edge';

interface BioOptions {
  style: string;
  tone: string;
  length: number;
  includeEmojis: boolean;
  includeCallToAction: boolean;
  creativity: number;
  includeHashtags: boolean;
}

export async function POST(req: NextRequest) {
  try {
    const { prompt, options } = await req.json();
    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required.' }, { status: 400 });
    }
    let systemPrompt = `Generate 3 unique Instagram bios for: ${prompt}\n`;
    if (options) {
      systemPrompt += `Style: ${options.style}. Tone: ${options.tone}. Length: ${options.length} characters. `;
      systemPrompt += `Creativity: ${options.creativity}. `;
      if (options.includeHashtags) systemPrompt += `Include hashtags.`;
      if (options.includeEmojis) systemPrompt += `Include emojis.`;
    }
    systemPrompt += "Return each bio on a new line or as a numbered list.";
    const completion = await openai.chat.completions.create({
      model: "meta-llama/llama-3.3-8b-instruct:free",
      messages: [
        { role: "system", content: "You are an expert Instagram bio writer." },
        { role: "user", content: systemPrompt }
      ],
      max_tokens: 400,
      temperature: options?.creativity || 0.7,
    });
    const raw = completion.choices?.[0]?.message?.content?.trim() || "";
    let bios = raw
      .split(/\n+/)
      .map(line => line.replace(/^\d+\.?\s*/, "").trim())
      .filter(Boolean);
    if (bios.length < 3) bios = [raw];
    return NextResponse.json({ bios });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to generate bios.' }, { status: 500 });
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