'use client';

import React, { useRef, useEffect } from 'react';
import type { SectionId } from '@/types';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Projects from '@/components/Projects';
import Certifications from '@/components/Certifications';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';
import ProjectIdeaGenerator from '@/components/ProjectIdeaGenerator';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';
import { useWebMCP } from '@/hooks/useWebMCP';

export default function PortfolioApp() {
  const homeRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const certificationsRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  const sectionRefs: Record<SectionId, React.RefObject<HTMLElement | null>> = {
    home: homeRef,
    about: aboutRef,
    projects: projectsRef,
    certifications: certificationsRef,
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

  // Fallback for scroll-driven animations if not natively supported
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!window.CSS || !CSS.supports('((animation-timeline: view()) and (animation-range: entry))')) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const el = entry.target as HTMLElement;
              el.style.opacity = '1';
              el.style.transform = 'translateY(0)';
              observer.unobserve(el);
            }
          });
        },
        { rootMargin: '0px 0px -40px 0px', threshold: 0.1 }
      );

      document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
        const htmlEl = el as HTMLElement;
        htmlEl.style.opacity = '0';
        htmlEl.style.transform = 'translateY(16px)';
        htmlEl.style.transition = 'opacity 260ms var(--ease-out), transform 260ms var(--ease-out)';
        observer.observe(htmlEl);
      });

      return () => observer.disconnect();
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#fafafa] text-[#4d4d4d] font-sans relative selection:bg-[#171717] selection:text-white">
      <Header onNavigate={(id) => scrollToSection(id)} />
      <main className="container mx-auto max-w-[1200px] px-5 sm:px-8 md:px-10 relative z-10">
        <Hero ref={homeRef} onNavigate={(id) => scrollToSection(id)} />
        <About ref={aboutRef} />
        <Services ref={servicesRef} />
        <Skills ref={skillsRef} />
        <Projects ref={projectsRef} />
        <Certifications ref={certificationsRef} />
        <Contact ref={contactRef} />
        <section id="idea-generator" className="pb-24 md:pb-32">
          <ProjectIdeaGenerator />
        </section>
      </main>
      <Footer onNavigate={(id) => scrollToSection(id)} />
      <Chatbot />
    </div>
  );
}
