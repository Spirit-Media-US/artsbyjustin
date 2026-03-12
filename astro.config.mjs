import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [tailwind()],
  site: 'https://artsbyjustin.com',
  server: { host: true, port: 4322 },
  vite: {
    server: { allowedHosts: true },
  },
});
