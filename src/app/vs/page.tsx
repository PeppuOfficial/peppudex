import Link from "next/link";
import type { Metadata } from "next";
import { COMPARISONS } from "@/data/comparisons";
import { PEPPUDEX } from "@/data/peppudex";

export const metadata: Metadata = {
  title: "Compound Comparisons · PEPPUDEX",
  description: "Head-to-head comparisons of research peptides · BPC-157 vs TB-500, retatrutide vs tirzepatide, selank vs semax, GHK-Cu vs TB-500, and more.",
  alternates: { canonical: "https://peppudex.com/vs" },
};

export default function VsIndex() {
  const name = (slug: string) => PEPPUDEX.find((p) => p.slug === slug)?.name ?? slug.toUpperCase();
  return (
    <main>
      <div className="header-strip">FOR LABORATORY RESEARCH USE ONLY · NOT FOR HUMAN CONSUMPTION</div>
      <div className="page">
        <div className="brandbar">
          <Link href="/" style={{ background: "var(--ink)", color: "var(--paper)", fontFamily: "var(--font-pixel)", fontSize: 10, padding: "10px 14px", textDecoration: "none", letterSpacing: "0.14em", boxShadow: "3px 3px 0 rgba(0,0,0,0.35)" }}>◀ INDEX</Link>
          <span style={{ fontFamily: "var(--font-pixel)", fontSize: 14, color: "var(--paper)", textShadow: "3px 3px 0 var(--ink)" }}>VS / COMPARE</span>
        </div>
        <h1 style={{ fontFamily: "var(--font-pixel)", fontSize: 22, color: "var(--paper)", textShadow: "4px 4px 0 var(--ink)", margin: "12px 0 18px" }}>HEAD-TO-HEAD</h1>
        <p className="body" style={{ color: "var(--paper)", margin: "0 0 22px", maxWidth: 720 }}>
          Side-by-side comparisons of the most-asked research peptide pairings. Mechanism, half-life, evidence grade, stacking notes, and a per-goal verdict.
        </p>
        <section className="stack-grid">
          {COMPARISONS.map((c) => (
            <Link key={c.slug} href={`/vs/${c.slug}`} className="stack-card">
              <p style={{ fontFamily: "var(--font-pixel)", fontSize: 10, letterSpacing: "0.14em", opacity: 0.6 }}>COMPARE</p>
              <p style={{ fontFamily: "var(--font-pixel)", fontSize: 14, marginTop: 6 }}>{name(c.a)} <span style={{ color: "#c0392b" }}>vs</span> {name(c.b)}</p>
              <p className="body" style={{ marginTop: 8 }}>{c.verdict.slice(0, 160)}...</p>
            </Link>
          ))}
        </section>
      </div>
      <div className="disclaimer-band">© 2026 Peppu Studio LLC · For Laboratory Research Use Only</div>
    </main>
  );
}
