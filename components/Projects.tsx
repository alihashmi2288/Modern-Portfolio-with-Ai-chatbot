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
    description: 'Designed and developed a premium, high-end digital agency landing page at the intersection of creative design and Web3 innovation. Features sleek obsidian dark mode, smooth scroll animations, glassmorphism UI components, dynamic statistics counters, and highly responsive page layouts.',
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
      <div className="text-center mb-12 reveal-on-scroll">
        <span className="text-cyan-400 font-mono text-sm tracking-wider uppercase">Portfolio Showcase</span>
        <h2 className="text-3xl sm:text-5xl font-black text-slate-100 tracking-tight mt-2">
          Featured <span className="gradient-text">Projects</span>
        </h2>
        <p className="mt-4 max-w-xl mx-auto text-slate-400 text-base">
          Production applications spanning full-stack development, Agentic AI, and responsive modern web experiences.
        </p>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/25'
                  : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects List */}
      <div className="space-y-16 sm:space-y-24">
        {filteredProjects.map((project, index) => {
          const isOdd = index % 2 === 1;
          return (
            <div
              key={project.title}
              className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-800/80 grid md:grid-cols-12 gap-8 items-center reveal-on-scroll"
            >
              {/* Image Preview Thumbnail */}
              <div
                className={`md:col-span-6 relative group cursor-pointer ${
                  isOdd ? 'md:order-2' : 'md:order-1'
                }`}
                onClick={() => setPreviewImage({ src: project.imageUrl, title: project.title })}
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur-md opacity-30 group-hover:opacity-75 transition duration-500"></div>
                <div className="relative overflow-hidden rounded-xl border border-slate-700/60 bg-slate-950">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop';
                    }}
                  />
                  <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                    <span className="px-4 py-2 rounded-full bg-slate-900/90 border border-cyan-500/40 text-xs font-semibold text-cyan-300">
                      Click to Preview
                    </span>
                  </div>
                </div>
              </div>

              {/* Project Content */}
              <div className={`md:col-span-6 ${isOdd ? 'md:order-1' : 'md:order-2'}`}>
                {project.category && (
                  <span className="text-xs font-mono font-semibold text-cyan-400 uppercase tracking-wider">
                    {project.category}
                  </span>
                )}
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-100 mt-1 mb-3">
                  {project.title}
                </h3>
                <p className="text-slate-400 mb-6 text-sm sm:text-base leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-slate-900/90 text-cyan-300 text-xs font-mono px-3 py-1 rounded-lg border border-slate-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Links */}
                <div className="flex items-center gap-4">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-sm hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-500/20"
                    >
                      <ExternalLinkIcon className="w-4 h-4" />
                      <span>Live Demo</span>
                    </a>
                  )}
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-500/50 text-slate-300 hover:text-white font-medium text-sm transition-colors"
                    >
                      <GithubIcon className="w-4 h-4" />
                      <span>Code Repository</span>
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
          className="fixed inset-0 z-[9999] bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fade-in"
          onClick={() => setPreviewImage(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-3 border-b border-slate-800">
              <h4 className="text-slate-200 font-bold text-base">{previewImage.title}</h4>
              <button
                onClick={() => setPreviewImage(null)}
                className="text-slate-400 hover:text-white text-xl p-1 leading-none rounded-lg hover:bg-slate-800"
                aria-label="Close dialog"
              >
                &times;
              </button>
            </div>
            <div className="p-2">
              <img
                src={previewImage.src}
                alt={previewImage.title}
                className="w-full h-auto max-h-[75vh] object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      )}

      {/* AI Idea Generator Section */}
      <div className="mt-24 sm:mt-32">
        <ProjectIdeaGenerator />
      </div>
    </Section>
  );
});

Projects.displayName = 'Projects';

export default Projects;