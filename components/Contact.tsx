import React, { forwardRef } from 'react';
import Section from './Section';
import { GithubIcon, LinkedinIcon, MailIcon } from './IconComponents';

const Contact = forwardRef<HTMLElement>((props, ref) => {
    return (
        <Section ref={ref} id="contact" className="text-center py-32">
             <div className="max-w-3xl mx-auto">
                 <h2 className="text-4xl font-bold text-slate-100 mb-4">
                    Let's Build Something <span className="text-cyan-400">Amazing</span>
                </h2>
                <p className="max-w-2xl mx-auto text-lg text-slate-400 mb-10">
                    I'm currently open to new opportunities and collaborations. My inbox is always open, so whether you have a question, a project idea, or just want to say hi, feel free to reach out!
                </p>
                <a 
                    href="mailto:hashmi.ali2288@gmail.com"
                    className="inline-block bg-cyan-500 text-white font-bold py-4 px-10 rounded-full hover:bg-cyan-600 transition-all duration-300 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-105 transform"
                >
                    Say Hello
                </a>
                 <div className="flex justify-center items-center gap-8 mt-12">
                    <a href="https://github.com/alihashmi2288" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyan-400 transition-all duration-300 transform hover:scale-110">
                        <GithubIcon className="w-8 h-8" />
                    </a>
                    <a href="https://linkedin.com/in/alihashmi2288" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyan-400 transition-all duration-300 transform hover:scale-110">
                        <LinkedinIcon className="w-8 h-8" />
                    </a>
                    <a href="mailto:hashmi.ali2288@gmail.com" className="text-slate-400 hover:text-cyan-400 transition-all duration-300 transform hover:scale-110">
                        <MailIcon className="w-8 h-8" />
                    </a>
                </div>
            </div>
        </Section>
    );
});

Contact.displayName = 'Contact';

export default Contact;