/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        black:        '#080808',
        dark:         '#111111',
        card:         '#161616',
        gold:         '#c9a84c',
        'gold-light': '#e8c97a',
        white:        '#f0f0f0',
        gray:         '#777777',
        gray2:        '#aaaaaa',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body:    ['"Inter"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
