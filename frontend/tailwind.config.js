/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "var(--background)",
          muted: "var(--background-muted)",
          dark: "var(--background-dark)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          dark: "var(--primary-dark)",
        },
        foreground: {
          DEFAULT: "var(--foreground)",
          muted: "var(--foreground-muted)",
        },
      },
      fontFamily: {
        OpenSans: ["Open Sans", "sans-serif"],
        Raleway: ["Raleway", "sans-serif"],
        Syne: ["Syne", "sans-serif"],
      },
      screens: {
        lgxl: "1440px",
      },
    },
  },
  plugins: [],
};
