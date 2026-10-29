'use client';

import React, { forwardRef, useState, useEffect } from 'react';
import { GithubIcon, LinkedinIcon, DownloadIcon, SparklesIcon } from './IconComponents';
import type { SectionId } from '../types';

const roles = [
  'Agentic Systems.',
  'AI Automations.',
  'Full-Stack Web Apps.',
  'Autonomous AI Workflows.',
  'Production Web Platforms.',
];

const Typewriter: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    if (index === roles.length) {
      setIndex(0);
      return;
    }

    if (subIndex === roles[index].length + 1 && !reverse) {
      setReverse(true);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % roles.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, Math.max(reverse ? 65 : subIndex === roles[index].length ? 1400 : 120, Math.random() * 200));

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse]);

  useEffect(() => {
    const blinkTimeout = setTimeout(() => {
      setBlink((prev) => !prev);
    }, 500);
    return () => clearTimeout(blinkTimeout);
  }, [blink]);

  return (
    <span className="text-[#171717] font-semibold">
      {roles[index].substring(0, subIndex)}
      <span className={`transition-opacity duration-300 text-[#0070f3] ${blink ? 'opacity-100' : 'opacity-0'}`}>
        |
      </span>
    </span>
  );
};

interface HeroProps {
  onNavigate: (section: SectionId) => void;
}

const Hero = forwardRef<HTMLElement, HeroProps>(({ onNavigate }, ref) => {
  return (
    <section
      ref={ref}
      id="home"
      className="min-h-[92vh] flex flex-col justify-center items-center text-center pt-28 pb-16 relative overflow-hidden"
    >
      {/* Vercel Multi-Stop Mesh Gradient blooming behind the hero */}
      <div className="hero-mesh-background" aria-hidden="true" />

      <div className="max-w-4xl mx-auto px-4 relative z-10 reveal-on-scroll">
        {/* Uppercase Technical Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[100px] bg-white border border-[#ebebeb] text-[#171717] text-xs font-mono mb-6 shadow-whisper backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#50e3c2] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#50e3c2]"></span>
          </span>
          <span className="font-medium text-[#4d4d4d]">AVAILABLE FOR FULL-STACK & AI ROLES</span>
        </div>

        {/* Display-XL Heading with -2.4px Tracking */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-semibold text-[#171717] tracking-[-2.4px] leading-[1.05]">
          Syed Ali Hashmi
        </h1>

        {/* Dynamic Subtitle */}
        <h2 className="mt-4 text-xl sm:text-3xl md:text-4xl font-semibold text-[#4d4d4d] tracking-[-1.28px] min-h-[3.5rem] flex items-center justify-center">
          <span>I build&nbsp;</span>
          <Typewriter />
        </h2>

        {/* Value Proposition Description */}
        <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-[#4d4d4d] font-normal leading-relaxed">
          Software Engineering student at <strong className="text-[#171717] font-medium">UBIT, University of Karachi</strong> specializing in Next.js, FastAPI, Python, and Agentic AI workflows. Architecting high-performance web applications and production-ready autonomous systems.
        </p>

        {/* Marketing CTAs - Strictly Rounded-Pill (100px) */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <button
            onClick={() => onNavigate('contact')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-[100px] font-medium text-base text-white bg-[#171717] hover:bg-black/90 shadow-sm active:scale-[0.98] transition-all"
          >
            <span>Let's Talk</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>

          <button
            onClick={() => onNavigate('projects')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-[100px] font-medium text-base text-[#171717] bg-white border border-[#ebebeb] hover:border-[#171717] shadow-whisper active:scale-[0.98] transition-all"
          >
            <SparklesIcon className="w-4 h-4 text-[#171717]" />
            <span>Explore Work</span>
          </button>

          <a
            href="/Syed%20Ali%20Hashmi%20Resume.pdf"
            download="Syed Ali Hashmi Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-[100px] font-medium text-base text-[#4d4d4d] bg-white border border-[#ebebeb] hover:text-[#171717] hover:border-[#171717] shadow-whisper transition-all"
          >
            <DownloadIcon className="w-4 h-4" />
            <span>Resume</span>
          </a>
        </div>

        {/* Minimalist Vercel Terminal / Code Preview Card */}
        <div className="mt-10 max-w-xl mx-auto rounded-[12px] border border-[#ebebeb] bg-white p-4 sm:p-5 shadow-whisper text-left">
          <div className="flex items-center gap-1.5 pb-3 border-b border-[#ebebeb] mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ebebeb]"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#ebebeb]"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#ebebeb]"></span>
            <span className="ml-2 font-mono text-[11px] text-[#8f8f8f]">profile.sh</span>
          </div>
          <div className="font-mono text-xs sm:text-[13px] text-[#4d4d4d] space-y-1.5 leading-relaxed">
            <div className="text-[#171717] font-medium">
              <span className="text-[#0070f3]">$</span> npx @alihashmi/profile
            </div>
            <div className="text-[#8f8f8f]">
              <span className="text-[#171717] font-medium">Core:</span> Next.js • React 19 • TypeScript • Python • FastAPI
            </div>
            <div className="text-[#8f8f8f]">
              <span className="text-[#171717] font-medium">Focus:</span> Agentic Workflows • OpenAI SDK • Full-Stack Systems
            </div>
            <div className="text-[#8f8f8f]">
              <span className="text-[#171717] font-medium">Status:</span> <span className="text-[#0070f3]">Production Ready</span> • Karachi, PK
            </div>
          </div>
        </div>

        {/* Social Icons Strip */}
        <div className="mt-6 flex items-center justify-center gap-2.5 text-[#4d4d4d]">
          <a
            href="https://github.com/alihashmi2288"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="p-2 rounded-[6px] border border-[#ebebeb] bg-white text-[#4d4d4d] hover:text-[#171717] hover:border-[#171717] shadow-whisper transition-colors"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href="https://linkedin.com/in/hashmiali2288"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="p-2 rounded-[6px] border border-[#ebebeb] bg-white text-[#4d4d4d] hover:text-[#171717] hover:border-[#171717] shadow-whisper transition-colors"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>
        </div>

        {/* Quick Highlights Hairline Grid */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-3 max-w-2xl mx-auto">
          <div className="feature-card p-4 text-left">
            <span className="text-2xl sm:text-3xl font-semibold text-[#171717] tracking-tight">5+</span>
            <p className="text-xs sm:text-sm text-[#8f8f8f] mt-0.5 font-normal">Production & AI Projects</p>
          </div>
          <div className="feature-card p-4 text-left">
            <span className="text-2xl sm:text-3xl font-semibold text-[#171717] tracking-tight">6th</span>
            <p className="text-xs sm:text-sm text-[#8f8f8f] mt-0.5 font-normal">Semester SE (UBIT)</p>
          </div>
          <div className="feature-card p-4 text-left col-span-2 md:col-span-1">
            <span className="text-2xl sm:text-3xl font-semibold text-[#171717] tracking-tight">AI & Web3</span>
            <p className="text-xs sm:text-sm text-[#8f8f8f] mt-0.5 font-normal">Governor Sindh Initiative</p>
          </div>
        </div>
      </div>

      {/* Down Scroll Indicator */}
      <div className="mt-10">
        <button
          onClick={() => onNavigate('about')}
          aria-label="Scroll down to About section"
          className="text-[#8f8f8f] hover:text-[#171717] transition-colors"
        >
          <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
    </section>
  );
});

Hero.displayName = 'Hero';

export default Hero;