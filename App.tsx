import React, { useRef } from 'react';
import type { SectionId } from './types';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import { ToastProvider } from './components/Toast';
import { useWebMCP } from './hooks/useWebMCP';

function PortfolioApp() {
  const homeRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  const sectionRefs: Record<SectionId, React.RefObject<HTMLElement | null>> = {
    home: homeRef,
    about: aboutRef,
    projects: projectsRef,
    skills: skillsRef,
    contact: contactRef,
  };

  const scrollToSection = (sectionId: string) => {
    const targetRef = sectionRefs[sectionId as SectionId];
    if (targetRef && targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: 'smooth' });
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Register WebMCP tools for AI browser agents as per Modern Web Guidance
  useWebMCP(scrollToSection);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 relative selection:bg-cyan-500/30 selection:text-cyan-200">
      <Header onNavigate={(id) => scrollToSection(id)} />
      <main className="container mx-auto max-w-screen-xl px-5 sm:px-8 md:px-12 relative z-10">
        <Hero ref={homeRef} onNavigate={(id) => scrollToSection(id)} />
        <About ref={aboutRef} />
        <Skills ref={skillsRef} />
        <Projects ref={projectsRef} />
        <Contact ref={contactRef} />
      </main>
      <Footer onNavigate={(id) => scrollToSection(id)} />
      <Chatbot />
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <PortfolioApp />
    </ToastProvider>
  );
}