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
      {/* Header with Technical Eyebrow */}
      <div className="text-center mb-10 reveal-on-scroll">
        <span className="font-mono text-xs uppercase tracking-wider text-[#8f8f8f] font-medium block">
          // CAPABILITIES & TECH ARSENAL
        </span>
        <h2 className="text-3xl sm:text-4xl font-semibold text-[#171717] tracking-[-1.28px] mt-2">
          Technical Arsenal
        </h2>
        <p className="mt-2.5 max-w-xl mx-auto text-[#4d4d4d] text-base">
          A targeted stack honed for modern web engineering, performant backends, and autonomous AI systems.
        </p>
      </div>

      {/* Filter Tabs & Search Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 max-w-5xl mx-auto">
        {/* Category Pills: rounded-[64px] */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 p-1 rounded-[64px] bg-[#f2f2f2] border border-[#ebebeb]">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3.5 py-1.5 rounded-[64px] text-xs sm:text-sm font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-[#171717] text-white shadow-sm'
                  : 'text-[#4d4d4d] hover:text-[#171717]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Quick Search Input */}
        <div className="w-full md:w-60 relative">
          <input
            type="text"
            placeholder="Search stack..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-[#ebebeb] rounded-[6px] px-3.5 py-1.5 text-sm text-[#171717] placeholder-[#8f8f8f] shadow-whisper focus:outline-none focus:border-[#0070f3] focus:ring-1 focus:ring-[#0070f3] transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8f8f8f] hover:text-[#171717]"
              aria-label="Clear search"
            >
              &times;
            </button>
          )}
        </div>
      </div>

      {/* Skills Grid: Hairline Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
        {filteredSkills.map((skill) => {
          const Icon = skill.icon;
          return (
            <div
              key={skill.name}
              className="group feature-card p-4 sm:p-5 flex flex-col items-center justify-center text-center relative overflow-hidden"
            >
              <div className="absolute top-2.5 right-2.5">
                <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-[6px] bg-[#f2f2f2] text-[#8f8f8f] border border-[#ebebeb] group-hover:text-[#171717] transition-colors">
                  {skill.level}
                </span>
              </div>
              
              <div className="w-11 h-11 mb-3 flex items-center justify-center rounded-[8px] bg-[#fafafa] border border-[#ebebeb] group-hover:border-[#171717] transition-all duration-200">
                <Icon className="w-6 h-6 text-[#171717]" />
              </div>

              <h3 className="font-semibold text-sm sm:text-base text-[#171717]">
                {skill.name}
              </h3>
              <p className="text-[11px] font-mono text-[#8f8f8f] mt-0.5">{skill.category}</p>
            </div>
          );
        })}
      </div>

      {filteredSkills.length === 0 && (
        <div className="text-center py-12 text-[#8f8f8f]">
          <p>No skills matching "{searchQuery}" in this category.</p>
          <button
            onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
            className="mt-2 text-[#0070f3] text-sm hover:underline font-medium"
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