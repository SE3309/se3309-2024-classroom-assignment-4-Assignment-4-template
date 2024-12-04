/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./SRC/frontend/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}