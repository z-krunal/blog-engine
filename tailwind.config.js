
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",   // This covers src/pages/blog/[slug].tsx
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}; 