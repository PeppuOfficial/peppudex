import Link from "next/link";
import { notFound } from "next/navigation";
import { PEPPUDEX } from "@/data/peppudex";

export function generateStaticParams() {
  return PEPPUDEX.map((p) => ({ slug: p.slug }));
}

export default async function Detail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = PEPPUDEX.find((p) => p.slug === slug);
  if (!entry) notFound();

  return (
    <main>
      <div className="header-strip">FOR LABORATORY RESEARCH USE ONLY · NOT FOR HUMAN CONSUMPTION</div>

      <div className="brandbar">
        <span className="brand">PEPPU<span className="accent">DEX</span></span>
        <Link href="/" className="back">◀ BACK TO INDEX</Link>
      </div>

      <div className="detail">
        <div className="top">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={entry.card} alt={`${entry.name} card`} />
          <div>
            <p style={{ fontFamily: "var(--font-pixel)", fontSize: 9, letterSpacing: "0.18em" }}>NO. {entry.id} · {entry.stage.toUpperCase()} · Lv. {entry.level} · HP {entry.hp}</p>
            <h1>{entry.name}</h1>
            <p className="body" style={{ marginBottom: 14 }}>{entry.tagline}</p>
            <div className="types">
              {entry.types.map((t) => (
                <span key={t} className="badge" data-t={t}>{t.toUpperCase()}</span>
              ))}
            </div>
            <p className="body" style={{ marginTop: 16 }}>{entry.mechanism}</p>
          </div>
        </div>

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

        <h2>PEER-REVIEWED EVIDENCE</h2>
        <ul>
          {entry.evidence.map((line, i) => (<li key={i}>{line}</li>))}
        </ul>

        <h2>SOURCES</h2>
        <ul>
          {entry.sources.map((s) => (
            <li key={s.url}><a href={s.url} target="_blank" rel="noopener noreferrer">{s.label} →</a></li>
          ))}
        </ul>

        <div style={{ marginTop: 36, display: "flex", gap: 12, flexWrap: "wrap" }}>
          <a className="back" href={`https://peppu.studio?utm_source=peppudex&utm_medium=detail&utm_campaign=${entry.slug}`}>SHOP AT PEPPU LABS ▶</a>
          <a className="back" href="https://pepputree.com?utm_source=peppudex&utm_medium=detail&utm_campaign=pepputree" style={{ background: "var(--grass-deep)" }}>JOIN PEPPUTREE ▶</a>
        </div>
      </div>

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
