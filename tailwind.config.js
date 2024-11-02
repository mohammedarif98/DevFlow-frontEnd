/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'rubik-wet-paint': ['"Rubik Wet Paint"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}