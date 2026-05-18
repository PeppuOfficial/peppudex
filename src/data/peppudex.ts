/**
 * PEPPUDEX entries · one per Peppu Studio research peptide.
 *
 * Pokedex-style schema:
 *  - id        · 3-digit slot (Pokedex convention)
 *  - slug      · URL slug for /[slug] pages
 *  - name      · display name
 *  - tagline   · 1-line subtitle (sub-species in Pokedex terms)
 *  - stage     · stage 1 / 2 / 3 / legendary
 *  - hp        · headline number on the card
 *  - level     · Lv. number on the card
 *  - types     · one or more element badges
 *  - card      · the rendered card image in /public/cards
 *  - mechanism · 1-2 sentence mechanism-only summary
 *  - moves     · 1-3 "signature moves" reproduced from the card art
 *  - evidence  · bulleted research findings with PMID/NCT
 *  - sources   · external links: PubMed / ClinicalTrials.gov / FDA / WADA / Wiki
 */

export type PeppuType =
  | "metabolic"
  | "incretin"
  | "longevity"
  | "cognition"
  | "regen"
  | "growth"
  | "cytoprotection"
  | "multi";

export type Stage = "Basic" | "Stage 1" | "Stage 2" | "Stage 3" | "Legendary";

export interface Move {
  name: string;
  power?: number;
  desc: string;
}

export interface SourceLink {
  label: string;
  url: string;
}

export interface PeppudexEntry {
  id: string;          // "001"
  slug: string;        // "retatrutide"
  name: string;        // "RETATRUTIDE"
  tagline: string;
  stage: Stage;
  hp: number;
  level: number;
  types: PeppuType[];
  card: string;        // "/cards/retatrutide.png"
  mechanism: string;
  moves: Move[];
  evidence: string[];
  sources: SourceLink[];
}

export const PEPPUDEX: PeppudexEntry[] = [
  {
    id: "001",
    slug: "retatrutide",
    name: "RETATRUTIDE",
    tagline: "Triple-Receptor Metabolic Peptide",
    stage: "Stage 3",
    hp: 240,
    level: 95,
    types: ["metabolic", "incretin"],
    card: "/cards/retatrutide.png",
    mechanism: "Engineered single-molecule agonist at GLP-1, GIP, and glucagon receptors. Investigational compound from Eli Lilly under the codename LY3437943.",
    moves: [
      { name: "Appetite Suppress", power: 60, desc: "GLP-1 arm slows gastric emptying." },
      { name: "Triple Burn", power: 160, desc: "Activates all three receptors. Phase 2 NEJM 2023 — NCT04881760." },
    ],
    evidence: [
      "Jastreboff AM, Kaplan LM, Frías JP et al., Triple-Hormone-Receptor Agonist Retatrutide for Obesity · NEJM 2023; PMID 37366315 · ClinicalTrials.gov NCT04881760.",
      "TRIUMPH Phase 3 program ongoing as of publication date.",
    ],
    sources: [
      { label: "Wiki entry", url: "https://wiki.peppu.studio/wiki/Retatrutide" },
      { label: "PubMed PMID 37366315", url: "https://pubmed.ncbi.nlm.nih.gov/37366315/" },
      { label: "ClinicalTrials.gov NCT04881760", url: "https://clinicaltrials.gov/study/NCT04881760" },
    ],
  },
  {
    id: "002",
    slug: "tirzepatide",
    name: "TIRZEPATIDE",
    tagline: "Dual-Receptor Metabolic Peptide",
    stage: "Stage 2",
    hp: 200,
    level: 92,
    types: ["metabolic", "incretin"],
    card: "/cards/tirzepatide.png",
    mechanism: "Dual GLP-1 and GIP receptor agonist. Marketed (under separate human-prescription label) as Mounjaro and Zepbound by Eli Lilly. Once-weekly subcutaneous administration.",
    moves: [
      { name: "Incretin Pulse", power: 50, desc: "Both receptors fire. Slows gastric emptying." },
      { name: "Dual Burn", power: 110, desc: "SURMOUNT-1 / NCT04184231." },
    ],
    evidence: [
      "Jastreboff AM et al., Tirzepatide Once Weekly for the Treatment of Obesity · NEJM 2022 · SURMOUNT-1.",
      "Frías JP et al., Tirzepatide versus semaglutide once weekly in patients with type 2 diabetes · NEJM 2021 · SURPASS-2.",
    ],
    sources: [
      { label: "Wiki entry", url: "https://wiki.peppu.studio/wiki/Tirzepatide" },
      { label: "ClinicalTrials.gov NCT04184231", url: "https://clinicaltrials.gov/study/NCT04184231" },
    ],
  },
  {
    id: "003",
    slug: "bpc-157",
    name: "BPC-157",
    tagline: "Pentadecapeptide Cytoprotection",
    stage: "Stage 1",
    hp: 130,
    level: 70,
    types: ["regen", "cytoprotection"],
    card: "/cards/retatrutide.png", // placeholder until BPC-157 card art lands
    mechanism: "Synthetic 15-amino-acid fragment of a gastric protective protein. Documented in animal-model literature for tissue remodeling, GI mucosal barrier signaling, and the cytoprotection paradigm.",
    moves: [
      { name: "Cyto Veil", power: 40, desc: "Stabilizes gastric and vascular endothelium." },
      { name: "Tendon Mend", power: 90, desc: "Sikiric group preclinical literature." },
    ],
    evidence: [
      "Sikiric P et al., Stable gastric pentadecapeptide BPC 157 · Inflammopharmacology 2024 · PMID 38980576.",
      "No completed Phase 3 human trials registered.",
    ],
    sources: [
      { label: "Wiki entry", url: "https://wiki.peppu.studio/wiki/BPC-157" },
      { label: "PubMed PMID 38980576", url: "https://pubmed.ncbi.nlm.nih.gov/38980576/" },
      { label: "FDA bulks list", url: "https://www.fda.gov/drugs/human-drug-compounding/certain-bulk-drug-substances-use-compounding-may-present-significant-safety-risks" },
    ],
  },
  {
    id: "004",
    slug: "ghk-cu",
    name: "GHK-Cu",
    tagline: "Copper-Peptide Skin Remodeler",
    stage: "Basic",
    hp: 100,
    level: 65,
    types: ["regen", "longevity"],
    card: "/cards/ghk-cu.png",
    mechanism: "Naturally occurring tripeptide Gly-His-Lys bound to a Cu²⁺ ion. Peer-reviewed for collagen-synthesis induction, glycosaminoglycan production, and tissue-remodeling transcriptional signaling.",
    moves: [
      { name: "Collagen Bloom", power: 50, desc: "Heal your team 30 HP." },
      { name: "Copper Crown", power: 30, desc: "Wound-healing kinetics." },
    ],
    evidence: [
      "Pickart L, The human tri-peptide GHK and tissue remodeling · J Biomater Sci Polym Ed 2008 · PMID 18644225.",
      "Pickart L et al., GHK peptide as a natural modulator of multiple cellular pathways · OMCL 2012 · PMID 22666519.",
    ],
    sources: [
      { label: "Wiki entry", url: "https://wiki.peppu.studio/wiki/GHK-Cu" },
      { label: "PubMed PMID 18644225", url: "https://pubmed.ncbi.nlm.nih.gov/18644225/" },
    ],
  },
  {
    id: "005",
    slug: "klow-blend",
    name: "KLOW BLEND",
    tagline: "Multi-Pathway Convenience Stack",
    stage: "Legendary",
    hp: 220,
    level: 88,
    types: ["multi"],
    card: "/cards/klow-blend.png",
    mechanism: "Four-component combinatorial research panel: Kisspeptin-10, Laminin-derived peptide (or BPC-157 variant), Oxytocin, and GHK-Cu co-lyophilized in one vial. Per-component literature only.",
    moves: [
      { name: "Multi-Pathway Storm", power: 150, desc: "Activates all four component pathways simultaneously." },
      { name: "Total System", power: 200, desc: "Discard all energy. Total system reset." },
    ],
    evidence: [
      "Per-component papers apply. No peer-reviewed study of the four-component blend as a unit.",
      "Kisspeptin-10 GPR54 ligand · Kotani M et al., J Biol Chem 2001.",
    ],
    sources: [
      { label: "Wiki entry", url: "https://wiki.peppu.studio/wiki/KLOW-Blend" },
      { label: "GHK-Cu component", url: "https://wiki.peppu.studio/wiki/GHK-Cu" },
      { label: "BPC-157 component", url: "https://wiki.peppu.studio/wiki/BPC-157" },
    ],
  },
  {
    id: "006",
    slug: "nad-plus",
    name: "NAD+",
    tagline: "Longevity Coenzyme",
    stage: "Stage 1",
    hp: 180,
    level: 80,
    types: ["longevity"],
    card: "/cards/nad-plus.png",
    mechanism: "Endogenous redox coenzyme. Substrate of sirtuins, PARPs, and CD38. Drives cellular bioenergetics through glycolysis, the TCA cycle, and oxidative phosphorylation.",
    moves: [
      { name: "Sirtuin Surge", power: 70, desc: "Heal all your cards 30 HP. Activates SIRT1/SIRT3." },
      { name: "Reverse Aging", power: 100, desc: "Opponent skips next turn." },
    ],
    evidence: [
      "Yoshino J, Baur JA, Imai S · NAD+ Intermediates · Cell Metab 2018 · PMID 29249689.",
      "Imai S, Guarente L · NAD+ and sirtuins in aging and disease · Trends Cell Biol 2014 · PMID 24786309.",
    ],
    sources: [
      { label: "Wiki entry", url: "https://wiki.peppu.studio/wiki/NAD-plus" },
      { label: "PubMed PMID 29249689", url: "https://pubmed.ncbi.nlm.nih.gov/29249689/" },
    ],
  },
  {
    id: "007",
    slug: "tb-500",
    name: "TB-500",
    tagline: "Thymosin Beta-4 Fragment",
    stage: "Stage 1",
    hp: 120,
    level: 68,
    types: ["regen"],
    card: "/cards/tb-500.png",
    mechanism: "Synthetic 7-amino-acid fragment (Ac-LKKTETQ) of thymosin beta-4 retaining the actin-sequestering activity of the parent protein. Drives cell migration and tissue-remodeling pathways in animal models.",
    moves: [
      { name: "Actin Sequester", power: 50, desc: "Status: opponent paused 2 turns. G-actin binding kinetics." },
      { name: "Total Recovery", desc: "Heal all REGEN allies to full HP. Anti-inflammatory cascade." },
    ],
    evidence: [
      "Sosne G et al., Biological activities of thymosin beta4 · FASEB J 2010 · PMID 20179146.",
      "Goldstein AL et al., Thymosin beta-4: actin-sequestering protein · Trends Mol Med 2005 · PMID 16099219.",
    ],
    sources: [
      { label: "Wiki entry", url: "https://wiki.peppu.studio/wiki/TB-500" },
      { label: "PubMed PMID 20179146", url: "https://pubmed.ncbi.nlm.nih.gov/20179146/" },
    ],
  },
  {
    id: "008",
    slug: "tesamorelin",
    name: "TESAMORELIN",
    tagline: "GHRH Analog · Egrifta®",
    stage: "Stage 1",
    hp: 150,
    level: 92,
    types: ["growth"],
    card: "/cards/tesamorelin.png",
    mechanism: "Stabilized analog of human GHRH(1-44). Binds the GHRH receptor on pituitary somatotrophs. FDA-approved as Egrifta® for HIV-associated lipodystrophy under separate human-prescription label.",
    moves: [
      { name: "GHRH Pulse", power: 60, desc: "Triggers natural GH release. No exogenous GH needed." },
      { name: "Visceral Strike", power: 90, desc: "Slows damage to fat type. Selective visceral fat reduction." },
    ],
    evidence: [
      "Falutz J et al., Pooled Phase 3 analysis · JCEM 2010 · PMID 20554713.",
      "Falutz J et al., Phase 3 randomized placebo-controlled trial · JAIDS 2010 · PMID 20101189.",
    ],
    sources: [
      { label: "Wiki entry", url: "https://wiki.peppu.studio/wiki/Tesamorelin" },
      { label: "FDA approval letter", url: "https://www.accessdata.fda.gov/drugsatfda_docs/nda/2010/022505Orig1s000Approv.pdf" },
      { label: "PubMed PMID 20554713", url: "https://pubmed.ncbi.nlm.nih.gov/20554713/" },
    ],
  },
  {
    id: "009",
    slug: "ipa-cjc1295",
    name: "IPA / CJC-1295",
    tagline: "GH-Secretagogue Pair · Pulsatile",
    stage: "Stage 1",
    hp: 140,
    level: 75,
    types: ["growth"],
    card: "/cards/ipa-cjc1295.png",
    mechanism: "Two-peptide pair. Ipamorelin selectively engages the ghrelin receptor (GHS-R1a). CJC-1295 (No DAC) is a GHRH(1-29) analog. Together they amplify the GH pulse.",
    moves: [
      { name: "GH Cascade", power: 70, desc: "Both pathways fire. Pulsatile GH release." },
      { name: "Night Pulse", power: 100, desc: "Bonus damage during sleep cycle. IGF-1 elevation." },
    ],
    evidence: [
      "Venkova K et al., Ipamorelin POI rat model · J Pharmacol Exp Ther 2009 · PMID 19289567.",
      "Teichman SL et al., CJC-1295 sustained GH and IGF-1 elevation · JCEM 2006.",
    ],
    sources: [
      { label: "Wiki · Ipamorelin", url: "https://wiki.peppu.studio/wiki/Ipamorelin" },
      { label: "Wiki · CJC-1295", url: "https://wiki.peppu.studio/wiki/CJC-1295" },
      { label: "PubMed PMID 19289567", url: "https://pubmed.ncbi.nlm.nih.gov/19289567/" },
    ],
  },
  {
    id: "010",
    slug: "mots-c",
    name: "MOTS-c",
    tagline: "Mitochondrial 16-AA Peptide",
    stage: "Basic",
    hp: 110,
    level: 60,
    types: ["metabolic", "longevity"],
    card: "/cards/mots-c.png",
    mechanism: "16-amino-acid peptide encoded by a short open reading frame within the mitochondrial 12S rRNA. Activates the AMPK pathway in cell-culture and animal-model studies.",
    moves: [
      { name: "AMPK Spike", power: 50, desc: "Energy +1 next turn. Increases cellular glucose uptake." },
      { name: "Mito Burst", power: 90, desc: "Aerobic capacity surge. Exercise-mimetic. PMID 33473109." },
    ],
    evidence: [
      "Lee C et al., MOTS-c promotes metabolic homeostasis · Cell Metab 2015 · PMID 25738459.",
      "Reynolds JC et al., MOTS-c exercise-induced regulator · Nat Commun 2021 · PMID 33473109.",
    ],
    sources: [
      { label: "Wiki entry", url: "https://wiki.peppu.studio/wiki/MOTS-c" },
      { label: "PubMed PMID 25738459", url: "https://pubmed.ncbi.nlm.nih.gov/25738459/" },
    ],
  },
  {
    id: "011",
    slug: "selank",
    name: "SELANK",
    tagline: "Russian-Origin Tuftsin Analog · Anxiolytic-Path",
    stage: "Basic",
    hp: 85,
    level: 55,
    types: ["cognition"],
    card: "/cards/selank.png",
    mechanism: "Synthetic heptapeptide Thr-Lys-Pro-Arg-Pro-Gly-Pro derived from tuftsin. Russian Academy of Sciences. Studied for GABAergic-pathway signaling and HPA-axis modulation.",
    moves: [
      { name: "Anxiolytic Wave", power: 40, desc: "Opponent cannot attack next turn. Calms autonomic response." },
      { name: "GABA Lock", power: 70, desc: "Discard 1 of opponent's Energy. Cortisol drop." },
    ],
    evidence: [
      "Vyunova TV et al., Synthetic Peptides as Promising Anxiolytics · Acta Naturae 2018.",
      "Kozlovskaya MM et al., Selank in stress adaptation · Neurosci Behav Physiol 2003.",
    ],
    sources: [
      { label: "Wiki entry", url: "https://wiki.peppu.studio/wiki/Selank" },
      { label: "PubMed search", url: "https://pubmed.ncbi.nlm.nih.gov/?term=Selank" },
    ],
  },
  {
    id: "012",
    slug: "semax",
    name: "SEMAX",
    tagline: "ACTH(4-10) Heptapeptide · Russian-origin",
    stage: "Basic",
    hp: 90,
    level: 58,
    types: ["cognition"],
    card: "/cards/semax.png",
    mechanism: "Synthetic heptapeptide Met-Glu-His-Phe-Pro-Gly-Pro · analog of ACTH(4-10) extended with a stabilizing Pro-Gly-Pro tail. Upregulates BDNF and TrkB in rat hippocampus and basal forebrain.",
    moves: [
      { name: "BDNF Boost", power: 50, desc: "Draw 2 cards. Synaptic plasticity surge." },
      { name: "Neuroplasticity", desc: "All COG cards +20 attack. Long-term protection." },
    ],
    evidence: [
      "Dolotov OV et al., Semax upregulates BDNF and TrkB in rat hippocampus · Brain Res 2006 · PMID 16996037.",
      "Dolotov OV et al., Semax specific binding sites in basal forebrain · J Neurochem 2006 · PMID 16635254.",
    ],
    sources: [
      { label: "Wiki entry", url: "https://wiki.peppu.studio/wiki/Semax" },
      { label: "PubMed PMID 16996037", url: "https://pubmed.ncbi.nlm.nih.gov/16996037/" },
    ],
  },
];
