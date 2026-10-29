'use client';

import React, { forwardRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type { Certification } from '../types';
import Section from './Section';
import { 
  AwardIcon, 
  BadgeCheckIcon, 
  ExternalLinkIcon, 
  FileTextIcon, 
  DownloadIcon 
} from './IconComponents';

const certificationsData: Certification[] = [
  {
    id: 'google-ai-professional',
    title: 'Google AI Professional Certificate',
    issuer: 'Google',
    issuerCode: 'google',
    issueDate: 'Verified Credential',
    status: 'Completed',
    category: 'AI & Machine Learning',
    description: 'Comprehensive certification in artificial intelligence, neural networks, modern machine learning workflows, and practical applications with Google AI and Gemini models.',
    skills: ['Generative AI', 'Gemini APIs', 'Machine Learning', 'Computer Vision', 'NLP', 'TensorFlow'],
    imagePreviewUrl: '/certificates/google_ai_certificate.png',
    pdfUrl: '/certificates/Google_AI_Professional_Certificate.pdf',
    credentialUrl: 'https://coursera.org/share/22e3caa7fe44da5d36ebcf4a2a1b1b11',
  },
  {
    id: 'ibm-ai-developer',
    title: 'IBM AI Developer Professional Certificate',
    issuer: 'IBM',
    issuerCode: 'ibm',
    issueDate: 'Verified Credential',
    status: 'Completed',
    category: 'AI & Machine Learning',
    description: 'Professional engineering curriculum covering generative AI systems, Python AI frameworks, Watson services, prompt design, and deploying AI web services.',
    skills: ['Python AI Stack', 'IBM Watson', 'LLMs', 'Prompt Engineering', 'AI Application Architecture'],
    imagePreviewUrl: '/certificates/ibm_ai_developer.png',
    pdfUrl: '/certificates/IBM_AI_Developer_Certificate.pdf',
    credentialUrl: 'https://coursera.org/share/953d65e0cad129fce95ae4e33327be80',
  },
  {
    id: 'giaic-governor-initiative',
    title: 'AI, Web 3.0 & Metaverse Specialization',
    issuer: 'Governor Sindh IT Initiative (GIAIC)',
    issuerCode: 'governor',
    issueDate: '2023 — Present',
    status: 'In Progress',
    category: 'In Progress',
    description: 'Prestigious merit-based program at Governor House Karachi focused on Agentic AI systems, TypeScript, Next.js architecture, and autonomous AI agents.',
    skills: ['Agentic AI', 'OpenAI Agents SDK', 'Next.js', 'TypeScript', 'LangChain', 'Autonomous Workflows'],
    imagePreviewUrl: '/certificates/giaic_certificate.png',
    pdfUrl: '/certificates/GIAIC_Card.pdf',
    credentialUrl: 'https://www.governorsindh.com',
  },
  {
    id: 'flutter-mobile-dev',
    title: 'Mobile Application Development (Flutter)',
    issuer: 'Jawan Pakistan',
    issuerCode: 'jawan',
    issueDate: 'Certified',
    status: 'Completed',
    category: 'Software Engineering',
    description: 'Rigorous training in cross-platform mobile application development with Flutter & Dart, reactive state management, and real-time backend integration.',
    skills: ['Flutter', 'Dart', 'Cross-Platform', 'State Management', 'REST APIs'],
  },
  {
    id: 'navttc-e-commerce',
    title: 'Amazon E-Commerce & Operations (Honors)',
    issuer: 'NAVTTC (Government of Pakistan)',
    issuerCode: 'navttc',
    issueDate: 'Certified',
    status: 'Completed',
    category: 'Software Engineering',
    description: 'National Vocational & Technical Training Commission certification covering quantitative market research, operations management, and digital commerce growth.',
    skills: ['Quantitative Research', 'Product Operations', 'Supply Analysis', 'Digital Commerce'],
    pdfUrl: '/certificates/navttc_certificate.pdf',
  },
];

const CATEGORIES = ['All', 'AI & Machine Learning', 'In Progress', 'Software Engineering'];

const issuerBadges: Record<string, { label: string; badgeBg: string; textColor: string; border: string }> = {
  google: {
    label: 'Google Certified',
    badgeBg: 'bg-[#4285F4]/10',
    textColor: 'text-[#1a73e8]',
    border: 'border-[#4285F4]/20',
  },
  ibm: {
    label: 'IBM Certified',
    badgeBg: 'bg-[#0f62fe]/10',
    textColor: 'text-[#0f62fe]',
    border: 'border-[#0f62fe]/20',
  },
  governor: {
    label: 'Governor House GIAIC',
    badgeBg: 'bg-[#107c41]/10',
    textColor: 'text-[#0e703c]',
    border: 'border-[#107c41]/20',
  },
  jawan: {
    label: 'Jawan Pakistan',
    badgeBg: 'bg-[#673ab7]/10',
    textColor: 'text-[#673ab7]',
    border: 'border-[#673ab7]/20',
  },
  navttc: {
    label: 'NAVTTC Pakistan',
    badgeBg: 'bg-[#171717]/5',
    textColor: 'text-[#171717]',
    border: 'border-[#ebebeb]',
  },
};

const Certifications = forwardRef<HTMLElement>((props, ref) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [previewCert, setPreviewCert] = useState<Certification | null>(null);

  const filteredCerts = selectedCategory === 'All'
    ? certificationsData
    : certificationsData.filter((c) => c.category === selectedCategory || (selectedCategory === 'In Progress' && c.status === 'In Progress'));

  return (
    <Section ref={ref} id="certifications">
      {/* Header with Technical Eyebrow and Geist Sans Heading */}
      <div className="text-center mb-12 reveal-on-scroll">
        <span className="font-mono text-xs uppercase tracking-wider text-[#8f8f8f] font-medium block">
          // CREDENTIALS & VERIFIED SPECIALIZATIONS
        </span>
        <h2 className="text-3xl sm:text-4xl font-semibold text-[#171717] tracking-[-1.28px] mt-2">
          Certifications & Honors
        </h2>
        <p className="mt-2.5 max-w-xl mx-auto text-[#4d4d4d] text-base">
          Accredited credentials across cutting-edge AI architectures, enterprise frameworks, and high-performance software engineering.
        </p>

        {/* Category Filters: rounded-[64px] */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-[64px] text-xs sm:text-sm font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-[#171717] text-white shadow-sm'
                  : 'bg-white text-[#4d4d4d] hover:text-[#171717] border border-[#ebebeb] shadow-whisper'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Certifications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {filteredCerts.map((cert) => {
          const badge = issuerBadges[cert.issuerCode] || issuerBadges.google;
          const isInProgress = cert.status === 'In Progress';

          return (
            <div
              key={cert.id}
              className="bg-white border border-[#ebebeb] rounded-[16px] p-6 flex flex-col justify-between hover:border-[#d4d4d4] hover:shadow-floating transition-all duration-300 group"
            >
              <div>
                {/* Top Row: Issuer Badge & Status Pill */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span
                    className={`inline-flex items-center gap-1.5 text-xs font-mono font-medium px-2.5 py-1 rounded-[6px] border ${badge.badgeBg} ${badge.textColor} ${badge.border}`}
                  >
                    <AwardIcon className="w-3.5 h-3.5" />
                    {badge.label}
                  </span>

                  {isInProgress ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                      In Progress
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <BadgeCheckIcon className="w-3.5 h-3.5" />
                      Verified
                    </span>
                  )}
                </div>

                {/* Certificate Thumbnail Preview if available */}
                {cert.imagePreviewUrl && (
                  <div
                    onClick={() => setPreviewCert(cert)}
                    className="relative w-full h-40 mb-4 rounded-[10px] overflow-hidden border border-[#ebebeb] bg-[#fafafa] cursor-pointer group/thumb"
                  >
                    <img
                      src={cert.imagePreviewUrl}
                      alt={cert.title}
                      className="w-full h-full object-cover object-top transition-transform duration-300 group-hover/thumb:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover/thumb:bg-black/25 transition-all flex items-center justify-center">
                      <span className="opacity-0 group-hover/thumb:opacity-100 transition-opacity bg-white text-[#171717] text-xs font-medium px-3 py-1.5 rounded-[6px] shadow-sm flex items-center gap-1.5 transform translate-y-1 group-hover/thumb:translate-y-0 duration-200">
                        <FileTextIcon className="w-3.5 h-3.5" />
                        Inspect Credential
                      </span>
                    </div>
                  </div>
                )}

                {/* Title */}
                <h3 className="text-lg font-semibold text-[#171717] tracking-[-0.4px] group-hover:text-black transition-colors leading-snug">
                  {cert.title}
                </h3>

                {/* Issuer & Date meta */}
                <div className="flex items-center gap-2 mt-1 mb-3 text-xs text-[#8f8f8f] font-mono">
                  <span>{cert.issuer}</span>
                  <span>•</span>
                  <span>{cert.issueDate}</span>
                </div>

                {/* Description */}
                <p className="text-sm text-[#4d4d4d] leading-relaxed mb-4">
                  {cert.description}
                </p>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {cert.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[11px] font-mono bg-[#fafafa] text-[#4d4d4d] px-2 py-0.5 rounded-[4px] border border-[#ebebeb]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              {(cert.imagePreviewUrl || cert.pdfUrl || cert.credentialUrl) ? (
                <div className="pt-4 border-t border-[#f2f2f2] flex items-center justify-between gap-2">
                  {cert.imagePreviewUrl ? (
                    <button
                      onClick={() => setPreviewCert(cert)}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-[#171717] bg-[#f2f2f2] hover:bg-[#ebebeb] px-3 py-1.5 rounded-[6px] transition-colors"
                    >
                      <FileTextIcon className="w-3.5 h-3.5" />
                      <span>Inspect Card</span>
                    </button>
                  ) : <div />}

                  <div className="flex items-center gap-1.5">
                    {cert.pdfUrl && (
                      <a
                        href={cert.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-medium text-[#4d4d4d] hover:text-[#171717] px-2.5 py-1.5 rounded-[6px] border border-[#ebebeb] hover:border-[#d4d4d4] transition-colors"
                        title="Download or View PDF Certificate"
                      >
                        <DownloadIcon className="w-3.5 h-3.5" />
                        <span>PDF</span>
                      </a>
                    )}

                    {cert.credentialUrl && (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-medium text-[#0070f3] hover:text-[#0761d1] px-2 py-1.5 transition-colors"
                        title="Official Organization Verification"
                      >
                        <ExternalLinkIcon className="w-3.5 h-3.5" />
                        <span>Verify</span>
                      </a>
                    )}
                  </div>
                </div>
              ) : (
                <div className="pt-4 border-t border-[#f2f2f2] flex items-center justify-between text-xs font-mono text-[#8f8f8f]">
                  <span>Credential Status</span>
                  <span className="text-[#171717] font-medium">Training Completed</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Certificate Lightbox Modal via Portal */}
      {previewCert &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
            onClick={() => setPreviewCert(null)}
          >
            <div
              className="relative max-w-2xl w-full bg-white rounded-[16px] border border-[#ebebeb] p-6 shadow-floating animate-scale-up"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between gap-4 mb-4 pb-3 border-b border-[#ebebeb]">
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-[#8f8f8f]">
                    Credential Verification
                  </span>
                  <h3 className="text-xl font-semibold text-[#171717] tracking-[-0.5px] mt-0.5">
                    {previewCert.title}
                  </h3>
                  <p className="text-xs text-[#8f8f8f] font-mono mt-0.5">
                    Issued by {previewCert.issuer} • {previewCert.issueDate}
                  </p>
                </div>
                <button
                  onClick={() => setPreviewCert(null)}
                  className="p-1.5 rounded-full hover:bg-[#f2f2f2] text-[#8f8f8f] hover:text-[#171717] transition-colors"
                  aria-label="Close dialog"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Certificate Image or Styled Credential Surface */}
              <div className="relative rounded-[12px] overflow-hidden border border-[#ebebeb] bg-[#fafafa] min-h-[260px] flex items-center justify-center p-6 text-center">
                {previewCert.imagePreviewUrl ? (
                  <img
                    src={previewCert.imagePreviewUrl}
                    alt={previewCert.title}
                    className="max-h-[380px] w-auto mx-auto object-contain rounded-[8px]"
                    onError={(e) => {
                      // Fallback display if user hasn't copied image file yet
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const fallback = target.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = 'block';
                    }}
                  />
                ) : null}

                {/* Clean Fallback Display if image file is still to be uploaded */}
                <div
                  className="py-10 px-6 max-w-md mx-auto space-y-3"
                  style={{ display: previewCert.imagePreviewUrl ? 'none' : 'block' }}
                >
                  <div className="w-12 h-12 mx-auto rounded-full bg-[#f2f2f2] border border-[#ebebeb] flex items-center justify-center text-[#171717]">
                    <AwardIcon className="w-6 h-6" />
                  </div>
                  <h4 className="font-semibold text-base text-[#171717]">
                    {previewCert.title}
                  </h4>
                  <p className="text-xs text-[#4d4d4d] leading-relaxed">
                    {previewCert.description}
                  </p>
                  <div className="pt-2 text-xs font-mono text-[#8f8f8f]">
                    To display your certificate image here, place your PNG/JPG into{' '}
                    <code className="text-[#171717] bg-[#f2f2f2] px-1.5 py-0.5 rounded">
                      public/certificates/
                    </code>
                  </div>
                </div>
              </div>

              {/* Modal Footer Actions */}
              <div className="mt-5 pt-3 border-t border-[#f2f2f2] flex items-center justify-between gap-3">
                <div className="flex flex-wrap gap-1.5">
                  {previewCert.skills.slice(0, 3).map((skill) => (
                    <span
                      key={skill}
                      className="text-[11px] font-mono bg-[#f2f2f2] text-[#171717] px-2 py-0.5 rounded-[4px]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  {previewCert.pdfUrl && (
                    <a
                      href={previewCert.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium px-3.5 py-2 rounded-[6px] border border-[#ebebeb] bg-white text-[#171717] hover:bg-[#fafafa] transition-colors shadow-whisper"
                    >
                      <DownloadIcon className="w-3.5 h-3.5" />
                      <span>Open PDF</span>
                    </a>
                  )}

                  {previewCert.credentialUrl && (
                    <a
                      href={previewCert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium px-3.5 py-2 rounded-[6px] bg-[#171717] text-white hover:bg-black/90 transition-colors shadow-sm"
                    >
                      <ExternalLinkIcon className="w-3.5 h-3.5" />
                      <span>Verify Credential</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </Section>
  );
});

Certifications.displayName = 'Certifications';

export default Certifications;
