import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId: 'oqoqh3p3',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
})

// Image URL helper
import imageUrlBuilder from '@sanity/image-url'
const builder = imageUrlBuilder(sanityClient)
export function urlFor(source: any) {
  return builder.image(source)
}
