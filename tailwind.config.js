/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {},
  },
  extend: {
  animation: {
    "fade-in": "fadeIn 0.8s ease-out",
  },
  keyframes: {
    fadeIn: {
      "0%": { opacity: 0 },
      "100%": { opacity: 1 },
    },
  },
},
  plugins: [],
}

