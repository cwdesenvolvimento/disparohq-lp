/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2BB301",
        accent: "#FA0CF7",
        background: "#FFFFFF",
        surface: "#F8FAFC",
        text: "#0F172A",
        muted: "#475569",
        border: "#E2E8F0"
      },
      boxShadow: {
        soft: "0 6px 24px rgba(15, 23, 42, 0.08)",
        card: "0 6px 18px rgba(15, 23, 42, 0.08)"
      },
      borderRadius: {
        xl: "1rem",
        '2xl': "1.25rem"
      }
    }
  },
  plugins: []
};