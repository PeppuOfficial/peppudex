import Link from "next/link";
import type { Metadata } from "next";
import { CONDITIONS } from "@/data/conditions";
import { ENRICHMENT } from "@/data/enrichment";

export const metadata: Metadata = {
  title: "Research Conditions · PEPPUDEX",
  description: "Browse research peptides by goal or condition — body composition, tendon repair, skin aging, cognitive performance, longevity, cardiometabolic, and more.",
  alternates: { canonical: "https://peppudex.com/conditions" },
};

export default function ConditionsIndex() {
  const count: Record<string, number> = {};
  for (const slug of Object.keys(ENRICHMENT)) {
    for (const c of ENRICHMENT[slug].conditions) count[c] = (count[c] ?? 0) + 1;
  }
  return (
    <main>
      <div className="header-strip">FOR LABORATORY RESEARCH USE ONLY · NOT FOR HUMAN CONSUMPTION</div>
      <div className="page">
        <div className="brandbar">
          <Link href="/" style={{ background: "var(--ink)", color: "var(--paper)", fontFamily: "var(--font-pixel)", fontSize: 10, padding: "10px 14px", textDecoration: "none", letterSpacing: "0.14em", boxShadow: "3px 3px 0 rgba(0,0,0,0.35)" }}>◀ INDEX</Link>
          <span style={{ fontFamily: "var(--font-pixel)", fontSize: 14, color: "var(--paper)", textShadow: "3px 3px 0 var(--ink)" }}>CONDITIONS</span>
        </div>
        <h1 style={{ fontFamily: "var(--font-pixel)", fontSize: 22, color: "var(--paper)", textShadow: "4px 4px 0 var(--ink)", margin: "12px 0 18px" }}>BROWSE BY GOAL</h1>
        <p className="body" style={{ color: "var(--paper)", margin: "0 0 22px", maxWidth: 720 }}>
          Research peptides indexed by research goal or condition. Click any goal to see all compounds tagged with it.
        </p>
        <section className="grid">
          {CONDITIONS.map((c) => (
            <Link key={c.slug} href={`/conditions/${c.slug}`} className="card">
              <div className="name" style={{ fontSize: 12 }}>{c.name.toUpperCase()}</div>
              <p className="body" style={{ marginTop: 8, fontSize: 16 }}>{c.description}</p>
              <p style={{ fontFamily: "var(--font-pixel)", fontSize: 9, marginTop: 8, opacity: 0.7 }}>
                {count[c.slug] ?? 0} {(count[c.slug] ?? 0) === 1 ? "ENTRY" : "ENTRIES"}
              </p>
            </Link>
          ))}
        </section>
      </div>
      <div className="disclaimer-band">© 2026 Peppu Studio LLC · For Laboratory Research Use Only</div>
    </main>
  );
}
