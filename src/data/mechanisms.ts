/**
 * Mechanism categories · for /mechanisms/[slug] pages.
 * Joined to PEPPUDEX entries via ENRICHMENT[slug].mechanisms array.
 *
 * Each mechanism page aggregates all compounds tagged with that
 * mechanism — the Bulbapedia "Fire-type Pokémon" pattern that builds
 * bidirectional internal links and ranks for the mechanism query.
 */

export interface Mechanism {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  longDescription: string;
  color: string;
}

export const MECHANISMS: Mechanism[] = [
  {
    slug: "incretin-axis",
    name: "Incretin Axis",
    shortName: "Incretin",
    color: "#9CCC65",
    description: "GLP-1, GIP, and glucagon receptor pharmacology.",
    longDescription: "The incretin axis encompasses GLP-1 (glucagon-like peptide 1) and GIP (glucose-dependent insulinotropic polypeptide), gut hormones released in response to nutrient intake that account for roughly 70% of postprandial insulin secretion. Drugs targeting this axis include single GLP-1 agonists (semaglutide), dual GLP-1/GIP agonists (tirzepatide), and triple GLP-1/GIP/glucagon agonists (retatrutide). The axis is the largest commercial pharma category of the 2020s and is responsible for the metabolic-medicine revolution underway in obesity, type 2 diabetes, and cardiometabolic disease.",
  },
  {
    slug: "metabolic",
    name: "Metabolic Regulation",
    shortName: "Metabolic",
    color: "#FBC02D",
    description: "Glucose, lipid, and energy metabolism pathways.",
    longDescription: "Compounds acting on metabolic regulation include incretin agonists (GLP-1, GIP, glucagon), AMPK activators (MOTS-c), and GHRH analogs that drive lipolysis (tesamorelin). The shared therapeutic target is metabolic dysfunction underlying obesity, type 2 diabetes, NAFLD, and the broader cardiometabolic syndrome.",
  },
  {
    slug: "tissue-repair",
    name: "Tissue Repair",
    shortName: "Repair",
    color: "#F06292",
    description: "Wound healing, angiogenesis, and remodeling pathways.",
    longDescription: "Tissue repair encompasses the coordinated processes of inflammation resolution, cell migration, extracellular-matrix remodeling, and angiogenesis. Research peptides in this category include BPC-157 (pentadecapeptide cytoprotection), TB-500 (Thymosin Beta-4 actin sequestration), and GHK-Cu (copper-peptide collagen induction). The shared theme is permissive enhancement of healing processes already underway in injured tissue.",
  },
  {
    slug: "cytoprotection",
    name: "Cytoprotection",
    shortName: "Cytoprotection",
    color: "#66BB6A",
    description: "Cellular and organ protection from injury.",
    longDescription: "Cytoprotection is the protection of cells and tissues from injury via membrane stabilization, mitochondrial preservation, anti-apoptotic signaling, and counter-regulation of vascular failure. The pentadecapeptide BPC-157 is the most-studied cytoprotection-mediator peptide; its activity spans gastrointestinal, vascular, and multi-organ injury contexts.",
  },
  {
    slug: "angiogenesis",
    name: "Angiogenesis",
    shortName: "Angiogenesis",
    color: "#EF5350",
    description: "New blood-vessel formation from existing vasculature.",
    longDescription: "Angiogenesis is the formation of new blood vessels from pre-existing vasculature, driven primarily by VEGF signaling. It occurs physiologically in wound healing, exercise-induced muscle adaptation, and the reproductive cycle. Several research peptides (BPC-157, TB-500, GHK-Cu) are documented to upregulate angiogenic factors in animal models.",
  },
  {
    slug: "actin-cytoskeleton",
    name: "Actin Cytoskeleton",
    shortName: "Actin",
    color: "#7E57C2",
    description: "G-actin sequestration and cell migration.",
    longDescription: "Actin is the most abundant cytoskeletal protein in eukaryotic cells, cycling between monomeric G-actin and polymerized F-actin. G-actin sequestering proteins (Thymosin Beta-4, and its synthetic fragment TB-500) shift the equilibrium to promote cell migration — particularly endothelial cells and stem cells in tissue-repair contexts.",
  },
  {
    slug: "skin-matrix",
    name: "Skin Matrix",
    shortName: "Skin",
    color: "#EC407A",
    description: "Dermal collagen, elastin, and glycosaminoglycan synthesis.",
    longDescription: "The dermal extracellular matrix comprises collagen (primarily type I and III), elastin, and glycosaminoglycans (hyaluronic acid, dermatan sulfate). Age-related skin changes reflect declining synthesis and increased degradation of these components. GHK-Cu is the most-studied research peptide for direct transcriptional induction of dermal-matrix synthesis.",
  },
  {
    slug: "longevity",
    name: "Longevity",
    shortName: "Longevity",
    color: "#BA68C8",
    description: "Aging-biology pathways · sirtuins, mitochondria, senescence.",
    longDescription: "The longevity category includes compounds acting on canonical aging-biology pathways: sirtuins (NAD+-dependent deacylases), mitochondrial function and biogenesis, cellular senescence, autophagy, and the AMPK/mTOR axis. NAD+ and its precursors are the most-studied longevity compounds; MOTS-c (mitochondrial-derived peptide) is an emerging category.",
  },
  {
    slug: "sirtuin-axis",
    name: "Sirtuin Axis",
    shortName: "Sirtuins",
    color: "#AB47BC",
    description: "NAD+-dependent class-III deacylase signaling.",
    longDescription: "Sirtuins (SIRT1–SIRT7) are NAD+-dependent class-III lysine deacylases that regulate metabolism, stress response, DNA repair, and circadian rhythm. They consume NAD+ stoichiometrically — sirtuin activity scales with cellular NAD+ availability. NAD+ precursor supplementation (NR, NMN) is the dominant translational approach for sirtuin activation.",
  },
  {
    slug: "mitochondrial-function",
    name: "Mitochondrial Function",
    shortName: "Mitochondria",
    color: "#5C6BC0",
    description: "Oxidative phosphorylation, biogenesis, and quality control.",
    longDescription: "Mitochondrial function encompasses oxidative phosphorylation, biogenesis (driven by PGC-1α), and quality-control processes (mitophagy). The mitochondrial-derived peptide MOTS-c regulates AMPK signaling and metabolic homeostasis. NAD+ supports the electron-transport chain and mitochondrial sirtuins (SIRT3, SIRT4, SIRT5).",
  },
  {
    slug: "exercise-mimetic",
    name: "Exercise Mimetic",
    shortName: "Exercise",
    color: "#FF7043",
    description: "Peptides that mimic exercise-induced signaling.",
    longDescription: "Exercise mimetics are compounds that activate signaling pathways normally triggered by physical exercise — AMPK, PGC-1α-driven mitochondrial biogenesis, GLUT4 translocation, and FNDC5/irisin secretion. MOTS-c is the canonical example, released from mitochondria during exercise and reproducing many of the metabolic-conditioning effects in sedentary aged rodents.",
  },
  {
    slug: "gh-axis",
    name: "Growth Hormone Axis",
    shortName: "GH-Axis",
    color: "#FFB74D",
    description: "GHRH, ghrelin, and pituitary growth hormone signaling.",
    longDescription: "The growth hormone axis is regulated by two complementary upstream signals: GHRH (stimulatory, from the hypothalamus, acting on the GHRH receptor on pituitary somatotrophs) and ghrelin (stimulatory, from the stomach, acting on the GHS-R1a). Research peptides target both arms: tesamorelin and CJC-1295 (GHRH analogs); ipamorelin, GHRP-6, and hexarelin (ghrelin-receptor agonists).",
  },
  {
    slug: "lipolysis",
    name: "Lipolysis",
    shortName: "Lipolysis",
    color: "#FF8A65",
    description: "Adipose-tissue lipid breakdown and visceral-fat reduction.",
    longDescription: "Lipolysis is the breakdown of triglycerides in adipose tissue, driven by hormone-sensitive lipase activation downstream of cAMP elevation. GH-axis peptides (tesamorelin) preferentially target visceral adipose. Glucagon-receptor agonism (the third arm of retatrutide) also drives hepatic lipid mobilization.",
  },
  {
    slug: "nootropic",
    name: "Nootropic",
    shortName: "Nootropic",
    color: "#4FC3F7",
    description: "Cognitive enhancement and CNS support.",
    longDescription: "Nootropic compounds act on canonical CNS pathways — BDNF / TrkB neurotrophic signaling, monoamine modulation, and GABAergic regulation. Russian-developed heptapeptides Semax and Selank are the most-studied research nootropics in the Peppu Studio catalog, both built on the same C-terminal Pro-Gly-Pro stabilizing strategy.",
  },
  {
    slug: "anxiolytic",
    name: "Anxiolytic",
    shortName: "Anxiolytic",
    color: "#7986CB",
    description: "Anxiety-pathway modulation, primarily GABAergic.",
    longDescription: "Anxiolytic peptides modulate the GABAergic system or HPA-axis stress response. Selank is the most-studied research anxiolytic peptide, with rodent EPM and conditioned-suppression data describing potency comparable to short-acting benzodiazepines at the doses tested, without direct GABA-A binding.",
  },
  {
    slug: "gabaergic",
    name: "GABAergic",
    shortName: "GABA",
    color: "#5C6BC0",
    description: "GABA receptor system modulation.",
    longDescription: "The GABAergic system is the dominant inhibitory neurotransmission pathway in the CNS, mediating anxiolysis, sedation, and seizure-threshold elevation. Selank modulates GABA-A receptor expression and binding affinity in cortical and hippocampal tissue, providing an indirect mechanism distinct from benzodiazepine direct agonism.",
  },
  {
    slug: "neurotrophic",
    name: "Neurotrophic",
    shortName: "Neurotrophic",
    color: "#42A5F5",
    description: "BDNF, NGF, and neuronal survival pathways.",
    longDescription: "Neurotrophic signaling encompasses BDNF, NGF, and the broader neurotrophin family, acting through Trk receptor tyrosine kinases. BDNF / TrkB signaling drives synaptic plasticity, neuronal survival, and learning. Semax is the most-studied research neurotrophic peptide.",
  },
  {
    slug: "bdnf-axis",
    name: "BDNF Axis",
    shortName: "BDNF",
    color: "#29B6F6",
    description: "Brain-derived neurotrophic factor signaling.",
    longDescription: "BDNF (Brain-Derived Neurotrophic Factor) is a 119-residue homodimeric neurotrophin acting through TrkB receptor tyrosine kinase. It drives synaptic plasticity, long-term potentiation, and neuronal survival in hippocampus, cortex, and basal forebrain. Semax upregulates hippocampal BDNF / TrkB expression in rodent models.",
  },
  {
    slug: "multi-pathway",
    name: "Multi-Pathway",
    shortName: "Multi",
    color: "#FF6B9D",
    description: "Combinatorial blends engaging multiple receptor classes.",
    longDescription: "Multi-pathway research panels co-administer multiple peptides engaging distinct receptor classes in a single vial. KLOW blend is the canonical example: Kisspeptin (HPG-axis), Laminin (cell-adhesion), Oxytocin (OXTR central signaling), and GHK-Cu (skin-matrix). Per-component literature applies independently; combined-blend pharmacology is not standardized.",
  },
];

export const MECHANISMS_BY_SLUG: Record<string, Mechanism> =
  Object.fromEntries(MECHANISMS.map((m) => [m.slug, m]));
