import { createClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'

export const sanityClient = createClient({
  projectId: 'oqoqh3p3',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
})

// Image URL helper
const builder = createImageUrlBuilder(sanityClient)
export function urlFor(source: any) {
  return builder.image(source)
}
