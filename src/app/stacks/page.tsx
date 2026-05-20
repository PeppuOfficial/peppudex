import Link from "next/link";
import type { Metadata } from "next";
import { STACKS } from "@/data/stacks";

export const metadata: Metadata = {
  title: "Peptide Stack Chart · 6 Research Peptide Stacks + Dosing Protocols · Peppudex",
  description: "Peptide stack chart with mechanism notes for recovery, fat loss, muscle growth, anti-aging. Wolverine (BPC-157+TB-500), GLOW, KLOW, CJC-1295+Ipamorelin. Component breakdowns + evidence grades.",
  alternates: { canonical: "https://peppudex.com/stacks" },
  openGraph: {
    title: "Peptide Stack Chart · 6 Research Peptide Stacks",
    description: "Stack chart for healing, fat loss, muscle, longevity. Component math + evidence grades + peer-reviewed sources.",
    type: "website",
    url: "https://peppudex.com/stacks",
  },
};

export default function StacksIndex() {
  return (
    <main>
      <div className="header-strip">FOR LABORATORY RESEARCH USE ONLY · NOT FOR HUMAN CONSUMPTION</div>
      <div className="page">
        <div className="brandbar">
          <Link href="/" style={{ background: "var(--ink)", color: "var(--paper)", fontFamily: "var(--font-pixel)", fontSize: 10, padding: "10px 14px", textDecoration: "none", letterSpacing: "0.14em", boxShadow: "3px 3px 0 rgba(0,0,0,0.35)" }}>◀ INDEX</Link>
          <span style={{ fontFamily: "var(--font-pixel)", fontSize: 14, color: "var(--paper)", textShadow: "3px 3px 0 var(--ink)" }}>STACKS</span>
        </div>
        <h1 style={{ fontFamily: "var(--font-pixel)", fontSize: 22, color: "var(--paper)", textShadow: "4px 4px 0 var(--ink)", margin: "12px 0 8px" }}>PEPTIDE STACK CHART</h1>
        <p style={{ fontFamily: "var(--font-pixel)", fontSize: 11, color: "var(--paper)", letterSpacing: "0.14em", margin: "0 0 18px", opacity: 0.85 }}>
          6 RESEARCH PEPTIDE STACKS · DOSING NOTES + EVIDENCE GRADES
        </p>
        <p className="body" style={{ color: "var(--paper)", margin: "0 0 22px", maxWidth: 720 }}>
          Curated multi-compound research stack chart. Each page details the component rationale, per-component literature, cycle framing, and the limits of what published research supports. Named stacks include Wolverine (BPC-157 + TB-500), GLOW, KLOW, GH-axis CJC-1295 + Ipamorelin and the metabolic MOTS-c + Tesofensine reference. Mechanistic only · no human-dose recommendations.
        </p>
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
      </div>
      <div className="disclaimer-band">© 2026 Peppu Studio LLC · For Laboratory Research Use Only</div>
    </main>
  );
}
