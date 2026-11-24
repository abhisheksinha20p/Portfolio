/** @type {import('tailwindcss').Config} */
const v = (name) => `rgb(var(--${name}) / <alpha-value>)`;

// Tokens: see DESIGN.md
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: v('paper'), surface: v('surface'), ink: v('ink'), muted: v('muted'), line: v('line'),
        primary: v('primary'), 'on-primary': v('on-primary'),
      },
      fontFamily: {
        sans: ['Geist', 'system-ui', 'sans-serif'],
        display: ['"Bricolage Grotesque"', 'Geist', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
