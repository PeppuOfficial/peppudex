/**
 * refresh-research-trends.mjs
 *
 * Pulls per-compound × per-year PubMed publication counts via the NCBI
 * E-Utilities esearch endpoint, then writes the tally to
 * src/data/research-trends.json so the /reports/peptide-research-publication
 * -trends-2015-2026 page can render statically.
 *
 * Run quarterly:
 *   node scripts/refresh-research-trends.mjs
 *
 * Rate limit: NCBI allows ~3 req/s unsigned, 10 req/s with an API key.
 * We default to a 350 ms gap between requests and retry on transient
 * network errors. No API key required for this volume (~187 req).
 */

import { writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_PATH = join(__dirname, "..", "src", "data", "research-trends.json");

const YEARS = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024,
  2025];

/**
 * Compounds and their PubMed search-term expansions. Aliases joined with
 * OR so the term hits regardless of which name the paper uses.
 */
const COMPOUNDS = [
  { slug: "retatrutide", name: "Retatrutide",
    terms: ["retatrutide", "LY3437943"] },
  { slug: "tirzepatide", name: "Tirzepatide",
    terms: ["tirzepatide", "Mounjaro", "Zepbound", "LY3298176"] },
  { slug: "bpc-157", name: "BPC-157",
    terms: ["BPC-157", "BPC 157", "Body Protection Compound 157",
      "PL14736"] },
  { slug: "ghk-cu", name: "GHK-Cu",
    terms: ["GHK-Cu", "GHK copper", "copper tripeptide-1"] },
  { slug: "tb-500", name: "TB-500",
    terms: ["TB-500", "TB500", "thymosin beta-4", "thymosin beta 4"] },
  { slug: "nad-plus", name: "NAD+",
    terms: ["NAD+", "nicotinamide adenine dinucleotide"] },
  { slug: "mots-c", name: "MOTS-c",
    terms: ["MOTS-c", "MOTSc", "mitochondrial open reading frame 12S"] },
  { slug: "tesamorelin", name: "Tesamorelin",
    terms: ["tesamorelin", "Egrifta"] },
  { slug: "selank", name: "Selank",
    terms: ["selank"] },
  { slug: "semax", name: "Semax",
    terms: ["semax"] },
  { slug: "ipa-cjc1295", name: "CJC-1295",
    terms: ["CJC-1295", "CJC1295"] },
  { slug: "ss-31", name: "SS-31",
    terms: ["SS-31", "elamipretide", "MTP-131", "bendavia"] },
  { slug: "5-amino-1mq", name: "5-Amino-1MQ",
    terms: ["5-amino-1MQ", "5-amino-1-methylquinolinium"] },
  { slug: "adamax", name: "Adamax",
    terms: ["adamax peptide"] },
  { slug: "igf-1-lr3", name: "IGF-1 LR3",
    terms: ["IGF-1 LR3", "IGF-I LR3", "long arginine 3 IGF-1"] },
  { slug: "klow-blend", name: "KLOW Blend",
    terms: ["KPV peptide", "KLOW peptide blend"] },
  { slug: "wolverine-blend", name: "Wolverine Blend",
    terms: ["BPC-157 TB-500 combination",
      "wolverine peptide stack"] },
];

const BASE_URL =
  "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi";
const SLEEP_MS = 350;
const MAX_RETRIES = 3;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/**
 * Build a PubMed query for one compound × one year.
 * Form: (term1[Title/Abstract] OR term2[Title/Abstract]) AND year[Date]
 */
function buildQuery(terms, year) {
  const titleAbs = terms
    .map((t) => `"${t}"[Title/Abstract]`)
    .join(" OR ");
  return `(${titleAbs}) AND ${year}[Date - Publication]`;
}

/**
 * Fetch the count for one query string. Retries on transient errors.
 * Returns -1 if all retries fail; the page will render that as a gap.
 */
async function fetchCount(query, label) {
  const url = `${BASE_URL}?db=pubmed&term=${encodeURIComponent(query)}` +
    `&retmode=json&retmax=0`;
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const res = await fetch(url, {
        headers: { "User-Agent": "peppudex-research-trends/1.0" },
      });
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      const json = await res.json();
      const count = parseInt(json?.esearchresult?.count ?? "0", 10);
      if (Number.isNaN(count)) {
        throw new Error("non-numeric count");
      }
      return count;
    } catch (err) {
      console.warn(
        `  [retry ${attempt}/${MAX_RETRIES}] ${label}: ${err.message}`,
      );
      if (attempt === MAX_RETRIES) {
        return -1;
      }
      await sleep(1000 * attempt);
    }
  }
  return -1;
}

async function main() {
  console.log(`Fetching PubMed counts for ${COMPOUNDS.length} compounds ` +
    `× ${YEARS.length} years = ${COMPOUNDS.length * YEARS.length} ` +
    `queries...`);

  const series = [];
  const errors = [];

  for (const compound of COMPOUNDS) {
    const counts = [];
    for (const year of YEARS) {
      const label = `${compound.slug} ${year}`;
      const query = buildQuery(compound.terms, year);
      const count = await fetchCount(query, label);
      if (count < 0) {
        errors.push(label);
        counts.push(0);
      } else {
        counts.push(count);
      }
      process.stdout.write(`  ${label} = ${count}\n`);
      await sleep(SLEEP_MS);
    }
    series.push({
      slug: compound.slug,
      name: compound.name,
      counts,
    });
  }

  const out = {
    _meta: {
      description:
        "PubMed publication counts per peptide × year (2015-2025). " +
        "Generated by scripts/refresh-research-trends.mjs via NCBI " +
        "E-Utilities esearch.",
      lastRegenerated: new Date().toISOString().slice(0, 10),
      queryTemplate:
        "(<alias1>[Title/Abstract] OR <alias2>[Title/Abstract]) " +
        "AND <year>[Date - Publication]",
      source: "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi",
      regenerationScript: "scripts/refresh-research-trends.mjs",
      failedQueries: errors,
    },
    years: YEARS,
    series,
  };

  writeFileSync(OUT_PATH, JSON.stringify(out, null, 2) + "\n", "utf8");
  console.log(
    `\nWrote ${OUT_PATH}. ${errors.length} failed queries logged.`,
  );
}

main().catch((err) => {
  console.error("FATAL:", err);
  process.exit(1);
});
