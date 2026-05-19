import Link from "next/link";
import type { Metadata } from "next";
import { MECHANISMS } from "@/data/mechanisms";
import { PEPPUDEX } from "@/data/peppudex";
import { ENRICHMENT } from "@/data/enrichment";

export const metadata: Metadata = {
  title: "Mechanism Categories · PEPPUDEX",
  description: "Browse research peptides by mechanism — incretin axis, GH-axis, tissue repair, cytoprotection, nootropic, longevity, and more. Bidirectional index linking every compound to its receptor pharmacology.",
  alternates: { canonical: "https://peppudex.com/mechanisms" },
};

export default function MechanismsIndex() {
  // count compounds per mechanism
  const count: Record<string, number> = {};
  for (const slug of Object.keys(ENRICHMENT)) {
    for (const m of ENRICHMENT[slug].mechanisms) count[m] = (count[m] ?? 0) + 1;
  }

  return (
    <main>
      <div className="header-strip">FOR LABORATORY RESEARCH USE ONLY · NOT FOR HUMAN CONSUMPTION</div>
      <div className="page">
        <div className="brandbar">
          <Link href="/" style={{ background: "var(--ink)", color: "var(--paper)", fontFamily: "var(--font-pixel)", fontSize: 10, padding: "10px 14px", textDecoration: "none", letterSpacing: "0.14em", boxShadow: "3px 3px 0 rgba(0,0,0,0.35)" }}>◀ INDEX</Link>
          <span style={{ fontFamily: "var(--font-pixel)", fontSize: 14, color: "var(--paper)", textShadow: "3px 3px 0 var(--ink)" }}>MECHANISMS</span>
        </div>

        <h1 style={{ fontFamily: "var(--font-pixel)", fontSize: 22, color: "var(--paper)", textShadow: "4px 4px 0 var(--ink)", margin: "12px 0 18px" }}>BROWSE BY MECHANISM</h1>

        <p className="body" style={{ color: "var(--paper)", margin: "0 0 22px", maxWidth: 720 }}>
          Every PEPPUDEX compound is tagged to the receptor systems and pathways it engages. Click a mechanism to see all peptides studied for that pathway.
        </p>

        <section className="grid">
          {MECHANISMS.map((m) => (
            <Link key={m.slug} href={`/mechanisms/${m.slug}`} className="card" style={{ background: m.color, color: "var(--ink)" }}>
              <div className="name" style={{ fontSize: 14 }}>{m.shortName.toUpperCase()}</div>
              <p className="body" style={{ marginTop: 8, fontSize: 16 }}>{m.description}</p>
              <p style={{ fontFamily: "var(--font-pixel)", fontSize: 9, marginTop: 8, opacity: 0.7 }}>
                {count[m.slug] ?? 0} {(count[m.slug] ?? 0) === 1 ? "ENTRY" : "ENTRIES"}
              </p>
            </Link>
          ))}
        </section>
      </div>
      <div className="disclaimer-band">© 2026 Peppu Studio LLC · For Laboratory Research Use Only</div>
    </main>
  );
}
