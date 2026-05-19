import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CONDITIONS, CONDITIONS_BY_SLUG } from "@/data/conditions";
import { PEPPUDEX } from "@/data/peppudex";
import { ENRICHMENT } from "@/data/enrichment";

export function generateStaticParams() {
  return CONDITIONS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = CONDITIONS_BY_SLUG[slug];
  if (!c) return {};
  return {
    title: `${c.name} Peptide Research · PEPPUDEX`,
    description: c.description + " " + c.longDescription.slice(0, 120),
    alternates: { canonical: `https://peppudex.com/conditions/${slug}` },
  };
}

export default async function ConditionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = CONDITIONS_BY_SLUG[slug];
  if (!c) notFound();

  const compounds = PEPPUDEX.filter((p) => (ENRICHMENT[p.slug]?.conditions ?? []).includes(slug));

  return (
    <main>
      <div className="header-strip">FOR LABORATORY RESEARCH USE ONLY · NOT FOR HUMAN CONSUMPTION</div>
      <div className="page">
        <div className="brandbar">
          <Link href="/conditions" style={{ background: "var(--ink)", color: "var(--paper)", fontFamily: "var(--font-pixel)", fontSize: 10, padding: "10px 14px", textDecoration: "none", letterSpacing: "0.14em", boxShadow: "3px 3px 0 rgba(0,0,0,0.35)" }}>◀ CONDITIONS</Link>
          <span style={{ fontFamily: "var(--font-pixel)", fontSize: 14, color: "var(--paper)", textShadow: "3px 3px 0 var(--ink)" }}>PEPPU<span style={{ color: "#FFE680" }}>DEX</span></span>
        </div>
        <article className="detail" style={{ paddingTop: 12 }}>
          <span style={{ display: "inline-block", background: "var(--paper)", padding: "6px 14px", border: "3px solid var(--ink)", fontFamily: "var(--font-pixel)", fontSize: 10, letterSpacing: "0.14em" }}>GOAL</span>
          <h1 style={{ marginTop: 14 }}>{c.name}</h1>
          <p className="body" style={{ marginTop: 12 }}>{c.longDescription}</p>

          <h2>COMPOUNDS RESEARCHED FOR THIS GOAL · {compounds.length}</h2>
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
        </article>
      </div>
      <div className="disclaimer-band">© 2026 Peppu Studio LLC · For Laboratory Research Use Only</div>
    </main>
  );
}
