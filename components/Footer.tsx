import React from 'react';
import type { SectionId } from '../types';

interface FooterProps {
  onNavigate: (section: SectionId) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
    return (
        <footer className="py-12 text-center text-slate-500 border-t border-slate-800/50">
            <div className="container mx-auto max-w-screen-xl px-6 md:px-12">
                <div className="flex justify-center items-center gap-6 mb-6">
                  <button onClick={() => onNavigate('home')} className="hover:text-cyan-400 transition-colors duration-300">Home</button>
                  <button onClick={() => onNavigate('about')} className="hover:text-cyan-400 transition-colors duration-300">About</button>
                  <button onClick={() => onNavigate('projects')} className="hover:text-cyan-400 transition-colors duration-300">Projects</button>
                  <button onClick={() => onNavigate('contact')} className="hover:text-cyan-400 transition-colors duration-300">Contact</button>
                </div>
                <p className="text-sm">
                    Designed & Built by Syed Ali Hashmi
                </p>
                <p className="text-xs mt-2">
                    &copy; 2024. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;