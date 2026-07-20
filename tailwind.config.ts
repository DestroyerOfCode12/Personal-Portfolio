import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: '#0A0E14',
        surface: '#111722',
        'surface-raised': '#161D2A',
        border: {
          DEFAULT: '#1F2937',
          hover: '#2A3644',
        },
        ice: {
          DEFAULT: '#3FDCFF',
          dim: '#1B4B57',
          soft: '#7FE8FF',
        },
        amber: {
          DEFAULT: '#FFB454',
          dim: '#5C4326',
        },
        text: {
          DEFAULT: '#E6EDF3',
          muted: '#8B98A8',
          faint: '#5A6472',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"IBM Plex Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'grid-texture':
          'linear-gradient(to right, rgba(63,220,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(63,220,255,0.05) 1px, transparent 1px)',
      },
      backgroundSize: {
        grid: '40px 40px',
      },
      boxShadow: {
        glow: '0 0 24px rgba(63,220,255,0.25)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        scan: 'scan 6s linear infinite',
      },
      keyframes: {
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config
