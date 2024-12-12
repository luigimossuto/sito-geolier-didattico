/** @type {import('tailwindcss').Config} */
const {nextui} = require("@nextui-org/react");

export default {
  content: [
   "./index.html",
   "./src/**/*.{js,ts,jsx,tsx}",
   "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primario: {
          light: '#ffffff',
          default: '#000000'
        },
        secondario: {
          light: '#000000',
          default: '#ffffff'
        },
        terziario: {
          default: '#00566F'
        },
        titolo: { 
          default: '#009FE3'
        },
        colorefooter: { 
          default: '#00303E'
        },
        grigio: {
          default: '#aaaaaa'
        },
        colorepremium: {
          default: '#9b2ef0'
        },
        coloreelite: {
          default: '#CEAA2B'
        },
        coloreplus: {
          default: '#DD590E'
        },
        colorestandard: {
          default: '#16E800'
        },
    },
    fontFamily: {
        oswald: ['"Oswald"', 'sans-serif'],
        serif: ['"Noto Serif"', 'system-ui'],
        mrdafoe: ['"Mr Dafoe"', 'cursive'],
    },
    textShadow: {
        'custom': '2px 2px 1px rgba(0, 0, 0, 1)',
    },
   },
  },
  darkMode: "class",
  plugins: [
    nextui(),
    require('tailwindcss-textshadow'),
  ],
}

