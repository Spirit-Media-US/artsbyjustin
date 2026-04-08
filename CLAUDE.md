# Arts by Justin

> **CLAUDE.md belongs in version control — NEVER add it to .gitignore. This file is the shared source of truth for all developers and all Claude Code sessions.**

This site: Arts by Justin | Repo: github.com/Spirit-Media-US/artsbyjustin | Domain: artsbyjustin.com | Sanity ID: oqoqh3p3 | R2 bucket: n/a (planned for artwork images)

## Dev Commands

- `npm run dev` — local preview at localhost:4322 (artsbyjustin port)
- `npm run build` — production build to dist/

## Mandatory — Before Starting Work
Always start Claude sessions from inside this directory:
```
cd ~/Sites/artsbyjustin && claude
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

## Status — as of 2026-04-08

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
- **Custom domain** — artsbyjustin.com not connected in Netlify yet (waiting on Justin's review before launch)
- **Cloudflare proxy** — pending domain connection

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
