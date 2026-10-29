'use client';

import React from 'react';
import type { SectionId } from '../types';
import { GithubIcon, LinkedinIcon, MailIcon } from './IconComponents';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  onNavigate: (section: SectionId) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[#ebebeb] bg-[#fafafa] py-14 text-center text-[#8f8f8f] relative">
      <div className="container mx-auto max-w-[1200px] px-6 md:px-10 space-y-6">
        {/* Logo / Monogram */}
        <div className="flex items-center justify-center gap-2.5">
          <BrandLogo className="w-6 h-6 sm:w-7 sm:h-7 text-[#171717] fill-current" />
          <span className="font-semibold text-base text-[#171717] tracking-tight">Syed Ali Hashmi</span>
        </div>

        {/* Navigation Quick Links */}
        <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-[#4d4d4d]">
          <button onClick={() => onNavigate('home')} className="hover:text-[#171717] transition-colors">
            Home
          </button>
          <button onClick={() => onNavigate('about')} className="hover:text-[#171717] transition-colors">
            About
          </button>
          <button onClick={() => onNavigate('skills')} className="hover:text-[#171717] transition-colors">
            Tech Arsenal
          </button>
          <button onClick={() => onNavigate('projects')} className="hover:text-[#171717] transition-colors">
            Projects
          </button>
          <button onClick={() => onNavigate('certifications')} className="hover:text-[#171717] transition-colors">
            Certifications
          </button>
          <button onClick={() => onNavigate('contact')} className="hover:text-[#171717] transition-colors">
            Contact
          </button>
        </div>

        {/* Social Links Strip */}
        <div className="flex justify-center items-center gap-2 text-[#4d4d4d]">
          <a
            href="https://github.com/alihashmi2288"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-[6px] border border-[#ebebeb] bg-white hover:text-[#171717] hover:border-[#171717] shadow-whisper transition-[border-color,color,transform] duration-160 ease-out-strong active:scale-[0.97]"
            aria-label="GitHub"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href="https://linkedin.com/in/hashmiali2288"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-[6px] border border-[#ebebeb] bg-white hover:text-[#171717] hover:border-[#171717] shadow-whisper transition-[border-color,color,transform] duration-160 ease-out-strong active:scale-[0.97]"
            aria-label="LinkedIn"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>
          <a
            href="mailto:hashmi.ali2288@gmail.com"
            className="p-2 rounded-[6px] border border-[#ebebeb] bg-white hover:text-[#171717] hover:border-[#171717] shadow-whisper transition-[border-color,color,transform] duration-160 ease-out-strong active:scale-[0.97]"
            aria-label="Email"
          >
            <MailIcon className="w-4 h-4" />
          </a>
        </div>

        {/* Credits & Tech Specs in Geist Mono */}
        <div className="space-y-1 font-mono text-xs text-[#8f8f8f]">
          <p>
            Designed & Engineered by <strong className="text-[#171717] font-medium">Syed Ali Hashmi</strong>
          </p>
          <p className="text-[11px]">
            Built with React 19, TypeScript & Tailwind CSS • Powered by Gemini 2.5 Flash & Vercel Geist Tokens
          </p>
          <p className="text-[11px] text-[#a1a1a1] pt-1">
            &copy; {new Date().getFullYear()} Syed Ali Hashmi. All rights reserved.
          </p>
        </div>

        {/* Back to top button */}
        <div className="pt-1">
          <button
            onClick={scrollToTop}
            className="text-xs font-mono text-[#171717] hover:text-[#0070f3] transition-colors inline-flex items-center gap-1.5"
          >
            <span>↑ Back to Top</span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;