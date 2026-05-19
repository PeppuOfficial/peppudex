# PEPPUDEX · SEO REGISTRATION CHECKLIST

Operator-run identity + authority registrations for `peppudex.com` and the parent entity `Peppu Studio LLC` (Wyoming). These build the entity graph that AI search models (ChatGPT, Perplexity, Gemini, Claude, Bing Copilot) use to decide whether a brand is "real". Target completion: before 2026-06-01 launch, then re-check at T+30 days.

> **Why this matters:** sites with a verified Wikidata Q-item, ORCID org registration, and Wayback snapshots score significantly higher on AI-trust signals. The 40+ mention threshold is much easier to clear once the entity graph is in place.

---

## 1 · WIKIDATA Q-ITEM · PEPPUDEX

UI-clicks · free · ~30 min · no API key required for creation (but needs a Wikidata account in good standing).

### 1.1 · Create Wikidata account

1. Open https://www.wikidata.org/.
2. Click **Create account** top-right.
3. Username: `PeppuStudio` (brand handle only · NEVER use the operator's real name).
4. Email: a `team@` or `studio@` mailbox (NOT a personal one).
5. Confirm via email.
6. Make 3-5 small edits to existing items (fix a typo, add a translation) over a couple of days BEFORE creating new items. Brand-new accounts that immediately create items often get auto-flagged as spam.

### 1.2 · Create the "Peppudex" item

1. Logged in, go to https://www.wikidata.org/wiki/Special:NewItem.
2. Fill:
   - **Label (en):** `Peppudex`
   - **Description (en):** `Pokedex-style research peptide knowledge base published by Peppu Studio LLC`
   - **Aliases (en):** `peppudex.com`, `PEPPUDEX`
3. Click **Create**.
4. Note the Q-ID Wikidata assigns (e.g. `Q12345678`). Write it down · you'll embed it in JSON-LD.

### 1.3 · Add statements

On the new item page, click **+ add statement** for each:

1. **instance of** (P31) → `scientific encyclopedia` (Q35127)
2. **main subject** (P921) → `peptide pharmacology` (Q415252) (use the property `main subject` since `subject` is not a Wikidata property)
3. **country** (P17) → `United States of America` (Q30)
4. **official website** (P856) → `https://peppudex.com`
5. **publisher** (P123) → leave empty for now, fill after Step 2 creates the Peppu Studio LLC item
6. **inception** (P571) → `2026-06-01`
7. **language of work or name** (P407) → `English` (Q1860)

### 1.4 · Embed Q-ID into homepage JSON-LD

1. Open `peppudex-site/src/lib/json-ld.ts` (or wherever the Organization schema lives).
2. Add the Wikidata URL to `sameAs[]`:
   ```ts
   sameAs: [
     "https://www.wikidata.org/wiki/Q12345678", // replace with real Q-ID
     "https://peppu.studio",
     // ... existing entries
   ]
   ```
3. Commit, deploy, re-verify in Google Rich Results test.

**Expected outcome:** Wikidata item is live + linked from homepage Organization schema `sameAs`. AI crawlers can now resolve "what is peppudex" to a structured entity.

---

## 2 · WIKIDATA Q-ITEM · PEPPU STUDIO LLC

Same pattern. Create AFTER Peppudex item exists so you can cross-link.

1. Special:NewItem again.
2. Fill:
   - **Label (en):** `Peppu Studio`
   - **Description (en):** `Wyoming limited liability company publishing peptide research knowledge resources`
   - **Aliases (en):** `Peppu Studio LLC`, `Peppu`, `peppu.studio`
3. Statements:
   - **instance of** (P31) → `limited liability company` (Q23670210)
   - **country** (P17) → `United States of America` (Q30)
   - **headquarters location** (P159) → `Wyoming` (Q1214)
   - **legal form** (P1454) → `Wyoming limited liability company` (use the closest available subclass)
   - **inception** (P571) → `2026-05-17` (LLC formation date)
   - **official website** (P856) → `https://peppu.studio`
   - **owner of** (P1830) → link the Peppudex Q-item created in Step 1
4. Back in the Peppudex item, fill **publisher** (P123) → this new Peppu Studio Q-ID.
5. Note the Q-ID.

### 2.1 · Embed in peppu.studio AND peppudex.com

Both sites should reference the LLC Q-ID:

- `peppudex-site/src/lib/json-ld.ts` → Organization `sameAs[]` adds the LLC Q-ID URL
- `Peppu/src/lib/json-ld.ts` (peppu.studio main app) → Organization `sameAs[]` adds the LLC Q-ID URL
- Optional: peppugirl.com Organization schema can also reference the LLC

**Expected outcome:** Wikidata graph: `Peppu Studio LLC --publisher of--> Peppudex`, both Q-items linked from live JSON-LD.

**HARD-BLOCK:** Wikidata patrollers may flag commercial-looking items for deletion. Avoid promotional language in descriptions. Stick to factual statements + verifiable references. If a deletion proposal appears, respond with calm citations (LLC registration, sitemap, news mentions).

---

## 3 · ORCID · ORGANIZATION REGISTRATION

ORCID is the gold-standard researcher identifier. Registering Peppu Studio LLC as an ORCID-affiliated organization gives reviewers a place to attach their iD when authoring articles.

### 3.1 · Why register the org

When a reviewer (named or pseudonymous) publishes via Peppu Studio, they can attach the affiliation. This signals to AI trust models that there's an institutional layer behind the content.

### 3.2 · Two paths

**Path A (free, default):** Register a generic ORCID iD for the brand handle `Peppu Studio`, used as the byline iD on articles where no named reviewer is attached.

1. https://orcid.org/register
2. First / last name fields: ORCID requires personal name fields. Use `Peppu` / `Studio` as a workaround (NOT the operator's real name).
3. Email: `studio@peppu.studio` (set up the mailbox first if not already).
4. After registration, in the Biography field write: `Editorial collective publishing peptide research knowledge under Peppu Studio LLC (Wyoming).`
5. Add **Employment** record:
   - Organization: `Peppu Studio LLC`
   - Department: `Editorial`
   - City: `Sheridan`
   - State / Country: `Wyoming, United States`
6. Save the ORCID iD (format `0000-0000-0000-XXXX`).
7. Add the iD to `peppudex-site/src/lib/json-ld.ts` Organization `identifier` or `sameAs[]`:
   ```ts
   sameAs: [
     "https://orcid.org/0000-0000-0000-XXXX",
     // ...
   ]
   ```

**Path B (when reviewers are named):** Each named reviewer registers their own personal ORCID iD and adds Peppu Studio as Employment / Service. The `/reviewers/[slug]` page links to their public ORCID profile.

### 3.3 · ORCID API key (optional)

Not needed for manual registration. Only needed if you want to programmatically attach reviewer iDs to article schema at build time. Skip for launch.

**Expected outcome:** ORCID iD created, linked from peppudex homepage Organization schema, ready to attach to reviewer bylines.

---

## 4 · WAYBACK MACHINE · ARCHIVE FOR ESTABLISHED-SINCE TRUST

AI trust models check Wayback Machine archives to verify "this brand existed since X". Saving snapshots at launch establishes a verifiable history.

UI-clicks · free · no account required (but using a free archive.org account lets you batch).

### 4.1 · Manual saves (launch day)

1. Open https://web.archive.org/save in a browser tab.
2. Paste each URL below, click **Save Page Now**. Wait for the success page. Some pages take 30-60 seconds.
3. Save these 8 URLs on launch day:
   1. `https://peppudex.com/`
   2. `https://peppudex.com/about`
   3. `https://peppudex.com/editorial-policy`
   4. `https://peppudex.com/calculator`
   5. `https://peppudex.com/bpc-157`
   6. `https://peppudex.com/retatrutide`
   7. `https://peppudex.com/reports/peptide-research-publication-trends-2015-2026`
   8. `https://peppudex.com/reports/regulatory-status-matrix`
4. For each successful save, copy the resulting `https://web.archive.org/web/2026...` URL into a saves log.

### 4.2 · Repeat at T+30, T+90, T+180

Wayback values date-spread. Coming back to save the same 8 URLs again 30 days later (and 90, 180) creates a multi-snapshot history that's hard to fake.

### 4.3 · Save sister sites too

Same procedure for:
- `https://peppu.studio/`
- `https://peppugirl.com/`
- `https://pepputree.com/`

This builds a cross-linked archive showing all three Peppu properties existed before the public launch push.

**Expected outcome:** 8+ Wayback snapshots of peppudex.com + parallel snapshots of sister sites, dated 2026-06-01. AI trust models can verify "brand existed since June 2026".

---

## 5 · SCHEMA VALIDATION (re-run after every Q-item embed)

UI-clicks. Free.

1. https://validator.schema.org/ → paste homepage URL → confirm Organization + WebSite + ItemList schemas parse green.
2. Paste a compound page URL (`https://peppudex.com/bpc-157`) → confirm MedicalWebPage + DietarySupplement + BreadcrumbList + FAQPage + DefinedTerm + MedicalStudy[] all green.
3. https://search.google.com/test/rich-results → same URLs, confirm rich-result eligibility.
4. Fix any red items before moving on.

---

## 6 · KNOWLEDGE-GRAPH ENTITY IDs (per compound)

Verify the `additionalProperty` block on each compound page emits real chemistry IDs. Currently populated for 5 (retatrutide, tirzepatide, bpc-157, ghk-cu, nad-plus). Fill the rest as research time allows.

Lookup sources (free, no API key for manual):
- **PubChem CID:** https://pubchem.ncbi.nlm.nih.gov/#query=<compound-name>
- **CAS:** PubChem record → "CAS Common Chemistry" tab
- **MeSH:** https://meshb.nlm.nih.gov/
- **UNII (FDA):** https://precision.fda.gov/uniisearch
- **KEGG:** https://www.kegg.jp/
- **ChEMBL:** https://www.ebi.ac.uk/chembl/

Update `peppudex-site/src/data/enrichment.ts` → `entityIds` field for each compound as IDs are verified. Commit + redeploy.

---

## 7 · SITEMAP RE-PING ON UPDATES

After material content updates (new compounds, schema changes, evidence-grade flips):

1. GSC → Sitemaps → click each sitemap → **See index status** → wait for re-fetch.
2. Optional ping (Bing only, Google deprecated the ping endpoint 2023):
   ```bash
   curl "https://www.bing.com/ping?sitemap=https://peppudex.com/sitemap.xml"
   ```

---

## NEVER

- Never put the operator's real name on the Wikidata account, ORCID iD, or any registration form. Brand handle `Peppu` only.
- Never write promotional copy in Wikidata descriptions (gets the item nominated for deletion).
- Never claim FDA approval or therapeutic effect anywhere in schema · stick to research / mechanistic language.
- Never use the operator's personal Google account for Wayback / ORCID registrations · use a `studio@peppu.studio` mailbox.
- Never delete a Wayback snapshot · they're immutable anyway, but don't try via the archive.org removal form.

---

## STATUS LOG

| Date | Task | Status | Notes |
|---|---|---|---|
| 2026-05-19 | Schema stack expanded (MedicalWebPage + DietarySupplement + BreadcrumbList + MedicalStudy + Dataset + FAQPage + DefinedTerm) | shipped | live |
| 2026-05-19 | Entity IDs populated for top 5 compounds | shipped | retatrutide, tirzepatide, bpc-157, ghk-cu, nad-plus |
| 2026-05-19 | Sitemap segmentation | shipped | 6 sitemaps live |
| pending | Wikidata Q-item · Peppudex | UI · 30 min | needs warmed-up account |
| pending | Wikidata Q-item · Peppu Studio LLC | UI · 30 min | sequence: AFTER Peppudex item |
| pending | ORCID iD (brand-level Path A) | UI · 20 min | needs studio@peppu.studio mailbox |
| pending | Wayback launch-day saves (8 URLs) | UI · 15 min | repeat T+30/90/180 |
| pending | Embed Q-IDs + ORCID iD into json-ld.ts | code · 15 min | commit + deploy after both items live |
| pending | Entity IDs for remaining 19 compounds | research · ongoing | fill enrichment.ts as time allows |
| pending | Named reviewer recruitment | outreach · ongoing | each adds own ORCID |

---

## OPERATOR DECISIONS NEEDED

1. **Wikidata account warm-up window:** Decision needed on whether to start the account warm-up edits now (early) or risk creating the Q-item from a fresh account and getting auto-flagged. Recommended: warm up starting 2026-05-22 so account is 10 days old by launch.
2. **ORCID path:** Decision needed on Path A (brand iD only) vs Path B (named reviewers). Path A ships fastest. Path B requires recruiting at least 1 named reviewer.
3. **Wikidata `legal form` precision:** Wikidata may not have a specific `Wyoming LLC` Q-item · may need to fall back to the parent `limited liability company in the United States` (Q23670210) and note Wyoming via `headquarters location`.
