import React, { useState } from 'react';
import { GoogleGenAI, Type } from '@google/genai';
import { SparklesIcon } from './IconComponents';
import type { Project } from '../types';

const ProjectIdeaGenerator: React.FC = () => {
    const [keywords, setKeywords] = useState('');
    const [idea, setIdea] = useState<Omit<Project, 'imageUrl' | 'liveUrl' | 'repoUrl'> | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerateIdea = async () => {
        setIsLoading(true);
        setError(null);
        setIdea(null);

        try {
            // FIX: Use process.env.API_KEY as per coding guidelines and fix import.meta.env error.
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: `
                    You are an expert project idea generator for a frontend developer's portfolio.
                    The developer's skills include React, TypeScript, Next.js, Node.js, and Tailwind CSS.
                    Generate a unique and interesting project idea. 
                    Base the idea on these keywords if provided: "${keywords}". 
                    If no keywords are provided, generate a creative idea based on the developer's skills.
                    The description should be concise and compelling, around 2-3 sentences.
                `,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: Type.OBJECT,
                        properties: {
                            title: { type: Type.STRING },
                            description: { type: Type.STRING },
                            tags: {
                                type: Type.ARRAY,
                                items: { type: Type.STRING }
                            },
                        }
                    },
                },
            });
            
            const generatedIdea = JSON.parse(response.text);
            setIdea(generatedIdea);

        } catch (err) {
            console.error(err);
            setError('Failed to generate an idea. Please check the configuration and try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="mb-24 p-8 bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl text-center shadow-2xl shadow-black/20">
            <h3 className="text-3xl font-bold text-slate-100 mb-2">
                Need a Project <span className="text-cyan-400">Idea?</span>
            </h3>
            <p className="text-slate-400 mb-8">Let AI spark your creativity. Enter some keywords and get a unique project concept!</p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                <input
                    type="text"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                    placeholder="e.g., AI, music, visualization"
                    className="flex-grow bg-slate-900/70 border border-slate-700 rounded-full px-5 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
                    disabled={isLoading}
                />
                <button
                    onClick={handleGenerateIdea}
                    disabled={isLoading}
                    className="flex items-center justify-center gap-2 bg-cyan-500 text-white font-bold py-3 px-6 rounded-full hover:bg-cyan-600 transition-all duration-300 disabled:bg-slate-600 disabled:cursor-not-allowed transform hover:scale-105"
                >
                    {isLoading ? (
                        <>
                            <div className="w-5 h-5 border-t-2 border-white border-solid rounded-full animate-spin"></div>
                            <span>Generating...</span>
                        </>
                    ) : (
                        <>
                            <SparklesIcon className="w-5 h-5" />
                            <span>Generate</span>
                        </>
                    )}
                </button>
            </div>

            {error && <p className="mt-6 text-red-400">{error}</p>}

            {idea && (
                <div className="mt-8 p-6 bg-slate-900/50 border border-cyan-500/30 rounded-lg text-left max-w-2xl mx-auto animate-fade-in">
                    <h4 className="text-xl font-bold text-cyan-400">{idea.title}</h4>
                    <p className="mt-2 text-slate-300">{idea.description}</p>
                    <div className="flex flex-wrap gap-2 mt-4 font-mono text-sm text-cyan-400">
                        {idea.tags.map(tag => (
                            <span key={tag} className="bg-cyan-900/50 px-3 py-1 rounded-full">{tag}</span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectIdeaGenerator;