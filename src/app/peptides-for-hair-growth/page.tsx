import Link from "next/link";
import type { Metadata } from "next";
import { PEPPUDEX } from "@/data/peppudex";
import { autoLink } from "@/lib/auto-link";

const CLUSTER = ["ghk-cu", "pt-141"];

const FAQS = [
  {
    q: "Does GHK-Cu cause hair growth in studies?",
    a: "Several in-vitro and small clinical studies report increased hair follicle size, anagen-phase duration, and dermal-papilla cell proliferation with GHK-Cu application. Animal studies (mouse, rabbit) show hair-regrowth signal at wound sites. Human evidence is mostly small-N follicle and biopsy studies rather than dermatology-grade randomized trials. The mechanistic basis is copper-binding modulation of growth-factor signaling and matrix remodeling.",
  },
  {
    q: "Copper peptide vs GHK-Cu serum · what's the difference?",
    a: "GHK-Cu is the specific tripeptide glycyl-L-histidyl-L-lysine bound to copper(II). Generic copper-peptide skincare products may use related or de-novo peptide-copper complexes. GHK-Cu is the most studied of the family. Topical serum concentrations vary widely between consumer products. Research-grade material is supplied as a chemical reference compound, distinct from any cosmetic formulation.",
  },
  {
    q: "Are peptide hair products evidence-backed?",
    a: "Topical GHK-Cu has the strongest mechanistic and small-clinical evidence base in the peptide hair space. Most consumer copper-peptide products have limited published evidence for finished-product efficacy at the actual concentration used. The dermatology gold standards for hair (finasteride, minoxidil, dutasteride, topical PG-F2-alpha analogs) are distinct from peptide compounds and have separate evidence stacks.",
  },
  {
    q: "How long for GHK-Cu hair effects in research?",
    a: "Published wound-healing studies on GHK-Cu typically run 8 to 12 weeks. Hair follicle studies on copper peptide application range from 4 to 24 weeks. The compound page at /peptides/ghk-cu lists the citation set with PMIDs and trial durations. Peppudex does not recommend any human dose or protocol.",
  },
];

export const metadata: Metadata = {
  title: "Peptides for Hair Growth · GHK-Cu, Copper Peptide · Research Reference · Peppudex",
  description:
    "Research peptides studied for hair growth. GHK-Cu (copper tripeptide) leads the mechanistic and small-clinical evidence base. PT-141 melanocortin signaling. Mechanism, evidence grades, FAQs.",
  alternates: { canonical: "https://peppudex.com/peptides-for-hair-growth" },
  openGraph: {
    title: "Peptides for Hair Growth · Research Reference",
    description:
      "Research peptides studied for hair growth and follicle activity. GHK-Cu, PT-141. Mechanism, evidence grades, FAQs.",
    type: "website",
    url: "https://peppudex.com/peptides-for-hair-growth",
  },
};

export default function PeptidesForHairGrowthPage() {
  const cluster = CLUSTER.map((slug) => PEPPUDEX.find((p) => p.slug === slug)).filter(
    (p): p is NonNullable<typeof p> => Boolean(p),
  );

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "MedicalWebPage",
      "@id": "https://peppudex.com/peptides-for-hair-growth",
      url: "https://peppudex.com/peptides-for-hair-growth",
      name: "Peptides for Hair Growth · Research Reference",
      description:
        "Research peptides studied for hair growth. Mechanism, evidence grades, FAQs, peer-reviewed sources.",
      inLanguage: "en-US",
      audience: { "@type": "Audience", audienceType: "Research" },
      isAccessibleForFree: true,
      publisher: { "@id": "https://peppudex.com/#organization" },
      datePublished: "2026-05-20",
      dateModified: "2026-05-20",
    },
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "@id": "https://peppudex.com/peptides-for-hair-growth#article",
      headline: "Peptides for Hair Growth · Research Reference",
      description:
        "Research peptides studied for hair growth and follicle activity. GHK-Cu, PT-141. Mechanism, evidence grades, FAQs.",
      url: "https://peppudex.com/peptides-for-hair-growth",
      datePublished: "2026-05-20",
      dateModified: "2026-05-20",
      inLanguage: "en-US",
      mainEntityOfPage: { "@id": "https://peppudex.com/peptides-for-hair-growth" },
      publisher: { "@id": "https://peppudex.com/#organization" },
      author: { "@id": "https://peppudex.com/#organization" },
      about: ["hair growth", "copper peptide", "GHK-Cu", "follicle biology"],
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "PEPPUDEX", item: "https://peppudex.com" },
        {
          "@type": "ListItem",
          position: 2,
          name: "Peptides for Hair Growth",
          item: "https://peppudex.com/peptides-for-hair-growth",
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
            HAIR GROWTH
          </span>
        </div>

        <article className="detail">
          <h1>PEPTIDES FOR HAIR GROWTH</h1>
          <p style={{ fontFamily: "var(--font-pixel)", fontSize: 11, letterSpacing: "0.14em", marginTop: 8, opacity: 0.7 }}>
            RESEARCH REFERENCE · COPPER PEPTIDE · FOLLICLE BIOLOGY
          </p>
          <p className="body" style={{ marginTop: 14 }}>
            {autoLink("GHK-Cu (glycyl-L-histidyl-L-lysine copper) is the most-studied research peptide in the hair-growth space. Mechanistically it binds copper(II), modulates growth-factor signaling, and remodels the extracellular matrix. Several small clinical and follicle-biology studies report increased anagen-phase duration, dermal-papilla cell proliferation, and follicle size with topical application. PT-141 (bremelanotide) is a melanocortin-receptor agonist studied for separate indications; melanocortin signaling intersects skin and follicle pigmentation, included here as adjacent reference. The dermatology gold-standard hair treatments (finasteride, minoxidil, dutasteride) are not peptides and have separate evidence stacks.")}
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
            <li><Link href="/peptides/ghk-cu" style={{ color: "var(--ink)" }}>GHK-Cu Full Card</Link></li>
            <li><Link href="/conditions/wound-healing" style={{ color: "var(--ink)" }}>Wound-Healing Research</Link></li>
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
              href="https://peppu.studio?utm_source=peppudex&utm_medium=usecase&utm_campaign=hair-growth"
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
