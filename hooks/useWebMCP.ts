import { useEffect } from 'react';

export function useWebMCP(onNavigate?: (section: string) => void) {
  useEffect(() => {
    // Feature detection for WebMCP (Chromium 146+ preview)
    const docWithContext = document as unknown as {
      modelContext?: {
        registerTool: (tool: unknown, options?: unknown) => void;
      };
    };

    if (!docWithContext.modelContext || typeof docWithContext.modelContext.registerTool !== 'function') {
      return;
    }

    const abortController = new AbortController();

    try {
      // 1. Tool: get_developer_profile
      docWithContext.modelContext.registerTool(
        {
          name: 'get_developer_profile',
          description: "Get Syed Ali Hashmi's professional profile, current education, and contact details.",
          inputSchema: { type: 'object', properties: {} },
          execute() {
            return {
              name: 'Syed Ali Hashmi',
              title: 'Software Engineer & Full-Stack AI Developer',
              education: 'BS Software Engineering, UBIT, University of Karachi (6th Semester)',
              specialization: 'Artificial Intelligence, Web 3.0 & Metaverse (Governor Sindh IT Initiative)',
              certifications: [
                'Google AI Professional Certificate',
                'IBM AI Developer Professional Certificate',
                'AI, Web 3.0 & Metaverse Specialization (GIAIC - In Progress)',
                'Mobile Application Development (Flutter - Jawan Pakistan)',
                'NAVTTC Amazon E-Commerce & Operations (Honors)'
              ],
              location: 'Karachi, Pakistan',
              email: 'hashmi.ali2288@gmail.com',
              phone: '+92 319 7345923',
              github: 'https://github.com/alihashmi2288',
              linkedin: 'https://linkedin.com/in/hashmiali2288',
            };
          },
          annotations: { readOnlyHint: true },
        },
        { signal: abortController.signal }
      );

      // 2. Tool: get_developer_skills
      docWithContext.modelContext.registerTool(
        {
          name: 'get_developer_skills',
          description: "Retrieve Syed Ali Hashmi's complete technical skillset by category.",
          inputSchema: { type: 'object', properties: {} },
          execute() {
            return {
              languages: ['TypeScript', 'Python', 'Dart', 'JavaScript'],
              frontend: ['Next.js', 'React', 'Flutter', 'Tailwind CSS'],
              backend: ['Node.js', 'FastAPI', 'REST APIs'],
              aiAndAutomation: ['OpenAI SDK', 'OpenAI Agents SDK', 'LLM Integration', 'Agentic Workflows', 'Workflow Automation'],
              tools: ['Git', 'GitHub', 'Vercel'],
            };
          },
          annotations: { readOnlyHint: true },
        },
        { signal: abortController.signal }
      );

      // 3. Tool: navigate_to_section
      docWithContext.modelContext.registerTool(
        {
          name: 'navigate_to_section',
          description: 'Scroll smoothly to a section on the portfolio page (home, about, skills, projects, certifications, contact).',
          inputSchema: {
            type: 'object',
            properties: {
              sectionId: {
                type: 'string',
                description: 'The ID of the section to scroll to: "home", "about", "skills", "projects", "certifications", or "contact".',
              },
            },
            required: ['sectionId'],
          },
          execute(input: { sectionId: string }) {
            if (onNavigate) {
              onNavigate(input.sectionId);
              return `Navigated to ${input.sectionId}`;
            }
            const el = document.getElementById(input.sectionId);
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' });
              return `Scrolled to ${input.sectionId}`;
            }
            return `Section ${input.sectionId} not found`;
          },
        },
        { signal: abortController.signal }
      );
    } catch (err) {
      console.warn('WebMCP registration skipped or unsupported:', err);
    }

    return () => {
      abortController.abort();
    };
  }, [onNavigate]);
}
