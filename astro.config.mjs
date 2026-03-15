import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
	site: 'https://artsbyjustin.com',
	server: { host: true, port: 4322 },
	vite: {
		server: { allowedHosts: true },
		plugins: [tailwindcss()],
	},
})
