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

// Fetch siteSettings
export async function getSiteSettings() {
  const query = `*[_type == "siteSettings"][0]{
    artistName,
    tagline,
    bio,
    location,
    foundingYear,
    profilePhoto,
    email,
    phone,
    instagramUrl,
    facebookUrl,
    tiktokUrl,
    heroImage,
    logo,
    galleryImages,
    aboutPortraitImage,
    commissionInfo,
    commissionTimeline,
    commissionsPerSeason,
    ogImage,
    testimonials,
    shopLinks,
    artCategories,
    homePageStats,
    portfolioPageStats,
    pressPageStats,
    etsyShopUrl,
    freeShippingRegion,
    printSpecifications
  }`
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

// Medium value → URL slug
export const MEDIUM_SLUGS: Record<string, string> = {
  'Resin Art': 'resin-art',
  'Canvas & Paint': 'canvas-paint',
  'Fine Art Print': 'fine-art-print',
  'String Art': 'string-art',
  'Mural & Installation': 'mural-installation',
  'Functional Art': 'functional-art',
  'Mixed Media': 'mixed-media',
}

// Subject value → URL slug
export const SUBJECT_SLUGS: Record<string, string> = {
  'Sports & Motion': 'sports-motion',
  'Nature & Ocean': 'nature-ocean',
  'Abstract & Expressive': 'abstract-expressive',
  'Portraits & Figurative': 'portraits-figurative',
  'Faith & Inspiration': 'faith-inspiration',
  'Animals & Wildlife': 'animals-wildlife',
}

// Reverse lookups: URL slug → Sanity value
export const SLUG_TO_MEDIUM: Record<string, string> = Object.fromEntries(
  Object.entries(MEDIUM_SLUGS).map(([k, v]) => [v, k])
)
export const SLUG_TO_SUBJECT: Record<string, string> = Object.fromEntries(
  Object.entries(SUBJECT_SLUGS).map(([k, v]) => [v, k])
)

// Fetch single artwork by slug
export async function getArtworkBySlug(slug: string) {
  const query = `*[_type == "artwork" && slug.current == $slug][0]{
    _id, title, slug, image, imageType, medium, category, subjectTags,
    description, dimensions, year, price, designTime, available, sold,
    featured, series, colorGradient
  }`
  try {
    return await sanityClient.fetch(query, { slug })
  } catch (error) {
    console.error('Error fetching artwork by slug:', error)
    return null
  }
}

// Fetch all artwork slugs (for getStaticPaths)
export async function getAllArtworkSlugs() {
  try {
    return await sanityClient.fetch(
      `*[_type == "artwork" && defined(slug.current)]{ "slug": slug.current }`
    )
  } catch (error) {
    console.error('Error fetching artwork slugs:', error)
    return []
  }
}

// Fetch artworks by medium
export async function getArtworksByMedium(medium: string) {
  const query = `*[_type == "artwork" && medium == $medium] | order(order asc, _createdAt desc) {
    _id, title, slug, image, medium, category, price, sold, available, dimensions, year
  }`
  try {
    return await sanityClient.fetch(query, { medium })
  } catch (error) {
    console.error('Error fetching artworks by medium:', error)
    return []
  }
}

// Fetch artworks by subject/category
export async function getArtworksByCategory(category: string) {
  const query = `*[_type == "artwork" && category == $category] | order(order asc, _createdAt desc) {
    _id, title, slug, image, medium, category, price, sold, available, dimensions, year
  }`
  try {
    return await sanityClient.fetch(query, { category })
  } catch (error) {
    console.error('Error fetching artworks by category:', error)
    return []
  }
}

// Fetch related works (same category, excluding current)
export async function getRelatedArtworks(category: string, excludeId: string, limit = 3) {
  const query = `*[_type == "artwork" && category == $category && _id != $excludeId] | order(order asc) [0...$limit] {
    _id, title, slug, image, medium, price, sold
  }`
  try {
    return await sanityClient.fetch(query, { category, excludeId, limit })
  } catch (error) {
    console.error('Error fetching related artworks:', error)
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
