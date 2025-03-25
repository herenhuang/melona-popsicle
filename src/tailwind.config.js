// Custom tailwind config file
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Define custom fonts
        'sans': ['Helvetica', 'Arial', 'sans-serif'],
        'serif': ['Georgia', 'serif'],
        'display': ['Fashion', 'sans-serif'],
      },
      colors: {
        // Custom color palette
        'primary': '#000000',
        'secondary': '#FFFFFF',
        'tertiary': '#F5F5F5',
        'accent': '#FF4500',
      },
      animation: {
        'spin-slow': 'spin 7s linear infinite',
        'bounce-slow': 'bounce 4s infinite',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'modal-open': 'modalOpen 0.3s ease-out forwards',
        'modal-close': 'modalClose 0.2s ease-in forwards',
        'gradient-move': 'gradientMove 15s ease infinite',
        'gradient-pulse': 'gradientPulse 4s ease-in-out infinite alternate',
        'float': 'float 20s linear infinite',
        'runway-fade': 'runwayFade 3s ease infinite',
      },
      keyframes: {
        modalOpen: {
          '0%': { transform: 'scale(0.95)', opacity: 0 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
        modalClose: {
          '0%': { transform: 'scale(1)', opacity: 1 },
          '100%': { transform: 'scale(0.95)', opacity: 0 },
        },
        pulse: {
          '0%, 100%': { opacity: 1, transform: 'scale(1)' },
          '50%': { opacity: .5, transform: 'scale(1.05)' },
        },
        gradientMove: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        gradientPulse: {
          '0%': { opacity: 0.3, transform: 'scale(1)' },
          '100%': { opacity: 0.7, transform: 'scale(1.5)' },
        },
        float: {
          '0%': { transform: 'translateY(0) translateX(0)', opacity: 0 },
          '10%': { opacity: 0.7 },
          '90%': { opacity: 0.7 },
          '100%': { transform: 'translateY(-200px) translateX(50px)', opacity: 0 },
        },
        runwayFade: {
          '0%, 100%': { opacity: 0.1 },
          '50%': { opacity: 0.3 },
        },
      },
    },
  },
  plugins: [
    plugin(function({ addUtilities }) {
      const newUtilities = {
        '.perspective': {
          perspective: '1000px',
        },
        '.preserve-3d': {
          transformStyle: 'preserve-3d',
        },
        '.backface-hidden': {
          backfaceVisibility: 'hidden',
        },
        '.hover-lift': {
          transition: 'transform 0.3s ease',
          '&:hover': {
            transform: 'translateY(-5px)',
          },
        },
      };

      addUtilities(newUtilities, ['responsive', 'hover']);
    }),
  ],
} 