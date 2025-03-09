/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'selector',
  theme: {
    extend: {
      backgroundImage: {
        'mobile-hero-img-light': "url('/images/bg-mobile-light.jpg')",
        'mobile-hero-img-dark': "url('/images/bg-mobile-dark.jpg')",
        'desktop-hero-img-light': "url('/images/bg-desktop-light.jpg')",
        'desktop-hero-img-dark': "url('/images/bg-desktop-dark.jpg')"
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
