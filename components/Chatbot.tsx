'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { GoogleGenAI, Chat } from '@google/genai';
import { MessageSquareIcon, SendIcon, SparklesIcon } from './IconComponents';

interface Message {
  role: 'user' | 'model';
  text: string;
}

const QUICK_PROMPTS = [
  "What certifications does Syed hold?",
  "What are Syed's core skills?",
  "Tell me about his top projects",
  "Can Syed build AI agents?",
  "How can I contact or hire Syed?",
  "Download Syed's resume",
];

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
1. AI Resume Architect (https://resume-builder-ali.vercel.app):
   - Tech: Next.js, TypeScript, LLM APIs, Tailwind CSS
   - Highlights: Real-time ATS scoring, keyword auditing, 9 ATS-friendly templates, dynamic tailoring.
2. PDFKit — All-in-One PDF Toolkit & AI Chat (https://pdf-tools-with-ai-chat.vercel.app):
   - Tech: Next.js, Python, FastAPI, WebAssembly
   - Highlights: 44+ tools, 100% private on-device processing, multi-document AI workspace, document analysis.
3. Creative Realm Designs (https://creativerealmdesigns.com):
   - Tech: Next.js, React, Tailwind CSS
   - Highlights: High-end bespoke digital agency web platform, obsidian dark mode, sub-second performance, programmatic SEO growth.
4. Reverse Sales Tax Calculator (https://reversesalestaxcalculator.vercel.app):
   - Tech: Next.js, TypeScript
   - Highlights: Programmatic SEO financial platform for sales tax back-calculations and US/international rate lookups.
5. Zoryn Stacks (https://zorynstacks.com):
   - Tech: Next.js, React, TypeScript
   - Highlights: Production digital agency and engineering studio website for web apps, mobile products, and AI automation.

Verified Certifications & Credentials:
- Google AI Professional Certificate (Generative AI, Gemini APIs, Machine Learning, Computer Vision, NLP, TensorFlow)
- IBM AI Developer Professional Certificate (Python AI Stack, IBM Watson, LLMs, Prompt Engineering, AI Architectures)
- Governor Sindh IT Initiative (GIAIC): AI, Web 3.0 & Metaverse Specialization (Agentic AI, OpenAI Agents SDK, Next.js, TypeScript) — Currently Enrolled / In Progress
- Mobile Application Development (Flutter) from Jawan Pakistan
- NAVTTC Amazon E-Commerce & Operations (Honors, Government of Pakistan)
- BS Software Engineering (UBIT, University of Karachi, 6th Semester)

Work Experience:
- Full Stack Developer at Ventora Business Solutions (Apr 2026 — Jun 2026): Engineered responsive client interfaces and API microservices using modern Next.js and REST architectures.
`;

// Comprehensive offline fallback answering engine covering all facets of Syed's profile
function getComprehensiveReply(rawQuery: string): string {
  const q = rawQuery.toLowerCase().trim();

  // 1. Resume / CV requests
  if (q.includes('resume') || q.includes('cv') || q.includes('curriculum vitae') || q.includes('download')) {
    return "You can download Syed's official resume directly here: [Download Syed Ali Hashmi's Resume](/Syed%20Ali%20Hashmi%20Resume.pdf). It covers his software engineering coursework at UBIT, project track record, and verified Google & IBM credentials.";
  }

  // 2. Specific Projects
  if (q.includes('pdfkit') || q.includes('pdf tool') || q.includes('pdf')) {
    return "**PDFKit — All-in-One PDF Toolkit & AI Chat** is built with Next.js, Python, and FastAPI. It offers 44+ PDF tools, 100% private on-device processing, and a Multi-Document AI Workspace for chatting with documents. Live demo: [PDFKit on Vercel](https://pdf-tools-with-ai-chat.vercel.app).";
  }

  if (q.includes('resume architect') || q.includes('resume builder') || (q.includes('ats') && !q.includes('certif'))) {
    return "**AI Resume Architect** is built with Next.js, TypeScript, and LLM APIs. It provides real-time ATS scoring, keyword gap auditing, and 9 ATS-friendly templates to help job seekers land interviews. Live demo: [AI Resume Architect](https://resume-builder-ali.vercel.app).";
  }

  if (q.includes('creative realm') || q.includes('agency platform')) {
    return "**Creative Realm Designs** is a high-end bespoke digital agency web platform featuring sub-second performance, high-conversion UI architecture, and programmatic Google SEO growth. Live demo: [Creative Realm Designs](https://creativerealmdesigns.com/).";
  }

  if (q.includes('tax') || q.includes('reverse sales tax') || q.includes('calculator')) {
    return "**Reverse Sales Tax Calculator** is a programmatic SEO financial platform built with Next.js & TypeScript, providing sales tax back-calculations and US/international rate lookups. Live demo: [Reverse Sales Tax Calculator](https://reversesalestaxcalculator.vercel.app).";
  }

  if (q.includes('zoryn') || q.includes('zoryn stacks')) {
    return "**Zoryn Stacks** is a production digital agency and engineering studio website showcasing modern web apps, mobile products, and AI automation. Check it out at [zorynstacks.com](https://zorynstacks.com).";
  }

  if (q.includes('project') || q.includes('portfolio') || q.includes('work') || q.includes('built') || q.includes('apps')) {
    return "Syed has built several notable production applications:\n\n" +
      "1. **AI Resume Architect**: Next.js & LLM-powered ATS resume builder ([Demo](https://resume-builder-ali.vercel.app))\n" +
      "2. **PDFKit**: All-in-One 44+ PDF toolkit with Multi-Doc AI Workspace ([Demo](https://pdf-tools-with-ai-chat.vercel.app))\n" +
      "3. **Creative Realm Designs**: Bespoke digital agency platform ([Live Site](https://creativerealmdesigns.com/))\n" +
      "4. **Reverse Sales Tax Calculator**: Programmatic SEO financial engine ([Demo](https://reversesalestaxcalculator.vercel.app))\n" +
      "5. **Zoryn Stacks**: Engineering studio platform ([Demo](https://zorynstacks.com))";
  }

  // 3. Certifications & Credentials
  if (
    q.includes('certif') ||
    q.includes('credential') ||
    q.includes('google ai') ||
    q.includes('ibm') ||
    q.includes('giaic') ||
    q.includes('governor') ||
    q.includes('navttc') ||
    q.includes('license')
  ) {
    return "Syed holds verified credentials from leading organizations:\n\n" +
      "• **Google AI Professional Certificate**: Generative AI, Gemini APIs, Machine Learning, TensorFlow, NLP\n" +
      "• **IBM AI Developer Professional Certificate**: Python AI Stack, Watson, LLMs, AI Architectures\n" +
      "• **Governor Sindh IT Initiative (GIAIC)**: AI, Web 3.0 & Metaverse Specialization (Agentic AI, OpenAI Agents SDK)\n" +
      "• **Mobile App Development (Flutter)** from Jawan Pakistan\n" +
      "• **NAVTTC Amazon E-Commerce & Operations Honors** (Government of Pakistan)\n" +
      "• **BS Software Engineering** (UBIT, University of Karachi, 6th Semester)";
  }

  // 4. Skills & Tech Stack
  if (
    q.includes('skill') ||
    q.includes('tech') ||
    q.includes('stack') ||
    q.includes('language') ||
    q.includes('framework') ||
    q.includes('react') ||
    q.includes('next') ||
    q.includes('python') ||
    q.includes('typescript') ||
    q.includes('fastapi') ||
    q.includes('flutter')
  ) {
    return "Syed's core technical arsenal includes:\n\n" +
      "• **Languages**: TypeScript, Python, Dart, JavaScript, SQL\n" +
      "• **Frontend**: Next.js (App Router), React 19, Flutter, Tailwind CSS\n" +
      "• **Backend**: Node.js, FastAPI, REST APIs, Microservices\n" +
      "• **AI & Automation**: OpenAI SDK, OpenAI Agents SDK, Google Gemini API, LLM integration, Agentic workflows\n" +
      "• **Dev & Ops**: Git, GitHub, Vercel, VS Code";
  }

  // 5. AI Capabilities & Agentic workflows
  if (q.includes('agent') || q.includes('ai workflow') || q.includes('llm') || q.includes('genai') || q.includes('gemini') || q.includes('openai')) {
    return "Yes! Syed specializes in AI engineering and Agentic systems. He builds autonomous agent workflows with the OpenAI Agents SDK, integrates Gemini and OpenAI models into web apps, implements function calling, RAG pipelines, and creates tools like AI Resume Architect and PDFKit AI Chat.";
  }

  // 6. Mobile Application Development
  if (q.includes('mobile') || q.includes('flutter') || q.includes('android') || q.includes('ios') || q.includes('dart')) {
    return "Yes, Syed is certified in **Mobile Application Development with Flutter** from Jawan Pakistan. He builds cross-platform mobile apps using Flutter and Dart, connecting them seamlessly to REST backends and AI services.";
  }

  // 7. Education & University
  if (q.includes('education') || q.includes('study') || q.includes('ubit') || q.includes('university') || q.includes('karachi') || q.includes('semester') || q.includes('degree') || q.includes('college')) {
    return "Syed is pursuing a **Bachelor of Science in Software Engineering (BSSE)** at **UBIT, University of Karachi**, currently in his 6th semester. His coursework focuses on Data Structures, Algorithms, Software Architecture, and Distributed Systems. He is also enrolled in the prestigious Governor Sindh IT Initiative (GIAIC).";
  }

  // 8. Work Experience / Company
  if (q.includes('experience') || q.includes('work') || q.includes('job') || q.includes('ventora') || q.includes('company') || q.includes('history')) {
    return "Syed worked as a **Full Stack Developer at Ventora Business Solutions** (Apr 2026 — Jun 2026), where he engineered responsive client interfaces and API microservices using Next.js and REST architectures. In addition, he develops production web platforms through his studio Zoryn Stacks.";
  }

  // 9. Contact / Hiring / Availability / Location
  if (
    q.includes('contact') ||
    q.includes('hire') ||
    q.includes('email') ||
    q.includes('phone') ||
    q.includes('call') ||
    q.includes('message') ||
    q.includes('reach') ||
    q.includes('available') ||
    q.includes('location') ||
    q.includes('where') ||
    q.includes('pakistan')
  ) {
    return "Syed is based in **Karachi, Pakistan** and is actively open to **full-stack, software engineering, and AI developer roles** (full-time, internships, or contract).\n\n" +
      "• **Email**: [hashmi.ali2288@gmail.com](mailto:hashmi.ali2288@gmail.com)\n" +
      "• **Phone**: [+92 319 7345923](tel:+923197345923)\n" +
      "• **LinkedIn**: [linkedin.com/in/hashmiali2288](https://linkedin.com/in/hashmiali2288)\n" +
      "• **GitHub**: [github.com/alihashmi2288](https://github.com/alihashmi2288)";
  }

  // 10. Why hire Syed?
  if (q.includes('why') || q.includes('hire') || q.includes('recommend') || q.includes('strength') || q.includes('good')) {
    return "Syed brings a rare blend of **rigorous software engineering foundations** (BSSE at UBIT), modern **full-stack web mastery** (Next.js, React 19, TypeScript), and practical **AI automation expertise** (OpenAI Agents SDK, Gemini). He is disciplined, verified by Google & IBM, and has proven live production projects with real users.";
  }

  // 11. Who is Syed / Overview
  if (q.includes('who is') || q.includes('about') || q.includes('introduce') || q.includes('tell me about him') || q.includes('summary')) {
    return "Syed Ali Hashmi is a Software Engineering student at UBIT, University of Karachi (6th semester) and an AI/Full-Stack developer from Karachi, Pakistan. He builds production-grade Next.js web applications, Python/FastAPI backends, and autonomous agent workflows. Feel free to ask about his projects, certifications, or how to hire him!";
  }

  // General default fallback
  return `Syed Ali Hashmi is a full-stack engineer and AI specialist based in Karachi, Pakistan. He specializes in TypeScript, Next.js, React 19, Python, and Agentic AI workflows, and holds Google & IBM AI professional certificates. 

You can ask me specifically about his **projects**, **skills**, **certifications**, **education**, or get his **contact details**!`;
}

// Helper to render basic markdown links and bold formatting safely
function renderFormattedText(text: string) {
  // Split text into paragraphs/lines
  const lines = text.split('\n');

  return (
    <div className="space-y-1.5">
      {lines.map((line, lIdx) => {
        if (!line.trim()) return <div key={lIdx} className="h-1" />;

        // Match markdown links [text](url) and bold **text**
        const parts: React.ReactNode[] = [];
        let remaining = line;
        let pKey = 0;

        // Simple token matching
        const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
        let lastIndex = 0;
        let match: RegExpExecArray | null;

        while ((match = linkRegex.exec(remaining)) !== null) {
          // Push text before link
          if (match.index > lastIndex) {
            const before = remaining.substring(lastIndex, match.index);
            parts.push(renderBoldSpans(before, `${lIdx}-${pKey++}`));
          }

          const linkText = match[1];
          const linkHref = match[2];
          const isDownload = linkHref.includes('.pdf');

          parts.push(
            <a
              key={`${lIdx}-${pKey++}`}
              href={linkHref}
              target={linkHref.startsWith('http') || isDownload ? '_blank' : undefined}
              rel="noopener noreferrer"
              download={isDownload ? 'Syed Ali Hashmi Resume.pdf' : undefined}
              className="font-medium text-[#0070f3] hover:underline underline-offset-2 break-all inline-flex items-center gap-1"
            >
              {linkText}
              {linkHref.startsWith('http') && (
                <svg className="w-3 h-3 inline-block shrink-0 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </a>
          );

          lastIndex = linkRegex.lastIndex;
        }

        if (lastIndex < remaining.length) {
          parts.push(renderBoldSpans(remaining.substring(lastIndex), `${lIdx}-${pKey++}`));
        }

        return <p key={lIdx} className="leading-relaxed">{parts}</p>;
      })}
    </div>
  );
}

function renderBoldSpans(text: string, baseKey: string): React.ReactNode {
  const boldParts = text.split(/(\*\*[^*]+\*\*)/g);
  return boldParts.map((sub, i) => {
    if (sub.startsWith('**') && sub.endsWith('**')) {
      return (
        <strong key={`${baseKey}-${i}`} className="font-semibold text-[#171717]">
          {sub.slice(2, -2)}
        </strong>
      );
    }
    return <span key={`${baseKey}-${i}`}>{sub}</span>;
  });
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      text: "Hi! I'm Syed Ali Hashmi's AI portfolio assistant. Ask me anything about his full-stack engineering, AI projects, certifications, or how to get in touch.",
    },
  ]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef<Chat | null>(null);
  const chatBodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize Gemini if an API key is available in environment
  useEffect(() => {
    if (isOpen && !chatRef.current) {
      try {
        const apiKey =
          (typeof process !== 'undefined' && process.env?.API_KEY) ||
          (typeof window !== 'undefined' && (window as unknown as { GEMINI_API_KEY?: string }).GEMINI_API_KEY) ||
          (typeof import.meta !== 'undefined' && (import.meta as unknown as { env?: { VITE_GEMINI_API_KEY?: string; VITE_API_KEY?: string } }).env?.VITE_GEMINI_API_KEY) ||
          (typeof import.meta !== 'undefined' && (import.meta as unknown as { env?: { VITE_GEMINI_API_KEY?: string; VITE_API_KEY?: string } }).env?.VITE_API_KEY);

        if (apiKey) {
          const ai = new GoogleGenAI({ apiKey });
          chatRef.current = ai.chats.create({
            model: 'gemini-2.5-flash',
            config: {
              systemInstruction: `You are a friendly, knowledgeable AI assistant on Syed Ali Hashmi's developer portfolio website. Answer questions based on this profile: ${PERSONAL_INFO}. Keep answers concise, natural, and helpful (2-4 sentences max). If asked if you can build something, talk about Syed's capabilities. If asked for contact details, provide hashmi.ali2288@gmail.com or +92 319 7345923. Always be professional, warm, and highlight Syed's engineering expertise.`,
            },
          });
        }
      } catch (error) {
        console.warn('Chatbot live Gemini model setup deferred to knowledge engine:', error);
      }
    }
  }, [isOpen]);

  // Autofocus input when opened and scroll to bottom
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [isOpen]);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const sendMessage = useCallback(async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', text: textToSend };
    setMessages((prev) => [...prev, userMessage]);
    setUserInput('');
    setIsLoading(true);

    try {
      if (chatRef.current) {
        const response = await chatRef.current.sendMessage({ message: textToSend });
        if (response.text) {
          setMessages((prev) => [...prev, { role: 'model', text: response.text }]);
          setIsLoading(false);
          return;
        }
      }

      // Try server-side Next.js route handler
      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: textToSend }),
        });
        if (res.ok) {
          const data = await res.json();
          if (data?.text) {
            setMessages((prev) => [...prev, { role: 'model', text: data.text }]);
            setIsLoading(false);
            return;
          }
        }
      } catch (routeErr) {
        // Fall through to offline knowledge engine
      }

      // Comprehensive offline intelligent knowledge engine
      setTimeout(() => {
        const reply = getComprehensiveReply(textToSend);
        setMessages((prev) => [...prev, { role: 'model', text: reply }]);
        setIsLoading(false);
      }, 350);
    } catch (error) {
      console.warn('Live API response failed, fallback to knowledge engine:', error);
      const reply = getComprehensiveReply(textToSend);
      setMessages((prev) => [...prev, { role: 'model', text: reply }]);
      setIsLoading(false);
    }
  }, [isLoading]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(userInput);
  };

  const clearChat = () => {
    setMessages([
      {
        role: 'model',
        text: "Chat cleared! What else would you like to know about Syed Ali Hashmi's work?",
      },
    ]);
  };

  return (
    <>
      {/* Floating Toggle Button: Fixed at bottom right */}
      <button
        id="chatbot-toggle-btn"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-[60] w-14 h-14 p-3.5 rounded-full bg-[#171717] text-white shadow-floating transition-[transform,background-color] duration-160 ease-out-strong active:scale-[0.97] group flex items-center justify-center cursor-pointer will-change-transform"
        aria-label="Toggle AI Portfolio Assistant"
        aria-expanded={isOpen}
      >
        <div className="relative w-6 h-6 flex items-center justify-center">
          <span
            className={`absolute transition-[transform,opacity] duration-200 ease-out-strong ${
              isOpen ? 'rotate-90 opacity-100 scale-100' : 'rotate-0 opacity-0 scale-90 pointer-events-none'
            }`}
          >
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </span>
          <span
            className={`absolute transition-[transform,opacity] duration-200 ease-out-strong ${
              !isOpen ? 'rotate-0 opacity-100 scale-100' : '-rotate-90 opacity-0 scale-90 pointer-events-none'
            }`}
          >
            <MessageSquareIcon className="w-6 h-6 text-white" />
            <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#50e3c2] ring-2 ring-[#171717]"></span>
          </span>
        </div>
      </button>

      {/* Floating Chat Modal: Positioned right above the floating toggle button */}
      <div
        id="chatbot-modal-window"
        className={`fixed bottom-[84px] sm:bottom-[88px] right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-[410px] h-[560px] max-h-[calc(100vh-110px)] z-[60] transition-[transform,opacity] duration-200 ease-out-strong origin-bottom-right will-change-[transform,opacity] ${
          isOpen
            ? 'opacity-100 scale-100 pointer-events-auto'
            : 'opacity-0 scale-95 pointer-events-none'
        }`}
        role="dialog"
        aria-label="AI Portfolio Assistant"
        aria-hidden={!isOpen}
      >
        <div className="h-full flex flex-col bg-white border border-[#ebebeb] rounded-[16px] shadow-floating-lg overflow-hidden">
          {/* Header */}
          <header className="p-3.5 border-b border-[#ebebeb] bg-white flex items-center justify-between select-none">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-[6px] bg-[#f2f2f2] border border-[#ebebeb] flex items-center justify-center text-[#171717]">
                <SparklesIcon className="w-3.5 h-3.5" />
              </div>
              <div>
                <h3 className="font-semibold text-[#171717] text-sm flex items-center gap-1.5">
                  <span>AI Assistant</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-[4px] bg-[#f2f2f2] border border-[#ebebeb] text-[#171717] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#50e3c2]"></span>
                    Active
                  </span>
                </h3>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={clearChat}
                className="text-[#8f8f8f] hover:text-[#171717] px-2 py-1 rounded-[6px] hover:bg-[#f2f2f2] text-xs font-mono transition-[background-color,color,transform] duration-160 ease-out-strong active:scale-[0.97]"
                title="Clear chat history"
              >
                Clear
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-[#8f8f8f] hover:text-[#171717] p-1.5 rounded-[6px] hover:bg-[#f2f2f2] text-lg leading-none transition-[background-color,color,transform] duration-160 ease-out-strong active:scale-[0.97]"
                aria-label="Close chat"
              >
                &times;
              </button>
            </div>
          </header>

          {/* Quick Prompts Carousel */}
          <div className="px-3 py-2 bg-[#fafafa] border-b border-[#ebebeb] flex gap-1.5 overflow-x-auto no-scrollbar">
            {QUICK_PROMPTS.map((prompt, i) => (
              <button
                key={i}
                onClick={() => sendMessage(prompt)}
                className="shrink-0 text-[11px] font-mono font-medium px-2.5 py-1 rounded-[64px] bg-white hover:bg-[#f2f2f2] border border-[#ebebeb] text-[#4d4d4d] hover:text-[#171717] transition-[background-color,color,transform] duration-160 ease-out-strong active:scale-[0.97] whitespace-nowrap shadow-whisper cursor-pointer"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Messages Body */}
          <div ref={chatBodyRef} className="flex-1 p-4 overflow-y-auto space-y-3 bg-white">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`chat-message-bubble flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[88%] text-xs sm:text-sm py-2.5 px-3.5 leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-[#171717] text-white rounded-[12px] rounded-br-[2px] shadow-whisper'
                      : 'bg-[#f8f9fa] text-[#171717] border border-[#ebebeb] rounded-[12px] rounded-bl-[2px]'
                  }`}
                >
                  {renderFormattedText(msg.text)}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="py-2.5 px-4 rounded-[12px] rounded-bl-[2px] bg-[#f8f9fa] border border-[#ebebeb] text-[#8f8f8f] text-xs flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#171717] animate-pulse"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#171717] animate-pulse [animation-delay:150ms]"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#171717] animate-pulse [animation-delay:300ms]"></div>
                  <span className="text-[11px] font-mono ml-1 text-[#8f8f8f]">thinking...</span>
                </div>
              </div>
            )}
          </div>

          {/* Input Form */}
          <form
            onSubmit={handleSendMessage}
            className="p-2.5 border-t border-[#ebebeb] bg-[#fafafa] flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Ask about skills, projects, certifications, hiring..."
              className="flex-grow bg-white border border-[#ebebeb] rounded-[6px] px-3.5 py-2 text-xs sm:text-sm text-[#171717] placeholder-[#8f8f8f] focus:outline-none focus:border-[#0070f3] focus:ring-1 focus:ring-[#0070f3] shadow-whisper transition-[border-color,box-shadow] duration-150 ease-out"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !userInput.trim()}
              className="p-2.5 rounded-[6px] bg-[#171717] hover:bg-black/90 text-white disabled:opacity-40 transition-[background-color,transform] duration-160 ease-out-strong active:scale-[0.97] shadow-sm shrink-0 cursor-pointer flex items-center justify-center"
              aria-label="Send message"
            >
              <SendIcon className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Chatbot;