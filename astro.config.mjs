import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import sitemap from '@astrojs/sitemap'

export default defineConfig({
	site: 'https://artsbyjustin.com',
	server: { host: true, port: 4322 },
	integrations: [sitemap()],
	vite: {
		server: { allowedHosts: true },
		plugins: [tailwindcss()],
	},
})
