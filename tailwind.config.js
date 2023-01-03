/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        customDark: {
          primary: "#4fb705",
          secondary: "#f4af0e",
          accent: "#14e2dc",
          neutral: "#211C2B",
          "base-100": "#2D3552",
          info: "#8FC1E6",
          success: "#1AD581",
          warning: "#EF8C0B",
          error: "#ED7891",
        },
        customLight: {
          primary: "#e55ea4",
          secondary: "#ff9f5b",
          accent: "#e881d3",
          neutral: "#2F2D39",
          "base-100": "#E7E6F4",
          info: "#55A3CE",
          success: "#26CF67",
          warning: "#EEBF58",
          error: "#E6516F",
        },
      },
    ],
  },
};
