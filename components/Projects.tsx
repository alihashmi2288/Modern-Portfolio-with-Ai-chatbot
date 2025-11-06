import React, { forwardRef } from 'react';
import type { Project } from '../types';
import Section from './Section';
import { GithubIcon, ExternalLinkIcon } from './IconComponents';
import ProjectIdeaGenerator from './ProjectIdeaGenerator';

const projectsData: Project[] = [
    {
        title: 'DataSweeper AI',
        description: 'An intelligent data cleaning tool built with Streamlit and Pandas. Upload CSV files and let AI handle missing values, duplicates, and formatting issues effortlessly.',
        tags: ['Streamlit', 'Python', 'Pandas', 'Data Cleaning', 'AI'],
        imageUrl: '/images/DataSweeper AI.jpg',
        liveUrl: 'https://datasweeperbyali.streamlit.app/',
        repoUrl: 'https://github.com/alihashmi2288/DATA-SWEEPER-Growth-Mindset-Challenge-GIACI-',
    },
    {
        title: 'AI Resume Analyzer',
        description: 'A powerful resume analysis app that provides an ATS score, extracts key information, and offers AI-driven recommendations to improve your CV, all within a clean Streamlit interface.',
        tags: ['Streamlit', 'Python', 'NLP', 'AI', 'Resume ATS'],
        imageUrl: '/images/AI Resume Analyzer.jpg',
        liveUrl: 'https://ai-analyzer-hashmi.streamlit.app',
        repoUrl: 'https://github.com/alihashmi2288/AI-Analyzor-',
    },
    {
        title: 'Crypto & Stock Market Dashboard',
        description: 'A real-time dashboard for tracking cryptocurrency and stock market data. Features interactive charts, historical data analysis, and a clean user interface built with Streamlit.',
        tags: ['Streamlit', 'Python', 'API', 'Data Viz', 'Finance'],
        imageUrl: '/images/Crypto & Stock Market Dashboard.jpg',
        liveUrl: 'https://crypto-stock-market-dashboard.streamlit.app/',
        repoUrl: 'https://github.com/alihashmi2288/Crypto-Stock-Market-Dashboard',
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