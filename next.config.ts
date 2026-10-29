import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  env: {
    API_KEY: process.env.API_KEY || process.env.VITE_API_KEY || process.env.GEMINI_API_KEY || '',
  },
};

export default nextConfig;
