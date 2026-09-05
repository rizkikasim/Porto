/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Onest', 'sans-serif'],
      },
      colors: {
        ink: '#0a0a0a',
        accent: '#b15f2c',
        'accent-from': '#cf8047',
        'accent-to': '#97501f',
        surface: '#f1f0ee',
        line: '#e6e5e2',
      },
      borderRadius: {
        card: '2rem',
        'card-sm': '1.25rem',
      },
    },
  },
  plugins: [],
}