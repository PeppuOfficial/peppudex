import Link from "next/link";
import type { Metadata } from "next";
import { PEPPUDEX } from "@/data/peppudex";
import { autoLink } from "@/lib/auto-link";
import { storefrontProductUrl } from "@/lib/storefront-map";

const CLUSTER = [
  "tb-500",
  "bpc-157",
  "ipa-cjc1295",
  "igf-1-lr3",
  "mots-c",
  "wolverine-blend",
  "adamax",
];

const FAQS = [
  {
    q: "What peptide builds the most muscle in animal models?",
    a: "Direct anabolic peptides like IGF-1 LR3 act on the IGF-1 receptor and drive skeletal-muscle hypertrophy in rodent models. Growth-hormone secretagogues like CJC-1295 plus Ipamorelin raise endogenous GH and IGF-1 pulses. BPC-157 and TB-500 act on tissue repair rather than direct hypertrophy, but accelerate recovery between training stress events. No clean head-to-head human RCT compares these compounds for hypertrophy.",
  },
  {
    q: "BPC-157 + TB-500 stack · what does the research show?",
    a: "The Wolverine stack pairs BPC-157 (angiogenesis, VEGF, NO, growth-hormone-receptor upregulation) with TB-500 (G-actin sequestration, cell migration). The two mechanisms are complementary rather than competitive. Animal-model evidence is the basis for combining them in community protocols. No published RCT validates the specific combination in humans. See /vs/bpc-157-vs-tb-500 for the full comparison.",
  },
  {
    q: "Are growth-hormone peptides legal?",
    a: "Growth-hormone secretagogues (CJC-1295, Ipamorelin, GHRP-2, GHRP-6, Hexarelin, Tesamorelin) are prohibited at all times by WADA for athletes in tested sport. They are not FDA-approved as prescription drugs in the United States except for tesamorelin in HIV-associated lipodystrophy. Research-grade reference compounds are sold for in-vitro laboratory use only.",
  },
  {
    q: "How do research peptides differ from anabolic steroids?",
    a: "Anabolic-androgenic steroids are testosterone derivatives that bind androgen receptors and drive direct protein synthesis. Research peptides act through different receptors: growth-hormone secretagogues raise endogenous GH, IGF-1 LR3 binds the IGF-1 receptor, BPC-157 and TB-500 act on tissue-repair pathways. Mechanisms, side-effect profiles, and regulatory status are all different. Both classes are off-label for muscle growth in the United States.",
  },
];

export const metadata: Metadata = {
  title: "Peptides for Muscle Growth · BPC-157, TB-500, IGF-1 LR3, CJC-1295 · Research Reference · Peppudex",
  description:
    "Research peptides studied for muscle growth and recovery. Wolverine stack (BPC-157 + TB-500), CJC-1295 + Ipamorelin (GH axis), IGF-1 LR3, MOTS-c, Adamax. Mechanism, evidence grades, FAQs.",
  alternates: { canonical: "https://peppudex.com/peptides-for-muscle-growth" },
  openGraph: {
    title: "Peptides for Muscle Growth · Research Reference",
    description:
      "7 research peptides studied for muscle growth and recovery. Tissue-repair, GH-axis, IGF-1. Mechanism, evidence grades, FAQs.",
    type: "website",
    url: "https://peppudex.com/peptides-for-muscle-growth",
  },
};

export default function PeptidesForMuscleGrowthPage() {
  const cluster = CLUSTER.map((slug) => PEPPUDEX.find((p) => p.slug === slug)).filter(
    (p): p is NonNullable<typeof p> => Boolean(p),
  );

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://peppudex.com/peptides-for-muscle-growth",
      url: "https://peppudex.com/peptides-for-muscle-growth",
      name: "Peptides for Muscle Growth · Research Reference",
      description:
        "Research peptides studied for muscle growth and recovery. Mechanism, evidence grades, FAQs, peer-reviewed sources.",
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
      "@id": "https://peppudex.com/peptides-for-muscle-growth#article",
      headline: "Peptides for Muscle Growth · Research Reference",
      description:
        "Seven research peptides studied for muscle growth and recovery. Tissue-repair, GH axis, IGF-1. Mechanism, evidence grades, FAQs.",
      url: "https://peppudex.com/peptides-for-muscle-growth",
      datePublished: "2026-05-20",
      dateModified: "2026-05-20",
      inLanguage: "en-US",
      mainEntityOfPage: { "@id": "https://peppudex.com/peptides-for-muscle-growth" },
      publisher: { "@id": "https://peppudex.com/#organization" },
      author: { "@id": "https://peppudex.com/#organization" },
      about: ["muscle growth", "tissue repair", "growth hormone secretagogue", "IGF-1", "Wolverine stack"],
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "PEPPUDEX", item: "https://peppudex.com" },
        {
          "@type": "ListItem",
          position: 2,
          name: "Peptides for Muscle Growth",
          item: "https://peppudex.com/peptides-for-muscle-growth",
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
            MUSCLE GROWTH
          </span>
        </div>

        <article className="detail">
          <h1>PEPTIDES FOR MUSCLE GROWTH</h1>
          <p style={{ fontFamily: "var(--font-pixel)", fontSize: 11, letterSpacing: "0.14em", marginTop: 8, opacity: 0.7 }}>
            RESEARCH REFERENCE · TISSUE REPAIR · GH AXIS · IGF-1
          </p>
          <p className="body" style={{ marginTop: 14 }}>
            {autoLink("Seven research peptides studied for muscle growth and recovery. Three mechanistic families are represented. Tissue-repair compounds (BPC-157, TB-500) accelerate recovery between training stress events through angiogenesis, growth-factor upregulation, and cell migration. Growth-hormone secretagogues (the CJC-1295 plus Ipamorelin combination) raise endogenous GH and IGF-1 pulses. Direct IGF-1 receptor agonists (IGF-1 LR3) drive skeletal-muscle hypertrophy in rodent models. MOTS-c and Adamax act on metabolic and oxidative pathways relevant to training adaptation.")}
          </p>

          <h2>THE WOLVERINE STACK · BPC-157 + TB-500</h2>
          <p className="body">
            {autoLink("The Wolverine stack is the most commonly referenced recovery research stack in community protocols. BPC-157 drives angiogenesis and growth-hormone-receptor upregulation. TB-500 drives cell migration via G-actin sequestration. The two mechanisms are complementary. Both compounds are prohibited at all times by WADA for tested-sport athletes. Animal-model evidence is strong. No published human RCT validates the specific combination. See /stacks/wolverine-blend for the full stack page and /vs/bpc-157-vs-tb-500 for the head-to-head comparison.")}
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
            <li><Link href="/vs/bpc-157-vs-tb-500" style={{ color: "var(--ink)" }}>BPC-157 vs TB-500 · Head to Head</Link></li>
            <li><Link href="/stacks/wolverine-blend" style={{ color: "var(--ink)" }}>Wolverine Stack · BPC-157 + TB-500</Link></li>
            <li><Link href="/conditions/tendon-ligament" style={{ color: "var(--ink)" }}>Tendon and Ligament Research</Link></li>
            <li><Link href="/conditions/wound-healing" style={{ color: "var(--ink)" }}>Wound-Healing Research</Link></li>
            <li><Link href="/calculator" style={{ color: "var(--ink)" }}>Peptide Reconstitution Calculator</Link></li>
            <li><Link href="/tools/half-life-chart" style={{ color: "var(--ink)" }}>Peptide Half-Life Chart</Link></li>
          </ul>

          <h2>SOURCED FROM PEPPU LABS</h2>
          <p className="body" style={{ marginBottom: 14 }}>
            Research-grade reference compounds available at Peppu Studio · ≥99% purity · per-batch CoA. For laboratory research use only.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {cluster.slice(0, 5).map((p) => (
              <a
                key={p.slug}
                className="back"
                style={{ fontFamily: "var(--font-pixel)", fontSize: 10, padding: "10px 14px", color: "var(--paper)", textDecoration: "none", background: "var(--ink)" }}
                href={storefrontProductUrl(p.slug, "usecase-muscle")}
                target="_blank"
                rel="noopener noreferrer"
              >
                SOURCE {p.name} ▶
              </a>
            ))}
          </div>
        </article>
      </div>

      <div className="disclaimer-band">© 2026 Peppu Studio LLC · For Laboratory Research Use Only</div>
    </main>
  );
}
