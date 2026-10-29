import type { Config } from 'tailwindcss';

const config: Config = {
  future: {
    hoverOnlyWhenSupported: true,
  },
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
      transitionTimingFunction: {
        DEFAULT: 'cubic-bezier(0.23, 1, 0.32, 1)',
        'out-strong': 'var(--ease-out)',
        'in-out-strong': 'var(--ease-in-out)',
        drawer: 'var(--ease-drawer)',
      },
      transitionDuration: {
        '100': '100ms',
        '160': '160ms',
        '200': '200ms',
        '250': '250ms',
        '300': '300ms',
        '400': '400ms',
        '500': '500ms',
      },
      keyframes: {
        'modal-enter': {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-up': {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'stagger-in': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'modal-enter': 'modal-enter 250ms var(--ease-out) forwards',
        'fade-in': 'fade-in 200ms var(--ease-out) forwards',
        'scale-up': 'scale-up 250ms var(--ease-out) forwards',
        'stagger-in': 'stagger-in 300ms var(--ease-out) forwards',
      },
    },
  },
  plugins: [],
};

export default config;
