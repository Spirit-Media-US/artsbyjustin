#!/usr/bin/env node
/**
 * AI-Powered Artwork Labeling Script for Arts by Justin
 *
 * Pulls all artworks from Sanity, downloads images, uses Claude CLI vision
 * to classify and generate metadata in batches, then optionally patches Sanity.
 *
 * Usage:
 *   node scripts/label-artworks.mjs                  # Analyze all (saves to results JSON)
 *   node scripts/label-artworks.mjs --apply           # Apply results to Sanity
 *   node scripts/label-artworks.mjs --sample 10       # Only process first 10 (for testing)
 *   node scripts/label-artworks.mjs --summary         # Print summary of existing results
 */

import { execSync } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const SANITY_PROJECT_ID = 'oqoqh3p3'
const SANITY_DATASET = 'production'
const SANITY_API_VERSION = '2024-01-01'
const IMAGE_DIR = '/tmp/abj-artwork-images'
const RESULTS_FILE = '/srv/sites/artsbyjustin/scripts/labeling-results.json'
const BATCH_SIZE = 5 // images per Claude CLI call

function getSanityToken() {
  try {
    return execSync('bash -c "source /home/deploy/.secrets && echo $SANITY_API_TOKEN"', {
      encoding: 'utf-8',
    }).trim()
  } catch {
    console.error('ERROR: Could not read SANITY_API_TOKEN')
    process.exit(1)
  }
}

async function sanityQuery(query) {
  const url = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}?query=${encodeURIComponent(query)}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Sanity query failed: ${res.status}`)
  return (await res.json()).result
}

async function sanityPatch(docId, patchData, token) {
  const url = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/mutate/${SANITY_DATASET}`
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ mutations: [{ patch: { id: docId, set: patchData } }] }),
  })
  if (!res.ok) throw new Error(`Patch failed: ${res.status} ${await res.text()}`)
  return res.json()
}

async function downloadImage(url, filepath) {
  if (existsSync(filepath)) return
  const res = await fetch(`${url}?w=800`)
  if (!res.ok) throw new Error(`Download failed: ${url}`)
  writeFileSync(filepath, Buffer.from(await res.arrayBuffer()))
}

function analyzeBatch(batch) {
  const imageList = batch
    .map((a, i) => `${i + 1}. ${a.imgPath} (title: "${a.title}")`)
    .join('\n')

  const prompt = `You are classifying artwork images for Arts by Justin, a contemporary artist's website.

Read each of these ${batch.length} images and analyze them:

${imageList}

For EACH image, determine:

IMAGE TYPE — Look at the FULL image, not just the art within it:
- "product": Shows ONLY the artwork — on a wall, on a table, on an easel. NO people visible.
- "social_proof": A person or people are visible — holding art, posing with art, at an art show. Even if the art is the focus, if ANY person is visible it is social_proof.
- "installation": Artwork installed in a commercial space (salon, spa, office, lobby) as part of interior design. Typically large-scale. No people.
- "press": Newspaper clipping, magazine article, screenshot of media coverage.
- "portrait": Headshot or posed photo of the artist alone, NOT holding artwork.
- "other": Letters, documents, non-art images.

MEDIUM — What the artwork itself is made of (ignore the photo context):
- "Resin Art": Glossy epoxy surface, ocean waves, marble veining, poured resin (often on wood)
- "Canvas & Paint": Acrylic/oil painting on canvas, visible brushwork or paint texture
- "Fine Art Print": Clean printed reproduction, typically in a frame or mat
- "String Art": Nails hammered into board with thread/string forming the image
- "Mural & Installation": Large-scale wall covering, sculpted architectural feature, stone/concrete work
- "Functional Art": Cutting boards, serving trays, cake plates, coasters — art you can use
- "Mixed Media": Combination of materials or hard to classify single medium

SUBJECT — The artwork's theme (what it depicts, not how it's made):
- "Sports & Motion": Athletes, sports equipment, dance, drums, musical performance
- "Nature & Ocean": Waves, beaches, landscapes, flora, trees, sky
- "Abstract & Expressive": Non-representational, color fields, splashes, geometric patterns
- "Portraits & Figurative": Human figures, faces, body art, silhouettes with human form
- "Faith & Inspiration": Spiritual imagery, angels, phoenix, crosses, uplifting symbolism
- "Animals & Wildlife": Animals as the primary subject

PRICE — Estimate based on apparent size and medium:
- Cutting boards/coasters: $50
- Cake plates: $125
- 11x14 resin/print: $150
- 12x18 print/resin: $250
- 18x24 canvas: $400
- 24x36 canvas: $600
- Murals/installations: $2000-$5000
- Large fine art originals: $5000-$10000+
- Social proof/press/portrait/other: price = 0

Return ONLY a JSON array with one object per image. No markdown fences, no explanation:

[{"idx":1,"imageType":"...","medium":"...","category":"...","subjectTags":["tag1","tag2"],"description":"2-3 sentence gallery description using 'contemporary art' naturally. Describe the art itself even if people are in the photo.","suggestedPrice":0,"qualityScore":1-10,"heroCandidate":true/false}]

heroCandidate = true only if qualityScore >= 8 AND imageType is "product" or "installation".`

  try {
    const result = execSync(
      `claude -p --dangerously-skip-permissions --model haiku ${JSON.stringify(prompt)}`,
      { encoding: 'utf-8', timeout: 120000, maxBuffer: 2 * 1024 * 1024 },
    )

    let jsonStr = result.trim()
    const match = jsonStr.match(/\[[\s\S]*\]/)
    if (match) jsonStr = match[0]
    return JSON.parse(jsonStr)
  } catch (err) {
    console.error(`  Batch analysis failed: ${err.message?.slice(0, 200)}`)
    return null
  }
}

function printSummary(results) {
  const analyzed = results.filter((r) => r.analysis)
  const types = {}
  const mediums = {}
  const categories = {}
  let totalPrice = 0
  let priced = 0

  for (const r of analyzed) {
    const a = r.analysis
    types[a.imageType] = (types[a.imageType] || 0) + 1
    mediums[a.medium] = (mediums[a.medium] || 0) + 1
    categories[a.category] = (categories[a.category] || 0) + 1
    if (a.suggestedPrice > 0) {
      totalPrice += a.suggestedPrice
      priced++
    }
  }

  const heroes = analyzed.filter((r) => r.analysis.heroCandidate)

  console.log('\n========================================')
  console.log('  LABELING RESULTS SUMMARY')
  console.log('========================================')
  console.log(`\nTotal analyzed: ${analyzed.length}`)
  console.log(`\nBy Image Type:`)
  for (const [k, v] of Object.entries(types).sort((a, b) => b[1] - a[1]))
    console.log(`  ${k.padEnd(20)} ${v}`)
  console.log(`\nBy Medium:`)
  for (const [k, v] of Object.entries(mediums).sort((a, b) => b[1] - a[1]))
    console.log(`  ${k.padEnd(25)} ${v}`)
  console.log(`\nBy Subject:`)
  for (const [k, v] of Object.entries(categories).sort((a, b) => b[1] - a[1]))
    console.log(`  ${k.padEnd(25)} ${v}`)
  console.log(`\nPricing:`)
  console.log(`  Priced items: ${priced}`)
  console.log(`  Average price: $${priced ? Math.round(totalPrice / priced) : 0}`)
  console.log(`  Total catalog value: $${totalPrice.toLocaleString()}`)
  console.log(`\nHero candidates: ${heroes.length}`)
  if (heroes.length > 0) {
    console.log('  Top picks:')
    for (const h of heroes.slice(0, 10)) {
      console.log(`    - ${h.title} (${h.analysis.medium}, $${h.analysis.suggestedPrice}, score: ${h.analysis.qualityScore})`)
    }
  }
  console.log(`\nResults file: ${RESULTS_FILE}`)
}

async function main() {
  const args = process.argv.slice(2)
  const applyMode = args.includes('--apply')
  const summaryMode = args.includes('--summary')
  const sampleSize = args.includes('--sample') ? parseInt(args[args.indexOf('--sample') + 1]) : 0

  // --- Summary mode ---
  if (summaryMode) {
    if (!existsSync(RESULTS_FILE)) {
      console.error('No results file found.')
      process.exit(1)
    }
    printSummary(JSON.parse(readFileSync(RESULTS_FILE, 'utf-8')))
    return
  }

  // --- Apply mode ---
  if (applyMode) {
    if (!existsSync(RESULTS_FILE)) {
      console.error('No results file found. Run analysis first.')
      process.exit(1)
    }
    const token = getSanityToken()
    const results = JSON.parse(readFileSync(RESULTS_FILE, 'utf-8'))
    const toApply = results.filter((r) => r.analysis && !r.applied)

    console.log(`\nApplying ${toApply.length} results to Sanity...\n`)

    let applied = 0
    for (let i = 0; i < toApply.length; i++) {
      const r = toApply[i]
      const a = r.analysis
      const patch = {
        imageType: a.imageType,
        medium: a.medium,
        category: a.category,
        subjectTags: a.subjectTags || [],
        description: a.description,
        designTime: '2\u20134 weeks',
      }

      if (a.suggestedPrice > 0 && ['product', 'installation'].includes(a.imageType)) {
        patch.price = a.suggestedPrice
        patch.available = true
      }

      if (a.heroCandidate) {
        patch.heroFeature = true
        patch.featured = true
      }

      try {
        await sanityPatch(r._id, patch, token)
        r.applied = true
        applied++
        console.log(`  [${i + 1}/${toApply.length}] ${a.imageType.padEnd(14)} ${r.title}`)
      } catch (err) {
        console.error(`  [${i + 1}/${toApply.length}] FAILED: ${r.title} — ${err.message?.slice(0, 100)}`)
      }

      if ((i + 1) % 20 === 0) writeFileSync(RESULTS_FILE, JSON.stringify(results, null, 2))
    }

    writeFileSync(RESULTS_FILE, JSON.stringify(results, null, 2))
    console.log(`\nDone. Applied ${applied}/${toApply.length} patches.`)
    return
  }

  // --- Analysis mode ---
  console.log('Fetching artworks from Sanity...')
  const artworks = await sanityQuery(
    '*[_type == "artwork"] | order(_createdAt asc) { _id, title, category, medium, description, "imageUrl": image.asset->url }',
  )
  console.log(`Found ${artworks.length} artworks.`)

  // Load existing results for resume support
  let results = []
  if (existsSync(RESULTS_FILE)) {
    results = JSON.parse(readFileSync(RESULTS_FILE, 'utf-8'))
    console.log(`Loaded ${results.filter((r) => r.analysis).length} existing results.`)
  }
  const processedIds = new Set(results.filter((r) => r.analysis).map((r) => r._id))

  mkdirSync(IMAGE_DIR, { recursive: true })

  let toProcess = artworks.filter((a) => !processedIds.has(a._id))
  if (sampleSize > 0) toProcess = toProcess.slice(0, sampleSize)

  console.log(`\nProcessing ${toProcess.length} artworks in batches of ${BATCH_SIZE}...\n`)
  const startTime = Date.now()

  for (let i = 0; i < toProcess.length; i += BATCH_SIZE) {
    const batchItems = toProcess.slice(i, i + BATCH_SIZE)
    const batchNum = Math.floor(i / BATCH_SIZE) + 1
    const totalBatches = Math.ceil(toProcess.length / BATCH_SIZE)

    console.log(`Batch ${batchNum}/${totalBatches}:`)

    // Download images
    const batchWithPaths = []
    for (const art of batchItems) {
      const ext = art.imageUrl?.includes('.png') ? 'png' : 'jpg'
      const imgPath = join(IMAGE_DIR, `${art._id}.${ext}`)
      try {
        await downloadImage(art.imageUrl, imgPath)
        batchWithPaths.push({ ...art, imgPath })
      } catch (err) {
        console.error(`  Download failed: ${art.title}`)
      }
    }

    if (batchWithPaths.length === 0) continue

    // Analyze batch
    const batchResults = analyzeBatch(batchWithPaths)

    if (batchResults && Array.isArray(batchResults)) {
      for (let j = 0; j < batchResults.length && j < batchWithPaths.length; j++) {
        const art = batchWithPaths[j]
        const analysis = batchResults[j]
        results.push({ _id: art._id, title: art.title, imageUrl: art.imageUrl, analysis, applied: false })
        console.log(`  ${analysis.imageType.padEnd(14)} ${analysis.medium.padEnd(22)} $${String(analysis.suggestedPrice).padEnd(6)} ${art.title}`)
      }
    } else {
      // Batch failed — try individually as fallback
      console.log('  Batch failed, trying individually...')
      for (const art of batchWithPaths) {
        const single = analyzeBatch([art])
        if (single && single[0]) {
          results.push({ _id: art._id, title: art.title, imageUrl: art.imageUrl, analysis: single[0], applied: false })
          console.log(`  ${single[0].imageType.padEnd(14)} ${art.title}`)
        } else {
          results.push({ _id: art._id, title: art.title, imageUrl: art.imageUrl, analysis: null, applied: false })
          console.error(`  FAILED: ${art.title}`)
        }
      }
    }

    // Save progress
    writeFileSync(RESULTS_FILE, JSON.stringify(results, null, 2))

    const elapsed = ((Date.now() - startTime) / 1000).toFixed(0)
    const processed = results.filter((r) => r.analysis).length
    const rate = (processed / (elapsed / 60)).toFixed(1)
    console.log(`  [${processed}/${artworks.length} done, ${elapsed}s elapsed, ${rate}/min]\n`)
  }

  printSummary(results)
}

main().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})
