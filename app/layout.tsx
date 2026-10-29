import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ToastProvider } from '@/components/Toast';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#fafafa',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Syed Ali Hashmi | Software Engineer & AI Developer',
  description:
    'Syed Ali Hashmi - Software Engineer, Full-Stack Developer & AI Automation Specialist. Exploring modern web, Next.js, TypeScript, Python, and Agentic AI.',
  keywords: [
    'Syed Ali Hashmi',
    'Software Engineer',
    'Full-Stack Developer',
    'AI Engineer',
    'Agentic AI',
    'Next.js Portfolio',
    'React 19',
    'TypeScript',
    'Python',
    'Karachi Pakistan',
  ],
  authors: [{ name: 'Syed Ali Hashmi', url: 'https://github.com/alihashmi2288' }],
  creator: 'Syed Ali Hashmi',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://alihashmi.dev'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://alihashmi.dev',
    title: 'Syed Ali Hashmi | Software Engineer & AI Developer',
    description:
      'Software Engineer, Full-Stack Developer & AI Automation Specialist specializing in Next.js, TypeScript, Python, and Agentic AI workflows.',
    siteName: 'Syed Ali Hashmi Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Syed Ali Hashmi | Software Engineer & AI Developer',
    description:
      'Software Engineer, Full-Stack Developer & AI Automation Specialist specializing in Next.js, TypeScript, Python, and Agentic AI workflows.',
  },
  verification: {
    google: '4832c2918afe1cd2',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/site.webmanifest',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Syed Ali Hashmi',
  jobTitle: 'Software Engineer & Full-Stack AI Developer',
  url: 'https://github.com/alihashmi2288',
  sameAs: [
    'https://github.com/alihashmi2288',
    'https://linkedin.com/in/hashmiali2288',
  ],
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'UBIT, University of Karachi',
  },
  knowsAbout: [
    'Next.js',
    'React',
    'TypeScript',
    'Python',
    'FastAPI',
    'Artificial Intelligence',
    'Generative AI',
    'Agentic AI Workflows',
    'Tailwind CSS',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth ${geistSans.variable} ${geistMono.variable}`} style={{ colorScheme: 'light' }}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#fafafa] text-[#4d4d4d] antialiased selection:bg-[#171717] selection:text-white font-sans min-h-screen">
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
