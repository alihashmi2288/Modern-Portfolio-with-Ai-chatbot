import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Chat } from '@google/genai';
import { MessageSquareIcon, SendIcon, SparklesIcon } from './IconComponents';

interface Message {
  role: 'user' | 'model';
  text: string;
}

const QUICK_PROMPTS = [
  "What are Syed's core skills?",
  "Tell me about his AI Resume Builder",
  "What is his education background?",
  "How can I contact or hire Syed?",
];

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      text: "👋 Hi there! I'm Syed's AI assistant. Ask me anything about his full-stack experience, AI projects, or how to get in touch!",
    },
  ]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef<Chat | null>(null);
  const chatBodyRef = useRef<HTMLDivElement>(null);

  const personalInfo = `
    Syed Ali Hashmi is a Software Engineering student at UBIT, University of Karachi (currently in his 6th semester). 
    He specializes in full-stack development, AI-powered applications, and automation, operating at an intermediate engineering level.
    
    Contact:
    - Email: hashmi.ali2288@gmail.com
    - Phone: +92 319 7345923
    - Location: Karachi, Pakistan
    - LinkedIn: linkedin.com/in/hashmiali2288
    - GitHub: github.com/alihashmi2288

    Skills:
    - Languages: TypeScript, Python, Dart, JavaScript
    - Frontend: Next.js, React, Flutter, Tailwind CSS
    - Backend: Node.js, FastAPI, REST APIs
    - AI & Automation: OpenAI SDK, OpenAI Agents SDK, LLM Integration, Agentic Workflows
    - Tools: Git, GitHub, Vercel

    Key Projects:
    1. AI-Powered Resume Builder (resume-builder-ali.vercel.app): Next.js, TypeScript, LLM APIs. Parses input and creates ATS-friendly resumes.
    2. PDF Tools with AI Chat (pdf-tools-with-ai-chat.vercel.app): Next.js, Python, FastAPI. Upload PDFs and converse with document contents.
    3. Creative Realm Designs (creative-realm-designs.vercel.app): High-end digital agency web3 landing page with obsidian dark mode and glassmorphism.
    4. Reverse Sales Tax Calculator (reversesalestaxcalculator.vercel.app): Next.js & TypeScript financial utility.
    5. The Codrex (thecodrex.com): Digital agency website with custom performant UI/UX.

    Education & Certifications:
    - BS Software Engineering (UBIT, University of Karachi, 6th Sem)
    - Governor Sindh IT Initiative (GIAIC): AI, Web 3.0 & Metaverse
    - Mobile Application Development (Flutter) from Jawan Pakistan
    - NAVTTC Amazon Private Label certification
  `;

  useEffect(() => {
    if (isOpen && !chatRef.current) {
      try {
        const apiKey = process.env.API_KEY || (typeof window !== 'undefined' && (window as unknown as { GEMINI_API_KEY?: string }).GEMINI_API_KEY);
        if (apiKey) {
          const ai = new GoogleGenAI({ apiKey });
          chatRef.current = ai.chats.create({
            model: 'gemini-2.5-flash',
            config: {
              systemInstruction: `You are a friendly, knowledgeable AI assistant on Syed Ali Hashmi's developer portfolio website. Answer questions based on this profile: ${personalInfo}. Keep answers concise, natural, and helpful (2-4 sentences max). If asked if you can build something, talk about Syed's capabilities. If asked for contact details, provide hashmi.ali2288@gmail.com or +92 319 7345923.`,
            },
          });
        }
      } catch (error) {
        console.warn('Chatbot live model setup deferred to fallback:', error);
      }
    }
  }, [isOpen, personalInfo]);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const getFallbackReply = (query: string): string => {
    const q = query.toLowerCase();
    if (q.includes('skill') || q.includes('tech') || q.includes('stack')) {
      return "Syed's primary technical arsenal includes TypeScript, Next.js, React, Python, FastAPI, and OpenAI Agents SDK. He builds full-stack applications and automated AI workflows.";
    }
    if (q.includes('project') || q.includes('resume') || q.includes('pdf')) {
      return "Among his notable projects are the AI-Powered Resume Builder (with ATS formats), PDF Tools with AI Chat (FastAPI + LLMs), and the Creative Realm Designs agency portal. You can view live demos above!";
    }
    if (q.includes('education') || q.includes('ubit') || q.includes('university') || q.includes('karachi')) {
      return "Syed is a 6th-semester Software Engineering student at UBIT, University of Karachi. He is also enrolled in the prestigious Governor Sindh IT Initiative for AI & Web3.";
    }
    if (q.includes('contact') || q.includes('hire') || q.includes('email') || q.includes('phone')) {
      return "You can reach Syed directly at hashmi.ali2288@gmail.com or call +92 319 7345923. He is currently open to full-stack, software engineering, and AI developer opportunities!";
    }
    return `Syed Ali Hashmi is a full-stack and AI developer from Karachi, Pakistan with expertise in Next.js, Python, and Agentic AI workflows. Feel free to contact him at hashmi.ali2288@gmail.com!`;
  };

  const sendMessage = async (textToSend: string) => {
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
          return;
        }
      }

      // Intelligent deterministic fallback
      setTimeout(() => {
        const reply = getFallbackReply(textToSend);
        setMessages((prev) => [...prev, { role: 'model', text: reply }]);
        setIsLoading(false);
      }, 500);
      return;
    } catch (error) {
      console.warn('Live API response failed, using smart fallback:', error);
      const reply = getFallbackReply(textToSend);
      setMessages((prev) => [...prev, { role: 'model', text: reply }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(userInput);
  };

  const clearChat = () => {
    setMessages([
      {
        role: 'model',
        text: "Chat cleared! What else would you like to know about Syed's work?",
      },
    ]);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold shadow-2xl shadow-cyan-500/40 hover:scale-110 active:scale-95 transition-all duration-300 group"
        aria-label="Toggle AI Portfolio Assistant"
      >
        <div className="relative">
          <MessageSquareIcon className="w-6 h-6 text-slate-950" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-slate-950 animate-pulse"></span>
        </div>
      </button>

      {/* Floating Chat Modal */}
      <div
        className={`fixed bottom-24 right-6 w-[calc(100vw-3rem)] sm:w-96 h-[550px] max-h-[80vh] z-50 transition-all duration-300 ease-out origin-bottom-right ${
          isOpen
            ? 'opacity-100 scale-100 pointer-events-auto'
            : 'opacity-0 scale-90 pointer-events-none'
        }`}
      >
        <div className="h-full flex flex-col bg-slate-900/90 backdrop-blur-2xl border border-slate-700/70 rounded-3xl shadow-2xl shadow-black/60 overflow-hidden">
          {/* Header */}
          <header className="p-4 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300">
                <SparklesIcon className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-slate-100 text-sm flex items-center gap-1.5">
                  <span>Ali's AI Agent</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950 border border-cyan-500/30 text-cyan-300">
                    Online
                  </span>
                </h3>
                <p className="text-xs text-slate-400">Trained on Syed's background</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={clearChat}
                className="text-slate-400 hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-800 text-xs"
                title="Clear chat history"
              >
                Clear
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-800 text-lg leading-none"
                aria-label="Close chat"
              >
                &times;
              </button>
            </div>
          </header>

          {/* Quick Prompts Carousel */}
          <div className="px-3 py-2 bg-slate-950/40 border-b border-slate-800/60 flex gap-1.5 overflow-x-auto no-scrollbar">
            {QUICK_PROMPTS.map((prompt, i) => (
              <button
                key={i}
                onClick={() => sendMessage(prompt)}
                className="shrink-0 text-[11px] font-medium px-2.5 py-1 rounded-full bg-slate-800/80 hover:bg-cyan-950/80 border border-slate-700/60 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300 transition-colors whitespace-nowrap"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Messages Body */}
          <div ref={chatBodyRef} className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] text-xs sm:text-sm py-2.5 px-3.5 rounded-2xl leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-medium rounded-br-none shadow-md shadow-cyan-500/20'
                      : 'bg-slate-800/80 text-slate-200 border border-slate-700/60 rounded-bl-none shadow-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="py-2 px-3 rounded-2xl bg-slate-800 text-slate-400 text-xs rounded-bl-none flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
          </div>

          {/* Input Form */}
          <form
            onSubmit={handleSendMessage}
            className="p-3 border-t border-slate-800 bg-slate-950/60 flex items-center gap-2"
          >
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Ask about projects, skills, roles..."
              className="flex-grow bg-slate-900 border border-slate-800 rounded-full px-4 py-2 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !userInput.trim()}
              className="p-2.5 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 disabled:opacity-40 transition-colors shadow-md shadow-cyan-500/25 shrink-0"
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