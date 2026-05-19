import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { STACKS, STACKS_BY_SLUG } from "@/data/stacks";
import { PEPPUDEX } from "@/data/peppudex";

export function generateStaticParams() {
  return STACKS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = STACKS_BY_SLUG[slug];
  if (!s) return {};
  return {
    title: `${s.name} · ${s.goal} · PEPPUDEX Stack`,
    description: s.description,
    alternates: { canonical: `https://peppudex.com/stacks/${slug}` },
  };
}

export default async function StackPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = STACKS_BY_SLUG[slug];
  if (!s) notFound();

  return (
    <main>
      <div className="header-strip">FOR LABORATORY RESEARCH USE ONLY · NOT FOR HUMAN CONSUMPTION</div>
      <div className="page">
        <div className="brandbar">
          <Link href="/stacks" style={{ background: "var(--ink)", color: "var(--paper)", fontFamily: "var(--font-pixel)", fontSize: 10, padding: "10px 14px", textDecoration: "none", letterSpacing: "0.14em", boxShadow: "3px 3px 0 rgba(0,0,0,0.35)" }}>◀ STACKS</Link>
          <span style={{ fontFamily: "var(--font-pixel)", fontSize: 14, color: "var(--paper)", textShadow: "3px 3px 0 var(--ink)" }}>PEPPU<span style={{ color: "#FFE680" }}>DEX</span></span>
        </div>
        <article className="detail" style={{ paddingTop: 12 }}>
          <span style={{ display: "inline-block", background: "var(--paper)", padding: "6px 14px", border: "3px solid var(--ink)", fontFamily: "var(--font-pixel)", fontSize: 10, letterSpacing: "0.14em" }}>STACK</span>
          <h1 style={{ marginTop: 14 }}>{s.name}</h1>
          <p className="body" style={{ marginTop: 12 }}><strong>Goal · </strong>{s.goal}</p>
          <p className="body" style={{ marginTop: 12 }}>{s.longDescription}</p>

          <h2>COMPONENTS</h2>
          <div className="grid">
            {s.components.map((c) => {
              const compound = PEPPUDEX.find((p) => p.slug === c.slug);
              if (!compound) return null;
              return (
                <Link key={c.slug} href={`/${c.slug}`} className="card">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="art" src={compound.card || "/cards/placeholder.svg"} alt={`${compound.name} card`} />
                  <div className="meta">
                    <span>No. {compound.id}</span>
                    <span className="hp">HP {compound.hp}</span>
                  </div>
                  <div className="name">{compound.name}</div>
                  <p className="body" style={{ marginTop: 4, fontSize: 14, opacity: 0.85 }}>{c.role}</p>
                </Link>
              );
            })}
          </div>

          <h2>CYCLE FRAMING</h2>
          <p className="body">{s.cycleLength}</p>

          <h2>RESEARCH NOTE</h2>
          <p className="body">{s.protocolNote}</p>

          <h2>SOURCED FROM PEPPU LABS</h2>
          <p className="body" style={{ marginBottom: 14 }}>
            Each component is available individually as research-grade material at Peppu Studio · ≥99% purity · per-batch CoA. For laboratory research use only. No human dose is recommended.
          </p>
          <a className="back" style={{ fontFamily: "var(--font-pixel)", fontSize: 10, padding: "10px 14px", color: "var(--paper)", textDecoration: "none", background: "var(--ink)" }}
            href={`https://peppu.studio?utm_source=peppudex&utm_medium=stack&utm_campaign=${s.slug}`} target="_blank" rel="noopener noreferrer">
            SOURCE COMPONENTS ▶
          </a>
        </article>
      </div>
      <div className="disclaimer-band">© 2026 Peppu Studio LLC · For Laboratory Research Use Only</div>
    </main>
  );
}
