#!/usr/bin/env node
/**
 * Backfill slugs for all artworks in Sanity that don't have one.
 *
 * Usage:
 *   node scripts/backfill-slugs.mjs          # dry run
 *   node scripts/backfill-slugs.mjs --apply  # actually write to Sanity
 */
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'oqoqh3p3',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
})

const apply = process.argv.includes('--apply')

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 96)
}

async function ensureUnique(base, existing) {
  let slug = base
  let i = 2
  while (existing.has(slug)) {
    slug = `${base}-${i}`
    i++
  }
  existing.add(slug)
  return slug
}

async function main() {
  // Fetch all artworks
  const artworks = await client.fetch(
    `*[_type == "artwork"]{ _id, title, slug }`
  )

  // Track existing slugs for uniqueness
  const existingSlugs = new Set(
    artworks.filter(a => a.slug?.current).map(a => a.slug.current)
  )

  const needSlug = artworks.filter(a => !a.slug?.current)
  console.log(`Total artworks: ${artworks.length}`)
  console.log(`Already have slugs: ${artworks.length - needSlug.length}`)
  console.log(`Need slugs: ${needSlug.length}`)

  if (needSlug.length === 0) {
    console.log('All artworks already have slugs. Nothing to do.')
    return
  }

  const patches = []
  for (const art of needSlug) {
    if (!art.title) {
      console.log(`  SKIP (no title): ${art._id}`)
      continue
    }
    const base = slugify(art.title)
    const slug = await ensureUnique(base, existingSlugs)
    patches.push({ id: art._id, title: art.title, slug })
    console.log(`  ${art.title} → ${slug}`)
  }

  if (!apply) {
    console.log(`\nDry run complete. ${patches.length} artworks would be updated.`)
    console.log('Run with --apply to write changes.')
    return
  }

  console.log(`\nApplying ${patches.length} slug patches...`)
  let success = 0
  for (const p of patches) {
    try {
      await client.patch(p.id).set({ slug: { _type: 'slug', current: p.slug } }).commit()
      success++
    } catch (err) {
      console.error(`  FAILED: ${p.title} (${p.id}): ${err.message}`)
    }
  }
  console.log(`Done. ${success}/${patches.length} artworks updated.`)
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
