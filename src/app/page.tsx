import Link from "next/link";
import { PEPPUDEX } from "@/data/peppudex";
import { MECHANISMS } from "@/data/mechanisms";
import { STACKS } from "@/data/stacks";
import SearchBar from "@/components/SearchBar";

export default function Home() {
  // Daily-highlight · deterministic rotation, day-of-year → compound.
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  const featured = PEPPUDEX[dayOfYear % PEPPUDEX.length];

  return (
    <main>
      <div className="header-strip">FOR LABORATORY RESEARCH USE ONLY · NOT FOR HUMAN CONSUMPTION</div>

      <div className="page">

        {/* BRAND + TAGLINE · "Peptide Pokedex" is the search-engine-facing handle */}
        <div className="brandbar">
          <h1 className="brand">
            PEPPU<span className="accent">DEX</span>
            <span className="sr-only"> · List of Peptides and What They Do · Research Peptide Encyclopedia</span>
          </h1>
          <span className="brand-sub">LIST OF PEPTIDES AND WHAT THEY DO · {PEPPUDEX.length} RESEARCH PEPTIDE CARDS</span>
        </div>

        {/* GLOBAL NAV */}
        <nav className="topnav">
          <Link href="/calculator">RECON CALC</Link>
          <Link href="/mechanisms">MECHANISMS</Link>
          <Link href="/conditions">CONDITIONS</Link>
          <Link href="/stacks">STACKS</Link>
          <Link href="/vs">COMPARE</Link>
        </nav>

        {/* SEARCH BAR · primary CTA above the fold, Pokemon-database pattern */}
        <SearchBar />

        {/* DAILY HIGHLIGHT · compact one-liner, no longer a full box */}
        <Link href={`/peptides/${featured.slug}`} className="featured-pill">
          <span className="featured-star">★</span>
          <span className="featured-label">TODAY&apos;S FEATURED</span>
          <span className="featured-name">{featured.name}</span>
          <span className="featured-arrow">→</span>
        </Link>

        {/* THE INDEX · primary content, promoted above the fold */}
        <h2 className="section-h">▶ LIST OF {PEPPUDEX.length} PEPTIDES · WHAT THEY DO + MECHANISM + EVIDENCE</h2>
        <section className="grid">
          {PEPPUDEX.map((p) => (
            <Link key={p.id} href={`/peptides/${p.slug}`} className="card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="art" src={p.card || "/cards/placeholder.svg"} alt={`${p.name} trading card`} />
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

        {/* MECHANISMS SHELF · category browse */}
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

        {/* WELCOME · moved BELOW the content per Pokemon-database pattern */}
        <section className="intro">
          <div className="box">
            <p className="pixel-h">▶ WELCOME, RESEARCHER!</p>
            <p className="body" style={{ marginTop: 12 }}>
              The peppudex is a list of {PEPPUDEX.length} research peptides with what they do, how they work, and the peer-reviewed studies behind them. Each card shows mechanism, dosing route, half-life, evidence grade A-F, and a full FAQ. For mechanism in plain prose see <a href="https://wiki.peppu.studio" target="_blank" rel="noopener noreferrer">wiki.peppu.studio</a>.
            </p>
          </div>
        </section>

        {/* BILLBOARDS · moved AFTER the encyclopedia content, Bulbapedia footer-pattern */}
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

        <footer className="footer">
          PEPPUDEX · The Peptide Pokedex · Powered by Peppu Studio + Peppu Labs · v1.2<br />
          <a href="https://peppu.studio">PEPPU STUDIO</a> · <a href="https://pepputree.com">PEPPUTREE</a> · <a href="https://wiki.peppu.studio">WIKI</a> · <a href="https://peppugirl.com">PEPPUGIRL</a>
        </footer>
      </div>

      <div className="disclaimer-band">
        © 2026 Peppu Studio LLC · For Laboratory Research Use Only
      </div>
    </main>
  );
}
