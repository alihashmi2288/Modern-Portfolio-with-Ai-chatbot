import React, { forwardRef, useState, useEffect } from 'react';
import { GithubIcon, LinkedinIcon, DownloadIcon, SparklesIcon } from './IconComponents';
import type { SectionId } from '../types';

const roles = [
  'Software Engineer.',
  'Full-Stack Developer.',
  'AI & Automation Specialist.',
  'Agentic Systems Builder.',
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
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 font-extrabold">
      {roles[index].substring(0, subIndex)}
      <span className={`transition-opacity duration-300 ${blink ? 'opacity-100 text-cyan-400' : 'opacity-0'}`}>
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
      className="min-h-screen flex flex-col justify-center items-center text-center pt-24 pb-16 relative"
    >
      <div className="max-w-4xl mx-auto px-4 reveal-on-scroll">
        {/* Availability Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs sm:text-sm font-medium mb-6 shadow-lg shadow-cyan-950/40 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          <span>Available for Full-Stack & AI Engineering Opportunities</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-slate-100 tracking-tight leading-none">
          Hi, I'm <span className="gradient-text">Syed Ali Hashmi</span>
        </h1>

        {/* Dynamic Role Subtitle */}
        <h2 className="mt-4 text-2xl sm:text-4xl md:text-5xl font-bold text-slate-300 tracking-tight min-h-[4rem] sm:min-h-[3.5rem] flex items-center justify-center">
          <span>I build &nbsp;</span>
          <Typewriter />
        </h2>

        {/* Value Proposition Description */}
        <p className="mt-6 max-w-2xl mx-auto text-base sm:text-lg text-slate-400 font-normal leading-relaxed">
          Software Engineering student at <strong className="text-slate-200">UBIT, University of Karachi</strong> specializing in Next.js, FastAPI, Python, and Agentic AI workflows. Architecting high-performance web apps and modern autonomous AI solutions.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => onNavigate('contact')}
            className="group relative inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <span>Let's Talk</span>
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>

          <button
            onClick={() => onNavigate('projects')}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-slate-200 bg-slate-900/60 border border-slate-700/80 hover:border-cyan-500/60 hover:bg-slate-800/60 hover:text-white transition-all duration-300"
          >
            <SparklesIcon className="w-4 h-4 text-cyan-400" />
            <span>Explore Work</span>
          </button>

          <a
            href="/Syed%20Ali%20Hashmi%20Resume.pdf"
            download="Syed Ali Hashmi Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-medium text-slate-300 bg-slate-900/40 border border-slate-800 hover:border-slate-700 hover:text-white transition-all duration-300"
          >
            <DownloadIcon className="w-4 h-4 text-cyan-400" />
            <span>Resume</span>
          </a>
        </div>

        {/* Social Icons Strip */}
        <div className="mt-8 flex items-center justify-center gap-4 text-slate-400">
          <a
            href="https://github.com/alihashmi2288"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="p-2.5 rounded-full bg-slate-900/50 border border-slate-800 hover:text-cyan-300 hover:border-cyan-500/40 transition-colors"
          >
            <GithubIcon className="w-5 h-5" />
          </a>
          <a
            href="https://linkedin.com/in/hashmiali2288"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="p-2.5 rounded-full bg-slate-900/50 border border-slate-800 hover:text-cyan-300 hover:border-cyan-500/40 transition-colors"
          >
            <LinkedinIcon className="w-5 h-5" />
          </a>
        </div>

        {/* Quick Highlights Grid */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 max-w-2xl mx-auto">
          <div className="glass-card p-4 rounded-2xl text-left border border-slate-800/80">
            <span className="text-2xl sm:text-3xl font-black text-cyan-400">5+</span>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">Production & AI Projects</p>
          </div>
          <div className="glass-card p-4 rounded-2xl text-left border border-slate-800/80">
            <span className="text-2xl sm:text-3xl font-black text-cyan-400">6th</span>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">Semester SE (UBIT)</p>
          </div>
          <div className="glass-card p-4 rounded-2xl text-left border border-slate-800/80 col-span-2 md:col-span-1">
            <span className="text-2xl sm:text-3xl font-black text-cyan-400">AI & Web3</span>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">Governor Sindh Initiative</p>
          </div>
        </div>
      </div>

      {/* Down Scroll Indicator */}
      <div className="mt-12">
        <button
          onClick={() => onNavigate('about')}
          aria-label="Scroll down to About section"
          className="text-slate-500 hover:text-cyan-400 transition-colors duration-300"
        >
          <svg className="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
    </section>
  );
});

Hero.displayName = 'Hero';

export default Hero;