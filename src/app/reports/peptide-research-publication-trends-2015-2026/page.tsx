import type { Metadata } from "next";
import Link from "next/link";
import trends from "@/data/research-trends.json";
import PublicationTrendsChart from
  "@/components/PublicationTrendsChart";

export const metadata: Metadata = {
  title:
    "Peptide Research Publication Trends 2015-2026 · PEPPUDEX",
  description:
    "Annual PubMed publication counts for 17 research peptides across " +
    "the 2015-2025 window. Free dataset, CC BY 4.0, citation-friendly.",
  alternates: {
    canonical:
      "https://peppudex.com/reports/" +
      "peptide-research-publication-trends-2015-2026",
  },
};

interface Series {
  slug: string;
  name: string;
  counts: number[];
}

const REPORT_URL =
  "https://peppudex.com/reports/" +
  "peptide-research-publication-trends-2015-2026";

const PUBLISHED = "2026-05-19";

/**
 * Percent change from 2020 → 2025. Counts is the 11-year vector
 * starting at 2015, so index 5 = 2020 and the last entry = 2025.
 * If the 2020 cell is zero we report the absolute end count as a
 * "NEW" badge (avoids divide-by-zero noise).
 */
function growthPct(counts: number[]): number {
  if (counts.length < 6) return 0;
  const start = counts[5];
  const end = counts[counts.length - 1];
  if (start === 0) return end > 0 ? 9999 : 0;
  return Math.round(((end - start) / start) * 100);
}

export default function PublicationTrendsReport() {
  const series = trends.series as Series[];
  const years = trends.years as number[];
  const retrievalDate = trends._meta.lastRegenerated;

  const sortedByGrowth = [...series].sort(
    (a, b) => growthPct(b.counts) - growthPct(a.counts),
  );
  const top10 = sortedByGrowth.slice(0, 10);
  const totalPapers = series.reduce(
    (acc, s) => acc + s.counts.reduce((a, b) => a + b, 0),
    0,
  );

  const datasetSchema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "@id": `${REPORT_URL}#dataset`,
    "name": "Peptide Research Publication Trends 2015-2026",
    "description":
      "Annual PubMed publication counts for 17 research peptides " +
      "across the 2015-2025 window, fetched via the NCBI E-Utilities " +
      "esearch endpoint.",
    "url": REPORT_URL,
    "creator": {
      "@type": "Organization",
      "name": "Peppu Studio LLC",
      "url": "https://peppu.studio",
    },
    "publisher": {
      "@type": "Organization",
      "name": "Peppu Studio LLC",
      "url": "https://peppu.studio",
    },
    "license": "https://creativecommons.org/licenses/by/4.0/",
    "datePublished": PUBLISHED,
    "dateModified": retrievalDate,
    "temporalCoverage": "2015/2025",
    "isAccessibleForFree": true,
    "keywords": [
      "peptide research",
      "PubMed trends",
      "GHK-Cu",
      "BPC-157",
      "tirzepatide",
      "retatrutide",
      "NAD+",
      "bibliometrics",
    ],
    "variableMeasured": "Annual publication count per compound",
    "distribution": {
      "@type": "DataDownload",
      "encodingFormat": "application/json",
      "contentUrl": `${REPORT_URL}`,
    },
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${REPORT_URL}#article`,
    "headline":
      "Peptide Research Publication Trends 2015-2026",
    "description":
      "Bibliometric report tracking the volume of peer-reviewed " +
      "research on 17 widely-studied peptides across an 11-year " +
      "window.",
    "url": REPORT_URL,
    "datePublished": PUBLISHED,
    "dateModified": retrievalDate,
    "inLanguage": "en-US",
    "author": {
      "@type": "Organization",
      "name": "Editorial Board · Peppu Studio Research Desk",
      "url": "https://peppudex.com/reviewers/editorial-board",
    },
    "publisher": {
      "@type": "Organization",
      "name": "Peppu Studio LLC",
      "url": "https://peppu.studio",
      "logo": {
        "@type": "ImageObject",
        "url": "https://peppudex.com/icon.png",
      },
    },
    "mainEntityOfPage": REPORT_URL,
    "license": "https://creativecommons.org/licenses/by/4.0/",
    "isPartOf": { "@id": `${REPORT_URL}#dataset` },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "PEPPUDEX",
        "item": "https://peppudex.com",
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Reports",
        "item": "https://peppudex.com/reports",
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name":
          "Peptide Research Publication Trends 2015-2026",
        "item": REPORT_URL,
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
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(datasetSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

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
            REPORT
          </span>
        </div>

        <article className="detail">
          <h1>
            PEPTIDE RESEARCH PUBLICATION TRENDS 2015-2026
          </h1>
          <p className="body" style={{ marginTop: 12 }}>
            <strong>
              For Laboratory Research Use Only. Not for human
              consumption.
            </strong>{" "}
            This report is a bibliometric snapshot and does not
            constitute medical advice, a marketing claim, or any
            statement about the safety or efficacy of any compound.
          </p>
          <p className="body" style={{ marginTop: 12 }}>
            Annual PubMed publication counts for 17 research peptides
            across the 2015-2025 window. Free dataset under{" "}
            <a
              href="https://creativecommons.org/licenses/by/4.0/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--ink)" }}
            >
              CC BY 4.0
            </a>
            . Data retrieved {retrievalDate} via the NCBI E-Utilities
            esearch endpoint. Total papers tallied across all
            compounds and years: {totalPapers.toLocaleString()}.
          </p>

          <h2>WHAT THIS REPORT MEASURES</h2>
          <p className="body">
            Publication count is a coarse-but-useful proxy for
            scientific attention. When a peptide moves from a handful
            of mechanistic papers per year into the hundreds, that
            shift reflects three things at once: investigator
            interest, funding flow, and the saturation of preclinical
            questions that have to be answered before a compound can
            credibly enter (or stay inside) clinical pipelines. We
            track that shift across an 11-year window for 17
            compounds that span four functional clusters: incretin
            and metabolic peptides (retatrutide, tirzepatide), tissue
            repair and cytoprotection (BPC-157, TB-500, GHK-Cu),
            mitochondrial and longevity-adjacent compounds (NAD+,
            MOTS-c, SS-31), and growth-axis or nootropic peptides
            (tesamorelin, CJC-1295, selank, semax). The mix is meant
            to capture the working catalogue most research-grade
            suppliers and chemistry-focused readers actually
            encounter, not a regulatory or therapeutic ranking.
          </p>

          <h2>VISUAL: 11-YEAR TIME-SERIES</h2>
          <p className="body">
            Each line is one compound. The X-axis is calendar year of
            publication and the Y-axis is the count of PubMed records
            whose title or abstract matched any registered alias for
            that compound. Hover any point for the exact tally.
          </p>
          <PublicationTrendsChart years={years} series={series} />

          <h2>TOP 10 FASTEST-GROWING (5-YEAR % GROWTH)</h2>
          <p className="body">
            Sorted by percentage change in annual publication count
            from 2020 → 2025. Compounds with zero 2020 records and a
            non-zero 2025 count are flagged{" "}
            <code>NEW</code> because no meaningful denominator exists
            for percentage math.
          </p>
          <div style={{ overflowX: "auto", marginTop: 14 }}>
            <table
              style={{
                borderCollapse: "collapse",
                fontFamily: "var(--font-body)",
                fontSize: 18,
                width: "100%",
              }}
            >
              <thead>
                <tr
                  style={{
                    background: "var(--ink)",
                    color: "var(--paper)",
                  }}
                >
                  <th
                    style={{
                      padding: "8px 12px",
                      textAlign: "left",
                      fontFamily: "var(--font-pixel)",
                      fontSize: 10,
                      letterSpacing: "0.14em",
                    }}
                  >
                    RANK
                  </th>
                  <th
                    style={{
                      padding: "8px 12px",
                      textAlign: "left",
                      fontFamily: "var(--font-pixel)",
                      fontSize: 10,
                      letterSpacing: "0.14em",
                    }}
                  >
                    COMPOUND
                  </th>
                  <th
                    style={{
                      padding: "8px 12px",
                      textAlign: "right",
                      fontFamily: "var(--font-pixel)",
                      fontSize: 10,
                      letterSpacing: "0.14em",
                    }}
                  >
                    2020
                  </th>
                  <th
                    style={{
                      padding: "8px 12px",
                      textAlign: "right",
                      fontFamily: "var(--font-pixel)",
                      fontSize: 10,
                      letterSpacing: "0.14em",
                    }}
                  >
                    2025
                  </th>
                  <th
                    style={{
                      padding: "8px 12px",
                      textAlign: "right",
                      fontFamily: "var(--font-pixel)",
                      fontSize: 10,
                      letterSpacing: "0.14em",
                    }}
                  >
                    GROWTH
                  </th>
                </tr>
              </thead>
              <tbody>
                {top10.map((s, i) => {
                  const start = s.counts[5];
                  const end = s.counts[s.counts.length - 1];
                  const growth = growthPct(s.counts);
                  return (
                    <tr
                      key={s.slug}
                      style={{
                        borderBottom: "1px solid var(--ink)",
                      }}
                    >
                      <td style={{ padding: "8px 12px" }}>
                        {i + 1}
                      </td>
                      <td style={{ padding: "8px 12px" }}>
                        <Link
                          href={`/peptides/${s.slug}`}
                          style={{
                            color: "var(--ink)",
                            textDecoration: "underline",
                          }}
                        >
                          {s.name}
                        </Link>
                      </td>
                      <td
                        style={{
                          padding: "8px 12px",
                          textAlign: "right",
                        }}
                      >
                        {start}
                      </td>
                      <td
                        style={{
                          padding: "8px 12px",
                          textAlign: "right",
                        }}
                      >
                        {end}
                      </td>
                      <td
                        style={{
                          padding: "8px 12px",
                          textAlign: "right",
                          fontFamily: "var(--font-pixel)",
                          fontSize: 10,
                        }}
                      >
                        {growth >= 9999
                          ? "NEW"
                          : `+${growth}%`}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <h2>FULL TIME-SERIES TABLE · 17 COMPOUNDS × 11 YEARS</h2>
          <div style={{ overflowX: "auto", marginTop: 14 }}>
            <table
              style={{
                borderCollapse: "collapse",
                fontFamily: "var(--font-body)",
                fontSize: 16,
                minWidth: "100%",
              }}
            >
              <thead>
                <tr
                  style={{
                    background: "var(--ink)",
                    color: "var(--paper)",
                  }}
                >
                  <th
                    style={{
                      padding: "6px 10px",
                      textAlign: "left",
                      fontFamily: "var(--font-pixel)",
                      fontSize: 9,
                      letterSpacing: "0.14em",
                    }}
                  >
                    COMPOUND
                  </th>
                  {years.map((y) => (
                    <th
                      key={y}
                      style={{
                        padding: "6px 10px",
                        textAlign: "right",
                        fontFamily: "var(--font-pixel)",
                        fontSize: 9,
                      }}
                    >
                      {y}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {series.map((s) => (
                  <tr
                    key={s.slug}
                    style={{
                      borderBottom: "1px solid var(--ink)",
                    }}
                  >
                    <td style={{ padding: "6px 10px" }}>
                      <Link
                        href={`/peptides/${s.slug}`}
                        style={{
                          color: "var(--ink)",
                          textDecoration: "underline",
                        }}
                      >
                        {s.name}
                      </Link>
                    </td>
                    {s.counts.map((c, i) => (
                      <td
                        key={i}
                        style={{
                          padding: "6px 10px",
                          textAlign: "right",
                          opacity: c === 0 ? 0.3 : 1,
                        }}
                      >
                        {c}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2>NOTES ON THE PATTERN</h2>
          <p className="body">
            Three patterns are worth highlighting. First, the
            incretin class (tirzepatide, retatrutide) shows the
            steepest absolute and percentage gains. Tirzepatide moved
            from a handful of mechanism-of-action papers in the late
            2010s into the largest annual cohort of any peptide in
            the dataset by 2024-2025, driven by the SURPASS and
            SURMOUNT trial families and the volume of secondary
            analyses they generate. Retatrutide is the same shape one
            cycle behind: zero records before 2022, then a sharp
            ramp once the Phase 2 NEJM paper landed. Second, NAD+
            sits in a class of its own. It is not a peptide in the
            narrow sense, but it travels alongside this catalogue in
            the longevity literature, and the per-year counts
            (consistently in the hundreds, climbing into four digits)
            reflect its position as a high-volume substrate-biology
            topic rather than a single-drug story.
          </p>
          <p className="body">
            Third, the tissue-repair cluster (BPC-157, TB-500,
            GHK-Cu) grows steadily but at a much smaller absolute
            scale. These compounds attract sustained preclinical
            interest, particularly from gastric, tendon, and dermal
            research groups, but very little of that work has graduated
            into registered human trials. The contrast between the
            incretin curve (industrial trial pipeline) and the
            tissue-repair curve (academic preclinical work) is the
            cleanest illustration of how publication volume tracks
            funding shape, not therapeutic promise. The newer
            compounds (5-Amino-1MQ, MOTS-c, KLOW Blend, Wolverine
            Blend) sit on small bases with high percentage growth.
            Treat percentage figures on small denominators with
            caution: a jump from three papers to thirty looks
            dramatic but reflects a different research stage than the
            incretin curve.
          </p>

          <h2>METHODOLOGY</h2>
          <p className="body">
            PubMed E-Utilities esearch query template:{" "}
            <code
              style={{
                background: "var(--paper)",
                padding: "2px 6px",
                border: "2px solid var(--ink)",
                fontSize: 16,
              }}
            >
              (&lt;alias1&gt;[Title/Abstract] OR
              &lt;alias2&gt;[Title/Abstract]) AND &lt;year&gt;[Date -
              Publication]
            </code>
            . Aliases are joined with OR so a paper using any
            registered name for the compound is counted (for example
            BPC-157 OR PL14736 OR &ldquo;Body Protection Compound
            157&rdquo;).
          </p>
          <p className="body">
            <strong>Retrieval date:</strong> {retrievalDate}.<br />
            <strong>Endpoint:</strong>{" "}
            https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi
            <br />
            <strong>Inclusion criteria:</strong> any record indexed in
            PubMed whose title or abstract matches an alias for the
            compound, with a publication date inside the calendar
            year. Pre-prints from bioRxiv and medRxiv are excluded
            because PubMed does not index them. Errata, retractions,
            and conference abstracts indexed in PubMed are included
            because the API does not separate them cleanly from
            primary articles.
          </p>
          <p className="body">
            <strong>Limitations:</strong> PubMed indexing lags real
            publication by several weeks for some journals; the 2025
            count will undercount slightly until early 2026. Compound
            aliases that overlap with unrelated chemistry (notably
            very short codes) may include false positives; the
            alias list is hand-curated to minimize this. Total counts
            are sensitive to alias-set choices; the alias set used
            for this regeneration is recorded in the regeneration
            script in the source repository.
          </p>
          <p className="body">
            <strong>Update cadence:</strong> quarterly. The
            regeneration script lives at{" "}
            <code
              style={{
                background: "var(--paper)",
                padding: "2px 6px",
                border: "2px solid var(--ink)",
                fontSize: 16,
              }}
            >
              scripts/refresh-research-trends.mjs
            </code>{" "}
            and writes the canonical JSON consumed by this page.
          </p>

          <h2>CITE THIS REPORT</h2>
          <p
            className="body"
            style={{
              fontFamily: "monospace",
              fontSize: 16,
              background: "var(--paper)",
              border: "2px solid var(--ink)",
              padding: "10px 14px",
            }}
          >
            Cite this report: Peppu Studio LLC. Peptide Research
            Publication Trends 2015-2026. Retrieved {retrievalDate}{" "}
            from peppudex.com/reports/peptide-research-publication-
            trends-2015-2026
          </p>

          <h2>RELATED</h2>
          <ul>
            <li>
              <Link
                href="/reports/regulatory-status-matrix"
                style={{ color: "var(--ink)" }}
              >
                Regulatory Status Matrix · 17 Peptides × 10 Countries
              </Link>
            </li>
            <li>
              <Link href="/" style={{ color: "var(--ink)" }}>
                PEPPUDEX home · the full 17-peptide index
              </Link>
            </li>
          </ul>
        </article>

        <footer className="footer">
          PEPPUDEX · <Link href="/">INDEX</Link>
        </footer>
      </div>
      <div className="disclaimer-band">
        © 2026 Peppu Studio LLC · For Laboratory Research Use Only
      </div>
    </main>
  );
}
