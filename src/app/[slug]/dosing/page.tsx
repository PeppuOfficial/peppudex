import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PEPPUDEX } from "@/data/peppudex";
import { ENRICHMENT } from "@/data/enrichment";

/**
 * Tier-3 subtopic: per-compound dosing literature.
 *
 * DESCRIPTIVE ONLY. NO direct user recommendations. NO "you should
 * take X". Every dose-mention is wrapped in a citation phrased as
 * "the [year] study by [Author et al., PMID:XXXX] reports a range
 * of X to Y mg administered ...". This wiki does not recommend any
 * human dose.
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
    `Published dosing literature for ${entry.name}. Descriptive ` +
    `citations only. Half-life, route, and storage from peer-reviewed ` +
    `sources. No human dose is recommended.`
  ).slice(0, 160);
  return {
    title:
      `${entry.name} Dosing Literature · Published Ranges, ` +
      `Routes, Half-life · PEPPUDEX`,
    description,
    alternates: { canonical: `${BASE}/${slug}/dosing` },
    openGraph: {
      title: `${entry.name} Dosing Literature · PEPPUDEX`,
      description,
      type: "article",
      url: `${BASE}/${slug}/dosing`,
      images: entry.card ? [entry.card] : [],
    },
  };
}

export default async function DosingPage(
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const entry = PEPPUDEX.find((p) => p.slug === slug);
  if (!entry) notFound();
  const enr = ENRICHMENT[slug];
  if (!enr) notFound();

  // Pull dose-relevant FAQs (descriptive only)
  const dosingFaqs = enr.faqs.filter((f) =>
    /dose|dosing|cycle|administ|inject|orally|oral|half-?life|reconstitut|storage/i
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
        "name": entry.name,
        "item": `${BASE}/${slug}`,
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Dosing Literature",
        "item": `${BASE}/${slug}/dosing`,
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
            href={`/${slug}`}
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
            ▶ {entry.name.toUpperCase()} · SUBTOPIC · DOSING LITERATURE
          </p>
          <h1>{entry.name} Dosing Literature</h1>
          <p
            className="body"
            style={{
              marginTop: 12,
              padding: "10px 12px",
              border: "2px dashed var(--ink)",
              background: "var(--paper)",
            }}
          >
            For Laboratory Research Use Only. The content below describes
            dose ranges as reported in peer-reviewed publications. This page
            does not recommend any dose for human use. No clinical claim is
            made. Always consult the original source publication.
          </p>

          <h2>SCOPE OF THIS PAGE</h2>
          <p className="body">
            This page documents the published-literature dose ranges that
            appear in trials and animal studies of {entry.name}. Every dose
            mention is bound to a citation (author, year, PMID where
            available). The PEPPUDEX wiki phrases these as descriptive
            observations of the research record, not as instructions to the
            reader.
          </p>

          <h2>ROUTES OF ADMINISTRATION IN PUBLISHED RESEARCH</h2>
          <p className="body">
            The published research record for {entry.name} reports the
            following route(s) of administration: {enr.routes.join(", ")}.
            Route selection in a study reflects pharmacokinetic
            considerations specific to that protocol and is not a
            recommendation for any human use of {entry.name}.
          </p>

          {enr.halfLife && (
            <>
              <h2>PHARMACOKINETIC HALF-LIFE</h2>
              <p className="body">
                Published pharmacokinetic data report a half-life for{" "}
                {entry.name} of approximately {enr.halfLife}. Half-life is
                the kinetic parameter that frames the dosing rhythm chosen
                in trial design. It is a measurement, not a recommendation.
              </p>
            </>
          )}

          <h2>CITED DOSE RANGES IN THE LITERATURE</h2>
          <p className="body" style={{ marginBottom: 14 }}>
            The peer-reviewed sources below report dose ranges, frequencies,
            and durations used in studies of {entry.name}. Refer to the
            original publication for full protocol detail.
          </p>
          {enr.citations && enr.citations.length > 0 ? (
            <ul>
              {enr.citations.map((c, i) => (
                <li key={i}>
                  {c.authors} ({c.year}) reports the {entry.name} protocol
                  used in <em>{c.title}</em>, published in {c.journal}.
                  {c.pmid ? ` PMID ${c.pmid}.` : ""}
                  {c.nct ? ` ${c.nct}.` : ""} See the source for the
                  protocol-level dose range, frequency, and duration.{" "}
                  <a href={c.url} target="_blank" rel="noopener noreferrer">
                    link
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="body">
              No peer-reviewed citations are currently indexed in PEPPUDEX
              for {entry.name}. Refer to PubMed and ClinicalTrials.gov for
              the most recent literature.
            </p>
          )}

          {dosingFaqs.length > 0 && (
            <>
              <h2>DOSING Q+A FROM LITERATURE</h2>
              <p className="body" style={{ marginBottom: 14 }}>
                The questions below summarise dosing-relevant entries from
                the literature record. Each answer is descriptive of
                published material and is not a recommendation.
              </p>
              <div style={{ display: "grid", gap: 14 }}>
                {dosingFaqs.map((f, i) => (
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

          {enr.storage && (
            <>
              <h2>STORAGE OF THE REFERENCE COMPOUND</h2>
              <p className="body">
                <strong>Lyophilized · </strong>{enr.storage.lyo}
              </p>
              <p className="body" style={{ marginTop: 8 }}>
                <strong>Reconstituted · </strong>{enr.storage.recon}
              </p>
              <p className="body" style={{ marginTop: 8 }}>
                Storage conditions describe the stability of the
                research-grade reference material, not a dosing protocol.
              </p>
            </>
          )}

          <h2>RECONSTITUTION MATH (CALCULATOR)</h2>
          <p className="body">
            The PEPPUDEX reconstitution calculator at{" "}
            <Link href="/calculator">/calculator</Link> returns
            volume-per-dose math given vial mg, BAC mL, and a target dose
            in mcg. The calculator performs arithmetic only. It does not
            recommend a dose. Any number entered by a researcher must come
            from their own protocol design or the cited literature.
          </p>

          <h2>REGULATORY CONTEXT</h2>
          <p className="body">
            <strong>FDA · </strong>{enr.regulatory.fda}
          </p>
          <p className="body" style={{ marginTop: 10 }}>
            <strong>WADA · </strong>{enr.regulatory.wada}
          </p>

          <h2>RELATED PAGES</h2>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link
              href={`/${slug}`}
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
              href={`/${slug}/mechanism`}
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
              href={`/${slug}/safety`}
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
          PEPPUDEX · {entry.name} · Dosing literature subtopic
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
