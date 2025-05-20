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
    "X-Title": "TechIGem Hashtag Generator",
  },
});

export async function POST(req: NextRequest) {
  try {
    const { prompt, options } = await req.json();
    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required.' }, { status: 400 });
    }
    let systemPrompt = `Generate a list of 10-20 unique, relevant Instagram hashtags for: ${prompt}\n`;
    if (options) {
      systemPrompt += `Style: ${options.style}. Tone: ${options.tone}. `;
      systemPrompt += `Creativity: ${options.creativity}. `;
    }
    systemPrompt += "Return only the hashtags, separated by spaces or new lines.";
    const completion = await openai.chat.completions.create({
      model: "meta-llama/llama-3.3-8b-instruct:free",
      messages: [
        { role: "system", content: "You are an expert Instagram hashtag generator." },
        { role: "user", content: systemPrompt }
      ],
      max_tokens: 200,
      temperature: options?.creativity || 0.7,
    });
    const raw = completion.choices?.[0]?.message?.content?.trim() || "";
    // Split hashtags by space or new line, filter for #
    let hashtags = raw.split(/\s+/).filter(tag => tag.startsWith('#'));
    if (hashtags.length < 5) hashtags = [raw];
    return NextResponse.json({ hashtags });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to generate hashtags.' }, { status: 500 });
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