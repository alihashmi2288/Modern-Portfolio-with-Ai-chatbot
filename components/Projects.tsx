import React, { forwardRef, useState } from 'react';
import type { Project } from '../types';
import Section from './Section';
import { GithubIcon, ExternalLinkIcon } from './IconComponents';
import ProjectIdeaGenerator from './ProjectIdeaGenerator';

const projectsData: Project[] = [
  {
    title: 'AI-Powered Resume Builder',
    description: 'Built a web application that uses LLM APIs to parse user input, generate content suggestions, and auto-format resumes into ATS-friendly layouts. Developed with Next.js and TypeScript, delivering a responsive interface for job seekers to create optimized resumes in minutes.',
    tags: ['Next.js', 'TypeScript', 'LLM APIs', 'ATS Layouts', 'Tailwind CSS', 'Vercel'],
    imageUrl: '/images/resume_builder_mockup.png',
    category: 'AI & LLM',
    featured: true,
    liveUrl: 'https://resume-builder-ali.vercel.app',
    repoUrl: 'https://github.com/alihashmi2288',
  },
  {
    title: 'PDF Tools with AI Chat',
    description: 'Built a web application enabling users to upload PDF documents and interact with them through AI-powered chat. Integrated LLM APIs with PDF parsing to enable intelligent content extraction, summarization, and query responses.',
    tags: ['Next.js', 'FastAPI', 'Python', 'PDF Parsing', 'LLM APIs'],
    imageUrl: '/images/pdf_chat_mockup.png',
    category: 'AI & LLM',
    featured: true,
    liveUrl: 'https://pdf-tools-with-ai-chat.vercel.app',
    repoUrl: 'https://github.com/alihashmi2288',
  },
  {
    title: 'Creative Realm Designs',
    description: 'Designed and developed a premium digital agency landing page at the intersection of creative design and modern web performance. Features obsidian dark mode, smooth scroll animations, glassmorphism UI components, dynamic statistics counters, and highly responsive page layouts.',
    tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
    imageUrl: '/images/creative_realm_mockup.png',
    category: 'Web3 & Agency',
    featured: true,
    liveUrl: 'https://creative-realm-designs.vercel.app/',
    repoUrl: 'https://github.com/alihashmi2288/creative-Realm-Designs',
  },
  {
    title: 'Reverse Sales Tax Calculator',
    description: 'Developed an advanced financial utility web application to back-calculate pre-tax amounts from total receipts. Features multiple computation modes including Single Item, Multiple Items, Implied Rate Finder, and CSV Batch Processing. Includes preloaded tax rate databases for US states and international GST/VAT.',
    tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'CSV Parsing', 'Vercel'],
    imageUrl: '/images/reverse_tax_calculator_mockup.png',
    category: 'Financial Tech',
    liveUrl: 'https://reversesalestaxcalculator.vercel.app',
    repoUrl: 'https://github.com/alihashmi2288/reversesalestaxcalculator',
  },
  {
    title: 'The Codrex — Digital Agency Website',
    description: 'Designed and developed a production website for a digital agency using a high-performance architecture and custom UI/UX layouts.',
    tags: ['Next.js', 'Tailwind CSS', 'UI/UX Design', 'High Performance'],
    imageUrl: '/images/codrex_agency_mockup.png',
    category: 'Web3 & Agency',
    liveUrl: 'https://thecodrex.com',
    repoUrl: 'https://github.com/alihashmi2288',
  },
];

const CATEGORIES = ['All', 'AI & LLM', 'Web3 & Agency', 'Financial Tech'];

const Projects = forwardRef<HTMLElement>((props, ref) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [previewImage, setPreviewImage] = useState<{ src: string; title: string } | null>(null);

  const filteredProjects = selectedCategory === 'All'
    ? projectsData
    : projectsData.filter((p) => p.category === selectedCategory);

  return (
    <Section ref={ref} id="projects">
      {/* Header with Technical Eyebrow and Geist Sans Heading */}
      <div className="text-center mb-12 reveal-on-scroll">
        <span className="font-mono text-xs uppercase tracking-wider text-[#8f8f8f] font-medium block">
          // PRODUCTION WORK & CASE STUDIES
        </span>
        <h2 className="text-3xl sm:text-4xl font-semibold text-[#171717] tracking-[-1.28px] mt-2">
          Featured Projects
        </h2>
        <p className="mt-2.5 max-w-xl mx-auto text-[#4d4d4d] text-base">
          Production applications spanning full-stack development, Agentic AI, and responsive modern web experiences.
        </p>

        {/* Category Filters: rounded-[64px] */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-[64px] text-xs sm:text-sm font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-[#171717] text-white shadow-sm'
                  : 'bg-white text-[#4d4d4d] hover:text-[#171717] border border-[#ebebeb] shadow-whisper'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects List */}
      <div className="space-y-10 sm:space-y-12">
        {filteredProjects.map((project, index) => {
          const isOdd = index % 2 === 1;
          return (
            <div
              key={project.title}
              className="bg-white p-6 sm:p-8 rounded-[16px] border border-[#ebebeb] shadow-whisper hover:shadow-floating transition-all grid md:grid-cols-12 gap-8 items-center reveal-on-scroll"
            >
              {/* Image Preview Thumbnail in Hairline Device Frame */}
              <div
                className={`md:col-span-6 cursor-pointer group ${
                  isOdd ? 'md:order-2' : 'md:order-1'
                }`}
                onClick={() => setPreviewImage({ src: project.imageUrl, title: project.title })}
              >
                <div className="relative overflow-hidden rounded-[12px] border border-[#ebebeb] bg-[#fafafa]">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-auto object-cover transform group-hover:scale-[1.02] transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop';
                    }}
                  />
                  <div className="absolute inset-0 bg-[#171717]/10 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200">
                    <span className="px-3.5 py-1.5 rounded-[100px] bg-white border border-[#ebebeb] text-xs font-mono font-medium text-[#171717] shadow-floating">
                      Click to Preview
                    </span>
                  </div>
                </div>
              </div>

              {/* Project Content */}
              <div className={`md:col-span-6 ${isOdd ? 'md:order-1' : 'md:order-2'}`}>
                {project.category && (
                  <span className="text-xs font-mono font-medium text-[#8f8f8f] uppercase tracking-wider block mb-1">
                    {project.category}
                  </span>
                )}
                <h3 className="text-2xl sm:text-3xl font-semibold text-[#171717] tracking-[-0.4px] mb-3">
                  {project.title}
                </h3>
                <p className="text-[#4d4d4d] mb-5 text-sm sm:text-base leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Tags: rounded-[6px] with Geist Mono */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-[#f2f2f2] text-[#4d4d4d] text-xs font-mono px-2.5 py-1 rounded-[6px] border border-[#ebebeb]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Links: 6px square app controls */}
                <div className="flex items-center gap-3">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[6px] bg-[#171717] text-white font-medium text-sm hover:bg-black/90 transition-colors shadow-sm"
                    >
                      <ExternalLinkIcon className="w-3.5 h-3.5" />
                      <span>Live Demo</span>
                    </a>
                  )}
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-[6px] bg-white border border-[#ebebeb] hover:border-[#171717] text-[#171717] font-medium text-sm transition-colors shadow-whisper"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      <span>Repository</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Image Preview Lightbox Modal */}
      {previewImage && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8 animate-fade-in"
          onClick={() => setPreviewImage(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-white border border-[#ebebeb] rounded-[16px] overflow-hidden shadow-floating-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-[#ebebeb]">
              <h4 className="text-[#171717] font-semibold text-base">{previewImage.title}</h4>
              <button
                onClick={() => setPreviewImage(null)}
                className="text-[#8f8f8f] hover:text-[#171717] text-xl p-1 leading-none rounded-[6px] hover:bg-[#f2f2f2]"
                aria-label="Close dialog"
              >
                &times;
              </button>
            </div>
            <div className="p-4 bg-[#fafafa]">
              <img
                src={previewImage.src}
                alt={previewImage.title}
                className="w-full h-auto max-h-[75vh] object-contain rounded-[8px] border border-[#ebebeb]"
              />
            </div>
          </div>
        </div>
      )}

      {/* AI Idea Generator Section */}
      <div className="mt-20 sm:mt-28">
        <ProjectIdeaGenerator />
      </div>
    </Section>
  );
});

Projects.displayName = 'Projects';

export default Projects;