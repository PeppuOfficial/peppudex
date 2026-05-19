/**
 * peppudex compound slug → wiki.peppu.studio article slug.
 *
 * The wiki at wiki.peppu.studio uses canonical compound names as filenames
 * (e.g. BPC-157.md → /wiki/BPC-157), while peppudex uses shorter SKU-style
 * slugs (e.g. bpc-157). This map is the bridge so the "WIKI ENTRY ▶"
 * button on each compound page deep-links to the right article.
 *
 * All 27 peppudex compounds covered. Returns null when not mapped to
 * prevent dead links.
 */

const WIKI_SLUG_BY_PEPPUDEX_SLUG: Record<string, string> = {
  // Tissue research / recovery
  "bpc-157": "BPC-157",
  "tb-500": "TB-500",
  "ghk-cu": "GHK-Cu",
  "klow-blend": "KLOW-Blend",
  "wolverine-blend": "Wolverine-Blend",

  // Incretin / metabolic
  "retatrutide": "Retatrutide",
  "tirzepatide": "Tirzepatide",
  "cagrilintide": "Cagrilintide",
  "survodutide": "Survodutide",
  "orforglipron": "Orforglipron",
  "mazdutide": "Mazdutide",

  // Growth / GH axis
  "ipa-cjc1295": "Ipamorelin",
  "tesamorelin": "Tesamorelin",
  "igf-1-lr3": "IGF-1_LR3",
  "aod-9604": "AOD-9604",

  // Nootropic / neuromodulator
  "selank": "Selank",
  "semax": "Semax",

  // Mitochondrial / longevity
  "nad-plus": "NAD-plus",
  "mots-c": "MOTS-c",
  "ss-31": "SS-31",
  "humanin": "Humanin",
  "5-amino-1mq": "5-Amino-1MQ",
  "epitalon": "Epitalon",

  // Reproductive / hormone-axis
  "kisspeptin-10": "Kisspeptin-10",
  "pt-141": "PT-141",

  // Immune / EPO-derived
  "adamax": "Adamax",
  "thymosin-alpha-1": "Thymosin_alpha-1",
};

const WIKI_BASE = "https://wiki.peppu.studio/wiki";

/**
 * Build the canonical wiki article URL for a peppudex compound slug.
 * Returns null when the compound has no mapped wiki article.
 */
export function wikiUrlFor(peppudexSlug: string): string | null {
  const wikiSlug = WIKI_SLUG_BY_PEPPUDEX_SLUG[peppudexSlug];
  if (!wikiSlug) return null;
  return `${WIKI_BASE}/${wikiSlug}`;
}

/** Raw map · expose for tests + sitemap helpers. */
export { WIKI_SLUG_BY_PEPPUDEX_SLUG };
