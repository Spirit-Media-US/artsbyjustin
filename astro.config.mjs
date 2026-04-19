import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import sitemap from '@astrojs/sitemap'
import inline from '@playform/inline'

export default defineConfig({
	site: 'https://artsbyjustin.com',
	server: { host: true, port: 4322 },
	integrations: [sitemap(), inline()],
	build: {
		inlineStylesheets: 'auto',
	},
	vite: {
		server: { allowedHosts: true },
		plugins: [tailwindcss()],
	},
})
