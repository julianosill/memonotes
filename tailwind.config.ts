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
    },
  },
  plugins: [],
}
export default config
