import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Chat } from '@google/genai';
import { MessageSquareIcon, SendIcon } from './IconComponents';

interface Message {
    role: 'user' | 'model';
    text: string;
}

const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatRef = useRef<Chat | null>(null);
    const chatBodyRef = useRef<HTMLDivElement>(null);

    const personalInfo = `
        Syed Ali Hashmi is a 2nd-year Software Engineering student at UBIT, Karachi University. He is a Frontend Developer passionate about AI and Machine Learning. He enjoys building interactive web projects and exploring intelligent solutions. He is also enrolled in the Certified Cloud Applied Generative AI course under the Governor Sindh Pakistan Initiative, enhancing his expertise in AI applications. He is committed to applying his skills to innovative projects that drive technological advancement. His skills include React, TypeScript, Next.js, Node.js, Express, Tailwind CSS, Git, Figma, and MongoDB ,Python ,Ai automations ,open Ai Agent Sdk ,OPen Ai Agent kit ,Agent builder ,workflows.
    `;

    useEffect(() => {
        if (isOpen && !chatRef.current) {
            try {
                // FIX: Use process.env.API_KEY as per coding guidelines and fix import.meta.env error.
                const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
                chatRef.current = ai.chats.create({
                    model: 'gemini-2.5-flash',
                    config: {
                        systemInstruction: `You are a friendly, professional AI assistant on Syed Ali Hashmi's portfolio website. Your purpose is to answer questions about him based on this info: ${personalInfo}. Keep answers concise. Never say you are an AI. If asked if 'you' can do something like build a website, answer about Syed's capabilities instead (e.g., "Syed is a skilled Next.js developer..."). If asked something unrelated, politely steer the conversation back to being about Syed. If you don't know the answer, say you don't have that information and suggest contacting Syed directly.`,
                    },
                });
                setMessages([{ role: 'model', text: "Hello! I'm Syed's AI assistant. Ask me anything about his skills or projects." }]);
            } catch (error) {
                console.error("Failed to initialize chatbot:", error);
                setMessages([{ role: 'model', text: "Sorry, I'm having trouble connecting right now. Please try again later." }]);
            }
        }
    }, [isOpen, personalInfo]);
    
    useEffect(() => {
        // Scroll to the bottom of the chat body when new messages are added
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
    }, [messages]);


    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userInput.trim() || isLoading || !chatRef.current) return;

        const userMessage: Message = { role: 'user', text: userInput };
        setMessages(prev => [...prev, userMessage]);
        setUserInput('');
        setIsLoading(true);

        try {
            const response = await chatRef.current.sendMessage({ message: userInput });
            const modelMessage: Message = { role: 'model', text: response.text };
            setMessages(prev => [...prev, modelMessage]);
        } catch (error) {
            console.error("Chatbot error:", error);
            const errorMessage: Message = { role: 'model', text: "Oops! Something wrong. Please try again." };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-8 right-8 bg-cyan-500 text-white p-4 rounded-full shadow-lg shadow-cyan-500/30 hover:bg-cyan-600 transition-all duration-300 transform hover:scale-110 z-50"
                aria-label="Toggle chatbot"
            >
                <MessageSquareIcon className="w-8 h-8" />
            </button>

            <div className={`fixed bottom-24 right-8 w-full max-w-sm h-full max-h-[600px] z-50 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
                <div className="h-full flex flex-col bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl shadow-black/40">
                    <header className="p-4 border-b border-slate-700/50 flex justify-between items-center">
                        <div>
                            <h3 className="font-bold text-white">AI Assistant</h3>
                            <p className="text-sm text-slate-400">Ask me about Syed</p>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">&times;</button>
                    </header>
                    <div ref={chatBodyRef} className="flex-1 p-4 overflow-y-auto space-y-4">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <p className={`max-w-xs text-sm md:text-base py-2 px-4 rounded-2xl ${msg.role === 'user' ? 'bg-cyan-600 text-white rounded-br-none' : 'bg-slate-800 text-slate-300 rounded-bl-none'}`}>
                                    {msg.text}
                                </p>
                            </div>
                        ))}
                        {isLoading && (
                             <div className="flex justify-start">
                                <p className="max-w-xs text-sm md:text-base py-2 px-4 rounded-2xl bg-slate-800 text-slate-300 rounded-bl-none">
                                    <span className="animate-pulse">...</span>
                                </p>
                            </div>
                        )}
                    </div>
                    <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-700/50 flex items-center gap-2">
                        <input
                            type="text"
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            placeholder="Type a message..."
                            className="flex-grow bg-slate-800 border border-slate-700 rounded-full px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                            disabled={isLoading}
                        />
                        <button type="submit" disabled={isLoading} className="bg-cyan-500 text-white p-3 rounded-full hover:bg-cyan-600 disabled:bg-slate-600 transition-colors">
                            <SendIcon className="w-5 h-5"/>
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Chatbot;