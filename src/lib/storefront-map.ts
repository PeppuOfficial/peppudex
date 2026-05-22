const STORE_BASE = "https://peppu.studio/products";

const STOREFRONT_SLUGS: Record<string, string> = {
  retatrutide: "reta",
  tirzepatide: "tirz",
  "bpc-157": "bpc-157",
  "ghk-cu": "ghk-cu",
  "klow-blend": "klow-blend",
  "nad-plus": "nad-plus",
  "tb-500": "tb-500",
  tesamorelin: "tesamorelin",
  selank: "selank",
  semax: "semax",
  cagrilintide: "cagrilintide",
  survodutide: "survodutide",
  orforglipron: "orforglipron",
  mazdutide: "mazdutide",
  "wolverine-blend": "wolverine-blend",
  "igf-1-lr3": "igf-1-lr3",
  "ss-31": "ss-31",
  "thymosin-alpha-1": "thymosin-alpha-1",
  "pt-141": "pt-141",
  epitalon: "epitalon",
  "kisspeptin-10": "kisspeptin-10",
  "aod-9604": "aod-9604",
  "5-amino-1mq": "5-amino-1mq",
  adamax: "adamax",
  humanin: "humanin",
  hospira: "hospira",
  "ipa-cjc1295": "ipa-cjc1295",
};

export function storefrontProductUrl(slug: string, medium: string): string {
  const storeSlug = STOREFRONT_SLUGS[slug] ?? slug;
  const params = new URLSearchParams({
    utm_source: "peppudex",
    utm_medium: medium,
    utm_campaign: slug,
  });
  return `${STORE_BASE}/${storeSlug}?${params.toString()}`;
}
