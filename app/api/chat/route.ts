import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const PERSONAL_INFO = `
Syed Ali Hashmi is a Software Engineering student at UBIT, University of Karachi (currently in his 6th semester).
He specializes in full-stack development, modern web applications, AI-powered systems, and autonomous agent workflows, operating at an intermediate engineering level.

Contact & Socials:
- Email: hashmi.ali2288@gmail.com
- Phone: +92 319 7345923
- Location: Karachi, Pakistan
- LinkedIn: https://linkedin.com/in/hashmiali2288
- GitHub: https://github.com/alihashmi2288
- Resume: /Syed%20Ali%20Hashmi%20Resume.pdf
- Availability: Open to full-stack, software engineering, and AI engineering roles (full-time, internships, and freelance/contract).

Core Technical Stack:
- Languages: TypeScript, Python, Dart, JavaScript
- Frontend: Next.js (App Router), React 19, Flutter, Tailwind CSS, HTML5, modern CSS
- Backend & APIs: Node.js, FastAPI, REST APIs, Microservices
- AI & Automation: OpenAI SDK, OpenAI Agents SDK, Google Gemini API, LLM integration, Agentic workflows, prompt engineering
- Tools & Cloud: Git, GitHub, Vercel, VS Code

Key Projects:
1. AI Resume Architect (https://resume-builder-ali.vercel.app): Next.js, TypeScript, LLM APIs, Tailwind CSS. Real-time ATS scoring, keyword auditing, 9 templates.
2. PDFKit — All-in-One PDF Toolkit & AI Chat (https://pdf-tools-with-ai-chat.vercel.app): Next.js, Python, FastAPI, WebAssembly. 44+ tools, 100% private on-device processing.
3. Creative Realm Designs (https://creativerealmdesigns.com): Next.js, React, Tailwind CSS. Bespoke digital agency web platform.
4. Reverse Sales Tax Calculator (https://reversesalestaxcalculator.vercel.app): Next.js, TypeScript. Programmatic SEO financial platform.
5. Zoryn Stacks (https://zorynstacks.com): Next.js, React, TypeScript. Digital agency & engineering studio.

Verified Certifications:
- Google AI Professional Certificate
- IBM AI Developer Professional Certificate
- Governor Sindh IT Initiative (GIAIC): AI, Web 3.0 & Metaverse Specialization (In Progress)
- Mobile Application Development (Flutter) from Jawan Pakistan
- NAVTTC Amazon E-Commerce & Operations (Honors)
- BS Software Engineering (UBIT, University of Karachi, 6th Semester)
`;

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY || process.env.VITE_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 503 });
    }

    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are a friendly, knowledgeable AI assistant on Syed Ali Hashmi's developer portfolio website. Answer questions based on this profile: ${PERSONAL_INFO}. Keep answers concise, natural, and helpful (2-4 sentences max). If asked if you can build something, talk about Syed's capabilities. If asked for contact details, provide hashmi.ali2288@gmail.com or +92 319 7345923. Always be professional, warm, and highlight Syed's engineering expertise.\n\nUser Question: ${message}`,
    });

    return NextResponse.json({ text: response.text });
  } catch (error: any) {
    console.warn('Server-side Gemini generation error:', error?.message || error);
    return NextResponse.json(
      { error: error?.message || 'Failed to generate response' },
      { status: 500 }
    );
  }
}
