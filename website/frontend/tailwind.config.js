/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sliver': {
          'bg-primary': '#1a1a1a',
          'bg-secondary': '#252525',
          'border': '#3a3a3a',
          'text-primary': '#e0e0e0',
          'text-secondary': '#a0a0a0',
          'accent': '#ff6600',
          'success': '#00cc66',
          'warning': '#ff3333',
          'info': '#3399ff',
        },
      },
      fontFamily: {
        'mono': ['JetBrains Mono', 'Fira Code', 'monospace'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
