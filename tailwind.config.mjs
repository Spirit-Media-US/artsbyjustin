/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        cream:    '#F7F4EE',
        ink:      '#1A1A18',
        rust:     '#C4622D',
        umber:    '#8B7355',
        linen:    '#EDE8DF',
        charcoal: '#3D3D3A',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body:    ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
