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
        background: "#080A0F",
        surface: {
          50: "#1A202C",
          100: "#141923",
          200: "#0F141D",
          DEFAULT: "#0C1017",
          subtle: "#090C12",
        },
        border: {
          subtle: "rgba(255, 255, 255, 0.05)",
          DEFAULT: "rgba(255, 255, 255, 0.08)",
          strong: "rgba(255, 255, 255, 0.14)",
          focus: "rgba(99, 102, 241, 0.45)",
        },
        accent: {
          DEFAULT: "#6366F1",
          hover: "#4F46E5",
          muted: "rgba(99, 102, 241, 0.12)",
          border: "rgba(99, 102, 241, 0.25)",
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
        subtle: "0 1px 2px 0 rgba(0, 0, 0, 0.35)",
        card: "0 4px 20px -2px rgba(0, 0, 0, 0.5)",
        elevated: "0 12px 32px -4px rgba(0, 0, 0, 0.65)",
      },
    },
  },
  plugins: [],
};

export default config;
