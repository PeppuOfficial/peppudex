import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MECHANISMS, MECHANISMS_BY_SLUG } from "@/data/mechanisms";
import { PEPPUDEX } from "@/data/peppudex";
import { ENRICHMENT } from "@/data/enrichment";

export function generateStaticParams() {
  return MECHANISMS.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const m = MECHANISMS_BY_SLUG[slug];
  if (!m) return {};
  return {
    title: `${m.name} Research Peptides · PEPPUDEX`,
    description: m.description + " " + m.longDescription.slice(0, 120),
    alternates: { canonical: `https://peppudex.com/mechanisms/${slug}` },
  };
}

export default async function MechanismPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const m = MECHANISMS_BY_SLUG[slug];
  if (!m) notFound();

  // Find all PEPPUDEX entries tagged with this mechanism
  const compounds = PEPPUDEX.filter((p) => (ENRICHMENT[p.slug]?.mechanisms ?? []).includes(slug));

  return (
    <main>
      <div className="header-strip">FOR LABORATORY RESEARCH USE ONLY · NOT FOR HUMAN CONSUMPTION</div>
      <div className="page">
        <div className="brandbar">
          <Link href="/mechanisms" style={{ background: "var(--ink)", color: "var(--paper)", fontFamily: "var(--font-pixel)", fontSize: 10, padding: "10px 14px", textDecoration: "none", letterSpacing: "0.14em", boxShadow: "3px 3px 0 rgba(0,0,0,0.35)" }}>◀ MECHANISMS</Link>
          <span style={{ fontFamily: "var(--font-pixel)", fontSize: 14, color: "var(--paper)", textShadow: "3px 3px 0 var(--ink)" }}>PEPPU<span style={{ color: "#FFE680" }}>DEX</span></span>
        </div>

        <article className="detail" style={{ paddingTop: 12 }}>
          <span style={{ display: "inline-block", background: m.color, color: "var(--ink)", padding: "6px 14px", border: "3px solid var(--ink)", fontFamily: "var(--font-pixel)", fontSize: 10, letterSpacing: "0.14em" }}>MECHANISM</span>
          <h1 style={{ marginTop: 14 }}>{m.name}</h1>
          <p className="body" style={{ marginTop: 12 }}>{m.longDescription}</p>

          <h2>COMPOUNDS IN THIS CATEGORY · {compounds.length}</h2>
          <div className="grid">
            {compounds.map((p) => (
              <Link key={p.slug} href={`/${p.slug}`} className="card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="art" src={p.card || "/cards/placeholder.svg"} alt={`${p.name} card`} />
                <div className="meta">
                  <span>No. {p.id}</span>
                  <span className="hp">HP {p.hp}</span>
                </div>
                <div className="name">{p.name}</div>
              </Link>
            ))}
          </div>

          <h2>RELATED MECHANISMS</h2>
          <div className="shelf">
            {MECHANISMS.filter((x) => x.slug !== slug).slice(0, 8).map((x) => (
              <Link key={x.slug} href={`/mechanisms/${x.slug}`} className="shelf-tile" style={{ background: x.color }}>
                <span>{x.shortName.toUpperCase()}</span>
              </Link>
            ))}
          </div>
        </article>
      </div>
      <div className="disclaimer-band">© 2026 Peppu Studio LLC · For Laboratory Research Use Only</div>
    </main>
  );
}
