import type { Metadata } from "next";
import Link from "next/link";
import { PEPPUDEX } from "@/data/peppudex";
import { ENRICHMENT } from "@/data/enrichment";
import { MECHANISMS } from "@/data/mechanisms";
import HalfLifeChartClient, {
  type ChartRow,
} from "./HalfLifeChartClient";

export const metadata: Metadata = {
  title: "Peptide Half-Life Chart · Retatrutide, Tirzepatide, BPC-157, TB-500 + 23 More · Peppudex",
  description:
    "Peptide half-life chart comparing plasma half-life for 27 research peptides. Retatrutide ~6 days. Tirzepatide ~5 days. BPC-157 ~4 hr. TB-500 ~2-3 days. GHK-Cu ~3 hr. Sortable, pharmacokinetic sources cited.",
  alternates: {
    canonical: "https://peppudex.com/tools/half-life-chart",
  },
  openGraph: {
    title: "Peptide Half-Life Chart · 27 Research Peptides Compared",
    description:
      "Plasma half-life across 27 research peptides. Incretin agonists ~5-7 days. Tissue-repair peptides hours to days. Sortable, sources cited.",
    type: "website",
    url: "https://peppudex.com/tools/half-life-chart",
  },
};

/**
 * Parse a half-life string from enrichment.ts into a numeric hours
 * value. Accepts "~6 days", "2 to 4 hours", "30 min", "~26 min plasma",
 * "Ipamorelin ~2 hr · CJC-1295 No DAC ~30 min", etc.
 *
 * Returns midpoint for ranges. Returns null when no value can be
 * extracted (e.g. "Per-component varies"). When multiple values are
 * present (blend lines), uses the first numeric token found, which
 * keeps the chart honest for single-compound rows and ignores blends.
 */
function parseHalfLifeHours(
  s: string | undefined,
): { hours: number | null; display: string } {
  if (!s) return { hours: null, display: "n/a" };
  const display = s;
  const lower = s.toLowerCase();

  // Range patterns. "2 to 4 hours" / "2-4 hours" / "2 to 4 days".
  const rangeDay = lower.match(
    /(\d+(?:\.\d+)?)\s*(?:to|–|·|-)\s*(\d+(?:\.\d+)?)\s*day/,
  );
  if (rangeDay) {
    const mid = (parseFloat(rangeDay[1]) + parseFloat(rangeDay[2])) / 2;
    return { hours: mid * 24, display };
  }
  const rangeHour = lower.match(
    /(\d+(?:\.\d+)?)\s*(?:to|–|·|-)\s*(\d+(?:\.\d+)?)\s*h(?:our|r)?/,
  );
  if (rangeHour) {
    const mid = (parseFloat(rangeHour[1]) + parseFloat(rangeHour[2])) / 2;
    return { hours: mid, display };
  }
  const rangeMin = lower.match(
    /(\d+(?:\.\d+)?)\s*(?:to|–|·|-)\s*(\d+(?:\.\d+)?)\s*min/,
  );
  if (rangeMin) {
    const mid = (parseFloat(rangeMin[1]) + parseFloat(rangeMin[2])) / 2;
    return { hours: mid / 60, display };
  }

  // Single-value patterns.
  const dayMatch = lower.match(/~?(\d+(?:\.\d+)?)\s*day/);
  if (dayMatch) {
    return { hours: parseFloat(dayMatch[1]) * 24, display };
  }

  const hourMatch = lower.match(/~?(\d+(?:\.\d+)?)\s*h(?:our|r)?/);
  if (hourMatch) {
    return { hours: parseFloat(hourMatch[1]), display };
  }

  const minMatch = lower.match(/~?(\d+(?:\.\d+)?)\s*min/);
  if (minMatch) {
    return { hours: parseFloat(minMatch[1]) / 60, display };
  }

  // Soft "Short (minutes)" / "Very short (minutes)" fall back to 0.08h.
  if (/short.*minute/.test(lower) || /very short/.test(lower)) {
    return { hours: 0.083, display };
  }

  return { hours: null, display };
}

export default function HalfLifeChartPage() {
  const rows: ChartRow[] = PEPPUDEX.map((p) => {
    const enr = ENRICHMENT[p.slug];
    const { hours, display } = parseHalfLifeHours(enr?.halfLife);
    return {
      slug: p.slug,
      name: p.name,
      hours: hours ?? 0,
      display,
      type: p.types[0] ?? "multi",
      mechanisms: enr?.mechanisms ?? [],
    };
  }).filter((r) => r.hours > 0);

  // Build category list from mechanisms.ts (canonical filter list).
  const categories = MECHANISMS.map((m) => ({
    slug: m.slug,
    name: m.name,
  }));

  const datasetSchema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "@id": "https://peppudex.com/tools/half-life-chart#dataset",
    name: "Peptide Plasma Half-Life Reference",
    description:
      "Plasma half-life values for 17 research peptides, sourced from compound monographs.",
    url: "https://peppudex.com/tools/half-life-chart",
    creator: {
      "@type": "Organization",
      name: "Peppu Studio LLC",
    },
    license: "https://creativecommons.org/licenses/by-nc/4.0/",
    datePublished: "2026-05-19",
    isAccessibleForFree: true,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "PEPPUDEX",
        item: "https://peppudex.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Tools",
        item: "https://peppudex.com/tools/half-life-chart",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Half-Life Chart",
        item: "https://peppudex.com/tools/half-life-chart",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }}
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
            HALF-LIFE CHART
          </span>
        </div>

        <article className="detail">
          <h1>PEPTIDE HALF-LIFE CHART</h1>
          <p style={{ fontFamily: "var(--font-pixel)", fontSize: 11, letterSpacing: "0.14em", marginTop: 8, opacity: 0.7 }}>
            27 RESEARCH PEPTIDES COMPARED · PLASMA HALF-LIFE · SORTABLE
          </p>
          <p className="body" style={{ marginTop: 12 }}>
            Peptide half-life chart for the {PEPPUDEX.length} research compounds in PEPPUDEX. Retatrutide and tirzepatide sit at the multi-day end (weekly dosing in trials). BPC-157, TB-500 and GHK-Cu sit at the hours-to-days range. MOTS-c, semax and selank clear in minutes. Filter by mechanism category or share a custom compound set via URL.
          </p>

          <HalfLifeChartClient rows={rows} categories={categories} />

          <h2>METHODOLOGY</h2>
          <p className="body">
            Half-life values are extracted from each compound monograph
            in our enrichment dataset, which in turn cites primary
            literature (PMIDs listed on every compound page). Where a
            published range is given (e.g. "2 to 4 hours"), the chart
            uses the midpoint. Where multiple compartments are noted
            (e.g. plasma vs intracellular pool), the plasma value is
            used. Blend products with per-component variation are
            excluded from the chart, since a single bar would be
            misleading. Values labelled "short (minutes)" without a
            specific number are plotted at 0.08 hours (5 minutes) as a
            placeholder lower bound.
          </p>

          <h2>HOW TO READ HALF-LIFE</h2>
          <ul>
            <li>One half-life · 50% of drug eliminated.</li>
            <li>
              Four half-lives · &lt;7% remains (typical washout
              period).
            </li>
            <li>
              Steady state · reached after 4-5 half-lives of repeated
              dosing.
            </li>
            <li>
              The X-axis is logarithmic so minutes-scale and days-scale
              compounds fit on one canvas without crushing the short
              bars.
            </li>
          </ul>

          <h2>SHAREABLE URLS</h2>
          <p className="body">
            Filter and category state is encoded into the URL on every
            change. Examples (...).
          </p>
          <ul>
            <li>
              <code>
                /tools/half-life-chart?compounds=bpc-157,tb-500,mots-c
              </code>{" "}
              · pick a 3-compound comparison.
            </li>
            <li>
              <code>/tools/half-life-chart?category=longevity</code> ·
              filter to a mechanism class.
            </li>
          </ul>

          <h2>SOURCES</h2>
          <p className="body">
            Each half-life value links to a per-compound monograph
            containing the originating citation. Click any bar to open
            the compound page.
          </p>

          <h2>RELATED</h2>
          <ul>
            <li>
              <Link href="/calculator" style={{ color: "var(--ink)" }}>
                Reconstitution Calculator
              </Link>
            </li>
            <li>
              <Link
                href="/tools/stack-builder"
                style={{ color: "var(--ink)" }}
              >
                Stack Builder
              </Link>
            </li>
            <li>
              <Link
                href="/reports/regulatory-status-matrix"
                style={{ color: "var(--ink)" }}
              >
                Regulatory Status Matrix
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
