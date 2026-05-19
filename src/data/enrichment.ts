/**
 * Per-compound enrichment data · joins to PEPPUDEX by slug.
 *
 * Separate from peppudex.ts to keep the "card" view (game flavor)
 * uncluttered. This file holds the heavy SEO content: aliases,
 * molecular structure, evidence grades, mechanism + condition
 * cross-refs, FAQs, citations, regulatory status.
 */

export type Grade = "A" | "B" | "C" | "D" | "F";

export interface Outcome {
  name: string;
  grade: Grade;
  rationale: string;
}

export interface FAQ {
  q: string;
  a: string;
}

export interface Citation {
  pmid?: string;
  nct?: string;
  title: string;
  authors: string;
  journal: string;
  year: number;
  url: string;
}

export interface EntityIds {
  /** CAS Registry Number, e.g. "137525-51-0" */
  cas?: string;
  /** PubChem CID, e.g. "9851727" */
  pubchem?: string;
  /** MeSH descriptor or supplementary concept, e.g. "C543061" */
  mesh?: string;
  /** FDA UNII, e.g. "8FH56G53RD" */
  unii?: string;
  /** KEGG COMPOUND/DRUG, e.g. "D11487" */
  kegg?: string;
  /** ChEMBL ID, e.g. "CHEMBL3989837" */
  chembl?: string;
  /** Wikidata Q-item, e.g. "Q27298054" */
  wikidata?: string;
  /** DrugBank ID, e.g. "DB16110" */
  drugbank?: string;
}

export interface Enrichment {
  aliases: string[];
  classLabel: string;
  formula?: string;
  sequence?: string;
  halfLife?: string;
  routes: string[];
  storage: { lyo: string; recon: string };
  /** mechanism category slugs · joined to mechanisms.ts */
  mechanisms: string[];
  /** condition / goal slugs · joined to conditions.ts */
  conditions: string[];
  outcomes: Outcome[];
  safety: { sideEffects: string[]; interactions: string[]; contraindications: string[] };
  regulatory: { fda: string; wada: string; cn?: string; ru?: string; au?: string; international?: string };
  faqs: FAQ[];
  citations: Citation[];
  lastUpdated: string;
  /** Machine-readable entity identifiers · wires page into Google medical Knowledge Graph.
   *  Emit as `additionalProperty` on DietarySupplement schema + `sameAs` on entity URLs. */
  entityIds?: EntityIds;
  /** Editorial reviewer slug (joined to reviewers/) · defaults to "editorial-board". */
  reviewer?: string;
}

export const ENRICHMENT: Record<string, Enrichment> = {
  "retatrutide": {
    aliases: ["LY3437943", "Reta", "Retatrutide-LY", "triple agonist"],
    classLabel: "Synthetic peptide · triple-receptor incretin agonist",
    formula: "C221H343N51O63",
    halfLife: "~6 days",
    routes: ["Subcutaneous (in published trials)"],
    storage: { lyo: "2–8 °C, 12+ months", recon: "2–8 °C, 28 days" },
    mechanisms: ["incretin-axis", "metabolic"],
    conditions: ["body-composition", "glycemic-control", "investigational"],
    outcomes: [
      { name: "Body weight reduction (24w)", grade: "A", rationale: "Phase 2 NEJM 2023 reported dose-dependent -7.2% to -17.5% LS mean change at 24w (Jastreboff et al., PMID 37366315). High-quality RCT." },
      { name: "Body weight reduction (48w)", grade: "A", rationale: "Same trial 48-week extension: -8.7% to -24.2% LS mean. n=338." },
      { name: "Glycemic improvement", grade: "B", rationale: "Glycemic endpoints improved despite GCGR engagement. Phase 3 TRIUMPH data pending." },
      { name: "Long-term safety", grade: "C", rationale: "Phase 2 GI tolerability profile dose-dependent; dose-related heart-rate increases noted. Phase 3 ongoing." },
    ],
    safety: {
      sideEffects: ["Nausea (dose-dependent)", "Vomiting", "Diarrhea", "Constipation", "Injection-site reactions", "Resting heart-rate increase"],
      interactions: ["Other GLP-1R agonists (concurrent use not studied)", "Insulin / sulfonylureas (hypoglycemia risk)"],
      contraindications: ["Personal/family history of medullary thyroid carcinoma (class-based caution)", "Multiple endocrine neoplasia type 2"],
    },
    regulatory: {
      fda: "Investigational compound · NOT FDA-approved · TRIUMPH Phase 3 program ongoing as of 2026-05.",
      wada: "Not currently listed on the WADA Prohibited List (2026).",
    },
    faqs: [
      { q: "What is retatrutide?", a: "Retatrutide (Eli Lilly code LY3437943) is a synthetic peptide engineered as a triple agonist at the GLP-1, GIP, and glucagon receptors. It is an investigational compound — not FDA-approved — currently in the Phase 3 TRIUMPH program." },
      { q: "How does retatrutide differ from tirzepatide?", a: "Tirzepatide is a dual GLP-1R + GIPR agonist. Retatrutide adds glucagon-receptor agonism on top, which is the key pharmacological differentiator and the basis for the deeper observed weight reductions in Phase 2." },
      { q: "Is retatrutide FDA-approved?", a: "No. Retatrutide is an investigational compound. The Phase 3 TRIUMPH program is ongoing. The substance sold here is supplied as a research-grade reference compound for in-vitro use only." },
      { q: "What was the Phase 2 result?", a: "The published Phase 2 NEJM trial (Jastreboff et al., 2023, PMID 37366315; NCT04881760) reported least-squares mean body-weight reductions of -8.7% to -24.2% across dose arms at 48 weeks vs -2.1% with placebo. Those numbers are the property of the publishing investigators, not claims of this product." },
      { q: "What is the half-life of retatrutide?", a: "Published pharmacokinetic data indicate a terminal half-life around six days, consistent with once-weekly dosing in trials." },
      { q: "Is retatrutide banned by WADA?", a: "Retatrutide is not currently listed on the WADA Prohibited List as of the 2026 update. Status can change — always verify with the current WADA list before competition." },
      { q: "How is retatrutide reconstituted?", a: "Reconstitute lyophilized retatrutide with USP-grade sterile diluent per laboratory protocol. The PEPPUDEX calculator at /calculator returns volume-per-dose math given vial mg, BAC mL, and target mcg." },
      { q: "Can retatrutide be stacked with tirzepatide?", a: "No published research supports simultaneous use of multiple incretin agonists. They engage overlapping pathways and combined use is unstudied. This wiki does not recommend any human dose or combination." },
      { q: "What were the most common side effects in Phase 2?", a: "Gastrointestinal events (nausea, vomiting, diarrhea) were the dominant adverse-event class, dose-dependent and mostly mild-to-moderate. Dose-dependent heart-rate increases peaked at 24 weeks and declined thereafter." },
      { q: "Why does retatrutide cause more weight loss than tirzepatide in trials?", a: "The hypothesis is that glucagon-receptor agonism adds a thermogenic / increased-energy-expenditure component on top of the GLP-1R/GIPR appetite-and-insulin effects. Mechanism is under active study." },
      { q: "What is the manufacturer of retatrutide?", a: "The originator molecule is property of Eli Lilly under the development code LY3437943. Research-grade compounds supplied through Peppu Studio are synthesized for laboratory use only and are distinct from any branded human-prescription formulation." },
      { q: "How long do retatrutide cycles last in published trials?", a: "The published Phase 2 trial dosed once-weekly for 48 weeks. Phase 3 TRIUMPH durations vary by sub-study; consult ClinicalTrials.gov for current protocols." },
      { q: "Does retatrutide affect heart rate?", a: "Phase 2 reported dose-dependent increases in resting heart rate peaking around 24 weeks before declining. This is a class-level signal for incretin agonists at higher doses." },
      { q: "Is retatrutide oral or injectable in trials?", a: "Published trials use subcutaneous injection only. There is no approved or studied oral formulation as of the Phase 2 publication." },
      { q: "What does triple receptor agonism mean?", a: "Retatrutide engages three receptors simultaneously: GLP-1R, GIPR, and the glucagon receptor (GCGR). Each receptor drives a distinct branch of metabolic and energy-expenditure signaling; the molecule is engineered to balance all three." },
    ],
    citations: [
      { pmid: "37366315", title: "Triple-Hormone-Receptor Agonist Retatrutide for Obesity — A Phase 2 Trial", authors: "Jastreboff AM, Kaplan LM, Frías JP, et al.", journal: "N Engl J Med", year: 2023, url: "https://pubmed.ncbi.nlm.nih.gov/37366315/" },
      { nct: "NCT04881760", title: "A Study of LY3437943 in Participants With Obesity (Phase 2)", authors: "Eli Lilly and Company", journal: "ClinicalTrials.gov", year: 2021, url: "https://clinicaltrials.gov/study/NCT04881760" },
    ],
    lastUpdated: "2026-05-19",
    entityIds: {
      pubchem: "162653930",
      chembl: "CHEMBL4297493",
    },
    reviewer: "editorial-board",
  },

  "tirzepatide": {
    aliases: ["Mounjaro", "Zepbound", "LY3298176", "GIP/GLP-1 RA"],
    classLabel: "Synthetic peptide · dual GIP/GLP-1 receptor agonist",
    formula: "C225H348N48O68",
    halfLife: "~5 days",
    routes: ["Subcutaneous (FDA-label)"],
    storage: { lyo: "2–8 °C, manufacturer-label expiration", recon: "2–8 °C, 28 days" },
    mechanisms: ["incretin-axis", "metabolic"],
    conditions: ["body-composition", "glycemic-control", "type-2-diabetes", "cardiometabolic"],
    outcomes: [
      { name: "Body weight reduction (72w)", grade: "A", rationale: "SURMOUNT-1 reported -22.5% body-weight change at 15 mg vs -2.4% placebo at 72w. Large RCT, n=2,539." },
      { name: "HbA1c reduction", grade: "A", rationale: "SURPASS-2 head-to-head vs semaglutide 1 mg: tirzepatide 15 mg -2.30% HbA1c vs -1.86% semaglutide." },
      { name: "Cardiometabolic markers", grade: "A", rationale: "Pooled trial improvements in BP, lipids, liver enzymes." },
      { name: "Weight maintenance", grade: "B", rationale: "SURMOUNT-MAINTAIN supports continued treatment to maintain reduction; cessation produces regain." },
    ],
    safety: {
      sideEffects: ["Nausea", "Vomiting", "Diarrhea", "Constipation", "Pancreatitis (rare, boxed-warning caution)", "Gallbladder disease (rare)"],
      interactions: ["Oral contraceptives (delayed gastric emptying may alter absorption)", "Sulfonylureas / insulin (hypoglycemia risk)"],
      contraindications: ["Personal/family history of medullary thyroid carcinoma", "Multiple endocrine neoplasia type 2"],
    },
    regulatory: {
      fda: "Approved as Mounjaro (T2D, May 2022) and Zepbound (chronic weight management, Nov 2023). Compounded versions restricted since FDA shortage declaration lifted Oct 2024.",
      wada: "Not currently listed on the WADA Prohibited List (2026).",
    },
    faqs: [
      { q: "What is tirzepatide?", a: "Tirzepatide is a 39-amino-acid synthetic peptide that activates the GLP-1 and GIP receptors simultaneously. It is the first dual-incretin agonist marketed in the United States." },
      { q: "What's the difference between Mounjaro and Zepbound?", a: "Same molecule, different label. Mounjaro is FDA-approved for type 2 diabetes (May 2022). Zepbound is the same compound rebranded for chronic weight management (Nov 2023). Different concentrations and titration schedules per label." },
      { q: "Tirzepatide vs semaglutide — which is stronger?", a: "Head-to-head data from SURPASS-2 show tirzepatide 15 mg outperformed semaglutide 1 mg on HbA1c (-2.30% vs -1.86%) and produced larger weight loss. Comparisons at higher semaglutide doses (2.4 mg) are also published; tirzepatide retains an edge on average." },
      { q: "How is tirzepatide dosed?", a: "Per FDA label, tirzepatide is titrated weekly: 2.5 mg starting → 5 mg → up to 15 mg over months. This wiki reproduces the label dose schedule for reference only; any human use should be under qualified clinical supervision." },
      { q: "What is the half-life of tirzepatide?", a: "Approximately five days, enabled by a C20 fatty-acid linker on a modified GIP backbone that drives albumin binding and slow clearance." },
      { q: "Is compounded tirzepatide still legal?", a: "FDA declared the tirzepatide shortage resolved October 2024, restricting compounding under section 503A. Research-grade tirzepatide sold as a chemical reference compound is distinct from compounded human-use formulations and is supplied here for in-vitro research only." },
      { q: "Does tirzepatide cause thyroid cancer?", a: "Class-based rodent C-cell tumor signal led to a boxed warning. Translation to human relevance is debated; current clinical data have not established a causal link, but personal or family history of medullary thyroid carcinoma is a contraindication." },
      { q: "Can tirzepatide be stacked with retatrutide?", a: "No published research supports simultaneous use of multiple incretin agonists. The pathways overlap and combined use is unstudied." },
      { q: "What is the mechanism of tirzepatide?", a: "GLP-1R agonism drives glucose-dependent insulin secretion, glucagon suppression, delayed gastric emptying, and central appetite suppression. GIPR agonism enhances post-prandial insulin and modulates adipocyte lipid handling. Combined activation produces larger absolute weight loss than single-receptor agonism." },
      { q: "How quickly do you lose weight on tirzepatide?", a: "In SURMOUNT-1, mean weight loss followed a curve: ~2-3% by week 4, ~10% by week 24, ~20% by week 72 at the highest dose arm. Individual response varies significantly." },
      { q: "What happens if you stop tirzepatide?", a: "SURMOUNT-4 (re-randomization) showed cessation produces partial weight regain over 52 weeks. Continued treatment is required for maintenance of the loss." },
      { q: "Is tirzepatide banned in sports?", a: "Not currently on the WADA Prohibited List as of 2026. Status reviewable annually." },
      { q: "Can tirzepatide be reconstituted from a research vial?", a: "Yes. Reconstitute lyophilized tirzepatide with USP-grade sterile diluent. The PEPPUDEX /calculator returns the volume-per-dose math given vial size, diluent volume, and target dose." },
      { q: "What's the difference between tirzepatide research-grade and Mounjaro/Zepbound?", a: "The active molecule is the same. Branded human-prescription products are formulated, labeled, and quality-controlled to FDA pharmaceutical standards under separate clinical pathways. Research-grade material is a chemical reference compound for laboratory use only." },
    ],
    citations: [
      { title: "Tirzepatide Once Weekly for the Treatment of Obesity (SURMOUNT-1)", authors: "Jastreboff AM, Aronne LJ, Ahmad NN, et al.", journal: "N Engl J Med", year: 2022, url: "https://www.nejm.org/doi/10.1056/NEJMoa2206038" },
      { title: "Tirzepatide versus Semaglutide Once Weekly in Patients with Type 2 Diabetes (SURPASS-2)", authors: "Frías JP, Davies MJ, Rosenstock J, et al.", journal: "N Engl J Med", year: 2021, url: "https://www.nejm.org/doi/10.1056/NEJMoa2107519" },
      { pmid: "42119587", title: "Tirzepatide for maintenance of bodyweight reduction in people with obesity in the USA (SURMOUNT-MAINTAIN)", authors: "Horn DB, Aronne LJ, Wharton S, et al.", journal: "Lancet", year: 2026, url: "https://pubmed.ncbi.nlm.nih.gov/42119587/" },
    ],
    lastUpdated: "2026-05-19",
    entityIds: {
      cas: "2023788-19-2",
      pubchem: "156588324",
      unii: "8FH56G53RD",
      kegg: "D11487",
      chembl: "CHEMBL4297563",
      wikidata: "Q105087697",
      drugbank: "DB15171",
    },
    reviewer: "editorial-board",
  },

  "bpc-157": {
    aliases: ["BPC157", "Body Protection Compound 157", "PL 14736", "pentadecapeptide"],
    classLabel: "Synthetic 15-amino-acid peptide · gastric-origin fragment",
    formula: "C62H98N16O22",
    sequence: "Gly-Glu-Pro-Pro-Pro-Gly-Lys-Pro-Ala-Asp-Asp-Ala-Gly-Leu-Val",
    halfLife: "~4 hours (rat, intraperitoneal)",
    // entity IDs added below in dedicated object
    routes: ["Subcutaneous", "Intraperitoneal", "Oral (animal studies)"],
    storage: { lyo: "4 °C 24 months, −20 °C indefinite", recon: "2–8 °C, 28 days" },
    mechanisms: ["tissue-repair", "cytoprotection", "angiogenesis"],
    conditions: ["gut-repair", "tendon-ligament", "wound-healing", "anti-inflammatory"],
    outcomes: [
      { name: "Tendon healing (animal)", grade: "B", rationale: "Multiple rat studies (Krivic 2006 PMID 16583442; Staresinic 2006 PMID 16609979) report accelerated tendon-to-bone and quadriceps healing. Strong preclinical signal." },
      { name: "GI mucosal protection (animal)", grade: "B", rationale: "Sikiric group: extensive rat-model evidence of gastric and intestinal cytoprotection. Replicated across multiple sub-injury types." },
      { name: "Tendon healing (human)", grade: "D", rationale: "Limited human clinical evidence. No Phase 3 trials registered. Anecdotal case series only." },
      { name: "Anti-inflammatory effect (human)", grade: "D", rationale: "Mechanism plausible from animal data; insufficient human RCT evidence." },
    ],
    safety: {
      sideEffects: ["Limited human safety data", "Animal toxicology shows wide therapeutic window", "Injection-site reactions reported anecdotally"],
      interactions: ["Anticoagulants (theoretical, due to angiogenic activity — unstudied)"],
      contraindications: ["Active malignancy (theoretical, due to angiogenic mechanism)", "Pregnancy/lactation (unstudied)"],
    },
    regulatory: {
      fda: "Placed on FDA Category 2 of the 503A bulks list (September 2023 update), barring compounding pharmacies from preparing it under section 503A. Not FDA-approved for any human use.",
      wada: "Prohibited at all times (in-competition and out-of-competition) under S0 'non-approved substances' since the 2022 Prohibited List.",
    },
    faqs: [
      { q: "What is BPC-157?", a: "BPC-157 is a synthetic 15-amino-acid peptide derived from a partial fragment of body protection compound, a protein found in human gastric juice. It is one of the most-studied peptides in the animal-model tissue-repair literature." },
      { q: "Is BPC-157 legal in 2026?", a: "In the US: BPC-157 is on FDA Category 2 of the 503A bulks list (Sept 2023 update), meaning compounding pharmacies cannot prepare it. It is sold as a research-grade chemical reference compound. WADA prohibits it in all sports under S0." },
      { q: "What is the half-life of BPC-157?", a: "Animal studies report a plasma half-life around 4 hours after intraperitoneal administration. The peptide is also reported to remain stable in human gastric juice for over 24 hours, which is unusual and theorized to underpin oral activity in animals." },
      { q: "Can BPC-157 be taken orally?", a: "Animal studies show oral and drinking-water routes preserve activity, attributed to the unusual gastric-juice stability. Human oral bioavailability has not been characterized in clinical trials." },
      { q: "BPC-157 vs TB-500 — what's different?", a: "BPC-157 is a 15-aa gastric-derived peptide acting through VEGF/NO pathways and growth-hormone-receptor upregulation. TB-500 is a 7-aa Thymosin Beta-4 fragment that sequesters G-actin. Different mechanisms. They are commonly stacked in recovery research." },
      { q: "Are there human trials for BPC-157?", a: "Limited. Sikiric et al. ran early-phase ulcerative colitis trials (PL 14736 designation). No completed Phase 3 trials registered. ClinicalTrials.gov lists exploratory studies that have not enrolled at scale." },
      { q: "Is BPC-157 FDA-approved?", a: "No. BPC-157 is not FDA-approved for any human indication." },
      { q: "How long do you cycle BPC-157 in animal studies?", a: "Published animal-model protocols typically span 2–8 weeks of daily administration. Community-reported research protocols cite 8–12 week cycles, though those are not clinical recommendations." },
      { q: "Side effects of BPC-157?", a: "Animal toxicology shows a wide therapeutic window with no documented LD1. Human safety data are limited. Theoretical concerns include unstudied effects in active malignancy (via angiogenesis) and pregnancy." },
      { q: "Does BPC-157 help tendons?", a: "Animal-model evidence is substantial: Achilles detachment in rats showed accelerated tendon-to-bone healing (Krivic et al. 2006 PMID 16583442). Transected quadriceps showed accelerated functional recovery (Staresinic et al. 2006 PMID 16609979). Human translation is not yet validated by RCT." },
      { q: "What is the mechanism of action of BPC-157?", a: "Proposed mechanisms include upregulation of growth-hormone-receptor expression in injured tissue, VEGF-driven angiogenesis, modulation of the nitric-oxide pathway in vascular endothelium, and activation of FAK-paxillin signaling. BPC-157 does not bind a single canonical receptor; its activity appears permissive of healing processes already underway." },
      { q: "BPC-157 vs collagen peptides — what's different?", a: "Collagen peptides are dietary protein hydrolysates supplying amino acid building blocks. BPC-157 is a defined synthetic 15-aa sequence acting as a pharmacological signaling molecule. Completely different category and mechanism." },
      { q: "Can BPC-157 be stacked with TB-500?", a: "Stacking BPC-157 + TB-500 is the most common recovery research stack referenced in community protocols, on the theory of complementary mechanisms (BPC-157 angiogenesis + TB-500 actin-cytoskeleton-driven cell migration). No published RCT validates the combination." },
      { q: "Where is BPC-157 manufactured?", a: "Research-grade BPC-157 is synthesized via solid-phase peptide synthesis at certified peptide manufacturing facilities. Peppu Studio publishes per-batch Certificates of Analysis showing HPLC purity and identity confirmation." },
      { q: "How is BPC-157 stored?", a: "Lyophilized BPC-157 is stable at 4 °C for at least 24 months and indefinitely at −20 °C. Reconstituted solution should be stored at 2–8 °C and used within 28 days. Do not freeze the reconstituted solution." },
      { q: "Why was BPC-157 placed on the FDA bulks list?", a: "The September 2023 503A bulks-list update placed BPC-157 in Category 2, citing insufficient evidence for the FDA to determine that compounding it for routine clinical use is safe and effective. The substance remains available as a research-grade chemical reference compound." },
      { q: "BPC-157 for gut health — what's the evidence?", a: "Animal-model evidence is strong: rat ulcerative colitis, ileoileal anastomosis (Vuksic 2007), gastric-mucosal protection studies (Sikiric multi-paper). Human evidence is limited to early-phase ulcerative colitis trial work under the PL 14736 designation." },
      { q: "How does BPC-157 differ from full body protection compound?", a: "Full BPC is a larger protein found in human gastric juice. BPC-157 is a 15-amino-acid fragment of that protein (residues 134-148 of the parent sequence). The fragment retains the cytoprotective and tissue-remodeling activities of the parent." },
    ],
    citations: [
      { pmid: "38980576", title: "New studies with stable gastric pentadecapeptide protecting gastrointestinal tract", authors: "Sikiric P, Sever M, Krezic I, et al.", journal: "Inflammopharmacology", year: 2024, url: "https://pubmed.ncbi.nlm.nih.gov/38980576/" },
      { pmid: "16583442", title: "Achilles detachment in rat and stable gastric pentadecapeptide BPC 157", authors: "Krivic A, Anic T, Seiwerth S, Huljev D, Sikiric P", journal: "J Orthop Res", year: 2006, url: "https://pubmed.ncbi.nlm.nih.gov/16583442/" },
      { pmid: "16609979", title: "Effective therapy of transected quadriceps muscle in rat: Gastric pentadecapeptide BPC 157", authors: "Staresinic M, Sebecic B, Patrlj L, et al.", journal: "J Orthop Res", year: 2006, url: "https://pubmed.ncbi.nlm.nih.gov/16609979/" },
      { pmid: "41754849", title: "Tendon, Ligament, and Muscle Injury · Cytoprotection Review with BPC 157", authors: "Matek D, Matek I, Japjec M, et al.", journal: "Pharmaceuticals (Basel)", year: 2026, url: "https://pubmed.ncbi.nlm.nih.gov/41754849/" },
    ],
    lastUpdated: "2026-05-19",
    entityIds: {
      cas: "137525-51-0",
      pubchem: "108101",
      mesh: "C543061",
    },
    reviewer: "editorial-board",
  },

  "ghk-cu": {
    aliases: ["GHK", "Copper Peptide", "Copper Tripeptide-1", "Gly-His-Lys"],
    classLabel: "Naturally occurring tripeptide-copper complex",
    formula: "C14H24CuN6O4 (Cu²⁺ complex)",
    sequence: "Gly-His-Lys + Cu²⁺",
    halfLife: "Short (minutes) in plasma; longer in tissue depots",
    routes: ["Topical (cosmetic)", "Subcutaneous (research)", "Intradermal (research)"],
    storage: { lyo: "4 °C 24 months protected from light", recon: "2–8 °C, 14 days protected from light (faster degradation than non-copper peptides)" },
    mechanisms: ["tissue-repair", "skin-matrix", "longevity"],
    conditions: ["skin-aging", "hair-loss", "wound-healing", "anti-inflammatory"],
    outcomes: [
      { name: "Collagen synthesis induction (in vitro)", grade: "A", rationale: "Multiple peer-reviewed papers (Pickart 2008 PMID 18644225; Pickart 2012 PMID 22666519). Mechanism well-characterized in dermal fibroblasts." },
      { name: "Wound healing (animal)", grade: "B", rationale: "Canapp 2003 dog ischemic wound model (PMID 14648531). Replicated across rodent and porcine models." },
      { name: "Skin appearance (topical, human)", grade: "B", rationale: "Conference-abstract level (Leyden 2002) and book-chapter compilations report improvement in fine lines, density, and clarity from 0.05–0.1% topical creams. Not full RCT publications." },
      { name: "Hair growth (human)", grade: "D", rationale: "Community-reported anecdotal. No completed Phase 3 hair-loss trials with GHK-Cu as primary intervention." },
      { name: "Anti-aging gene expression", grade: "B", rationale: "Pickart 2015 transcriptomic study reported modulation of multiple thousand genes in fibroblasts at the dose tested. Magnitude varies by cell type, dose, exposure window." },
    ],
    safety: {
      sideEffects: ["Localized erythema (injection site)", "Transient hyperpigmentation (topical, in some users)", "Rare contact dermatitis"],
      interactions: ["Vitamin C (theoretical · copper-ascorbate redox cycling)", "Retinoids (may potentiate irritation when stacked topically)"],
      contraindications: ["Wilson's disease (copper-accumulation disorder)", "Active malignancy at the local site (theoretical, due to angiogenic activity)"],
    },
    regulatory: {
      fda: "Topical GHK-Cu formulations are marketed as cosmetic ingredients under FDA cosmetic regulation (cosmetics generally do not require FDA premarket approval). Injectable forms are research-use only.",
      wada: "Not listed on the WADA Prohibited List (2026).",
    },
    faqs: [
      { q: "What is GHK-Cu?", a: "GHK-Cu is the tripeptide glycyl-L-histidyl-L-lysine bound to a copper(II) ion. It was first isolated from human plasma in 1973 by Loren Pickart and has been the subject of over 200 peer-reviewed papers on skin remodeling, wound healing, and transcriptional gene modulation." },
      { q: "Is GHK-Cu FDA-approved?", a: "Topical GHK-Cu is regulated as a cosmetic ingredient (no FDA premarket approval required for cosmetics). Injectable formulations are not FDA-approved for any human indication and are supplied as research-grade chemical reference compounds." },
      { q: "GHK-Cu for skin — does it work?", a: "Topical evidence for skin improvement is strong at the mechanism level (collagen, elastin, GAG synthesis upregulation in fibroblasts) and moderate at the human cosmetic-trial level (Leyden 2002 conference abstract; Finkley 2005 book chapter). Most published topical work uses 0.01–0.1% formulations." },
      { q: "GHK-Cu for hair loss — does it work?", a: "Mechanism-level data show GHK-Cu enlarges hair follicles and prolongs the anagen phase in rodent models. Human hair-loss clinical evidence is anecdotal; no completed Phase 3 trials with GHK-Cu as the primary intervention." },
      { q: "How is GHK-Cu different from free GHK?", a: "Free GHK is the uncomplexed tripeptide. GHK-Cu is GHK bound to a Cu²⁺ ion in a 1:1 complex. The copper-bound form is the biologically active species in most in-vitro readouts and is what circulates in human plasma." },
      { q: "Why does plasma GHK decline with age?", a: "Pickart's reviews quote a decline from roughly 200 µg/L at age 20 to roughly 80 µg/L at age 60. This is a summary of historical published assays, not from a single prospective cohort. The decline is hypothesized to contribute to age-related tissue-repair slowdown." },
      { q: "What is the storage shelf-life of reconstituted GHK-Cu?", a: "14 days at 2–8 °C protected from light. Copper-peptide complexes degrade faster than non-copper peptides in solution due to redox activity. The lyophilized cake is stable for 24+ months at 4 °C." },
      { q: "Can GHK-Cu be injected?", a: "GHK-Cu is supplied as a research-grade injectable reference compound. Community-reported research protocols (1–2 mg, 2–3× per week subcutaneously) are not validated by published clinical trials and are not recommendations from this wiki." },
      { q: "Is GHK-Cu banned by WADA?", a: "GHK-Cu is not currently on the WADA Prohibited List as of the 2026 publication." },
      { q: "What is the molecular formula of GHK-Cu?", a: "The complex is C14H24CuN6O4 (glycyl-L-histidyl-L-lysine + one Cu²⁺ ion in a square-planar coordination)." },
      { q: "Why is GHK-Cu blue?", a: "The Cu²⁺ ion in the GHK-Cu complex has a characteristic d-d electronic absorption in the visible spectrum, producing the iconic cobalt-blue color of reconstituted GHK-Cu and the pale-blue lyophilized cake." },
      { q: "Can GHK-Cu be used with retinoids?", a: "Topical co-formulation is common in cosmetic products. Co-application can potentiate skin barrier disruption and irritation in sensitive users; alternating evenings rather than simultaneous application is the common approach." },
      { q: "How does GHK-Cu modulate gene expression?", a: "Pickart's transcriptomic study (Vasquez-Soltero et al. 2015) reported modulation of multiple thousand genes in dermal fibroblasts at the dose tested. The 4,000-gene figure widely cited online comes from that specific in-vitro readout; magnitude varies by cell type, dose, and exposure window." },
      { q: "GHK-Cu vs copper peptide creams — what's different?", a: "Many over-the-counter 'copper peptide' products contain GHK-Cu or related copper-tripeptides at lower percentages. Research-grade GHK-Cu sold as lyophilized powder is the same molecule supplied at known purity for laboratory reconstitution to any desired concentration." },
      { q: "Is GHK-Cu safe in pregnancy?", a: "Not studied in pregnancy or lactation. Research-grade GHK-Cu is supplied for in-vitro use only; no human dose is recommended." },
    ],
    citations: [
      { pmid: "18644225", title: "The human tri-peptide GHK and tissue remodeling", authors: "Pickart L", journal: "J Biomater Sci Polym Ed", year: 2008, url: "https://pubmed.ncbi.nlm.nih.gov/18644225/" },
      { pmid: "22666519", title: "The human tripeptide GHK-Cu in prevention of oxidative stress and degenerative conditions of aging", authors: "Pickart L, Vasquez-Soltero JM, Margolina A", journal: "Oxid Med Cell Longev", year: 2012, url: "https://pubmed.ncbi.nlm.nih.gov/22666519/" },
      { pmid: "29986520", title: "Regenerative and protective actions of the GHK-Cu peptide in the light of the new gene data", authors: "Pickart L, Margolina A", journal: "Int J Mol Sci", year: 2018, url: "https://pubmed.ncbi.nlm.nih.gov/29986520/" },
      { pmid: "14648531", title: "The effect of topical tripeptide-copper complex on healing of ischemic open wounds", authors: "Canapp SO Jr, et al.", journal: "Vet Surg", year: 2003, url: "https://pubmed.ncbi.nlm.nih.gov/14648531/" },
    ],
    lastUpdated: "2026-05-19",
    entityIds: {
      cas: "49557-75-7",
      pubchem: "73591",
      mesh: "C012326",
      chembl: "CHEMBL511685",
    },
    reviewer: "editorial-board",
  },

  "tb-500": {
    aliases: ["TB500", "Thymosin Beta-4 fragment 17-23", "Ac-LKKTETQ", "TB4 fragment"],
    classLabel: "Synthetic 7-amino-acid fragment of Thymosin Beta-4",
    formula: "C44H73N11O14",
    sequence: "Ac-LKKTETQ (residues 17–23 of parent Tβ4)",
    halfLife: "~2 hours (rat)",
    routes: ["Subcutaneous", "Intramuscular"],
    storage: { lyo: "4 °C 24 months, −20 °C indefinite", recon: "2–8 °C, 28 days" },
    mechanisms: ["tissue-repair", "actin-cytoskeleton", "angiogenesis"],
    conditions: ["tendon-ligament", "cardiac-research", "wound-healing", "anti-fibrotic"],
    outcomes: [
      { name: "Cardiac repair (animal)", grade: "B", rationale: "Bock-Marquette 2004 (PMID 15565145): Nature paper showed reduced infarct size and improved ejection fraction in mouse MI model." },
      { name: "Corneal wound healing (animal)", grade: "B", rationale: "Sosne 2001 (PMID 11311052) corneal scrape study in rats. Full-length Tβ4 has Phase 2 RegeneRx data in dry-eye." },
      { name: "Dermal wound healing (animal)", grade: "B", rationale: "Philp 2003 (PMID 12581423) accelerated closure in db/db diabetic and aged mice." },
      { name: "Tendon/ligament healing (human)", grade: "D", rationale: "No human Phase 3 trials for TB-500 specifically. RegeneRx Tβ4 trials cover dry-eye and venous stasis ulcers, not tendon." },
    ],
    safety: {
      sideEffects: ["Limited human safety data", "Injection-site reactions reported anecdotally", "Theoretical fatigue or lethargy in early administration"],
      interactions: ["Anticoagulants (theoretical, due to angiogenic activity — unstudied)"],
      contraindications: ["Active malignancy (theoretical, due to angiogenic + cell-migration mechanism)", "Pregnancy/lactation (unstudied)"],
    },
    regulatory: {
      fda: "Not FDA-approved for any human use. Research-use only.",
      wada: "Prohibited at all times under Section S2 (Peptide Hormones, Growth Factors, Related Substances and Mimetics) — Thymosin Beta-4 and its derivatives named explicitly in the 2018 Prohibited List update.",
    },
    faqs: [
      { q: "What is TB-500?", a: "TB-500 is a synthetic 7-amino-acid acetylated fragment (Ac-LKKTETQ) corresponding to residues 17–23 of Thymosin Beta-4, the dominant G-actin-sequestering protein in eukaryotic cells." },
      { q: "TB-500 vs Thymosin Beta-4 — what's different?", a: "Full Thymosin Beta-4 is a 43-amino-acid protein. TB-500 is a 7-aa active fragment that retains the actin-sequestering and cell-migration-promoting biology at a fraction of the manufacturing cost." },
      { q: "TB-500 vs BPC-157 — which is better for healing?", a: "Different mechanisms. BPC-157 is a 15-aa gastric-derived peptide acting through VEGF/NO/GHR pathways. TB-500 is a 7-aa Thymosin Beta-4 fragment acting through actin cytoskeleton modulation. They are commonly stacked in recovery research; no head-to-head RCT exists." },
      { q: "Is TB-500 banned by WADA?", a: "Yes. Thymosin Beta-4 and its derivatives, including TB-500, were named explicitly under Section S2 in the 2018 WADA Prohibited List update. Prohibited at all times (in-competition and out-of-competition)." },
      { q: "Is TB-500 FDA-approved?", a: "No. TB-500 is not FDA-approved for any human therapeutic use. Research-grade material is supplied for laboratory use only." },
      { q: "What is the half-life of TB-500?", a: "Animal pharmacokinetic data report a plasma half-life around 2 hours, with longer tissue residence in cardiac and dermal sites." },
      { q: "How does TB-500 work?", a: "TB-500 binds monomeric G-actin, sequestering it from the F-actin polymerization pool. The cellular consequence is enhanced cell migration — particularly endothelial cells and stem-cell populations involved in tissue repair. Downstream effects include VEGF upregulation, recruitment of endogenous stem cells, anti-inflammatory NF-κB downregulation, and laminin-5 deposition in epithelial healing." },
      { q: "Can TB-500 be stacked with BPC-157?", a: "BPC-157 + TB-500 is the most commonly referenced recovery research stack in community protocols, on the theory of complementary mechanisms. No published clinical RCT validates the specific combination." },
      { q: "TB-500 for cardiac repair — what's the evidence?", a: "Bock-Marquette et al. 2004 (Nature, PMID 15565145) showed full Thymosin Beta-4 reduced infarct size and improved ejection fraction in a mouse myocardial infarction model. TB-500 fragment retains the relevant actin-cytoskeleton biology." },
      { q: "Side effects of TB-500?", a: "Limited human safety data. Animal toxicology shows a wide therapeutic window. Theoretical concerns include unstudied effects in active malignancy (due to angiogenic + cell-migration mechanism) and pregnancy." },
      { q: "How is TB-500 reconstituted?", a: "Reconstitute lyophilized TB-500 with USP-grade sterile diluent per laboratory protocol. The PEPPUDEX /calculator returns the volume-per-dose math." },
      { q: "How long do TB-500 cycles last in animal studies?", a: "Animal protocols vary from single-dose cardiac-MI experiments to 4–6 week dermal wound-healing studies. Community-reported research cycles cite 4–6 week loading phases at 2–5 mg/week followed by maintenance, though these are not clinical recommendations." },
      { q: "Why is TB-500 called the 'cell migration peptide'?", a: "Because its primary biology — binding monomeric G-actin and shifting the actin equilibrium — promotes directed cell migration. Endothelial cells migrate to angiogenic sites, stem cells migrate to injury sites, and epithelial cells migrate during wound closure." },
      { q: "Where does TB-500 come from?", a: "Thymosin Beta-4 was first isolated from calf thymus in 1981 by Allan Goldstein at George Washington University. TB-500 is the synthetic 7-aa active fragment, manufactured via solid-phase peptide synthesis." },
    ],
    citations: [
      { pmid: "20179146", title: "Biological activities of thymosin beta4 defined by active sites in short peptide sequences", authors: "Sosne G, Qiu P, Goldstein AL, Wheater M", journal: "FASEB J", year: 2010, url: "https://pubmed.ncbi.nlm.nih.gov/20179146/" },
      { pmid: "15565145", title: "Thymosin beta-4 activates integrin-linked kinase and promotes cardiac cell migration, survival and cardiac repair", authors: "Bock-Marquette I, Saxena A, White MD, et al.", journal: "Nature", year: 2004, url: "https://pubmed.ncbi.nlm.nih.gov/15565145/" },
      { pmid: "16099219", title: "Thymosin beta-4: actin-sequestering protein moonlights to repair injured tissues", authors: "Goldstein AL, Hannappel E, Kleinman HK", journal: "Trends Mol Med", year: 2005, url: "https://pubmed.ncbi.nlm.nih.gov/16099219/" },
    ],
    lastUpdated: "2026-05-19",
    entityIds: {
      cas: "77591-33-4",
      pubchem: "16132341",
      chembl: "CHEMBL2107871",
    },
    reviewer: "editorial-board",
  },

  "klow-blend": {
    aliases: ["KLOW", "Kisspeptin/Laminin/Oxytocin/GHK-Cu blend"],
    classLabel: "Four-component combinatorial peptide research panel",
    halfLife: "Per-component varies",
    routes: ["Subcutaneous (research)"],
    storage: { lyo: "2–8 °C protected from light, 12+ months", recon: "2–8 °C, 14 days protected from light (limited by GHK-Cu component)" },
    mechanisms: ["multi-pathway", "tissue-repair", "skin-matrix"],
    conditions: ["combinatorial", "skin-aging", "wound-healing"],
    outcomes: [
      { name: "Per-component literature applies", grade: "B", rationale: "Each component has independent peer-reviewed literature. See GHK-Cu, BPC-157 entries." },
      { name: "Combined-blend pharmacology", grade: "F", rationale: "No peer-reviewed publication studies the KLOW four-component combination as a unit. Combinatorial pharmacology of mixed-component peptide vials is not standardized." },
    ],
    safety: {
      sideEffects: ["Inherits side-effect profiles of all four component peptides"],
      interactions: ["Per-component interactions apply"],
      contraindications: ["Per-component contraindications apply (most restrictive: Wilson's disease for the GHK-Cu component, pregnancy for all)"],
    },
    regulatory: {
      fda: "Not FDA-approved as a finished drug under this combinatorial label. Per-component status varies.",
      wada: "Per-component WADA status varies. GHK-Cu, kisspeptin-10, and oxytocin are not currently listed. BPC-157 (if substituted in the formulation) is prohibited under S0.",
    },
    faqs: [
      { q: "What is KLOW blend?", a: "KLOW is a four-component combinatorial research panel: Kisspeptin-10, Laminin-derived peptide (or BPC-157 in some formulations), Oxytocin, and GHK-Cu co-lyophilized in a single vial. Supplied as a research-grade chemical reference compound for laboratory use only." },
      { q: "What does KLOW stand for?", a: "K = Kisspeptin · L = Laminin-derived peptide · O = Oxytocin · W = GHK-Cu (with W standing for 'Wound' / 'Wellness' depending on supplier naming; the molecule is the copper-binding tripeptide GHK-Cu)." },
      { q: "Is KLOW the same across suppliers?", a: "No. The acronym is a trade-name convention rather than a regulated formulation. Ratios between the four components vary by supplier. Buyers using KLOW in published research should disclose the specific per-batch composition." },
      { q: "Is there published research on the KLOW blend as a unit?", a: "No peer-reviewed publication studies the KLOW four-component combination as a single research unit. Per-component literature applies independently. Combinatorial pharmacology of mixed-component peptide vials is challenging to publish because batch composition is not standardized." },
      { q: "Why is the KLOW shelf-life shorter than the components?", a: "The reconstituted shelf-life is limited by the GHK-Cu component — copper-peptide complexes degrade faster than non-copper peptides in solution. Use within 14 days, protected from light." },
      { q: "Why is BPC-157 sometimes included in KLOW?", a: "Some suppliers substitute BPC-157 for the laminin component, on the rationale that BPC-157's cytoprotective mechanism complements the other three components. Check the per-batch CoA for the actual composition." },
      { q: "What is kisspeptin-10?", a: "Kisspeptin-10 is the C-terminal decapeptide fragment of kisspeptin-54, the natural ligand of the GPR54 (KISS1R) receptor. GPR54 is a key upstream regulator of hypothalamic GnRH secretion and therefore a central node of the HPG axis." },
      { q: "What is the oxytocin component?", a: "Oxytocin is the cyclic nonapeptide produced endogenously in the hypothalamus. Its receptor (OXTR) is expressed in uterine smooth muscle, lactating mammary tissue, and CNS regions implicated in social bonding and stress response." },
      { q: "Is KLOW FDA-approved?", a: "No. None of the four KLOW components is FDA-approved as a finished drug under this combinatorial label. The blend is supplied as a research-grade chemical reference compound for laboratory use only." },
    ],
    citations: [
      { title: "The metastasis suppressor gene KiSS-1 encodes kisspeptins, the natural ligands of GPR54", authors: "Kotani M, Detheux M, Vandenbogaerde A, et al.", journal: "J Biol Chem", year: 2001, url: "https://pubmed.ncbi.nlm.nih.gov/?term=Kotani+KiSS-1+GPR54" },
      { title: "The oxytocin receptor system: structure, function, and regulation", authors: "Gimpl G, Fahrenholz F", journal: "Physiol Rev", year: 2001, url: "https://pubmed.ncbi.nlm.nih.gov/?term=Gimpl+oxytocin+receptor" },
    ],
    lastUpdated: "2026-05-19",
  },

  "nad-plus": {
    aliases: ["NAD+", "NAD", "Nicotinamide adenine dinucleotide", "Coenzyme I"],
    classLabel: "Endogenous redox coenzyme (not a peptide)",
    formula: "C21H27N7O14P2",
    halfLife: "Short (minutes) in plasma; intracellular pools cycled continuously",
    routes: ["Subcutaneous (research)", "Intravenous (research)", "Oral precursors (NR, NMN) widely used"],
    storage: { lyo: "2–8 °C protected from light, 12+ months", recon: "2–8 °C protected from light, aliquot-freeze beyond 7 days" },
    mechanisms: ["longevity", "mitochondrial-function", "sirtuin-axis"],
    conditions: ["aging", "cellular-bioenergetics", "dna-repair"],
    outcomes: [
      { name: "Sirtuin activation (in vitro)", grade: "A", rationale: "Sirtuins are NAD+-dependent enzymes; sirtuin activity scales with cellular NAD+ status. Established biochemistry, decades of literature." },
      { name: "Cellular NAD+ pool restoration (precursors)", grade: "B", rationale: "NR and NMN precursor trials reliably raise blood NAD+ levels. Yoshino, Imai, Baur review (PMID 29249689)." },
      { name: "Functional aging endpoints (human)", grade: "C", rationale: "Translation of NAD+ precursor supplementation to functional endpoints (cognition, energy, metabolic markers) shows mixed results in trials. Effect sizes modest." },
      { name: "Direct exogenous NAD+ administration", grade: "D", rationale: "Direct administration of full NAD+ at the cell-membrane scale is debated; most translational interest centers on precursors that cross the plasma membrane more efficiently." },
    ],
    safety: {
      sideEffects: ["Injection-site flushing (subcutaneous)", "Nausea / chest pressure (IV, dose-dependent)", "Headache reported in IV protocols"],
      interactions: ["Methyl-donor depletion theoretical with chronic high-dose precursor use"],
      contraindications: ["Active malignancy (theoretical, due to NAD+-PARP role in cancer-cell DNA repair)", "Pregnancy/lactation (unstudied)"],
    },
    regulatory: {
      fda: "Not FDA-approved as a drug. NAD+ precursors NR and NMN have been subject to FDA enforcement actions in 2022–2024 regarding their classification as dietary supplements vs investigational drugs. Exogenous NAD+ salt remains a chemistry reagent under standard laboratory-use framing.",
      wada: "Not currently listed on the WADA Prohibited List (2026).",
    },
    faqs: [
      { q: "What is NAD+?", a: "NAD+ is nicotinamide adenine dinucleotide in its oxidized form. It is an endogenous coenzyme found in every living cell, transferring electrons in glycolysis, the citric-acid cycle, and oxidative phosphorylation, and serving as obligate substrate of sirtuins, PARPs, and CD38." },
      { q: "Is NAD+ a peptide?", a: "No. NAD+ is a dinucleotide coenzyme — a small organic molecule consisting of two nucleotides (nicotinamide-ribose-phosphate and adenosine-monophosphate) joined by a pyrophosphate bridge. It is included in the PEPPUDEX as a longevity-research reference compound." },
      { q: "NAD+ vs NR vs NMN — which is best?", a: "NR (nicotinamide riboside) and NMN (nicotinamide mononucleotide) are NAD+ precursors that cross the plasma membrane more efficiently than full NAD+. Most clinical research uses precursors; direct NAD+ administration is debated. The precursors are most relevant for oral supplementation." },
      { q: "Why does NAD+ decline with age?", a: "CD38 ectoenzyme activity increases with age, hydrolyzing NAD+ on cell surfaces. Increased oxidative stress and PARP activation also consume NAD+. The net result is a documented decline in cellular NAD+ across mammalian tissues with aging (Imai & Guarente, Trends Cell Biol 2014; PMID 24786309)." },
      { q: "Is NAD+ FDA-approved?", a: "No. NAD+ is not FDA-approved as a drug. The NAD+ precursors NR and NMN have been the subject of FDA enforcement actions regarding their classification as dietary supplements vs investigational drugs. Exogenous NAD+ salt is sold as a chemistry reagent for laboratory use." },
      { q: "What does NAD+ do biochemically?", a: "Three distinct roles: (1) electron transfer in dehydrogenase reactions, generating NADH for the electron-transport chain; (2) obligate substrate of class-III lysine deacylases (SIRT1–SIRT7); (3) substrate of poly-ADP-ribose polymerases (PARPs) and CD38 ectoenzymes." },
      { q: "What's the half-life of injected NAD+?", a: "Short — on the order of minutes in plasma. Intracellular pools are cycled continuously through the salvage pathway. Most research interest is therefore in raising intracellular NAD+ via precursors that cross the plasma membrane." },
      { q: "Can NAD+ reverse aging?", a: "There is no clinical evidence that NAD+ supplementation reverses aging. Precursor trials reliably raise blood NAD+ but show modest and mixed effects on functional aging endpoints (cognition, energy, metabolic markers). The biology is real; the translation is incomplete." },
      { q: "Is NAD+ banned in sports?", a: "Not currently listed on the WADA Prohibited List as of 2026." },
      { q: "How is NAD+ stored?", a: "Lyophilized NAD+ is stable at 2–8 °C protected from light for 12+ months. Reconstituted solution should be stored at 2–8 °C protected from light and aliquot-frozen for storage beyond 7 days. Avoid repeat freeze-thaw." },
      { q: "Why is NAD+ light-sensitive?", a: "The nicotinamide moiety undergoes photochemical decomposition under UV exposure, producing inactive degradation products. Amber-glass vials or foil-wrapped clear vials are standard practice." },
    ],
    citations: [
      { pmid: "29249689", title: "NAD+ Intermediates: The Biology and Therapeutic Potential of NMN and NR", authors: "Yoshino J, Baur JA, Imai S", journal: "Cell Metab", year: 2018, url: "https://pubmed.ncbi.nlm.nih.gov/29249689/" },
      { pmid: "24786309", title: "NAD+ and sirtuins in aging and disease", authors: "Imai S, Guarente L", journal: "Trends Cell Biol", year: 2014, url: "https://pubmed.ncbi.nlm.nih.gov/24786309/" },
      { pmid: "29744033", title: "NAD+ biosynthesis, aging, and disease", authors: "Johnson S, Imai S", journal: "F1000Res", year: 2018, url: "https://pubmed.ncbi.nlm.nih.gov/29744033/" },
    ],
    lastUpdated: "2026-05-19",
    entityIds: {
      cas: "53-84-9",
      pubchem: "5892",
      mesh: "D009243",
      unii: "0U46U6E8UK",
      kegg: "C00003",
      chembl: "CHEMBL1234856",
      wikidata: "Q201172",
      drugbank: "DB00540",
    },
    reviewer: "editorial-board",
  },

  "mots-c": {
    aliases: ["MOTS-c", "Mitochondrial ORF of 12S rRNA-c", "MDP-16"],
    classLabel: "Mitochondrial-derived 16-amino-acid peptide (MDP)",
    formula: "C84H139N21O22S2",
    sequence: "MRWQEMGYIFYPRKLR",
    halfLife: "~30 min plasma (rodent), longer tissue residence",
    routes: ["Subcutaneous (research)", "Intraperitoneal (animal studies)"],
    storage: { lyo: "4 °C 24 months, −20 °C indefinite", recon: "2–8 °C, 28 days" },
    mechanisms: ["metabolic", "mitochondrial-function", "exercise-mimetic"],
    conditions: ["insulin-sensitivity", "aging", "cellular-bioenergetics"],
    outcomes: [
      { name: "Insulin sensitivity in diet-induced obese mice", grade: "B", rationale: "Lee, Cohen et al. 2015 (Cell Metab, PMID 25738459) — the discovery paper showed MOTS-c reversed insulin resistance in mice." },
      { name: "Physical performance / age-related decline", grade: "B", rationale: "Reynolds JC et al. 2021 (Nat Commun, PMID 33473109) — MOTS-c improved treadmill performance and grip strength in aged mice." },
      { name: "AMPK activation (in vitro)", grade: "A", rationale: "Mechanism well-characterized. MOTS-c inhibits the folate cycle and de novo purine biosynthesis, activating AMPK." },
      { name: "Human metabolic outcomes", grade: "D", rationale: "Early-stage. Several small studies on insulin-resistance populations listed on ClinicalTrials.gov; no Phase 3 completions." },
    ],
    safety: {
      sideEffects: ["Limited human safety data", "Animal toxicology shows wide therapeutic window"],
      interactions: ["Anti-diabetic medications (theoretical, due to insulin-sensitivity effect)"],
      contraindications: ["Active malignancy (theoretical)", "Pregnancy/lactation (unstudied)"],
    },
    regulatory: {
      fda: "Not FDA-approved for any human use. Research-use only.",
      wada: "Not currently listed on the WADA Prohibited List (2026).",
    },
    faqs: [
      { q: "What is MOTS-c?", a: "MOTS-c is a 16-amino-acid peptide encoded by a short open reading frame (sORF) within the mitochondrial 12S rRNA region. It was discovered in 2015 by Pinchas Cohen's lab at USC and is one of a small but growing class of mitochondrial-derived peptides (MDPs)." },
      { q: "Why is MOTS-c unique among peptides?", a: "Because it is encoded by the mitochondrial genome, not the nuclear genome. Almost every other peptide in human pharmacology is nuclear-encoded. This discovery overturned the assumption that mtDNA encodes only the 13 oxidative-phosphorylation subunits plus rRNAs and tRNAs." },
      { q: "MOTS-c mechanism of action?", a: "MOTS-c translocates to the cell nucleus under metabolic stress (glucose deprivation, oxidative stress, exercise), where it modulates nuclear gene expression in response to mitochondrial state. It activates AMPK, enhances glucose uptake in skeletal muscle independently of insulin, and improves insulin sensitivity in diet-induced obese rodent models." },
      { q: "What does MOTS-c do for exercise?", a: "MOTS-c is called an exercise-mimetic peptide because exercise is one of the natural triggers for its release from mitochondria. In aged mice, exogenous MOTS-c administration improves treadmill performance and grip strength (Reynolds et al. 2021, PMID 33473109)." },
      { q: "Is MOTS-c FDA-approved?", a: "No. MOTS-c is not FDA-approved for any human indication. It is supplied as a research-grade chemical reference compound." },
      { q: "Are there human trials for MOTS-c?", a: "Early-stage only. Several small studies on insulin-resistance populations are listed on ClinicalTrials.gov, but no Phase 3 completions exist as of 2026-05." },
      { q: "Does MOTS-c decline with age?", a: "Yes. Multiple human cohort studies (Du et al. 2018, Lu et al. 2019, others) report declining plasma MOTS-c levels with age. The magnitude varies by assay and population, and the precise reference range remains under active investigation." },
      { q: "Is MOTS-c banned in sports?", a: "Not currently listed on the WADA Prohibited List as of 2026." },
      { q: "MOTS-c vs metformin — which activates AMPK better?", a: "Both activate AMPK, by different upstream mechanisms. Metformin inhibits complex I of the electron-transport chain, raising AMP and triggering AMPK via LKB1. MOTS-c inhibits the folate cycle and de novo purine biosynthesis. No head-to-head clinical comparison exists." },
      { q: "How long do MOTS-c cycles last in animal studies?", a: "Animal protocols vary from acute single-dose experiments to 4–10 week chronic administration. Community-reported research protocols cite 4–8 week cycles, though these are not clinical recommendations." },
      { q: "What is the molecular weight of MOTS-c?", a: "Approximately 2,174 Da. Sequence: MRWQEMGYIFYPRKLR (16 residues, including two methionine residues with sulfur groups)." },
    ],
    citations: [
      { pmid: "25738459", title: "The mitochondrial-derived peptide MOTS-c promotes metabolic homeostasis and reduces obesity and insulin resistance", authors: "Lee C, Zeng J, Drew BG, et al.", journal: "Cell Metab", year: 2015, url: "https://pubmed.ncbi.nlm.nih.gov/25738459/" },
      { pmid: "33473109", title: "MOTS-c is an exercise-induced mitochondrial-encoded regulator of age-dependent physical decline and muscle homeostasis", authors: "Reynolds JC, Lai RW, Woodhead JST, et al.", journal: "Nat Commun", year: 2021, url: "https://pubmed.ncbi.nlm.nih.gov/33473109/" },
      { pmid: "29983246", title: "The Mitochondrial-Encoded Peptide MOTS-c Translocates to the Nucleus to Regulate Nuclear Gene Expression", authors: "Kim KH, Son JM, Benayoun BA, Lee C", journal: "Cell Metab", year: 2018, url: "https://pubmed.ncbi.nlm.nih.gov/29983246/" },
    ],
    lastUpdated: "2026-05-19",
    reviewer: "editorial-board",
  },

  "tesamorelin": {
    aliases: ["TH9507", "Egrifta", "Egrifta SV", "GHRH(1-44) stabilized analog"],
    classLabel: "Synthetic stabilized GHRH(1-44) analog",
    formula: "C221H366N72O67S",
    halfLife: "~26 min plasma",
    routes: ["Subcutaneous (FDA-label, daily)"],
    storage: { lyo: "Per branded label until expiration. Research-grade: 2–8 °C, 12+ months", recon: "2–8 °C, 28 days" },
    mechanisms: ["gh-axis", "lipolysis"],
    conditions: ["visceral-fat", "hiv-lipodystrophy", "body-composition"],
    outcomes: [
      { name: "Visceral adipose reduction (HIV-LD population)", grade: "A", rationale: "Pooled Phase 3 (Falutz 2010, PMID 20554713; JAIDS 2010, PMID 20101189): -15.4% to -18% VAT vs placebo at 26 weeks." },
      { name: "IGF-1 elevation", grade: "A", rationale: "Consistent dose-dependent IGF-1 increase across trials." },
      { name: "Body composition (general population)", grade: "C", rationale: "Off-label evidence limited. Theoretical applicability of GHRH-driven endogenous GH pulses to non-HIV-LD subjects is reasonable but not RCT-validated outside the approved label." },
      { name: "NASH/MAFLD outcomes", grade: "B", rationale: "Stanley et al. (2019) reported reduced hepatic steatosis in HIV-NAFLD subjects on tesamorelin. Replicated subset findings; not yet a definitive Phase 3 outcome." },
    ],
    safety: {
      sideEffects: ["Injection-site reactions", "Arthralgia", "Peripheral edema", "Carpal tunnel symptoms (transient)", "Hyperglycemia (mild, in some)"],
      interactions: ["Corticosteroids may blunt GH response", "Concurrent rhGH not recommended"],
      contraindications: ["Active malignancy", "Pituitary tumor", "Pregnancy/lactation", "Hypersensitivity to mannitol"],
    },
    regulatory: {
      fda: "FDA-approved as Egrifta® (2010) and Egrifta SV® (reformulated 2019) for reduction of excess abdominal fat in HIV-infected patients with lipodystrophy.",
      wada: "Prohibited at all times under Section S2 (Peptide Hormones, Growth Factors, Related Substances and Mimetics) in the GHRH-analog sub-category.",
    },
    faqs: [
      { q: "What is tesamorelin?", a: "Tesamorelin is a stabilized 44-amino-acid analog of human growth-hormone-releasing hormone GHRH(1-44). It is the only GHRH analog currently FDA-approved for a chronic indication (HIV-associated lipodystrophy, marketed as Egrifta® and Egrifta SV®)." },
      { q: "What is tesamorelin approved for?", a: "Reduction of excess abdominal fat in HIV-infected patients with lipodystrophy. The branded human-prescription products (Egrifta, Egrifta SV) are FDA-approved under separate clinical pathways. Marketing rights are held by Theratechnologies Inc. (Montreal)." },
      { q: "How does tesamorelin work?", a: "Tesamorelin binds the GHRH receptor on anterior-pituitary somatotrophs and stimulates pulsatile growth-hormone release that approximates the natural diurnal pattern. The resulting GH elevation drives hepatic IGF-1 production. The net effect in lipodystrophic patients is preferential lipolysis of visceral adipose with little change in subcutaneous adipose." },
      { q: "Tesamorelin vs CJC-1295 — what's different?", a: "Both are GHRH analogs. Tesamorelin is a stabilized GHRH(1-44) — preserves the full natural 44-aa hormone sequence. CJC-1295 is a GHRH(1-29) analog with stabilizing substitutions; the With-DAC variant adds an albumin-tethering linker that extends half-life to a week. Tesamorelin is FDA-approved; CJC-1295 is research-use only." },
      { q: "What is the half-life of tesamorelin?", a: "Approximately 26 minutes plasma half-life. The N-terminal trans-3-hexenoic-acid modification protects against DPP-IV cleavage and extends half-life sufficiently for once-daily clinical dosing." },
      { q: "Can tesamorelin be used for general body composition?", a: "Off-label evidence is limited. Theoretical applicability to non-HIV-LD body composition research is reasonable given the GHRH-mediated mechanism, but no Phase 3 trials outside the approved HIV-LD label. This wiki does not recommend any human dose." },
      { q: "Is tesamorelin banned in sports?", a: "Yes. Tesamorelin is prohibited at all times under WADA Section S2 in the GHRH-analog sub-category. Detectable on standard anti-doping screens." },
      { q: "Side effects of tesamorelin?", a: "Most common per Phase 3 data: injection-site reactions, arthralgia, peripheral edema, transient carpal-tunnel-type symptoms, and mild hyperglycemia in a minority. The trials reported no clinically meaningful changes in fasting glucose at the approved 2 mg dose." },
      { q: "What is the difference between Egrifta and Egrifta SV?", a: "Same active molecule. Egrifta SV (2019) is a reformulated version with smaller injection volume and updated stability, intended to improve compliance over the original Egrifta (2010). Both are 2 mg daily subcutaneous." },
      { q: "How is research-grade tesamorelin different from Egrifta?", a: "The active molecule is the same. Branded Egrifta is formulated, labeled, and quality-controlled to FDA pharmaceutical standards. Research-grade tesamorelin sold as a chemical reference compound is for laboratory use only and is not interchangeable with the approved product." },
      { q: "Does tesamorelin affect NAFLD / fatty liver?", a: "Stanley et al. (2019) reported reduced hepatic steatosis in HIV-NAFLD subjects on tesamorelin. Subset findings have been replicated; not yet a definitive Phase 3 outcome for general NAFLD." },
      { q: "What is the molecular formula of tesamorelin?", a: "C221H366N72O67S. Molecular weight approximately 5,196 Da." },
    ],
    citations: [
      { pmid: "20554713", title: "Effects of tesamorelin (TH9507), a growth hormone-releasing factor analog, in HIV patients with excess abdominal fat: pooled analysis of two phase 3 trials", authors: "Falutz J, Mamputu JC, Potvin D, et al.", journal: "J Clin Endocrinol Metab", year: 2010, url: "https://pubmed.ncbi.nlm.nih.gov/20554713/" },
      { pmid: "20101189", title: "Effects of tesamorelin in HIV-infected patients with abdominal fat accumulation: a randomized placebo-controlled trial with safety extension", authors: "Falutz J, Potvin D, Mamputu JC, et al.", journal: "J Acquir Immune Defic Syndr", year: 2010, url: "https://pubmed.ncbi.nlm.nih.gov/20101189/" },
    ],
    lastUpdated: "2026-05-19",
    entityIds: {
      cas: "218949-48-5",
      unii: "92I64C2X5W",
      drugbank: "DB08858",
      chembl: "CHEMBL2107274",
    },
    reviewer: "editorial-board",
  },

  "ipa-cjc1295": {
    aliases: ["Ipamorelin", "CJC-1295 No DAC", "Mod GRF 1-29", "GHS pair", "growth-hormone secretagogue stack"],
    classLabel: "Two-peptide research pair · selective ghrelin agonist + GHRH analog",
    halfLife: "Ipamorelin ~2 hr · CJC-1295 No DAC ~30 min",
    routes: ["Subcutaneous (research)"],
    storage: { lyo: "4 °C 24 months", recon: "2–8 °C, 28 days" },
    mechanisms: ["gh-axis"],
    conditions: ["body-composition", "sleep-architecture", "aging"],
    outcomes: [
      { name: "Selective GH pulse (in vitro / animal)", grade: "A", rationale: "Ipamorelin selectively binds GHS-R1a without significant cortisol/prolactin elevation (Raun et al. 1998)." },
      { name: "Postoperative ileus (human Phase 2)", grade: "C", rationale: "Beck et al. 2014 (PMID 25331030, NCT00672074) Phase 2 trial showed numerical but not statistically significant reduction in time-to-first-bowel-movement. Helsinn/Lilly sponsor program discontinued." },
      { name: "IGF-1 elevation (CJC-1295 with-DAC)", grade: "B", rationale: "Teichman et al. 2006 (ConjuChem Phase 1/2) reported sustained IGF-1 elevation. Two deaths in lipodystrophy trial halted that program." },
      { name: "Body composition (human)", grade: "D", rationale: "Community-reported research protocols. No completed Phase 3 trials." },
    ],
    safety: {
      sideEffects: ["Injection-site reactions", "Mild flushing", "Transient hunger (ipamorelin component)", "Rare water retention"],
      interactions: ["Concurrent rhGH not recommended", "Insulin / glucose-lowering agents (mild hyperglycemia possible)"],
      contraindications: ["Active malignancy", "Pituitary tumor", "Pregnancy/lactation"],
    },
    regulatory: {
      fda: "Not FDA-approved. Sponsored Phase 2 program for ipamorelin (postoperative ileus) discontinued. CJC-1295 with-DAC ConjuChem program halted.",
      wada: "Both prohibited at all times under WADA Section S2. Ipamorelin in the growth-hormone-secretagogue sub-category. CJC-1295 in the GHRH-analog sub-category.",
    },
    faqs: [
      { q: "What is ipamorelin / CJC-1295?", a: "Ipamorelin / CJC-1295 is a two-peptide research pair commonly co-administered. Ipamorelin is a selective agonist of the ghrelin / growth-hormone secretagogue receptor (GHS-R1a). CJC-1295 (No DAC variant) is a stabilized GHRH(1-29) analog. The pair amplifies the GH pulse via dual-pathway activation." },
      { q: "What is the difference between CJC-1295 with DAC and No DAC?", a: "CJC-1295 with DAC carries a maleimidopropionic-acid (MPA) linker that covalently binds plasma albumin in vivo, extending half-life to roughly one week. CJC-1295 No DAC (also called modified GRF(1-29) or Mod GRF 1-29) lacks the MPA linker and has the same short half-life as native GHRH (~30 min). Most current research uses the No-DAC variant; the With-DAC ConjuChem trial program was halted." },
      { q: "Why is ipamorelin stacked with CJC-1295?", a: "Ipamorelin and CJC-1295 activate two complementary upstream pathways for GH release. Ipamorelin engages the ghrelin receptor; CJC-1295 engages the GHRH receptor. Combined stimulation produces synergistic GH pulses larger than either alone in animal-model studies." },
      { q: "Is ipamorelin selective?", a: "Yes. Ipamorelin selectively stimulates pulsatile GH release from anterior-pituitary somatotrophs without significant cortisol, prolactin, or aldosterone elevation. This selectivity distinguishes it from older GH-releasing peptides like GHRP-6 and Hexarelin, which raise stress hormones." },
      { q: "Is ipamorelin FDA-approved?", a: "No. The Helsinn/Lilly Phase 2 ipamorelin program for postoperative ileus (Beck et al. 2014, PMID 25331030) was discontinued. No subsequent FDA approval." },
      { q: "Are ipamorelin and CJC-1295 banned in sports?", a: "Yes. Both are prohibited at all times under WADA Section S2 — ipamorelin in the growth-hormone-secretagogue sub-category, CJC-1295 in the GHRH-analog sub-category." },
      { q: "What is the half-life of ipamorelin?", a: "Approximately 2 hours plasma half-life. The pulse-and-decay profile lasts roughly 3–4 hours in published pharmacokinetic studies." },
      { q: "What is the half-life of CJC-1295 No DAC?", a: "Approximately 30 minutes — the same as native GHRH(1-29). The stabilizing substitutions resist DPP-IV cleavage but do not add albumin tethering. Hence the need for multiple daily injections in research protocols." },
      { q: "Does ipamorelin / CJC-1295 stack with retatrutide?", a: "Different mechanisms; no published combination data. Retatrutide is an incretin agonist (GLP-1R, GIPR, GCGR). Ipamorelin/CJC-1295 act on the GH-axis. Theoretical complementarity exists; no clinical RCT validates the combination." },
      { q: "Side effects of ipamorelin / CJC-1295?", a: "Most common in community-reported research protocols: mild injection-site reactions, transient hunger (ghrelin-receptor component), mild flushing, rare water retention. Safer profile than older non-selective GHS like GHRP-6." },
      { q: "When should ipamorelin / CJC-1295 be administered in animal studies?", a: "Typical animal-model protocols use evening administration to align with the natural largest GH pulse during slow-wave sleep. Empty-stomach administration is preferred because elevated blood glucose blunts GH response." },
      { q: "How is ipamorelin / CJC-1295 stored?", a: "Lyophilized: 4 °C for 24 months. Reconstituted: 2–8 °C, use within 28 days." },
    ],
    citations: [
      { pmid: "19289567", title: "Efficacy of ipamorelin, a novel ghrelin mimetic, in a rodent model of postoperative ileus", authors: "Venkova K, Mann W, Nelson R, Greenwood-Van Meerveld B", journal: "J Pharmacol Exp Ther", year: 2009, url: "https://pubmed.ncbi.nlm.nih.gov/19289567/" },
      { title: "Prolonged stimulation of growth hormone and IGF-I secretion by CJC-1295 in healthy adults", authors: "Teichman SL, Neale A, Lawrence B, et al.", journal: "J Clin Endocrinol Metab", year: 2006, url: "https://pubmed.ncbi.nlm.nih.gov/?term=Teichman+CJC-1295" },
    ],
    lastUpdated: "2026-05-19",
    entityIds: {
      cas: "170851-70-4",
      pubchem: "11270044",
      chembl: "CHEMBL420628",
    },
    reviewer: "editorial-board",
  },

  "selank": {
    aliases: ["Selank", "TKPRPGP", "tuftsin-PGP analog"],
    classLabel: "Synthetic heptapeptide · tuftsin derivative",
    formula: "C33H57N11O9",
    sequence: "Thr-Lys-Pro-Arg-Pro-Gly-Pro",
    halfLife: "Short (minutes) plasma; intranasal retention longer",
    routes: ["Intranasal (registered Russian protocol)", "Subcutaneous (research)"],
    storage: { lyo: "4 °C 12+ months", recon: "2–8 °C, 28 days" },
    mechanisms: ["nootropic", "anxiolytic", "gabaergic"],
    conditions: ["anxiety-research", "cognition-research", "stress"],
    outcomes: [
      { name: "Anxiolytic activity (rodent)", grade: "B", rationale: "Kozlovskaya et al. multi-paper rodent EPM and conditioned-suppression data. Russian-language primary literature; subset Western-indexed." },
      { name: "BDNF modulation (rodent)", grade: "C", rationale: "Inozemtseva 2008 reported transient BDNF mRNA elevation. Limited replication outside Russian Academy of Sciences." },
      { name: "Human anxiolytic outcomes", grade: "C", rationale: "Russian clinical literature describes small open-label trials at 0.15% intranasal solution. No FDA or EMA Phase 3 trials." },
    ],
    safety: {
      sideEffects: ["Mild nasal irritation (intranasal route)", "Headache reported", "Limited Western safety data"],
      interactions: ["GABAergic medications (theoretical · unstudied combination)"],
      contraindications: ["Pregnancy/lactation (unstudied in Western literature)"],
    },
    regulatory: {
      fda: "Not FDA-approved. Research-use only in the United States.",
      wada: "Not currently listed on the WADA Prohibited List (2026).",
    },
    faqs: [
      { q: "What is Selank?", a: "Selank is a synthetic heptapeptide (Thr-Lys-Pro-Arg-Pro-Gly-Pro) developed at the Institute of Molecular Genetics of the Russian Academy of Sciences from the natural immunomodulator tuftsin. The C-terminal Pro-Gly-Pro extension stabilizes the peptide against rapid plasma proteolysis." },
      { q: "Is Selank FDA-approved?", a: "No. Selank is research-use only in the United States. It is registered as a research and anxiolytic compound within the Russian Federation under a domestic pharmaceutical authority." },
      { q: "Selank vs Semax — what's the difference?", a: "Both are Russian-developed heptapeptides built on the same C-terminal Pro-Gly-Pro stabilizing strategy. Selank is derived from tuftsin (immunomodulatory parent). Semax is derived from the ACTH(4-10) fragment (neurotropic parent). Different mechanisms: Selank is studied for GABAergic anxiolytic pathways, Semax for BDNF-mediated cognitive pathways." },
      { q: "How does Selank work?", a: "Proposed mechanisms include modulation of GABA-A receptor expression and binding affinity in cortical and hippocampal tissue, increased serotonin (5-HT) turnover in rodent brain, and BDNF mRNA upregulation in selected forebrain regions. Selank also inherits some immunomodulatory activity from its tuftsin parent (macrophage and NK-cell activation)." },
      { q: "Is Selank banned in sports?", a: "Not currently listed on the WADA Prohibited List as of 2026." },
      { q: "How is Selank administered in Russian clinical practice?", a: "The Russian-approved formulation is a 0.15% intranasal solution. Clinical literature describes 2–3 drops per nostril, 2–3 times per day. This wiki does not recommend any human dose." },
      { q: "What is tuftsin?", a: "Tuftsin (Thr-Lys-Pro-Arg) is a natural tetrapeptide isolated in 1970 by Najjar and Nishioka at Tufts University from the heavy chain of immunoglobulin G (residues 289–292 of the Fc fragment). It stimulates phagocytosis, NK cell activity, and macrophage-mediated immune response. Selank's C-terminal Pro-Gly-Pro extension stabilizes the parent tetrapeptide." },
      { q: "Side effects of Selank?", a: "Limited Western safety data. Russian literature describes mild nasal irritation and rare headache at standard intranasal doses." },
      { q: "Is there Western peer-reviewed Selank literature?", a: "Subset of the Russian-language preclinical work is indexed in Western journals. Vyunova TV et al. (Acta Naturae 2018) is a representative review accessible via PubMed." },
      { q: "How does Selank compare to benzodiazepines?", a: "Russian preclinical literature describes anxiolytic activity in rodent elevated-plus-maze and conditioned-suppression paradigms, with potency comparable to short-acting benzodiazepines at the doses tested. Without GABA-A direct binding, Selank theoretically lacks the dependence and withdrawal profile of benzodiazepines — though this is not validated by Western RCT." },
    ],
    citations: [
      { title: "Selank and short peptides of the tuftsin family in the regulation of adaptive behavior in stress", authors: "Kozlovskaya MM, Kozlovskii II, Val'dman EA, Seredenin SB", journal: "Neurosci Behav Physiol", year: 2003, url: "https://pubmed.ncbi.nlm.nih.gov/?term=Kozlovskaya+Selank" },
      { title: "Synthetic Peptides as Promising Anxiolytics of New Generation: Experimental and Clinical Justification", authors: "Vyunova TV, Andreeva LA, Shevchenko KV, Myasoedov NF", journal: "Acta Naturae", year: 2018, url: "https://pubmed.ncbi.nlm.nih.gov/?term=Vyunova+Synthetic+Peptides+Anxiolytics" },
    ],
    lastUpdated: "2026-05-19",
  },

  "ss-31": {
    aliases: ["Elamipretide", "Bendavia", "MTP-131", "SS31", "Szeto-Schiller peptide"],
    classLabel: "Mitochondrial-targeted tetrapeptide",
    formula: "C32H49N9O5",
    sequence: "D-Arg-(2',6'-dimethylTyr)-Lys-Phe-NH2",
    halfLife: "~3 hours plasma",
    routes: ["Subcutaneous (clinical)"],
    storage: { lyo: "2–8 °C, 12+ months", recon: "2–8 °C, 28 days" },
    mechanisms: ["mitochondrial-function", "longevity"],
    conditions: ["aging", "cellular-bioenergetics", "cardiac-research"],
    outcomes: [
      { name: "Cardiolipin binding (in vitro)", grade: "A", rationale: "Well-characterized cardiolipin interaction on the inner mitochondrial membrane. Szeto lab multi-paper biochemistry." },
      { name: "Cardiac ischemia-reperfusion (animal)", grade: "B", rationale: "Multiple rodent and large-animal models report reduced infarct size and preserved ATP under ischemic stress." },
      { name: "Mitochondrial myopathy (human)", grade: "B", rationale: "Stealth BioTherapeutics Phase 2/3 program in Barth syndrome and primary mitochondrial myopathy. Mixed primary-endpoint outcomes; signal in functional sub-measures." },
      { name: "Geographic atrophy / AMD", grade: "C", rationale: "Stealth ReNEW / ReGAIN trials in dry AMD reported mixed results. FDA approval pending as of 2026." },
    ],
    safety: {
      sideEffects: ["Injection-site reactions", "Mild headache reported in trials"],
      interactions: ["No major drug-drug interactions documented"],
      contraindications: ["Pregnancy/lactation (unstudied)", "Hypersensitivity"],
    },
    regulatory: {
      fda: "Investigational. Stealth BioTherapeutics has submitted regulatory packages for elamipretide in Barth syndrome and dry AMD; full FDA approval not granted as of 2026-05.",
      wada: "Not listed on the WADA Prohibited List (2026).",
    },
    faqs: [
      { q: "What is SS-31?", a: "SS-31 (also called elamipretide, Bendavia, MTP-131) is a mitochondrial-targeted tetrapeptide developed by Hazel Szeto and Peter Schiller. It selectively binds cardiolipin on the inner mitochondrial membrane to stabilize cristae structure and preserve electron-transport-chain coupling under stress." },
      { q: "How does SS-31 work?", a: "SS-31 partitions into the inner mitochondrial membrane and binds cardiolipin — the unique phospholipid that anchors respiratory-chain supercomplexes. By stabilizing cardiolipin-protein interactions, SS-31 preserves OXPHOS efficiency, reduces electron leak (ROS generation), and protects against ischemia-reperfusion injury." },
      { q: "Is SS-31 FDA-approved?", a: "No. Stealth BioTherapeutics has submitted regulatory packages for elamipretide in Barth syndrome and dry age-related macular degeneration; full FDA approval has not been granted as of 2026-05. Research-grade SS-31 is supplied for laboratory use only." },
      { q: "SS-31 vs MOTS-c — what's different?", a: "Both are mitochondrial-relevant peptides but with different mechanisms. SS-31 is a synthetic 4-aa peptide that binds cardiolipin to preserve membrane structure. MOTS-c is an endogenous 16-aa peptide encoded by mitochondrial DNA that activates AMPK and modulates nuclear gene expression. They target different aspects of mitochondrial biology." },
      { q: "Is SS-31 banned in sports?", a: "Not currently listed on the WADA Prohibited List as of 2026." },
      { q: "What is the half-life of SS-31?", a: "Approximately 3 hours plasma in humans, sufficient for once-daily subcutaneous dosing in the Stealth clinical program." },
      { q: "What conditions has SS-31 been studied for?", a: "Primary mitochondrial myopathy, Barth syndrome, dry age-related macular degeneration (geographic atrophy), heart failure with preserved ejection fraction, and ischemia-reperfusion injury in cardiac and renal contexts." },
      { q: "Side effects of SS-31?", a: "Clinical trials report mostly mild injection-site reactions and occasional headache. The peptide has been well-tolerated across multiple Phase 2/3 trials." },
    ],
    citations: [
      { title: "Mitochondria-targeted peptide accelerates ATP recovery and reduces ischemic kidney injury", authors: "Szeto HH, Schiller PW", journal: "J Am Soc Nephrol", year: 2011, url: "https://pubmed.ncbi.nlm.nih.gov/?term=Szeto+SS-31+mitochondrial" },
      { title: "Cardiolipin stabilizes respiratory-chain supercomplexes", authors: "Pfeiffer K, Gohil V, Stuart RA, et al.", journal: "J Biol Chem", year: 2003, url: "https://pubmed.ncbi.nlm.nih.gov/?term=Pfeiffer+cardiolipin+supercomplexes" },
    ],
    lastUpdated: "2026-05-19",
  },

  "wolverine-blend": {
    aliases: ["Wolverine Stack", "BPC + TB + GHK Blend", "Triple Regen Blend"],
    classLabel: "Three-component combinatorial regen research panel",
    halfLife: "Per-component varies",
    routes: ["Subcutaneous (research)"],
    storage: { lyo: "2–8 °C protected from light", recon: "2–8 °C, 14 days (limited by GHK-Cu component)" },
    mechanisms: ["tissue-repair", "multi-pathway", "angiogenesis"],
    conditions: ["combinatorial", "tendon-ligament", "wound-healing"],
    outcomes: [
      { name: "Per-component literature applies", grade: "B", rationale: "Each component has independent animal-model evidence." },
      { name: "Combined-blend pharmacology", grade: "F", rationale: "No peer-reviewed publication studies the three-component blend as a unit." },
    ],
    safety: {
      sideEffects: ["Inherits side-effect profiles of all three components"],
      interactions: ["Per-component interactions apply"],
      contraindications: ["Active malignancy (theoretical · all three components are pro-angiogenic)", "Pregnancy/lactation (unstudied)"],
    },
    regulatory: {
      fda: "Not FDA-approved as a combined product. Per-component status varies. BPC-157 is on FDA Category 2 of the 503A bulks list.",
      wada: "BPC-157 prohibited under S0. TB-500 prohibited under S2. GHK-Cu not listed.",
    },
    faqs: [
      { q: "What is Wolverine blend?", a: "Wolverine is a research-grade combinatorial panel containing three regen-research peptides: BPC-157 (cytoprotection + angiogenesis), TB-500 (G-actin sequestration + cell migration), and GHK-Cu (collagen + matrix induction). The name comes from the X-Men character's accelerated tissue regeneration." },
      { q: "Why are these three peptides combined?", a: "On the theory of complementary mechanisms covering the major stages of tissue repair: BPC-157 drives angiogenesis and cytoprotection at the injury site; TB-500 sequesters G-actin to promote endothelial-cell and stem-cell migration into the wound bed; GHK-Cu induces collagen and matrix-protein synthesis for structural remodeling." },
      { q: "Is Wolverine blend FDA-approved?", a: "No. None of the three component peptides is FDA-approved for any human therapeutic use under this combinatorial label. Research-grade material is supplied for laboratory use only." },
      { q: "Wolverine vs KLOW — what's different?", a: "Both are combinatorial blends. KLOW is a four-component skin/HPG panel (Kisspeptin + Laminin + Oxytocin + GHK-Cu). Wolverine is a three-component regen panel (BPC-157 + TB-500 + GHK-Cu). Different target — KLOW for skin/reproductive, Wolverine for connective-tissue recovery." },
      { q: "How is Wolverine blend stored?", a: "Lyophilized at 2–8 °C protected from light. Reconstituted shelf-life is 14 days at 2–8 °C — limited by the GHK-Cu component which degrades faster than non-copper peptides in solution." },
      { q: "Is Wolverine blend banned in sports?", a: "Two of three components are WADA-prohibited: BPC-157 (S0 non-approved substances) and TB-500 (S2 peptide hormones/growth factors). GHK-Cu is not listed. The blend should be assumed prohibited in competition." },
    ],
    citations: [
      { pmid: "38980576", title: "BPC-157 stable gastric pentadecapeptide (cytoprotection review)", authors: "Sikiric P et al.", journal: "Inflammopharmacology", year: 2024, url: "https://pubmed.ncbi.nlm.nih.gov/38980576/" },
      { pmid: "20179146", title: "Biological activities of thymosin beta4 / TB-500 active sites", authors: "Sosne G, Qiu P, Goldstein AL, Wheater M", journal: "FASEB J", year: 2010, url: "https://pubmed.ncbi.nlm.nih.gov/20179146/" },
      { pmid: "18644225", title: "The human tri-peptide GHK and tissue remodeling", authors: "Pickart L", journal: "J Biomater Sci Polym Ed", year: 2008, url: "https://pubmed.ncbi.nlm.nih.gov/18644225/" },
    ],
    lastUpdated: "2026-05-19",
  },

  "5-amino-1mq": {
    aliases: ["5A1MQ", "5-amino-1-methylquinolinium iodide", "NNMT inhibitor"],
    classLabel: "Small-molecule NNMT inhibitor (not a peptide)",
    formula: "C10H11IN2",
    halfLife: "Short plasma half-life (oral bioavailable)",
    routes: ["Oral (in animal studies)", "Subcutaneous (research)"],
    storage: { lyo: "Room temperature in sealed container, light-protected", recon: "Stable in aqueous solution; refrigerate" },
    mechanisms: ["metabolic", "longevity"],
    conditions: ["body-composition", "insulin-sensitivity", "aging"],
    outcomes: [
      { name: "NNMT enzymatic inhibition (in vitro)", grade: "A", rationale: "Well-characterized small-molecule inhibitor of nicotinamide N-methyltransferase." },
      { name: "Adipose mass reduction (DIO mice)", grade: "B", rationale: "Neelakantan et al. 2017 reported reduced adipose mass in diet-induced obese mice without changes in food intake." },
      { name: "Human metabolic outcomes", grade: "D", rationale: "No completed human Phase 2/3 trials. Most evidence preclinical." },
    ],
    safety: {
      sideEffects: ["Limited human safety data", "Animal studies report wide therapeutic window"],
      interactions: ["Methyl-donor depletion theoretical with chronic dosing (NNMT methylates nicotinamide using SAM)"],
      contraindications: ["Pregnancy/lactation (unstudied)"],
    },
    regulatory: {
      fda: "Not FDA-approved. Research chemical.",
      wada: "Not currently listed on the WADA Prohibited List (2026).",
    },
    faqs: [
      { q: "What is 5-amino-1MQ?", a: "5-amino-1MQ (5-amino-1-methylquinolinium iodide) is a small-molecule selective inhibitor of nicotinamide N-methyltransferase (NNMT), the enzyme that methylates nicotinamide using S-adenosylmethionine (SAM)." },
      { q: "Is 5-amino-1MQ a peptide?", a: "No. 5-amino-1MQ is a small-molecule research chemical, not a peptide. It is included in the PEPPUDEX because it intersects with the NAD+/SAM/methionine-cycle longevity research that the wider peptide community follows." },
      { q: "How does 5-amino-1MQ work?", a: "By inhibiting NNMT, 5-amino-1MQ blocks the methylation of nicotinamide. The result is preserved intracellular pools of nicotinamide (→ NAD+ salvage substrate) and SAM (→ methyl-donor pool). In adipose tissue, NNMT is overexpressed in obesity; inhibition has been shown to reduce adipose mass in diet-induced obese mice." },
      { q: "Is 5-amino-1MQ FDA-approved?", a: "No. 5-amino-1MQ is a research chemical. No human clinical trials have completed as of 2026." },
      { q: "Is 5-amino-1MQ banned in sports?", a: "Not currently listed on the WADA Prohibited List as of 2026." },
      { q: "What is NNMT?", a: "Nicotinamide N-methyltransferase. The enzyme that transfers a methyl group from S-adenosylmethionine (SAM) to nicotinamide, producing 1-methylnicotinamide. NNMT is overexpressed in obese adipose tissue and is theorized to deplete SAM and NAD+ pools in adipocytes, contributing to metabolic dysfunction." },
      { q: "Side effects of 5-amino-1MQ?", a: "Limited human safety data. Animal studies report wide therapeutic windows. Theoretical concerns include methyl-donor depletion with chronic dosing." },
    ],
    citations: [
      { title: "Nicotinamide N-methyltransferase knockdown protects against diet-induced obesity", authors: "Kraus D, Yang Q, Kong D, et al.", journal: "Nature", year: 2014, url: "https://pubmed.ncbi.nlm.nih.gov/?term=Kraus+NNMT+knockdown" },
      { title: "Selective NNMT inhibitor (5-amino-1MQ) reduces adiposity in DIO mice", authors: "Neelakantan H, Vance V, Wetzel MD, et al.", journal: "J Med Chem", year: 2017, url: "https://pubmed.ncbi.nlm.nih.gov/?term=Neelakantan+NNMT+inhibitor" },
    ],
    lastUpdated: "2026-05-19",
  },

  "adamax": {
    aliases: ["Adamax", "ARA-290-related peptide", "Cibinetide-class"],
    classLabel: "EPO-derived non-erythropoietic peptide analog (research-grade)",
    halfLife: "Short plasma (minutes)",
    routes: ["Subcutaneous (research)"],
    storage: { lyo: "4 °C, 12+ months", recon: "2–8 °C, 28 days" },
    mechanisms: ["tissue-repair", "neurotrophic"],
    conditions: ["neuroprotection", "anti-inflammatory"],
    outcomes: [
      { name: "IRR activation (in vitro)", grade: "B", rationale: "ARA-290 and related EPO analogs are well-documented activators of the innate-repair-receptor heterocomplex (EPOR + βcR)." },
      { name: "Neuroprotection (animal)", grade: "B", rationale: "ARA-290 shows neuroprotective effects in rodent models of diabetic neuropathy and ischemic injury." },
      { name: "Human RCT evidence", grade: "D", rationale: "ARA-290 has small-cohort clinical data in sarcoidosis-related small-fiber neuropathy. Limited Western RCT data for Adamax specifically." },
    ],
    safety: {
      sideEffects: ["Limited human safety data", "Importantly: no erythropoietic activity at standard research doses (the engineering goal)"],
      interactions: ["Unstudied · theoretical interactions with EPO or anti-inflammatory medications"],
      contraindications: ["Pregnancy/lactation (unstudied)", "Active malignancy (theoretical EPO-pathway concern)"],
    },
    regulatory: {
      fda: "Not FDA-approved. Research chemical.",
      wada: "EPO-class status under S2 may apply depending on specific analog. Buyers should verify with current WADA list.",
    },
    faqs: [
      { q: "What is Adamax?", a: "Adamax is a research-grade EPO-derived peptide analog related to ARA-290 (cibinetide). Engineered to activate the innate-repair-receptor (IRR) heterocomplex — EPOR + βcR — without stimulating red-blood-cell production." },
      { q: "Is Adamax FDA-approved?", a: "No. Adamax is a research chemical. Cibinetide (the closely related ARA-290) has been investigated in small clinical trials for sarcoidosis-related small-fiber neuropathy; no FDA approval as of 2026." },
      { q: "How does Adamax differ from EPO?", a: "Native EPO activates both the homodimeric EPOR (driving erythropoiesis) and the IRR heterocomplex (driving tissue protection). Adamax-class peptides are engineered to selectively activate only the IRR, preserving the tissue-protective biology without the red-blood-cell-stimulating side effect." },
      { q: "What is the innate repair receptor (IRR)?", a: "The IRR is a heterocomplex of the EPO receptor (EPOR) and the common beta-chain receptor (βcR / CD131). It mediates the tissue-protective, anti-inflammatory, and neuroprotective biology of EPO without driving red-blood-cell production." },
      { q: "Side effects of Adamax?", a: "Limited human safety data. The engineering goal is to avoid the erythropoietic side effects of native EPO; Adamax-class peptides should not raise hematocrit at standard research doses." },
      { q: "Is Adamax banned in sports?", a: "EPO and its analogs are prohibited at all times under WADA Section S2. Adamax's specific status depends on the exact analog; buyers should verify with the current WADA Prohibited List. Detection methods exist for the EPO peptide class." },
    ],
    citations: [
      { title: "ARA-290, a non-erythropoietic EPO analog, modulates inflammation and tissue protection", authors: "Brines M, Patel NS, Villa P, et al.", journal: "Mol Med", year: 2014, url: "https://pubmed.ncbi.nlm.nih.gov/?term=Brines+ARA-290" },
    ],
    lastUpdated: "2026-05-19",
  },

  "igf-1-lr3": {
    aliases: ["Long R3 IGF-1", "LR3 IGF-1", "IGF-1LR3", "IGF1 LR3"],
    classLabel: "Synthetic 83-residue insulin-like growth factor 1 analog",
    formula: "Approximately C400H625N111O115S9",
    halfLife: "~6 hours (vs ~10 minutes native IGF-1)",
    routes: ["Subcutaneous (research)"],
    storage: { lyo: "2–8 °C, 12+ months", recon: "2–8 °C, 14 days" },
    mechanisms: ["gh-axis", "metabolic"],
    conditions: ["body-composition", "anabolic-research", "insulin-sensitivity"],
    outcomes: [
      { name: "Protein synthesis (animal)", grade: "B", rationale: "Tomas et al. 1993 reported increased protein synthesis in rat skeletal muscle with LR3-IGF-1 administration." },
      { name: "Extended half-life vs native IGF-1", grade: "A", rationale: "Walton et al. 1995 characterized 6-hour vs 10-minute half-life — the engineering goal of the LR3 modification." },
      { name: "Human body-composition outcomes", grade: "D", rationale: "No completed human Phase 3 trials. Community-reported research protocols only." },
    ],
    safety: {
      sideEffects: ["Hypoglycemia (binds insulin receptor at higher doses)", "Theoretical organ enlargement with chronic high-dose", "Theoretical concerns in active malignancy (IGF-1 axis)"],
      interactions: ["Insulin / sulfonylureas (hypoglycemia risk)", "Concurrent rhGH not standard"],
      contraindications: ["Active malignancy (IGF-1 axis growth signaling)", "Pregnancy/lactation (unstudied)", "Diabetic retinopathy (theoretical exacerbation)"],
    },
    regulatory: {
      fda: "Not FDA-approved. Research-use only. Note: increlex (mecasermin) is FDA-approved recombinant native IGF-1 for severe primary IGF-1 deficiency — distinct molecule from LR3.",
      wada: "IGF-1 and analogs prohibited at all times under WADA Section S2 (Peptide Hormones, Growth Factors, Related Substances and Mimetics).",
    },
    faqs: [
      { q: "What is IGF-1 LR3?", a: "IGF-1 LR3 (Long R3 Insulin-like Growth Factor 1) is an 83-residue synthetic analog of native IGF-1 with an N-terminal 13-residue extension and an arginine substitution at position 3. The modifications reduce binding to IGF-binding-proteins (IGFBPs), extending plasma half-life dramatically." },
      { q: "Why is IGF-1 LR3 half-life longer than native IGF-1?", a: "Native IGF-1 is rapidly cleared due to high-affinity binding by IGFBP-3 and other IGFBPs. The Arg-substitution at position 3 in LR3 significantly reduces IGFBP binding, leaving more free IGF-1 available for receptor engagement. Half-life extends from ~10 minutes (native) to ~6 hours (LR3)." },
      { q: "Is IGF-1 LR3 FDA-approved?", a: "No. LR3 is a research-grade compound. The FDA has approved mecasermin (Increlex) — recombinant native IGF-1 — for severe primary IGF-1 deficiency. LR3 is a distinct molecule and is not approved." },
      { q: "Is IGF-1 LR3 banned in sports?", a: "Yes. IGF-1 and its analogs are prohibited at all times under WADA Section S2 (Peptide Hormones, Growth Factors, Related Substances and Mimetics)." },
      { q: "IGF-1 LR3 vs growth hormone — what's different?", a: "Growth hormone (GH) is the upstream pituitary hormone. IGF-1 is the downstream effector produced primarily by the liver in response to GH. LR3-IGF-1 bypasses the GH-axis and directly engages the IGF-1 receptor — producing IGF-1-receptor effects without the broader pleiotropic GH effects." },
      { q: "Side effects of IGF-1 LR3?", a: "Hypoglycemia is the most acute concern — at higher doses LR3 binds the insulin receptor with sufficient affinity to lower blood glucose. Theoretical concerns with chronic high-dose use include organ enlargement and exacerbation of active malignancy via IGF-1 axis growth signaling." },
      { q: "How is IGF-1 LR3 stored?", a: "Lyophilized at 2–8 °C for 12+ months. Reconstituted at 2–8 °C, use within 14 days. Protein peptides this large are more sensitive to repeated freeze-thaw than smaller peptides; aliquot-freeze for long storage." },
      { q: "Why is IGF-1 LR3 sometimes confused with IGF-1 DES?", a: "Both are modified IGF-1 analogs. LR3 has an N-terminal extension that reduces IGFBP binding (long half-life). DES has the opposite — a tripeptide deletion at the N-terminus that also reduces IGFBP binding but with different receptor-affinity profile and shorter half-life. They are distinct compounds." },
    ],
    citations: [
      { title: "Long-R3-IGF-I increases protein synthesis in rat skeletal muscle", authors: "Tomas FM, Knowles SE, Owens PC, et al.", journal: "J Endocrinol", year: 1993, url: "https://pubmed.ncbi.nlm.nih.gov/?term=Tomas+LR3+IGF" },
      { title: "Pharmacokinetics of LR3-IGF-I in lambs", authors: "Walton PE, Dunshea FR, Ballard FJ", journal: "J Endocrinol", year: 1995, url: "https://pubmed.ncbi.nlm.nih.gov/?term=Walton+LR3+IGF" },
    ],
    lastUpdated: "2026-05-19",
  },

  "semax": {
    aliases: ["Semax", "MEHFPGP", "ACTH(4-10)-PGP analog"],
    classLabel: "Synthetic heptapeptide · ACTH(4-10) analog",
    formula: "C37H51N9O10S",
    sequence: "Met-Glu-His-Phe-Pro-Gly-Pro",
    halfLife: "Short (minutes) plasma; intranasal CNS retention longer",
    routes: ["Intranasal (registered Russian protocol)", "Subcutaneous (research)"],
    storage: { lyo: "4 °C 12+ months", recon: "2–8 °C, 28 days" },
    mechanisms: ["nootropic", "neurotrophic", "bdnf-axis"],
    conditions: ["cognition-research", "stroke-recovery-research", "neuroprotection"],
    outcomes: [
      { name: "BDNF / TrkB upregulation (rodent)", grade: "B", rationale: "Dolotov et al. 2006 (Brain Res, PMID 16996037) showed 1.4–1.6× BDNF protein elevation in rat hippocampus after single 50 µg/kg intranasal dose; matched TrkB phosphorylation." },
      { name: "Specific binding sites (rodent)", grade: "B", rationale: "Dolotov et al. 2006 (J Neurochem, PMID 16635254) identified specific binding sites for tritium-labeled Semax in rat basal forebrain (KD ≈ 2.4 nM)." },
      { name: "Human cognitive outcomes", grade: "C", rationale: "Russian clinical literature describes small trials in stroke recovery, optic-nerve atrophy, ADHD-spectrum behavior. No FDA/EMA Phase 3 trials." },
    ],
    safety: {
      sideEffects: ["Mild nasal irritation (intranasal)", "Rare headache", "Limited Western safety data"],
      interactions: ["Other serotonergic/dopaminergic medications (theoretical · unstudied combination)"],
      contraindications: ["Pregnancy/lactation (unstudied in Western literature)"],
    },
    regulatory: {
      fda: "Not FDA-approved. Research-use only in the United States.",
      wada: "Not currently listed on the WADA Prohibited List (2026).",
    },
    faqs: [
      { q: "What is Semax?", a: "Semax is a synthetic heptapeptide (Met-Glu-His-Phe-Pro-Gly-Pro) analog of the ACTH(4-10) sequence developed at the Russian Academy of Sciences in the 1980s. The C-terminal Pro-Gly-Pro extension stabilizes the peptide and removes ACTH-like steroidogenic activity, preserving the neurotropic activity." },
      { q: "Semax vs Selank — what's the difference?", a: "Both are Russian-developed heptapeptides with the same C-terminal Pro-Gly-Pro stabilizing strategy. Selank is derived from tuftsin (immunomodulatory). Semax is derived from ACTH(4-10) (neurotropic). Semax is studied primarily for BDNF / TrkB cognitive pathways; Selank for GABAergic anxiolytic pathways." },
      { q: "Is Semax FDA-approved?", a: "No. Semax is research-use only in the United States. It is registered as a research and clinical neuropeptide under Russian pharmaceutical authority since 1994." },
      { q: "How does Semax work?", a: "Proposed mechanisms include upregulation of BDNF protein and mRNA in rat hippocampus and basal forebrain after intranasal administration, increased TrkB receptor phosphorylation (canonical signal-transduction event downstream of BDNF), and modulation of serotonin and dopamine turnover in rodent striatum and cortex." },
      { q: "Is Semax banned in sports?", a: "Not currently listed on the WADA Prohibited List as of 2026." },
      { q: "How is Semax administered in Russian clinical practice?", a: "The Russian-approved formulation is a 0.1% intranasal solution. Clinical literature describes 200–600 µg per dose, 1–3 times daily. This wiki does not recommend any human dose." },
      { q: "What is the ACTH(4-10) sequence?", a: "ACTH(4-10) is the 4th–10th residues of adrenocorticotropic hormone (Met-Glu-His-Phe-Arg-Trp-Gly). Semax replaces the latter residues with Pro-Gly-Pro to remove the corticotropin activity while preserving the neurotropic activity inherited from the parent fragment." },
      { q: "Side effects of Semax?", a: "Limited Western safety data. Russian literature describes mild nasal irritation and rare headache at standard intranasal doses." },
      { q: "Does Semax cross the blood-brain barrier?", a: "Intranasal Semax accesses the CNS through the olfactory bulb route, bypassing the blood-brain barrier. Specific binding sites have been identified in rat basal forebrain (Dolotov 2006, KD ≈ 2.4 nM)." },
      { q: "Is there Western peer-reviewed Semax literature?", a: "Yes — primarily the Dolotov et al. series in Brain Res (PMID 16996037), J Neurochem (PMID 16635254), and Doklady Biol Sci (PMID 14556513). These are the most accessible Western-indexed Semax mechanism papers." },
    ],
    citations: [
      { pmid: "16996037", title: "Semax, an analog of ACTH(4-10) with cognitive effects, regulates BDNF and trkB expression in the rat hippocampus", authors: "Dolotov OV, Karpenko EA, Inozemtseva LS, et al.", journal: "Brain Res", year: 2006, url: "https://pubmed.ncbi.nlm.nih.gov/16996037/" },
      { pmid: "16635254", title: "Semax, an analogue of adrenocorticotropin (4-10), binds specifically and increases levels of BDNF in rat basal forebrain", authors: "Dolotov OV, Karpenko EA, Seredenina TS, et al.", journal: "J Neurochem", year: 2006, url: "https://pubmed.ncbi.nlm.nih.gov/16635254/" },
    ],
    lastUpdated: "2026-05-19",
  },

  "cagrilintide": {
    aliases: ["Cagrilintide", "AM833", "long-acting amylin analog"],
    classLabel: "Synthetic amylin analog · once-weekly dual amylin/calcitonin agonist",
    formula: "C₁₈₀H₂₈₀N₅₂O₅₄ (approx)",
    sequence: "37-residue amylin analog with C20-fatty-acid albumin tether",
    halfLife: "~7 days (once-weekly dosing)",
    routes: ["Subcutaneous (Phase 2/3 clinical)"],
    storage: { lyo: "-20 °C 24 months", recon: "2-8 °C, 28 days" },
    mechanisms: ["incretin", "satiety"],
    conditions: ["obesity-research", "metabolic-research"],
    outcomes: [
      { name: "Weight loss (Phase 2 mono)", grade: "B", rationale: "Lau 2021 Lancet · dose-dependent placebo-subtracted weight loss to ~10.8% at 26 weeks." },
      { name: "CagriSema combination (semaglutide + cagrilintide)", grade: "A", rationale: "Frias 2023 Lancet · combination outperforms monotherapy components in T2D + obesity Phase 2; Phase 3 REDEFINE program ongoing." },
    ],
    safety: {
      sideEffects: ["GI: nausea, vomiting (titration-dependent)", "Injection-site reactions", "Hypoglycemia risk when combined with insulin"],
      interactions: ["Insulin · additive hypoglycemia risk"],
      contraindications: ["History of MTC or MEN2 (theoretical class effect)"],
    },
    regulatory: {
      fda: "Not yet FDA-approved as of 2026-05. Phase 3 REDEFINE program ongoing for CagriSema combination.",
      wada: "Not currently listed on the WADA Prohibited List.",
    },
    faqs: [
      { q: "What is cagrilintide?", a: "Cagrilintide is a synthetic long-acting amylin analog developed by Novo Nordisk for once-weekly subcutaneous administration. Native amylin is co-secreted with insulin by pancreatic beta cells and promotes satiety, slowed gastric emptying, and reduced postprandial glucagon." },
      { q: "How is cagrilintide different from pramlintide?", a: "Pramlintide (Symlin) is the short-acting amylin analog FDA-approved 2005 for adjunctive use with insulin in type 1 and insulin-treated type 2 diabetes. Cagrilintide is the long-acting analog with C20 fatty-acid albumin tether enabling once-weekly dosing for weight management." },
      { q: "What is CagriSema?", a: "CagriSema is the fixed-ratio combination of cagrilintide + semaglutide developed by Novo Nordisk as a single weekly injection for obesity. Phase 2 trials reported greater weight loss than either monotherapy." },
      { q: "Is cagrilintide FDA-approved?", a: "Not yet as of 2026-05. The Phase 3 REDEFINE program for CagriSema in obesity is ongoing." },
      { q: "How does cagrilintide work?", a: "Dual agonism at the amylin receptor (a heterodimer of calcitonin receptor + RAMP1/2/3) and the calcitonin receptor in area postrema and arcuate nucleus, reducing food intake and promoting satiety. Mechanism complements GLP-1 receptor signaling." },
      { q: "What's the dose in trials?", a: "Phase 2 used subcutaneous 2.4 mg once weekly matching the semaglutide dosing rhythm. This wiki does not recommend any human dose." },
      { q: "Side effects?", a: "GI side effects (nausea, vomiting) are titration-dependent. Class precaution for MTC/MEN2 from preclinical thyroid C-cell observations." },
    ],
    citations: [
      { pmid: "34247670", title: "Once-weekly cagrilintide for weight management in people with overweight and obesity", authors: "Lau DCW, et al.", journal: "Lancet", year: 2021, url: "https://pubmed.ncbi.nlm.nih.gov/34247670/" },
      { pmid: "37364590", title: "Efficacy and safety of co-administered once-weekly cagrilintide 2·4 mg with once-weekly semaglutide 2·4 mg in type 2 diabetes", authors: "Frias JP, et al.", journal: "Lancet", year: 2023, url: "https://pubmed.ncbi.nlm.nih.gov/37364590/" },
    ],
    entityIds: { cas: "1415456-99-3", pubchem: "168285063" },
    lastUpdated: "2026-05-19",
    reviewer: "editorial-board",
  },

  "survodutide": {
    aliases: ["Survodutide", "BI 456906", "BI456906"],
    classLabel: "GLP-1/glucagon dual receptor agonist (Boehringer Ingelheim/Zealand)",
    formula: "Synthetic 29-residue peptide · oxyntomodulin-inspired",
    sequence: "Modified glucagon backbone with dual receptor selectivity",
    halfLife: "~7 days (once-weekly)",
    routes: ["Subcutaneous (Phase 3 clinical)"],
    storage: { lyo: "-20 °C 24 months", recon: "2-8 °C, 28 days" },
    mechanisms: ["incretin", "energy-expenditure"],
    conditions: ["obesity-research", "nash-mash-research"],
    outcomes: [
      { name: "Obesity Phase 2", grade: "A", rationale: "Le Roux 2024 Lancet Diabetes Endocrinol · placebo-subtracted weight loss 14.9% at 4.8 mg/wk in 46-week Phase 2." },
      { name: "NASH/MASH Phase 2", grade: "B", rationale: "Improvement in liver fat fraction + histology endpoints, supporting dedicated NASH Phase 3 program." },
    ],
    safety: {
      sideEffects: ["GI: nausea, vomiting, diarrhea", "Injection-site reactions", "Tachycardia (modest)"],
      interactions: ["Glucagonergic effects may interact with sulfonylureas/insulin"],
      contraindications: ["History of MTC or MEN2"],
    },
    regulatory: {
      fda: "Investigational. Phase 3 SYNCHRONIZE-1/2 obesity trials enrolling.",
      wada: "Not currently listed on the WADA Prohibited List.",
    },
    faqs: [
      { q: "What is survodutide?", a: "Survodutide (BI 456906) is a once-weekly GLP-1/glucagon dual receptor agonist developed by Boehringer Ingelheim and Zealand Pharma for obesity and NASH/MASH research." },
      { q: "How is it different from tirzepatide?", a: "Tirzepatide is GLP-1/GIP dual. Survodutide is GLP-1/glucagon dual. The glucagon agonism is hypothesized to drive additional fat oxidation and energy expenditure beyond appetite suppression alone." },
      { q: "What weight loss has Phase 2 shown?", a: "46-week Phase 2 (Le Roux 2024) reported placebo-subtracted weight loss of ~14.9% at the 4.8 mg/wk dose." },
      { q: "Is survodutide FDA-approved?", a: "Not yet as of 2026-05. Phase 3 SYNCHRONIZE-1 and SYNCHRONIZE-2 trials for obesity are enrolling." },
      { q: "Why combine glucagon agonism with GLP-1?", a: "Glucagon receptor activation increases hepatic lipolysis and energy expenditure; GLP-1 reduces appetite. The combination targets both intake and expenditure, theoretically producing greater fat-mass reduction than GLP-1 monotherapy." },
      { q: "Dose used in trials?", a: "Phase 2 titrated up to 4.8 mg subcutaneously once weekly. This wiki does not recommend any human dose." },
    ],
    citations: [
      { pmid: "38219768", title: "Glucagon and GLP-1 receptor dual agonist survodutide for obesity: a randomised, double-blind, placebo-controlled, dose-finding phase 2 trial", authors: "Le Roux CW, et al.", journal: "Lancet Diabetes Endocrinol", year: 2024, url: "https://pubmed.ncbi.nlm.nih.gov/38219768/" },
    ],
    entityIds: { cas: "2243737-04-0" },
    lastUpdated: "2026-05-19",
    reviewer: "editorial-board",
  },

  "orforglipron": {
    aliases: ["Orforglipron", "LY3502970", "oral GLP-1 small molecule"],
    classLabel: "Non-peptide oral GLP-1 receptor allosteric agonist (Eli Lilly)",
    formula: "Small molecule · oral bioavailable",
    halfLife: "~24-30 hours (once-daily oral)",
    routes: ["Oral (Phase 3 clinical)"],
    storage: { lyo: "n/a · tablet formulation", recon: "n/a" },
    mechanisms: ["incretin", "satiety"],
    conditions: ["obesity-research", "diabetes-research"],
    outcomes: [
      { name: "Obesity Phase 2", grade: "A", rationale: "Wharton 2023 NEJM · placebo-subtracted weight loss ~14.7% at 45 mg/day in 36-week Phase 2." },
      { name: "T2D Phase 2", grade: "A", rationale: "Frias 2023 NEJM · HbA1c reduction up to ~2.1%." },
    ],
    safety: {
      sideEffects: ["GI: nausea, diarrhea, vomiting (titration-dependent)", "Decreased appetite"],
      interactions: ["Standard GLP-1 class · oral medication absorption (delayed gastric emptying)"],
      contraindications: ["History of MTC or MEN2 (class precaution)"],
    },
    regulatory: {
      fda: "Investigational. Phase 3 ACHIEVE/ATTAIN programs ongoing.",
      wada: "Not currently listed on the WADA Prohibited List.",
    },
    faqs: [
      { q: "What is orforglipron?", a: "Orforglipron (LY3502970) is an orally bioavailable non-peptide small-molecule allosteric agonist of the GLP-1 receptor developed by Eli Lilly. It is the first oral GLP-1 candidate that does not require the specialized absorption formulation used by oral semaglutide." },
      { q: "How is orforglipron different from semaglutide?", a: "Orforglipron is a small molecule taken orally without dietary restriction. Semaglutide is a peptide that requires subcutaneous injection or a specialized oral formulation taken on an empty stomach with limited water and at least 30 minutes before eating." },
      { q: "What weight loss has Phase 2 shown?", a: "Phase 2 obesity (Wharton 2023 NEJM) reported up to ~14.7% placebo-subtracted weight loss at 45 mg daily over 36 weeks. Phase 3 enrolling." },
      { q: "Is orforglipron FDA-approved?", a: "Not yet as of 2026-05. Phase 3 ACHIEVE-1 (T2D) and ATTAIN-1 (obesity) programs are ongoing." },
      { q: "How does it work?", a: "Orforglipron is a positive allosteric modulator of the GLP-1 receptor. It binds outside the orthosteric peptide-binding pocket and stabilizes the active receptor conformation, producing functional agonist activity." },
      { q: "Daily dose in trials?", a: "Phase 2 used daily oral doses of 12 mg to 45 mg. This wiki does not recommend any human dose." },
    ],
    citations: [
      { pmid: "37364188", title: "Daily Oral GLP-1 Receptor Agonist Orforglipron for Adults with Obesity", authors: "Wharton S, et al.", journal: "N Engl J Med", year: 2023, url: "https://pubmed.ncbi.nlm.nih.gov/37364188/" },
    ],
    entityIds: { cas: "2212020-52-3" },
    lastUpdated: "2026-05-19",
    reviewer: "editorial-board",
  },

  "mazdutide": {
    aliases: ["Mazdutide", "IBI362", "LY3305677"],
    classLabel: "GLP-1/glucagon dual receptor agonist (Innovent/Lilly)",
    formula: "Synthetic peptide · oxyntomodulin-derived",
    halfLife: "~7 days (once-weekly)",
    routes: ["Subcutaneous (Phase 3 clinical)"],
    storage: { lyo: "-20 °C 24 months", recon: "2-8 °C, 28 days" },
    mechanisms: ["incretin", "energy-expenditure"],
    conditions: ["obesity-research", "diabetes-research"],
    outcomes: [
      { name: "Obesity Phase 2 (Chinese)", grade: "A", rationale: "Zhao 2024 JAMA Netw Open · placebo-subtracted weight loss ~11.1% at 9 mg/wk over 24 weeks in Chinese adults." },
      { name: "T2D Phase 2 (Chinese)", grade: "B", rationale: "HbA1c reduction in Chinese T2D Phase 2." },
      { name: "Phase 3 GLORY-1 (Chinese)", grade: "A", rationale: "48-week Phase 3 obesity met primary endpoint; China NMPA review 2024-2025." },
    ],
    safety: {
      sideEffects: ["GI: nausea, vomiting, diarrhea", "Injection-site reactions"],
      interactions: ["Class effect · sulfonylureas/insulin"],
      contraindications: ["History of MTC or MEN2"],
    },
    regulatory: {
      fda: "Investigational outside China. Not FDA-approved.",
      cn: "China NMPA NDA submitted for obesity 2024; review ongoing.",
      wada: "Not currently listed on the WADA Prohibited List.",
    },
    faqs: [
      { q: "What is mazdutide?", a: "Mazdutide (IBI362) is a once-weekly synthetic peptide GLP-1/glucagon dual agonist developed by Innovent Biologics under license from Eli Lilly. It is in late-stage clinical development in China for type 2 diabetes and obesity." },
      { q: "How is mazdutide different from survodutide?", a: "Both are GLP-1/glucagon dual agonists. Mazdutide is developed primarily for the Chinese market by Innovent under license from Lilly; survodutide is Boehringer Ingelheim/Zealand's molecule for the global market. Different sequence, similar mechanism." },
      { q: "What weight loss has Phase 2 shown?", a: "24-week Phase 2 in Chinese adults (Zhao 2024) reported placebo-subtracted weight loss ~11.1% at the 9 mg/wk dose." },
      { q: "Is mazdutide approved?", a: "China NMPA review ongoing for obesity (as of 2026-05). Not FDA-approved." },
      { q: "Dose in trials?", a: "Phase 2/3 trials titrated subcutaneous 3-9 mg once weekly. This wiki does not recommend any human dose." },
      { q: "How does it work?", a: "Dual agonism at the GLP-1 and glucagon receptors. GLP-1 arm drives satiety + glucose-dependent insulin secretion; glucagon arm drives hepatic lipolysis + energy expenditure." },
    ],
    citations: [
      { title: "Mazdutide IBI362 in obese Chinese adults: dose-finding phase 2", authors: "Zhao H, et al.", journal: "JAMA Netw Open", year: 2024, url: "https://pubmed.ncbi.nlm.nih.gov/?term=mazdutide+IBI362+phase+2" },
    ],
    entityIds: { cas: "2371824-04-7" },
    lastUpdated: "2026-05-19",
    reviewer: "editorial-board",
  },

  "pt-141": {
    aliases: ["Bremelanotide", "PT-141", "Vyleesi"],
    classLabel: "Cyclic melanocortin 3/4 receptor agonist · FDA-approved (Vyleesi)",
    formula: "C₅₀H₆₈N₁₄O₁₀",
    sequence: "Ac-Nle-cyclo[Asp-His-D-Phe-Arg-Trp-Lys]-OH",
    halfLife: "2.7 hours (subcutaneous)",
    routes: ["Subcutaneous (FDA-approved Vyleesi formulation)"],
    storage: { lyo: "-20 °C 24 months", recon: "2-8 °C 28 days" },
    mechanisms: ["melanocortin", "central-arousal"],
    conditions: ["hsdd-research", "ed-research"],
    outcomes: [
      { name: "HSDD in premenopausal women", grade: "A", rationale: "RECONNECT-1 and RECONNECT-2 Phase 3 trials met primary endpoint (improvement in FSFI desire score); FDA approval June 2019." },
      { name: "Erectile dysfunction", grade: "B", rationale: "Phase 2 trials showed efficacy in men with ED but Palatin pivoted to female HSDD for regulatory reasons." },
    ],
    safety: {
      sideEffects: ["Nausea (most common)", "Facial flushing", "Headache", "Transient systolic BP elevation ~6 mmHg"],
      interactions: ["Avoid in uncontrolled hypertension or known cardiovascular disease"],
      contraindications: ["Uncontrolled hypertension", "Known cardiovascular disease"],
    },
    regulatory: {
      fda: "FDA-approved as Vyleesi (bremelanotide) for HSDD in premenopausal women (June 2019).",
      wada: "Not currently listed on the WADA Prohibited List.",
    },
    faqs: [
      { q: "What is PT-141?", a: "PT-141 (bremelanotide, brand Vyleesi) is a cyclic 7-amino-acid peptide melanocortin 3/4 receptor agonist. FDA-approved June 2019 for hypoactive sexual desire disorder (HSDD) in premenopausal women." },
      { q: "How does PT-141 differ from sildenafil?", a: "PT-141 acts centrally on melanocortin receptors in the hypothalamus to drive arousal pathways (dopamine + oxytocin). Sildenafil acts peripherally on PDE-5 in the vasculature to facilitate erection. Different mechanism, different pathway." },
      { q: "Is PT-141 FDA-approved?", a: "Yes. FDA-approved as Vyleesi for HSDD in premenopausal women, June 2019. Distributed by Palatin Technologies/Cosette." },
      { q: "What's the approved dose?", a: "Single 1.75 mg subcutaneous injection administered at least 45 minutes before anticipated sexual activity. Per Vyleesi label." },
      { q: "Side effects?", a: "Most common: transient nausea (~40% incidence at the approved dose). Less common: facial flushing, headache, injection-site reactions, mild transient blood pressure increase." },
      { q: "Who shouldn't use PT-141?", a: "Vyleesi label contraindicates use in uncontrolled hypertension or known cardiovascular disease due to transient BP elevation in trials. Consult a healthcare provider for clinical use." },
      { q: "Is PT-141 banned in sports?", a: "Not currently listed on the WADA Prohibited List." },
    ],
    citations: [
      { pmid: "31022173", title: "Bremelanotide for the Treatment of Hypoactive Sexual Desire Disorder: Two Randomized Phase 3 Trials", authors: "Kingsberg SA, Clayton AH, et al.", journal: "Obstet Gynecol", year: 2019, url: "https://pubmed.ncbi.nlm.nih.gov/31022173/" },
      { pmid: "27193591", title: "Bremelanotide for female sexual dysfunctions in premenopausal women", authors: "Clayton AH, et al.", journal: "Womens Health (Lond)", year: 2016, url: "https://pubmed.ncbi.nlm.nih.gov/27193591/" },
    ],
    entityIds: { cas: "189691-06-3", pubchem: "9941379", unii: "B47PT0J60R", drugbank: "DB12130" },
    lastUpdated: "2026-05-19",
    reviewer: "editorial-board",
  },

  "epitalon": {
    aliases: ["Epitalon", "Epithalon", "Epithalamin analog", "AEDG"],
    classLabel: "Synthetic Khavinson tetrapeptide · pineal-axis research",
    formula: "C₁₄H₂₂N₄O₉",
    sequence: "Ala-Glu-Asp-Gly",
    halfLife: "Very short (minutes) plasma; tissue-localized longer",
    routes: ["Subcutaneous (Russian research protocol)", "Intranasal (some sources)"],
    storage: { lyo: "-20 °C 24 months", recon: "2-8 °C, 14-21 days" },
    mechanisms: ["longevity", "telomerase"],
    conditions: ["aging-research", "pineal-research"],
    outcomes: [
      { name: "Telomerase activation (in vitro)", grade: "C", rationale: "Khavinson 2003 reported telomerase upregulation in human peripheral blood lymphocytes; replication outside Khavinson network is limited." },
      { name: "Long-term mortality (observational)", grade: "D", rationale: "12-year Russian observational study of 266 patients · not a randomized double-blind design; treat as preliminary." },
    ],
    safety: {
      sideEffects: ["Very limited Western safety data", "No serious adverse events reported in Russian literature at standard doses"],
      interactions: ["Largely unstudied in Western literature"],
      contraindications: ["Active malignancy (theoretical · telomerase activation may interact with cancer biology · NOT validated)"],
    },
    regulatory: {
      fda: "Not FDA-approved. Research-use only in the United States.",
      ru: "Registered as research and clinical-research compound by the Institute of Bioregulation and Gerontology.",
      wada: "Not currently listed on the WADA Prohibited List.",
    },
    faqs: [
      { q: "What is Epitalon?", a: "Epitalon is a synthetic tetrapeptide (Ala-Glu-Asp-Gly, AEDG) developed by Vladimir Khavinson at the St. Petersburg Institute of Bioregulation and Gerontology in Russia. It is the synthetic analog of the pineal extract epithalamin." },
      { q: "Is Epitalon the same as epithalamin?", a: "Epithalamin is the natural pineal-extract preparation; Epitalon (also called epithalon) is the synthetic tetrapeptide AEDG that captures the active short-peptide component." },
      { q: "Is Epitalon FDA-approved?", a: "No. Epitalon is research-use only in the United States. It is registered as a clinical-research compound within the Russian Federation by the Institute of Bioregulation and Gerontology." },
      { q: "How does Epitalon work?", a: "Proposed mechanisms include telomerase activation in somatic cells (Khavinson 2003, PMID 14523389), modulation of melatonin secretion via pineal gland action, and influence on circadian clock-gene expression. Replication outside the Khavinson network is limited." },
      { q: "Is the evidence base reliable?", a: "Most published research comes from the Khavinson group in Russia and is in Russian-language journals. The 12-year mortality study is observational, not randomized double-blind. Treat the evidence base as preliminary." },
      { q: "What dose is used in research?", a: "Russian-protocol literature uses subcutaneous 5-10 mg/day in 10-20 day cycles, 1-2 times per year. This wiki does not recommend any human dose." },
      { q: "Side effects?", a: "Very limited Western safety data. No serious adverse events reported in Russian literature at standard doses; appropriate caution warranted given the limited Western RCT base." },
    ],
    citations: [
      { pmid: "12624353", title: "Peptides and Ageing", authors: "Khavinson VKh", journal: "Neuro Endocrinol Lett", year: 2002, url: "https://pubmed.ncbi.nlm.nih.gov/12624353/" },
      { pmid: "14523389", title: "Effects of pineal peptide preparation Epithalamin on free-radical processes in humans and animals", authors: "Khavinson V, et al.", journal: "Neuro Endocrinol Lett", year: 2003, url: "https://pubmed.ncbi.nlm.nih.gov/14523389/" },
    ],
    entityIds: { cas: "307297-39-8" },
    lastUpdated: "2026-05-19",
    reviewer: "editorial-board",
  },

  "aod-9604": {
    aliases: ["AOD-9604", "AOD9604", "hGH(176-191)", "Tyr-hGH(177-191)"],
    classLabel: "Synthetic growth-hormone C-terminal fragment · lipolytic candidate",
    formula: "C₇₈H₁₂₃N₂₃O₂₃S₂",
    sequence: "16-residue fragment corresponding to hGH(177-191) with N-terminal Tyrosine addition",
    halfLife: "Short (minutes) plasma",
    routes: ["Subcutaneous (Phase 2 obesity)", "Oral (food-supplement contexts in some jurisdictions)"],
    storage: { lyo: "-20 °C 24 months", recon: "2-8 °C, 28 days" },
    mechanisms: ["lipolysis", "growth-hormone-pathway"],
    conditions: ["obesity-research", "osteoarthritis-research"],
    outcomes: [
      { name: "Obesity Phase 2b (2007)", grade: "D", rationale: "12-week Metabolic Pharmaceuticals Phase 2b at 1 mg/day did not meet primary weight-loss endpoint." },
      { name: "Cartilage / osteoarthritis", grade: "C", rationale: "Veterinary and human cartilage research reported in registry data; not consistently in peer-reviewed Western journals." },
    ],
    safety: {
      sideEffects: ["Generally well-tolerated in trials at the doses tested", "Injection-site reactions"],
      interactions: ["Not characterized in Phase 3"],
      contraindications: ["Pregnancy/lactation (unstudied)"],
    },
    regulatory: {
      fda: "Not FDA-approved as a drug.",
      au: "Australian TGA placed AOD-9604 on Schedule 4 (prescription medicine) in 2020.",
      wada: "Growth hormone fragments prohibited at all times under S2 on the WADA Prohibited List.",
    },
    faqs: [
      { q: "What is AOD-9604?", a: "AOD-9604 is a 16-amino-acid synthetic peptide corresponding to the C-terminal region (residues 176-191) of human growth hormone with an N-terminal tyrosine addition. Developed by Metabolic Pharmaceuticals as a candidate anti-obesity agent." },
      { q: "Did AOD-9604 work for obesity?", a: "The 12-week Phase 2b trial in 2007 at 1 mg/day did not meet the primary weight-loss endpoint. The compound was repurposed toward joint/cartilage research thereafter." },
      { q: "Is AOD-9604 FDA-approved?", a: "No. AOD-9604 is not FDA-approved as a drug. It had limited food-supplement GRAS history in some jurisdictions but Australia's TGA placed it on Schedule 4 (prescription) in 2020." },
      { q: "Is AOD-9604 banned in sports?", a: "Yes, in effect. Growth hormone fragments are prohibited at all times under S2 (peptide hormones, growth factors, related substances) on the WADA Prohibited List." },
      { q: "How does AOD-9604 differ from full-length hGH?", a: "AOD-9604 was designed to retain the lipolytic activity of hGH without engaging the growth-hormone receptor in a way that elevates IGF-1. In vitro, this design held; in vivo, it did not deliver the obesity outcomes anticipated." },
      { q: "What dose was used in trials?", a: "Phase 2 trials used subcutaneous 1 mg/day. This wiki does not recommend any human dose." },
    ],
    citations: [
      { pmid: "11713213", title: "The effects of human GH and its lipolytic fragment (AOD9604) on lipid metabolism following chronic treatment in obese mice and beta(3)-AR knock-out mice", authors: "Heffernan M, et al.", journal: "Endocrinology", year: 2001, url: "https://pubmed.ncbi.nlm.nih.gov/11713213/" },
      { pmid: "11146368", title: "Metabolic studies of a synthetic lipolytic domain (AOD9604) of human growth hormone", authors: "Ng FM, et al.", journal: "Horm Res", year: 2000, url: "https://pubmed.ncbi.nlm.nih.gov/11146368/" },
    ],
    entityIds: { cas: "221231-10-3" },
    lastUpdated: "2026-05-19",
    reviewer: "editorial-board",
  },

  "kisspeptin-10": {
    aliases: ["Kisspeptin-10", "KP-10", "Metastin-10", "KISS1(112-121)"],
    classLabel: "Synthetic kisspeptin C-terminal active fragment · GnRH-axis upstream activator",
    formula: "C₆₃H₈₃N₁₇O₁₄",
    sequence: "Tyr-Asn-Trp-Asn-Ser-Phe-Gly-Leu-Arg-Phe-NH₂",
    halfLife: "Very short (minutes) plasma",
    routes: ["Subcutaneous (research)", "Intravenous (clinical research)"],
    storage: { lyo: "-20 °C 24 months", recon: "2-8 °C, 14-21 days" },
    mechanisms: ["gnrh-axis", "reproductive-endocrinology"],
    conditions: ["hypogonadism-research", "ivf-research", "infertility-research"],
    outcomes: [
      { name: "LH/FSH pulse activation in healthy men", grade: "A", rationale: "Dhillo 2005 JCEM · single SC kisspeptin-10 doses produce LH/FSH pulses." },
      { name: "Oocyte maturation in IVF", grade: "B", rationale: "Kisspeptin-54 (not 10) Phase 2 trigger for oocyte maturation in IVF (Abbara 2014/2017)." },
      { name: "Hypothalamic amenorrhea reactivation", grade: "B", rationale: "Restoration of LH pulsatility in hypothalamic amenorrhea reported in pilot trials." },
    ],
    safety: {
      sideEffects: ["Generally well-tolerated at research doses", "Mild injection-site discomfort"],
      interactions: ["Other GnRH-axis modulators (GnRH agonists/antagonists, hCG)"],
      contraindications: ["Active sex-hormone-sensitive malignancy"],
    },
    regulatory: {
      fda: "Not FDA-approved. Research-use only in the United States.",
      wada: "Not specifically named on the 2024 Prohibited List. GnRH-axis-active compounds (e.g., hCG) are prohibited for male athletes under S2; kisspeptin may fall under regulator discretion.",
    },
    faqs: [
      { q: "What is kisspeptin-10?", a: "Kisspeptin-10 (KP-10) is the 10-amino-acid C-terminal active fragment of the human KISS1 gene product. It is the principal upstream activator of the hypothalamic GnRH neuron firing pattern and downstream pituitary LH/FSH release." },
      { q: "What does kisspeptin do?", a: "Kisspeptin-10 binds the KISS1R / GPR54 receptor on hypothalamic GnRH neurons, triggering Gαq signaling, neuronal depolarization, and downstream GnRH secretion. The result is a pulse of LH and FSH from the anterior pituitary, increasing gonadal steroid production." },
      { q: "Is kisspeptin FDA-approved?", a: "No. Kisspeptin-10 is research-use only. No FDA-approved indication." },
      { q: "How does kisspeptin differ from GnRH?", a: "Kisspeptin acts upstream of GnRH · it triggers the GnRH neuron to fire. GnRH itself is the direct hypothalamic neuropeptide that acts on the anterior pituitary gonadotrophs." },
      { q: "What research uses kisspeptin?", a: "Reproductive endocrinology · IVF oocyte-maturation triggers (kisspeptin-54 specifically), hypothalamic amenorrhea reactivation, hypogonadotropic hypogonadism mechanistic studies, and sexual-function research." },
      { q: "What's the difference between kisspeptin-10 and kisspeptin-54?", a: "Kisspeptin-54 is the longer (54-residue) endogenous peptide; kisspeptin-10 is the shorter active fragment that is sufficient for receptor binding and biological activity. Both reduce to the same core C-terminal motif in vivo." },
      { q: "Is kisspeptin-10 banned in sports?", a: "Not specifically listed on the WADA Prohibited List as of 2026. Other GnRH-axis-active compounds (hCG, GnRH analogs) are prohibited for male athletes under S2." },
    ],
    citations: [
      { pmid: "15883247", title: "Kisspeptin-54 stimulates the hypothalamic-pituitary gonadal axis in human males", authors: "Dhillo WS, Chaudhri OB, Patterson M, et al.", journal: "J Clin Endocrinol Metab", year: 2005, url: "https://pubmed.ncbi.nlm.nih.gov/15883247/" },
      { pmid: "12944565", title: "Hypogonadotropic hypogonadism due to loss of function of the KiSS1-derived peptide receptor GPR54", authors: "de Roux N, et al.", journal: "Proc Natl Acad Sci U S A", year: 2003, url: "https://pubmed.ncbi.nlm.nih.gov/12944565/" },
    ],
    entityIds: { cas: "374675-21-5" },
    lastUpdated: "2026-05-19",
    reviewer: "editorial-board",
  },

  "thymosin-alpha-1": {
    aliases: ["Thymosin alpha-1", "Tα1", "Thymalfasin", "Zadaxin"],
    classLabel: "Synthetic 28-residue thymic peptide · immunomodulator · approved as Zadaxin in 35+ countries",
    formula: "C₁₂₉H₂₁₅N₃₃O₅₅",
    sequence: "Ac-Ser-Asp-Ala-Ala-Val-Asp-Thr-Ser-Ser-Glu-Ile-Thr-Thr-Lys-Asp-Leu-Lys-Glu-Lys-Lys-Glu-Val-Val-Glu-Glu-Ala-Glu-Asn",
    halfLife: "~2 hours plasma (subcutaneous)",
    routes: ["Subcutaneous (approved Zadaxin in non-US jurisdictions)"],
    storage: { lyo: "-20 °C 24 months", recon: "2-8 °C, 28 days" },
    mechanisms: ["immunomodulator", "tlr9-agonist"],
    conditions: ["hepatitis-research", "immunocompromised-research", "covid-research"],
    outcomes: [
      { name: "Chronic hepatitis B (Asia, approved use)", grade: "A", rationale: "Multiple Phase 3 trials supporting Zadaxin approval in 35+ countries as combination therapy with IFN/pegIFN." },
      { name: "Sepsis (Chinese Phase 3)", grade: "B", rationale: "Wu 2013 Crit Care · 28-day mortality reduction in severe sepsis." },
      { name: "COVID-19 severity (Chinese reports)", grade: "C", rationale: "Multiple Chinese-population reports; not consistently meeting Western trial methodology." },
    ],
    safety: {
      sideEffects: ["Generally well-tolerated", "Mild injection-site reactions", "Rare flu-like symptoms"],
      interactions: ["Immunosuppressive medications (theoretical)"],
      contraindications: ["Active autoimmune disease (theoretical)"],
    },
    regulatory: {
      fda: "Not FDA-approved. Research-use only in the United States.",
      international: "Approved as Zadaxin (thymalfasin) in 35+ countries for chronic hepatitis B/C and as an immune-system adjuvant.",
      wada: "Not currently listed on the WADA Prohibited List.",
    },
    faqs: [
      { q: "What is thymosin alpha-1?", a: "Thymosin alpha-1 (Tα1) is a 28-amino-acid synthetic peptide derived from thymosin fraction 5, originally isolated from calf thymus by Allan Goldstein in the 1970s. It is an immunomodulator approved in more than 35 countries as Zadaxin." },
      { q: "Is thymosin alpha-1 FDA-approved?", a: "Not in the United States. It is approved in 35+ countries including Italy, Brazil, Singapore, and across much of Asia for chronic hepatitis B and C and as an immune-system adjuvant." },
      { q: "How does it work?", a: "Proposed mechanisms include TLR9 agonism, dendritic-cell maturation, increased CD4+ and CD8+ T-cell function, enhanced NK cell activity, and modulation of Th1/Th2 cytokine balance toward Th1." },
      { q: "What's the approved indication?", a: "Chronic hepatitis B (with IFN-α or pegIFN), chronic hepatitis C (combination with antivirals), as a vaccine adjuvant, and post-chemotherapy immune support. Approved indication varies by country." },
      { q: "Approved dose?", a: "Standard approved dosing in non-US jurisdictions is subcutaneous 1.6 mg twice weekly for 6-12 months in hepatitis B/C. This wiki does not recommend any US off-label dose." },
      { q: "Brand names?", a: "Zadaxin is the principal brand, marketed by SciClone Pharmaceuticals." },
      { q: "Is it on the WHO essential medicines list?", a: "Thymosin alpha-1 is on the essential medicines list in some countries (e.g., China) but not the WHO Model List as of the latest revision." },
    ],
    citations: [
      { pmid: "19392576", title: "From lab to bedside: emerging clinical applications of thymosin alpha 1", authors: "Goldstein AL, Goldstein AL", journal: "Expert Opin Biol Ther", year: 2009, url: "https://pubmed.ncbi.nlm.nih.gov/19392576/" },
      { pmid: "23327199", title: "The efficacy of thymosin alpha 1 for severe sepsis (ETASS): a multicentre, single-blind, randomized and controlled trial", authors: "Wu J, Zhou L, Liu J, et al.", journal: "Crit Care", year: 2013, url: "https://pubmed.ncbi.nlm.nih.gov/23327199/" },
      { pmid: "32442287", title: "Thymosin Alpha 1 Reduces the Mortality of Severe Coronavirus Disease 2019", authors: "Liu Y, Pan Y, Hu Z, et al.", journal: "Clin Infect Dis", year: 2020, url: "https://pubmed.ncbi.nlm.nih.gov/32442287/" },
    ],
    entityIds: { cas: "62304-98-7", pubchem: "16130571", unii: "X18WDS3LCJ", drugbank: "DB13073" },
    lastUpdated: "2026-05-19",
    reviewer: "editorial-board",
  },

  "humanin": {
    aliases: ["Humanin", "HN", "MOTS-c family peptide", "mitochondrial-derived peptide"],
    classLabel: "Mitochondrial-derived peptide · neuroprotective + metabolic",
    formula: "Synthetic 24-residue peptide (multiple analog variants exist)",
    sequence: "Met-Ala-Pro-Arg-Gly-Phe-Ser-Cys-Leu-Leu-Leu-Leu-Thr-Ser-Glu-Ile-Asp-Leu-Pro-Val-Lys-Arg-Arg-Ala (native 24-residue)",
    halfLife: "Short (minutes) plasma · longer in CNS",
    routes: ["Subcutaneous (research)", "Intracerebroventricular (preclinical)"],
    storage: { lyo: "-20 °C 24 months", recon: "2-8 °C, 14-28 days" },
    mechanisms: ["mitochondrial-derived", "neuroprotection"],
    conditions: ["alzheimers-research", "metabolic-research", "longevity-research"],
    outcomes: [
      { name: "Neuroprotection in Alzheimer cell models", grade: "B", rationale: "Hashimoto 2001 demonstrated humanin protects neurons against amyloid-beta toxicity in vitro and in rodent models." },
      { name: "Insulin sensitivity (rodent)", grade: "B", rationale: "Muzumdar 2009 demonstrated humanin improves insulin action in obese rats." },
      { name: "Longevity correlation (human)", grade: "C", rationale: "Circulating humanin levels correlate with longevity in human population studies (Lee et al., 2015)." },
    ],
    safety: {
      sideEffects: ["Limited human safety data · most research is preclinical"],
      interactions: ["Largely unstudied in humans"],
      contraindications: ["None established · research compound only"],
    },
    regulatory: {
      fda: "Not FDA-approved. Research-use only.",
      wada: "Not currently listed on the WADA Prohibited List.",
    },
    faqs: [
      { q: "What is humanin?", a: "Humanin is a 24-amino-acid peptide encoded by a small open reading frame within the mitochondrial 16S ribosomal RNA gene. It is one of the first identified mitochondrial-derived peptides (MDPs) with documented protective effects in neuronal and metabolic research." },
      { q: "How is humanin different from MOTS-c?", a: "Both are mitochondrial-derived peptides. Humanin is 24 residues encoded by 16S rRNA and characterized first for neuroprotective activity against amyloid-beta. MOTS-c is 16 residues encoded by 12S rRNA and characterized for AMPK-pathway metabolic effects." },
      { q: "Is humanin FDA-approved?", a: "No. Humanin is research-use only. No FDA-approved indication." },
      { q: "What does humanin do?", a: "Documented effects include neuroprotection against amyloid-beta toxicity (Hashimoto 2001), insulin-sensitizing effects in obese rodents (Muzumdar 2009), and anti-apoptotic activity in multiple cell types via Bax modulation." },
      { q: "Why is humanin called a longevity peptide?", a: "Circulating humanin levels decline with age and have been correlated with longevity in human studies (Lee et al., 2015). Centenarians and their offspring show elevated humanin levels relative to age-matched controls in some cohorts." },
      { q: "What's the dose in research?", a: "Preclinical animal-model research has used SC humanin at 5-10 nmol/kg/day. Human dosing is not established. This wiki does not recommend any human dose." },
      { q: "Is there a humanin variant called HNG?", a: "HNG (S14G-humanin) is a synthetic analog with a serine-to-glycine substitution at position 14 that increases potency ~1000-fold in some cell models. It is the variant most commonly used in mechanism studies." },
    ],
    citations: [
      { pmid: "11371641", title: "A rescue factor abolishing neuronal cell death by a wide spectrum of familial Alzheimer's disease genes and Abeta", authors: "Hashimoto Y, Niikura T, Tajima H, et al.", journal: "Proc Natl Acad Sci U S A", year: 2001, url: "https://pubmed.ncbi.nlm.nih.gov/11371641/" },
      { pmid: "19470690", title: "Humanin: a novel central regulator of peripheral insulin action", authors: "Muzumdar RH, Huffman DM, Atzmon G, et al.", journal: "PLoS One", year: 2009, url: "https://pubmed.ncbi.nlm.nih.gov/19470690/" },
      { pmid: "25738459", title: "The mitochondrial-derived peptide MOTS-c promotes metabolic homeostasis and reduces obesity and insulin resistance", authors: "Lee C, Zeng J, Drew BG, et al.", journal: "Cell Metab", year: 2015, url: "https://pubmed.ncbi.nlm.nih.gov/25738459/" },
    ],
    entityIds: { cas: "330936-69-1" },
    lastUpdated: "2026-05-19",
    reviewer: "editorial-board",
  },
};
