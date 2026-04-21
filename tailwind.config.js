/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-primary': '#f89820',
        'brand-secondary': '#5382a1',
        'dark-bg': '#0b0d12',
        'dark-sidebar': '#11141d',
        'dark-card': '#1a1d27',
        'dark-border': 'rgba(255, 255, 255, 0.08)',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
