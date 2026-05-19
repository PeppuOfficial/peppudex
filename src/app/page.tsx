import Link from "next/link";
import { PEPPUDEX } from "@/data/peppudex";
import { MECHANISMS } from "@/data/mechanisms";
import { STACKS } from "@/data/stacks";

export default function Home() {
  // Daily-highlight · deterministic rotation, day-of-year → compound.
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  const featured = PEPPUDEX[dayOfYear % PEPPUDEX.length];

  return (
    <main>
      <div className="header-strip">FOR LABORATORY RESEARCH USE ONLY · NOT FOR HUMAN CONSUMPTION</div>

      {/* SINGLE CENTERED CONTAINER · max 1100px so cards never stretch edge-to-edge */}
      <div className="page">

        <div className="brandbar">
          <h1 className="brand">
            PEPPU<span className="accent">DEX</span>
            <span className="sr-only"> · A Pokedex of Research Peptides</span>
          </h1>
          <span className="brand-sub">A POKEDEX OF RESEARCH PEPTIDES · v1.2</span>
        </div>

        {/* GLOBAL NAV · sits below the brand bar */}
        <nav className="topnav">
          <Link href="/calculator">RECON CALC</Link>
          <Link href="/mechanisms">MECHANISMS</Link>
          <Link href="/conditions">CONDITIONS</Link>
          <Link href="/stacks">STACKS</Link>
          <Link href="/vs">COMPARE</Link>
        </nav>

        {/* TWO BILLBOARD ADS · big and obvious · HOMEPAGE only */}
        <div className="billboard">
          <a className="tone-labs" href="https://peppu.studio?utm_source=peppudex&utm_medium=billboard&utm_campaign=labs" rel="noopener noreferrer">
            <span className="bb-eye">▶ ENTER THE LAB ◀</span>
            <span className="bb-title">PEPPU LABS</span>
            <span className="bb-sub">Buy research-grade peptides · ≥99% purity · third-party COAs</span>
          </a>
          <a className="tone-tree" href="https://pepputree.com?utm_source=peppudex&utm_medium=billboard&utm_campaign=tree" rel="noopener noreferrer">
            <span className="bb-eye">▶ JOIN THE TREE ◀</span>
            <span className="bb-title">PEPPUTREE</span>
            <span className="bb-sub">Community · Discord · Telegram · price index</span>
          </a>
        </div>

        {/* DAILY HIGHLIGHT · habit mechanic */}
        <section className="intro">
          <div className="box">
            <p className="pixel-h">★ TODAY&apos;S HIGHLIGHT</p>
            <Link href={`/${featured.slug}`} style={{ display: "flex", gap: 16, marginTop: 12, alignItems: "center", textDecoration: "none", color: "var(--ink)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={featured.card || "/cards/placeholder.svg"} alt={`${featured.name} card`} style={{ width: 80, imageRendering: "pixelated", border: "3px solid var(--ink)", boxShadow: "4px 4px 0 var(--shadow)" }} />
              <div>
                <p style={{ fontFamily: "var(--font-pixel)", fontSize: 14, marginBottom: 4 }}>{featured.name}</p>
                <p className="body" style={{ opacity: 0.85 }}>{featured.tagline}</p>
                <p className="body" style={{ marginTop: 6, opacity: 0.6, fontSize: 16 }}>▶ READ FULL CARD</p>
              </div>
            </Link>
          </div>
        </section>

        <section className="intro">
          <div className="box">
            <p className="pixel-h">▶ WELCOME, RESEARCHER!</p>
            <p className="body" style={{ marginTop: 12 }}>
              Each entry in the PEPPUDEX is a research-grade peptide reference card. Click a card to read its mechanism notes, signature moves, evidence grades A–F, FAQs, and the peer-reviewed sources it&apos;s built on. For mechanism in plain prose see <a href="https://wiki.peppu.studio" target="_blank" rel="noopener noreferrer">wiki.peppu.studio</a>.
            </p>
          </div>
        </section>

        {/* THE INDEX */}
        <h2 className="section-h">▶ THE INDEX · {PEPPUDEX.length} ENTRIES</h2>
        <section className="grid">
          {PEPPUDEX.map((p) => (
            <Link key={p.id} href={`/${p.slug}`} className="card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="art" src={p.card || "/cards/placeholder.svg"} alt={`${p.name} card`} />
              <div className="meta">
                <span>No. {p.id}</span>
                <span className="hp">HP {p.hp}</span>
              </div>
              <div className="name">{p.name}</div>
              <div className="types">
                {p.types.map((t) => (
                  <span key={t} className="badge" data-t={t}>{t.toUpperCase()}</span>
                ))}
              </div>
            </Link>
          ))}
        </section>

        {/* MECHANISMS SHELF */}
        <h2 className="section-h">▶ BROWSE BY MECHANISM</h2>
        <section className="shelf">
          {MECHANISMS.slice(0, 12).map((m) => (
            <Link key={m.slug} href={`/mechanisms/${m.slug}`} className="shelf-tile" style={{ background: m.color }}>
              <span>{m.shortName.toUpperCase()}</span>
            </Link>
          ))}
          <Link href="/mechanisms" className="shelf-tile" style={{ background: "var(--ink)", color: "var(--paper)" }}>
            <span>+ ALL MECHANISMS</span>
          </Link>
        </section>

        {/* PRE-BUILT STACKS */}
        <h2 className="section-h">▶ FEATURED STACKS</h2>
        <section className="stack-grid">
          {STACKS.map((s) => (
            <Link key={s.slug} href={`/stacks/${s.slug}`} className="stack-card">
              <p style={{ fontFamily: "var(--font-pixel)", fontSize: 10, letterSpacing: "0.14em", opacity: 0.6 }}>STACK</p>
              <p style={{ fontFamily: "var(--font-pixel)", fontSize: 14, marginTop: 6 }}>{s.name}</p>
              <p className="body" style={{ marginTop: 8 }}>{s.description}</p>
              <p style={{ fontFamily: "var(--font-pixel)", fontSize: 8, marginTop: 10, letterSpacing: "0.12em", opacity: 0.55 }}>
                {s.components.map((c) => c.slug.toUpperCase()).join(" + ")}
              </p>
            </Link>
          ))}
        </section>

        <footer className="footer">
          PEPPUDEX · Powered by Peppu Studio + Peppu Labs · v1.1<br />
          <a href="https://peppu.studio">PEPPU STUDIO</a> · <a href="https://pepputree.com">PEPPUTREE</a> · <a href="https://wiki.peppu.studio">WIKI</a> · <a href="https://peppugirl.com">PEPPUGIRL</a>
        </footer>
      </div>

      <div className="disclaimer-band">
        © 2026 Peppu Studio LLC · For Laboratory Research Use Only
      </div>
    </main>
  );
}
