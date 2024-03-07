/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lightbl: '#0e1d39',
        darkbl: '#1a2337',
        xdarkbl: '#0F1623'
      }
    },
  },
  plugins: [],
}