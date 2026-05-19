# PEPPUDEX · GSC LAUNCH CHECKLIST (Phase G)

Operator-run. Pre-launch checklist for Google Search Console + Bing Webmaster Tools + Reddit warm-up. Target completion: before 2026-06-01 public launch.

---

## T-MINUS-7 DAYS (BEFORE LAUNCH)

### GSC verification + sitemap submission

- [ ] DNS TXT verification for `https://peppudex.com` via Porkbun.
- [ ] DNS TXT verification for `https://www.peppudex.com` (separate URL prefix property).
- [ ] Preferred domain set to non-www.
- [ ] Submit all 6 sitemaps:
  - `https://peppudex.com/sitemap.xml` (top-level index)
  - Sub-sitemaps (when segmented per A7+):
    - `/sitemap-compounds.xml`
    - `/sitemap-categories.xml`
    - `/sitemap-comparisons.xml`
    - `/sitemap-studies.xml`
    - `/sitemap-guides.xml`
- [ ] URL Inspection → request indexing for these 25 routes:
  - Homepage
  - `/calculator`
  - `/tools/half-life-chart`
  - All 17 compound pages
  - `/reports/peptide-research-publication-trends-2015-2026`
  - `/reports/regulatory-status-matrix`
  - `/about`, `/about/research-process`, `/editorial-policy`

### Bing Webmaster Tools

- [ ] Add site → import from GSC (faster than separate verify).
- [ ] Submit sitemap.

### Schema validation

- [ ] https://validator.schema.org/ → paste each segmented sitemap URL + 3 representative pages.
- [ ] https://search.google.com/test/rich-results → verify rich results for FAQ + DietarySupplement + MedicalWebPage.
- [ ] No errors before launch.

---

## T-MINUS-3 DAYS (PRE-LAUNCH)

### Wikidata Q-item creation

Per SEO-REGISTRATION-CHECKLIST.md. Wikidata Q-IDs added to Organization schema sameAs once live.

### Backlink seed

- [ ] Add PEPPUDEX entry to relevant Wikipedia external-links sections where the compound's article has a "See Also" or "External Links" section AND the link addition complies with WP:EL guidelines (the link must add information not in the article and be a primary reference, not a commercial directory).
- [ ] Note: Wikipedia links are nofollow. The value is the editorial-quality signal + referral traffic from researchers.

### Internal linkinator audit

```bash
cd peppudex-site
npm run build
npx vercel@latest deploy --prod --yes --token $VERCEL_TOKEN --scope peppuofficials-projects
npx linkinator https://peppudex.com --recurse --skip "mailto:|tel:"
```

Confirm 0 404s before launch.

---

## LAUNCH DAY (2026-06-01)

### Reddit distribution

ZERO paid spend (peptide ads banned on Meta/Google/TikTok). Reddit is the warm-up channel.

- [ ] r/Peptides · post `/calculator` with "Made a reconstitution calculator with the math + a shareable URL"
- [ ] r/PeptideGuide · post the half-life chart at `/tools/half-life-chart`
- [ ] r/biohackers · post the half-life chart + research-trends report
- [ ] r/Nootropics · post relevant nootropic compound cards (selank, semax)
- [ ] r/tressless · post GHK-Cu peppudex card
- [ ] r/StackAdvice (if exists) · post the stacks page

DO NOT auto-post. Operator-run with the operator's personal account. Each post should include a short context paragraph + a link, NOT a wall of marketing text.

### Telegram + Discord

- [ ] Pin peppudex.com in PEPPU LABS Telegram research community.
- [ ] Pin peppudex.com in pepputree Discord.
- [ ] Update peppu-link bio handle pages with peppudex.com.

---

## T-PLUS-7 DAYS POST-LAUNCH

### Quality check

- [ ] GSC → Coverage → no critical errors.
- [ ] GSC → Sitemaps → all 6 successfully crawled.
- [ ] GSC → URL Inspection → randomly check 5 compound pages, verify "URL is on Google".
- [ ] Lighthouse → run on 3 representative pages, confirm green scores.

### Track impression growth

- [ ] Baseline impressions in GSC Performance.
- [ ] Identify any compound pages NOT yet indexed; manually request indexing.

---

## T-PLUS-30 DAYS

### First publication-trends regeneration

- [ ] Build `scripts/refresh-research-trends.mjs` (live PubMed-API fetch).
- [ ] Regenerate `src/data/research-trends.json`.
- [ ] Update `lastRegenerated` date.
- [ ] Redeploy.
- [ ] GSC re-submit affected sitemap.

### Authority pages traffic check

- [ ] Performance → Pages → compare `/reports/...` impressions vs compound pages.
- [ ] Identify which authority page is pulling backlinks (Ahrefs / Linktrack).
- [ ] Decide if a second report should be commissioned.

---

## NEVER

- Never paid-promote any compound page. Meta/Google/TikTok ban peptide ads. ANY paid-spend attempt will get accounts banned.
- Never auto-post to Reddit. Reddit moderators detect bot patterns. Operator's personal account only.
- Never claim FDA approval where it doesn't exist. The DietarySupplement schema correctly classifies as supplement, not drug. Don't override that classification anywhere.
- Never include the operator's real name on any social-distribution post (per [[feedback_no_real_name_to_customers]]).
