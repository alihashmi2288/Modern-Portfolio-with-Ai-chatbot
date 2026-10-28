import React, { forwardRef } from 'react';
import Section from './Section';

interface ServiceItem {
  id: string;
  number: string;
  title: string;
  description: string;
  tags: string[];
  icon: (props: React.SVGProps<SVGSVGElement>) => React.JSX.Element;
}

const servicesData: ServiceItem[] = [
  {
    id: 'full-stack',
    number: '01',
    title: 'Full-Stack Development',
    description: 'Building responsive, high-performance web applications using Next.js, TypeScript, and modern backend technologies with scalable architecture.',
    tags: ['Next.js', 'TypeScript', 'Scalable Architecture'],
    icon: (props) => (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="m9 8 3 3-3 3" />
        <line x1="14" x2="16" y1="14" y2="14" />
      </svg>
    ),
  },
  {
    id: 'agentic-ai',
    number: '02',
    title: 'Agentic AI Development',
    description: 'Creating intelligent AI agents using OpenAI SDK and Python that can reason, plan, and act autonomously to solve complex problems.',
    tags: ['OpenAI SDK', 'Python', 'Autonomous Agents'],
    icon: (props) => (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M12 2a8 8 0 0 0-8 8c0 3.37 2.07 6.26 5 7.42V20a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2.58c2.93-1.16 5-4.05 5-7.42a8 8 0 0 0-8-8z" />
        <path d="M9 10h.01" />
        <path d="M15 10h.01" />
        <path d="M9.5 14a3.5 3.5 0 0 0 5 0" />
      </svg>
    ),
  },
  {
    id: 'ui-ux-design',
    number: '03',
    title: 'UI/UX Design',
    description: 'Designing intuitive, visually appealing interfaces that prioritize user experience and drive engagement with modern design principles.',
    tags: ['Design Systems', 'User Experience', 'Modern UI'],
    icon: (props) => (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
        <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
        <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
        <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.563-2.512 5.563-5.563C22 6.5 17.5 2 12 2z" />
      </svg>
    ),
  },
  {
    id: 'ecommerce',
    number: '04',
    title: 'eCommerce Solutions',
    description: 'Developing high-performance eCommerce websites with seamless checkout experiences, payment integration, and inventory management.',
    tags: ['Stripe / Payments', 'Checkout Flow', 'Inventory'],
    icon: (props) => (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
        <path d="M3 6h18" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
  },
  {
    id: 'backend',
    number: '05',
    title: 'Backend Development',
    description: 'Building scalable backend systems with RESTful APIs, database design, and server-side logic using Node.js and Python.',
    tags: ['Node.js', 'Python', 'RESTful APIs'],
    icon: (props) => (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
        <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
        <line x1="6" x2="6.01" y1="6" y2="6" />
        <line x1="6" x2="6.01" y1="18" y2="18" />
      </svg>
    ),
  },
  {
    id: 'ai-integration',
    number: '06',
    title: 'AI Integration',
    description: 'Integrating AI capabilities into existing applications, from chatbots to intelligent automation and data processing pipelines.',
    tags: ['Chatbots & LLMs', 'Pipelines', 'Intelligent Automation'],
    icon: (props) => (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M12 3v3" />
        <path d="M18.5 5.5 16.4 7.6" />
        <path d="M21 12h-3" />
        <path d="M18.5 18.5 16.4 16.4" />
        <path d="M12 21v-3" />
        <path d="M5.5 18.5 7.6 16.4" />
        <path d="M3 12h3" />
        <path d="M5.5 5.5 7.6 7.6" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
];

const Services = forwardRef<HTMLElement>((props, ref) => {
  return (
    <Section ref={ref} id="services">
      {/* Section Header with Geist Mono Eyebrow and Heading-lg */}
      <div className="text-center mb-12 reveal-on-scroll">
        <span className="font-mono text-xs uppercase tracking-wider text-[#8f8f8f] font-medium block">
          // SOLUTIONS & CAPABILITIES
        </span>
        <h2 className="text-3xl sm:text-4xl font-semibold text-[#171717] tracking-[-1.28px] mt-2">
          Services I Offer
        </h2>
        <p className="mt-2.5 max-w-xl mx-auto text-[#4d4d4d] text-base">
          From full-stack development to AI-powered solutions
        </p>
      </div>

      {/* Services Grid (3-column desktop, 2-column tablet, 1-column mobile) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {servicesData.map((service) => {
          const Icon = service.icon;
          return (
            <div
              key={service.id}
              className="feature-card bg-white border border-[#ebebeb] rounded-[12px] p-6 sm:p-7 shadow-whisper hover:border-[#171717] transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Header row: Icon + Monospace numeric indicator */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-10 h-10 rounded-[8px] bg-[#fafafa] border border-[#ebebeb] flex items-center justify-center text-[#171717] group-hover:bg-[#171717] group-hover:text-white transition-colors duration-200">
                    <Icon className="w-5 h-5 transition-transform duration-200 group-hover:scale-105" />
                  </div>
                  <span className="font-mono text-[11px] text-[#8f8f8f] bg-[#f2f2f2] px-2 py-0.5 rounded-[6px] border border-[#ebebeb]">
                    {service.number}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-[#171717] tracking-[-0.4px] mb-2.5">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-[#4d4d4d] leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Tags / Focus Chips */}
              <div className="mt-6 pt-4 border-t border-[#f2f2f2] flex flex-wrap gap-1.5">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-mono text-[#8f8f8f] bg-[#fafafa] px-2 py-0.5 rounded-[4px] border border-[#ebebeb]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
});

Services.displayName = 'Services';

export default Services;
