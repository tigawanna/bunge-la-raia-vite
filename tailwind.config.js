

/** @type {import('tailwindcss').Config} */
const { parkwindPlugin } = require("@park-ui/tailwind-plugin");

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: ["class"],
  theme: {
    extend: {
      colors: {
        error:"var(--colors-error)",
        "error-content":"var(--colors-error-content)",
        success:"var(--colors-success)",
        "success-content":"var(--colors-success-content)",
        warning:"var(--colors-warning)",
        "warning-content":"var(--colors-warning-content)",
        loading:"var(--colors-loading)",
        "loading-content":"var(--colors-loading-content)",
      }
    },
  },
  // parkUI: {
  //   accentColor: "yellow",
  //   grayColor: "slate",
  //   borderRadius: "sm",
    
  // },
  plugins: [require("tailwindcss-animate"), parkwindPlugin],
};
