/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit', // Enable JIT mode for faster builds (optional but recommended)
  darkMode: 'class', // Enable dark mode based on class
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Define your custom color palette for dark mode
        // For example, you can define an orange color
        orange: {
          DEFAULT: '#FFA500', // Default color for light mode
          dark: '#FF7F00', // Color for dark mode
        },
      },
    },
  },
  plugins: [],
}