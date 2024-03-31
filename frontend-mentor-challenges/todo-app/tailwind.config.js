/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: [],
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'selector',
  theme: {
    backgroundImage: {
      'hero-img-light': "url('./frontend-mentor/images/bg-mobile-light.jpg')",
      'hero-img-dark': "url('./frontend-mentor/images/bg-mobile-dark.jpg')"
    },
    letterSpacing: {
      tightest: '-.075em',
      tighter: '-.05em',
      tight: '-.025em',
      normal: '0',
      wide: '.25em',
      wider: '.5em',
      widest: '1em'
    }
  },
  plugins: []
}
