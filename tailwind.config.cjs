/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#17191a",
        primaryDark: "#0f1111",
        primaryLight: "#1f2122",
        textLight: "#f2f2f2",
      },
    },
  },
  plugins: [],
}
