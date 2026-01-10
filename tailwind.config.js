/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0a0a0a",
        text: "#e5e5e5",
        muted: "#9ca3af"
      }
    }
  },
  plugins: [],
}
