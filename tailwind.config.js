/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: { suss: { navy: '#1B2A4A', red: '#D32F2F' } },
      fontFamily: { sans: ['Plus Jakarta Sans', 'sans-serif'] },
    },
  },
  plugins: [],
};
