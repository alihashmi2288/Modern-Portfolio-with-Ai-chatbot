import React, { forwardRef, useRef, useEffect } from 'react';
import Section from './Section';
import { DownloadIcon } from './IconComponents';

const About = forwardRef<HTMLElement>((props, ref) => {
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;

        const handleMouseMove = (e: MouseEvent) => {
            const { left, top, width, height } = card.getBoundingClientRect();
            const x = e.clientX - left;
            const y = e.clientY - top;
            const rotateX = (y - height / 2) / (height / 2) * -10;
            const rotateY = (x - width / 2) / (width / 2) * 10;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        };

        const handleMouseLeave = () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
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
            <h2 className="text-center text-4xl font-bold text-slate-100 mb-12">
                About <span className="text-cyan-400">Me</span>
            </h2>
            <div className="grid md:grid-cols-5 gap-12 items-center">
                <div className="md:col-span-3 text-slate-400 text-lg space-y-6">
                    <p>
                        As a BS Software Engineering student at UBIT, Karachi University, I am building a strong foundation in technology and problem-solving, with a keen focus on creating elegant and efficient solutions.
                    </p>
                    <p>
                        I am also enrolled in the Certified Cloud Applied Generative AI course under the Governor Sindh Pakistan Initiative, enhancing my expertise in AI applications and modern cloud architectures.
                    </p>
                    <p>
                         I am deeply committed to applying my skills to innovative projects that drive technological advancement and create meaningful user experiences.
                    </p>
                    <div className="mt-8">
                         <a 
                            href="/Syed_Ali_Hashmi_Resume.pdf"
                            download
                            className="inline-flex items-center gap-2 bg-slate-800/70 text-cyan-400 font-bold py-3 px-6 rounded-full hover:bg-slate-800 transition-all duration-300 transform hover:scale-105 border border-cyan-500/50"
                        >
                           <DownloadIcon className="w-5 h-5" />
                           Download CV
                        </a>
                    </div>
                </div>
                <div className="md:col-span-2 flex justify-center items-center">
                    <div ref={cardRef} className="tilt-card w-full max-w-xs transition-transform duration-300 ease-out">
                        <div className="relative group">
                            <div className="absolute -inset-1.5 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                            <div className="relative p-1 bg-slate-900 rounded-lg leading-none flex items-center">
                               <img src="/images/About.jpg" alt="Syed Ali Hashmi" className="w-full h-auto rounded-md" />
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