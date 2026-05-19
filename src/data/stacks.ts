/**
 * Pre-built peptide stacks · for /stacks/[slug] pages.
 *
 * Each stack is a curated combination of 2–4 PEPPUDEX compounds tagged
 * to a research goal. Every stack URL is individually indexable and
 * targets long-tail commercial queries ("BPC-157 TB-500 stack",
 * "GH-axis stack", "skin peptide stack").
 *
 * Per Examine/Bulbapedia pattern: every stack page links to every
 * component compound; every compound page lists every stack it
 * appears in. Bidirectional internal-link saturation.
 */

export interface StackComponent {
  slug: string;       // PEPPUDEX slug
  role: string;       // why it's in the stack
}

export interface Stack {
  slug: string;
  name: string;
  goal: string;
  description: string;
  longDescription: string;
  components: StackComponent[];
  cycleLength: string;
  protocolNote: string;
}

export const STACKS: Stack[] = [
  {
    slug: "recovery-bpc157-tb500",
    name: "Classic Recovery",
    goal: "Tendon, ligament, and soft-tissue recovery research.",
    description: "The most-referenced recovery stack in community protocols.",
    longDescription: "BPC-157 + TB-500 is the most commonly cited recovery research stack across community protocols, on the theory of complementary mechanisms: BPC-157 drives angiogenesis and growth-hormone-receptor upregulation at injury sites; TB-500 sequesters G-actin to promote endothelial-cell and stem-cell migration into those sites. Animal-model evidence is strong for each component separately; no published RCT validates the specific combination.",
    components: [
      { slug: "bpc-157", role: "Angiogenesis + cytoprotection at injury site" },
      { slug: "tb-500",  role: "Actin-cytoskeleton-driven cell migration + anti-fibrotic" },
    ],
    cycleLength: "4–6 weeks loading, 4 weeks maintenance per community protocols",
    protocolNote: "No published RCT validates this combination. Per-component animal-model dose ranges do not translate to a human recommendation.",
  },
  {
    slug: "gh-axis-ipa-cjc-tesa",
    name: "GH-Axis Trifecta",
    goal: "Endogenous growth-hormone pulse amplification research.",
    description: "Three complementary upstream regulators of the GH pulse.",
    longDescription: "Ipamorelin (selective ghrelin agonist) + CJC-1295 No DAC (GHRH(1-29) analog) + tesamorelin (FDA-approved GHRH(1-44) analog) engage all three upstream regulators of pituitary GH release. The pair Ipamorelin / CJC-1295 amplifies pulse via dual-pathway activation; tesamorelin adds the FDA-validated GHRH(1-44) mechanism that drives the longest documented pulse profile. No published research evaluates this combination as a unit.",
    components: [
      { slug: "ipa-cjc1295", role: "Ghrelin-receptor + GHRH(1-29) dual pulse" },
      { slug: "tesamorelin", role: "GHRH(1-44) FDA-validated long pulse" },
    ],
    cycleLength: "8 weeks community-reported · 4 weeks off · cycle as needed",
    protocolNote: "Combining multiple GH-axis agonists is not supported by published research. This is a research reference framing, not a recommendation.",
  },
  {
    slug: "skin-matrix-ghkcu-bpc",
    name: "Skin & Matrix",
    goal: "Dermal collagen synthesis + tissue-remodeling research.",
    description: "Copper-peptide collagen induction plus pentadecapeptide angiogenesis.",
    longDescription: "GHK-Cu drives transcriptional upregulation of collagen, elastin, and glycosaminoglycan synthesis in dermal fibroblasts. BPC-157 contributes VEGF-driven angiogenesis to support the new matrix. The combination is common in cosmetic-research community protocols, particularly for topical + subcutaneous co-application. Per-component literature applies independently.",
    components: [
      { slug: "ghk-cu",  role: "Collagen + elastin + GAG induction (skin matrix)" },
      { slug: "bpc-157", role: "VEGF angiogenesis to support new matrix" },
    ],
    cycleLength: "8–12 weeks topical + subcutaneous community protocols",
    protocolNote: "Topical 0.05–0.1% GHK-Cu has peer-reviewed cosmetic-trial data. Injectable GHK-Cu is research-use only.",
  },
  {
    slug: "longevity-nad-motsc",
    name: "Cellular Bioenergetics",
    goal: "Mitochondrial function + sirtuin-axis longevity research.",
    description: "NAD+ + MOTS-c as a longevity-pathway research pair.",
    longDescription: "NAD+ is the obligate substrate of sirtuins and PARPs and the electron-transfer coenzyme for oxidative phosphorylation. MOTS-c is the mitochondrial-derived peptide that activates AMPK and regulates nuclear gene expression in response to mitochondrial state. The pair is studied as an upstream + downstream longevity-pathway combination — NAD+ supporting the substrate pool, MOTS-c driving the signaling response.",
    components: [
      { slug: "nad-plus", role: "Sirtuin / PARP substrate · mitochondrial electron-transfer coenzyme" },
      { slug: "mots-c",   role: "Mitochondrial-derived AMPK activator · exercise-mimetic" },
    ],
    cycleLength: "Continuous research-protocol cycling. Not standardized.",
    protocolNote: "Human Phase 3 evidence for either component is incomplete. Combination not studied in clinical trial.",
  },
  {
    slug: "metabolic-tirz-reta",
    name: "Incretin Comparison",
    goal: "Side-by-side comparison framework for incretin agonists.",
    description: "Tirzepatide + retatrutide reference framing (research only — never co-administered).",
    longDescription: "This is a reference framing for comparing dual GIP/GLP-1 agonism (tirzepatide) against triple GLP-1/GIP/glucagon agonism (retatrutide), not a co-administration protocol. The two compounds engage overlapping pathways and combined use is unstudied and not recommended. Buyers researching the incretin category typically order both for in-vitro characterization, not simultaneous use.",
    components: [
      { slug: "tirzepatide", role: "Dual GLP-1R / GIPR agonism (FDA-approved as Mounjaro / Zepbound)" },
      { slug: "retatrutide", role: "Triple GLP-1R / GIPR / GCGR agonism (investigational)" },
    ],
    cycleLength: "Reference-only framing · not a combination protocol",
    protocolNote: "Co-administration of multiple incretin agonists is not supported by published research. They engage overlapping pathways.",
  },
  {
    slug: "cognitive-semax-selank",
    name: "Russian Heptapeptide Pair",
    goal: "Cognitive + anxiolytic research framework.",
    description: "Semax (BDNF / cognition) + Selank (GABAergic / anxiolytic).",
    longDescription: "Semax and Selank are sister Russian-developed heptapeptides built on the same C-terminal Pro-Gly-Pro stabilizing strategy. Different parent sequences (ACTH(4-10) for Semax, tuftsin for Selank), different mechanisms (BDNF / TrkB neurotropic for Semax, GABAergic anxiolytic for Selank), but commonly studied together in Russian preclinical literature for complementary cognitive + stress-pathway effects.",
    components: [
      { slug: "semax",  role: "BDNF / TrkB neurotropic + cognitive support" },
      { slug: "selank", role: "GABAergic anxiolytic + HPA-axis modulation" },
    ],
    cycleLength: "Variable · Russian clinical literature describes 14–30 day intranasal courses",
    protocolNote: "Russian-language primary literature; subset Western-indexed. No FDA / EMA trials.",
  },
];

export const STACKS_BY_SLUG: Record<string, Stack> =
  Object.fromEntries(STACKS.map((s) => [s.slug, s]));

/** Reverse index: PEPPUDEX slug → stack slugs it appears in. */
export function stacksForCompound(compoundSlug: string): Stack[] {
  return STACKS.filter((s) => s.components.some((c) => c.slug === compoundSlug));
}
