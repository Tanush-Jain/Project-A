import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'valorant-dark': '#0F1923',
        'valorant-secondary': '#1C2B3A',
        'valorant-red': '#FF4655',
        'valorant-white': '#ECE8E1',
        'valorant-text': '#FFFFFF',
        'valorant-text-secondary': '#A8B2C1',
        'valorant-border': '#2B3E50',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'glow-red': '0 0 30px rgba(255, 70, 85, 0.6)',
        'glow-red-lg': '0 0 60px rgba(255, 70, 85, 0.8)',
      },
    },
  },
  plugins: [],
} satisfies Config
