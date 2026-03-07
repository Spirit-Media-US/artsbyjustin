import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { media } from 'sanity-plugin-media'
import { schemaTypes } from './studio/schemaTypes'

export default defineConfig({
  name: 'artsbyjustin',
  title: 'Arts By Justin',
  projectId: 'oqoqh3p3',
  dataset: 'production',
  plugins: [structureTool(), visionTool(), media()],
  schema: {
    types: schemaTypes,
  },
})
