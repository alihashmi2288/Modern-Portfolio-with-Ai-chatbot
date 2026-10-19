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
      text: "Hi! I'm Syed's portfolio assistant. Ask me anything about his full-stack engineering, AI projects, or how to get in touch.",
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
    - Frontend: Next.js, React 19, Flutter, Tailwind CSS
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
      }, 400);
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
      {/* Floating Toggle Button: Black circular button with Level-2 shadow */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-13 h-13 p-3.5 rounded-full bg-[#171717] text-white shadow-floating hover:scale-105 active:scale-95 transition-all duration-200 group"
        aria-label="Toggle AI Portfolio Assistant"
      >
        <div className="relative flex items-center justify-center">
          <MessageSquareIcon className="w-5 h-5 text-white" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#50e3c2] ring-2 ring-white"></span>
        </div>
      </button>

      {/* Floating Chat Modal: Vercel Geist Surface */}
      <div
        className={`fixed bottom-22 right-6 w-[calc(100vw-3rem)] sm:w-96 h-[540px] max-h-[80vh] z-50 transition-all duration-200 ease-out origin-bottom-right ${
          isOpen
            ? 'opacity-100 scale-100 pointer-events-auto'
            : 'opacity-0 scale-95 pointer-events-none'
        }`}
      >
        <div className="h-full flex flex-col bg-white border border-[#ebebeb] rounded-[16px] shadow-floating-lg overflow-hidden">
          {/* Header */}
          <header className="p-3.5 border-b border-[#ebebeb] bg-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-[6px] bg-[#f2f2f2] border border-[#ebebeb] flex items-center justify-center text-[#171717]">
                <SparklesIcon className="w-3.5 h-3.5" />
              </div>
              <div>
                <h3 className="font-semibold text-[#171717] text-sm flex items-center gap-1.5">
                  <span>AI Assistant</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-[4px] bg-[#f2f2f2] border border-[#ebebeb] text-[#171717]">
                    Online
                  </span>
                </h3>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={clearChat}
                className="text-[#8f8f8f] hover:text-[#171717] p-1.5 rounded-[6px] hover:bg-[#f2f2f2] text-xs font-mono"
                title="Clear chat history"
              >
                Clear
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-[#8f8f8f] hover:text-[#171717] p-1.5 rounded-[6px] hover:bg-[#f2f2f2] text-base leading-none"
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
                className="shrink-0 text-[11px] font-mono font-medium px-2.5 py-1 rounded-[64px] bg-white hover:bg-[#f2f2f2] border border-[#ebebeb] text-[#4d4d4d] hover:text-[#171717] transition-colors whitespace-nowrap shadow-whisper"
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
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] text-xs sm:text-sm py-2.5 px-3.5 leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-[#171717] text-white rounded-[12px] rounded-br-[2px] shadow-whisper'
                      : 'bg-[#f2f2f2] text-[#171717] border border-[#ebebeb] rounded-[12px] rounded-bl-[2px]'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="py-2 px-3 rounded-[12px] rounded-bl-[2px] bg-[#f2f2f2] border border-[#ebebeb] text-[#8f8f8f] text-xs flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#171717] animate-bounce"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#171717] animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#171717] animate-bounce [animation-delay:0.4s]"></div>
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
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Ask about skills, projects, contact..."
              className="flex-grow bg-white border border-[#ebebeb] rounded-[6px] px-3.5 py-1.5 text-xs sm:text-sm text-[#171717] placeholder-[#8f8f8f] focus:outline-none focus:border-[#0070f3] focus:ring-1 focus:ring-[#0070f3] shadow-whisper transition-all"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !userInput.trim()}
              className="p-2 rounded-[6px] bg-[#171717] hover:bg-black/90 text-white disabled:opacity-40 transition-colors shadow-sm shrink-0"
              aria-label="Send message"
            >
              <SendIcon className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Chatbot;