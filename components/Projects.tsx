import React, { forwardRef } from 'react';
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
        liveUrl: 'https://resume-builder-ali.vercel.app',
        repoUrl: 'https://github.com/alihashmi2288',
    },
    {
        title: 'PDF Tools with AI Chat',
        description: 'Built a web application enabling users to upload PDF documents and interact with them through AI-powered chat. Integrated LLM APIs with PDF parsing to enable intelligent content extraction, summarization, and query responses.',
        tags: ['Next.js', 'FastAPI', 'Python', 'PDF Parsing', 'LLM APIs'],
        imageUrl: '/images/pdf_chat_mockup.png',
        liveUrl: 'https://pdf-tools-with-ai-chat.vercel.app',
        repoUrl: 'https://github.com/alihashmi2288',
    },
    {
        title: 'Creative Realm Designs',
        description: 'Designed and developed a premium, high-end digital agency landing page at the intersection of creative design and Web3 innovation. Features sleek obsidian dark mode, smooth scroll animations, glassmorphism UI components, dynamic statistics counters, and highly responsive page layouts.',
        tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
        imageUrl: '/images/creative_realm_mockup.png',
        liveUrl: 'https://creative-realm-designs.vercel.app/',
        repoUrl: 'https://github.com/alihashmi2288/creative-Realm-Designs',
    },
    {
        title: 'Reverse Sales Tax Calculator',
        description: 'Developed an advanced financial utility web application to back-calculate pre-tax amounts from total receipts. Features multiple computation modes including Single Item, Multiple Items, Implied Rate Finder, and CSV Batch Processing. Includes preloaded tax rate databases for US states and international GST/VAT.',
        tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'CSV Parsing', 'Vercel'],
        imageUrl: '/images/reverse_tax_calculator_mockup.png',
        liveUrl: 'https://reversesalestaxcalculator.vercel.app',
        repoUrl: 'https://github.com/alihashmi2288/reversesalestaxcalculator',
    },
    {
        title: 'The Codrex — Digital Agency Website',
        description: 'Designed and developed a production website for a digital agency using a high-performance architecture and custom UI/UX layouts.',
        tags: ['Next.js', 'Tailwind CSS', 'UI/UX Design', 'High Performance'],
        imageUrl: '/images/codrex_agency_mockup.png',
        liveUrl: 'https://thecodrex.com',
        repoUrl: 'https://github.com/alihashmi2288',
    },
];

const Projects = forwardRef<HTMLElement>((props, ref) => {
    return (
        <Section ref={ref} id="projects">
            <h2 className="text-center text-4xl font-bold text-slate-100 mb-16">
                My Creative <span className="text-cyan-400">Projects</span>
            </h2>
            <div className="space-y-24">
                {projectsData.map((project, index) => (
                    <div key={project.title} className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                        <div className={`relative group ${index % 2 === 1 ? 'md:order-2' : 'md:order-1'}`}>
                            <div className="absolute -inset-1.5 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg blur opacity-50 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                            <div className="relative p-1 bg-slate-900 rounded-lg leading-none flex items-center">
                                <img src={project.imageUrl} alt={project.title} className="w-full h-auto rounded-md shadow-lg" />
                            </div>
                        </div>

                        <div className={`${index % 2 === 1 ? 'md:order-1' : 'md:order-2'}`}>
                            <h3 className="text-3xl font-bold text-slate-100 mb-4">{project.title}</h3>
                            <p className="text-slate-400 mb-6 text-lg">{project.description}</p>
                            <div className="flex flex-wrap gap-3 mb-6">
                                {project.tags.map(tag => (
                                    <span key={tag} className="bg-slate-800/70 text-cyan-400 text-sm font-mono px-3 py-1 rounded-full">{tag}</span>
                                ))}
                            </div>
                            <div className="flex items-center gap-4">
                                {project.repoUrl && (
                                    <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-300 hover:text-cyan-400 transition-colors duration-300 font-semibold">
                                        <GithubIcon className="w-6 h-6" />
                                        <span>Code</span>
                                    </a>
                                )}
                                {project.liveUrl && (
                                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-300 hover:text-cyan-400 transition-colors duration-300 font-semibold">
                                        <ExternalLinkIcon className="w-6 h-6" />
                                        <span>Live Demo</span>
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-32">
                 <ProjectIdeaGenerator />
            </div>
        </Section>
    );
});

Projects.displayName = 'Projects';

export default Projects;