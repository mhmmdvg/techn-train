/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        secondary: '#252732',
        foreground: '#36373f',
        accent: '#3a53f5',
        muted: '#a0a2b2',
      },
    },
  },
  plugins: [],
};
