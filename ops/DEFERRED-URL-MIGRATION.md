# DEFERRED · Phase A5 + A6 URL Restructure

Plan called for moving `/[slug]/` → `/peptides/[slug]/` + adding 51 Tier-3 subtopic pages.

**Status: DEFERRED to its own dedicated session.** Reason: cross-site blast radius. Multiple sites carry hardcoded `peppudex.com/<slug>` links:

- `peppu-babe-site/src/data/posts.ts` — 5 long-form posts link to current `/[slug]/` URLs
- `peppu-link-site/src/app/page.tsx` — peppudex link tile
- `Peppu/src/lib/products.ts` — WIKI_SLUG_MAP entries

Plus all external backlinks (Reddit posts, future GSC-submitted URLs, Wikidata sameAs entries) reference the current shape. Moving without a coordinated cross-site update breaks them silently.

---

## How to execute when ready

1. **Branch the move in peppudex-site only.** Move folder `src/app/[slug]/` → `src/app/peptides/[slug]/`. Build new Tier-3 routes:
   - `src/app/peptides/[slug]/mechanism/page.tsx`
   - `src/app/peptides/[slug]/dosing/page.tsx`
   - `src/app/peptides/[slug]/safety/page.tsx`
2. **Add 301 redirects in `next.config.ts`:**
   ```typescript
   async redirects() {
     return COMPOUNDS.map((c) => ({
       source: `/${c.slug}`,
       destination: `/peptides/${c.slug}`,
       permanent: true,
     }));
   }
   ```
3. **Update sitemap-compounds.xml** to emit `/peptides/<slug>/` URLs + the 51 Tier-3 routes.
4. **Update auto-link helper** (`src/lib/auto-link.tsx`) to emit `/peptides/<slug>` hrefs.
5. **Update [slug]/page.tsx canonical** to `/peptides/<slug>`.
6. **Update all sibling routes that link back** (mechanisms/[slug], conditions/[slug], stacks/[slug], vs/[pair], reviewers/[slug] bio).
7. **Cross-site update batch (one commit, then deploy each):**
   - `peppu-babe-site/src/data/posts.ts` — sed-replace `peppudex.com/<slug>` → `peppudex.com/peptides/<slug>` across all 10 posts. Deploy.
   - `peppu-link-site/src/app/page.tsx` — update the PEPPUDEX tile URL if it points at a specific slug. Deploy.
   - `Peppu/src/lib/products.ts` — update WIKI_SLUG_MAP if any peppudex links exist. Deploy.
8. **Smoke test:**
   ```bash
   curl -I https://peppudex.com/bpc-157            # expect 301 → /peptides/bpc-157
   curl https://peppudex.com/peptides/bpc-157/     # expect 200
   curl https://peppudex.com/peptides/bpc-157/mechanism/  # expect 200
   npx linkinator https://peppudex.com --recurse   # 0 404s
   ```
9. **GSC follow-up:** submit updated sitemaps. The 301s preserve PageRank but request crawl to speed up the swap.

---

## Why deferred

- Each Tier-3 subtopic page is a separate Next route file with its own metadata + schema. 51 routes × ~50 LOC = ~2,500 LOC of new boilerplate.
- The boilerplate is mostly derived from existing enrichment data; it can be generated from a template in one pass when ready.
- The biggest risk is cross-site link drift, not the codebase work itself. Sequence the deploys with the link updates so internal links never 404.

---

## Recommended pickup signal

```
Execute deferred A5/A6 URL restructure from peppudex-site/ops/DEFERRED-URL-MIGRATION.md. Sequence: peppudex-site refactor + 301s first, then peppu-babe-site links, then peppu-link-site, then Peppu/. Smoke-test linkinator after each deploy.
```
