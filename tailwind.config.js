/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        smoke: {
          50: "#f0f6fc",
          100: "#e6edf3",
          200: "#7c848f",
          300: "#767e88",
          400: "#6d757f",
          500: "#30363d",
          600: "#21262d",
          700: "#161b22",
          800: "#0d1117",
          900: "#010409",
        },
      },
    },
    fontFamily: {
      sans: ["Inter Variable, sans-serif"],
      mono: ["JetBrains Mono Variable, monospace"],
    },
  },

  plugins: [],
};
