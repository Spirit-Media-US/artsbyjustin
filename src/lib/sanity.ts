import { createClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'

export const sanityClient = createClient({
  projectId: 'oqoqh3p3',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
  token: import.meta.env.SANITY_TOKEN,
})

// Image URL helper
const builder = createImageUrlBuilder(sanityClient)
export function urlFor(source: any) {
  return builder.image(source)
}

// Fetch siteSettings
export async function getSiteSettings() {
  const query = `*[_type == "siteSettings"][0]`
  try {
    const settings = await sanityClient.fetch(query)
    return settings || {}
  } catch (error) {
    console.error('Error fetching siteSettings:', error)
    return {}
  }
}

// Fetch all artworks
export async function getArtworks() {
  const query = `*[_type == "artwork"] | order(order asc, _createdAt desc) {
    _id,
    title,
    image,
    category,
    series,
    description,
    medium,
    dimensions,
    year,
    price,
    available,
    sold,
    featured,
    heroFeature,
    order,
    colorGradient
  }`
  try {
    const artworks = await sanityClient.fetch(query)
    return artworks || []
  } catch (error) {
    console.error('Error fetching artworks:', error)
    return []
  }
}

// Fetch featured artworks
export async function getFeaturedArtworks() {
  const query = `*[_type == "artwork" && featured == true] | order(order asc) {
    _id,
    title,
    image,
    category,
    series,
    description,
    medium,
    dimensions,
    year,
    price,
    available,
    sold,
    featured,
    heroFeature,
    order,
    colorGradient
  }`
  try {
    const artworks = await sanityClient.fetch(query)
    return artworks || []
  } catch (error) {
    console.error('Error fetching featured artworks:', error)
    return []
  }
}

// Fetch awards
export async function getAwards() {
  const query = `*[_type == "award"] | order(year desc) {
    _id, title, organization, year, type, description, icon, featured
  }`
  try {
    const awards = await sanityClient.fetch(query)
    return awards || []
  } catch (error) {
    console.error('Error fetching awards:', error)
    return []
  }
}

// Fetch press features
export async function getPressFeatures() {
  const query = `*[_type == "pressFeature"] | order(_createdAt desc) {
    _id, title, publication, type, excerpt, date, image, externalUrl, featured
  }`
  try {
    const features = await sanityClient.fetch(query)
    return features || []
  } catch (error) {
    console.error('Error fetching press features:', error)
    return []
  }
}
