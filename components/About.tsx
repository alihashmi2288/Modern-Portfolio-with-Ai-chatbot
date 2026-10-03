import React, { forwardRef, useRef, useEffect, useState } from 'react';
import Section from './Section';
import { DownloadIcon } from './IconComponents';

const About = forwardRef<HTMLElement>((props, ref) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'story' | 'journey'>('story');

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = card.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;
      const rotateX = ((y - height / 2) / (height / 2)) * -8;
      const rotateY = ((x - width / 2) / (width / 2)) * 8;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    };

    const handleMouseLeave = () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <Section ref={ref} id="about">
      <div className="text-center mb-12 reveal-on-scroll">
        <span className="text-cyan-400 font-mono text-sm tracking-wider uppercase">Background & Experience</span>
        <h2 className="text-3xl sm:text-5xl font-black text-slate-100 tracking-tight mt-2">
          About <span className="gradient-text">Me</span>
        </h2>
      </div>

      <div className="grid lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Interactive Story & Journey */}
        <div className="lg:col-span-7 space-y-6">
          {/* Navigation Toggle */}
          <div className="inline-flex p-1 rounded-xl bg-slate-900/80 border border-slate-800">
            <button
              onClick={() => setActiveTab('story')}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'story'
                  ? 'bg-cyan-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              My Story
            </button>
            <button
              onClick={() => setActiveTab('journey')}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'journey'
                  ? 'bg-cyan-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Milestones & Timeline
            </button>
          </div>

          {activeTab === 'story' ? (
            <div className="space-y-4 text-slate-300 text-base sm:text-lg leading-relaxed glass-card p-6 sm:p-8 rounded-2xl animate-fade-in">
              <p>
                I'm a dedicated Software Engineering student at <strong className="text-cyan-300 font-semibold">UBIT, University of Karachi</strong> (currently in my 6th semester), with hands-on experience architecting high-performance full-stack web applications and AI-driven systems.
              </p>
              <p>
                My expertise centers around the modern JavaScript & TypeScript ecosystem with <span className="text-slate-100 font-medium">Next.js and React</span>, combined with high-performance Python backends using <span className="text-slate-100 font-medium">FastAPI and OpenAI / GenAI APIs</span>.
              </p>
              <p>
                Operating at an intermediate engineering level, I actively architect <strong className="text-cyan-300 font-semibold">Agentic AI workflows</strong>, production web backends, and responsive client experiences, eager to deliver scalable, measurable impact to innovative engineering teams.
              </p>

              <div className="pt-4 flex flex-wrap gap-3">
                <a
                  href="/Syed%20Ali%20Hashmi%20Resume.pdf"
                  download="Syed Ali Hashmi Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 font-semibold py-2.5 px-5 rounded-xl border border-cyan-500/30 transition-all transform hover:scale-[1.02]"
                >
                  <DownloadIcon className="w-4 h-4" />
                  Download Resume
                </a>
              </div>
            </div>
          ) : (
            <div className="space-y-4 glass-card p-6 sm:p-8 rounded-2xl animate-fade-in">
              {/* Timeline Items */}
              <div className="relative pl-6 border-l-2 border-cyan-500/30 space-y-6">
                <div>
                  <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-cyan-500 border-4 border-slate-950"></div>
                  <span className="text-xs font-mono text-cyan-400 uppercase font-bold">2023 — Present</span>
                  <h4 className="text-lg font-bold text-slate-100">BS Software Engineering (6th Semester)</h4>
                  <p className="text-sm text-slate-400">UBIT, University of Karachi — Data Structures, Algorithms, Software Architecture & Distributed Systems.</p>
                </div>

                <div>
                  <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-cyan-500 border-4 border-slate-950"></div>
                  <span className="text-xs font-mono text-cyan-400 uppercase font-bold">In Progress</span>
                  <h4 className="text-lg font-bold text-slate-100">AI, Web 3.0 & Metaverse Specialization</h4>
                  <p className="text-sm text-slate-400">Governor Sindh IT Initiative (GIAIC) — Deep-dive into Agentic AI, Next.js 15, and LLM integrations.</p>
                </div>

                <div>
                  <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-cyan-500 border-4 border-slate-950"></div>
                  <span className="text-xs font-mono text-cyan-400 uppercase font-bold">Apr 2026 — Jun 2026</span>
                  <h4 className="text-lg font-bold text-slate-100">Full Stack Developer — Ventora Business Solutions</h4>
                  <p className="text-sm text-slate-400">Engineered responsive client interfaces and API microservices using modern Next.js and REST architectures.</p>
                </div>

                <div>
                  <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-cyan-500 border-4 border-slate-950"></div>
                  <span className="text-xs font-mono text-cyan-400 uppercase font-bold">Certifications</span>
                  <h4 className="text-lg font-bold text-slate-100">Flutter Mobile Dev & NAVTTC Honors</h4>
                  <p className="text-sm text-slate-400">Jawan Pakistan (Flutter App Development) and NAVTTC Amazon Private Label certified.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Holographic Photo & Quick Info Card */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          <div
            ref={cardRef}
            className="w-full max-w-sm transition-transform duration-200 ease-out will-change-transform"
          >
            <div className="relative group p-1.5 rounded-3xl bg-gradient-to-br from-cyan-500/40 via-blue-500/20 to-purple-500/30 shadow-2xl border border-slate-700/50">
              <div className="relative overflow-hidden rounded-2xl bg-slate-900">
                <img
                  src="/images/About.jpg"
                  alt="Syed Ali Hashmi"
                  className="w-full h-auto object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    // Fallback to placeholder if image fails to load
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534972195531-a756b1129f63?q=80&w=600&auto=format&fit=crop';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-slate-950/80 backdrop-blur-md border border-slate-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-slate-100 text-sm">Syed Ali Hashmi</p>
                      <p className="text-xs text-cyan-400">Karachi, Pakistan (PKT)</p>
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Open to Work
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
});

About.displayName = 'About';

export default About;