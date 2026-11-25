import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/planning/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F5F7F4",
        surface: {
          50: "#FAFBF9",
          100: "#F0F4F1",
          200: "#E6ECE7",
          DEFAULT: "#FFFFFF",
          subtle: "#F8FAF7",
        },
        brand: {
          50: "#F0F7F4",
          100: "#E5F1EB",
          200: "#CCE4D8",
          300: "#99C9B1",
          400: "#4D9A7C",
          500: "#176B5B",
          600: "#145B4D",
          700: "#114B40",
          800: "#0D3A31",
          900: "#0A2923",
          DEFAULT: "#176B5B",
        },
        forest: {
          DEFAULT: "#172923",
          muted: "#52665D",
          subtle: "#8E9F97",
        },
        border: {
          subtle: "#ECF1EC",
          DEFAULT: "#E2E8E3",
          strong: "#CBD5CD",
          focus: "rgba(23, 107, 91, 0.4)",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Inter",
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          "sans-serif",
        ],
        mono: [
          '"JetBrains Mono"',
          '"SF Mono"',
          "Menlo",
          "Monaco",
          "Consolas",
          '"Liberation Mono"',
          "monospace",
        ],
      },
      boxShadow: {
        subtle: "0 1px 2px rgba(23, 41, 35, 0.04)",
        card: "0 1px 3px rgba(23, 41, 35, 0.05), 0 1px 2px rgba(23, 41, 35, 0.03)",
        elevated: "0 10px 25px -5px rgba(23, 41, 35, 0.08), 0 8px 10px -6px rgba(23, 41, 35, 0.04)",
      },
    },
  },
  plugins: [],
};

export default config;
