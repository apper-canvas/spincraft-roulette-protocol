/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#c41e3a',
          light: '#dc3545',
          dark: '#a51829'
        },
        secondary: {
          DEFAULT: '#1a5d1a',
          light: '#228b22',
          dark: '#0f3a0f'
        },
        accent: '#ffd700',
        surface: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a'
        },
        casino: {
          red: '#c41e3a',
          black: '#1a1a1a',
          green: '#1a5d1a',
          gold: '#ffd700',
          felt: '#0a5f38'
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        heading: ['Inter', 'ui-sans-serif', 'system-ui']
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
        'neu-light': '5px 5px 15px #d1d9e6, -5px -5px 15px #ffffff',
        'neu-dark': '5px 5px 15px rgba(0, 0, 0, 0.3), -5px -5px 15px rgba(255, 255, 255, 0.05)',
        'casino': '0 8px 32px rgba(196, 30, 58, 0.3), 0 0 0 1px rgba(255, 215, 0, 0.1)',
        'wheel': 'inset 0 0 30px rgba(0, 0, 0, 0.8), 0 0 50px rgba(255, 215, 0, 0.3)'
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem'
      },
      animation: {
        'spin-roulette': 'spin 4s cubic-bezier(0.17, 0.67, 0.12, 0.99) forwards',
        'ball-spin': 'ballSpin 4s cubic-bezier(0.17, 0.67, 0.12, 0.99) forwards',
        'chip-place': 'chipPlace 0.3s ease-out',
        'winner-glow': 'winnerGlow 0.8s ease-in-out infinite alternate'
      },
      keyframes: {
        chipPlace: {
          '0%': { transform: 'scale(0) rotate(180deg)', opacity: '0' },
          '50%': { transform: 'scale(1.2) rotate(90deg)', opacity: '0.8' },
          '100%': { transform: 'scale(1) rotate(0deg)', opacity: '1' }
        },
        winnerGlow: {
          '0%': { boxShadow: '0 0 20px rgba(255, 215, 0, 0.6)' },
          '100%': { boxShadow: '0 0 40px rgba(255, 215, 0, 1), 0 0 60px rgba(255, 215, 0, 0.8)' }
        }
      }
    }
  },
  plugins: [],
  darkMode: 'class',
}