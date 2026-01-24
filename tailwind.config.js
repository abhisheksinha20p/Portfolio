/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#050505', // Deepest black
        surface: '#0A0A0A',    // Very dark gray
        primary: '#E0E0E0',    // Silver/White
        secondary: '#A0A0A0',  // Muted Gray
        accent: '#303030',     // Dark accent
        text: '#F5F6F8',
        muted: '#666666',
        glass: 'rgba(255, 255, 255, 0.03)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
      },
      backgroundImage: {
        'noise': "url('/noise.png')", // We will use CSS for this instead
      },
    },
  },
  plugins: [],
}
