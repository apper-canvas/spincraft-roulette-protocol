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
        'spin-roulette': 'spin 3s cubic-bezier(0.17, 0.67, 0.12, 0.99) forwards',
        'ball-spin': 'ballSpin 3s cubic-bezier(0.17, 0.67, 0.12, 0.99) forwards',
        'chip-place': 'chipPlace 0.3s ease-out',
        'winner-glow': 'winnerGlow 0.8s ease-in-out infinite alternate',
        'particle-burst': 'particleBurst 2s ease-out forwards',
        'ball-bounce': 'ballBounce 0.5s ease-out',
        'chip-stack': 'chipStack 0.4s ease-out',
        'celebration': 'celebration 3s ease-out forwards',
        'sparkle': 'sparkle 1.5s ease-in-out infinite',
        'wheel-highlight': 'wheelHighlight 0.6s ease-in-out'
      },
},
      keyframes: {
        wheelSpinRealistic: {
          '0%': { transform: 'rotate(0deg)' },
          '20%': { transform: 'rotate(720deg)' },
          '40%': { transform: 'rotate(1440deg)' },
          '60%': { transform: 'rotate(2160deg)' },
          '80%': { transform: 'rotate(2700deg)' },
          '100%': { transform: 'rotate(3240deg)' }
        },
        ballCounterSpin: {
          '0%': { transform: 'rotate(0deg)' },
          '20%': { transform: 'rotate(-1080deg)' },
          '40%': { transform: 'rotate(-2160deg)' },
          '60%': { transform: 'rotate(-3240deg)' },
          '80%': { transform: 'rotate(-4050deg)' },
          '100%': { transform: 'rotate(-4860deg)' }
        },
        chipPlace: {
          '0%': { transform: 'scale(0) rotate(180deg)', opacity: '0' },
          '50%': { transform: 'scale(1.2) rotate(90deg)', opacity: '0.8' },
          '100%': { transform: 'scale(1) rotate(0deg)', opacity: '1' }
        },
        winnerGlow: {
          '0%': { boxShadow: '0 0 20px rgba(255, 215, 0, 0.6)' },
          '100%': { boxShadow: '0 0 40px rgba(255, 215, 0, 1), 0 0 60px rgba(255, 215, 0, 0.8)' }
        },
        particleBurst: {
          '0%': { transform: 'scale(0) rotate(0deg)', opacity: '1' },
          '50%': { transform: 'scale(1.5) rotate(180deg)', opacity: '0.8' },
          '100%': { transform: 'scale(3) rotate(360deg)', opacity: '0' }
        },
        particleExplosion: {
          '0%': { transform: 'scale(0) rotate(0deg)', opacity: '1', filter: 'brightness(1)' },
          '30%': { transform: 'scale(2) rotate(180deg)', opacity: '0.9', filter: 'brightness(2)' },
          '60%': { transform: 'scale(4) rotate(360deg)', opacity: '0.6', filter: 'brightness(1.5)' },
          '100%': { transform: 'scale(6) rotate(540deg)', opacity: '0', filter: 'brightness(1)' }
        },
        ballBounce: {
          '0%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(-10px) scale(1.2)' },
          '100%': { transform: 'translateY(0) scale(1)' }
        },
        chipStack: {
          '0%': { transform: 'translateY(-20px) scale(0.8)', opacity: '0' },
          '100%': { transform: 'translateY(0) scale(1)', opacity: '1' }
        },
        celebration: {
          '0%': { transform: 'scale(1) rotate(0deg)', filter: 'brightness(1)' },
          '25%': { transform: 'scale(1.1) rotate(5deg)', filter: 'brightness(1.3)' },
          '50%': { transform: 'scale(1.05) rotate(-3deg)', filter: 'brightness(1.5)' },
          '75%': { transform: 'scale(1.08) rotate(2deg)', filter: 'brightness(1.2)' },
          '100%': { transform: 'scale(1) rotate(0deg)', filter: 'brightness(1)' }
        },
        winningCelebration: {
          '0%': { transform: 'scale(1) rotate(0deg)', filter: 'brightness(1) saturate(1)' },
          '15%': { transform: 'scale(1.15) rotate(3deg)', filter: 'brightness(1.4) saturate(1.3)' },
          '30%': { transform: 'scale(1.1) rotate(-2deg)', filter: 'brightness(1.6) saturate(1.5)' },
          '45%': { transform: 'scale(1.12) rotate(1deg)', filter: 'brightness(1.3) saturate(1.2)' },
          '60%': { transform: 'scale(1.08) rotate(-1deg)', filter: 'brightness(1.5) saturate(1.4)' },
          '75%': { transform: 'scale(1.05) rotate(0.5deg)', filter: 'brightness(1.2) saturate(1.1)' },
          '100%': { transform: 'scale(1) rotate(0deg)', filter: 'brightness(1) saturate(1)' }
        },
        sparkle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.3', transform: 'scale(1.2)' }
        },
        wheelHighlight: {
          '0%': { boxShadow: '0 0 50px rgba(255, 215, 0, 0.3)' },
          '100%': { boxShadow: '0 0 100px rgba(255, 215, 0, 0.8), inset 0 0 50px rgba(255, 215, 0, 0.2)' }
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 30px rgba(255, 215, 0, 0.4)' },
          '50%': { boxShadow: '0 0 60px rgba(255, 215, 0, 0.8), 0 0 90px rgba(255, 215, 0, 0.4)' }
        },
        wheelGlow: {
          '0%': { boxShadow: 'inset 0 0 30px rgba(0, 0, 0, 0.8), 0 0 50px rgba(255, 215, 0, 0.3)' },
          '50%': { boxShadow: 'inset 0 0 50px rgba(255, 215, 0, 0.2), 0 0 100px rgba(255, 215, 0, 0.6)' },
          '100%': { boxShadow: 'inset 0 0 30px rgba(0, 0, 0, 0.8), 0 0 50px rgba(255, 215, 0, 0.3)' }
        }
    }
  },
  plugins: [],
  darkMode: 'class',
}