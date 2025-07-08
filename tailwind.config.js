/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", // ✅ nécessaire pour activer dark mode via classe
  theme: {
    extend: {},
  },
  plugins: [],
};
