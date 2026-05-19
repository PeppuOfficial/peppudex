import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { COMPARISONS, COMPARISONS_BY_SLUG } from "@/data/comparisons";
import { PEPPUDEX } from "@/data/peppudex";

export function generateStaticParams() {
  return COMPARISONS.map((c) => ({ pair: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ pair: string }> }): Promise<Metadata> {
  const { pair } = await params;
  const c = COMPARISONS_BY_SLUG[pair];
  if (!c) return {};
  const a = PEPPUDEX.find((p) => p.slug === c.a);
  const b = PEPPUDEX.find((p) => p.slug === c.b);
  return {
    title: `${a?.name} vs ${b?.name} · Mechanism, Evidence, Verdict · PEPPUDEX`,
    description: c.verdict.slice(0, 160),
    alternates: { canonical: `https://peppudex.com/vs/${pair}` },
  };
}

const WINNER_LABEL = { a: "A", b: "B", tie: "TIE" };

export default async function VsPage({ params }: { params: Promise<{ pair: string }> }) {
  const { pair } = await params;
  const c = COMPARISONS_BY_SLUG[pair];
  if (!c) notFound();
  const a = PEPPUDEX.find((p) => p.slug === c.a);
  const b = PEPPUDEX.find((p) => p.slug === c.b);
  if (!a || !b) notFound();

  return (
    <main>
      <div className="header-strip">FOR LABORATORY RESEARCH USE ONLY · NOT FOR HUMAN CONSUMPTION</div>
      <div className="page">
        <div className="brandbar">
          <Link href="/vs" style={{ background: "var(--ink)", color: "var(--paper)", fontFamily: "var(--font-pixel)", fontSize: 10, padding: "10px 14px", textDecoration: "none", letterSpacing: "0.14em", boxShadow: "3px 3px 0 rgba(0,0,0,0.35)" }}>◀ COMPARE</Link>
          <span style={{ fontFamily: "var(--font-pixel)", fontSize: 14, color: "var(--paper)", textShadow: "3px 3px 0 var(--ink)" }}>PEPPU<span style={{ color: "#FFE680" }}>DEX</span></span>
        </div>
        <article className="detail" style={{ paddingTop: 12 }}>
          <span style={{ display: "inline-block", background: "var(--paper)", padding: "6px 14px", border: "3px solid var(--ink)", fontFamily: "var(--font-pixel)", fontSize: 10, letterSpacing: "0.14em" }}>HEAD-TO-HEAD</span>
          <h1 style={{ marginTop: 14 }}>{a.name} <span style={{ color: "#c0392b" }}>VS</span> {b.name}</h1>
          <p className="body" style={{ marginTop: 12 }}>{c.verdict}</p>

          {/* Side-by-side hero */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 24 }}>
            <Link href={`/peptides/${a.slug}`} className="card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="art" src={a.card || "/cards/placeholder.svg"} alt={`${a.name} card`} />
              <div className="meta"><span>A · No. {a.id}</span><span className="hp">HP {a.hp}</span></div>
              <div className="name">{a.name}</div>
              <p className="body" style={{ marginTop: 6, fontSize: 16, opacity: 0.85 }}>{a.tagline}</p>
            </Link>
            <Link href={`/peptides/${b.slug}`} className="card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="art" src={b.card || "/cards/placeholder.svg"} alt={`${b.name} card`} />
              <div className="meta"><span>B · No. {b.id}</span><span className="hp">HP {b.hp}</span></div>
              <div className="name">{b.name}</div>
              <p className="body" style={{ marginTop: 6, fontSize: 16, opacity: 0.85 }}>{b.tagline}</p>
            </Link>
          </div>

          {/* Comparison table */}
          <h2>SIDE BY SIDE</h2>
          <div style={{ background: "var(--paper)", border: "4px solid var(--ink)", boxShadow: "6px 6px 0 var(--shadow)", overflow: "hidden" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr 1.2fr", borderBottom: "3px solid var(--ink)", background: "var(--ink)", color: "var(--paper)" }}>
              <div style={{ fontFamily: "var(--font-pixel)", fontSize: 9, padding: "10px 12px", letterSpacing: "0.16em" }}>FIELD</div>
              <div style={{ fontFamily: "var(--font-pixel)", fontSize: 9, padding: "10px 12px", letterSpacing: "0.16em", borderLeft: "2px solid var(--paper)" }}>A · {a.name}</div>
              <div style={{ fontFamily: "var(--font-pixel)", fontSize: 9, padding: "10px 12px", letterSpacing: "0.16em", borderLeft: "2px solid var(--paper)" }}>B · {b.name}</div>
            </div>
            {c.comparisonTable.map((r, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr 1.2fr", borderBottom: i === c.comparisonTable.length - 1 ? "none" : "2px solid rgba(0,0,0,0.1)" }}>
                <div style={{ fontFamily: "var(--font-pixel)", fontSize: 9, padding: "12px", letterSpacing: "0.12em", background: "rgba(0,0,0,0.04)" }}>{r.row}</div>
                <div className="body" style={{ padding: "12px", borderLeft: "2px solid rgba(0,0,0,0.1)", fontSize: 18 }}>{r.aValue}</div>
                <div className="body" style={{ padding: "12px", borderLeft: "2px solid rgba(0,0,0,0.1)", fontSize: 18 }}>{r.bValue}</div>
              </div>
            ))}
          </div>

          {/* Per-goal verdict */}
          <h2>WHICH IS BETTER · BY GOAL</h2>
          <div style={{ display: "grid", gap: 12 }}>
            {c.whichBetter.map((w, i) => (
              <div key={i} className="move">
                <div className="row">
                  <span>▶ {w.goal}</span>
                  <span style={{
                    background: w.winner === "tie" ? "#666" : w.winner === "a" ? "#4FC3F7" : "#FFB74D",
                    color: "#fff",
                    padding: "4px 10px",
                    border: "2px solid var(--ink)",
                    fontFamily: "var(--font-pixel)",
                    fontSize: 10,
                  }}>
                    {WINNER_LABEL[w.winner]} {w.winner !== "tie" && `· ${(w.winner === "a" ? a.name : b.name)}`}
                  </span>
                </div>
                <p className="desc" style={{ marginTop: 8 }}>{w.rationale}</p>
              </div>
            ))}
          </div>

          {/* Stacking */}
          <h2>STACKING NOTE</h2>
          <p className="body">{c.stacking}</p>

          {/* Source CTA · below research (E-E-A-T compliant) */}
          <h2>SOURCED FROM PEPPU LABS</h2>
          <p className="body" style={{ marginBottom: 14 }}>
            Both compounds are available as research-grade material at Peppu Studio · ≥99% purity · per-batch CoA. For laboratory research use only.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a className="back" style={{ fontFamily: "var(--font-pixel)", fontSize: 10, padding: "10px 14px", color: "var(--paper)", textDecoration: "none", background: "var(--ink)" }}
              href={`https://peppu.studio?utm_source=peppudex&utm_medium=vs&utm_campaign=${c.slug}`} target="_blank" rel="noopener noreferrer">
              SOURCE AT PEPPU LABS ▶
            </a>
          </div>
        </article>
      </div>
      <div className="disclaimer-band">© 2026 Peppu Studio LLC · For Laboratory Research Use Only</div>
    </main>
  );
}
