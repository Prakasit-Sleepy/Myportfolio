export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        kanit: ['Kanit', 'sans-serif'],
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideInLeft: {
          '0%': { opacity: 0, transform: 'translateX(-40px)' },
          '100%': { opacity: 1, transform: 'translateX(0)' },
        },
        zoomIn: {
          '0%': { opacity: 0, transform: 'scale(0.95)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 1s ease-out forwards',
        slideInLeft: 'slideInLeft 1s ease-out forwards',
        zoomIn: 'zoomIn 0.8s ease-out forwards',
      },
      content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
      ],
      safelist: [
        'opacity-0',
        'opacity-100',
        'translate-y-8',
        'translate-y-0',
        'animate-fade-in-on-scroll'
      ]
    },
  },
  plugins: [],
}
