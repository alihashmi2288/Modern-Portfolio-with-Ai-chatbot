import React, { forwardRef } from 'react';
import type { Skill } from '../types';
import Section from './Section';
import { 
    ReactIcon, 
    TypeScriptIcon, 
    NodeIcon, 
    TailwindIcon, 
    GitIcon, 
    PythonIcon, 
    OpenAIIcon, 
    SparklesIcon,
    GithubIcon,
    DartIcon,
    FlutterIcon,
    FastAPIIcon,
    VercelIcon,
    JavaScriptIcon,
    RESTAPIIcon,
    NextJSIcon
} from './IconComponents';

const skillsData: { category: string; list: Skill[] }[] = [
    {
        category: 'Languages',
        list: [
            { name: 'TypeScript', icon: TypeScriptIcon },
            { name: 'Python', icon: PythonIcon },
            { name: 'Dart', icon: DartIcon },
            { name: 'JavaScript', icon: JavaScriptIcon },
        ],
    },
    {
        category: 'Frontend & Mobile',
        list: [
            { name: 'Next.js', icon: NextJSIcon },
            { name: 'React', icon: ReactIcon },
            { name: 'Flutter', icon: FlutterIcon },
        ],
    },
    {
        category: 'Backend & APIs',
        list: [
            { name: 'Node.js', icon: NodeIcon },
            { name: 'REST APIs', icon: RESTAPIIcon },
            { name: 'FastAPI', icon: FastAPIIcon },
        ],
    },
    {
        category: 'AI & Automation',
        list: [
            { name: 'OpenAI SDK', icon: OpenAIIcon },
            { name: 'OpenAI Agents SDK', icon: OpenAIIcon },
            { name: 'LLM Integration', icon: SparklesIcon },
            { name: 'Agentic Workflows', icon: SparklesIcon },
            { name: 'Workflow Automation', icon: SparklesIcon },
        ],
    },
    {
        category: 'Tools & Platforms',
        list: [
            { name: 'Git', icon: GitIcon },
            { name: 'GitHub', icon: GithubIcon },
            { name: 'Vercel', icon: VercelIcon },
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