import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#171717',
        'on-primary': '#ffffff',
        ink: '#171717',
        body: '#4d4d4d',
        mute: '#8f8f8f',
        faint: '#a1a1a1',
        hairline: '#ebebeb',
        'hairline-soft': '#f2f2f2',
        canvas: '#fafafa',
        'canvas-elevated': '#ffffff',
        link: '#0070f3',
        'link-deep': '#0761d1',
        'link-soft': '#d3e5ff',
        error: '#ee0000',
        'error-deep': '#c50000',
        warning: '#f5a623',
        'warning-soft': '#ffefcf',
        'warning-deep': '#ab570a',
        violet: '#7928ca',
        'violet-soft': '#d8ccf1',
        cyan: '#50e3c2',
        'cyan-soft': '#aaffec',
        pink: '#ff0080',
        magenta: '#eb367f',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'Geist', 'Arial', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'Geist Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      borderRadius: {
        sm: '6px',
        md: '12px',
        lg: '16px',
        'pill-category': '64px',
        pill: '100px',
      },
      boxShadow: {
        whisper: '0 1px 2px rgba(0, 0, 0, 0.04)',
        floating: '0 2px 2px rgba(0, 0, 0, 0.04), 0 8px 16px -4px rgba(0, 0, 0, 0.08)',
        'floating-lg': '0 8px 30px rgba(0, 0, 0, 0.12)',
      },
      letterSpacing: {
        'display-xl': '-2.4px',
        'heading-lg': '-1.28px',
        'heading-md': '-0.4px',
        'label-sm': '-0.28px',
      },
    },
  },
  plugins: [],
};

export default config;
