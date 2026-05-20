import Link from "next/link";
import type { Metadata } from "next";

const FAQS = [
  {
    q: "What's the difference between peptides and proteins?",
    a: "Both are chains of amino acids linked by peptide bonds. The line is convention rather than chemistry: chains of roughly 2 to 50 amino acids are called peptides; longer chains are called proteins. Insulin (51 amino acids) sits at the boundary. Function tracks length only loosely. Many peptides are biologically active cell-signaling molecules. Many proteins are structural or catalytic.",
  },
  {
    q: "Do peptides work like steroids?",
    a: "No. Anabolic-androgenic steroids are testosterone derivatives that bind androgen receptors and drive direct protein synthesis. Research peptides act on different receptors. Incretin agonists (GLP-1, GIP, glucagon receptors) modulate insulin, gastric emptying and appetite. Growth-hormone secretagogues raise endogenous GH and IGF-1. Tissue-repair peptides act on angiogenesis and cell migration. Different mechanism class, different side-effect profile, different regulatory status.",
  },
  {
    q: "How are research peptides administered?",
    a: "Most research peptides are studied as subcutaneous injection because they are large, polar, and rapidly degraded by gastric protease, which makes oral bioavailability low. A few have alternative routes in studies: GHK-Cu has topical evidence. Some compounds are also studied intranasally (selank, semax). Orforglipron is unusual as an orally bioavailable small-molecule GLP-1 agonist (not a true peptide). Peppudex documents the published route per compound.",
  },
  {
    q: "How long until peptides take effect?",
    a: "Depends on the compound and the endpoint. Incretin agonists show measurable appetite reduction within days; meaningful weight change accrues over weeks. Tissue-repair peptides (BPC-157, TB-500) show animal-model healing acceleration over 2 to 4 weeks. Growth-hormone secretagogues raise GH and IGF-1 within hours; downstream effects accrue over weeks. Half-life and steady-state math are documented per compound on the /tools/half-life-chart page.",
  },
];

export const metadata: Metadata = {
  title: "How Do Peptides Work? · Mechanism Explainer · Peppudex",
  description:
    "Peptides are 2-50 amino-acid chains that bind specific cell-surface receptors and trigger cell signaling. Incretin axis (GLP-1, GIP), GH secretagogue, tissue repair (BPC-157, TB-500), copper-binding (GHK-Cu), mitochondrial (MOTS-c). Research-only encyclopedia.",
  alternates: { canonical: "https://peppudex.com/how-do-peptides-work" },
  openGraph: {
    title: "How Do Peptides Work? · Mechanism Explainer",
    description:
      "Peptides bind receptors and trigger cell signaling. 5 mechanism families on Peppudex. Mechanism, evidence, sources.",
    type: "article",
    url: "https://peppudex.com/how-do-peptides-work",
  },
};

export default function HowDoPeptidesWorkPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "@id": "https://peppudex.com/how-do-peptides-work",
      headline: "How Do Peptides Work? · Mechanism Explainer",
      description:
        "Peptides are 2-50 amino-acid chains that bind specific cell-surface receptors and trigger cell signaling. Mechanism explainer for the 5 major peptide families on Peppudex.",
      url: "https://peppudex.com/how-do-peptides-work",
      datePublished: "2026-05-20",
      dateModified: "2026-05-20",
      inLanguage: "en-US",
      publisher: { "@id": "https://peppudex.com/#organization" },
      author: { "@id": "https://peppudex.com/#organization" },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "PEPPUDEX", item: "https://peppudex.com" },
        {
          "@type": "ListItem",
          position: 2,
          name: "How Do Peptides Work?",
          item: "https://peppudex.com/how-do-peptides-work",
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  return (
    <main>
      <div className="header-strip">FOR LABORATORY RESEARCH USE ONLY · NOT FOR HUMAN CONSUMPTION</div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="page">
        <div className="brandbar">
          <Link
            href="/"
            style={{
              background: "var(--ink)",
              color: "var(--paper)",
              fontFamily: "var(--font-pixel)",
              fontSize: 10,
              padding: "10px 14px",
              textDecoration: "none",
              letterSpacing: "0.14em",
              boxShadow: "3px 3px 0 rgba(0,0,0,0.35)",
            }}
          >
            ◀ INDEX
          </Link>
          <span
            style={{
              fontFamily: "var(--font-pixel)",
              fontSize: 14,
              color: "var(--paper)",
              textShadow: "3px 3px 0 var(--ink)",
            }}
          >
            EXPLAINER
          </span>
        </div>

        <article className="detail">
          <h1>HOW DO PEPTIDES WORK?</h1>
          <p style={{ fontFamily: "var(--font-pixel)", fontSize: 11, letterSpacing: "0.14em", marginTop: 8, opacity: 0.7 }}>
            MECHANISM EXPLAINER · 5 PEPTIDE FAMILIES ON PEPPUDEX
          </p>

          <h2>WHAT IS A PEPTIDE?</h2>
          <p className="body">
            A peptide is a short chain of amino acids linked together by peptide bonds. By convention, chains of about 2 to 50 amino acids are called peptides. Longer chains are called proteins. Insulin (51 amino acids) sits at the boundary. Every protein in the body is built from the same 20 amino-acid building blocks. The sequence determines the molecule.
          </p>

          <h2>HOW PEPTIDES SIGNAL CELLS</h2>
          <p className="body">
            Bioactive peptides bind specific cell-surface receptors. The metaphor used in textbooks is key-and-lock. The peptide is the key. The receptor is the lock. When the key fits, the receptor changes shape and triggers a cascade of intracellular events. Some peptides activate G-protein-coupled receptors (most incretins, melanocortin receptors). Some bind receptor tyrosine kinases (IGF-1 LR3 binds IGF-1 receptor). Some bind nuclear receptors. Some, like BPC-157, appear to act through indirect pathways that are still under active research. The mechanism family determines the downstream effect.
          </p>

          <h2>THE 5 MECHANISM FAMILIES ON PEPPUDEX</h2>
          <p className="body">
            Peppudex organizes its {27} compounds into five mechanism families. Each compound page links to its mechanism category at <Link href="/mechanisms" style={{ color: "var(--ink)" }}>/mechanisms</Link>.
          </p>

          <h3>1 · Incretin axis</h3>
          <p className="body">
            GLP-1, GIP and glucagon receptor agonists. Drive glucose-dependent insulin secretion, glucagon suppression, delayed gastric emptying, and central appetite suppression. The largest weight-loss effects in published trials. Compounds: retatrutide, tirzepatide, semaglutide, liraglutide, cagrilintide, survodutide, orforglipron, mazdutide.
          </p>

          <h3>2 · Growth-hormone secretagogue</h3>
          <p className="body">
            Raise endogenous growth hormone and IGF-1 pulses via the GHRH receptor (CJC-1295, tesamorelin) or the ghrelin receptor (ipamorelin, hexarelin). Drive downstream IGF-1-mediated effects on lean mass and recovery. Compounds: CJC-1295 + Ipamorelin (ipa-cjc1295), tesamorelin, hexarelin family.
          </p>

          <h3>3 · Tissue repair</h3>
          <p className="body">
            Drive angiogenesis, growth-factor signaling, cell migration. Animal-model evidence for accelerated tendon, ligament, gut-mucosal and dermal healing. Compounds: BPC-157, TB-500, the Wolverine stack.
          </p>

          <h3>4 · Copper-binding</h3>
          <p className="body">
            GHK-Cu is the canonical example. The glycyl-L-histidyl-L-lysine tripeptide binds copper(II) and modulates growth-factor signaling, extracellular matrix remodeling, dermal-papilla cell proliferation, and follicle activity. Small clinical and follicle-biology studies report hair-growth signal. Compounds: GHK-Cu.
          </p>

          <h3>5 · Mitochondrial</h3>
          <p className="body">
            Mitochondrial-derived peptides like MOTS-c (encoded in the mtDNA 12S rRNA region) act on AMPK pathways, insulin sensitivity, and exercise capacity in rodent models. Distinct from incretin and GH-axis families. Compounds: MOTS-c, humanin, SS-31.
          </p>

          <h2>RESEARCH VS CLINICAL USE</h2>
          <p className="body">
            Some peptides on Peppudex are FDA-approved as prescription drugs (tirzepatide as Mounjaro and Zepbound, semaglutide as Ozempic and Wegovy, liraglutide as Saxenda, tesamorelin as Egrifta). Most are investigational or research-only. Compounds sold as research-grade reference material are for in-vitro laboratory use only, distinct from any branded prescription product. Peppudex documents mechanism and published evidence. Peppudex does not recommend any human dose.
          </p>

          <h2>FAQ</h2>
          <div style={{ display: "grid", gap: 12 }}>
            {FAQS.map((f, i) => (
              <details key={i} style={{ background: "var(--paper)", border: "3px solid var(--ink)", boxShadow: "4px 4px 0 var(--shadow)", padding: "12px 14px" }}>
                <summary style={{ fontFamily: "var(--font-pixel)", fontSize: 11, letterSpacing: "0.06em", cursor: "pointer" }}>
                  ▶ {f.q}
                </summary>
                <p className="body" style={{ marginTop: 10 }}>{f.a}</p>
              </details>
            ))}
          </div>

          <h2>RELATED</h2>
          <ul style={{ paddingLeft: 20 }}>
            <li><Link href="/" style={{ color: "var(--ink)" }}>List of Peptides and What They Do · 27 Cards</Link></li>
            <li><Link href="/mechanisms" style={{ color: "var(--ink)" }}>All Mechanisms</Link></li>
            <li><Link href="/conditions" style={{ color: "var(--ink)" }}>All Research Conditions</Link></li>
            <li><Link href="/peptides-for-weight-loss" style={{ color: "var(--ink)" }}>Peptides for Weight Loss</Link></li>
            <li><Link href="/peptides-for-muscle-growth" style={{ color: "var(--ink)" }}>Peptides for Muscle Growth</Link></li>
            <li><Link href="/peptides-for-hair-growth" style={{ color: "var(--ink)" }}>Peptides for Hair Growth</Link></li>
            <li><Link href="/tools/half-life-chart" style={{ color: "var(--ink)" }}>Peptide Half-Life Chart</Link></li>
          </ul>
        </article>
      </div>

      <div className="disclaimer-band">© 2026 Peppu Studio LLC · For Laboratory Research Use Only</div>
    </main>
  );
}
