import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./context/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)"],
        editorial: ["var(--font-cormorant)"],
      },
      colors: {
        brand: {
          black: "#000000",
          white: "#FFFFFF",
          gray: "#767676",
          light: "#F5F5F5",
          border: "#E8E8E8",
        },
      },
    },
  },
  plugins: [],
};

export default config;