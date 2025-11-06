import React, { forwardRef, useState, useEffect } from 'react';
import { GithubIcon, LinkedinIcon, DownloadIcon } from './IconComponents';
import type { SectionId } from '../types';

const roles = ["Software Engineer.", "Creative Coder.", "AI Driven Developer."];

const Typewriter: React.FC = () => {
    const [index, setIndex] = useState(0);
    const [subIndex, setSubIndex] = useState(0);
    const [reverse, setReverse] = useState(false);
    const [blink, setBlink] = useState(true);

    useEffect(() => {
        if (index === roles.length) {
            setIndex(0);
            return;
        }

        if (subIndex === roles[index].length + 1 && !reverse) {
            setReverse(true);
            return;
        }

        if (subIndex === 0 && reverse) {
            setReverse(false);
            setIndex((prev) => (prev + 1) % roles.length);
            return;
        }

        const timeout = setTimeout(() => {
            setSubIndex((prev) => prev + (reverse ? -1 : 1));
        }, Math.max(reverse ? 75 : subIndex === roles[index].length ? 1000 : 150, Math.random() * 350));

        return () => clearTimeout(timeout);
    }, [subIndex, index, reverse]);
    
     useEffect(() => {
        const timeout2 = setTimeout(() => {
            setBlink(prev => !prev);
        }, 500);
        return () => clearTimeout(timeout2);
    }, [blink]);


    return (
        <span className="text-cyan-400">
            {`${roles[index].substring(0, subIndex)}`}
            <span className={`transition-opacity duration-300 ${blink ? 'opacity-100' : 'opacity-0'}`}>|</span>
        </span>
    );
};


const Hero = forwardRef<HTMLElement, HeroProps>(({ onNavigate }, ref) => {
    return (
        <section ref={ref} id="home" className="min-h-screen flex flex-col justify-center items-center text-center">
            <div className="max-w-4xl animate-fade-in">
                <p className="text-lg text-slate-400 mb-2 font-light">Hello, I'm</p>
                <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-slate-100 tracking-tighter leading-tight">
                    Syed Ali Hashmi.
                </h1>
                <h2 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-bold text-slate-300 tracking-tight">
                    I'm a <Typewriter />
                </h2>
                <p className="mt-6 max-w-xl mx-auto text-lg text-slate-400">
                    A passionate Software Engineering student building interactive web projects and exploring intelligent solutions with AI and Machine Learning.
                </p>
                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button 
                        onClick={() => onNavigate('contact')}
                        className="bg-cyan-500 text-white font-bold py-3 px-8 rounded-full hover:bg-cyan-600 transition-all duration-300 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-105 transform"
                    >
                       Hire Me
                    </button>
                    <a 
                        href="/Syed_Ali_Hashmi_Resume.pdf"
                        download
                        className="flex items-center gap-2 bg-transparent border-2 border-slate-600 text-white font-bold py-3 px-8 rounded-full hover:bg-slate-800/50 hover:border-cyan-500 transition-all duration-300 transform hover:scale-105"
                    >
                       <DownloadIcon className="w-5 h-5" />
                       Download CV
                    </a>
                </div>
            </div>
             <div className="absolute bottom-5 left-1/2 -translate-x-1/2">
                <button onClick={() => onNavigate('about')} aria-label="Scroll down">
                  <svg className="w-8 h-8 text-slate-500 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </button>
            </div>
        </section>
    );
});

interface HeroProps {
    onNavigate: (section: SectionId) => void;
}

Hero.displayName = 'Hero';

export default Hero;