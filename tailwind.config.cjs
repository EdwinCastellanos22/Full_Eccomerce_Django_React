/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'phone': '300px',
    },
    extend: {},
  },
  plugins: [require("daisyui")],

  daisyui: {
    themes: true,
    themes: ["light", "dark",],
  },
}
