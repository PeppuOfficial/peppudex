import Link from "next/link";
import { PEPPUDEX } from "@/data/peppudex";

export default function Home() {
  return (
    <main>
      <div className="header-strip">FOR LABORATORY RESEARCH USE ONLY · NOT FOR HUMAN CONSUMPTION</div>

      <div className="brandbar">
        <span className="brand">
          PEPPU<span className="accent">DEX</span>
        </span>
        <span className="brand-sub">A POKEDEX OF RESEARCH PEPTIDES · v1.0</span>
      </div>

      {/* TWO BILLBOARD ADS · big and obvious */}
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

      <section className="intro">
        <div className="box">
          <p className="pixel-h">▶ WELCOME, RESEARCHER!</p>
          <p className="body" style={{ marginTop: 12 }}>
            Each entry in the PEPPUDEX is a research-grade peptide reference card. Click a card to read its mechanism notes, signature moves, and the peer-reviewed sources it&apos;s built on. All numbers reproduce the trading-card art for fun · this is education, not advice. For mechanism in plain prose see <a href="https://wiki.peppu.studio" target="_blank" rel="noopener noreferrer">wiki.peppu.studio</a>.
          </p>
        </div>
      </section>

      <section className="grid">
        {PEPPUDEX.map((p) => (
          <Link key={p.id} href={`/${p.slug}`} className="card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="art" src={p.card} alt={`${p.name} card`} />
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

      <footer className="footer">
        PEPPUDEX · Powered by Peppu Studio + Peppu Labs · v1.0<br />
        <a href="https://peppu.studio">PEPPU STUDIO</a> · <a href="https://pepputree.com">PEPPUTREE</a> · <a href="https://wiki.peppu.studio">WIKI</a>
      </footer>

      <div className="disclaimer-band">
        © 2026 Peppu Studio LLC · Wyoming · For Laboratory Research Use Only
      </div>
    </main>
  );
}
