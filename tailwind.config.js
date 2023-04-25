/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    screens: {
      'sm': {'min': '280px', 'max': '660px'},
      // => @media (min-width: 640px and max-width: 767px) { ... }

      'md': {'min': '280px', 'max': '839px'},
      // => @media (min-width: 768px and max-width: 1023px) { ... }

      'lg': {'min': '1024px', 'max': '1279px'},
      // => @media (min-width: 1024px and max-width: 1279px) { ... }

      'xl': {'min': '840px', 'max': '2000px'},
      // => @media (min-width: 1280px and max-width: 1535px) { ... }

      '2xl': {'min': '1536px'},
      // => @media (min-width: 1536px) { ... }
    },
    extend: {colors:{
      "light-orange": "rgb(252, 185, 0)"
    }},
  },
  plugins: [],
}

