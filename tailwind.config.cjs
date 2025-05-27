/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1890ff',
      },
      height: {
        header: '64px',
      },
      boxShadow: {
        card: '0 2px 8px rgba(0, 0, 0, 0.06)',
      },
    },
  },
  plugins: [],
  // 与 Ant Design Vue 的样式兼容
  corePlugins: {
    preflight: false,
  },
} 