import React, { useState, useEffect } from 'react';
import type { SectionId } from '../types';

interface HeaderProps {
  onNavigate: (section: SectionId) => void;
}

const NavLink: React.FC<{
  section: SectionId;
  onNavigate: (section: SectionId) => void;
  isActive: boolean;
  children: React.ReactNode;
}> = ({ section, onNavigate, isActive, children }) => (
  <button
    onClick={() => onNavigate(section)}
    className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 ${isActive ? 'text-cyan-400' : 'text-slate-300 hover:text-cyan-400'}`}
  >
    {children}
    {isActive && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-cyan-400 rounded-full"></span>}
  </button>
);

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      let currentSection: SectionId = 'home';

      for (const id of sections) {
        const sectionEl = document.getElementById(id);
        if (sectionEl && window.scrollY >= sectionEl.offsetTop - 100) {
          currentSection = id as SectionId;
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMobileNav = (section: SectionId) => {
    onNavigate(section);
    setIsMenuOpen(false);
  };

  const navLinks = (
    <>
      <NavLink section="about" onNavigate={handleMobileNav} isActive={activeSection === 'about'}>About</NavLink>
      <NavLink section="skills" onNavigate={handleMobileNav} isActive={activeSection === 'skills'}>Skills</NavLink>
      <NavLink section="projects" onNavigate={handleMobileNav} isActive={activeSection === 'projects'}>Projects</NavLink>
      <NavLink section="contact" onNavigate={handleMobileNav} isActive={activeSection === 'contact'}>Contact</NavLink>
    </>
  );

  return (
    <header
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-screen-lg transition-all duration-300 ${
        scrolled || isMenuOpen ? 'bg-slate-900/50 backdrop-blur-lg shadow-2xl shadow-cyan-500/10' : 'bg-transparent'
      } rounded-full border border-slate-700/50`}
    >
      <nav className="container mx-auto px-6">
        <div className="flex items-center justify-between h-14">
          <button
            onClick={() => onNavigate('home')}
            className="text-2xl font-bold text-white hover:text-cyan-400 transition-colors duration-300"
          >
            SAH.
          </button>
          <div className="hidden md:flex items-center space-x-1">{navLinks}</div>
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>
       {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-slate-900/95 backdrop-blur-lg rounded-b-2xl shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-center">{navLinks}</div>
          </div>
        )}
    </header>
  );
};

export default Header;