

/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");
module.exports = {
  future: {
    hoverOnlyWhenSupported: true,
  },
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-four-color': 'linear-gradient(90deg,  #E2EAF6, #E3E5E9)',
      },
      animation:{
     scroll:"scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
      },
      colors: {
        'custom-green': '#61CE70', 
      },
      fontFamily: {
        'dancing-script': ['Dancing Script', 'cursive'],
      },
      keyframes:{
        scroll: {
          to: {
            transform: "translate(calc(-50% - 0.5rem))",
          },
        },
      }
    },
  },
  plugins: [],
};


