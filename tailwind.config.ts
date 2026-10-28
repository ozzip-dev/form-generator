/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: "rgb(var(--color-accent-rgb) / <alpha-value>)",
        "accent-dark": "var(--color-accent-dark)",
        "accent-light": "var(--color-accent-light)",
        "accent-lighter": "var(--color-accent-lighter)",
        "accent-opacity": "var(--color-accent-opacity)",
        gray: "var(--color-gray)",
        active: "rgb(var(--color-active-rgb) / <alpha-value>)",
        disabled: "rgb(var(--color-disabled-rgb) / <alpha-value>)",

        "bg-dark": "var(--color-bg-dark)",
        "bg-light": "var(--color-bg-light)",

        "font-dark": "var(--color-font-dark)",
        "font-light": "var(--color-font-light)",

        error: "var(--color-error)",
      },
      fontSize: {
        xs: ["var(--fs-xs)", { fontWeight: "var(--fw-base)" }],
        sm: ["var(--fs-sm)", { fontWeight: "var(--fw-base)" }],
        base: ["var(--fs-md)", { fontWeight: "var(--fw-base)" }],
        base_bold: ["var(--fs-md)", { fontWeight: "var(--fw-semi-bold)" }],
        lg: ["var(--fs-lg)", { fontWeight: "var(--fw-semi-bold)" }],
        xl: [
          "var(--fs-xl)",
          { fontWeight: "var(--fw-base)", lineHeight: "var(--lh-xl)" },
        ],
        "2xl": ["var(--fs-2xl)", { fontWeight: "var(--fw-semi-bold)" }],
      },

      container: {
        center: true,
        padding: {
          DEFAULT: "2rem",
          // sm: "1.5rem",
          // lg: "2rem",
        },
        screens: {
          xl: "1450px",
        },
      },

      spacing: {
        sm: "2rem",
        md: "3.2rem",
        lg: "5rem",
      },

      borderRadius: {
        sm: "1rem",
        md: "1.8rem",
        lg: "3.5rem",
      },
      borderColor: {
        default: "rgba(217, 217, 217, 1)",
      },
      borderWidth: {
        DEFAULT: "1px",
      },

      boxShadow: {
        default: "0 0.4rem 1.2rem rgba(0,0,0,0.1)",
      },

      screens: {
        sm: "500px",
        md: "750px",
        lg: "950px",
        xl: "1200px",
      },
      keyframes: {
        "toast-in": {
          "0%": { opacity: "0", transform: "translateY(1rem)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        gradient: {
          "0%": {
            backgroundPosition: "0% 50%",
          },
          "50%": {
            backgroundPosition: "100% 50%",
          },
          "100%": {
            backgroundPosition: "0% 50%",
          },
        },
      },
      animation: {
        "toast-in": "toast-in 0.3s ease-out forwards",
        gradient: "gradient 35s ease infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
