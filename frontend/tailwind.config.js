/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ember: '#F97316',
        danger: '#DC2626',
      },
      boxShadow: {
        glow: '0 0 40px rgba(249,115,22,0.25)',
      },
      backgroundImage: {
        cinematic:
          'radial-gradient(circle at 20% 20%, rgba(249,115,22,0.15), transparent 35%), radial-gradient(circle at 80% 0%, rgba(220,38,38,0.15), transparent 40%)',
      },
    },
  },
  plugins: [],
};
