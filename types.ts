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

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issuerCode: 'google' | 'ibm' | 'governor' | 'jawan' | 'navttc';
  issueDate: string;
  status: 'Completed' | 'In Progress';
  description: string;
  skills: string[];
  imagePreviewUrl?: string;
  pdfUrl?: string;
  credentialUrl?: string;
  category: 'AI & Machine Learning' | 'Software Engineering' | 'In Progress';
}

export type SectionId = 'home' | 'about' | 'skills' | 'projects' | 'certifications' | 'contact';
