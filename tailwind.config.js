/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        // Adding a custom font family
        sans: ['Outfit', 'sans-serif'], // You can replace 'Roboto' with your font name
      },
    },
  },
  plugins: [],
}