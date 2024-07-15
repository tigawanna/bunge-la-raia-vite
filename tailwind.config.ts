import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
    },
  },
  plugins: [
    require("daisyui"),
    require("tailwindcss-animate"),
    require("daisify-shadcn"),
  ],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#5f460c",
          "primary-focus": "#7f611a",
          "primary-content": "#fdf0d3",

          secondary: "#6b7203",
          "secondary-focus": "#afa460",
          "secondary-content": "#ffffff",

          accent: "#856832",
          "accent-focus": "#c8b793",
          "accent-content": "#ffffff",

          neutral: "#e9e1ce",
          "neutral-focus": "#d3cbb1",
          "neutral-content": "#847348",

          "base-100": "#e8dbbf",
          "base-200": "#c9b383",
          "base-300": "#8f7d56",
          "base-content": "#1c1e01",

          info: "#1c92f2",
          success: "#009485",
          warning: "#ff9900",
          error: "#ff5724",

          "--rounded-box": "1rem",
          "--rounded-btn": "1.9rem",
          "--rounded-badge": "1.9rem",

          "--animation-btn": ".25s",
          "--animation-input": ".2s",

          "--btn-text-case": "uppercase",
          "--navbar-padding": ".5rem",
          "--border-btn": "1px",
        },
        dark: {
          primary: "#9c761c",
          "primary-focus": "#b38823",
          "primary-content": "#443509",

          secondary: "#afba17",
          "secondary-focus": "#a39529",
          "secondary-content": "#27290f",

          accent: "#856832",
          "accent-focus": "#966a17",
          "accent-content": "#fdf8f7",

          neutral: "#0e0e0b",
          "neutral-focus": "#312f25",
          "neutral-content": "#f8f4ec",

          "base-100": "#1a100a",
          "base-200": "#342318",
          "base-300": "#7d6454",
          "base-content": "#e8e8de",

          info: "#1c92f2",
          success: "#009485",
          warning: "#ff9900",
          error: "#ff5724",

          "--rounded-box": "1rem",
          "--rounded-btn": "1.9rem",
          "--rounded-badge": "1.9rem",

          "--animation-btn": ".25s",
          "--animation-input": ".2s",

          "--btn-text-case": "uppercase",
          "--navbar-padding": ".5rem",
          "--border-btn": "1px",
        },
      },
    ],
  },
} satisfies Config;
