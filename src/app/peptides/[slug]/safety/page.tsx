import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PEPPUDEX } from "@/data/peppudex";
import { ENRICHMENT } from "@/data/enrichment";

/**
 * Tier-3 subtopic: per-compound safety profile.
 *
 * Aggregates observed adverse events, drug interactions, and
 * contraindications from the published literature, plus WADA and
 * FDA regulatory status. Descriptive only. Not medical advice.
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
  const description = (
    `Safety profile for ${entry.name}: observed adverse events, ` +
    `interactions, contraindications, FDA and WADA status from ` +
    `peer-reviewed literature.`
  ).slice(0, 160);
  return {
    title:
      `${entry.name} Safety Profile · Adverse Events, ` +
      `Interactions, Regulatory Status · PEPPUDEX`,
    description,
    alternates: { canonical: `${BASE}/peptides/${slug}/safety` },
    openGraph: {
      title: `${entry.name} Safety Profile · PEPPUDEX`,
      description,
      type: "article",
      url: `${BASE}/peptides/${slug}/safety`,
      images: entry.card ? [entry.card] : [],
    },
  };
}

export default async function SafetyPage(
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const entry = PEPPUDEX.find((p) => p.slug === slug);
  if (!entry) notFound();
  const enr = ENRICHMENT[slug];
  if (!enr) notFound();

  const safetyFaqs = enr.faqs.filter((f) =>
    /side effect|adverse|safety|contraindic|interact|pregnan|wada|fda|legal|prohibit|banned/i
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
        "name": "Safety",
        "item": `${BASE}/peptides/${slug}/safety`,
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
            ▶ {entry.name.toUpperCase()} · SUBTOPIC · SAFETY PROFILE
          </p>
          <h1>{entry.name} Safety Profile</h1>
          <p
            className="body"
            style={{
              marginTop: 12,
              padding: "10px 12px",
              border: "2px dashed var(--ink)",
              background: "var(--paper)",
            }}
          >
            For Laboratory Research Use Only. This page summarises observed
            adverse events and regulatory status reported in the peer-
            reviewed literature. It is not medical advice and does not
            recommend any human use of {entry.name}.
          </p>

          <h2>OBSERVED ADVERSE EVENTS IN LITERATURE</h2>
          {enr.safety.sideEffects.length > 0 ? (
            <>
              <p className="body" style={{ marginBottom: 14 }}>
                The following adverse events have been observed in trials
                or animal studies of {entry.name}. Severity, frequency, and
                attribution depend on the source publication.
              </p>
              <ul>
                {enr.safety.sideEffects.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </>
          ) : (
            <p className="body">
              The PEPPUDEX literature scan reports no characterised adverse
              events for {entry.name}. Absence of recorded events does not
              imply safety; data may be sparse.
            </p>
          )}

          <h2>DRUG INTERACTIONS</h2>
          {enr.safety.interactions.length > 0 ? (
            <>
              <p className="body" style={{ marginBottom: 14 }}>
                The following interactions are reported in or theorised from
                the published mechanism for {entry.name}.
              </p>
              <ul>
                {enr.safety.interactions.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </>
          ) : (
            <p className="body">
              No characterised drug interactions are indexed in PEPPUDEX
              for {entry.name}. This reflects gaps in the literature, not
              an absence of risk.
            </p>
          )}

          <h2>CONTRAINDICATIONS REPORTED IN LITERATURE</h2>
          {enr.safety.contraindications.length > 0 ? (
            <>
              <p className="body" style={{ marginBottom: 14 }}>
                Contraindications recorded for {entry.name} in the
                published record:
              </p>
              <ul>
                {enr.safety.contraindications.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </>
          ) : (
            <p className="body">
              No formal contraindications are indexed in PEPPUDEX for{" "}
              {entry.name}.
            </p>
          )}

          <h2>FDA REGULATORY STATUS</h2>
          <p className="body">{enr.regulatory.fda}</p>

          <h2>WADA REGULATORY STATUS</h2>
          <p className="body">{enr.regulatory.wada}</p>
          {(enr.regulatory.cn || enr.regulatory.ru || enr.regulatory.au || enr.regulatory.international) && (
            <>
              <h2>OTHER JURISDICTIONS</h2>
              {enr.regulatory.cn && (
                <p className="body">
                  <strong>China · </strong>{enr.regulatory.cn}
                </p>
              )}
              {enr.regulatory.ru && (
                <p className="body" style={{ marginTop: 8 }}>
                  <strong>Russia · </strong>{enr.regulatory.ru}
                </p>
              )}
              {enr.regulatory.au && (
                <p className="body" style={{ marginTop: 8 }}>
                  <strong>Australia · </strong>{enr.regulatory.au}
                </p>
              )}
              {enr.regulatory.international && (
                <p className="body" style={{ marginTop: 8 }}>
                  <strong>International · </strong>
                  {enr.regulatory.international}
                </p>
              )}
            </>
          )}

          {safetyFaqs.length > 0 && (
            <>
              <h2>SAFETY Q+A FROM LITERATURE</h2>
              <div style={{ display: "grid", gap: 14 }}>
                {safetyFaqs.map((f, i) => (
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
              <p className="body" style={{ marginBottom: 14 }}>
                The safety statements above are drawn from the following
                peer-reviewed sources. Refer to the originals for adverse-
                event tables, attribution, and full context.
              </p>
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
              href={`/peptides/${slug}/mechanism`}
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
              MECHANISM ▶
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
          PEPPUDEX · {entry.name} · Safety profile subtopic
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
