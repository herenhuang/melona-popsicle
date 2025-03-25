/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#ff6b35',
        background: '#f5f3e8',
        'baggy-primary': '#1a1a1a',
        'baggy-secondary': '#ffffff',
        'baggy-muted': 'rgba(26, 26, 26, 0.7)',
      },
      fontFamily: {
        sora: ['Sora', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        'baggy-serif': ['Cormorant Garamond', 'serif'],
        'baggy-sans': ['Inter', 'sans-serif'],
      },
      letterSpacing: {
        'ultra-wide': '0.25em',
        'mega-wide': '0.4em',
      },
      animation: {
        fadeIn: 'fadeIn 0.2s ease-out forwards',
        fadeInUp: 'fadeInUp 0.8s ease-out forwards',
        float: 'float 3s ease-in-out infinite',
        burst: 'burst 0.5s ease-out forwards',
        sparkle: 'sparkle 0.5s ease-out forwards',
        typing: 'typing 0.3s ease-out forwards',
        bubbleAppear: 'bubbleAppear 0.15s ease-out forwards',
        'baggy-fade-in': 'baggyFadeIn 0.8s cubic-bezier(0.165, 0.84, 0.44, 1) forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { 
            opacity: '0',
            transform: 'translateY(20px)'
          },
          '100%': { 
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
        burst: {
          '0%': { 
            transform: 'scale(1)',
            opacity: '1'
          },
          '100%': { 
            transform: 'scale(3)',
            opacity: '0'
          }
        },
        sparkle: {
          '0%': { 
            transform: 'scale(0) rotate(0deg)',
            opacity: '1'
          },
          '100%': { 
            transform: 'scale(1) rotate(180deg)',
            opacity: '0'
          }
        },
        typing: {
          '0%': { 
            opacity: '0',
            transform: 'translateY(10px)'
          },
          '100%': { 
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        bubbleAppear: {
          '0%': { 
            opacity: '0',
            transform: 'scale(0.98) translateY(5px)'
          },
          '100%': { 
            opacity: '1',
            transform: 'scale(1) translateY(0)'
          }
        },
        baggyFadeIn: {
          '0%': { 
            opacity: '0',
            transform: 'translateY(20px)'
          },
          '100%': { 
            opacity: '1',
            transform: 'translateY(0)'
          }
        }
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}