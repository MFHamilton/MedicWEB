import {heroui} from "@heroui/theme"

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    './src/layouts//*.{js,ts,jsx,tsx,mdx}',
    './src/pages//*.{js,ts,jsx,tsx,mdx}',
    './src/components//*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@heroui/theme/dist//*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#03045E",
        secondary: "#00A8E8",
        terciary: "#FF6B35",
        texty: "#212121",
      },
    },
  },
  darkMode: "class",
  //plugins: [heroui()],
};