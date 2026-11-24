/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        wedora: {
          dark: '#1c100b',     // Deep dark chocolate
          rich: '#2d1810',     // Rich cocoa
          medium: '#4a2818',   // Milk chocolate
          caramel: '#8c5331',  // Warm caramel
          gold: '#c59b27',     // Soft luxurious gold
          goldLight: '#e6c875',
          cream: '#fdfaf5',    // Ivory cream background
          creamSoft: '#f7f1e6', // Soft secondary cream
          sand: '#ecdac2',
          accent: '#b83b3b',   // Special offer red accent
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
