/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'selector',
  theme: {
    extend: {
      backgroundImage: {
        'hero-img-light': "url('./frontend-mentor/images/bg-mobile-light.jpg')",
        'hero-img-dark': "url('./frontend-mentor/images/bg-mobile-dark.jpg')"
      },
      colors: {
        gradient: {
          blue: 'hsl(192, 100%, 67%)',
          purple: 'hsl(280, 87%, 65%)'
        }
      }
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
