/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'desert-sand': '#FDB813',
        'oasis-green': '#2E8540',
        'deep-ocean': '#003F5C',
        'cloud-white': '#FFFFFF',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        glow: 'glow 2s ease-in-out infinite alternate',
        'slide-up': 'slideUp 0.8s ease-out',
        'fade-in': 'fadeIn 1s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(1deg)' },
        },
        glow: {
          from: { boxShadow: '0 0 20px rgba(253, 184, 19, 0.3)' },
          to: {
            boxShadow: '0 0 40px rgba(253, 184, 19, 0.6), 0 0 60px rgba(46, 133, 64, 0.3)',
          },
        },
        slideUp: {
          from: { transform: 'translateY(50px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
