/**
 * Compound slugs that are listed in peppudex but live in the
 * peppu.studio storefront under the COMING SOON shelf (not yet
 * orderable). Source-of-truth = peppu.studio products.ts entries
 * with `comingSoon: true`. Keep this set in lockstep manually · the
 * data layer between the two apps is intentionally separate so
 * peppudex stays a static-build, no-DB content site.
 *
 * When the operator flips a SKU live on peppu.studio (sets
 * `comingSoon: false` in products.ts), remove its slug from this set.
 */
export const COMING_SOON_SLUGS = new Set<string>([
  "cagrilintide",
  "survodutide",
  "orforglipron",
  "mazdutide",
  "wolverine-blend",
  "igf-1-lr3",
  "ss-31",
  "thymosin-alpha-1",
  "pt-141",
  "epitalon",
  "kisspeptin-10",
  "aod-9604",
  "5-amino-1mq",
  "adamax",
  "humanin",
]);

export function isComingSoon(slug: string): boolean {
  return COMING_SOON_SLUGS.has(slug);
}
