import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import fs from 'fs'
import path from 'path'
import { createReadStream } from 'fs'

const client = createClient({
  projectId: 'oqoqh3p3',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_TOKEN,
})

const FOLDER = '/Users/kevinwhite/Downloads/Art with a Purpose'
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.JPG', '.JPEG', '.PNG']

function getAllImages(dir) {
  let results = []
  const items = fs.readdirSync(dir, { withFileTypes: true })
  for (const item of items) {
    const fullPath = path.join(dir, item.name)
    if (item.isDirectory()) {
      results = results.concat(getAllImages(fullPath))
    } else if (item.name.endsWith('.HEIC.jpg')) {
      results.push(fullPath)
    }
  }
  return results
}

function titleFromFilename(filename) {
  return path.basename(filename, path.extname(filename))
    .replace(/[-_]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

async function uploadImage(filePath) {
  const stream = createReadStream(filePath)
  const asset = await client.assets.upload('image', stream, {
    filename: path.basename(filePath),
  })
  return asset
}

async function run() {
  const images = getAllImages(FOLDER)
  console.log(`Found ${images.length} images. Starting upload...`)

  let success = 0
  let failed = 0

  for (let i = 0; i < images.length; i++) {
    const filePath = images[i]
    const title = titleFromFilename(filePath)
    console.log(`[${i + 1}/${images.length}] Uploading: ${title}`)

    try {
      const asset = await uploadImage(filePath)
      await client.create({
        _type: 'artwork',
        title: title,
        image: {
          _type: 'image',
          asset: { _type: 'reference', _ref: asset._id },
        },
        featured: false,
        available: false,
      })
      console.log(`  ✓ Done: ${title}`)
      success++
    } catch (err) {
      console.error(`  ✗ Failed: ${title} — ${err.message}`)
      failed++
    }
  }

  console.log(`\nComplete. ${success} uploaded, ${failed} failed.`)
}

run()
