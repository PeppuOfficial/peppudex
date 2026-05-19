# peppudex.com · SEO BASELINE · 2026-05-19 (PHASE P SHIP)

Updated 2026-05-19 after Phase P-1 + ongoing P-2/P-3 deferrals.

---

## Technical SEO

| Item | Status | Notes |
|---|---|---|
| `MedicalWebPage` schema | ✅ | Per Phase A1, on every compound page |
| `DietarySupplement` schema | ✅ | Per Phase A1, with `additionalProperty` entity IDs |
| `BreadcrumbList` schema | ✅ | Home → Peptides → Compound |
| `MedicalStudy` schema | ✅ | One node per enrichment.citations entry |
| `Dataset` schema | ✅ | On both authority reports |
| `DefinedTerm` schema | ✅ | Per legacy A1 |
| `FAQPage` schema | ✅ | Per compound + per report |
| `Person` schema | ✅ | On reviewer pages |
| `Article` schema | ✅ | On reports |
| Entity IDs (CAS, PubChem, MeSH, UNII, KEGG, ChEMBL, Wikidata, DrugBank) | ✅ | Top 5 compounds populated, 15 stubbed null |
| ReviewedByByline component | ✅ | Every compound page |
| 8 trust pages | ✅ | /about, /about/research-process, /editorial-policy, /medical-disclaimer, /privacy-policy, /terms-of-use, /reviewers, /reviewers/[slug] |
| 2 authority reports | ✅ | Publication trends + regulatory matrix |
| 2 SEO tools | ✅ | /calculator (URL serialized) + /tools/half-life-chart |
| Bulbapedia auto-linker | ✅ | `src/lib/auto-link.tsx` first-occurrence-only |
| Sitemap reorganized | ✅ | All hub URLs + trust + reports + tools |
| robots.ts AI-crawler whitelist | ✅ | GPTBot, PerplexityBot, Claude-Web, anthropic-ai, ClaudeBot, Google-Extended, Applebot, Bingbot |
| URL parameter blocks | ✅ | `?sort=`, `?filter=`, `/tag/`, `/author/` |
| Lighthouse CI | ✅ | GitHub Action workflow |
| Phase P-1 peppugirl bidirectional links | ✅ Shipped prior round |

---

## Content

| Surface | Count |
|---|---|
| Compound cards | 27 (with photoreal TCG art, BG-removed transparent PNGs) |
| Mechanism pages | 19 |
| Condition pages | 26 |
| Comparison pages (/vs/) | 7 + index |
| Stack pages | 6 |
| Tools | 2 |
| Reports | 2 |
| Trust pages | 8 |

---

## Cross-domain links (current state)

| From → To | Status |
|---|---|
| peppudex compound → peppugirl diary | ✅ Phase P-1 shipped (3 compounds: ghk-cu, nad-plus, selank) |
| peppudex compound → peppu.studio | ✅ "SOURCE AT PEPPU LABS ▶" on every compound page |
| peppu.studio /products/[slug] → peppudex | ✅ Phase S-1 shipped 2026-05-19 |
| peppugirl pillar pages → peppudex | ✅ Phase G-1 shipped 2026-05-19 (autolinker + relatedCompounds section) |

---

## Deferred (Phase P-2, P-3)

- ⏳ P-2 · regenerate research-trends.json from PubMed API (latest 2026 data)
- ⏳ P-2 · build /reports/peptide-cost-trends-2025-2026/ (3rd authority report)
- ⏳ P-2 · /tools/stack-builder/ (port from storefront bundle math)
- ⏳ P-3 · 51 Tier-3 subtopic pages (17 × 3 · mechanism, dosing, safety per compound)
- ⏳ P-3 blocked on URL restructure: deferred per `ops/DEFERRED-URL-MIGRATION.md`

---

## Pending action items

1. Operator: submit updated sitemap.xml to GSC
2. Operator: URL inspection on /ghk-cu, /bpc-157, /tb-500, /retatrutide, /tirzepatide
3. Operator: monitor 1-week indexing window (May 26-31)

---

## Next snapshot

2026-08-19 (90 days post Phase G/S ship). Compare:
- Indexed compound page count in GSC
- "BPC-157 mechanism" / "GHK-Cu research" / "peptide stack calculator" rank positions
- Backlinks earned by the two authority reports (/reports/*)
- Click-through to /products on peppu.studio from peppudex referral
- Knowledge Graph panel appearance (top 5 compounds with entity IDs)
