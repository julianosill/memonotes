import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        xs: '480px',
      },
      gridTemplateColumns: {
        app: '15rem 1fr',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        memonotes: {
          50: '#F4F8FA',
          100: '#E6EEF3',
          200: '#D3E0EA',
          300: '#B5CCDB',
          400: '#91B2C9',
          500: '#769ABB',
          600: '#6484AC',
          700: '#5A76A0',
          800: '#4C5F81',
          900: '#405068',
          950: '#2A3241',
        },
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        strong: 'var(--strong)',
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
          strong: 'var(--card-strong)',
        },
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        border: {
          DEFAULT: 'var(--border)',
          soft: 'var(--border-soft)',
        },
        ring: {
          DEFAULT: 'var(--ring)',
          soft: 'var(--ring-soft)',
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)',
        },
      },
      keyframes: {
        revolve: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(180deg)' },
        },
      },
      animation: {
        revolve: 'revolve 750ms ease-in-out 1',
      },
      typography: () => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': 'var(--card-foreground)',
            '--tw-prose-headings': 'var(--strong)',
            '--tw-prose-bold': 'var(--card-strong)',
            '--tw-prose-lead': 'var(--primary)',
            '--tw-prose-links': 'var(--primary)',
            '--tw-prose-counters': 'var(--muted-foreground)',
            '--tw-prose-bullets': 'var(--muted-foreground)',
            '--tw-prose-hr': 'var(--muted-foreground)',
            '--tw-prose-quotes': 'var(--card-foreground)',
            '--tw-prose-quote-borders': 'var(--muted-foreground)',
            '--tw-prose-captions': 'var(--muted-foreground)',
            '--tw-prose-code': 'var(--muted-foreground)',
            '--tw-prose-pre-code': 'var(--foreground)',
            '--tw-prose-pre-bg': 'var(--muted)',
            '--tw-prose-th-borders': 'var(--muted)',
            '--tw-prose-td-borders': 'var(--muted)',
          },
        },
      }),
    },
  },
  plugins: [require('tailwind-scrollbar'), require('@tailwindcss/typography')],
}
export default config
