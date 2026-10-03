import React from 'react';
import type { SectionId } from '../types';
import { GithubIcon, LinkedinIcon, MailIcon } from './IconComponents';

interface FooterProps {
  onNavigate: (section: SectionId) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-14 text-center text-slate-500 border-t border-slate-900 bg-slate-950/80 relative">
      <div className="container mx-auto max-w-screen-xl px-6 md:px-12 space-y-6">
        {/* Navigation Quick Links */}
        <div className="flex flex-wrap justify-center items-center gap-6 text-sm font-medium text-slate-400">
          <button onClick={() => onNavigate('home')} className="hover:text-cyan-400 transition-colors">
            Home
          </button>
          <button onClick={() => onNavigate('about')} className="hover:text-cyan-400 transition-colors">
            About
          </button>
          <button onClick={() => onNavigate('skills')} className="hover:text-cyan-400 transition-colors">
            Tech Arsenal
          </button>
          <button onClick={() => onNavigate('projects')} className="hover:text-cyan-400 transition-colors">
            Projects
          </button>
          <button onClick={() => onNavigate('contact')} className="hover:text-cyan-400 transition-colors">
            Contact
          </button>
        </div>

        {/* Social Links Strip */}
        <div className="flex justify-center items-center gap-4 text-slate-500">
          <a
            href="https://github.com/alihashmi2288"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full hover:text-cyan-400 hover:bg-slate-900 transition-colors"
            aria-label="GitHub"
          >
            <GithubIcon className="w-5 h-5" />
          </a>
          <a
            href="https://linkedin.com/in/hashmiali2288"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full hover:text-cyan-400 hover:bg-slate-900 transition-colors"
            aria-label="LinkedIn"
          >
            <LinkedinIcon className="w-5 h-5" />
          </a>
          <a
            href="mailto:hashmi.ali2288@gmail.com"
            className="p-2 rounded-full hover:text-cyan-400 hover:bg-slate-900 transition-colors"
            aria-label="Email"
          >
            <MailIcon className="w-5 h-5" />
          </a>
        </div>

        {/* Credits & Tech Specs */}
        <div className="space-y-1 text-xs text-slate-500">
          <p>
            Designed & Engineered by <strong className="text-slate-300">Syed Ali Hashmi</strong>
          </p>
          <p>
            Architected with React 19, TypeScript & Tailwind CSS • Powered by Gemini 2.5 Flash & WebMCP Standards
          </p>
          <p className="text-[11px] text-slate-600 pt-2">
            &copy; {new Date().getFullYear()} Syed Ali Hashmi. All rights reserved.
          </p>
        </div>

        {/* Back to top button */}
        <div className="pt-2">
          <button
            onClick={scrollToTop}
            className="text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors inline-flex items-center gap-1.5"
          >
            <span>↑ Back to Top</span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;