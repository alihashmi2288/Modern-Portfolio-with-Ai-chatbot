'use client';

import React, { useState } from 'react';
import { GoogleGenAI, Type } from '@google/genai';
import { SparklesIcon } from './IconComponents';
import type { Project } from '../types';
import { useToast } from './Toast';

const PRESET_IDEAS: Omit<Project, 'imageUrl' | 'liveUrl' | 'repoUrl'>[] = [
  {
    title: 'Autonomous GitHub PR Reviewer Agent',
    description: 'A Next.js & FastAPI agentic workflow that connects to GitHub webhooks to analyze pull requests, run static security analysis, and generate interactive inline review suggestions using LLM function calling.',
    tags: ['Next.js', 'FastAPI', 'OpenAI Agents SDK', 'GitHub Webhooks', 'TypeScript'],
  },
  {
    title: 'Voice-First AI Customer Support Assistant',
    description: 'A real-time audio and text streaming portal enabling businesses to deploy human-like voice agents for tier-1 support, integrated with custom vector embeddings and knowledge retrieval.',
    tags: ['React 19', 'WebSockets', 'Python', 'Vector DB', 'Voice AI'],
  },
  {
    title: 'Smart Financial Cashflow & VAT Predictor',
    description: 'An intelligent accounting utility for small businesses that parses invoices, predicts quarterly tax obligations using statistical models, and provides automated expense categorization.',
    tags: ['Next.js', 'Tailwind CSS', 'FastAPI', 'Data Analytics', 'Chart.js'],
  },
];

const SUGGESTION_CHIPS = [
  'Agentic PR Reviewer',
  'Voice AI Assistant',
  'Multi-modal PDF Engine',
  'Smart Invoicing & Tax',
  'DevOps Automation',
];

const ProjectIdeaGenerator: React.FC = () => {
  const [keywords, setKeywords] = useState('');
  const [idea, setIdea] = useState<Omit<Project, 'imageUrl' | 'liveUrl' | 'repoUrl'> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();

  const handleGenerateIdea = async (customPrompt?: string) => {
    const query = customPrompt !== undefined ? customPrompt : keywords;
    setIsLoading(true);

    try {
      const apiKey = process.env.API_KEY || (typeof window !== 'undefined' && (window as unknown as { GEMINI_API_KEY?: string }).GEMINI_API_KEY);
      
      if (apiKey) {
        const ai = new GoogleGenAI({ apiKey });
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: `
            You are an expert project idea generator for a full-stack developer's portfolio.
            The developer's skills include React, Next.js, TypeScript, Flutter, Python, Node.js, FastAPI, and OpenAI SDK.
            Generate a unique, modern, and production-viable project idea. 
            Base the idea on these keywords if provided: "${query}". 
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

        const generatedIdea = JSON.parse(response.text || '{}');
        if (generatedIdea.title) {
          setIdea(generatedIdea);
          showToast('New project concept generated with Gemini!', 'success');
          return;
        }
      }

      // Try server-side route handler
      try {
        const res = await fetch('/api/generate-idea', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query }),
        });
        if (res.ok) {
          const generatedIdea = await res.json();
          if (generatedIdea.title) {
            setIdea(generatedIdea);
            showToast('New project concept generated with Gemini!', 'success');
            return;
          }
        }
      } catch (routeErr) {
        // Fall through to preset ideas
      }

      // High-quality deterministic fallback if no API key is set
      const matchingPreset = PRESET_IDEAS[Math.floor(Math.random() * PRESET_IDEAS.length)];
      if (query.trim()) {
        setIdea({
          title: `AI-Powered ${query.trim()} Platform`,
          description: `A production-ready full-stack application incorporating ${query.trim()} workflows with Next.js frontends, FastAPI service orchestration, and automated intelligent task routing.`,
          tags: ['Next.js', 'FastAPI', 'Agentic AI', 'TypeScript', 'Tailwind CSS'],
        });
      } else {
        setIdea(matchingPreset);
      }
      showToast('Generated project architecture concept!', 'info');
    } catch (err) {
      console.warn('Live API generation fallback activated:', err);
      const fallbackPreset = PRESET_IDEAS[Math.floor(Math.random() * PRESET_IDEAS.length)];
      setIdea(fallbackPreset);
      showToast('Generated project architecture concept!', 'info');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyIdea = () => {
    if (!idea) return;
    const text = `${idea.title}\n\n${idea.description}\n\nTech Stack: ${idea.tags.join(', ')}`;
    navigator.clipboard.writeText(text);
    showToast('Project idea copied to clipboard!', 'success');
  };

  return (
    <div className="p-6 sm:p-10 rounded-[16px] border border-[#ebebeb] bg-white text-center shadow-whisper max-w-4xl mx-auto">
      {/* Vercel AI Badge */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[6px] bg-[#f2f2f2] border border-[#ebebeb] text-[#171717] text-xs font-mono mb-4">
        <SparklesIcon className="w-3.5 h-3.5 text-[#171717]" />
        <span>Gemini AI Engine</span>
      </div>

      <h3 className="text-2xl sm:text-3xl font-semibold text-[#171717] mb-2 tracking-[-1.28px]">
        Need an Architecture Concept?
      </h3>
      <p className="text-[#4d4d4d] mb-6 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
        Explore full-stack & AI project architectures suited for production. Select a suggested topic or enter a domain:
      </p>

      {/* Suggestion Chips: rounded-[64px] */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-6 max-w-2xl mx-auto">
        {SUGGESTION_CHIPS.map((chip) => (
          <button
            key={chip}
            onClick={() => {
              setKeywords(chip);
              handleGenerateIdea(chip);
            }}
            className="text-xs font-mono px-3.5 py-1.5 rounded-[64px] bg-[#f2f2f2] border border-[#ebebeb] text-[#4d4d4d] hover:text-[#171717] hover:border-[#171717] transition-all"
          >
            + {chip}
          </button>
        ))}
      </div>

      {/* Input & Action: rounded-[6px] text-input and button-primary-sm */}
      <div className="flex flex-col sm:flex-row gap-2.5 max-w-xl mx-auto">
        <input
          type="text"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          placeholder="e.g. Healthcare, Voice AI, FinTech..."
          className="flex-grow bg-white border border-[#ebebeb] rounded-[6px] px-4 py-2.5 text-[#171717] placeholder-[#8f8f8f] focus:outline-none focus:border-[#0070f3] focus:ring-1 focus:ring-[#0070f3] text-sm shadow-whisper transition-all"
          disabled={isLoading}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleGenerateIdea();
          }}
        />
        <button
          onClick={() => handleGenerateIdea()}
          disabled={isLoading}
          className="inline-flex items-center justify-center gap-2 bg-[#171717] text-white font-medium py-2.5 px-6 rounded-[6px] hover:bg-black/90 disabled:opacity-50 transition-all text-sm shrink-0 shadow-sm"
        >
          {isLoading ? (
            <>
              <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Architecting...</span>
            </>
          ) : (
            <>
              <SparklesIcon className="w-3.5 h-3.5" />
              <span>Generate Concept</span>
            </>
          )}
        </button>
      </div>

      {/* Generated Result Card: code-block styling */}
      {idea && (
        <div className="mt-8 p-5 sm:p-6 bg-[#fafafa] border border-[#ebebeb] rounded-[12px] text-left max-w-2xl mx-auto animate-fade-in shadow-whisper">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#8f8f8f] font-medium">
                // GENERATED CONCEPT
              </span>
              <h4 className="text-xl sm:text-2xl font-semibold text-[#171717] tracking-[-0.4px] mt-1">{idea.title}</h4>
            </div>
            <button
              onClick={handleCopyIdea}
              className="p-1.5 px-2.5 rounded-[6px] bg-white border border-[#ebebeb] text-[#4d4d4d] hover:text-[#171717] hover:border-[#171717] transition-colors shrink-0 text-xs font-mono flex items-center gap-1.5 shadow-whisper"
              title="Copy concept"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span>Copy</span>
            </button>
          </div>

          <p className="mt-3 text-[#4d4d4d] text-sm sm:text-base leading-relaxed">{idea.description}</p>

          <div className="flex flex-wrap gap-1.5 mt-4">
            {idea.tags.map((tag) => (
              <span
                key={tag}
                className="bg-white border border-[#ebebeb] text-[#4d4d4d] text-xs font-mono px-2.5 py-1 rounded-[6px]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectIdeaGenerator;