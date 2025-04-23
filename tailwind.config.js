/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4F46E5', // Indigo-600
          dark: '#4338CA', // Indigo-700
        },
        secondary: {
          DEFAULT: '#0EA5E9', // Sky-500
          dark: '#0284C7', // Sky-600
        },
        accent: {
          DEFAULT: '#F97316', // Orange-500
          dark: '#EA580C', // Orange-600
        },
      },
    },
  },
  plugins: [],
};