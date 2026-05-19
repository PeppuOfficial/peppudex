/**
 * peppudex.com → peppugirl.com bidirectional link map.
 *
 * Phase P-1 of PEPPU-3-PROPERTY-SEO-MASTER plan.
 *
 * Compound page renders the relevant peppugirl diary log entries via this map.
 * Reciprocal authority loop: peppugirl posts already link to peppudex compound
 * pages inline, and now peppudex compound pages link back to peppugirl diary
 * posts. All dofollow (owned properties).
 *
 * Add new posts here as peppugirl ships them.
 */

export interface PeppugirlPost {
  slug: string;
  title: string;
  excerpt: string;
}

export const PEPPUGIRL_BY_COMPOUND: Record<string, PeppugirlPost[]> = {
  "ghk-cu": [
    {
      slug: "ghk-cu-skin",
      title: "GHK-Cu for skin · the diary i wish someone gave me",
      excerpt: "12-week copper-peptide skin diary · dose, mechanism, before-after, FAQ",
    },
    {
      slug: "copper-peptide-for-hair-loss",
      title: "Copper peptide for hair loss · what r/tressless is missing",
      excerpt: "GHK-Cu topical for hairline · 16-week protocol + minoxidil stack",
    },
    {
      slug: "ghk-cu-under-eye-protocol",
      title: "GHK-Cu under eye protocol · fix the crepey skin without botox",
      excerpt: "10-week periorbital protocol · topical vs subq · before-after",
    },
    {
      slug: "glass-skin-peptide-stack",
      title: "Glass skin peptide stack · the 3-peptide combo that delivers",
      excerpt: "GHK-Cu + PDRN + NAD+ · 12-week glass-skin protocol",
    },
  ],
  "nad-plus": [
    {
      slug: "nad-plus-for-skin-glow",
      title: "NAD+ for skin glow · longevity vial that fixed my dullness",
      excerpt: "6-week NAD+ subq diary · sirtuin activity + cellular renewal",
    },
    {
      slug: "glass-skin-peptide-stack",
      title: "Glass skin peptide stack · NAD+ as the renewal pillar",
      excerpt: "12-week protocol pairing NAD+ with GHK-Cu and PDRN",
    },
  ],
  "selank": [
    {
      slug: "low-cortisol-peptide-routine",
      title: "Low cortisol peptide routine · selank + GHK-Cu + NAD+ reset",
      excerpt: "10-week HPA-axis reset · serum cortisol -42% in lab measurement",
    },
  ],
};

/**
 * Returns peppugirl posts for the given compound slug.
 * Empty array if no posts exist yet.
 */
export function peppugirlPostsForCompound(slug: string): PeppugirlPost[] {
  return PEPPUGIRL_BY_COMPOUND[slug] ?? [];
}
