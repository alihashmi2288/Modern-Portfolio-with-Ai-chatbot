import { NextResponse } from 'next/server';
import { GoogleGenAI, Type } from '@google/genai';

export async function POST(req: Request) {
  try {
    const { query } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY || process.env.VITE_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 503 });
    }

    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `
        You are an expert project idea generator for a full-stack developer's portfolio.
        The developer's skills include React, Next.js, TypeScript, Flutter, Python, Node.js, FastAPI, and OpenAI SDK.
        Generate a unique, modern, and production-viable project idea. 
        Base the idea on these keywords if provided: "${query || ''}". 
        If no keywords are provided, generate a creative idea based on the developer's skills.
        The description should be concise and compelling, around 2-3 sentences.
      `,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            tags: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
          },
        },
      },
    });

    if (response.text) {
      const parsed = JSON.parse(response.text);
      return NextResponse.json(parsed);
    }

    return NextResponse.json({ error: 'No output generated' }, { status: 500 });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Generation error' }, { status: 500 });
  }
}
