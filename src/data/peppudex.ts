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
  {
    id: "013",
    slug: "ss-31",
    name: "SS-31",
    tagline: "Cardiolipin-binding mitochondrial tetrapeptide",
    stage: "Stage 1",
    hp: 140,
    level: 72,
    types: ["longevity", "metabolic"],
    card: "/cards/ss-31.png",
    mechanism: "Mitochondrial-targeted tetrapeptide (Elamipretide / Bendavia / MTP-131). Selectively binds cardiolipin on the inner mitochondrial membrane to stabilize cristae structure and preserve electron-transport-chain coupling under stress.",
    moves: [
      { name: "Cardiolipin Lock", power: 70, desc: "Stabilizes inner-mitochondrial membrane structure." },
      { name: "Bioenergetic Surge", power: 110, desc: "Preserves OXPHOS coupling under oxidative stress." },
    ],
    evidence: [
      "Stealth BioTherapeutics Phase 2/3 program in Barth syndrome and primary mitochondrial myopathy.",
      "Szeto HH et al., Mitochondria-targeted peptide accelerates ATP recovery · J Am Soc Nephrol 2011.",
    ],
    sources: [
      { label: "ClinicalTrials.gov elamipretide", url: "https://clinicaltrials.gov/search?term=elamipretide" },
    ],
  },
  {
    id: "014",
    slug: "wolverine-blend",
    name: "WOLVERINE",
    tagline: "Triple regen stack · BPC-157 + TB-500 + GHK-Cu",
    stage: "Legendary",
    hp: 200,
    level: 85,
    types: ["regen", "multi"],
    card: "/cards/wolverine-blend.png",
    mechanism: "Combinatorial regeneration research panel. BPC-157 (cytoprotection + VEGF angiogenesis) + TB-500 (G-actin sequestration + cell migration) + GHK-Cu (collagen + matrix induction) co-lyophilized for connective-tissue research.",
    moves: [
      { name: "Triple Heal", power: 130, desc: "All three component pathways fire in sequence." },
      { name: "Cell Migration Storm", power: 180, desc: "Endothelial + stem cells recruit to injury site." },
    ],
    evidence: [
      "Per-component animal-model literature applies independently. No peer-reviewed publication studies the blend as a unit.",
    ],
    sources: [
      { label: "BPC-157 component", url: "https://wiki.peppu.studio/wiki/BPC-157" },
      { label: "TB-500 component", url: "https://wiki.peppu.studio/wiki/TB-500" },
      { label: "GHK-Cu component", url: "https://wiki.peppu.studio/wiki/GHK-Cu" },
    ],
  },
  {
    id: "015",
    slug: "5-amino-1mq",
    name: "5-AMINO-1MQ",
    tagline: "Small-molecule NNMT inhibitor · body-composition research",
    stage: "Stage 1",
    hp: 150,
    level: 70,
    types: ["metabolic", "longevity"],
    card: "/cards/5-amino-1mq.png",
    mechanism: "5-Amino-1-methylquinolinium iodide. Selective inhibitor of nicotinamide N-methyltransferase (NNMT). Blocking NNMT raises intracellular NAD+ and SAM pools, theorized to drive lipolysis and improve insulin sensitivity in adipose tissue.",
    moves: [
      { name: "NNMT Block", power: 60, desc: "Inhibits nicotinamide methylation in adipose tissue." },
      { name: "Lipolysis Surge", power: 120, desc: "Raises NAD+ + SAM pools · drives white-adipose lipolysis." },
    ],
    evidence: [
      "Kraus D et al., NNMT knockdown protects against diet-induced obesity · Nature 2014.",
      "Neelakantan H et al., NNMT inhibitor reduces fat mass in DIO mice · J Med Chem 2017.",
    ],
    sources: [
      { label: "PubMed NNMT inhibitor", url: "https://pubmed.ncbi.nlm.nih.gov/?term=NNMT+inhibitor" },
    ],
  },
  {
    id: "016",
    slug: "adamax",
    name: "ADAMAX",
    tagline: "ARA-290 peptide analog · tissue-protective research compound",
    stage: "Basic",
    hp: 95,
    level: 60,
    types: ["regen", "cognition"],
    card: "/cards/adamax.png",
    mechanism: "EPO-derived peptide analog related to ARA-290 / cibinetide. Acts through the innate-repair-receptor (IRR) heterocomplex (EPOR + βcR). Studied for tissue-protective signaling without erythropoietic activity.",
    moves: [
      { name: "Innate Repair Signal", power: 50, desc: "IRR activation without RBC stimulation." },
      { name: "Tissue Shield", power: 90, desc: "Anti-inflammatory + neuroprotective in animal models." },
    ],
    evidence: [
      "Brines M et al., ARA-290 modulates inflammation · Mol Med 2014.",
    ],
    sources: [
      { label: "PubMed ARA-290", url: "https://pubmed.ncbi.nlm.nih.gov/?term=ARA-290" },
    ],
  },
  {
    id: "017",
    slug: "igf-1-lr3",
    name: "IGF-1 LR3",
    tagline: "Long R3 IGF-1 · extended half-life anabolic research compound",
    stage: "Stage 2",
    hp: 175,
    level: 82,
    types: ["growth", "metabolic"],
    card: "/cards/igf-1-lr3.png",
    mechanism: "Long R3 Insulin-like Growth Factor 1 · 83-residue synthetic analog of native IGF-1 with N-terminal 13-residue extension and Arg substitution at position 3. Engineered to reduce IGFBP binding · extends plasma half-life from ~10 min (native) to ~6 hr (LR3).",
    moves: [
      { name: "IGF1R Cascade", power: 80, desc: "IGF-1 receptor · PI3K-Akt + Ras-MAPK signaling." },
      { name: "Anabolic Phase", power: 140, desc: "Extended half-life vs native IGF-1 (6 hr vs 10 min)." },
    ],
    evidence: [
      "Tomas FM et al., LR3-IGF-I increases protein synthesis in rat skeletal muscle · J Endocrinol 1993.",
    ],
    sources: [
      { label: "PubMed LR3 IGF-1", url: "https://pubmed.ncbi.nlm.nih.gov/?term=LR3+IGF" },
    ],
  },
  // ─── 2026 EXPANSION · 10 MOST-PROMISING NEXT-5-YEAR PEPTIDES ───
  {
    id: "018",
    slug: "cagrilintide",
    name: "CAGRILINTIDE",
    tagline: "Long-Acting Amylin Analog",
    stage: "Stage 1",
    hp: 160,
    level: 78,
    types: ["metabolic"],
    card: "/cards/cagrilintide.png",
    mechanism: "Long-acting amylin analog. Activates amylin and calcitonin receptors to slow gastric emptying and modulate satiety signaling. Forms the cagrilintide-half of the CagriSema combination program with semaglutide.",
    moves: [
      { name: "Appetite Brake", power: 80, desc: "Slows gastric emptying. Amylin receptor activation." },
      { name: "CagriSema Surge", power: 130, desc: "Stacks with semaglutide. REDEFINE Phase 3 program." },
    ],
    evidence: [
      "Lau DCW et al., Cagrilintide + semaglutide (CagriSema) for obesity · Lancet 2021.",
      "REDEFINE Phase 3 program ongoing (Novo Nordisk) · readout 2026.",
    ],
    sources: [
      { label: "PubMed cagrilintide", url: "https://pubmed.ncbi.nlm.nih.gov/?term=cagrilintide" },
      { label: "ClinicalTrials REDEFINE", url: "https://clinicaltrials.gov/search?term=cagrilintide" },
    ],
  },
  {
    id: "019",
    slug: "survodutide",
    name: "SURVODUTIDE",
    tagline: "GLP-1 + Glucagon Dual Agonist",
    stage: "Stage 2",
    hp: 195,
    level: 88,
    types: ["incretin", "metabolic"],
    card: "/cards/survodutide.png",
    mechanism: "Dual GLP-1 and glucagon receptor agonist developed by Boehringer Ingelheim as BI 456906. Combines incretin-driven glycemic control with glucagon-driven thermogenesis. Phase 3 SYNCHRONIZE program targets obesity and NASH simultaneously.",
    moves: [
      { name: "Dual Incretin", power: 130, desc: "Both receptors fire. Enhanced thermogenesis." },
      { name: "NASH Resolution", power: 180, desc: "Phase 2 NASH endpoints positive. NEJM 2024." },
    ],
    evidence: [
      "Sanyal AJ et al., Survodutide in MASH · NEJM 2024.",
      "Phase 3 SYNCHRONIZE program · weekly SQ.",
    ],
    sources: [
      { label: "PubMed survodutide", url: "https://pubmed.ncbi.nlm.nih.gov/?term=survodutide" },
      { label: "ClinicalTrials BI 456906", url: "https://clinicaltrials.gov/search?term=survodutide" },
    ],
  },
  {
    id: "020",
    slug: "orforglipron",
    name: "ORFORGLIPRON",
    tagline: "First Oral Non-Peptide GLP-1",
    stage: "Basic",
    hp: 145,
    level: 75,
    types: ["incretin"],
    card: "/cards/orforglipron.png",
    mechanism: "Eli Lilly oral non-peptide small-molecule GLP-1 receptor agonist (LY3502970). First oral GLP-1 designed for once-daily tablet dosing, bypassing the injection requirement of peptide GLP-1s. ACHIEVE-1 Phase 3 readout expected 2026.",
    moves: [
      { name: "Oral Bioavail", power: 70, desc: "Skips injection. Once-daily tablet." },
      { name: "Incretin Surge", power: 100, desc: "ACHIEVE-1 Phase 3 program. Body-weight reduction." },
    ],
    evidence: [
      "Wharton S et al., Orforglipron in adults with obesity (Phase 2) · NEJM 2023.",
      "ACHIEVE-1 Phase 3 program · Eli Lilly · readout 2026.",
    ],
    sources: [
      { label: "PubMed orforglipron", url: "https://pubmed.ncbi.nlm.nih.gov/?term=orforglipron" },
      { label: "ClinicalTrials ACHIEVE-1", url: "https://clinicaltrials.gov/search?term=orforglipron" },
    ],
  },
  {
    id: "021",
    slug: "mazdutide",
    name: "MAZDUTIDE",
    tagline: "GLP-1 + Glucagon · Innovent",
    stage: "Stage 2",
    hp: 190,
    level: 86,
    types: ["incretin", "metabolic"],
    card: "/cards/mazdutide.png",
    mechanism: "Innovent Biologics dual GLP-1 and glucagon receptor agonist (IBI362), derived from oxyntomodulin lineage. Approved in China 2024 for chronic weight management. Phase 3 GLORY program ongoing.",
    moves: [
      { name: "Dual Cascade", power: 125, desc: "Both receptors fire. Oxyntomodulin lineage." },
      { name: "Thermogenic Surge", power: 170, desc: "China approval 2024. Phase 3 GLORY program." },
    ],
    evidence: [
      "Ji L et al., Mazdutide for obesity in Chinese adults · NEJM 2023.",
      "China NMPA approval 2024.",
    ],
    sources: [
      { label: "PubMed mazdutide", url: "https://pubmed.ncbi.nlm.nih.gov/?term=mazdutide" },
      { label: "Innovent IBI362", url: "https://www.innoventbio.com/" },
    ],
  },
  {
    id: "022",
    slug: "pt-141",
    name: "PT-141",
    tagline: "Bremelanotide · MC4R Agonist · FDA Approved",
    stage: "Stage 1",
    hp: 110,
    level: 68,
    types: ["regen"],
    card: "/cards/pt-141.png",
    mechanism: "Synthetic alpha-MSH analog acting as melanocortin MC4R agonist on hypothalamic CNS pathways. FDA-approved as Vyleesi (2019). Mechanism via central melanocortin receptor activation; side-effect profile includes melanocyte stimulation.",
    moves: [
      { name: "MC4R Pulse", power: 60, desc: "FDA-approved (Vyleesi). CNS pathway activation." },
      { name: "Melanocyte Surge", power: 90, desc: "Side-effect: melanocyte stimulation." },
    ],
    evidence: [
      "Kingsberg SA et al., Bremelanotide for HSDD · Obstet Gynecol 2019.",
      "FDA approval Vyleesi 2019.",
    ],
    sources: [
      { label: "FDA Vyleesi", url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2019/210557s000lbl.pdf" },
      { label: "PubMed bremelanotide", url: "https://pubmed.ncbi.nlm.nih.gov/?term=bremelanotide" },
    ],
  },
  {
    id: "023",
    slug: "epitalon",
    name: "EPITALON",
    tagline: "Telomerase Activator · Khavinson",
    stage: "Legendary",
    hp: 170,
    level: 95,
    types: ["longevity"],
    card: "/cards/epitalon.png",
    mechanism: "Four-amino-acid synthetic peptide (Ala-Glu-Asp-Gly) with telomerase-activating activity in human somatic cells. Developed at the St. Petersburg Institute of Bioregulation and Gerontology. Russian clinical use spans 30+ years; mainstream Western RCT-grade evidence is limited.",
    moves: [
      { name: "Telomere Cap", power: 80, desc: "Rebuild telomere ends. Khavinson 30-year clinical work." },
      { name: "Pineal Surge", power: 130, desc: "Russian gerontology classic. Pineal regulation." },
    ],
    evidence: [
      "Khavinson VK et al., Telomerase activation by Epitalon · Bull Exp Biol Med 2003 · PMID 14661116.",
      "Anisimov VN et al., Epitalon effect on lifespan in mice · Mech Ageing Dev 2003.",
    ],
    sources: [
      { label: "PubMed epitalon", url: "https://pubmed.ncbi.nlm.nih.gov/?term=epitalon" },
      { label: "Khavinson Institute", url: "https://www.gerontology.ru/" },
    ],
  },
  {
    id: "024",
    slug: "aod-9604",
    name: "AOD-9604",
    tagline: "HGH Fragment 176-191 · Lipolytic",
    stage: "Stage 2",
    hp: 130,
    level: 70,
    types: ["metabolic", "growth"],
    card: "/cards/aod-9604.png",
    mechanism: "Synthetic 15-amino-acid fragment of human growth hormone (residues 176-191). Retains the C-terminal lipolytic domain of HGH without the growth-promoting IGF-1 elevation. Drives beta-adrenergic fat oxidation; daily SQ at investigational doses.",
    moves: [
      { name: "Lipolysis Pulse", power: 60, desc: "Fat oxidation. No IGF-1 elevation side effect." },
      { name: "Fragment Flame", power: 100, desc: "Anti-obesity research compound. Phase 2 trials." },
    ],
    evidence: [
      "Heffernan M et al., AOD9604 effects on lipolysis · Endocrinology 2001.",
      "Stier H et al., AOD9604 safety + efficacy in obesity (Phase 2) · J Endocrinol Invest 2013.",
    ],
    sources: [
      { label: "PubMed AOD9604", url: "https://pubmed.ncbi.nlm.nih.gov/?term=AOD9604" },
    ],
  },
  {
    id: "025",
    slug: "kisspeptin-10",
    name: "KISSPEPTIN-10",
    tagline: "HPG Axis Trigger",
    stage: "Stage 1",
    hp: 125,
    level: 72,
    types: ["growth"],
    card: "/cards/kisspeptin-10.png",
    mechanism: "Ten-amino-acid C-terminal fragment of kisspeptin (encoded by KISS1). Direct GPR54 (KISS1R) agonist driving endogenous GnRH neuron firing and downstream LH/FSH release. Imperial College London reproductive-medicine research; investigational anti-anhedonia signal.",
    moves: [
      { name: "GnRH Pulse", power: 70, desc: "Drives endogenous LH + FSH release." },
      { name: "HPG Cascade", power: 110, desc: "Imperial College reproductive trials. Anti-anhedonia signal." },
    ],
    evidence: [
      "Dhillo WS et al., Kisspeptin-54 stimulates LH release in men · J Clin Endocrinol Metab 2005.",
      "Comninos AN et al., Kisspeptin-10 in HSDD pilot trial · JCI Insight 2023.",
    ],
    sources: [
      { label: "PubMed kisspeptin", url: "https://pubmed.ncbi.nlm.nih.gov/?term=kisspeptin-10" },
      { label: "Imperial College kisspeptin", url: "https://www.imperial.ac.uk/" },
    ],
  },
  {
    id: "026",
    slug: "thymosin-alpha-1",
    name: "THYMOSIN α-1",
    tagline: "TA-1 · Zadaxin · Immune Modulator",
    stage: "Stage 2",
    hp: 145,
    level: 80,
    types: ["cytoprotection"],
    card: "/cards/thymosin-alpha-1.png",
    mechanism: "Twenty-eight-amino-acid peptide cleaved from prothymosin-alpha in the thymus gland. Marketed as Zadaxin in EU and Asia for chronic hepatitis B/C and immune dysfunction. FDA orphan drug status. Modulates TLR9 signaling and drives T-cell + NK-cell activity.",
    moves: [
      { name: "T-Cell Surge", power: 70, desc: "Boosts T-cell + NK-cell activity. Immunomodulation." },
      { name: "Zadaxin Protocol", power: 110, desc: "EU/Asia approved. FDA orphan drug status." },
    ],
    evidence: [
      "Camerini R et al., Thymosin alpha-1 review · Ann N Y Acad Sci 2010.",
      "Goldstein AL et al., From lab to FDA · Ann N Y Acad Sci 2012.",
    ],
    sources: [
      { label: "PubMed thymosin alpha-1", url: "https://pubmed.ncbi.nlm.nih.gov/?term=thymosin+alpha-1" },
      { label: "Zadaxin (SciClone)", url: "https://www.sciclone.com/" },
    ],
  },
  {
    id: "027",
    slug: "humanin",
    name: "HUMANIN",
    tagline: "Mitochondrial-Derived Peptide · MDP",
    stage: "Stage 1",
    hp: 135,
    level: 74,
    types: ["longevity"],
    card: "/cards/humanin.png",
    mechanism: "Twenty-four-amino-acid peptide encoded in the mitochondrial 16S-rRNA (cousin to MOTS-c). Anti-apoptotic via BAX inhibition and neuroprotective in Alzheimer's-disease cell-line models. Discovered by Cohen group 2001 from cDNA library of dying neurons.",
    moves: [
      { name: "Anti-Apoptotic", power: 60, desc: "Inhibits BAX-mediated cell death." },
      { name: "Mito Protection", power: 100, desc: "Neuroprotective against amyloid-beta. Cohen group classic." },
    ],
    evidence: [
      "Hashimoto Y et al., Humanin neuroprotection against amyloid-beta · Proc Natl Acad Sci 2001 · PMID 11371646.",
      "Cobb LJ et al., Naturally occurring mitochondrial-derived peptides · Aging 2016.",
    ],
    sources: [
      { label: "PubMed humanin", url: "https://pubmed.ncbi.nlm.nih.gov/?term=humanin" },
    ],
  },
];
