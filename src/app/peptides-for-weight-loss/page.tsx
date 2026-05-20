import Link from "next/link";
import type { Metadata } from "next";
import { PEPPUDEX } from "@/data/peppudex";

const CLUSTER = [
  "retatrutide",
  "tirzepatide",
  "cagrilintide",
  "survodutide",
  "orforglipron",
  "mazdutide",
  "aod-9604",
  "mots-c",
];

const FAQS = [
  {
    q: "What peptide has the most weight loss in clinical trials?",
    a: "Retatrutide leads published trial data. The Phase 2 NEJM trial (Jastreboff 2023, PMID 37366315) reported -24.2% LS mean body weight at the 12 mg dose arm at 48 weeks. Tirzepatide at 15 mg in SURMOUNT-1 reached -22.5% at 72 weeks. Semaglutide 2.4 mg in STEP-1 reached -14.9% at 68 weeks. Retatrutide is investigational. Tirzepatide is FDA-approved as Mounjaro and Zepbound. Semaglutide is FDA-approved as Wegovy.",
  },
  {
    q: "Are research peptides for weight loss FDA approved?",
    a: "Some incretin agonists are FDA approved as prescription drugs. Tirzepatide (Mounjaro and Zepbound), semaglutide (Ozempic and Wegovy), and liraglutide (Saxenda) are FDA approved. Retatrutide, survodutide, orforglipron, mazdutide and cagrilintide are investigational. Research-grade material sold as a reference compound is for in-vitro laboratory use only, distinct from any branded prescription product.",
  },
  {
    q: "Retatrutide vs tirzepatide for weight loss?",
    a: "Retatrutide is a triple GLP-1 plus GIP plus glucagon agonist. Tirzepatide is a dual GLP-1 plus GIP agonist. The added glucagon arm in retatrutide drives a thermogenic / energy-expenditure component on top of the appetite and insulin effects. Phase 2 retatrutide produced -24.2% body-weight reduction at 48 weeks vs tirzepatide -22.5% at 72 weeks. See the full /vs/retatrutide-vs-tirzepatide comparison.",
  },
  {
    q: "How are these used in research?",
    a: "All compounds on this page are supplied as research-grade chemical reference material for in-vitro laboratory studies. Each compound page documents the published trial dosing schedule, half-life, mechanism, and per-receptor pharmacology. Peppudex does not recommend any human dose. For purchase of research-grade material see peppu.studio.",
  },
];

export const metadata: Metadata = {
  title: "Peptides for Weight Loss · Retatrutide, Tirzepatide, Semaglutide · Research Reference · Peppudex",
  description:
    "Research peptides studied for weight loss / body composition. Retatrutide (triple agonist, ~24% mean fat-mass reduction at 48wk Phase 2), tirzepatide (Mounjaro, Zepbound), semaglutide, liraglutide, cagrilintide. Mechanism, evidence grades, FAQs.",
  alternates: { canonical: "https://peppudex.com/peptides-for-weight-loss" },
  openGraph: {
    title: "Peptides for Weight Loss · Research Reference",
    description:
      "8 research peptides studied for body composition and glycemic control. Incretin axis (GLP-1, GIP, glucagon). Mechanism, evidence grades, FAQs.",
    type: "website",
    url: "https://peppudex.com/peptides-for-weight-loss",
  },
};

export default function PeptidesForWeightLossPage() {
  const cluster = CLUSTER.map((slug) => PEPPUDEX.find((p) => p.slug === slug)).filter(
    (p): p is NonNullable<typeof p> => Boolean(p),
  );

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "MedicalWebPage",
      "@id": "https://peppudex.com/peptides-for-weight-loss",
      url: "https://peppudex.com/peptides-for-weight-loss",
      name: "Peptides for Weight Loss · Research Reference",
      description:
        "Research peptides studied for weight loss and body composition. Mechanism, evidence grades, FAQs, peer-reviewed sources.",
      inLanguage: "en-US",
      audience: { "@type": "Audience", audienceType: "Research" },
      isAccessibleForFree: true,
      publisher: { "@id": "https://peppudex.com/#organization" },
      datePublished: "2026-05-20",
      dateModified: "2026-05-20",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "PEPPUDEX", item: "https://peppudex.com" },
        {
          "@type": "ListItem",
          position: 2,
          name: "Peptides for Weight Loss",
          item: "https://peppudex.com/peptides-for-weight-loss",
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
            WEIGHT LOSS
          </span>
        </div>

        <article className="detail">
          <h1>PEPTIDES FOR WEIGHT LOSS</h1>
          <p style={{ fontFamily: "var(--font-pixel)", fontSize: 11, letterSpacing: "0.14em", marginTop: 8, opacity: 0.7 }}>
            RESEARCH REFERENCE · INCRETIN AXIS · GLP-1 · GIP · GLUCAGON
          </p>
          <p className="body" style={{ marginTop: 14 }}>
            Eight research peptides studied for body composition and glycemic control. The largest weight-loss effects in published trials come from the incretin axis: GLP-1 receptor (semaglutide, liraglutide), dual GLP-1 plus GIP (tirzepatide), triple GLP-1 plus GIP plus glucagon (retatrutide, survodutide), and amylin-receptor co-agonists (cagrilintide). MOTS-c sits outside the incretin family · a mitochondrial-derived peptide studied for metabolic effects. AOD-9604 is a synthetic C-terminal fragment of human growth hormone studied for lipolytic activity.
          </p>

          <h2>WHAT THE RESEARCH SHOWS</h2>
          <p className="body">
            Incretin receptor agonism drives glucose-dependent insulin secretion, glucagon suppression, delayed gastric emptying, and central appetite suppression. Adding the GIP arm (tirzepatide, retatrutide) increases absolute weight loss versus single-agonist GLP-1 compounds. Adding the glucagon arm (retatrutide, survodutide, mazdutide) further increases energy expenditure via thermogenic signaling, which is the leading hypothesis for why retatrutide Phase 2 produced deeper body-weight reductions than dual-agonist trials at comparable timepoints.
          </p>

          <h2>COMPOUND CLUSTER · {cluster.length} ENTRIES</h2>
          <section className="grid">
            {cluster.map((p) => (
              <Link key={p.id} href={`/peptides/${p.slug}`} className="card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="art" src={p.card || "/cards/placeholder.svg"} alt={`${p.name} trading card`} />
                <div className="meta">
                  <span>No. {p.id}</span>
                  <span className="hp">HP {p.hp}</span>
                </div>
                <div className="name">{p.name}</div>
                <div className="types">
                  {p.types.map((t) => (
                    <span key={t} className="badge" data-t={t}>
                      {t.toUpperCase()}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </section>

          <h2>RECEPTOR AGONISM MATRIX</h2>
          <div className="scroll-x-on-mobile" style={{ background: "var(--paper)", border: "4px solid var(--ink)", boxShadow: "6px 6px 0 var(--shadow)", marginTop: 8 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1.4fr repeat(4, 1fr)", borderBottom: "3px solid var(--ink)", background: "var(--ink)", color: "var(--paper)" }}>
              <div style={{ fontFamily: "var(--font-pixel)", fontSize: 9, padding: "10px 12px", letterSpacing: "0.16em" }}>COMPOUND</div>
              <div style={{ fontFamily: "var(--font-pixel)", fontSize: 9, padding: "10px 12px", letterSpacing: "0.16em", borderLeft: "2px solid var(--paper)" }}>GLP-1</div>
              <div style={{ fontFamily: "var(--font-pixel)", fontSize: 9, padding: "10px 12px", letterSpacing: "0.16em", borderLeft: "2px solid var(--paper)" }}>GIP</div>
              <div style={{ fontFamily: "var(--font-pixel)", fontSize: 9, padding: "10px 12px", letterSpacing: "0.16em", borderLeft: "2px solid var(--paper)" }}>GCGR</div>
              <div style={{ fontFamily: "var(--font-pixel)", fontSize: 9, padding: "10px 12px", letterSpacing: "0.16em", borderLeft: "2px solid var(--paper)" }}>OTHER</div>
            </div>
            {[
              ["Retatrutide", "yes", "yes", "yes", ""],
              ["Tirzepatide", "yes", "yes", "", ""],
              ["Survodutide", "yes", "", "yes", ""],
              ["Mazdutide", "yes", "", "yes", ""],
              ["Cagrilintide", "", "", "", "amylin"],
              ["Orforglipron", "yes (oral, small molecule)", "", "", ""],
              ["MOTS-c", "", "", "", "mitochondrial"],
              ["AOD-9604", "", "", "", "GH C-terminal fragment"],
            ].map((row, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "1.4fr repeat(4, 1fr)", borderBottom: i === 7 ? "none" : "2px solid rgba(0,0,0,0.1)" }}>
                <div className="body" style={{ padding: "12px", fontSize: 16, background: "rgba(0,0,0,0.04)" }}>{row[0]}</div>
                {row.slice(1).map((cell, j) => (
                  <div key={j} className="body" style={{ padding: "12px", borderLeft: "2px solid rgba(0,0,0,0.1)", fontSize: 16, textAlign: "center", color: cell ? "var(--ink)" : "rgba(0,0,0,0.3)" }}>
                    {cell || "·"}
                  </div>
                ))}
              </div>
            ))}
          </div>

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
            <li><Link href="/vs/retatrutide-vs-tirzepatide" style={{ color: "var(--ink)" }}>Retatrutide vs Tirzepatide · Head to Head</Link></li>
            <li><Link href="/conditions/body-composition" style={{ color: "var(--ink)" }}>Body Composition Research</Link></li>
            <li><Link href="/conditions/glycemic-control" style={{ color: "var(--ink)" }}>Glycemic Control Research</Link></li>
            <li><Link href="/mechanisms/incretin-axis" style={{ color: "var(--ink)" }}>Incretin Axis Mechanism</Link></li>
            <li><Link href="/calculator" style={{ color: "var(--ink)" }}>Peptide Reconstitution Calculator</Link></li>
            <li><Link href="/tools/half-life-chart" style={{ color: "var(--ink)" }}>Peptide Half-Life Chart</Link></li>
          </ul>

          <h2>SOURCED FROM PEPPU LABS</h2>
          <p className="body" style={{ marginBottom: 14 }}>
            Research-grade reference compounds available at Peppu Studio · ≥99% purity · per-batch CoA. For laboratory research use only.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a
              className="back"
              style={{ fontFamily: "var(--font-pixel)", fontSize: 10, padding: "10px 14px", color: "var(--paper)", textDecoration: "none", background: "var(--ink)" }}
              href="https://peppu.studio?utm_source=peppudex&utm_medium=usecase&utm_campaign=weight-loss"
              target="_blank"
              rel="noopener noreferrer"
            >
              SOURCE AT PEPPU LABS ▶
            </a>
          </div>
        </article>
      </div>

      <div className="disclaimer-band">© 2026 Peppu Studio LLC · For Laboratory Research Use Only</div>
    </main>
  );
}
