/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        void: '#0B0F19',
        'lab-panel': '#111827',
        'ocean-teal': '#008080',
        'ocean-blue': '#006994',
        'neon-cyan': '#00FFD1',
        corkboard: '#2B1D14',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Space Grotesk', 'Inter', 'sans-serif'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'Fira Code', 'monospace'],
        handwritten: ['var(--font-handwritten)', 'Caveat', 'Permanent Marker', 'cursive'],
      },
      boxShadow: {
        'neon-cyan': '0 0 20px rgba(0, 255, 209, 0.35)',
        'neon-teal': '0 0 20px rgba(0, 128, 128, 0.35)',
        'lab-card': '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
      },
      animation: {
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite',
        'float-slow': 'float 5s ease-in-out infinite',
        'scanline': 'scanline 8s linear infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', filter: 'drop-shadow(0 0 15px rgba(0, 255, 209, 0.6))' },
          '50%': { opacity: '0.9', filter: 'drop-shadow(0 0 25px rgba(0, 255, 209, 0.9))' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        },
      },
    },
  },
  plugins: [],
};
