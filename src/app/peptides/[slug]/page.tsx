import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PEPPUDEX } from "@/data/peppudex";
import { ENRICHMENT } from "@/data/enrichment";
import { MECHANISMS_BY_SLUG } from "@/data/mechanisms";
import { CONDITIONS_BY_SLUG } from "@/data/conditions";
import { stacksForCompound } from "@/data/stacks";
import { buildCompoundJsonLd } from "@/lib/json-ld";
import { ReviewedByByline } from "@/components/ReviewedByByline";
import { peppugirlPostsForCompound } from "@/data/peppugirl-links";
import { wikiUrlFor } from "@/lib/wiki-map";
import { autoLink } from "@/lib/auto-link";
import { PageviewBeacon, TrackedLink } from "@/components/TrackClient";
import { SourceForResearch } from "@/components/SourceForResearch";

export function generateStaticParams() {
  return PEPPUDEX.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const e = PEPPUDEX.find((p) => p.slug === slug);
  if (!e) return {};
  const enr = ENRICHMENT[slug];
  const aliasLine = enr?.aliases?.length ? ` (${enr.aliases.slice(0, 3).join(", ")})` : "";
  // Head-term-front-loaded description: open with "[Name] is a [class] research peptide
  // studied for [conditions]" so Google sees the high-volume terms first. Falls back to
  // tagline when enrichment is sparse.
  const classLabel = enr?.classLabel ?? "research peptide";
  const conditionsLine = (enr?.conditions ?? []).slice(0, 2).join(" and ") || e.tagline.toLowerCase();
  const description = `${e.name} is a ${classLabel} studied for ${conditionsLine}. Mechanism notes, evidence grades A-F, FAQs, peer-reviewed sources. Research-only.`.slice(0, 160);
  return {
    title: `${e.name}${aliasLine} · Mechanism, Evidence, FAQ · PEPPUDEX`,
    description,
    alternates: { canonical: `https://peppudex.com/peptides/${slug}` },
    openGraph: {
      title: `${e.name} · PEPPUDEX`,
      description,
      type: "article",
      url: `https://peppudex.com/peptides/${slug}`,
      images: e.card ? [e.card] : [],
    },
  };
}

const GRADE_COLOR: Record<string, string> = { A: "#66BB6A", B: "#9CCC65", C: "#FFB74D", D: "#F06292", F: "#EF5350" };

export default async function Detail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = PEPPUDEX.find((p) => p.slug === slug);
  if (!entry) notFound();

  const enr = ENRICHMENT[slug];
  const mechanisms = (enr?.mechanisms ?? []).map((m) => MECHANISMS_BY_SLUG[m]).filter(Boolean);
  const conditions = (enr?.conditions ?? []).map((c) => CONDITIONS_BY_SLUG[c]).filter(Boolean);
  const stacks = stacksForCompound(slug);
  const peppugirlPosts = peppugirlPostsForCompound(slug);

  // JSON-LD · MedicalWebPage + DietarySupplement + BreadcrumbList + MedicalStudy[]
  // + Dataset + DefinedTerm + FAQPage. Wires page into Google medical Knowledge Graph
  // via additionalProperty (CAS/PubChem/MeSH/UNII/KEGG/ChEMBL) + sameAs.
  const jsonLd = buildCompoundJsonLd(entry, enr);

  return (
    <main>
      <div className="header-strip">FOR LABORATORY RESEARCH USE ONLY · NOT FOR HUMAN CONSUMPTION</div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="page">
        <div className="brandbar">
          <Link href="/" style={{ background: "var(--ink)", color: "var(--paper)", fontFamily: "var(--font-pixel)", fontSize: 10, padding: "10px 14px", textDecoration: "none", boxShadow: "3px 3px 0 rgba(0,0,0,0.35)", letterSpacing: "0.14em" }}>
            ◀ INDEX
          </Link>
          <span style={{ fontFamily: "var(--font-pixel)", fontSize: 14, color: "var(--paper)", letterSpacing: "0.04em", textShadow: "3px 3px 0 var(--ink)" }}>
            PEPPU<span style={{ color: "#FFE680" }}>DEX</span>
          </span>
        </div>

        <article className="detail">
          <PageviewBeacon compound={entry.slug} />

          {/* Where-to-source widget · Letterboxd / IMDB pattern. Sits above
              the hero so commercial intent has a clean landing spot. */}
          <SourceForResearch slug={entry.slug} name={entry.name} />

          {/* ── 1. HERO · CARD + IDENTIFIERS ── */}
          <section className="top" style={{ marginBottom: 24 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={entry.card || "/cards/placeholder.svg"} alt={`${entry.name} trading card`} />
            <div>
              <p style={{ fontFamily: "var(--font-pixel)", fontSize: 9, letterSpacing: "0.18em" }}>
                NO. {entry.id} · {entry.stage.toUpperCase()} · Lv. {entry.level} · HP {entry.hp}
              </p>
              <h1>{entry.name}</h1>
              <p className="body" style={{ marginBottom: 12 }}>{entry.tagline}</p>
              <ReviewedByByline
                reviewerSlug={enr?.reviewer ?? "editorial-board"}
                lastUpdated={enr?.lastUpdated ?? "2026-05-19"}
              />
              <div className="types">
                {entry.types.map((t) => (
                  <span key={t} className="badge" data-t={t}>{t.toUpperCase()}</span>
                ))}
              </div>

              {enr && (
                <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  {enr.aliases.length > 0 && <KeyVal k="Aliases" v={enr.aliases.join(", ")} />}
                  <KeyVal k="Class" v={enr.classLabel} />
                  {enr.formula && <KeyVal k="Formula" v={enr.formula} />}
                  {enr.sequence && <KeyVal k="Sequence" v={enr.sequence} />}
                  {enr.halfLife && <KeyVal k="Half-life" v={enr.halfLife} />}
                  <KeyVal k="Routes" v={enr.routes.join(" · ")} />
                </div>
              )}
            </div>
          </section>

          {/* ── 2. MECHANISM (data first, no banner above) ── */}
          <h2>MECHANISM OF ACTION</h2>
          <p className="body">{autoLink(entry.mechanism, entry.slug)}</p>

          {/* ── 3. EVIDENCE GRADES (the moat) ── */}
          {enr?.outcomes && (
            <>
              <h2>EVIDENCE GRADES</h2>
              <div style={{ display: "grid", gap: 10 }}>
                {enr.outcomes.map((o) => (
                  <div key={o.name} className="move">
                    <div className="row">
                      <span>▶ {o.name}</span>
                      <span style={{ background: GRADE_COLOR[o.grade], color: "#fff", padding: "4px 10px", border: "2px solid var(--ink)", fontFamily: "var(--font-pixel)", fontSize: 12 }}>
                        {o.grade}
                      </span>
                    </div>
                    <p className="desc">{o.rationale}</p>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* ── 4. MECHANISMS + CONDITIONS (bidirectional links) ── */}
          {mechanisms.length > 0 && (
            <>
              <h2>MECHANISM CATEGORIES</h2>
              <div className="shelf">
                {mechanisms.map((m) => (
                  <Link key={m.slug} href={`/mechanisms/${m.slug}`} className="shelf-tile" style={{ background: m.color }}>
                    <span>{m.shortName.toUpperCase()}</span>
                  </Link>
                ))}
              </div>
            </>
          )}

          {conditions.length > 0 && (
            <>
              <h2>RESEARCH CONDITIONS</h2>
              <div className="shelf">
                {conditions.map((c) => (
                  <Link key={c.slug} href={`/conditions/${c.slug}`} className="shelf-tile" style={{ background: "var(--paper)" }}>
                    <span>{c.name.toUpperCase()}</span>
                  </Link>
                ))}
              </div>
            </>
          )}

          {/* ── 5. SAFETY (YMYL trust signal) ── */}
          {enr?.safety && (
            <>
              <h2>SAFETY</h2>
              <p className="body" style={{ fontFamily: "var(--font-pixel)", fontSize: 10, marginTop: 14 }}>Side effects</p>
              <ul>{enr.safety.sideEffects.map((s, i) => (<li key={i}>{s}</li>))}</ul>
              <p className="body" style={{ fontFamily: "var(--font-pixel)", fontSize: 10, marginTop: 14 }}>Drug interactions</p>
              <ul>{enr.safety.interactions.map((s, i) => (<li key={i}>{s}</li>))}</ul>
              <p className="body" style={{ fontFamily: "var(--font-pixel)", fontSize: 10, marginTop: 14 }}>Contraindications</p>
              <ul>{enr.safety.contraindications.map((s, i) => (<li key={i}>{s}</li>))}</ul>
            </>
          )}

          {/* ── 6. REGULATORY STATUS ── */}
          {enr?.regulatory && (
            <>
              <h2>REGULATORY STATUS</h2>
              <p className="body"><strong>FDA · </strong>{enr.regulatory.fda}</p>
              <p className="body" style={{ marginTop: 10 }}><strong>WADA · </strong>{enr.regulatory.wada}</p>
            </>
          )}

          {/* ── 7. STORAGE ── */}
          {enr?.storage && (
            <>
              <h2>STORAGE</h2>
              <p className="body"><strong>Lyophilized · </strong>{enr.storage.lyo}</p>
              <p className="body" style={{ marginTop: 8 }}><strong>Reconstituted · </strong>{enr.storage.recon}</p>
            </>
          )}

          {/* ── 8. PEER-REVIEWED EVIDENCE / CITATIONS ── */}
          {enr?.citations && enr.citations.length > 0 && (
            <>
              <h2>PEER-REVIEWED EVIDENCE</h2>
              <ul>
                {enr.citations.map((c, i) => (
                  <li key={i}>
                    {c.authors}. <em>{c.title}</em>. {c.journal} {c.year}.{c.pmid ? ` PMID ${c.pmid}.` : ""}{c.nct ? ` ${c.nct}.` : ""}{" "}
                    <a href={c.url} target="_blank" rel="noopener noreferrer">link →</a>
                  </li>
                ))}
              </ul>
            </>
          )}

          {/* ── 9. FAQ (15-25 entries · captures PAA + featured snippets) ── */}
          {enr?.faqs && enr.faqs.length > 0 && (
            <>
              <h2>FAQ · {enr.faqs.length} QUESTIONS</h2>
              <div style={{ display: "grid", gap: 14 }}>
                {enr.faqs.map((f, i) => (
                  <details key={i} className="move" style={{ cursor: "pointer" }}>
                    <summary style={{ fontFamily: "var(--font-pixel)", fontSize: 11, listStyle: "none", cursor: "pointer", padding: 0 }}>
                      ▶ {f.q}
                    </summary>
                    <p className="desc" style={{ marginTop: 8 }}>{autoLink(f.a, entry.slug)}</p>
                  </details>
                ))}
              </div>
            </>
          )}

          {/* ── 10. STACK MEMBERSHIPS ── */}
          {stacks.length > 0 && (
            <>
              <h2>APPEARS IN STACKS</h2>
              <div className="stack-grid">
                {stacks.map((s) => (
                  <Link key={s.slug} href={`/stacks/${s.slug}`} className="stack-card">
                    <p style={{ fontFamily: "var(--font-pixel)", fontSize: 10, letterSpacing: "0.14em", opacity: 0.6 }}>STACK</p>
                    <p style={{ fontFamily: "var(--font-pixel)", fontSize: 12, marginTop: 6 }}>{s.name}</p>
                    <p className="body" style={{ marginTop: 6 }}>{s.description}</p>
                  </Link>
                ))}
              </div>
            </>
          )}

          {/* ── 11. SIGNATURE MOVES (game flavor) ── */}
          <h2>SIGNATURE MOVES</h2>
          <div className="moves">
            {entry.moves.map((m) => (
              <div key={m.name} className="move">
                <div className="row">
                  <span>▶ {m.name}</span>
                  {typeof m.power === "number" && <span>POW {m.power}</span>}
                </div>
                <p className="desc">{m.desc}</p>
              </div>
            ))}
          </div>

          {/* ── 11.5 PEPPUGIRL DIARY · bidirectional authority loop (Phase P-1) ── */}
          {peppugirlPosts.length > 0 && (
            <>
              <h2>READ PEPPUGIRL&apos;S {entry.name} DIARY</h2>
              <p className="body" style={{ marginBottom: 14 }}>
                First-person photo-documented research-protocol log for {entry.name}. Timestamped weekly observations, before-after, evidence-grade context.
              </p>
              <div className="stack-grid">
                {peppugirlPosts.map((p) => (
                  <a
                    key={p.slug}
                    className="stack-card"
                    href={`https://peppugirl.com/blog/${p.slug}`}
                    target="_blank"
                    rel="noopener"
                  >
                    <p style={{ fontFamily: "var(--font-pixel)", fontSize: 10, letterSpacing: "0.14em", opacity: 0.6 }}>PEPPUGIRL DIARY</p>
                    <p style={{ fontFamily: "var(--font-pixel)", fontSize: 12, marginTop: 6 }}>{p.title.toUpperCase()}</p>
                    <p className="body" style={{ marginTop: 6 }}>{p.excerpt}</p>
                  </a>
                ))}
              </div>
            </>
          )}

          {/* ── 12. SOURCE NOTE / BANNER (below the research content per E-E-A-T) ── */}
          <h2>SOURCED FROM PEPPU LABS</h2>
          <p className="body" style={{ marginBottom: 14 }}>
            Reference compounds documented on this page are available as research-grade material at Peppu Studio · ≥99% purity · per-batch Certificate of Analysis. For laboratory research use only. No human dose is recommended by this wiki.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 10 }}>
            <TrackedLink eventName="source-at-peppu-labs" compound={entry.slug}
              href={`https://peppu.studio?utm_source=peppudex&utm_medium=compound&utm_campaign=${entry.slug}`}
              className="back" style={{ fontFamily: "var(--font-pixel)", fontSize: 10, padding: "10px 14px", color: "var(--paper)", textDecoration: "none", background: "var(--ink)" }}
              target_attr="_blank" rel="noopener noreferrer">
              SOURCE AT PEPPU LABS ▶
            </TrackedLink>
            {(() => {
              const wikiUrl = wikiUrlFor(entry.slug);
              return wikiUrl ? (
                <TrackedLink eventName="wiki-entry" compound={entry.slug}
                  href={`${wikiUrl}?utm_source=peppudex&utm_medium=compound&utm_campaign=${entry.slug}`}
                  className="back" style={{ fontFamily: "var(--font-pixel)", fontSize: 10, padding: "10px 14px", color: "var(--paper)", textDecoration: "none", background: "var(--grass-deep)" }}
                  target_attr="_blank" rel="noopener noreferrer">
                  WIKI ENTRY ▶
                </TrackedLink>
              ) : null;
            })()}
          </div>

          {enr?.lastUpdated && (
            <p style={{ fontFamily: "var(--font-pixel)", fontSize: 8, marginTop: 28, opacity: 0.55, letterSpacing: "0.16em" }}>
              ▶ LAST UPDATED · {enr.lastUpdated}
            </p>
          )}
        </article>

        <footer className="footer">
          PEPPUDEX · {entry.name} · {entry.tagline}<br />
          <a href="https://peppu.studio">PEPPU STUDIO</a> · <a href="https://pepputree.com">PEPPUTREE</a> · <a href="https://wiki.peppu.studio">WIKI</a>
        </footer>
      </div>

      <div className="disclaimer-band">
        © 2026 Peppu Studio LLC · For Laboratory Research Use Only
      </div>
    </main>
  );
}

function KeyVal({ k, v }: { k: string; v: string }) {
  return (
    <div style={{ background: "var(--paper)", border: "2px solid var(--ink)", padding: "8px 10px" }}>
      <p style={{ fontFamily: "var(--font-pixel)", fontSize: 8, letterSpacing: "0.18em", opacity: 0.6 }}>{k.toUpperCase()}</p>
      <p className="body" style={{ marginTop: 4 }}>{v}</p>
    </div>
  );
}
