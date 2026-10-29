# 🚀 Modern Developer Portfolio — Next.js 16 App Router

A high-performance, SEO-optimized portfolio web application built with **Next.js 16**, **React 19**, **TypeScript**, and **Tailwind CSS**. Features pre-rendered Static Site Generation (SSG), Google Search Console verification, an intelligent Google Gemini AI chatbot, an AI project idea generator, and Vercel's Geist design language.

![Portfolio Status](https://img.shields.io/badge/Next.js-16.4.3-black?logo=next.js)
![React](https://img.shields.io/badge/React-19.2.0-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?logo=tailwindcss)
![Google Gemini](https://img.shields.io/badge/Google-Gemini_AI-4285F4?logo=google)

---

## ✨ Features

### 🔍 Complete Google SEO & Pre-Rendering
- **Static Site Generation (SSG)**: Pre-renders 100% of the HTML at build time for instant Googlebot, Bing, and AI crawler indexing.
- **Dynamic Metadata & Social Previews**: Full Open Graph, Twitter Cards, canonical tags, and robots directives.
- **Search Console Verification**: Integrated Google Search Console verification (`google4832c2918afe1cd2.html` and metadata).
- **Auto-generated Sitemap & Robots**: `app/sitemap.ts` and `app/robots.ts` automatically produce standard XML sitemaps and crawler policies.
- **JSON-LD Structured Data**: Embedded schema markup (`Person`, `SoftwareEngineer`) for rich search snippet cards.

### 🎨 Vercel Geist Design System
- **Geist & Geist Mono Typography**: Loaded with zero layout shift via `next/font/google`.
- **5-Stop Hero Mesh Gradient**: Subtle radial mesh background blooming behind the hero.
- **Hairline Cards & Interactive Modals**: Border transitions, shadow elevations, and certificate preview dialogs.
- **Smooth Navigation & Scrollspy**: Smooth scrolling between sections with IntersectionObserver tracking.

### 🤖 AI-Powered Capabilities
- **AI Chatbot**: Intelligent interactive assistant powered by Google Gemini API (`@google/genai`) with server-side security via Next.js Route Handlers (`app/api/chat/route.ts`) and offline fallback engine.
- **Project Concept Generator**: Live idea generator utilizing Gemini function calling and structured JSON output.
- **WebMCP Integration**: Native browser agent tool registration for AI browser agents.

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v18.18 or higher recommended)
- npm, pnpm, or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/alihashmi2288/modern-portfolio.git
   cd modern-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables (optional)**
   Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
   Add your Google Gemini API key:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Start the development server (with Turbopack)**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 🏗️ Project Architecture

```
├── app/
│   ├── api/
│   │   ├── chat/route.ts            # Secure Gemini Chatbot Route Handler
│   │   └── generate-idea/route.ts   # Secure Project Idea Generator Route Handler
│   ├── globals.css                  # Tailwind styles + Vercel design system rules
│   ├── layout.tsx                   # Root HTML shell, Geist fonts & SEO metadata
│   ├── page.tsx                     # Main page entry point
│   ├── robots.ts                    # Dynamic robots.txt generator
│   └── sitemap.ts                   # Dynamic sitemap.xml generator
├── components/
│   ├── Header.tsx                   # Fixed nav with scrollspy & mobile menu
│   ├── Hero.tsx                     # Typewriter effect & hero CTAs
│   ├── About.tsx                    # Interactive background & milestone tabs
│   ├── Services.tsx                 # Core engineering offerings
│   ├── Skills.tsx                   # Filterable technology stack
│   ├── Projects.tsx                 # Featured projects showcase & modal preview
│   ├── Certifications.tsx           # Verified Google & IBM credentials
│   ├── Contact.tsx                  # Accessible contact form & socials
│   ├── Footer.tsx                   # Monogram & quick navigation
│   ├── Chatbot.tsx                  # Gemini AI Chatbot with offline engine
│   ├── ProjectIdeaGenerator.tsx     # Gemini concept architect
│   └── Toast.tsx                    # Accessible status notifications
├── hooks/
│   └── useWebMCP.ts                 # WebMCP AI agent tool integration
├── public/
│   ├── certificates/                # Certificate preview images and PDFs
│   ├── images/                      # High-res project mockups and screenshots
│   ├── google4832c2918afe1cd2.html  # Google Search Console verification
│   └── Syed Ali Hashmi Resume.pdf   # Downloadable resume
├── next.config.ts                   # Next.js configuration
├── tailwind.config.ts               # Tailwind design system tokens
└── tsconfig.json                    # TypeScript configuration
```

---

## 🚢 Production Deployment

### Deploy to Vercel (Recommended)
1. Push your repository to GitHub.
2. Import the project into [Vercel](https://vercel.com).
3. Set `GEMINI_API_KEY` in the Environment Variables section.
4. Vercel automatically detects Next.js and deploys with optimal edge caching and static pre-rendering.
