import type { Config } from 'tailwindcss'

const c = (name: string) => `rgb(var(--color-${name}) / <alpha-value>)`

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: c('bg'),
        surface: c('surface'),
        ink: c('ink'),
        'ink-text': c('ink-text'),
        border: { DEFAULT: c('border'), hover: c('border-hover') },
        ice: { DEFAULT: c('ice'), dim: c('ice-dim') },
        amber: c('amber'),
        text: { DEFAULT: c('text'), muted: c('text-muted'), faint: c('text-faint') },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"IBM Plex Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      fontSize: {
        hero: ['clamp(2.75rem, 8.2vw, 8rem)', { lineHeight: '0.95', letterSpacing: '-0.035em' }],
        display: ['clamp(2rem, 5vw, 4.25rem)', { lineHeight: '1', letterSpacing: '-0.03em' }],
      },
    },
  },
  plugins: [],
} satisfies Config
