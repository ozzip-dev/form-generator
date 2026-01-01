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
        accent: "var(--color-accent)",
        accent_opacity: "var(--color-accent_opacity)",
        accent_dark: "var(--color-accent_dark)",

        bg_dark: "var(--color-bg_dark)",
        bg_light: "var(--color-bg_light)",

        bg_light: "var(--color-bg_light)",

        // TODO: dodajmy te kolory do .css
        grey_primary: "rgba(217, 217, 217, 1)",
        grey_secondary: "var(--color-grey_secondary)",

        font_dark: "rgba(66, 66, 66, 1)",
        font_light: "rgba(193, 193, 193, 1)",

        error: "var(--color-error)",
      },
      fontSize: {
        xs: ["var(--fs-xs)", { fontWeight: "var(--fw-base)" }],
        sm: ["var(--fs-sm)", { fontWeight: "var(--fw-base)" }],
        base: ["var(--fs-md)", { fontWeight: "var(--fw-base)" }],
        base_bold: ["var(--fs-md)", { fontWeight: "var(--fw-semi-bold)" }],
        lg: ["var(--fs-lg)", { fontWeight: "var(--fw-semi-bold)" }],
        xl: ["var(--fs-xl)", { fontWeight: "var(--fw-base)" }],
        "2xl": ["var(--fs-2xl)", { fontWeight: "var(--fw-semi-bold)" }],
      },

      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "1.5rem",
          lg: "2rem",
        },
        screens: {
          xl: "1450px",
        },
      },

      borderRadius: {
        sm: "1rem",
        md: "3.5rem",
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
        sm: "400px",
        md: "500px",
        lg: "750px",
      },
      keyframes: {
        "toast-in": {
          "0%": { opacity: "0", transform: "translateY(1rem)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "toast-in": "toast-in 0.3s ease-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
