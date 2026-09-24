/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cyber: {
          dark: '#05070f',
          card: '#0b0f19',
          border: '#1e293b',
          accent: '#00f0ff',
          neon: '#7000ff',
          red: '#ff003c',
          green: '#00ff66',
          yellow: '#ffe600'
        }
      },
      fontFamily: {
        mono: ['Fira Code', 'JetBrains Mono', 'monospace'],
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'neon-cyan': '0 0 15px rgba(0, 240, 255, 0.4)',
        'neon-purple': '0 0 15px rgba(112, 0, 255, 0.4)',
        'neon-red': '0 0 15px rgba(255, 0, 60, 0.4)',
      },
      animation: {
        'scanline': 'scanline 8s linear infinite',
        'flicker': 'flicker 0.15s infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' }
        }
      }
    },
  },
  plugins: [],
};
