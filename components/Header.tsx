'use client';

import React, { useState, useEffect } from 'react';
import type { SectionId } from '../types';
import { DownloadIcon, VercelIcon } from './IconComponents';

interface HeaderProps {
  onNavigate: (section: SectionId) => void;
}

const NAV_ITEMS: { id: SectionId; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Tech Arsenal' },
  { id: 'projects', label: 'Projects' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact', label: 'Contact' },
];

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Scrollspy with IntersectionObserver
    const sections = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id as SectionId);
          }
        });
      },
      {
        rootMargin: '-20% 0px -40% 0px',
        threshold: 0,
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const handleNavClick = (section: SectionId) => {
    onNavigate(section);
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 border-b ${
        scrolled
          ? 'bg-[#fafafa]/90 backdrop-blur-md border-[#ebebeb] shadow-[0_1px_2px_rgba(0,0,0,0.03)]'
          : 'bg-[#fafafa]/75 backdrop-blur-sm border-[#ebebeb]'
      }`}
    >
      <nav className="container mx-auto max-w-[1200px] px-5 sm:px-8" aria-label="Main Navigation">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo / Wordmark */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 text-left focus:outline-none group"
            aria-label="Syed Ali Hashmi Homepage"
          >
            <div className="w-6 h-6 flex items-center justify-center text-[#171717] group-hover:scale-105 transition-transform">
              <VercelIcon className="w-5 h-5 fill-current" />
            </div>
            <span className="font-semibold text-sm sm:text-base text-[#171717] tracking-[-0.4px] group-hover:text-black transition-colors">
              Syed Ali Hashmi
            </span>
            <span className="hidden sm:inline-block font-mono text-[11px] text-[#8f8f8f] bg-[#f2f2f2] px-2 py-0.5 rounded-[6px] border border-[#ebebeb]">
              v2.0
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  aria-current={isActive ? 'true' : undefined}
                  className={`px-3 py-1.5 text-sm font-normal rounded-full transition-colors ${
                    isActive
                      ? 'text-[#171717] font-medium bg-[#f2f2f2]'
                      : 'text-[#4d4d4d] hover:text-[#171717] hover:bg-[#ebebeb]/50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Right Action Chrome: button-ghost-sm & button-primary-sm */}
          <div className="hidden md:flex items-center gap-2.5">
            <a
              href="/Syed%20Ali%20Hashmi%20Resume.pdf"
              download="Syed Ali Hashmi Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-[6px] border border-[#ebebeb] bg-white text-[#171717] shadow-whisper hover:bg-[#fafafa] hover:border-[#d4d4d4] transition-colors"
            >
              <DownloadIcon className="w-3.5 h-3.5" />
              <span>Resume</span>
            </a>
            <button
              onClick={() => handleNavClick('contact')}
              className="inline-flex items-center text-sm font-medium px-3.5 py-1.5 rounded-[6px] bg-[#171717] text-white hover:bg-black/90 transition-colors shadow-sm"
            >
              Contact
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-[6px] border border-[#ebebeb] bg-white text-[#171717] hover:bg-[#f2f2f2] transition-colors focus:outline-none"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-b border-[#ebebeb] bg-[#ffffff] p-5 shadow-floating flex flex-col gap-1.5 animate-fade-in">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                aria-current={isActive ? 'true' : undefined}
                className={`w-full py-2.5 px-3.5 text-left text-sm rounded-[6px] transition-colors ${
                  isActive
                    ? 'bg-[#f2f2f2] text-[#171717] font-medium'
                    : 'text-[#4d4d4d] hover:bg-[#fafafa] hover:text-[#171717]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
          <div className="pt-3 border-t border-[#ebebeb] mt-2 flex flex-col gap-2">
            <a
              href="/Syed%20Ali%20Hashmi%20Resume.pdf"
              download="Syed Ali Hashmi Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center flex items-center justify-center gap-2 py-2 px-4 rounded-[6px] border border-[#ebebeb] bg-white text-[#171717] font-medium text-sm hover:bg-[#fafafa]"
            >
              <DownloadIcon className="w-4 h-4" />
              Download Resume
            </a>
            <button
              onClick={() => handleNavClick('contact')}
              className="w-full text-center py-2 px-4 rounded-[6px] bg-[#171717] text-white font-medium text-sm hover:bg-black/90"
            >
              Contact Me
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;