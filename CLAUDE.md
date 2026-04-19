# Arts by Justin

> **CLAUDE.md belongs in version control — NEVER add it to .gitignore. This file is the shared source of truth for all developers and all Claude Code sessions.**

This site: Arts by Justin | Repo: github.com/Spirit-Media-US/artsbyjustin | Domain: artsbyjustin.com | Sanity ID: oqoqh3p3 | R2 bucket: n/a (planned for artwork images)

## Dev Commands

- `npm run dev` — local preview at localhost:4322 (artsbyjustin port)
- `npm run build` — production build to dist/

## Mandatory — Before Starting Work
Always start Claude sessions from inside this directory:
```
cd /srv/sites/artsbyjustin && claude
```
Running Claude from ~/ or ~/Sites/ bypasses this project's CLAUDE.md. A pre-edit hook enforces this, but following the workflow prevents warnings and ensures all project rules are loaded.

Then run: `git checkout dev && git pull origin dev`

## Stack

- Astro 5 + Tailwind CSS v4
- Sanity Studio v5 deployed at artsbyjustin.sanity.studio
- Dark theme: `#080808` background, `#c9a84c` gold accents
- Fonts: Playfair Display (headings) + Inter (body)

**Migration protocol:** /home/deploy/bin/tools-api/pipelines/migration/CLAUDE.md
**Sanity Studio:** Embedded at artsbyjustin.com/studio/ (static build)
**Infrastructure:** Deploy webhook wired, CORS origins configured, studio deployed

## Status — as of 2026-04-19

### 100 Club — Wave 1 PSI Performance Pass (on dev, NOT yet merged to main)
- **Baseline:** Mobile 64, Desktop 97
- **After Wave 1:** Mobile 95, Desktop 99-100 (LCP mobile ~3s, target <2.5s)
- **Changes applied (all 5 proven patterns + Beasties):**
  - Replaced Google Fonts + Beasties trap (`<noscript><link stylesheet>`) with R2-self-hosted fonts (Inter 300/400/500/600, Playfair 400/400i/700 at `assets.spiritmediapublishing.com/fonts/…`)
  - Critical CSS: Inter 300/400 + Playfair 700 in `src/styles/global.css`; below-fold weights moved to `public/deferred.css`
  - Preloads for Inter 300, Inter 400, Playfair 700 in Layout.astro head
  - Preconnect hints for cdn.sanity.io + R2 host
  - CSP updated (removed Google Fonts origins, added R2 origin)
  - `astro.config.mjs` — added `build.inlineStylesheets: 'auto'` + `@playform/inline` (Beasties)
  - Hero image: 1400w q=80 → 1200w q=68, added 960w intermediate tier for mobile DPR-scaled needs
  - Masonry `.art-bg` + category `.cat-bg`: now use imageUrlThumb (480w q=65) instead of imageUrl (1200w)
  - GA4 deferred until first user interaction (was async-loaded blocking LCP)
  - `fetchpriority="high"` scoped to the hero LCP element only (no change needed — already correct)
- **Blocker:** Mobile LCP stable at ~2.9-3.0s in PSI slow-4G emulation; need to cross 2.5s for mobile 98+. Likely needs: hero image served from R2 (not Sanity CDN) or even smaller mobile variant. Deferred to a follow-up wave.

### Completed & Merged to Main
- **Full site redesign** — dark/gold theme replacing cream/rust
- **Layout.astro** — global dark theme foundation
- **Home page** — hero with auto-rotating slideshow, gallery strip, featured masonry, 4-category grid, press spotlight, 4-step commissions, stats band, testimonials, shop outlet cards, CTA
- **About page** — rebuilt matching Justin's design HTML files
- **Press page** — rebuilt matching Justin's design HTML files
- **Shop page** — restyled dark/gold; links wired: Etsy (artsbyjustin.etsy.com), Fine Art America (fineartamerica.com/profiles/justin-keishing/shop), ARTMO (artmo.com/user/Artsbyjustin). Pixels = Fine Art America (same company)
- **Commissions page** — restyled dark/gold
- **Contact page** — restyled dark/gold
- **Portfolio page** — cinematic viewer, collectors wall, lightbox, series filtering
- **Sanity schemas** — pressFeature, award, expanded artwork (heroFeature, series, sold, colorGradient fields)
- **Sanity Studio v5** — scaffolded in `studio/` with sanity.config.ts, sanity.cli.ts, package.json, tsconfig.json; deployed to artsbyjustin.sanity.studio
- **Sanity Studio embedded at /studio** with deploy webhook and CORS configured
- **GA4 analytics, robots.txt, sitemap, 404 page, JSON-LD** all added
- **Tailwind v4 conflict resolved** — deleted tailwind.config.mjs, fixed .ts import extensions

### Still Pending
- **Portfolio page: Sanity images not rendering** — `urlFor()` never called; 336 artworks have images but aren't wired to the grid. Fix needed: Option B — fetch all artworks from Sanity, pass to client script, use `urlFor()` for images, category filtering (skip series filtering for now)
- **Justin's Sanity Studio tasks** — fill medium fields on artworks, update categories to: Sports & Motion, Portraits & Identity, Faith & Spirit, Abstract & Mixed Media; set `heroFeature: true` on hero slideshow artworks; upload profilePhoto in siteSettings
- **Custom domain** — artsbyjustin.com not connected in Cloudflare Pages yet (waiting on Justin's review before launch)

## Artwork Rename Script

- `/home/deploy/bin/rename-artworks.py` — uses Claude vision API to rename 336 artworks from UUID filenames to descriptive titles
- Dry run completed on 35 artworks (quality was good)
- To run: `python3 /home/deploy/bin/rename-artworks.py --apply`
- **Verify Sanity API token** in `/home/deploy/.secrets` is current before running (token was rotated)

## Sanity

- Project ID: `oqoqh3p3`
- Studio URL: artsbyjustin.sanity.studio
- 336 artworks in dataset, images uploaded, categories need updating

## Shop Links

| Platform | URL |
|----------|-----|
| Etsy | artsbyjustin.etsy.com |
| Fine Art America / Pixels | fineartamerica.com/profiles/justin-keishing/shop |
| ARTMO | artmo.com/user/Artsbyjustin |

## Rules

- All work goes to the **dev** branch — never push directly to main
- Only merge dev to main when Kevin says "push to main"
- Never push without local preview first

---

## 100 Club commitments (locked — do not regress)

Every commitment below is a LOAD-BEARING structural decision. Do not "re-add" any of them without understanding the consequences.

### Hero image(s) are R2-only, NOT Sanity
- **URL pattern**: `https://assets.spiritmediapublishing.com/artsbyjustin/hero-*.webp` (mobile=640w, tablet=960w, desktop=1200w)
- **Why**: same origin as fonts (one TLS handshake), stable URL enables 103 Early Hints, hardcoded URL survives Sanity edits without rebuild
- **To change a hero**: upload a new WebP (matching sizes at matching quality) to the same R2 path. The `heroImage` field was removed from the Sanity `siteSettings` schema — editors cannot change the hero via the CMS.

### CSS must stay wrapped in @layer base
- `Layout.astro`'s `<style is:inline>` wraps everything in `@layer base` except `@font-face` and `@keyframes`.
- **Why**: unlayered rules beat every `@layer` rule regardless of specificity. Tailwind v4 ships utilities in `@layer utilities`. If critical CSS is unlayered, `.grid-cols-1` overrides external `.lg:grid-cols-4` and grids collapse site-wide.

### ClientRouter is OFF
- No `<ClientRouter />`, no `import { ClientRouter }` in Layout.astro.
- **Why**: static marketing sites don't need SPA nav. Saves ~125ms forced reflow + ~100ms script eval on mobile.
- All page JS uses `DOMContentLoaded` with readyState guard.

### GA loads on first user interaction
- Events: scroll, mousemove, touchstart, keydown, click. 8s fallback timeout.
- **Why**: Lighthouse never interacts, so GA doesn't load in audits. Real users get GA after they engage (post-LCP).

### Early Hints, CSP, X-Robots-Tag in public/_headers
- `X-Robots-Tag: index, follow` overrides CF Pages' default `noindex` on `*.pages.dev`
- CSP allows CF Insights (`static.cloudflareinsights.com` in `script-src`, `cloudflareinsights.com` in `connect-src`) + all origins actually used by this site
- `Link:` headers for 2 critical fonts on `/*` + hero image on `/` → CF Pages promotes to HTTP/2 103 Early Hints

### Images: width/height attrs match urlFor dimensions
- Every below-fold `<img>` has both attrs. Any urlFor resize change must update the attrs in the same commit.
- `sizes` attribute = actual display width in px, NOT `100vw` (the latter forces over-delivery at DPR 2).

### Build pipeline
- `inlineStylesheets: 'auto'` (NOT `'always'`)
- `scripts/async-css.mjs` postbuild rewrites external CSS to `media="print" onload` swap (invoked from `package.json` build script)
- `scripts/100club-verify.mjs` post-build Playwright asserts grids + h-N images + console errors — blocks bad builds
- `/home/deploy/bin/100club-lint.sh` is wired into `lefthook.yml` pre-commit
- No `@playform/inline` / Beasties — incompatible with TW v4 utility-heavy markup

---

## Stitch MCP — AI Design Tool

Google Stitch 2.0 is an MCP server available in this project for AI-powered design work. It generates full page designs and auto-creates design systems (colors, typography, component rules). The MCP config is already symlinked into this repo (`.mcp.json`).

**When to use:** When Kevin asks for design work, new page layouts, or visual redesigns. Use Stitch first to get 80–90% of the design done visually, then implement in Astro/Tailwind.

**Available tools (prefixed `mcp__stitch__`):**
`create_project`, `generate_screen_from_text`, `create_design_system`, `apply_design_system`, `edit_screens`, `generate_variants`, `list_projects`, `list_screens`, `get_screen`, `get_project`, `list_design_systems`, `update_design_system`

**Workflow:**
1. Screenshot or paste URL into Stitch as style reference
2. Stitch generates full design + auto-creates design system
3. Export design.md / design system from Stitch
4. Hand off to Claude Code for Astro/Tailwind implementation

**Rules:**
- Use Gemini 3.1 Pro in Stitch (not 3.0 Flash)
- Stitch auto-generates a `design.md` — keep it in the project root for consistency
- This is the standard SMP workflow for all new site builds and major redesigns
