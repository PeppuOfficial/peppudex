/**
 * Head-to-head comparison pairs · for /vs/[pair] pages.
 *
 * Each pair targets a high-volume "X vs Y" commercial-intent query.
 * URL pattern: /vs/{a}-vs-{b} — alphabetical sort to enforce canonical
 * ordering and prevent duplicate-content fragmentation.
 *
 * Per the strategy doc: "Each comparison is a separate indexed URL
 * targeting a high-intent commercial query. Nobody owns 'bpc 157 vs
 * tb 500' right now." — that's the moat.
 */

export interface Comparison {
  slug: string;          // "bpc-157-vs-tb-500"
  a: string;             // first compound slug
  b: string;             // second compound slug
  verdict: string;       // one-paragraph short verdict
  comparisonTable: { row: string; aValue: string; bValue: string }[];
  whichBetter: { goal: string; winner: "a" | "b" | "tie"; rationale: string }[];
  stacking: string;
  searchVolume?: string;
}

export const COMPARISONS: Comparison[] = [
  {
    slug: "bpc-157-vs-tb-500",
    a: "bpc-157",
    b: "tb-500",
    verdict: "BPC-157 and TB-500 are the two most-discussed recovery research peptides — different mechanisms, often stacked. BPC-157 is a 15-amino-acid pentadecapeptide acting through VEGF angiogenesis, growth-hormone-receptor upregulation, and the cytoprotection paradigm. TB-500 is a 7-amino-acid Thymosin Beta-4 fragment that sequesters G-actin to promote cell migration. The two are complementary rather than competitive.",
    comparisonTable: [
      { row: "Class", aValue: "Synthetic 15-aa peptide (gastric-origin fragment)", bValue: "Synthetic 7-aa Thymosin Beta-4 fragment" },
      { row: "Sequence", aValue: "Gly-Glu-Pro-Pro-Pro-Gly-Lys-Pro-Ala-Asp-Asp-Ala-Gly-Leu-Val", bValue: "Ac-LKKTETQ (residues 17–23 of parent Tβ4)" },
      { row: "Mechanism", aValue: "VEGF / NO / GHR upregulation · cytoprotection", bValue: "G-actin sequestration · cell migration" },
      { row: "Half-life", aValue: "~4 hours (rat IP)", bValue: "~2 hours (rat)" },
      { row: "Primary research focus", aValue: "GI mucosal protection · tendon-ligament healing", bValue: "Cardiac repair · cell migration · anti-fibrotic" },
      { row: "FDA status", aValue: "FDA Cat 2 503A bulks list (Sept 2023) · research-use only", bValue: "Not FDA-approved · research-use only" },
      { row: "WADA status", aValue: "Prohibited at all times (S0)", bValue: "Prohibited at all times (S2)" },
      { row: "Stability in gastric juice", aValue: "Stable >24 hr (unusual)", bValue: "Not orally stable" },
    ],
    whichBetter: [
      { goal: "Tendon / ligament healing", winner: "tie", rationale: "Animal-model evidence for both. Mechanisms are complementary; most community protocols stack them rather than choose." },
      { goal: "GI mucosal protection", winner: "a", rationale: "BPC-157 has the Sikiric multi-paper rat-model evidence base for gastric and intestinal cytoprotection. TB-500 not specifically studied here." },
      { goal: "Cardiac repair (preclinical)", winner: "b", rationale: "Bock-Marquette 2004 Nature paper on Thymosin Beta-4 in mouse MI is the landmark. BPC-157 has some cardiac-protective signal but TB-500 / Tβ4 owns this category." },
      { goal: "Cell-migration biology", winner: "b", rationale: "Direct actin-cytoskeleton-driven cell migration is TB-500's mechanism. BPC-157 acts more permissively via VEGF and other signaling." },
    ],
    stacking: "BPC-157 + TB-500 is the most commonly referenced recovery research stack in community protocols (see the Classic Recovery stack). No published RCT validates the specific combination, but the mechanistic complementarity is the basis.",
    searchVolume: "Very high · primary commercial-intent query in the recovery cluster",
  },

  {
    slug: "retatrutide-vs-tirzepatide",
    a: "retatrutide",
    b: "tirzepatide",
    verdict: "Both are next-generation incretin agonists from Eli Lilly. Tirzepatide is the dual GLP-1R + GIPR agonist already FDA-approved as Mounjaro (T2D) and Zepbound (weight management). Retatrutide adds glucagon-receptor (GCGR) agonism as a third arm — investigational, currently in Phase 3 TRIUMPH. Phase 2 retatrutide showed deeper body-weight reduction than published tirzepatide data at comparable timepoints.",
    comparisonTable: [
      { row: "Class", aValue: "Triple GLP-1R + GIPR + GCGR agonist", bValue: "Dual GLP-1R + GIPR agonist" },
      { row: "Development code", aValue: "LY3437943", bValue: "LY3298176" },
      { row: "Half-life", aValue: "~6 days", bValue: "~5 days" },
      { row: "Route", aValue: "Subcutaneous (weekly)", bValue: "Subcutaneous (weekly)" },
      { row: "Best published Phase 2/3 outcome", aValue: "-24.2% LS mean BW at 48 wk (12 mg arm, Jastreboff 2023)", bValue: "-22.5% BW at 72 wk (SURMOUNT-1, 15 mg)" },
      { row: "FDA status", aValue: "Investigational · Phase 3 TRIUMPH ongoing", bValue: "FDA-approved (Mounjaro 2022, Zepbound 2023)" },
      { row: "WADA status", aValue: "Not listed (2026)", bValue: "Not listed (2026)" },
    ],
    whichBetter: [
      { goal: "Maximum body-weight reduction (preclinical)", winner: "a", rationale: "Phase 2 retatrutide outperformed published tirzepatide data at equivalent timepoints. The glucagon-receptor arm adds thermogenic / energy-expenditure component on top of incretin effects." },
      { goal: "Validated human-prescription pathway", winner: "b", rationale: "Tirzepatide is FDA-approved with millions of prescriptions and a documented safety profile. Retatrutide is investigational." },
      { goal: "Glycemic control (T2D)", winner: "b", rationale: "Tirzepatide has the SURPASS Phase 3 program and head-to-head data vs semaglutide. Retatrutide Phase 3 metabolic outcomes pending." },
      { goal: "Long-term safety record", winner: "b", rationale: "Tirzepatide has years of post-marketing surveillance. Retatrutide does not yet." },
    ],
    stacking: "Combining multiple incretin agonists is not supported by published research. They engage overlapping pathways and combined use is unstudied. Buyers researching the incretin category typically order both for in-vitro characterization, not simultaneous use.",
    searchVolume: "High · growing fast since retatrutide Phase 2 publication",
  },

  {
    slug: "selank-vs-semax",
    a: "selank",
    b: "semax",
    verdict: "Selank and Semax are sister Russian-developed heptapeptides built on the same C-terminal Pro-Gly-Pro stabilizing strategy. Different parent sequences and different mechanisms: Selank is tuftsin-derived (GABAergic anxiolytic). Semax is ACTH(4-10)-derived (BDNF / TrkB neurotrophic). Often referenced together as the 'Russian heptapeptide pair' for complementary cognitive + stress-pathway effects.",
    comparisonTable: [
      { row: "Parent sequence", aValue: "Tuftsin (Thr-Lys-Pro-Arg)", bValue: "ACTH(4-10) (Met-Glu-His-Phe-Arg-Trp-Gly)" },
      { row: "Sequence", aValue: "Thr-Lys-Pro-Arg-Pro-Gly-Pro", bValue: "Met-Glu-His-Phe-Pro-Gly-Pro" },
      { row: "Primary mechanism", aValue: "GABA-A receptor modulation · HPA-axis stress response", bValue: "BDNF / TrkB upregulation · neurotrophic" },
      { row: "Research focus", aValue: "Anxiolytic · immunomodulation", bValue: "Cognitive · neuroprotection · stroke recovery" },
      { row: "Russian registration", aValue: "Registered as research compound (RAS)", bValue: "Registered as clinical neuropeptide since 1994" },
      { row: "FDA status", aValue: "Research-use only", bValue: "Research-use only" },
      { row: "WADA status", aValue: "Not listed (2026)", bValue: "Not listed (2026)" },
    ],
    whichBetter: [
      { goal: "Anxiety / stress research", winner: "a", rationale: "Selank's mechanism — GABAergic modulation — is the more direct anxiety target. Russian rodent EPM and conditioned-suppression data describe potency comparable to short-acting benzodiazepines at the doses tested." },
      { goal: "Cognitive / memory research", winner: "b", rationale: "Semax has the documented BDNF + TrkB upregulation in rat hippocampus and basal forebrain (Dolotov 2006 series). Specific binding sites identified at KD ≈ 2.4 nM." },
      { goal: "Stroke-recovery research", winner: "b", rationale: "Russian clinical literature describes Semax in stroke recovery protocols specifically. Selank not studied here." },
    ],
    stacking: "Selank + Semax is the standard 'Russian heptapeptide pair' framing. Different mechanisms, no head-to-head RCT for the combination, but commonly studied together in Russian preclinical literature for complementary cognitive + anxiolytic biology. See the Russian Heptapeptide Pair stack.",
  },

  {
    slug: "mots-c-vs-nad-plus",
    a: "mots-c",
    b: "nad-plus",
    verdict: "Both are longevity-research compounds acting on cellular bioenergetics — but at different layers of the system. NAD+ is the endogenous redox coenzyme and obligate substrate of sirtuins and PARPs. MOTS-c is a mitochondrial-encoded 16-amino-acid peptide that activates AMPK and modulates nuclear gene expression in response to mitochondrial state. Different molecular categories (coenzyme vs peptide), complementary biology.",
    comparisonTable: [
      { row: "Class", aValue: "Mitochondrial-derived 16-aa peptide (MDP)", bValue: "Endogenous redox coenzyme (not a peptide)" },
      { row: "Primary mechanism", aValue: "AMPK activation · nuclear translocation · folate-cycle inhibition", bValue: "Sirtuin / PARP substrate · electron-transfer cofactor" },
      { row: "Encoded by", aValue: "Mitochondrial 12S rRNA short open reading frame", bValue: "Salvage pathway (not encoded)" },
      { row: "Research focus", aValue: "Insulin sensitivity · exercise-mimetic · aging", bValue: "Sirtuin axis · DNA repair · cellular bioenergetics" },
      { row: "Best evidence", aValue: "Lee 2015 (Cell Metab) · Reynolds 2021 (Nat Commun)", bValue: "Yoshino, Baur, Imai 2018 (Cell Metab) · NMN/NR precursor trials" },
      { row: "Translational route", aValue: "Subcutaneous research peptide", bValue: "Precursor supplementation (NR, NMN) most common" },
    ],
    whichBetter: [
      { goal: "Insulin sensitivity research", winner: "a", rationale: "MOTS-c has direct evidence in diet-induced obese mice (Lee 2015 PMID 25738459) for reversing insulin resistance via AMPK activation." },
      { goal: "DNA repair / PARP axis", winner: "b", rationale: "PARPs are NAD+-dependent enzymes. DNA-damage response consumes NAD+ stoichiometrically. This is NAD+ biology." },
      { goal: "Exercise-mimetic research", winner: "a", rationale: "MOTS-c is the canonical mitochondrial-derived exercise mimetic. Released from mitochondria during exercise; exogenous administration reproduces some conditioning effects in sedentary aged rodents." },
      { goal: "Established sirtuin activation", winner: "b", rationale: "Sirtuins are NAD+-dependent class-III deacylases. Activity scales with NAD+ availability." },
    ],
    stacking: "NAD+ + MOTS-c is the Cellular Bioenergetics stack — upstream coenzyme (NAD+) + downstream signaling response (MOTS-c) for combined longevity-pathway research.",
  },

  {
    slug: "ghk-cu-vs-tb-500",
    a: "ghk-cu",
    b: "tb-500",
    verdict: "GHK-Cu and TB-500 both appear in dermal and tissue-remodeling research but with completely different mechanisms. GHK-Cu is a copper-binding tripeptide driving transcriptional induction of collagen, elastin, and matrix synthesis. TB-500 is an actin-cytoskeleton modulator promoting cell migration. The two are complementary — GHK-Cu builds the matrix, TB-500 moves the cells into it.",
    comparisonTable: [
      { row: "Class", aValue: "Tripeptide-copper complex", bValue: "Thymosin Beta-4 fragment (7-aa)" },
      { row: "Mechanism", aValue: "Cu²⁺-dependent transcriptional gene modulation", bValue: "G-actin sequestration · cell migration" },
      { row: "Primary target", aValue: "Dermal fibroblasts · skin matrix synthesis", bValue: "Endothelial + stem cells · migration to injury site" },
      { row: "Color (lyo)", aValue: "Cobalt blue (Cu²⁺ d-d absorption)", bValue: "White / off-white" },
      { row: "Reconstituted shelf-life", aValue: "14 days (copper degrades faster)", bValue: "28 days" },
      { row: "Topical use", aValue: "Yes · widely formulated in cosmetics", bValue: "No · injection-only research compound" },
      { row: "WADA status", aValue: "Not listed (2026)", bValue: "Prohibited at all times (S2)" },
    ],
    whichBetter: [
      { goal: "Skin matrix synthesis", winner: "a", rationale: "GHK-Cu directly induces collagen, elastin, and glycosaminoglycan synthesis in dermal fibroblasts. This is its core mechanism." },
      { goal: "Wound-bed cell recruitment", winner: "b", rationale: "TB-500's actin-cytoskeleton mechanism drives endothelial and stem-cell migration into injury sites — the cell-recruitment phase of healing." },
      { goal: "Hair-loss research", winner: "a", rationale: "GHK-Cu enlarges hair follicles and prolongs the anagen phase in rodent models. TB-500 not specifically studied in hair biology." },
      { goal: "Cardiac repair", winner: "b", rationale: "Thymosin Beta-4 / TB-500 has the Bock-Marquette 2004 Nature paper on mouse MI. GHK-Cu not specifically studied in cardiac repair." },
    ],
    stacking: "GHK-Cu + TB-500 + BPC-157 is the Wolverine Blend formulation — combining matrix synthesis (GHK-Cu) with cell migration (TB-500) and cytoprotection (BPC-157) across the major stages of tissue repair.",
  },

  {
    slug: "igf-1-lr3-vs-ipa-cjc1295",
    a: "igf-1-lr3",
    b: "ipa-cjc1295",
    verdict: "Both target the GH/IGF-1 axis but at different layers. IGF-1 LR3 is the modified IGF-1 analog that directly engages the IGF-1 receptor, bypassing the GH axis entirely. Ipamorelin + CJC-1295 are upstream secretagogues — they stimulate the pituitary to release endogenous GH, which drives hepatic IGF-1 production. Direct downstream vs upstream pulsatile.",
    comparisonTable: [
      { row: "Mechanism layer", aValue: "Downstream · direct IGF-1R agonism", bValue: "Upstream · GHRH-R + ghrelin-R agonism → pituitary GH pulse" },
      { row: "Half-life", aValue: "~6 hours (LR3 modification)", bValue: "Ipa ~2 hr · CJC-1295 No DAC ~30 min" },
      { row: "Receptor engaged", aValue: "IGF-1 receptor (tyrosine kinase)", bValue: "GHRH-R + GHS-R1a (GPCRs)" },
      { row: "Hypoglycemia risk", aValue: "Yes (binds insulin receptor at higher doses)", bValue: "Low" },
      { row: "Pulse vs sustained", aValue: "Sustained 6-hour exposure", bValue: "Pulsatile (mimics natural rhythm)" },
      { row: "WADA status", aValue: "Prohibited at all times (S2)", bValue: "Prohibited at all times (S2)" },
    ],
    whichBetter: [
      { goal: "Maximum IGF-1 receptor activation", winner: "a", rationale: "Direct receptor engagement bypasses any rate-limiting steps in the GH-axis. Higher peak receptor occupancy per dose." },
      { goal: "Physiological pulsatile rhythm", winner: "b", rationale: "Ipa + CJC-1295 No DAC produces a GH pulse that approximates the natural diurnal pattern, which downstream IGF-1 inherits." },
      { goal: "Safety profile (community-reported)", winner: "b", rationale: "Selective ghrelin agonism (ipamorelin) avoids cortisol and prolactin elevation seen with older GHS. GHRH agonism (CJC-1295) acts upstream so endogenous feedback regulates total exposure." },
    ],
    stacking: "Not commonly stacked together in community protocols — they target the same axis at different layers. IGF-1 LR3 is typically used as a standalone direct-IGF-1R compound; Ipa/CJC-1295 as a pulsatile-GH-axis pair.",
  },

  {
    slug: "tesamorelin-vs-cjc-1295",
    a: "tesamorelin",
    b: "ipa-cjc1295",
    verdict: "Both are GHRH-axis research compounds, but tesamorelin is FDA-approved (Egrifta®) while CJC-1295 No DAC is research-use only. Tesamorelin is a stabilized GHRH(1-44) — the full natural 44-aa hormone sequence. CJC-1295 No DAC is a GHRH(1-29) analog — the shorter active fragment with stabilizing substitutions. The IPA/CJC-1295 pair adds ghrelin-receptor agonism via ipamorelin.",
    comparisonTable: [
      { row: "Parent sequence", aValue: "GHRH(1-44) — full natural hormone", bValue: "GHRH(1-29) — active fragment" },
      { row: "Length", aValue: "44 amino acids", bValue: "29 amino acids (CJC-1295) + 5 amino acids (ipamorelin)" },
      { row: "Half-life", aValue: "~26 min", bValue: "CJC-1295 No DAC ~30 min · ipamorelin ~2 hr" },
      { row: "Receptor engaged", aValue: "GHRH-R only", bValue: "GHRH-R (CJC) + GHS-R1a (ipamorelin)" },
      { row: "FDA status", aValue: "Approved (Egrifta®, Egrifta SV®)", bValue: "Not FDA-approved · research-use only" },
      { row: "Approved indication", aValue: "Reduction of excess abdominal fat in HIV lipodystrophy", bValue: "None" },
      { row: "WADA status", aValue: "Prohibited at all times (S2)", bValue: "Prohibited at all times (S2)" },
    ],
    whichBetter: [
      { goal: "FDA-validated visceral-fat research", winner: "a", rationale: "Tesamorelin has the only FDA-approved label for visceral-adipose reduction. Pooled Phase 3 -15.4% VAT at 26 weeks (Falutz 2010 PMID 20554713)." },
      { goal: "Pulsatile dual-pathway GH activation", winner: "b", rationale: "IPA/CJC-1295 combines GHRH-receptor + ghrelin-receptor stimulation, producing larger GH pulses via dual-pathway activation. Tesamorelin engages GHRH-R only." },
      { goal: "Cost-per-pulse research budget", winner: "b", rationale: "Tesamorelin (Egrifta) is expensive at the branded human-prescription level. Research-grade CJC-1295 + ipamorelin is significantly cheaper for laboratory characterization." },
    ],
    stacking: "Tesamorelin + IPA/CJC-1295 = the GH-Axis Trifecta stack — three complementary upstream regulators of the GH pulse. Combining multiple GH-axis agonists is not supported by published research; the stack is a reference framing rather than a clinical protocol.",
  },
];

export const COMPARISONS_BY_SLUG: Record<string, Comparison> =
  Object.fromEntries(COMPARISONS.map((c) => [c.slug, c]));

/** All comparison slugs that involve a given compound. */
export function comparisonsForCompound(compoundSlug: string): Comparison[] {
  return COMPARISONS.filter((c) => c.a === compoundSlug || c.b === compoundSlug);
}
