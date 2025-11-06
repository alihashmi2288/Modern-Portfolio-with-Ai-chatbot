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

export default function App() {
  const homeRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  const sectionRefs: Record<SectionId, React.RefObject<HTMLElement>> = {
    home: homeRef,
    about: aboutRef,
    projects: projectsRef,
    skills: skillsRef,
    contact: contactRef,
  };

  const scrollToSection = (sectionId: SectionId) => {
    sectionRefs[sectionId].current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-slate-950 text-slate-300 selection:bg-cyan-300 selection:text-cyan-900">
      <div className="animated-bg"></div>
      <Header onNavigate={scrollToSection} />
      <main className="container mx-auto max-w-screen-lg px-6 md:px-12">
        <Hero ref={homeRef} onNavigate={scrollToSection} />
        <About ref={aboutRef} />
        <Skills ref={skillsRef} />
        <Projects ref={projectsRef} />
        <Contact ref={contactRef} />
      </main>
      <Footer onNavigate={scrollToSection} />
      <Chatbot />
    </div>
  );
}