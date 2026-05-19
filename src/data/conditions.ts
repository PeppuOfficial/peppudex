/**
 * Condition / goal categories · for /conditions/[slug] pages.
 * Joined to PEPPUDEX entries via ENRICHMENT[slug].conditions array.
 *
 * Conditions describe the research goal or biological target rather
 * than a mechanism. Same Bulbapedia-style bidirectional linking
 * pattern as mechanisms.ts.
 */

export interface Condition {
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  searchVolume?: string;
}

export const CONDITIONS: Condition[] = [
  {
    slug: "body-composition",
    name: "Body Composition",
    description: "Fat mass, lean mass, and visceral adipose research.",
    longDescription: "Body composition research encompasses fat-mass reduction, lean-mass preservation, and visceral-adipose-tissue (VAT) targeting. Incretin agonists (semaglutide, tirzepatide, retatrutide) drive whole-body fat reduction via central appetite suppression. GHRH analogs (tesamorelin) preferentially target visceral adipose without significant subcutaneous-fat change. Body composition is the highest-volume search cluster in the broader metabolic-medicine category.",
    searchVolume: "Very high",
  },
  {
    slug: "glycemic-control",
    name: "Glycemic Control",
    description: "Blood glucose regulation and HbA1c reduction.",
    longDescription: "Glycemic control encompasses fasting plasma glucose, HbA1c, and post-prandial glucose excursion management. The incretin axis is the dominant pharmacological target; GLP-1 and GIP receptor agonism drives glucose-dependent insulin secretion, glucagon suppression, and delayed gastric emptying. Tirzepatide and retatrutide are the current state-of-the-art compounds.",
  },
  {
    slug: "type-2-diabetes",
    name: "Type 2 Diabetes Research",
    description: "T2D pathophysiology and intervention research.",
    longDescription: "Type 2 diabetes is characterized by insulin resistance and progressive β-cell dysfunction. Incretin-axis agonists are the largest commercial pharmaceutical category of the 2020s in T2D, with semaglutide (Ozempic, Rybelsus), tirzepatide (Mounjaro), and retatrutide (investigational) representing successive generations of receptor pharmacology.",
  },
  {
    slug: "cardiometabolic",
    name: "Cardiometabolic",
    description: "Cardiovascular and metabolic risk markers.",
    longDescription: "Cardiometabolic research targets the cluster of conditions linking metabolic dysfunction to cardiovascular outcomes: dyslipidemia, hypertension, insulin resistance, hepatic steatosis (NAFLD/NASH), and the broader metabolic syndrome. Incretin agonists have shown cardiovascular outcome benefits in major trials (SELECT for semaglutide). Tesamorelin shows benefits in HIV-associated dyslipidemia and NAFLD.",
  },
  {
    slug: "visceral-fat",
    name: "Visceral Fat",
    description: "Intra-abdominal visceral adipose tissue reduction.",
    longDescription: "Visceral adipose tissue (VAT) is the metabolically active fat surrounding intra-abdominal organs, distinct from subcutaneous fat. Elevated VAT independently predicts cardiovascular and metabolic morbidity. Tesamorelin is the only FDA-approved compound specifically labeled for VAT reduction (in HIV-associated lipodystrophy). Newer incretin agonists also reduce VAT alongside whole-body fat.",
  },
  {
    slug: "hiv-lipodystrophy",
    name: "HIV-Lipodystrophy",
    description: "Antiretroviral-therapy-associated body-fat redistribution.",
    longDescription: "HIV-associated lipodystrophy is a syndrome of body-fat redistribution that develops in HIV-infected patients on antiretroviral therapy, characterized by excess visceral abdominal fat and peripheral subcutaneous fat loss. Tesamorelin (Egrifta®, Egrifta SV®) is FDA-approved specifically for reducing excess abdominal fat in this population.",
  },
  {
    slug: "gut-repair",
    name: "Gut Repair",
    description: "GI mucosal barrier and tissue-healing research.",
    longDescription: "Gut repair research encompasses gastric and intestinal mucosal protection, ulcer healing, anastomosis healing, and inflammatory bowel disease research. BPC-157 is the most-studied research peptide for GI mucosal protection, with extensive rat-model evidence on gastric, intestinal, and esophageal cytoprotection from the Sikiric group at the University of Zagreb.",
  },
  {
    slug: "tendon-ligament",
    name: "Tendon & Ligament",
    description: "Connective-tissue healing research.",
    longDescription: "Tendon and ligament healing research targets collagen organization, fibroblast recruitment, and angiogenesis at injury sites. BPC-157 + TB-500 is the most commonly referenced research stack for tendon-ligament recovery in community protocols, on the theory of complementary mechanisms (BPC-157 angiogenesis + TB-500 actin-cytoskeleton-driven cell migration).",
  },
  {
    slug: "wound-healing",
    name: "Wound Healing",
    description: "Dermal and tissue wound-healing research.",
    longDescription: "Wound healing research encompasses dermal, corneal, and ischemic wound contexts. Multiple research peptides target distinct stages: BPC-157 (angiogenesis, granulation tissue), TB-500 (cell migration, re-epithelialization), and GHK-Cu (collagen synthesis, matrix remodeling). Animal-model evidence is strong; human RCT translation is variable across compound and indication.",
  },
  {
    slug: "anti-inflammatory",
    name: "Anti-Inflammatory",
    description: "Inflammation modulation research.",
    longDescription: "Anti-inflammatory research peptides modulate cytokine signaling, NF-κB activation, and immune-cell migration. BPC-157, TB-500, and GHK-Cu all show anti-inflammatory effects in animal models, generally as one component of broader tissue-repair activity rather than as primary anti-inflammatory drugs.",
  },
  {
    slug: "anti-fibrotic",
    name: "Anti-Fibrotic",
    description: "Fibrosis prevention and reversal research.",
    longDescription: "Anti-fibrotic research targets the pathological deposition of extracellular matrix in chronic tissue injury (cardiac, pulmonary, renal, hepatic fibrosis). Thymosin Beta-4 (and its TB-500 fragment) has documented anti-fibrotic activity in cardiac and dermal models. The Ac-SDKP fragment of Thymosin Beta-4 is the specifically anti-fibrotic active site.",
  },
  {
    slug: "cardiac-research",
    name: "Cardiac Research",
    description: "Myocardial repair and protection research.",
    longDescription: "Cardiac research encompasses myocardial-infarction repair, ischemia-reperfusion injury protection, and cardiac fibrosis. Thymosin Beta-4 (Bock-Marquette 2004, Nature) showed reduced infarct size and improved ejection fraction in a mouse MI model — a landmark study supporting cardiac applications of actin-cytoskeleton-modulating peptides.",
  },
  {
    slug: "skin-aging",
    name: "Skin Aging",
    description: "Dermal aging, fine lines, photodamage research.",
    longDescription: "Skin aging research targets the decline in dermal collagen, elastin, and glycosaminoglycan synthesis that produces fine lines, thinning, and photodamage-related dyspigmentation. GHK-Cu is the most-studied research peptide for skin aging, with documented collagen-synthesis induction at the in-vitro and topical-cosmetic levels.",
    searchVolume: "High · +1,016% YoY (per Kamura Life)",
  },
  {
    slug: "hair-loss",
    name: "Hair Loss",
    description: "Androgenic alopecia and follicle research.",
    longDescription: "Hair-loss research targets androgenic alopecia (DHT-driven follicle miniaturization) and other follicle-dystrophic processes. GHK-Cu enlarges hair follicles and prolongs the anagen growth phase in rodent models. Community-reported research protocols cite topical and intradermal applications; no FDA-approved use in hair loss.",
  },
  {
    slug: "anxiety-research",
    name: "Anxiety Research",
    description: "Anxiolytic and stress-pathway research.",
    longDescription: "Anxiety research peptides include Selank (tuftsin-derived heptapeptide) with rodent EPM and conditioned-suppression data describing anxiolytic activity comparable to short-acting benzodiazepines. Mechanism is GABA-A modulation rather than direct benzodiazepine-site binding.",
  },
  {
    slug: "stress",
    name: "Stress Response",
    description: "HPA-axis and stress-pathway research.",
    longDescription: "Stress-response research targets the hypothalamic-pituitary-adrenal (HPA) axis, cortisol regulation, and acute/chronic stress-pathway modulation. Selank shows HPA-axis modulation in rodent stress models. Semax (derived from ACTH(4-10)) lacks corticotropin activity but inherits neurotropic stress-response biology from the parent fragment.",
  },
  {
    slug: "cognition-research",
    name: "Cognition Research",
    description: "Learning, memory, and cognitive performance research.",
    longDescription: "Cognition research peptides target BDNF / TrkB signaling, monoamine modulation, and cortical / hippocampal neuroplasticity. Semax is the most-studied research nootropic in the Peppu Studio catalog, with rodent data on BDNF and TrkB upregulation in hippocampus and basal forebrain.",
  },
  {
    slug: "neuroprotection",
    name: "Neuroprotection",
    description: "Neuronal survival and ischemia-protection research.",
    longDescription: "Neuroprotection research encompasses pre-treatment and post-injury protection of neurons from ischemic, excitotoxic, and oxidative insult. Russian clinical literature describes Semax in stroke-recovery protocols. Mechanism includes BDNF-mediated survival signaling and acute neurotrophic support.",
  },
  {
    slug: "stroke-recovery-research",
    name: "Stroke Recovery",
    description: "Post-stroke functional recovery research.",
    longDescription: "Post-stroke recovery research targets neuroplasticity-driven functional restoration after ischemic brain injury. Russian clinical literature describes Semax in small-cohort stroke recovery trials. No FDA or EMA Phase 3 trials for Semax in stroke recovery as of 2026.",
  },
  {
    slug: "aging",
    name: "Aging",
    description: "Cellular and organismal aging research.",
    longDescription: "Aging research encompasses canonical hallmarks of aging: genomic instability, telomere attrition, epigenetic alterations, loss of proteostasis, deregulated nutrient sensing, mitochondrial dysfunction, cellular senescence, stem-cell exhaustion, and altered intercellular communication. NAD+ and MOTS-c are the most-studied research compounds in this category.",
  },
  {
    slug: "cellular-bioenergetics",
    name: "Cellular Bioenergetics",
    description: "Mitochondrial energy metabolism research.",
    longDescription: "Cellular bioenergetics research targets the production and utilization of ATP through oxidative phosphorylation, the citric-acid cycle, and glycolysis. NAD+ is central as the electron-transfer coenzyme; mitochondrial-derived peptides like MOTS-c emerge as direct regulators of bioenergetic signaling.",
  },
  {
    slug: "dna-repair",
    name: "DNA Repair",
    description: "Genome maintenance and PARP-axis research.",
    longDescription: "DNA repair research targets the cellular response to DNA damage, primarily mediated by PARPs (poly-ADP-ribose polymerases) and sirtuin-driven chromatin remodeling. PARPs consume NAD+ during DNA-damage response; declining NAD+ in aging is hypothesized to limit DNA-repair capacity.",
  },
  {
    slug: "insulin-sensitivity",
    name: "Insulin Sensitivity",
    description: "Peripheral tissue responsiveness to insulin.",
    longDescription: "Insulin sensitivity is the degree to which peripheral tissues respond to a given concentration of circulating insulin. MOTS-c restores insulin sensitivity in diet-induced obese mice (Lee, Cohen 2015). Incretin agonists improve insulin sensitivity indirectly through weight reduction and direct effects on adipose handling.",
  },
  {
    slug: "sleep-architecture",
    name: "Sleep Architecture",
    description: "Sleep-stage modulation and GH-pulse research.",
    longDescription: "Sleep-architecture research targets the timing and depth of slow-wave sleep, during which the natural largest GH pulse occurs. GH-axis peptides (ipamorelin, CJC-1295, tesamorelin) are typically administered in the evening to align with this natural pulse window.",
  },
  {
    slug: "combinatorial",
    name: "Combinatorial Research",
    description: "Multi-component peptide blend research.",
    longDescription: "Combinatorial research panels co-administer multiple peptides engaging distinct receptor classes in a single vial. KLOW blend (Kisspeptin / Laminin / Oxytocin / GHK-Cu) is the canonical example. Per-component literature applies independently; combined-blend pharmacology is not standardized across the field and is challenging to publish in peer-reviewed work.",
  },
  {
    slug: "investigational",
    name: "Investigational",
    description: "Pre-approval compounds in active clinical trials.",
    longDescription: "Investigational compounds are pre-approval pharmaceuticals in active clinical-trial programs but not yet approved by the FDA or comparable regulators. Retatrutide is the canonical example in the Peppu Studio catalog — Phase 3 TRIUMPH program ongoing under Eli Lilly. Research-grade material is supplied as a chemical reference compound for laboratory use only.",
  },
  {
    slug: "anabolic-research",
    name: "Anabolic Research",
    description: "Protein synthesis and lean-mass research compounds.",
    longDescription: "Anabolic research peptides drive protein synthesis through the IGF-1R or GH-axis pathways. IGF-1 LR3 directly engages the IGF-1 receptor with extended half-life vs native IGF-1. GH-axis peptides (ipamorelin, CJC-1295, tesamorelin) drive endogenous GH pulses that elevate hepatic IGF-1 production. All anabolic-axis compounds are prohibited at all times under WADA Section S2.",
  },
];

export const CONDITIONS_BY_SLUG: Record<string, Condition> =
  Object.fromEntries(CONDITIONS.map((c) => [c.slug, c]));
