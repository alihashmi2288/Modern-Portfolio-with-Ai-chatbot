import React, { useState, useEffect } from 'react';
import type { SectionId } from '../types';
import { DownloadIcon } from './IconComponents';

interface HeaderProps {
  onNavigate: (section: SectionId) => void;
}

const NAV_ITEMS: { id: SectionId; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Tech Arsenal' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Modern Scrollspy implementation with IntersectionObserver as per modern-web-guidance
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
        rootMargin: '-30% 0px -40% 0px',
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
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-screen-lg transition-all duration-300 ${
        scrolled || isMenuOpen
          ? 'bg-slate-900/80 backdrop-blur-xl border border-slate-700/60 shadow-2xl shadow-cyan-950/20'
          : 'bg-slate-950/40 backdrop-blur-md border border-slate-800/40'
      } rounded-full`}
    >
      <nav className="container mx-auto px-5 sm:px-6" aria-label="Main Navigation">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2 group text-left focus:outline-none"
            aria-label="Syed Ali Hashmi Homepage"
          >
            <span className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-black text-slate-950 text-sm shadow-md shadow-cyan-500/30 group-hover:scale-105 transition-transform">
              SH
            </span>
            <span className="font-bold text-lg text-slate-100 tracking-tight group-hover:text-cyan-300 transition-colors">
              Ali<span className="text-cyan-400">.dev</span>
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1 bg-slate-950/40 p-1.5 rounded-full border border-slate-800/50">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-300 ${
                    isActive
                      ? 'text-cyan-300 bg-cyan-950/60 shadow-sm border border-cyan-500/30 font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-cyan-400 rounded-full blur-[1px]"></span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Action: Quick Resume / Contact */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="/Syed%20Ali%20Hashmi%20Resume.pdf"
              download="Syed Ali Hashmi Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/10 transition-colors"
            >
              <DownloadIcon className="w-3.5 h-3.5" />
              <span>Resume</span>
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-full text-slate-300 hover:text-cyan-400 hover:bg-slate-800/50 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 p-4 bg-slate-900/95 backdrop-blur-2xl rounded-3xl border border-slate-700/60 shadow-2xl flex flex-col gap-2 animate-fade-in">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                aria-current={isActive ? 'true' : undefined}
                className={`w-full py-3 px-4 text-left font-medium rounded-xl transition-all ${
                  isActive
                    ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                    : 'text-slate-300 hover:bg-slate-800/50 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            );
          })}
          <div className="pt-2 border-t border-slate-800 mt-1 flex justify-center">
            <a
              href="/Syed%20Ali%20Hashmi%20Resume.pdf"
              download="Syed Ali Hashmi Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-cyan-500 text-slate-950 font-bold text-sm"
            >
              <DownloadIcon className="w-4 h-4" />
              Download Resume
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;