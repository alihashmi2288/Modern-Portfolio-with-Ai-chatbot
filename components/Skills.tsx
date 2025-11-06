import React, { forwardRef } from 'react';
import type { Skill } from '../types';
import Section from './Section';
import { ReactIcon, TypeScriptIcon, NodeIcon, TailwindIcon, GitIcon, PythonIcon, OpenAIIcon, StreamlitIcon, OpenAIAgentKitIcon } from './IconComponents';

const skillsData: { category: string; list: Skill[] }[] = [
    {
        category: 'Frontend',
        list: [
            { name: 'React', icon: ReactIcon },
            { name: 'TypeScript', icon: TypeScriptIcon },
            { name: 'Tailwind CSS', icon: TailwindIcon },
            { name: 'Next.js', icon: (props) => <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" {...props}><path d="M16.928 2.348c-4.735 0-8.572 3.837-8.572 8.572s3.837 8.572 8.572 8.572 8.572-3.837 8.572-8.572-3.837-8.572-8.572-8.572zm0 15.932c-4.053 0-7.348-3.295-7.348-7.36s3.295-7.36 7.348-7.36 7.348 3.295 7.348 7.36-3.295 7.36-7.348 7.36zM3.658 9.242h3.816v1.272H4.93v2.544h2.544v1.272H3.658v2.544H2.386V9.242h1.272zm4.446 0h1.272l2.226 5.419 2.226-5.419h1.272v7.632H14.1v-5.69l-1.91 4.6-1.91-4.6v5.69H8.104V9.242z"/></svg> },
        ],
    },
    {
        category: 'Backend',
        list: [
            { name: 'Node.js', icon: NodeIcon },
            { name: 'Python', icon: PythonIcon },
        ],
    },
    {
        category: 'Tools & Databases',
        list: [
            { name: 'Git', icon: GitIcon },
            { name: 'Figma', icon: (props) => <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" {...props}><path d="M12 0c-2.75 0-5 2.25-5 5v5c0 2.75 2.25 5 5 5s5-2.25 5-5V5c0-2.75-2.25-5-5-5zM7 14.5c0 .28-.22.5-.5.5s-.5-.22-.5-.5v-4c0-.28.22-.5.5-.5s.5.22.5.5v4zM12 24c2.75 0 5-2.25 5-5s-2.25-5-5-5-5 2.25-5 5 2.25 5 5 5z"/></svg> },
            { name: 'MongoDB', icon: (props) => <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}><path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0111.91 24h.481c.114-3.032.284-6.017.51-8.956.417-.297.604-.463.85-.693a11.342 11.342 0 003.639-8.464c-.01-.814-.103-1.662-.197-2.332z" fill="#47A248"/><path d="M12.5 22.118c.093.055.15.135.15.23 0 .179-.145.325-.325.325s-.325-.146-.325-.325c0-.095.057-.175.15-.23v-2.61c0-.179.145-.325.325-.325s.325.146.325.325v2.61z" fill="#47A248"/></svg> },
            { name: 'Streamlit', icon: StreamlitIcon },
            { name: 'OpenAI SDK', icon: OpenAIIcon },
            { name: 'Agent Kit', icon: OpenAIAgentKitIcon },
        ],
    },
];


const Skills = forwardRef<HTMLElement>((props, ref) => {
    return (
        <Section ref={ref} id="skills">
            <h2 className="text-center text-4xl font-bold text-slate-100 mb-16">
                My Tech <span className="text-cyan-400">Arsenal</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                 {skillsData.flatMap(({ category, list }) => 
                    list.map(skill => (
                        <div key={skill.name} className="group relative bg-slate-900/50 p-6 rounded-xl border border-slate-700/50 text-center transition-all duration-300 hover:border-cyan-500/50 hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-500/10">
                            <div className="flex justify-center mb-4">
                               <skill.icon className="w-12 h-12 text-slate-400 group-hover:text-cyan-400 transition-colors duration-300" />
                            </div>
                            <h3 className="font-bold text-lg text-slate-300 group-hover:text-white transition-colors duration-300">{skill.name}</h3>
                        </div>
                    ))
                )}
            </div>
        </Section>
    );
});

Skills.displayName = 'Skills';

export default Skills;