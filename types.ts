import type React from 'react';

export interface Project {
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  category?: 'AI & LLM' | 'Full-Stack' | 'Web3 & Agency' | 'Financial Tech';
  featured?: boolean;
  liveUrl?: string;
  repoUrl?: string;
}

export interface Skill {
  name: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export type SectionId = 'home' | 'about' | 'projects' | 'skills' | 'contact';
