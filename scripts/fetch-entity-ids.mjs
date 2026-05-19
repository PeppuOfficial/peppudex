#!/usr/bin/env node
/**
 * fetch-entity-ids.mjs
 *
 * Pulls entity identifiers (PubChem CID, CAS, Wikidata Q, ChEMBL) for each
 * compound in peppudex enrichment.ts from public APIs.
 *
 * Run: node scripts/fetch-entity-ids.mjs
 *
 * Sources:
 *   - PubChem REST:  https://pubchem.ncbi.nlm.nih.gov/rest/pug/
 *   - Wikidata:      https://www.wikidata.org/w/api.php
 *   - ChEMBL:        https://www.ebi.ac.uk/chembl/api/data/
 *
 * Does not invent IDs. If a source returns nothing, the field stays
 * undefined. Output goes to scripts/entity-ids-output.json.
 */

import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

// ----- Query terms keyed by slug --------------------------------------------
// Each slug lists candidate names to try against PubChem in order.
// First successful CID wins.
const QUERIES = {
  retatrutide: ["retatrutide", "LY3437943"],
  tirzepatide: ["tirzepatide", "LY3298176", "mounjaro"],
  "bpc-157": ["BPC-157", "BPC 157", "Bodyguard 157", "pentadecapeptide BPC 157"],
  "ghk-cu": ["GHK-Cu", "glycyl-histidyl-lysine copper", "copper tripeptide-1"],
  "klow-blend": [], // proprietary blend · skip
  "nad-plus": ["NAD+", "nicotinamide adenine dinucleotide"],
  "tb-500": ["TB-500", "Thymosin beta-4", "thymosin beta 4 acetate"],
  tesamorelin: ["tesamorelin", "TH9507"],
  "ipa-cjc1295": ["ipamorelin"], // CJC-1295 separately if needed
  "mots-c": ["MOTS-c", "mitochondrial open reading frame of 12S rRNA-c"],
  selank: ["selank"],
  semax: ["semax"],
  "ss-31": ["elamipretide", "SS-31", "bendavia"],
  "wolverine-blend": [], // proprietary blend · skip
  "5-amino-1mq": ["5-amino-1-methylquinolinium", "5-Amino-1MQ"],
  adamax: [], // proprietary research analog · skip PubChem
  "igf-1-lr3": ["IGF-1 LR3", "Long R3 IGF-1", "LR3-IGF-1"],
  cagrilintide: ["cagrilintide", "AM833"],
  survodutide: ["survodutide", "BI 456906"],
  orforglipron: ["orforglipron", "LY3502970"],
  mazdutide: ["mazdutide", "IBI362"],
  "pt-141": ["bremelanotide", "PT-141"],
  epitalon: ["epitalon", "epithalon"],
  "aod-9604": ["AOD9604", "AOD-9604"],
  "kisspeptin-10": ["kisspeptin-10", "metastin 45-54"],
  "thymosin-alpha-1": ["thymalfasin", "thymosin alpha-1", "thymosin alpha 1"],
  humanin: ["humanin"],
};

// Wikidata: same name list, used to search Q items
const WIKI_QUERIES = {
  retatrutide: "retatrutide",
  tirzepatide: "tirzepatide",
  "bpc-157": "BPC-157",
  "ghk-cu": "GHK-Cu",
  "klow-blend": null,
  "nad-plus": "nicotinamide adenine dinucleotide",
  "tb-500": "thymosin beta-4",
  tesamorelin: "tesamorelin",
  "ipa-cjc1295": "ipamorelin",
  "mots-c": "MOTS-c",
  selank: "selank",
  semax: "semax",
  "ss-31": "elamipretide",
  "wolverine-blend": null,
  "5-amino-1mq": "5-amino-1-methylquinolinium",
  adamax: null,
  "igf-1-lr3": "IGF-1 LR3",
  cagrilintide: "cagrilintide",
  survodutide: "survodutide",
  orforglipron: "orforglipron",
  mazdutide: "mazdutide",
  "pt-141": "bremelanotide",
  epitalon: "epitalon",
  "aod-9604": "AOD9604",
  "kisspeptin-10": "kisspeptin-10",
  "thymosin-alpha-1": "thymalfasin",
  humanin: "humanin (peptide)",
};

// ChEMBL search keys
const CHEMBL_QUERIES = {
  retatrutide: "retatrutide",
  tirzepatide: "tirzepatide",
  "bpc-157": "BPC-157",
  "ghk-cu": "GHK-Cu",
  "klow-blend": null,
  "nad-plus": "NAD",
  "tb-500": "thymosin beta-4",
  tesamorelin: "tesamorelin",
  "ipa-cjc1295": "ipamorelin",
  "mots-c": "MOTS-c",
  selank: "selank",
  semax: "semax",
  "ss-31": "elamipretide",
  "wolverine-blend": null,
  "5-amino-1mq": "5-amino-1-methylquinolinium",
  adamax: null,
  "igf-1-lr3": null, // doesn't have a clean ChEMBL ID
  cagrilintide: "cagrilintide",
  survodutide: "survodutide",
  orforglipron: "orforglipron",
  mazdutide: "mazdutide",
  "pt-141": "bremelanotide",
  epitalon: "epitalon",
  "aod-9604": "AOD9604",
  "kisspeptin-10": "kisspeptin-10",
  "thymosin-alpha-1": "thymalfasin",
  humanin: "humanin",
};

// ----- HTTP helpers ---------------------------------------------------------

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function safeFetch(url, opts = {}) {
  try {
    const res = await fetch(url, {
      ...opts,
      headers: {
        "user-agent": "peppudex-entity-id-bot/1.0 (research, contact peppu.studio)",
        accept: "application/json",
        ...opts.headers,
      },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

// ----- PubChem --------------------------------------------------------------
async function pubchemCID(name) {
  const url = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${encodeURIComponent(
    name,
  )}/cids/JSON`;
  const data = await safeFetch(url);
  const cid = data?.IdentifierList?.CID?.[0];
  return cid ? String(cid) : null;
}

async function pubchemSynonyms(cid) {
  const url = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${cid}/synonyms/JSON`;
  const data = await safeFetch(url);
  return data?.InformationList?.Information?.[0]?.Synonym ?? [];
}

// CAS pattern: digits-digits-digit (e.g. 137525-51-0)
const CAS_RE = /^\d{2,7}-\d{2}-\d$/;

function extractCAS(synonyms) {
  for (const s of synonyms) {
    if (CAS_RE.test(s)) return s;
  }
  return null;
}

async function pubchemLookup(names) {
  for (const name of names) {
    const cid = await pubchemCID(name);
    if (cid) {
      await sleep(300);
      const syns = await pubchemSynonyms(cid);
      const cas = extractCAS(syns);
      return { pubchem: cid, cas: cas || null, matchedName: name };
    }
    await sleep(300);
  }
  return null;
}

// ----- Wikidata -------------------------------------------------------------

async function wikidataQ(query) {
  if (!query) return null;
  const url =
    `https://www.wikidata.org/w/api.php?action=wbsearchentities` +
    `&search=${encodeURIComponent(query)}` +
    `&language=en&format=json&type=item&limit=5&origin=*`;
  const data = await safeFetch(url);
  const hits = data?.search ?? [];
  if (!hits.length) return null;
  // Heuristic: pick first hit whose description hints at chemistry / peptide /
  // medicine / molecule. Skip music / film / person hits.
  const goodWords = [
    "peptide",
    "chemical",
    "drug",
    "medication",
    "compound",
    "amino",
    "protein",
    "molecule",
    "coenzyme",
    "hormone",
    "agonist",
    "analog",
    "biolog",
    "enzyme",
    "research chemical",
    "small molecule",
  ];
  const badWords = ["band", "album", "song", "film", "movie", "actor", "novel", "footballer"];
  for (const hit of hits) {
    const desc = (hit.description || "").toLowerCase();
    if (badWords.some((w) => desc.includes(w))) continue;
    if (goodWords.some((w) => desc.includes(w))) return hit.id;
  }
  // Fallback: first hit, but only if its description does not contain badWords.
  const safe = hits.find((h) => {
    const d = (h.description || "").toLowerCase();
    return !badWords.some((w) => d.includes(w));
  });
  return safe?.id || null;
}

// ----- ChEMBL ---------------------------------------------------------------

async function chemblID(query) {
  if (!query) return null;
  const url =
    `https://www.ebi.ac.uk/chembl/api/data/molecule/search.json` +
    `?q=${encodeURIComponent(query)}&limit=5`;
  const data = await safeFetch(url);
  const mol = data?.molecules?.[0];
  return mol?.molecule_chembl_id || null;
}

// ----- Main -----------------------------------------------------------------

async function main() {
  const results = {};
  const slugs = Object.keys(QUERIES);
  console.log(`Resolving ${slugs.length} compounds...\n`);

  for (const slug of slugs) {
    const names = QUERIES[slug];
    const wikiQ = WIKI_QUERIES[slug];
    const chemQ = CHEMBL_QUERIES[slug];

    if (!names || names.length === 0) {
      // proprietary blends · skip
      results[slug] = { skipped: true, reason: "proprietary blend or research-only analog" };
      console.log(`[SKIP]  ${slug.padEnd(20)} (proprietary blend)`);
      continue;
    }

    const out = {};

    // PubChem
    const pub = await pubchemLookup(names);
    if (pub?.pubchem) out.pubchem = pub.pubchem;
    if (pub?.cas) out.cas = pub.cas;

    // Wikidata
    const q = await wikidataQ(wikiQ);
    if (q) out.wikidata = q;
    await sleep(400);

    // ChEMBL
    const ch = await chemblID(chemQ);
    if (ch) out.chembl = ch;
    await sleep(400);

    results[slug] = out;
    const summary = Object.entries(out).map(([k, v]) => `${k}=${v}`).join(", ");
    console.log(`[OK]    ${slug.padEnd(20)} ${summary || "(no IDs found)"}`);
  }

  const outPath = resolve(__dirname, "entity-ids-output.json");
  writeFileSync(outPath, JSON.stringify(results, null, 2));
  console.log(`\nWritten ${outPath}`);
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
