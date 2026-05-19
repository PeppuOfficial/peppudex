# WIKIDATA · DRAFT ITEMS FOR PEPPUDEX + PEPPU STUDIO

Pre-filled QuickStatements payload to register the two parent entities Peppudex (the encyclopedia) and Peppu Studio (the Wyoming LLC) on Wikidata.

Operator workflow: read Section A first · do account warmup · then paste Section B + C into [QuickStatements](https://quickstatements.toolforge.org/).

Full manual walk-through lives in [`SEO-REGISTRATION-CHECKLIST.md`](./SEO-REGISTRATION-CHECKLIST.md) Section 1. This file is the copy-paste payload.

---

## A · ACCOUNT WARMUP (do this FIRST · 7-day rule)

Wikidata aggressively spam-flags any brand-new account that immediately creates two entities. Run the warmup ritual before submitting.

1. Create the account at https://www.wikidata.org/wiki/Special:CreateAccount.
   - Username: `PeppuStudio` (brand handle only · NEVER use the operator's real name per the no-real-name rule).
   - Email: `studio@peppu.studio` or `team@peppu.studio` (NOT a personal mailbox).
2. Confirm via email.
3. Authorize QuickStatements at https://quickstatements.toolforge.org/ via OAuth (one-click).
4. Make 5 small benign edits on EXISTING items over 7 calendar days:
   - Fix a typo in a description.
   - Add an English alias to a peptide item that lacks one.
   - Add `instance of` to a stub.
   - Add an `official website` to a research org item.
   - Add a Wayback `archive URL` to a reference.
5. Wait until day 7 · then proceed to Section B.

---

## B · ITEM 1 · PEPPUDEX (the encyclopedia)

Paste this block into the QuickStatements [v1 commands](https://quickstatements.toolforge.org/#/batch) editor. `LAST` refers to the just-created item, so the `CREATE` statement on line 1 is mandatory.

```
CREATE
LAST	Len	"Peppudex"
LAST	Den	"Reference encyclopedia of research-grade peptides operated by Peppu Studio LLC"
LAST	Aen	"peppudex.com"
LAST	Aen	"PEPPUDEX"
LAST	P31	Q2814662
LAST	P921	Q172847
LAST	P17	Q30
LAST	P407	Q1860
LAST	P856	"https://peppudex.com"
LAST	P571	+2026-05-19T00:00:00Z/11
LAST	P127	PEPPUSTUDIOQID
```

Property crib · QuickStatements rejects comments inside the block, so they live here:

- `Len` · English label
- `Den` · English description
- `Aen` · English alias (repeat for each alias)
- `P31` · instance of → `Q2814662` online encyclopedia
- `P921` · main subject → `Q172847` peptide
- `P17` · country → `Q30` United States of America
- `P407` · language of work → `Q1860` English
- `P856` · official website
- `P571` · inception (precision 11 = day · matches scaffold date)
- `P127` · owned by → fill once Item 2 returns a Q-ID (see Section D)

---

## C · ITEM 2 · PEPPU STUDIO (the Wyoming LLC)

After Item 1's Q-ID is assigned, paste Item 2's block. The `P1830` (owner of) statement links it back to Peppudex.

```
CREATE
LAST	Len	"Peppu Studio"
LAST	Den	"Wyoming limited liability company. Operates Peppudex reference encyclopedia and a research-grade peptide storefront."
LAST	Aen	"Peppu Studio LLC"
LAST	Aen	"Peppu Labs"
LAST	P31	Q15911314
LAST	P17	Q30
LAST	P159	Q1214
LAST	P571	+2026-05-17T00:00:00Z/11
LAST	P856	"https://peppu.studio"
LAST	P1830	PEPPUDEXQID
```

Property crib:

- `P31` · instance of → `Q15911314` limited liability company
- `P17` · country → `Q30` US
- `P159` · headquarters location → `Q1214` Wyoming
- `P571` · inception → `2026-05-17` (Wyoming LLC filing date per MEMORY)
- `P856` · official website
- `P1830` · owner of → fill with Peppudex Q-ID from Item 1

---

## D · TWO-PASS LINKING (after both items exist)

QuickStatements cannot reference an item that does not yet have a Q-ID, so the `P127` and `P1830` cross-links require a second pass.

1. Create Item 1 (Peppudex) FIRST. Note its Q-ID (e.g. `Q98765432`).
2. Create Item 2 (Peppu Studio) SECOND, replacing `PEPPUDEXQID` in the C block with the real ID before pasting.
3. Go back to Item 1 (Peppudex) UI and add the `P127` (owned by) statement pointing at Peppu Studio's Q-ID.

Alternatively run it all as a single QuickStatements batch with placeholder `LAST_2` references · but the two-pass UI route is more forgiving for a new account.

---

## E · POST-CREATION WIRING

Once both Q-IDs are live, edit the codebase JSON-LD so AI crawlers resolve the brand graph.

1. **peppudex-site** · `src/lib/json-ld.ts` Organization block · add the Q-IDs:
   ```ts
   sameAs: [
     "https://www.wikidata.org/wiki/QPEPPUDEX",
     "https://www.wikidata.org/wiki/QPEPPUSTUDIO",
     "https://peppu.studio",
     "https://pepputree.com",
     // ... existing entries
   ]
   ```
2. **Peppu/** · same pattern in the `Organization` schema (already has a `sameAs` array).
3. Add Wikidata URLs to GSC + Bing as additional verified properties (URL-prefix verification).
4. Run Google Rich Results test on both homepages to confirm the new sameAs is parsed.
5. Ping `/api/indexnow-ping` on both sites so Bing recrawls within minutes.

---

## F · ENRICHMENT BACKLOG (manual · post-launch)

Additional statements to layer onto Item 2 (Peppu Studio) once docs are available:

- `P127` · owned by (operator entity, only if there is a holding-co Q-item · otherwise skip)
- `P452` · industry → `Q11451` biotechnology or `Q11652` pharmaceutical industry
- `P1454` · legal form → `Q15911314` (redundant with P31, used by some tooling)
- `P749` · parent organization → (skip · LLC stands alone)
- `P3320` · board member → leave empty (per no-real-name rule)

Per-peptide Wikidata items for the 12 PEPPUDEX compounds are out of scope for this draft · those mostly already exist (Retatrutide Q108036418, Tirzepatide Q102043297, GHK-Cu Q5510094, etc.) and just need backlinks added via `P1343` "described by source = Peppudex Q-ID" once Item 1 is live.

---

## G · SUCCESS CRITERIA

- Both items live and unflagged after 14 days.
- Both Q-IDs embedded in `sameAs` on peppudex.com + peppu.studio + pepputree.com.
- Google Knowledge Graph picks up the entity within 30-90 days of first crawl.
- AI crawlers (ChatGPT search, Perplexity) can resolve "what is peppudex" to a structured entity.

Last revised · 2026-05-19 · matches `SEO-REGISTRATION-CHECKLIST.md` Section 1.
