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

## Status — as of 2026-06-05

### On dev, awaiting Kevin's merge to main (deploy requested)
- **Hero video** — YouTube Short `mBxVxlrSfa4` muted loop replaces the painting image entirely; deferred injection (interaction/8s) with CSS gradient poster; fit/contain mode (Justin: cover looked stretched); iframe sized via inline styles (Astro-scoped CSS can't reach JS-injected elements)
- **Gallery strip** — 3 columns / 3 tiles: the America 250 mural photos (uploaded to Sanity as artwork docs)
- **Home story section** — new `siteSettings.homeAboutImage` field (magazine-spread photo); childhood photo now exclusive to /about
- **SEO hardening (2026-06-05):**
  - og:image was HTTP 400 sitewide → real 1200×630 in Sanity (`siteSettings.ogImage`) + per-artwork OG crops
  - BreadcrumbList JSON-LD on all non-home pages (generated in Layout from URL path)
  - Page-type JSON-LD: ContactPage / Service / WebPage on contact, commissions, press
  - Person `sameAs`: Etsy + Fine Art America + ARTMO (IG/FB/TikTok URLs pending from Justin)
  - www → apex 301 redirect rule on the CF zone (was serving 200 = duplicate content)
  - Malformed DMARC (`p=none;p=reject;p=quarantine`) normalized to `v=DMARC1; p=none;` — raise after DKIM
  - IndexNow key file `public/1e361ccb...txt` + `scripts/indexnow-ping.sh` — **run after merge to main**

### Still Pending
- **GSC + Bing Webmaster** — verify property under admin@spiritmedia.us, submit `sitemap-index.xml` (manual browser task, Bitwarden creds); then run `scripts/indexnow-ping.sh` post-merge
- **DKIM** — Justin generates in his Google Workspace Admin (apps → Gmail → authenticate email), we add the TXT to the CF zone; then raise DMARC to `p=quarantine`
- **Justin's Sanity Studio tasks** — fill `medium` fields, update categories, set `heroFeature` flags, upload profilePhoto in siteSettings, set IG/FB/TikTok URLs (feeds Person sameAs)
- **Sanity Studio redeploy** — so Justin sees the new `homeAboutImage` field in the Studio UI

## Previous status — 2026-04-19

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
- **🚀 LIVE on artsbyjustin.com (2026-06-04)** — domain cut over from GoDaddy DNS/WP Engine to Cloudflare. Zone `27d3ffbd680fcb0735d51b7e10a3df09` on the SMP CF account; NS = alexandra/bart.ns.cloudflare.com (changed in Justin's personal GoDaddy via delegate access — SMP GoDaddy API key has NO access to this domain). apex+www → Pages project `artsbyjustin` (main). Replicated to CF: Google MX ×5, SPF, 4 google-site-verification TXT, DMARC, `crm`→GHL funnel (DNS-only), `email.replies`→Mailgun (DNS-only). SMP zone settings + bot management applied per cf-zone-settings.md
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
- **DKIM check** — pre-cutover, `google._domainkey.artsbyjustin.com` was empty; confirm with Justin whether his Google Workspace DKIM uses a custom selector and add it to the CF zone. Also: live DMARC was replicated as-is but is malformed (`v=DMARC1;p=none;p=reject;p=quarantine`) — clean up with Justin's OK

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
