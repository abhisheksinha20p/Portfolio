/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#0B0B0E",
        surface: "#141418",
        primary: "#00D4FF", // Electric Blue/Cyan
        secondary: "#7C3AED", // Muted Purple
        text: "#F5F6F8",
        muted: "#9CA3AF",
        glass: "rgba(255, 255, 255, 0.05)",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
