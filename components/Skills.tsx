import React, { forwardRef, useState, useMemo } from 'react';
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

interface SkillItem extends Skill {
  category: string;
  level?: string;
}

const allSkills: SkillItem[] = [
  // Languages
  { name: 'TypeScript', icon: TypeScriptIcon, category: 'Languages', level: 'Core' },
  { name: 'Python', icon: PythonIcon, category: 'Languages', level: 'Core' },
  { name: 'JavaScript', icon: JavaScriptIcon, category: 'Languages', level: 'Core' },
  { name: 'Dart', icon: DartIcon, category: 'Languages', level: 'Proficient' },

  // Frontend & Mobile
  { name: 'Next.js', icon: NextJSIcon, category: 'Frontend & Mobile', level: 'Advanced' },
  { name: 'React', icon: ReactIcon, category: 'Frontend & Mobile', level: 'Advanced' },
  { name: 'Tailwind CSS', icon: TailwindIcon, category: 'Frontend & Mobile', level: 'Advanced' },
  { name: 'Flutter', icon: FlutterIcon, category: 'Frontend & Mobile', level: 'Proficient' },

  // Backend & APIs
  { name: 'FastAPI', icon: FastAPIIcon, category: 'Backend & APIs', level: 'Advanced' },
  { name: 'Node.js', icon: NodeIcon, category: 'Backend & APIs', level: 'Proficient' },
  { name: 'REST APIs', icon: RESTAPIIcon, category: 'Backend & APIs', level: 'Advanced' },

  // AI & Automation
  { name: 'OpenAI SDK', icon: OpenAIIcon, category: 'AI & Automation', level: 'Specialist' },
  { name: 'OpenAI Agents SDK', icon: OpenAIIcon, category: 'AI & Automation', level: 'Specialist' },
  { name: 'LLM Integration', icon: SparklesIcon, category: 'AI & Automation', level: 'Specialist' },
  { name: 'Agentic Workflows', icon: SparklesIcon, category: 'AI & Automation', level: 'Specialist' },
  { name: 'Workflow Automation', icon: SparklesIcon, category: 'AI & Automation', level: 'Specialist' },

  // Tools & Platforms
  { name: 'Git', icon: GitIcon, category: 'Tools & Platforms', level: 'Essential' },
  { name: 'GitHub', icon: GithubIcon, category: 'Tools & Platforms', level: 'Essential' },
  { name: 'Vercel', icon: VercelIcon, category: 'Tools & Platforms', level: 'Essential' },
];

const CATEGORIES = ['All', 'Languages', 'Frontend & Mobile', 'Backend & APIs', 'AI & Automation', 'Tools & Platforms'];

const Skills = forwardRef<HTMLElement>((props, ref) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSkills = useMemo(() => {
    return allSkills.filter((skill) => {
      const matchesCategory = selectedCategory === 'All' || skill.category === selectedCategory;
      const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <Section ref={ref} id="skills">
      <div className="text-center mb-10 reveal-on-scroll">
        <span className="text-cyan-400 font-mono text-sm tracking-wider uppercase">Capabilities</span>
        <h2 className="text-3xl sm:text-5xl font-black text-slate-100 tracking-tight mt-2">
          My Tech <span className="gradient-text">Arsenal</span>
        </h2>
        <p className="mt-4 max-w-xl mx-auto text-slate-400 text-base">
          A targeted stack honed for modern web engineering, performant backends, and autonomous AI systems.
        </p>
      </div>

      {/* Filter Tabs & Search Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 max-w-5xl mx-auto">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 p-1 rounded-2xl bg-slate-900/80 border border-slate-800">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Quick Search Input */}
        <div className="w-full md:w-64 relative">
          <input
            type="text"
            placeholder="Search skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900/60 border border-slate-800 rounded-xl px-4 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
            >
              &times;
            </button>
          )}
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredSkills.map((skill) => {
          const Icon = skill.icon;
          return (
            <div
              key={skill.name}
              className="group glass-card glass-card-hover p-5 rounded-2xl flex flex-col items-center justify-center text-center relative overflow-hidden"
            >
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-500/30">
                  {skill.level}
                </span>
              </div>
              
              <div className="w-12 h-12 mb-3 flex items-center justify-center rounded-xl bg-slate-800/50 border border-slate-700/50 group-hover:scale-110 group-hover:border-cyan-500/50 transition-all duration-300">
                <Icon className="w-7 h-7 text-slate-400 group-hover:text-cyan-300 transition-colors duration-300" />
              </div>

              <h3 className="font-semibold text-sm sm:text-base text-slate-200 group-hover:text-white transition-colors">
                {skill.name}
              </h3>
              <p className="text-[11px] font-mono text-slate-500 mt-1">{skill.category}</p>
            </div>
          );
        })}
      </div>

      {filteredSkills.length === 0 && (
        <div className="text-center py-12 text-slate-500">
          <p>No skills matching "{searchQuery}" in this category.</p>
          <button
            onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
            className="mt-2 text-cyan-400 text-sm hover:underline"
          >
            Reset Filters
          </button>
        </div>
      )}
    </Section>
  );
});

Skills.displayName = 'Skills';

export default Skills;