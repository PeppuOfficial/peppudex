/**
 * Head-to-head comparison pairs · for /vs/[pair] pages.
 *
 * Each pair targets a high-volume "X vs Y" commercial-intent query.
 * URL pattern: /vs/{a}-vs-{b} · alphabetical sort to enforce canonical
 * ordering and prevent duplicate-content fragmentation.
 *
 * Per the strategy doc: "Each comparison is a separate indexed URL
 * targeting a high-intent commercial query. Nobody owns 'bpc 157 vs
 * tb 500' right now." · that's the moat.
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
    verdict: "BPC-157 and TB-500 are the two most-discussed recovery research peptides · different mechanisms, often stacked. BPC-157 is a 15-amino-acid pentadecapeptide acting through VEGF angiogenesis, growth-hormone-receptor upregulation, and the cytoprotection paradigm. TB-500 is a 7-amino-acid Thymosin Beta-4 fragment that sequesters G-actin to promote cell migration. The two are complementary rather than competitive.",
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
    verdict: "Both are next-generation incretin agonists from Eli Lilly. Tirzepatide is the dual GLP-1R + GIPR agonist already FDA-approved as Mounjaro (T2D) and Zepbound (weight management). Retatrutide adds glucagon-receptor (GCGR) agonism as a third arm · investigational, currently in Phase 3 TRIUMPH. Phase 2 retatrutide showed deeper body-weight reduction than published tirzepatide data at comparable timepoints.",
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
      { goal: "Anxiety / stress research", winner: "a", rationale: "Selank's mechanism · GABAergic modulation · is the more direct anxiety target. Russian rodent EPM and conditioned-suppression data describe potency comparable to short-acting benzodiazepines at the doses tested." },
      { goal: "Cognitive / memory research", winner: "b", rationale: "Semax has the documented BDNF + TrkB upregulation in rat hippocampus and basal forebrain (Dolotov 2006 series). Specific binding sites identified at KD ≈ 2.4 nM." },
      { goal: "Stroke-recovery research", winner: "b", rationale: "Russian clinical literature describes Semax in stroke recovery protocols specifically. Selank not studied here." },
    ],
    stacking: "Selank + Semax is the standard 'Russian heptapeptide pair' framing. Different mechanisms, no head-to-head RCT for the combination, but commonly studied together in Russian preclinical literature for complementary cognitive + anxiolytic biology. See the Russian Heptapeptide Pair stack.",
  },

  {
    slug: "mots-c-vs-nad-plus",
    a: "mots-c",
    b: "nad-plus",
    verdict: "Both are longevity-research compounds acting on cellular bioenergetics · but at different layers of the system. NAD+ is the endogenous redox coenzyme and obligate substrate of sirtuins and PARPs. MOTS-c is a mitochondrial-encoded 16-amino-acid peptide that activates AMPK and modulates nuclear gene expression in response to mitochondrial state. Different molecular categories (coenzyme vs peptide), complementary biology.",
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
    stacking: "NAD+ + MOTS-c is the Cellular Bioenergetics stack · upstream coenzyme (NAD+) + downstream signaling response (MOTS-c) for combined longevity-pathway research.",
  },

  {
    slug: "ghk-cu-vs-tb-500",
    a: "ghk-cu",
    b: "tb-500",
    verdict: "GHK-Cu and TB-500 both appear in dermal and tissue-remodeling research but with completely different mechanisms. GHK-Cu is a copper-binding tripeptide driving transcriptional induction of collagen, elastin, and matrix synthesis. TB-500 is an actin-cytoskeleton modulator promoting cell migration. The two are complementary · GHK-Cu builds the matrix, TB-500 moves the cells into it.",
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
      { goal: "Wound-bed cell recruitment", winner: "b", rationale: "TB-500's actin-cytoskeleton mechanism drives endothelial and stem-cell migration into injury sites · the cell-recruitment phase of healing." },
      { goal: "Hair-loss research", winner: "a", rationale: "GHK-Cu enlarges hair follicles and prolongs the anagen phase in rodent models. TB-500 not specifically studied in hair biology." },
      { goal: "Cardiac repair", winner: "b", rationale: "Thymosin Beta-4 / TB-500 has the Bock-Marquette 2004 Nature paper on mouse MI. GHK-Cu not specifically studied in cardiac repair." },
    ],
    stacking: "GHK-Cu + TB-500 + BPC-157 is the Wolverine Blend formulation · combining matrix synthesis (GHK-Cu) with cell migration (TB-500) and cytoprotection (BPC-157) across the major stages of tissue repair.",
  },

  {
    slug: "igf-1-lr3-vs-ipa-cjc1295",
    a: "igf-1-lr3",
    b: "ipa-cjc1295",
    verdict: "Both target the GH/IGF-1 axis but at different layers. IGF-1 LR3 is the modified IGF-1 analog that directly engages the IGF-1 receptor, bypassing the GH axis entirely. Ipamorelin + CJC-1295 are upstream secretagogues · they stimulate the pituitary to release endogenous GH, which drives hepatic IGF-1 production. Direct downstream vs upstream pulsatile.",
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
    stacking: "Not commonly stacked together in community protocols · they target the same axis at different layers. IGF-1 LR3 is typically used as a standalone direct-IGF-1R compound; Ipa/CJC-1295 as a pulsatile-GH-axis pair.",
  },

  {
    slug: "tesamorelin-vs-cjc-1295",
    a: "tesamorelin",
    b: "ipa-cjc1295",
    verdict: "Both are GHRH-axis research compounds, but tesamorelin is FDA-approved (Egrifta®) while CJC-1295 No DAC is research-use only. Tesamorelin is a stabilized GHRH(1-44) · the full natural 44-aa hormone sequence. CJC-1295 No DAC is a GHRH(1-29) analog · the shorter active fragment with stabilizing substitutions. The IPA/CJC-1295 pair adds ghrelin-receptor agonism via ipamorelin.",
    comparisonTable: [
      { row: "Parent sequence", aValue: "GHRH(1-44) · full natural hormone", bValue: "GHRH(1-29) · active fragment" },
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
    stacking: "Tesamorelin + IPA/CJC-1295 = the GH-Axis Trifecta stack · three complementary upstream regulators of the GH pulse. Combining multiple GH-axis agonists is not supported by published research; the stack is a reference framing rather than a clinical protocol.",
  },

  // ─── 2026-05 EXPANSION · +13 SEO COMPARISON PAGES ───
  {
    slug: "ghk-cu-vs-bpc-157",
    a: "ghk-cu",
    b: "bpc-157",
    verdict: "GHK-Cu and BPC-157 are two of the most-asked tissue-repair research peptides. GHK-Cu is a copper-binding tripeptide that drives transcriptional collagen + matrix synthesis in dermal fibroblasts (skin-side biology). BPC-157 is a 15-aa gastric-origin pentadecapeptide acting through VEGF, NO, and growth-hormone-receptor upregulation (gut + connective-tissue cytoprotection). Different tissue targets, complementary mechanisms.",
    comparisonTable: [
      { row: "Class", aValue: "Tripeptide-copper complex (Gly-His-Lys + Cu²⁺)", bValue: "Synthetic 15-aa peptide (gastric-origin fragment)" },
      { row: "Sequence", aValue: "Gly-His-Lys + Cu²⁺", bValue: "Gly-Glu-Pro-Pro-Pro-Gly-Lys-Pro-Ala-Asp-Asp-Ala-Gly-Leu-Val" },
      { row: "Mechanism", aValue: "Cu²⁺-dependent transcriptional gene modulation · collagen + matrix induction", bValue: "VEGF / NO / GHR upregulation · cytoprotection paradigm" },
      { row: "Half-life", aValue: "Short (minutes) plasma; longer in tissue depots", bValue: "~4 hours (rat, intraperitoneal)" },
      { row: "Primary research focus", aValue: "Skin matrix synthesis · hair-follicle biology · cosmetic", bValue: "GI mucosal protection · tendon-ligament healing" },
      { row: "FDA status", aValue: "Topical regulated as cosmetic ingredient · injectable research-use only", bValue: "FDA Cat 2 503A bulks list (Sept 2023) · research-use only" },
      { row: "WADA status", aValue: "Not listed (2026)", bValue: "Prohibited at all times (S0)" },
      { row: "Topical use", aValue: "Yes · widely formulated in cosmetics at 0.01–0.1%", bValue: "No · injection-only research compound" },
    ],
    whichBetter: [
      { goal: "Skin matrix + collagen research", winner: "a", rationale: "GHK-Cu directly induces collagen, elastin, and glycosaminoglycan synthesis in dermal fibroblasts (Pickart 2008 PMID 18644225). This is the core characterized mechanism." },
      { goal: "GI mucosal protection research", winner: "b", rationale: "BPC-157 has the Sikiric multi-paper rat-model evidence base for gastric and intestinal cytoprotection. GHK-Cu is not specifically studied in gut biology." },
      { goal: "Tendon / ligament research", winner: "b", rationale: "Animal-model evidence for BPC-157 in Achilles detachment (Krivic 2006 PMID 16583442) and transected quadriceps (Staresinic 2006 PMID 16609979). GHK-Cu not specifically studied in tendon repair." },
      { goal: "Hair-follicle research", winner: "a", rationale: "GHK-Cu enlarges hair follicles and prolongs the anagen phase in rodent models. BPC-157 not specifically studied in hair biology." },
    ],
    stacking: "GHK-Cu + BPC-157 + TB-500 is the Wolverine Blend formulation · combining matrix synthesis (GHK-Cu), cytoprotection (BPC-157), and cell migration (TB-500) across the major stages of tissue repair. No peer-reviewed publication studies the three-component blend as a unit.",
    searchVolume: "High · cross-cluster search-intent (skin + recovery)",
  },

  {
    slug: "cagrilintide-vs-retatrutide",
    a: "cagrilintide",
    b: "retatrutide",
    verdict: "Cagrilintide and retatrutide target body-composition research through completely different receptor systems. Cagrilintide is a long-acting amylin analog (amylin + calcitonin receptors · satiety pathway). Retatrutide is a triple GLP-1 + GIP + glucagon agonist (incretin + thermogenesis pathway). Cagrilintide is most commonly studied in combination with semaglutide as CagriSema.",
    comparisonTable: [
      { row: "Class", aValue: "Long-acting amylin analog", bValue: "Triple GLP-1R + GIPR + GCGR agonist" },
      { row: "Development code", aValue: "AM833", bValue: "LY3437943" },
      { row: "Half-life", aValue: "~7 days (once-weekly)", bValue: "~6 days (once-weekly)" },
      { row: "Receptors engaged", aValue: "Amylin + calcitonin receptors", bValue: "GLP-1R + GIPR + GCGR" },
      { row: "Best Phase 2 monotherapy outcome", aValue: "-10.8% placebo-subtracted weight loss at 26 wk (Lau 2021 Lancet)", bValue: "-24.2% LS mean BW at 48 wk, 12 mg arm (Jastreboff 2023 NEJM)" },
      { row: "FDA status", aValue: "Investigational · Phase 3 REDEFINE ongoing", bValue: "Investigational · Phase 3 TRIUMPH ongoing" },
      { row: "WADA status", aValue: "Not listed (2026)", bValue: "Not listed (2026)" },
    ],
    whichBetter: [
      { goal: "Maximum monotherapy weight reduction (preclinical)", winner: "b", rationale: "Phase 2 retatrutide at the 12 mg arm reached LS-mean -24.2% body-weight reduction at 48 weeks. Cagrilintide monotherapy reached -10.8% at 26 weeks in its Phase 2." },
      { goal: "Combinatorial / GLP-1-add-on research", winner: "a", rationale: "Cagrilintide was developed specifically as a satiety complement to semaglutide. The CagriSema combination (Frias 2023 Lancet, PMID 37364590) outperforms either monotherapy in T2D + obesity Phase 2." },
      { goal: "Distinct receptor-system coverage", winner: "a", rationale: "Amylin/calcitonin agonism covers a satiety pathway that incretin agonists do not engage directly. For receptor-system breadth in a research panel, cagrilintide adds a non-overlapping mechanism." },
      { goal: "Single-molecule simplicity", winner: "b", rationale: "Retatrutide is a single peptide engineered to engage three receptors. Cagrilintide is typically studied as the second component of a two-peptide combination (CagriSema)." },
    ],
    stacking: "CagriSema (cagrilintide + semaglutide) is the established combinatorial framing for cagrilintide. There is no published research stacking cagrilintide with retatrutide; combining multiple body-composition agonists is not supported by published clinical trials.",
    searchVolume: "Growing fast · both compounds covered in 2025-2026 obesity research press",
  },

  {
    slug: "survodutide-vs-tirzepatide",
    a: "survodutide",
    b: "tirzepatide",
    verdict: "Survodutide and tirzepatide are both next-generation dual incretin research compounds, with different receptor pairings. Survodutide is a GLP-1 + glucagon dual agonist (Boehringer Ingelheim BI 456906). Tirzepatide is a GLP-1 + GIP dual agonist (Eli Lilly Mounjaro / Zepbound). The glucagon-receptor arm in survodutide adds a thermogenic / energy-expenditure component absent from tirzepatide.",
    comparisonTable: [
      { row: "Class", aValue: "GLP-1 + glucagon dual agonist", bValue: "GLP-1 + GIP dual agonist" },
      { row: "Development code", aValue: "BI 456906", bValue: "LY3298176" },
      { row: "Half-life", aValue: "~7 days (once-weekly)", bValue: "~5 days (once-weekly)" },
      { row: "Receptors engaged", aValue: "GLP-1R + glucagon receptor (GCGR)", bValue: "GLP-1R + GIPR" },
      { row: "Best published Phase 2/3 outcome", aValue: "-14.9% placebo-subtracted BW at 4.8 mg/wk, 46 wk (Le Roux 2024 Lancet D&E)", bValue: "-22.5% BW at 72 wk, 15 mg (SURMOUNT-1)" },
      { row: "FDA status", aValue: "Investigational · Phase 3 SYNCHRONIZE-1/2 enrolling", bValue: "FDA-approved (Mounjaro 2022, Zepbound 2023)" },
      { row: "NASH/MASH activity", aValue: "Phase 2 reported improved liver fat + histology (Sanyal NEJM 2024)", bValue: "Not the lead Phase 3 indication" },
      { row: "WADA status", aValue: "Not listed (2026)", bValue: "Not listed (2026)" },
    ],
    whichBetter: [
      { goal: "Validated human-prescription pathway", winner: "b", rationale: "Tirzepatide has FDA approval, the SURPASS / SURMOUNT Phase 3 program, and millions of post-marketing prescriptions. Survodutide is investigational." },
      { goal: "Thermogenic / energy-expenditure axis", winner: "a", rationale: "Glucagon-receptor agonism drives hepatic lipolysis and energy expenditure on top of appetite suppression. GIP agonism (tirzepatide) acts more through adipocyte lipid handling and insulin secretion." },
      { goal: "NASH/MASH research", winner: "a", rationale: "Survodutide Phase 2 (Sanyal 2024 NEJM) reported improved liver fat fraction and histology endpoints, supporting a dedicated NASH Phase 3 program." },
      { goal: "T2D glycemic control track record", winner: "b", rationale: "Tirzepatide has the SURPASS Phase 3 program including head-to-head data versus semaglutide (SURPASS-2, NEJM 2021)." },
    ],
    stacking: "Combining multiple incretin agonists is not supported by published research. They engage overlapping GLP-1 pathways and combined use is unstudied. Buyers researching the dual-incretin category typically order both as parallel reference compounds, not for simultaneous use.",
    searchVolume: "Growing · obesity research category compares each new entrant to tirzepatide",
  },

  {
    slug: "orforglipron-vs-tirzepatide",
    a: "orforglipron",
    b: "tirzepatide",
    verdict: "Orforglipron and tirzepatide come from the same Eli Lilly pipeline but represent two different pharmacology bets. Orforglipron is a small-molecule oral GLP-1 receptor allosteric agonist (once-daily tablet). Tirzepatide is a peptide dual GLP-1 + GIP receptor agonist (once-weekly subcutaneous injection). Oral convenience vs injectable dual-receptor coverage.",
    comparisonTable: [
      { row: "Class", aValue: "Non-peptide small-molecule oral GLP-1R agonist", bValue: "Synthetic peptide · dual GLP-1R + GIPR agonist" },
      { row: "Development code", aValue: "LY3502970", bValue: "LY3298176" },
      { row: "Route", aValue: "Oral (once-daily tablet)", bValue: "Subcutaneous (once-weekly injection)" },
      { row: "Half-life", aValue: "~24-30 hours", bValue: "~5 days" },
      { row: "Receptors engaged", aValue: "GLP-1R only (allosteric site)", bValue: "GLP-1R + GIPR" },
      { row: "Best published Phase 2 outcome", aValue: "-14.7% placebo-subtracted BW at 45 mg/d, 36 wk (Wharton 2023 NEJM)", bValue: "-22.5% BW at 72 wk, 15 mg (SURMOUNT-1)" },
      { row: "FDA status", aValue: "Investigational · Phase 3 ACHIEVE / ATTAIN ongoing", bValue: "FDA-approved (Mounjaro 2022, Zepbound 2023)" },
      { row: "Oral-medication absorption notes", aValue: "No dietary restriction reported in Phase 2", bValue: "Not oral; delayed gastric emptying may alter co-administered oral drug absorption" },
    ],
    whichBetter: [
      { goal: "Oral convenience for research / patient compliance", winner: "a", rationale: "Orforglipron is the first oral GLP-1 candidate that does not require the specialized absorption formulation of oral semaglutide (no empty-stomach, no 30-min wait, no limited water). Major compliance edge if it reaches approval." },
      { goal: "Maximum body-weight reduction (head-to-head Phase 2 numbers)", winner: "b", rationale: "Tirzepatide 15 mg reached -22.5% BW at 72 weeks in SURMOUNT-1. Orforglipron 45 mg reached -14.7% placebo-subtracted at 36 weeks. Different trial durations but the absolute number favors tirzepatide." },
      { goal: "Validated human-prescription pathway", winner: "b", rationale: "Tirzepatide is FDA-approved with years of post-marketing data. Orforglipron remains investigational." },
      { goal: "Single-receptor mechanism simplicity", winner: "a", rationale: "Orforglipron acts only at GLP-1R via an allosteric site. For research isolating GLP-1R contribution from other incretin receptors, orforglipron is the cleaner pharmacological probe." },
    ],
    stacking: "Combining multiple GLP-1R agonists is not supported by published research; the pathway is the same and combined use is unstudied. Buyers researching the GLP-1 category often order both as parallel oral vs injectable reference compounds.",
    searchVolume: "High · oral GLP-1 is one of the most-searched 2026 obesity-research queries",
  },

  {
    slug: "mazdutide-vs-survodutide",
    a: "mazdutide",
    b: "survodutide",
    verdict: "Mazdutide and survodutide are two parallel GLP-1 + glucagon dual receptor agonists in late-stage development, by different sponsors. Mazdutide (IBI362, Innovent Biologics under license from Eli Lilly) is in Phase 3 GLORY in China. Survodutide (BI 456906, Boehringer Ingelheim / Zealand) is in Phase 3 SYNCHRONIZE globally. Different molecules, similar mechanism, different regulatory geography.",
    comparisonTable: [
      { row: "Class", aValue: "GLP-1 + glucagon dual agonist", bValue: "GLP-1 + glucagon dual agonist" },
      { row: "Development code", aValue: "IBI362 / LY3305677", bValue: "BI 456906" },
      { row: "Sponsor", aValue: "Innovent Biologics (CN) under Lilly license", bValue: "Boehringer Ingelheim / Zealand Pharma" },
      { row: "Half-life", aValue: "~7 days (once-weekly)", bValue: "~7 days (once-weekly)" },
      { row: "Best Phase 2 outcome", aValue: "-11.1% placebo-subtracted BW at 9 mg/wk, 24 wk (Zhao 2024 Chinese Phase 2)", bValue: "-14.9% placebo-subtracted BW at 4.8 mg/wk, 46 wk (Le Roux 2024 Lancet D&E)" },
      { row: "Phase 3 status", aValue: "Phase 3 GLORY-1 met primary endpoint in Chinese adults; NMPA review ongoing", bValue: "Phase 3 SYNCHRONIZE-1 / SYNCHRONIZE-2 enrolling" },
      { row: "Regulatory geography", aValue: "China-first; not FDA-approved", bValue: "Global investigational; not FDA-approved" },
      { row: "WADA status", aValue: "Not listed (2026)", bValue: "Not listed (2026)" },
    ],
    whichBetter: [
      { goal: "China-population data", winner: "a", rationale: "Mazdutide has dedicated Chinese-population Phase 2 and Phase 3 data (Zhao 2024 Phase 2 in Chinese adults; GLORY-1 met primary endpoint). Survodutide global Phase 2 was multi-region." },
      { goal: "NASH / liver-fat research", winner: "b", rationale: "Survodutide Phase 2 (Sanyal 2024 NEJM) reported improved liver fat and histology endpoints. Mazdutide NASH data not yet published at equivalent depth." },
      { goal: "Western regulatory pathway", winner: "b", rationale: "Survodutide Phase 3 SYNCHRONIZE program is enrolling for global / Western approval. Mazdutide pathway is China-first via NMPA." },
      { goal: "Placebo-subtracted weight loss headline number", winner: "b", rationale: "Survodutide 4.8 mg/wk reached -14.9% at 46 weeks. Mazdutide 9 mg/wk reached -11.1% at 24 weeks. Trial durations differ but the survodutide arm produced a larger absolute number." },
    ],
    stacking: "No published research stacks two GLP-1/glucagon dual agonists. They engage the same receptor pair; combined use is unstudied. Buyers researching the dual-agonist category typically order both as parallel reference compounds.",
    searchVolume: "Niche but rising · dual-agonist research category comparisons",
  },

  {
    slug: "wolverine-blend-vs-klow-blend",
    a: "wolverine-blend",
    b: "klow-blend",
    verdict: "Wolverine and KLOW are the two most-asked multi-component peptide blends. Wolverine is a three-component connective-tissue stack (BPC-157 + TB-500 + GHK-Cu). KLOW is a four-component skin / HPG-axis stack (Kisspeptin-10 + Laminin-derived peptide + Oxytocin + GHK-Cu). Different target systems, overlapping only in the GHK-Cu component.",
    comparisonTable: [
      { row: "Class", aValue: "Three-component combinatorial regen research panel", bValue: "Four-component combinatorial peptide research panel" },
      { row: "Components", aValue: "BPC-157 + TB-500 + GHK-Cu", bValue: "Kisspeptin-10 + Laminin-derived peptide + Oxytocin + GHK-Cu" },
      { row: "Primary target system", aValue: "Tendon / ligament / wound · connective-tissue repair", bValue: "Skin matrix + HPG-axis + social-bonding pathways" },
      { row: "Mechanism breadth", aValue: "Cytoprotection (BPC) + cell migration (TB) + matrix synthesis (GHK-Cu)", bValue: "HPG activation (Kisspeptin) + basement-membrane signaling (Laminin) + OXTR (Oxytocin) + matrix synthesis (GHK-Cu)" },
      { row: "Reconstituted shelf-life", aValue: "14 days (limited by GHK-Cu)", bValue: "14 days (limited by GHK-Cu)" },
      { row: "FDA status", aValue: "Not FDA-approved as a combined product · per-component status varies", bValue: "Not FDA-approved as a combined product · per-component status varies" },
      { row: "WADA status", aValue: "BPC-157 prohibited under S0 · TB-500 prohibited under S2 · GHK-Cu not listed", bValue: "Per-component status varies · most not currently listed" },
      { row: "Per-component blend research", aValue: "No peer-reviewed publication studies the blend as a unit", bValue: "No peer-reviewed publication studies the blend as a unit" },
    ],
    whichBetter: [
      { goal: "Connective-tissue / tendon / ligament research", winner: "a", rationale: "Wolverine combines three peptides with documented animal-model evidence in tendon, ligament, and dermal repair contexts. KLOW does not target connective-tissue repair directly." },
      { goal: "HPG-axis / reproductive-endocrinology research", winner: "b", rationale: "KLOW includes Kisspeptin-10 (upstream GnRH-axis activator) and Oxytocin (OXTR signaling). Wolverine does not engage the HPG or social-bonding axes." },
      { goal: "Skin / matrix synthesis research", winner: "b", rationale: "Both contain GHK-Cu, but KLOW pairs it with laminin-derived peptide (basement-membrane biology) for a stronger skin-matrix research framing. Wolverine pairs GHK-Cu with regen peptides oriented to wound repair." },
      { goal: "WADA-clean profile", winner: "tie", rationale: "Wolverine contains two WADA-prohibited components (BPC-157, TB-500). KLOW components are generally not listed, though kisspeptin status falls under regulator discretion. Either blend should be assumed prohibited or under-discretion in competition." },
    ],
    stacking: "Wolverine and KLOW are themselves the canonical multi-component stacks in their respective categories. There is no published research running both blends in parallel. Combinatorial pharmacology of mixed-component peptide vials is not standardized; buyers using either blend in published research should disclose the specific per-batch composition.",
  },

  {
    slug: "epitalon-vs-thymosin-alpha-1",
    a: "epitalon",
    b: "thymosin-alpha-1",
    verdict: "Epitalon and Thymosin alpha-1 are two of the most-asked longevity / immune research peptides, with completely different lineages. Epitalon is a synthetic 4-aa Khavinson tetrapeptide (Ala-Glu-Asp-Gly) developed at the St. Petersburg Institute of Bioregulation and Gerontology for pineal-axis longevity research. Thymosin alpha-1 (Tα1) is a 28-aa thymic peptide approved as Zadaxin in 35+ countries as an immunomodulator.",
    comparisonTable: [
      { row: "Class", aValue: "Synthetic Khavinson tetrapeptide (4 aa)", bValue: "Synthetic 28-residue thymic peptide · immunomodulator" },
      { row: "Sequence", aValue: "Ala-Glu-Asp-Gly (AEDG)", bValue: "28-aa Ac-Ser-Asp-Ala...Asn (thymalfasin)" },
      { row: "Primary mechanism", aValue: "Telomerase modulation · pineal axis · circadian gene expression (proposed)", bValue: "TLR9 agonism · dendritic-cell maturation · T-cell + NK-cell activation" },
      { row: "Half-life", aValue: "Very short (minutes) plasma; tissue-localized longer", bValue: "~2 hours plasma (subcutaneous)" },
      { row: "Best evidence", aValue: "Khavinson 2003 PMID 14523389 · 12-year Russian observational mortality study (preliminary)", bValue: "Multiple Phase 3 trials supporting Zadaxin approval; Wu 2013 PMID 23327199 sepsis trial" },
      { row: "FDA status", aValue: "Not FDA-approved · research-use only", bValue: "Not FDA-approved in US · approved as Zadaxin in 35+ countries" },
      { row: "WADA status", aValue: "Not listed (2026)", bValue: "Not listed (2026)" },
      { row: "Research focus", aValue: "Aging / longevity / pineal", bValue: "Chronic hepatitis B/C · sepsis · immunocompromised support" },
    ],
    whichBetter: [
      { goal: "Approved-product clinical evidence", winner: "b", rationale: "Thymosin alpha-1 has Phase 3 trials supporting Zadaxin approval in 35+ countries. Epitalon evidence is dominated by Khavinson-group Russian-language work without comparable Western RCT replication." },
      { goal: "Longevity / pineal research", winner: "a", rationale: "Epitalon is the canonical research peptide in the Khavinson pineal-axis longevity tradition. Thymosin alpha-1 is not specifically a longevity compound." },
      { goal: "Immune system research", winner: "b", rationale: "Thymosin alpha-1 has documented TLR9 agonism, dendritic-cell maturation, and T-cell + NK-cell activation. Epitalon does not have a characterized immune mechanism." },
      { goal: "Telomerase axis", winner: "a", rationale: "Khavinson 2003 reported telomerase upregulation in human peripheral blood lymphocytes with epitalon. Thymosin alpha-1 does not engage the telomerase axis." },
    ],
    stacking: "Epitalon and Thymosin alpha-1 act on different systems (pineal/telomerase vs immune) and are not commonly co-administered in published research. Both are used as standalone reference compounds within their respective categories.",
    searchVolume: "Niche · high-intent within the longevity-research community",
  },

  {
    slug: "kisspeptin-10-vs-pt-141",
    a: "kisspeptin-10",
    b: "pt-141",
    verdict: "Kisspeptin-10 and PT-141 are the two most-asked sexual-function research peptides, but they act at completely different layers of the CNS-endocrine axis. Kisspeptin-10 acts upstream on the HPG-axis (GPR54 / KISS1R → GnRH → LH/FSH → gonadal steroids). PT-141 (bremelanotide) acts centrally on melanocortin MC3/MC4 receptors in the hypothalamus to drive arousal pathways (dopamine + oxytocin). One is endocrine; the other is neuro-arousal.",
    comparisonTable: [
      { row: "Class", aValue: "Synthetic kisspeptin C-terminal active fragment (10 aa)", bValue: "Cyclic melanocortin 3/4 receptor agonist (7 aa)" },
      { row: "Sequence", aValue: "Tyr-Asn-Trp-Asn-Ser-Phe-Gly-Leu-Arg-Phe-NH₂", bValue: "Ac-Nle-cyclo[Asp-His-D-Phe-Arg-Trp-Lys]-OH" },
      { row: "Mechanism layer", aValue: "Upstream HPG-axis · GnRH neuron firing", bValue: "Central CNS · MC3/MC4 hypothalamic arousal" },
      { row: "Half-life", aValue: "Very short (minutes) plasma", bValue: "~2.7 hours (subcutaneous)" },
      { row: "Best evidence", aValue: "Dhillo 2005 PMID 15883247 (LH/FSH pulse in healthy men) · Abbara IVF Phase 2 with kisspeptin-54", bValue: "RECONNECT-1 / RECONNECT-2 Phase 3 · FDA-approved Vyleesi 2019 PMID 31022173" },
      { row: "FDA status", aValue: "Not FDA-approved · research-use only", bValue: "FDA-approved as Vyleesi for HSDD in premenopausal women (June 2019)" },
      { row: "Research focus", aValue: "Reproductive endocrinology · IVF · hypogonadotropic hypogonadism", bValue: "HSDD · sexual desire research · ED (Phase 2)" },
      { row: "WADA status", aValue: "Not specifically named; GnRH-axis status falls under S2 regulator discretion", bValue: "Not currently listed (2026)" },
    ],
    whichBetter: [
      { goal: "FDA-approved sexual-function compound", winner: "b", rationale: "PT-141 (bremelanotide) is FDA-approved as Vyleesi for HSDD in premenopausal women (June 2019). Kisspeptin-10 is research-use only." },
      { goal: "HPG-axis / endogenous steroid research", winner: "a", rationale: "Kisspeptin-10 is the canonical upstream activator of GnRH-axis. Single SC doses produce LH/FSH pulses (Dhillo 2005). PT-141 does not engage the HPG-axis directly." },
      { goal: "IVF / oocyte-maturation research", winner: "a", rationale: "Kisspeptin (the 54-aa form specifically) has Phase 2 data as an oocyte-maturation trigger in IVF (Abbara 2014/2017). PT-141 not used in this context." },
      { goal: "Central arousal / desire research", winner: "b", rationale: "PT-141 has the RECONNECT Phase 3 program showing improvement in FSFI desire score · the primary endpoint for HSDD approval. Kisspeptin-10's link to sexual function is via downstream sex hormones, not central arousal directly." },
    ],
    stacking: "Kisspeptin-10 and PT-141 act on different systems (endocrine vs central arousal) and are not commonly co-administered in published research. Both are used as standalone compounds within their respective categories.",
    searchVolume: "Mid-to-high · niche but high-intent sexual-health research queries",
  },

  {
    slug: "igf-1-lr3-vs-aod-9604",
    a: "igf-1-lr3",
    b: "aod-9604",
    verdict: "IGF-1 LR3 and AOD-9604 represent the two opposing halves of the growth-hormone axis research conversation. IGF-1 LR3 is the long-acting downstream anabolic effector (IGF-1R agonist, extends plasma half-life via reduced IGFBP binding). AOD-9604 is the upstream lipolytic fragment of hGH (residues 176-191), engineered to retain fat-oxidation activity without IGF-1 elevation. Anabolic vs lipolytic, downstream vs fragment.",
    comparisonTable: [
      { row: "Class", aValue: "83-residue insulin-like growth factor 1 analog", bValue: "16-residue C-terminal fragment of hGH (residues 176-191) with N-terminal Tyr" },
      { row: "Mechanism", aValue: "Direct IGF-1 receptor agonism (PI3K-Akt + Ras-MAPK)", bValue: "Beta-adrenergic-mediated lipolysis in adipose, no IGF-1 elevation" },
      { row: "Primary research focus", aValue: "Protein synthesis · anabolic research", bValue: "Lipolysis · obesity (Phase 2b) · cartilage" },
      { row: "Half-life", aValue: "~6 hours (vs ~10 min native IGF-1)", bValue: "Short (minutes) plasma" },
      { row: "IGF-1 elevation", aValue: "Yes · primary mechanism", bValue: "No · engineering goal was to avoid IGF-1 elevation" },
      { row: "Hypoglycemia risk", aValue: "Yes (binds insulin receptor at higher doses)", bValue: "Not reported" },
      { row: "FDA status", aValue: "Not FDA-approved · research-use only (note: mecasermin/Increlex approves native IGF-1, distinct molecule)", bValue: "Not FDA-approved. Australian TGA Schedule 4 in 2020." },
      { row: "WADA status", aValue: "Prohibited at all times under S2", bValue: "Prohibited at all times under S2 (growth-hormone fragments)" },
    ],
    whichBetter: [
      { goal: "Protein synthesis / anabolic research", winner: "a", rationale: "Tomas 1993 (J Endocrinol) reported increased protein synthesis in rat skeletal muscle with LR3-IGF-1. AOD-9604 was not designed for anabolic activity." },
      { goal: "Lipolytic-only research (no IGF-1 elevation)", winner: "b", rationale: "AOD-9604 was specifically engineered to retain hGH's lipolytic activity without driving IGF-1 elevation. The clinical Phase 2b did not meet primary weight-loss endpoint but the pharmacological design is the cleaner lipolytic probe." },
      { goal: "Established Phase 2/3 outcomes", winner: "b", rationale: "AOD-9604 has the 12-week Metabolic Pharmaceuticals Phase 2b on record (1 mg/day, did not meet primary endpoint). IGF-1 LR3 does not have a completed human Phase 3 trial." },
      { goal: "Pharmacological half-life advantage vs native", winner: "a", rationale: "LR3 modification extends half-life from ~10 min (native IGF-1) to ~6 hr (LR3) · the engineering goal. AOD-9604 remains a short-half-life fragment." },
    ],
    stacking: "IGF-1 LR3 + AOD-9604 are sometimes referenced together in community body-composition research as a 'lipolytic + anabolic' framing. No published RCT validates the combination. Both are WADA-prohibited under S2.",
    searchVolume: "Mid · category staple in GH-axis research conversation",
  },

  {
    slug: "ss-31-vs-mots-c",
    a: "ss-31",
    b: "mots-c",
    verdict: "SS-31 and MOTS-c are both mitochondrial-targeted research peptides, but they engage mitochondrial biology at completely different levels. SS-31 (elamipretide) is a synthetic 4-aa tetrapeptide that selectively binds cardiolipin on the inner mitochondrial membrane to stabilize cristae and preserve electron-transport-chain coupling. MOTS-c is an endogenous 16-aa peptide encoded by mitochondrial DNA that activates AMPK and translocates to the nucleus to modulate gene expression. Structural vs signaling.",
    comparisonTable: [
      { row: "Class", aValue: "Synthetic mitochondrial-targeted tetrapeptide", bValue: "Mitochondrial-derived 16-aa peptide (MDP)" },
      { row: "Encoded by", aValue: "Synthetic (not naturally occurring)", bValue: "Mitochondrial 12S rRNA short open reading frame" },
      { row: "Sequence", aValue: "D-Arg-(2',6'-dimethylTyr)-Lys-Phe-NH2", bValue: "MRWQEMGYIFYPRKLR" },
      { row: "Mechanism", aValue: "Cardiolipin binding · inner-membrane structural stabilization · OXPHOS coupling preservation", bValue: "AMPK activation · folate-cycle inhibition · nuclear translocation · gene-expression modulation" },
      { row: "Half-life", aValue: "~3 hours plasma", bValue: "~30 min plasma (rodent), longer tissue residence" },
      { row: "Research focus", aValue: "Primary mitochondrial myopathy · Barth syndrome · dry AMD · cardiac ischemia-reperfusion", bValue: "Insulin sensitivity · exercise-mimetic · age-related physical decline" },
      { row: "Clinical-trial status", aValue: "Stealth BioTherapeutics Phase 2/3 in multiple indications · regulatory packages submitted", bValue: "Early-stage human trials · no Phase 3 completions" },
      { row: "FDA status", aValue: "Investigational · full FDA approval not granted as of 2026-05", bValue: "Not FDA-approved · research-use only" },
      { row: "WADA status", aValue: "Not listed (2026)", bValue: "Not listed (2026)" },
    ],
    whichBetter: [
      { goal: "Structural mitochondrial-membrane research", winner: "a", rationale: "SS-31's cardiolipin-binding mechanism is the canonical structural-stabilization probe for the inner mitochondrial membrane (Szeto lab biochemistry). MOTS-c does not target membrane structure directly." },
      { goal: "Exercise-mimetic / aged-muscle research", winner: "b", rationale: "Reynolds 2021 (Nat Commun, PMID 33473109) reported improved treadmill performance and grip strength in aged mice with exogenous MOTS-c. SS-31 is not framed as an exercise mimetic." },
      { goal: "AMPK pathway research", winner: "b", rationale: "MOTS-c is the canonical AMPK-activating mitochondrial-derived peptide. SS-31 acts mechanically on cardiolipin, not on AMPK directly." },
      { goal: "Cardiac ischemia-reperfusion research", winner: "a", rationale: "Multiple rodent and large-animal models report SS-31 reduces infarct size and preserves ATP under ischemic stress (Szeto et al. 2011 J Am Soc Nephrol). MOTS-c not specifically a cardiac-ischemia compound." },
      { goal: "Insulin-sensitivity research", winner: "b", rationale: "MOTS-c has Lee 2015 (Cell Metab, PMID 25738459) in diet-induced obese mice reversing insulin resistance. SS-31 not specifically studied as an insulin-sensitivity agent." },
    ],
    stacking: "SS-31 + MOTS-c covers two non-overlapping layers of mitochondrial biology (membrane structure + AMPK signaling). No published RCT studies the combination, but mechanistic complementarity is the basis for the Cellular Bioenergetics research framing.",
    searchVolume: "Niche · high-intent within longevity and mitochondrial-research communities",
  },

  {
    slug: "5-amino-1mq-vs-nad-plus",
    a: "5-amino-1mq",
    b: "nad-plus",
    verdict: "5-amino-1MQ and NAD+ both intersect with the NAD+ longevity axis, but from opposite ends. 5-amino-1MQ is a small-molecule selective inhibitor of NNMT (nicotinamide N-methyltransferase) · blocking NNMT raises intracellular nicotinamide and SAM pools. NAD+ is the endogenous redox coenzyme itself, the obligate substrate of sirtuins, PARPs, and CD38. Indirect upstream inhibitor vs the coenzyme.",
    comparisonTable: [
      { row: "Class", aValue: "Small-molecule NNMT inhibitor (not a peptide)", bValue: "Endogenous redox coenzyme (not a peptide)" },
      { row: "Formula", aValue: "C10H11IN2 (5-amino-1-methylquinolinium iodide)", bValue: "C21H27N7O14P2" },
      { row: "Mechanism", aValue: "Inhibits NNMT methylation of nicotinamide · preserves NAD+ + SAM pools", bValue: "Substrate of sirtuins / PARPs / CD38 · electron-transfer cofactor in glycolysis + TCA + OXPHOS" },
      { row: "Direction on NAD+ pool", aValue: "Preserves intracellular NAD+ by blocking nicotinamide methylation", bValue: "Is the NAD+ itself; precursors (NR, NMN) cross plasma membrane more efficiently" },
      { row: "Route", aValue: "Oral bioavailable in animal studies; subcutaneous (research)", bValue: "Subcutaneous (research) · IV (research) · oral precursors widely used" },
      { row: "Best evidence", aValue: "Neelakantan 2017 NNMT inhibitor reduces adiposity in DIO mice (J Med Chem)", bValue: "Yoshino, Imai, Baur 2018 Cell Metab review PMID 29249689; precursor trials raise NAD+ reliably" },
      { row: "FDA status", aValue: "Research chemical · not FDA-approved", bValue: "Not FDA-approved as a drug; NR / NMN precursors subject to FDA enforcement actions 2022-2024" },
      { row: "WADA status", aValue: "Not listed (2026)", bValue: "Not listed (2026)" },
    ],
    whichBetter: [
      { goal: "Adipose body-composition research", winner: "a", rationale: "Neelakantan 2017 reported reduced adipose mass in DIO mice with 5-amino-1MQ without changes in food intake. NAD+ direct administration is not framed as a body-composition mechanism." },
      { goal: "Sirtuin / PARP axis biology", winner: "b", rationale: "Sirtuins and PARPs are NAD+-dependent enzymes; activity scales with NAD+ availability. This is direct NAD+ biology, not NNMT-inhibitor biology." },
      { goal: "Oral bioavailability for laboratory administration", winner: "a", rationale: "5-amino-1MQ is reported to be oral-bioavailable in animal studies. Direct NAD+ has poor membrane permeability; oral precursors (NR / NMN) are the practical NAD+-raising route." },
      { goal: "Established biochemistry / pathway centrality", winner: "b", rationale: "NAD+ is the centerpiece of cellular bioenergetics with decades of established literature. 5-amino-1MQ is a relative newcomer (mostly preclinical, no completed human Phase 2/3)." },
    ],
    stacking: "5-amino-1MQ and NAD+/precursors target the same downstream goal (raise intracellular NAD+) from different angles. No published RCT studies the combination; the mechanistic framing is upstream NNMT inhibition + direct precursor supplementation = combined NAD+ pool support.",
  },

  {
    slug: "humanin-vs-mots-c",
    a: "humanin",
    b: "mots-c",
    verdict: "Humanin and MOTS-c are the two most-cited mitochondrial-derived peptides (MDPs), discovered roughly 14 years apart. Humanin is a 24-aa peptide encoded within the mitochondrial 16S rRNA gene · characterized first for anti-apoptotic neuroprotection against amyloid-beta (Hashimoto 2001). MOTS-c is a 16-aa peptide encoded within the mitochondrial 12S rRNA · characterized for AMPK activation and insulin-sensitivity (Lee 2015). Same family, different functions.",
    comparisonTable: [
      { row: "Class", aValue: "Mitochondrial-derived peptide (MDP)", bValue: "Mitochondrial-derived peptide (MDP)" },
      { row: "Encoded by", aValue: "Mitochondrial 16S rRNA short open reading frame", bValue: "Mitochondrial 12S rRNA short open reading frame" },
      { row: "Length", aValue: "24 amino acids", bValue: "16 amino acids" },
      { row: "Discovery", aValue: "Hashimoto et al. 2001 (PNAS PMID 11371641) from cDNA library of dying neurons", bValue: "Lee et al. 2015 (Cell Metab PMID 25738459) Cohen group at USC" },
      { row: "Primary mechanism", aValue: "Anti-apoptotic via BAX inhibition · neuroprotection", bValue: "AMPK activation · folate-cycle inhibition · nuclear translocation" },
      { row: "Research focus", aValue: "Alzheimer cell-line models · insulin sensitivity · longevity correlation", bValue: "Insulin sensitivity · exercise-mimetic · physical-decline mitigation" },
      { row: "Notable evidence", aValue: "Muzumdar 2009 insulin action in obese rats · Lee 2015 longevity correlation", bValue: "Lee 2015 (Cell Metab) · Reynolds 2021 (Nat Commun) aged mice exercise mimetic" },
      { row: "FDA status", aValue: "Not FDA-approved · research-use only", bValue: "Not FDA-approved · research-use only" },
      { row: "WADA status", aValue: "Not listed (2026)", bValue: "Not listed (2026)" },
    ],
    whichBetter: [
      { goal: "Neuroprotection / Alzheimer research", winner: "a", rationale: "Hashimoto 2001 established humanin as a rescue factor against amyloid-beta toxicity in neuronal cell models. MOTS-c is not specifically framed as a neuroprotective compound." },
      { goal: "Exercise-mimetic / muscle-aging research", winner: "b", rationale: "Reynolds 2021 (Nat Commun, PMID 33473109) reported improved treadmill performance and grip strength in aged mice with MOTS-c. Humanin not specifically studied as an exercise mimetic." },
      { goal: "AMPK pathway", winner: "b", rationale: "MOTS-c is the canonical AMPK-activating MDP. Humanin's primary mechanism is anti-apoptotic via BAX, not AMPK." },
      { goal: "Anti-apoptotic / BAX-pathway research", winner: "a", rationale: "Humanin's primary characterized mechanism is BAX inhibition, blocking the intrinsic apoptosis pathway. MOTS-c does not have characterized BAX activity." },
      { goal: "Longevity correlation in human cohorts", winner: "tie", rationale: "Both peptides have circulating levels that correlate with longevity in human population studies (humanin: Lee 2015 reviews of centenarian cohorts; MOTS-c: Du 2018 / Lu 2019). Magnitude varies by assay and population." },
    ],
    stacking: "Humanin + MOTS-c covers two non-overlapping branches of mitochondrial-derived peptide biology (anti-apoptotic + AMPK-activating). No published RCT studies the combination, but mechanistic complementarity is the basis for any Cellular Bioenergetics MDP-stack research framing.",
    searchVolume: "Niche · MDP category enthusiast queries",
  },

  {
    slug: "adamax-vs-bpc-157",
    a: "adamax",
    b: "bpc-157",
    verdict: "Adamax and BPC-157 are two tissue-protective research peptides with different origins. Adamax is an EPO-derived peptide analog related to ARA-290 / cibinetide, engineered to activate the innate-repair-receptor (IRR · EPOR + βcR heterocomplex) without stimulating red-blood-cell production. BPC-157 is a 15-aa gastric-origin pentadecapeptide acting through VEGF, NO, and growth-hormone-receptor upregulation. Different receptor pathways, both framed as tissue-protective.",
    comparisonTable: [
      { row: "Class", aValue: "EPO-derived non-erythropoietic peptide analog", bValue: "Synthetic 15-aa peptide (gastric-origin fragment)" },
      { row: "Sequence", aValue: "ARA-290-class · short EPO-derived peptide", bValue: "Gly-Glu-Pro-Pro-Pro-Gly-Lys-Pro-Ala-Asp-Asp-Ala-Gly-Leu-Val" },
      { row: "Mechanism", aValue: "Innate-repair-receptor (EPOR + βcR) activation · no erythropoietic activity", bValue: "VEGF / NO / GHR upregulation · cytoprotection paradigm" },
      { row: "Primary research focus", aValue: "Neuroprotection · anti-inflammatory · diabetic neuropathy (ARA-290 small-cohort data)", bValue: "GI mucosal protection · tendon-ligament healing" },
      { row: "Half-life", aValue: "Short (minutes) plasma", bValue: "~4 hours (rat, intraperitoneal)" },
      { row: "Gastric stability", aValue: "Not characterized as orally stable", bValue: "Stable >24 hr in human gastric juice (unusual)" },
      { row: "FDA status", aValue: "Not FDA-approved · research chemical", bValue: "FDA Cat 2 503A bulks list (Sept 2023) · research-use only" },
      { row: "WADA status", aValue: "EPO-class status under S2 may apply", bValue: "Prohibited at all times (S0)" },
    ],
    whichBetter: [
      { goal: "Neuroprotection / neuropathy research", winner: "a", rationale: "ARA-290 (the closest characterized analog) has small-cohort clinical data in sarcoidosis-related small-fiber neuropathy and rodent diabetic-neuropathy models. BPC-157 is not specifically studied in peripheral neuropathy." },
      { goal: "GI mucosal protection research", winner: "b", rationale: "BPC-157 has the Sikiric multi-paper rat-model evidence base for gastric and intestinal cytoprotection. Adamax is not specifically studied in GI research." },
      { goal: "Tendon / ligament research", winner: "b", rationale: "Animal-model evidence for BPC-157 in Achilles detachment and transected quadriceps. Adamax is not specifically studied in tendon/ligament biology." },
      { goal: "Non-erythropoietic EPO-pathway research", winner: "a", rationale: "Adamax is the engineered probe for IRR activation without RBC stimulation. BPC-157 does not engage the EPO/IRR axis." },
    ],
    stacking: "Adamax and BPC-157 act on different receptor systems (IRR vs VEGF/NO/GHR) and could in principle complement each other in tissue-protective research, but no published study examines the combination. Buyers researching the tissue-protective category typically use each as a standalone reference compound.",
  },

  {
    slug: "thymosin-alpha-1-vs-bpc-157",
    a: "thymosin-alpha-1",
    b: "bpc-157",
    verdict: "Thymosin alpha-1 and BPC-157 are commonly co-mentioned in recovery and immune research, but they target completely different systems. Thymosin alpha-1 (Tα1, Zadaxin) is a 28-aa thymic immunomodulator (TLR9 agonism, T-cell + NK-cell activation) approved in 35+ countries for chronic hepatitis B/C. BPC-157 is a 15-aa gastric-origin pentadecapeptide acting through VEGF / NO / GHR upregulation for connective-tissue cytoprotection. Immune vs regen.",
    comparisonTable: [
      { row: "Class", aValue: "Synthetic 28-aa thymic peptide · immunomodulator", bValue: "Synthetic 15-aa peptide (gastric-origin fragment)" },
      { row: "Sequence", aValue: "28-aa thymalfasin · Ac-Ser-Asp-Ala...Asn", bValue: "Gly-Glu-Pro-Pro-Pro-Gly-Lys-Pro-Ala-Asp-Asp-Ala-Gly-Leu-Val" },
      { row: "Mechanism", aValue: "TLR9 agonism · dendritic-cell maturation · T-cell + NK-cell activation · Th1 bias", bValue: "VEGF / NO / GHR upregulation · cytoprotection paradigm" },
      { row: "Half-life", aValue: "~2 hours plasma (subcutaneous)", bValue: "~4 hours (rat, intraperitoneal)" },
      { row: "Primary research focus", aValue: "Chronic hepatitis B/C · sepsis (ETASS) · immunocompromised support · COVID-19", bValue: "GI mucosal protection · tendon-ligament healing" },
      { row: "Best published evidence", aValue: "Multiple Phase 3 trials supporting Zadaxin approval; Wu 2013 Crit Care sepsis trial PMID 23327199", bValue: "Sikiric multi-paper rodent literature; Krivic 2006 PMID 16583442 tendon" },
      { row: "FDA status", aValue: "Not FDA-approved in US · approved as Zadaxin in 35+ countries", bValue: "FDA Cat 2 503A bulks list (Sept 2023) · research-use only" },
      { row: "WADA status", aValue: "Not currently listed (2026)", bValue: "Prohibited at all times (S0)" },
    ],
    whichBetter: [
      { goal: "Immune-system / antiviral research", winner: "a", rationale: "Thymosin alpha-1 has the Zadaxin Phase 3 program in hepatitis B/C and multi-country approved indication. BPC-157 is not framed as an antiviral or immune-modulator." },
      { goal: "Tendon / ligament / wound research", winner: "b", rationale: "BPC-157 has the Sikiric multi-paper rodent evidence base for tendon, ligament, and gastric repair. Thymosin alpha-1 is not specifically studied in connective-tissue healing." },
      { goal: "Sepsis / critical-care research", winner: "a", rationale: "Wu 2013 (Crit Care, PMID 23327199) reported 28-day mortality reduction in severe sepsis with Tα1. BPC-157 not specifically studied in sepsis." },
      { goal: "GI mucosal protection research", winner: "b", rationale: "BPC-157's gastric-cytoprotection signature is the canonical evidence base. Tα1 not specifically studied in GI mucosa." },
      { goal: "Approved-product clinical evidence base", winner: "a", rationale: "Thymosin alpha-1 is approved as Zadaxin in 35+ countries. BPC-157 has no approved human indication anywhere." },
    ],
    stacking: "Thymosin alpha-1 + BPC-157 covers two non-overlapping research axes (immune system + connective-tissue cytoprotection). No published RCT validates the combination, but mechanistic complementarity is the basis for community-protocol framings around recovery + immune support.",
    searchVolume: "Mid · staple comparison within recovery + immune research community",
  },
];

export const COMPARISONS_BY_SLUG: Record<string, Comparison> =
  Object.fromEntries(COMPARISONS.map((c) => [c.slug, c]));

/** All comparison slugs that involve a given compound. */
export function comparisonsForCompound(compoundSlug: string): Comparison[] {
  return COMPARISONS.filter((c) => c.a === compoundSlug || c.b === compoundSlug);
}
