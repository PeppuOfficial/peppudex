import Link from "next/link";
import type { Metadata } from "next";
import { PEPPUDEX } from "@/data/peppudex";
import { ENRICHMENT } from "@/data/enrichment";
import { MECHANISMS } from "@/data/mechanisms";
import CardImage from "@/components/CardImage";

export const metadata: Metadata = {
  title: "All Research Peptides · 27 Compound Index · Peppudex",
  description:
    "Full index of 27 research peptides on Peppudex. BPC-157, GHK-Cu, retatrutide, tirzepatide, semaglutide, MOTS-c, TB-500, NAD+, tesamorelin, CJC-1295, IGF-1 LR3 and 16 more. Browse by mechanism, jump to any compound card.",
  alternates: { canonical: "https://peppudex.com/peptides" },
  openGraph: {
    title: "All Research Peptides · 27 Compound Index",
    description:
      "Full index of 27 research peptides. Mechanism, evidence grades, FAQs. Browse the Pokedex.",
    type: "website",
    url: "https://peppudex.com/peptides",
  },
};

export default function PeptidesIndexPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": "https://peppudex.com/peptides",
      url: "https://peppudex.com/peptides",
      name: "All Research Peptides · 27 Compound Index",
      description: "Full index of 27 research peptides on Peppudex.",
      inLanguage: "en-US",
      isPartOf: { "@id": "https://peppudex.com/#site" },
      publisher: { "@id": "https://peppudex.com/#org" },
      hasPart: PEPPUDEX.map((p) => ({
        "@type": "WebPage",
        "@id": `https://peppudex.com/peptides/${p.slug}`,
        name: p.name,
        url: `https://peppudex.com/peptides/${p.slug}`,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "PEPPUDEX", item: "https://peppudex.com" },
        { "@type": "ListItem", position: 2, name: "All Peptides", item: "https://peppudex.com/peptides" },
      ],
    },
  ];

  // Bucket compounds by primary mechanism for the section grid.
  const byMechanism: Record<string, typeof PEPPUDEX> = {};
  for (const p of PEPPUDEX) {
    const m = ENRICHMENT[p.slug]?.mechanisms?.[0] ?? "other";
    if (!byMechanism[m]) byMechanism[m] = [];
    byMechanism[m].push(p);
  }
  const mechSlugs = Object.keys(byMechanism).sort((a, b) => byMechanism[b].length - byMechanism[a].length);

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
          <span style={{ fontFamily: "var(--font-pixel)", fontSize: 14, color: "var(--paper)", textShadow: "3px 3px 0 var(--ink)" }}>
            ALL PEPTIDES
          </span>
        </div>

        <article className="detail" style={{ padding: "12px 0 32px" }}>
          <h1>ALL RESEARCH PEPTIDES</h1>
          <p style={{ fontFamily: "var(--font-pixel)", fontSize: 11, letterSpacing: "0.14em", marginTop: 8, opacity: 0.7 }}>
            {PEPPUDEX.length} ENTRIES · BROWSE THE INDEX
          </p>
          <p className="body" style={{ marginTop: 14 }}>
            Full index of every research peptide documented on Peppudex. Each card opens to a Tier-1 compound page with mechanism notes, evidence grades A to F, FAQs and peer-reviewed sources. Tier-3 subtopic pages live underneath each compound at /peptides/[slug]/mechanism, /dosing and /safety. Browse the alphabetical grid below or jump to a mechanism cluster.
          </p>

          <h2>ALPHABETICAL · {PEPPUDEX.length} CARDS</h2>
          <section className="grid">
            {[...PEPPUDEX]
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((p, index) => (
                <Link key={p.id} href={`/peptides/${p.slug}`} className="card" prefetch={false}>
                  <CardImage
                    className="art"
                    src={p.card}
                    alt={`${p.name} trading card`}
                    priority={index < 4}
                  />
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

          <h2>BY MECHANISM</h2>
          {mechSlugs.map((m) => {
            const mech = MECHANISMS.find((x) => x.slug === m);
            const list = byMechanism[m];
            return (
              <div key={m} style={{ marginTop: 22 }}>
                <h3 style={{ fontFamily: "var(--font-pixel)", fontSize: 12, letterSpacing: "0.14em", marginBottom: 10 }}>
                  {mech ? mech.name.toUpperCase() : m.toUpperCase()} · {list.length}
                </h3>
                <ul style={{ paddingLeft: 20 }}>
                  {list.map((p) => (
                    <li key={p.slug}>
                      <Link href={`/peptides/${p.slug}`} style={{ color: "var(--ink)" }}>{p.name}</Link>
                      {ENRICHMENT[p.slug]?.aliases?.[0] && (
                        <span style={{ opacity: 0.5 }}> · {ENRICHMENT[p.slug]?.aliases[0]}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}

          <h2>RELATED</h2>
          <ul style={{ paddingLeft: 20 }}>
            <li><Link href="/" style={{ color: "var(--ink)" }}>Homepage · List of Peptides and What They Do</Link></li>
            <li><Link href="/mechanisms" style={{ color: "var(--ink)" }}>Mechanism Categories</Link></li>
            <li><Link href="/conditions" style={{ color: "var(--ink)" }}>Research Conditions</Link></li>
            <li><Link href="/stacks" style={{ color: "var(--ink)" }}>Peptide Stack Chart</Link></li>
            <li><Link href="/vs" style={{ color: "var(--ink)" }}>Head-to-Head Comparisons</Link></li>
            <li><Link href="/calculator" style={{ color: "var(--ink)" }}>Peptide Reconstitution Calculator</Link></li>
            <li><Link href="/tools/half-life-chart" style={{ color: "var(--ink)" }}>Peptide Half-Life Chart</Link></li>
            <li><Link href="/how-do-peptides-work" style={{ color: "var(--ink)" }}>How Do Peptides Work</Link></li>
          </ul>
        </article>
      </div>

      <div className="disclaimer-band">© 2026 Peppu Studio LLC · For Laboratory Research Use Only</div>
    </main>
  );
}
