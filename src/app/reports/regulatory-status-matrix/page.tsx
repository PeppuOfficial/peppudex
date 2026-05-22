import type { Metadata } from "next";
import Link from "next/link";
import matrix from "@/data/regulatory-matrix.json";

export const metadata: Metadata = {
  title:
    "Regulatory Status Matrix · 17 Peptides × 10 Countries · PEPPUDEX",
  description:
    "Per-country regulatory status (RUO / OTC / Rx / Scheduled / " +
    "Banned) for 17 research peptides across US, EU, UK, AU, CA, JP, " +
    "KR, BR, IN, AE. Free dataset, CC BY 4.0, citation-friendly.",
  alternates: {
    canonical:
      "https://peppudex.com/reports/regulatory-status-matrix",
  },
};

interface Cell {
  status: string;
  sourceUrl: string | null;
}

interface CompoundRow {
  slug: string;
  name: string;
  cells: Record<string, Cell>;
}

const REPORT_URL =
  "https://peppudex.com/reports/regulatory-status-matrix";

const PUBLISHED = "2026-05-19";

const STATUS_COLORS: Record<string, string> = {
  RUO: "#9CCC65",
  OTC: "#4FC3F7",
  Rx: "#FFB74D",
  Scheduled: "#F06292",
  Banned: "#EF5350",
  Unknown: "#BDBDBD",
};

function statusColor(s: string): string {
  if (STATUS_COLORS[s]) return STATUS_COLORS[s];
  return STATUS_COLORS.Unknown;
}

export default function RegulatoryMatrixReport() {
  const compounds = matrix.compounds as CompoundRow[];
  const jurisdictions = matrix.jurisdictions as string[];
  const retrievalDate = matrix._meta.lastRegenerated;

  const datasetSchema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "@id": `${REPORT_URL}#dataset`,
    "name": "Peptide Regulatory Status Matrix · 17 × 10",
    "description":
      "Per-country regulatory status (RUO / OTC / Rx / Scheduled / " +
      "Banned) for 17 research peptides across 10 jurisdictions, " +
      "sourced from national regulatory authority websites.",
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
    "isAccessibleForFree": true,
    "spatialCoverage": [
      "United States",
      "European Union",
      "United Kingdom",
      "Australia",
      "Canada",
      "Japan",
      "South Korea",
      "Brazil",
      "India",
      "United Arab Emirates",
    ],
    "keywords": [
      "peptide regulation",
      "FDA",
      "EMA",
      "MHRA",
      "TGA",
      "Health Canada",
      "PMDA",
      "MFDS",
      "ANVISA",
      "CDSCO",
      "WADA",
    ],
    "variableMeasured": [
      "Compound",
      "Jurisdiction",
      "Regulatory status",
      "Primary source URL",
    ],
    "distribution": [
      {
        "@type": "DataDownload",
        "encodingFormat": "text/html",
        "contentUrl": REPORT_URL,
      },
    ],
    "includedInDataCatalog": {
      "@type": "DataCatalog",
      "name": "PEPPUDEX Regulatory Reports",
      "url": "https://peppudex.com/reports",
    },
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${REPORT_URL}#article`,
    "headline":
      "Regulatory Status Matrix · 17 Peptides × 10 Countries",
    "description":
      "Cross-jurisdictional regulatory snapshot of 17 widely-studied " +
      "research peptides as of 2026-05-19.",
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
        "name": "Regulatory Status Matrix",
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
            REGULATORY STATUS MATRIX · 17 PEPTIDES × 10 COUNTRIES
          </h1>
          <p className="body" style={{ marginTop: 12 }}>
            <strong>
              For Laboratory Research Use Only. Not for human
              consumption.
            </strong>{" "}
            This is informational only and does not constitute legal,
            medical, or regulatory advice. Status changes. Verify
            against the linked source before relying on any cell in
            this table.
          </p>
          <p className="body" style={{ marginTop: 12 }}>
            Cross-jurisdictional regulatory status as of{" "}
            {retrievalDate}. Free dataset under{" "}
            <a
              href="https://creativecommons.org/licenses/by/4.0/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--ink)" }}
            >
              CC BY 4.0
            </a>
            . Each cell links to the primary government or
            international authority source that documents the status
            (where one was located). Cells marked{" "}
            <strong>Unknown</strong> were not assignable from a
            primary public source at the date of regeneration.
          </p>

          <h2>HOW TO READ THIS TABLE</h2>
          <p className="body">
            Each row is one compound. Each column is one of the 10
            jurisdictions in scope: the United States, European Union
            (treated as a single regulatory bloc), United Kingdom,
            Australia, Canada, Japan, South Korea, Brazil, India, and
            the United Arab Emirates. Cell values use the following
            five-category scheme.
          </p>
          <ul style={{ marginTop: 10 }}>
            <li>
              <strong>RUO</strong>: research use only. The compound
              is sold as a chemical reference material for in-vitro
              laboratory work. It is not approved for human use and
              is not legally compounded or prescribed.
            </li>
            <li>
              <strong>OTC</strong>: over-the-counter. The compound is
              sold without prescription as a cosmetic ingredient or
              dietary supplement, subject to the jurisdiction's
              labeling and quality rules for that category.
            </li>
            <li>
              <strong>Rx</strong>: prescription required. The
              compound is approved as a finished pharmaceutical
              product and dispensed under the jurisdiction's
              prescription-medicine framework.
            </li>
            <li>
              <strong>Scheduled</strong>: scheduled, controlled, or
              otherwise restricted under the jurisdiction's
              controlled-substances or poisons regime.
            </li>
            <li>
              <strong>Banned</strong>: banned, restricted, or
              prohibited from sale. This category also captures
              substances on the WADA Prohibited List where the WADA
              listing is the most enforceable real-world constraint
              on the compound's circulation in the jurisdiction.
            </li>
          </ul>

          <h2>LEGEND</h2>
          <div
            style={{
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
              marginTop: 14,
            }}
          >
            {[
              ["RUO", "Research Use Only"],
              ["OTC", "Over-the-counter / cosmetic / supplement"],
              ["Rx", "Prescription required"],
              ["Scheduled", "Scheduled / controlled"],
              ["Banned", "Banned, restricted, WADA-prohibited"],
              ["Unknown", "No primary source located"],
            ].map(([code, label]) => (
              <span
                key={code}
                style={{
                  background: statusColor(code),
                  color: "white",
                  padding: "6px 12px",
                  fontFamily: "var(--font-pixel)",
                  fontSize: 9,
                  letterSpacing: "0.12em",
                  border: "2px solid var(--ink)",
                }}
              >
                {code} · {label}
              </span>
            ))}
          </div>

          <h2>MATRIX</h2>
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
                  {jurisdictions.map((j) => (
                    <th
                      key={j}
                      style={{
                        padding: "6px 10px",
                        textAlign: "center",
                        fontFamily: "var(--font-pixel)",
                        fontSize: 9,
                        letterSpacing: "0.14em",
                      }}
                    >
                      {j}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {compounds.map((c) => (
                  <tr
                    key={c.slug}
                    style={{
                      borderBottom: "1px solid var(--ink)",
                    }}
                  >
                    <td style={{ padding: "6px 10px" }}>
                      <Link
                        href={`/peptides/${c.slug}`}
                        style={{
                          color: "var(--ink)",
                          textDecoration: "underline",
                        }}
                      >
                        {c.name}
                      </Link>
                    </td>
                    {jurisdictions.map((j) => {
                      const cell = c.cells[j] ?? {
                        status: "Unknown",
                        sourceUrl: null,
                      };
                      const pill = (
                        <span
                          style={{
                            background: statusColor(cell.status),
                            color: "white",
                            padding: "3px 6px",
                            fontFamily: "var(--font-pixel)",
                            fontSize: 8,
                            letterSpacing: "0.08em",
                            border: "1px solid var(--ink)",
                            display: "inline-block",
                          }}
                        >
                          {cell.status}
                        </span>
                      );
                      return (
                        <td
                          key={j}
                          style={{
                            padding: "6px 10px",
                            textAlign: "center",
                          }}
                        >
                          {cell.sourceUrl ? (
                            <a
                              href={cell.sourceUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              title={`Source · ${j} · ${cell.status}`}
                              style={{ textDecoration: "none" }}
                            >
                              {pill}
                            </a>
                          ) : (
                            pill
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2>WHAT THE MATRIX SHOWS</h2>
          <p className="body">
            Three structural patterns repeat across the table. First,
            the two incretin compounds that have completed full
            regulatory review (tirzepatide, tesamorelin) sit in the
            <strong> Rx </strong>
            column almost uniformly across the developed jurisdictions
            in scope. They are marketed under conventional pharmacy
            channels and behave as ordinary prescription medicines.
            Retatrutide, still under Phase 3 evaluation as of this
            report's regeneration date, is uniformly <strong>RUO</strong>{" "}
            and will move into the Rx column country-by-country as
            its trial program reads out and dossiers are filed.
          </p>
          <p className="body">
            Second, Australia's Therapeutic Goods Administration is
            the most aggressive small-peptide regulator in this
            sample. The TGA's Schedule 10 capture of BPC-157, TB-500,
            and several other research peptides (with Selank and
            Semax also restricted) produces the most <strong>Banned</strong>{" "}
            cells in any single jurisdiction column. Australia's
            position is an outlier rather than a precedent: most
            other developed jurisdictions treat these compounds as
            chemical reference material rather than scheduling them
            directly. Even so, the Australian listing has practical
            implications because international shipping carriers
            mirror national-list controls in their dangerous-goods
            screens.
          </p>
          <p className="body">
            Third, IGF-1 LR3 sits in the <strong>Banned</strong>{" "}
            column across almost every jurisdiction because the
            World Anti-Doping Agency Prohibited List captures it as a
            growth-factor analog under section S2. Where pharmacy law
            does not directly schedule the molecule, the WADA listing
            still functions as the binding constraint for any
            human-use channel that intersects sport, fitness, or
            licensed-athlete oversight.
          </p>
          <p className="body">
            Cells marked <strong>Unknown</strong> reflect gaps in
            primary-source coverage rather than a positive claim of
            unscheduled status. Several jurisdictions (notably Japan,
            South Korea, Brazil, India, and the UAE) publish
            authoritative drug-approval and controlled-substances
            registers but do not consistently index the smaller
            research peptides on this list in English-language form.
            We mark these cells Unknown rather than guessing.
          </p>

          <h2>METHODOLOGY</h2>
          <p className="body">
            Each cell was assigned by consulting the national or
            international regulatory authority website linked from
            that cell (or, where no specific page was located, from
            the authority's home page listed in the source-authority
            table below). The five-category scheme is a coarse
            classification chosen for cross-jurisdiction
            comparability; individual cells frequently carry more
            nuance than the pill captures (for example, an Rx
            classification may apply only to a specific indication or
            formulation; an OTC classification may apply only to a
            specific concentration range). When in doubt the more
            restrictive category was preferred.
          </p>
          <p className="body">
            <strong>Retrieval date:</strong> {retrievalDate}.<br />
            <strong>Update cadence:</strong>{" "}
            {matrix._meta.updateCadence}
          </p>
          <p className="body">
            <strong>WADA cross-listing:</strong> the World
            Anti-Doping Agency Prohibited List applies independently
            of national pharmacy law. Where a compound is captured
            under WADA but not directly scheduled by the national
            authority, we record the cell as <strong>Banned</strong>{" "}
            with the WADA list as the source. The WADA list is{" "}
            <a
              href="https://www.wada-ama.org/en/prohibited-list"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--ink)" }}
            >
              available here
            </a>{" "}
            and is reviewed annually.
          </p>
          <p className="body">
            <strong>Australia / TGA Schedule 10:</strong> Australia's
            Schedule 10 captures substances{" "}
            <em>
              &ldquo;of such danger to health as to warrant
              prohibition of sale, supply and use&rdquo;
            </em>
            . Schedule 10 entries cited in this matrix are read
            against the current Poisons Standard (SUSMP), linked from
            the cells where it applies.
          </p>

          <h2>SOURCE AUTHORITIES</h2>
          <ul style={{ marginTop: 10 }}>
            {Object.entries(matrix._meta.primarySources).map(
              ([k, v]) => (
                <li key={k}>
                  <strong>{k}</strong> ·{" "}
                  <a
                    href={v as string}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "var(--ink)" }}
                  >
                    {v as string}
                  </a>
                </li>
              ),
            )}
            <li>
              <strong>WADA</strong> ·{" "}
              <a
                href="https://www.wada-ama.org/en/prohibited-list"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--ink)" }}
              >
                https://www.wada-ama.org/en/prohibited-list
              </a>
            </li>
          </ul>

          <h2>DISCLAIMERS</h2>
          <p className="body">
            Regulatory status changes. The matrix is a starting point
            for further verification, not a substitute for direct
            consultation of the relevant authority and legal counsel
            in the buyer's jurisdiction. Where this report shows{" "}
            <strong>RUO</strong>, that reflects research-grade
            chemical-reference sale and does not imply human-use
            authorization in any country. Where it shows{" "}
            <strong>Rx</strong>, the underlying approval is for a
            specific finished pharmaceutical product under a specific
            label; research-grade material of the same molecule is a
            separate category and not interchangeable with the
            approved product.
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
            Cite this report: Peppu Studio LLC. Regulatory Status
            Matrix · 17 Peptides × 10 Countries. Retrieved{" "}
            {retrievalDate} from
            peppudex.com/reports/regulatory-status-matrix
          </p>

          <h2>RELATED</h2>
          <ul>
            <li>
              <Link
                href={
                  "/reports/peptide-research-publication-" +
                  "trends-2015-2026"
                }
                style={{ color: "var(--ink)" }}
              >
                Peptide Research Publication Trends 2015-2026
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
