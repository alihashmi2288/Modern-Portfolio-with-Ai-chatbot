import React, { useState } from 'react';
import { GoogleGenAI, Type } from '@google/genai';
import { SparklesIcon } from './IconComponents';
import type { Project } from '../types';
import { useToast } from './Toast';

const PRESET_IDEAS: Omit<Project, 'imageUrl' | 'liveUrl' | 'repoUrl'>[] = [
  {
    title: 'Autonomous GitHub PR Code Reviewer Agent',
    description: 'A Next.js & FastAPI agentic workflow that hooks into GitHub webhooks to analyze pull requests, run static security analysis, and generate interactive inline review suggestions using LLM function calling.',
    tags: ['Next.js', 'FastAPI', 'OpenAI Agents SDK', 'GitHub Webhooks', 'TypeScript'],
  },
  {
    title: 'Voice-First AI Customer Support Assistant',
    description: 'A real-time audio and text streaming portal enabling businesses to deploy human-like voice agents for tier-1 support, integrated with custom vector embeddings and knowledge retrieval.',
    tags: ['React', 'WebSockets', 'Python', 'Vector DB', 'Voice AI'],
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
    <div className="p-6 sm:p-10 glass-card rounded-3xl border border-cyan-500/20 text-center shadow-2xl shadow-cyan-950/20 max-w-4xl mx-auto">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-4">
        <SparklesIcon className="w-3.5 h-3.5" />
        <span>Gemini AI Engine</span>
      </div>

      <h3 className="text-2xl sm:text-4xl font-black text-slate-100 mb-2 tracking-tight">
        Need a Project <span className="gradient-text">Concept?</span>
      </h3>
      <p className="text-slate-400 mb-6 text-sm sm:text-base max-w-xl mx-auto">
        Let AI spark your next collaborative build. Select a prompt topic or input your domain ideas:
      </p>

      {/* Suggestion Chips */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-6 max-w-2xl mx-auto">
        {SUGGESTION_CHIPS.map((chip) => (
          <button
            key={chip}
            onClick={() => {
              setKeywords(chip);
              handleGenerateIdea(chip);
            }}
            className="text-xs font-medium px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-700/80 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/50 hover:bg-slate-800 transition-all"
          >
            + {chip}
          </button>
        ))}
      </div>

      {/* Input & Action */}
      <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
        <input
          type="text"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          placeholder="e.g. Healthcare, Voice AI, FinTech..."
          className="flex-grow bg-slate-950/80 border border-slate-700/80 rounded-2xl px-5 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 text-sm transition-all"
          disabled={isLoading}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleGenerateIdea();
          }}
        />
        <button
          onClick={() => handleGenerateIdea()}
          disabled={isLoading}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-bold py-3 px-7 rounded-2xl hover:from-cyan-300 hover:to-blue-400 disabled:opacity-50 transition-all shadow-lg shadow-cyan-500/25 active:scale-95 text-sm shrink-0"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
              <span>Architecting...</span>
            </>
          ) : (
            <>
              <SparklesIcon className="w-4 h-4" />
              <span>Generate Concept</span>
            </>
          )}
        </button>
      </div>

      {/* Generated Result Card */}
      {idea && (
        <div className="mt-8 p-6 sm:p-7 bg-slate-950/80 border border-cyan-500/30 rounded-2xl text-left max-w-2xl mx-auto animate-fade-in shadow-xl relative group">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-semibold">
                Generated Concept
              </span>
              <h4 className="text-xl sm:text-2xl font-bold text-slate-100 mt-1">{idea.title}</h4>
            </div>
            <button
              onClick={handleCopyIdea}
              className="p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-400 hover:text-cyan-300 hover:border-cyan-500/40 transition-colors shrink-0 text-xs flex items-center gap-1.5"
              title="Copy concept"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span>Copy</span>
            </button>
          </div>

          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">{idea.description}</p>

          <div className="flex flex-wrap gap-2 mt-5">
            {idea.tags.map((tag) => (
              <span
                key={tag}
                className="bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-mono px-3 py-1 rounded-lg"
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