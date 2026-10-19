import React, { forwardRef, useState } from 'react';
import Section from './Section';
import { DownloadIcon } from './IconComponents';

const About = forwardRef<HTMLElement>((props, ref) => {
  const [activeTab, setActiveTab] = useState<'story' | 'journey'>('story');

  return (
    <Section ref={ref} id="about">
      {/* Section Header with Geist Mono Eyebrow and Heading-lg */}
      <div className="text-center mb-12 reveal-on-scroll">
        <span className="font-mono text-xs uppercase tracking-wider text-[#8f8f8f] font-medium block">
          // BACKGROUND & EXPERIENCE
        </span>
        <h2 className="text-3xl sm:text-4xl font-semibold text-[#171717] tracking-[-1.28px] mt-2">
          About Me
        </h2>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* Left Column: Interactive Story & Journey */}
        <div className="lg:col-span-7 space-y-6">
          {/* Category Tabs: rounded-[64px] pills */}
          <div className="inline-flex p-1 rounded-[64px] bg-[#f2f2f2] border border-[#ebebeb]">
            <button
              onClick={() => setActiveTab('story')}
              className={`px-5 py-2 rounded-[64px] text-sm font-medium transition-all ${
                activeTab === 'story'
                  ? 'bg-[#171717] text-white shadow-sm'
                  : 'text-[#4d4d4d] hover:text-[#171717]'
              }`}
            >
              My Story
            </button>
            <button
              onClick={() => setActiveTab('journey')}
              className={`px-5 py-2 rounded-[64px] text-sm font-medium transition-all ${
                activeTab === 'journey'
                  ? 'bg-[#171717] text-white shadow-sm'
                  : 'text-[#4d4d4d] hover:text-[#171717]'
              }`}
            >
              Milestones & Timeline
            </button>
          </div>

          {activeTab === 'story' ? (
            <div className="space-y-4 text-[#4d4d4d] text-base sm:text-[17px] leading-relaxed bg-white border border-[#ebebeb] p-6 sm:p-8 rounded-[12px] shadow-whisper animate-fade-in">
              <p>
                I'm a Software Engineering student at <strong className="text-[#171717] font-semibold">UBIT, University of Karachi</strong> (currently in my 6th semester), with direct experience architecting high-performance full-stack web applications and AI-driven systems.
              </p>
              <p>
                My focus centers on the modern TypeScript ecosystem with <span className="text-[#171717] font-medium">Next.js and React 19</span>, combined with high-performance Python backends utilizing <span className="text-[#171717] font-medium">FastAPI and OpenAI / Gemini APIs</span>.
              </p>
              <p>
                Operating at an intermediate engineering level, I architect <strong className="text-[#171717] font-semibold">Agentic AI workflows</strong>, production web backends, and responsive client experiences, eager to deliver measurable impact to modern engineering teams.
              </p>

              <div className="pt-4 flex flex-wrap gap-3">
                <a
                  href="/Syed%20Ali%20Hashmi%20Resume.pdf"
                  download="Syed Ali Hashmi Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white hover:bg-[#fafafa] text-[#171717] font-medium text-sm py-2.5 px-5 rounded-[100px] border border-[#ebebeb] shadow-whisper hover:border-[#171717] transition-all"
                >
                  <DownloadIcon className="w-4 h-4" />
                  <span>Download Resume</span>
                </a>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-[#ebebeb] p-6 sm:p-8 rounded-[12px] shadow-whisper animate-fade-in">
              {/* Timeline Items */}
              <div className="relative pl-6 border-l border-[#ebebeb] space-y-7">
                <div>
                  <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#171717] border-2 border-white"></div>
                  <span className="text-xs font-mono text-[#8f8f8f] uppercase font-medium">2023 — Present</span>
                  <h4 className="text-base font-semibold text-[#171717] mt-0.5">BS Software Engineering (6th Semester)</h4>
                  <p className="text-sm text-[#4d4d4d] mt-1 leading-normal">UBIT, University of Karachi — Data Structures, Algorithms, Software Architecture & Distributed Systems.</p>
                </div>

                <div>
                  <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#171717] border-2 border-white"></div>
                  <span className="text-xs font-mono text-[#8f8f8f] uppercase font-medium">In Progress</span>
                  <h4 className="text-base font-semibold text-[#171717] mt-0.5">AI, Web 3.0 & Metaverse Specialization</h4>
                  <p className="text-sm text-[#4d4d4d] mt-1 leading-normal">Governor Sindh IT Initiative (GIAIC) — Deep-dive into Agentic AI, Next.js, and LLM integrations.</p>
                </div>

                <div>
                  <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#171717] border-2 border-white"></div>
                  <span className="text-xs font-mono text-[#8f8f8f] uppercase font-medium">Apr 2026 — Jun 2026</span>
                  <h4 className="text-base font-semibold text-[#171717] mt-0.5">Full Stack Developer — Ventora Business Solutions</h4>
                  <p className="text-sm text-[#4d4d4d] mt-1 leading-normal">Engineered responsive client interfaces and API microservices using modern Next.js and REST architectures.</p>
                </div>

                <div>
                  <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#171717] border-2 border-white"></div>
                  <span className="text-xs font-mono text-[#8f8f8f] uppercase font-medium">Certifications</span>
                  <h4 className="text-base font-semibold text-[#171717] mt-0.5">Flutter Mobile Dev & NAVTTC Honors</h4>
                  <p className="text-sm text-[#4d4d4d] mt-1 leading-normal">Jawan Pakistan (Flutter App Development) and NAVTTC Amazon Private Label certified.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Clean Photo & Spec Card */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          <div className="w-full max-w-sm">
            <div className="rounded-[16px] border border-[#ebebeb] bg-white p-2 shadow-whisper">
              <div className="relative overflow-hidden rounded-[12px] bg-[#fafafa]">
                <img
                  src="/images/About.jpg"
                  alt="Syed Ali Hashmi"
                  className="w-full h-auto object-cover object-center"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534972195531-a756b1129f63?q=80&w=600&auto=format&fit=crop';
                  }}
                />
                
                <div className="p-3.5 border-t border-[#ebebeb] bg-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-[#171717] text-sm">Syed Ali Hashmi</p>
                      <p className="text-xs text-[#8f8f8f] font-mono">Karachi, PK (PKT)</p>
                    </div>
                    <span className="text-xs font-mono px-2 py-0.5 rounded-[6px] bg-[#f2f2f2] text-[#171717] border border-[#ebebeb]">
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