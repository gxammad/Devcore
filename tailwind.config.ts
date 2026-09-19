import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        void: '#050608',
        surface: '#0D0F12',
        elevated: '#15181E',
        accent: {
          primary: '#00F299',
          secondary: '#00D685',
          glow: 'rgba(0, 242, 153, 0.18)',
        },
        devcore: {
          text: {
            primary: '#F2F5F8',
            secondary: '#8C96A5',
            muted: '#4B5565',
          },
          border: {
            subtle: 'rgba(255, 255, 255, 0.08)',
            active: 'rgba(0, 242, 153, 0.4)',
          },
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['var(--font-space)', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      letterSpacing: {
        widest: '0.2em',
        tightest: '-0.04em',
      },
      boxShadow: {
        'accent-glow': '0 0 35px -5px rgba(0, 242, 153, 0.25)',
        'accent-intense': '0 0 50px 0px rgba(0, 242, 153, 0.4)',
      },
      animation: {
        'pulse-subtle': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};

export default config;
