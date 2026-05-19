import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PEPPUDEX } from "@/data/peppudex";
import { ENRICHMENT } from "@/data/enrichment";
import { MECHANISMS_BY_SLUG } from "@/data/mechanisms";

/**
 * Tier-3 subtopic: per-compound mechanism deep-dive.
 * Dynamic route emits one static page per compound that has
 * an ENRICHMENT entry. Joined to /[slug] parent compound page.
 *
 * Mechanistic language only. NO dose recommendations on this page.
 */

const BASE = "https://peppudex.com";

export function generateStaticParams() {
  return PEPPUDEX.filter((p) => ENRICHMENT[p.slug]).map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params;
  const entry = PEPPUDEX.find((p) => p.slug === slug);
  const enr = ENRICHMENT[slug];
  if (!entry || !enr) return {};
  const title =
    `${entry.name} Mechanism · Receptor Binding, Signaling, ` +
    `Half-life · PEPPUDEX`;
  const description = (
    `Mechanism of action for ${entry.name}: ${entry.mechanism}`
  ).slice(0, 160);
  return {
    title,
    description,
    alternates: { canonical: `${BASE}/peptides/${slug}/mechanism` },
    openGraph: {
      title: `${entry.name} Mechanism · PEPPUDEX`,
      description,
      type: "article",
      url: `${BASE}/peptides/${slug}/mechanism`,
      images: entry.card ? [entry.card] : [],
    },
  };
}

export default async function MechanismPage(
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const entry = PEPPUDEX.find((p) => p.slug === slug);
  if (!entry) notFound();
  const enr = ENRICHMENT[slug];
  if (!enr) notFound();

  const categories = (enr.mechanisms ?? [])
    .map((m) => MECHANISMS_BY_SLUG[m])
    .filter(Boolean);

  const mechanismFaqs = enr.faqs.filter((f) =>
    /mechanism|receptor|binding|signal|half-?life|pharmacokinetic/i
      .test(f.q + " " + f.a),
  );

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "PEPPUDEX",
        "item": BASE,
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Peptides",
        "item": `${BASE}/peptides`,
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": entry.name,
        "item": `${BASE}/peptides/${slug}`,
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "Mechanism",
        "item": `${BASE}/peptides/${slug}/mechanism`,
      },
    ],
  };

  return (
    <main>
      <div className="header-strip">
        FOR LABORATORY RESEARCH USE ONLY · NOT FOR HUMAN CONSUMPTION
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <div className="page">
        <div className="brandbar">
          <Link
            href={`/peptides/${slug}`}
            style={{
              background: "var(--ink)",
              color: "var(--paper)",
              fontFamily: "var(--font-pixel)",
              fontSize: 10,
              padding: "10px 14px",
              textDecoration: "none",
              boxShadow: "3px 3px 0 rgba(0,0,0,0.35)",
              letterSpacing: "0.14em",
            }}
          >
            ◀ {entry.name.toUpperCase()}
          </Link>
          <span
            style={{
              fontFamily: "var(--font-pixel)",
              fontSize: 14,
              color: "var(--paper)",
              letterSpacing: "0.04em",
              textShadow: "3px 3px 0 var(--ink)",
            }}
          >
            PEPPU<span style={{ color: "#FFE680" }}>DEX</span>
          </span>
        </div>

        <article className="detail">
          <p
            style={{
              fontFamily: "var(--font-pixel)",
              fontSize: 9,
              letterSpacing: "0.18em",
              opacity: 0.7,
            }}
          >
            ▶ {entry.name.toUpperCase()} · SUBTOPIC · MECHANISM
          </p>
          <h1>{entry.name} Mechanism</h1>
          <p
            className="body"
            style={{
              marginTop: 12,
              padding: "10px 12px",
              border: "2px dashed var(--ink)",
              background: "var(--paper)",
            }}
          >
            For Laboratory Research Use Only. The mechanistic information
            below is descriptive of published research. No human dose is
            recommended. No clinical claim is made.
          </p>

          <h2>MECHANISM OF ACTION</h2>
          <p className="body">{entry.mechanism}</p>

          {enr.halfLife && (
            <>
              <h2>PHARMACOKINETIC HALF-LIFE</h2>
              <p className="body">
                Reported half-life for {entry.name}: {enr.halfLife}. Half-life
                determines the kinetic window across which receptor occupancy
                is maintained and frames the dosing rhythm used in published
                literature.
              </p>
            </>
          )}

          {enr.sequence && (
            <>
              <h2>PRIMARY SEQUENCE</h2>
              <p className="body">
                {entry.name} is a defined sequence: {enr.sequence}. Synthesis
                proceeds via solid-phase peptide synthesis with HPLC-verified
                identity confirmation.
              </p>
            </>
          )}

          {categories.length > 0 && (
            <>
              <h2>MECHANISM CATEGORIES</h2>
              <p className="body" style={{ marginBottom: 14 }}>
                {entry.name} is tagged in {categories.length} mechanism
                {categories.length === 1 ? " category" : " categories"} on
                PEPPUDEX. Each category aggregates the broader pharmacology
                of related compounds.
              </p>
              {categories.map((c) => (
                <div key={c.slug} className="move" style={{ marginBottom: 10 }}>
                  <div className="row">
                    <span>
                      ▶ <Link
                        href={`/mechanisms/${c.slug}`}
                        style={{ color: "var(--ink)" }}
                      >
                        {c.name.toUpperCase()}
                      </Link>
                    </span>
                  </div>
                  <p className="desc">{c.longDescription}</p>
                </div>
              ))}
            </>
          )}

          {enr.outcomes && enr.outcomes.length > 0 && (
            <>
              <h2>MECHANISTIC OUTCOMES IN LITERATURE</h2>
              <p className="body" style={{ marginBottom: 14 }}>
                The following outcomes are the mechanistic endpoints reported
                in the peer-reviewed literature, with PEPPUDEX evidence
                grades. Grades reflect study quality and replication, not
                clinical recommendation.
              </p>
              <div style={{ display: "grid", gap: 10 }}>
                {enr.outcomes.map((o) => (
                  <div key={o.name} className="move">
                    <div className="row">
                      <span>▶ {o.name}</span>
                      <span
                        style={{
                          background: "var(--ink)",
                          color: "var(--paper)",
                          padding: "4px 10px",
                          border: "2px solid var(--ink)",
                          fontFamily: "var(--font-pixel)",
                          fontSize: 12,
                        }}
                      >
                        GRADE {o.grade}
                      </span>
                    </div>
                    <p className="desc">{o.rationale}</p>
                  </div>
                ))}
              </div>
            </>
          )}

          {mechanismFaqs.length > 0 && (
            <>
              <h2>MECHANISM Q+A</h2>
              <div style={{ display: "grid", gap: 14 }}>
                {mechanismFaqs.map((f, i) => (
                  <details key={i} className="move" style={{ cursor: "pointer" }}>
                    <summary
                      style={{
                        fontFamily: "var(--font-pixel)",
                        fontSize: 11,
                        listStyle: "none",
                        cursor: "pointer",
                        padding: 0,
                      }}
                    >
                      ▶ {f.q}
                    </summary>
                    <p className="desc" style={{ marginTop: 8 }}>{f.a}</p>
                  </details>
                ))}
              </div>
            </>
          )}

          {enr.citations && enr.citations.length > 0 && (
            <>
              <h2>CITED LITERATURE</h2>
              <ul>
                {enr.citations.map((c, i) => (
                  <li key={i}>
                    {c.authors}. <em>{c.title}</em>. {c.journal} {c.year}.
                    {c.pmid ? ` PMID ${c.pmid}.` : ""}
                    {c.nct ? ` ${c.nct}.` : ""}{" "}
                    <a href={c.url} target="_blank" rel="noopener noreferrer">
                      link
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}

          <h2>RELATED PAGES</h2>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link
              href={`/peptides/${slug}`}
              className="back"
              style={{
                fontFamily: "var(--font-pixel)",
                fontSize: 10,
                padding: "10px 14px",
                color: "var(--paper)",
                textDecoration: "none",
                background: "var(--ink)",
              }}
            >
              ◀ {entry.name.toUpperCase()} OVERVIEW
            </Link>
            <Link
              href={`/peptides/${slug}/dosing`}
              className="back"
              style={{
                fontFamily: "var(--font-pixel)",
                fontSize: 10,
                padding: "10px 14px",
                color: "var(--paper)",
                textDecoration: "none",
                background: "var(--ink)",
              }}
            >
              DOSING LITERATURE ▶
            </Link>
            <Link
              href={`/peptides/${slug}/safety`}
              className="back"
              style={{
                fontFamily: "var(--font-pixel)",
                fontSize: 10,
                padding: "10px 14px",
                color: "var(--paper)",
                textDecoration: "none",
                background: "var(--ink)",
              }}
            >
              SAFETY PROFILE ▶
            </Link>
          </div>

          {enr.lastUpdated && (
            <p
              style={{
                fontFamily: "var(--font-pixel)",
                fontSize: 8,
                marginTop: 28,
                opacity: 0.55,
                letterSpacing: "0.16em",
              }}
            >
              ▶ LAST UPDATED · {enr.lastUpdated}
            </p>
          )}
        </article>

        <footer className="footer">
          PEPPUDEX · {entry.name} · Mechanism subtopic
          <br />
          <a href="https://peppu.studio">PEPPU STUDIO</a> ·{" "}
          <a href="https://pepputree.com">PEPPUTREE</a> ·{" "}
          <a href="https://wiki.peppu.studio">WIKI</a>
        </footer>
      </div>

      <div className="disclaimer-band">
        © 2026 Peppu Studio LLC · For Laboratory Research Use Only
      </div>
    </main>
  );
}
