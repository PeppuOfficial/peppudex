# PEPPUDEX · SEO REGISTRATION CHECKLIST

Operator-run setup. These tasks cannot be automated by the codebase and require manual login + DNS access.

Owner: peppuofficials team. Run before 2026-06-01 public launch.

---

## 1. GOOGLE SEARCH CONSOLE (Phase G1)

1. Open https://search.google.com/search-console.
2. Add property → URL prefix → `https://peppudex.com`.
3. Choose DNS verification → copy the TXT record value.
4. Open Porkbun → DNS records for peppudex.com → add TXT record:
   - Type: TXT
   - Host: (blank or @ for root)
   - Value: `google-site-verification=<token-from-GSC>`
   - TTL: 600
5. Wait 5-10 min, click Verify in GSC.
6. Repeat for `https://www.peppudex.com` (URL prefix property) so both surfaces are tracked.
7. Settings → Preferred domain → non-www.
8. Submit all 6 sitemaps in Sitemaps → Add new sitemap:
   - `https://peppudex.com/sitemap.xml`
   - `https://peppudex.com/sitemap-compounds.xml` (when segmented sub-sitemaps are wired — see deferred-url-migration.md)
   - `https://peppudex.com/sitemap-categories.xml`
   - `https://peppudex.com/sitemap-comparisons.xml`
   - `https://peppudex.com/sitemap-studies.xml`
   - `https://peppudex.com/sitemap-guides.xml`
9. URL Inspection → request indexing for homepage + top 20 compound pages.

## 2. BING WEBMASTER TOOLS

1. https://www.bing.com/webmasters
2. Add site → import from GSC (faster than re-verifying).
3. Submit sitemap.

## 3. WIKIDATA Q-ITEM (Phase A11)

1. Login at https://www.wikidata.org/.
2. Special:NewItem → fill:
   - Label: `PEPPUDEX`
   - Description: `Pokedex-style research peptide knowledge base published by Peppu Studio LLC`
3. Add statements:
   - `instance of` (P31) → `scientific encyclopedia` (Q5879284)
   - `country` (P17) → `United States of America`
   - `official website` (P856) → `https://peppudex.com`
   - `publisher` (P123) → Create separate Q-item for "Peppu Studio LLC" first, then link.
4. Save Q-ID. Update `peppudex-site/src/lib/json-ld.ts` → Organization schema `sameAs[]` to include the Wikidata URL.
5. Create matching Q-item for "Peppu Studio LLC" with:
   - `instance of` → `limited liability company`
   - `country` → US
   - `legal form` → Wyoming LLC
   - `official website` → https://peppu.studio
6. Cross-reference both Q-items.

## 4. ORCID ORGANIZATION REGISTRY

Skip unless Peppu Studio publishes peer-reviewed papers. Reviewers (when individually named) should each register their own ORCID iD and link from `/reviewers/[slug]` page.

## 5. SCHEMA VALIDATION

After every schema-adding deploy:

1. https://validator.schema.org/ → paste compound page URL.
2. https://search.google.com/test/rich-results → enter URL.
3. Confirm green checks on:
   - MedicalWebPage
   - DietarySupplement
   - BreadcrumbList
   - FAQPage
   - DefinedTerm
   - Dataset (if compound has outcomes)
   - MedicalStudy[] (one per citation)
4. Fix any errors before next deploy.

## 6. KNOWLEDGE GRAPH POPULATION (entity IDs)

Verify the `additionalProperty` block on compound pages emits:
- CAS Number
- PubChem CID
- MeSH ID
- FDA UNII
- KEGG ID
- ChEMBL ID

Use the entityIds field in `enrichment.ts`. Currently populated for 5 compounds (retatrutide, tirzepatide, bpc-157, ghk-cu, nad-plus). To verify others:

- PubChem CID: https://pubchem.ncbi.nlm.nih.gov/#query=<compound-name>
- CAS: PubChem record → "CAS Common Chemistry"
- MeSH: https://meshb.nlm.nih.gov/
- UNII: https://precision.fda.gov/uniisearch
- KEGG: https://www.kegg.jp/
- ChEMBL: https://www.ebi.ac.uk/chembl/

Update enrichment.ts → entityIds for each compound as IDs are verified. Redeploy.

## 7. SITEMAP REPING ON UPDATES

After material content updates (new compounds, schema changes, evidence-grade updates):

1. Trigger sitemap re-fetch in GSC.
2. Optionally ping: `curl "https://www.google.com/ping?sitemap=https://peppudex.com/sitemap.xml"`
3. Same for Bing.

## 8. RUNNING SCHEMA TESTS LOCALLY

```bash
cd peppudex-site
npm run build
npm run start
# In another shell:
curl -s http://localhost:3000/bpc-157 | grep -oP '<script type="application/ld\+json">.*?</script>'
```

Paste the JSON-LD output into validator.schema.org.

---

## STATUS LOG

| Date | Task | Status |
|---|---|---|
| 2026-05-19 | Schema stack expanded (MedicalWebPage + DietarySupplement + BreadcrumbList + MedicalStudy + Dataset + FAQPage + DefinedTerm) | ✅ shipped |
| 2026-05-19 | Entity IDs populated for top 5 compounds | ✅ shipped |
| 2026-05-19 | Sitemap segmentation (top-level) | ✅ shipped |
| pending | GSC DNS verification | ⏳ operator-run |
| pending | Wikidata Q-item creation | ⏳ operator-run |
| pending | Entity IDs for remaining 12 compounds | ⏳ research-needed |
| pending | Named reviewer recruitment | ⏳ ongoing |
