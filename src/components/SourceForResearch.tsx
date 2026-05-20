import { wikiUrlFor } from "@/lib/wiki-map";
import { TrackedLink } from "@/components/TrackClient";

/**
 * "Where to Source" widget · placed at the top of every peptide detail
 * page directly under the name/HP/types header. Pattern reference:
 * Letterboxd "Where to watch" and IMDB "Watch options" cards.
 *
 * Google-compliance language (mechanistic only):
 *  - Uses "source", "available at", "research-grade compound", "laboratory research"
 *  - Avoids "buy", "purchase", "order now", "for sale", "treats", "for X condition"
 *  - Matches the existing /peptides-for-X "SOURCE AT PEPPU LABS" pattern
 *
 * Props:
 *  - slug        · compound slug · used for UTM + wiki lookup
 *  - name        · display name · "BPC-157"
 *  - comingSoon  · when true, swap primary CTA for a "COMING SOON" pill
 */
export function SourceForResearch({
  slug,
  name,
  comingSoon = false,
}: {
  slug: string;
  name: string;
  comingSoon?: boolean;
}) {
  const storefrontHref = `https://peppu.studio?utm_source=peppudex&utm_medium=source-widget&utm_campaign=${slug}`;
  const wikiHref = wikiUrlFor(slug);

  return (
    <aside
      aria-label={`Source ${name} for laboratory research`}
      style={{
        background: "var(--paper)",
        border: "3px solid var(--ink)",
        boxShadow: "4px 4px 0 var(--shadow)",
        padding: "14px 16px",
        marginBottom: 24,
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-pixel)",
          fontSize: 10,
          letterSpacing: "0.16em",
          marginBottom: 8,
        }}
      >
        ▶ SOURCE FOR RESEARCH
      </p>
      <p
        className="body"
        style={{
          opacity: 0.8,
          marginBottom: 12,
          fontSize: 18,
          lineHeight: 1.5,
        }}
      >
        For laboratory research use only · not for human consumption.
      </p>

      <div className="source-cta-row">
        {comingSoon ? (
          <span
            style={{
              fontFamily: "var(--font-pixel)",
              fontSize: 10,
              letterSpacing: "0.14em",
              padding: "10px 14px",
              background: "var(--paper)",
              color: "var(--ink)",
              border: "3px solid var(--ink)",
              boxShadow: "3px 3px 0 var(--shadow)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ◇ COMING SOON ◇
          </span>
        ) : (
          <TrackedLink
            eventName="source-widget-peppu-labs"
            compound={slug}
            href={storefrontHref}
            target_attr="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "var(--font-pixel)",
              fontSize: 11,
              letterSpacing: "0.14em",
              padding: "12px 16px",
              background: "var(--ink)",
              color: "var(--paper)",
              border: "3px solid var(--ink)",
              boxShadow: "4px 4px 0 var(--shadow)",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ▶ PEPPU LABS ◀
          </TrackedLink>
        )}

        {wikiHref && (
          <TrackedLink
            eventName="source-widget-wiki"
            compound={slug}
            href={`${wikiHref}?utm_source=peppudex&utm_medium=source-widget&utm_campaign=${slug}`}
            target_attr="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "var(--font-pixel)",
              fontSize: 10,
              letterSpacing: "0.14em",
              padding: "12px 14px",
              background: "var(--paper)",
              color: "var(--ink)",
              border: "3px solid var(--ink)",
              boxShadow: "4px 4px 0 var(--shadow)",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            WIKI · MECHANISM
          </TrackedLink>
        )}
      </div>

      <p
        className="body"
        style={{
          marginTop: 12,
          fontSize: 16,
          opacity: 0.65,
          lineHeight: 1.5,
        }}
      >
        Research-grade compound available at Peppu Labs. ≥99% purity, per-batch Certificate of Analysis.
      </p>
    </aside>
  );
}
