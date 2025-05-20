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
    "HTTP-Referer": "https://techigem.com", // Change to your site URL
    "X-Title": "TechIGem Caption Generator", // Change to your site name
  },
});

export async function POST(req: NextRequest) {
  try {
    const { prompt, options } = await req.json();
    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required.' }, { status: 400 });
    }

    // Compose a system prompt based on options
    let systemPrompt = `Generate 3 unique Instagram captions for: ${prompt}\n`;
    if (options) {
      systemPrompt += `Style: ${options.style}. Tone: ${options.tone}. Length: ${options.length} characters. `;
      systemPrompt += `Creativity: ${options.creativity}. `;
      if (options.includeHashtags) systemPrompt += `Include hashtags.`;
      if (options.includeEmojis) systemPrompt += `Include emojis.`;
    }
    systemPrompt += "Return each caption on a new line or as a numbered list.";

    const completion = await openai.chat.completions.create({
      model: "meta-llama/llama-3.3-8b-instruct:free",
      messages: [
        { role: "system", content: "You are an expert Instagram caption writer." },
        { role: "user", content: systemPrompt }
      ],
      max_tokens: 400,
      temperature: options?.creativity || 0.7,
    });

    const raw = completion.choices?.[0]?.message?.content?.trim() || "";
    // Split into captions (handle numbered or new line list)
    let captions = raw
      .split(/\n+/)
      .map(line => line.replace(/^\d+\.?\s*/, "").trim())
      .filter(Boolean);
    if (captions.length < 3) captions = [raw];
    return NextResponse.json({ captions });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to generate captions.' }, { status: 500 });
  }
} 