/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.tsx.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        bona: ['"Bona Nova SC"', 'serif'],
        inter: ['Inter', 'sans-serif'],
        kanit: ['Kanit', 'sans-serif'],
        playfair: ['"Playfair Display"', 'serif'],
        roboto: ['Roboto', 'sans-serif'],
        source: ['"Source Code Pro"', 'monospace'],
      },
      },
  },
  darkMode: "class", // For dark mode support
  plugins: [] // Remove invalid plugin import here
};
