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
        accent: "rgba(159, 193, 255, 1)",
        accent_opacity: "rgba(159, 193, 255, 0.64)",
        accent_dark: "rgba(101, 130, 255, 1)",

        bg_dark: "rgba(245, 245, 245, 1)",
        bg_light: "rgba(251, 251, 251, 1)",

        grey_primary: "rgba(217, 217, 217, 1)",

        font_dark: "rgba(66, 66, 66, 1)",
        font_light: "rgba(193, 193, 193, 1)",

        red: "rgba(255, 87, 87, 1)",
      },
      fontSize: {
        xs: ["var(--fs-xs)", { fontWeight: "var(--fw-base)" }],
        sm: ["var(--fs-sm)", { fontWeight: "var(--fw-base)" }],
        base: ["var(--fs-md)", { fontWeight: "var(--fw-base)" }],
        lg: ["var(--fs-lg)", { fontWeight: "var(--fw-semi-bold)" }],
        xl: ["var(--fs-xl)", { fontWeight: "var(--fw-base)" }],
        "2xl": ["var(--fs-2xl)", { fontWeight: "var(--fw-semi-bold)" }],
      },

      borderRadius: {
        sm: "10px",
        md: "35px",
      },
      borderColor: {
        default: "rgba(217, 217, 217, 1)",
      },
      borderWidth: {
        DEFAULT: "1px",
      },

      boxShadow: {
        default: "0 4px 12px rgba(0,0,0,0.1)",
      },

      screens: {
        sm: "400px",
        md: "600px",
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
