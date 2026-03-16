import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './schemaTypes';

export default defineConfig({
	name: 'arts-by-justin',
	title: 'Arts by Justin',

	projectId: 'oqoqh3p3',
	dataset: 'production',

	plugins: [structureTool(), visionTool()],

	schema: {
		types: schemaTypes,
	},
});
