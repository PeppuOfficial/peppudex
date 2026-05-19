import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Editorial Reviewers · PEPPUDEX",
  description: "PEPPUDEX editorial reviewers. Every compound page is reviewed before publication and every 90 days thereafter.",
  alternates: { canonical: "https://peppudex.com/reviewers" },
};

interface Reviewer {
  slug: string;
  name: string;
  role: string;
  bio: string;
}

const REVIEWERS: Reviewer[] = [
  {
    slug: "editorial-board",
    name: "Peppu Studio Research Desk",
    role: "Editorial Board · Peppu Studio Research Desk",
    bio: "Composite editorial team currently signing off PEPPUDEX content. We are actively recruiting an individually-named PharmD or MD reviewer to take over compound-level sign-off · pending Q3 2026. Until then, content is reviewed by the desk against the rubric documented at /about/research-process.",
  },
];

export default function Reviewers() {
  return (
    <main>
      <div className="header-strip">FOR LABORATORY RESEARCH USE ONLY · NOT FOR HUMAN CONSUMPTION</div>
      <div className="page">
        <div className="brandbar">
          <Link href="/" style={{ background: "var(--ink)", color: "var(--paper)", fontFamily: "var(--font-pixel)", fontSize: 10, padding: "10px 14px", textDecoration: "none", letterSpacing: "0.14em" }}>◀ INDEX</Link>
          <span style={{ fontFamily: "var(--font-pixel)", fontSize: 14, color: "var(--paper)", textShadow: "3px 3px 0 var(--ink)" }}>REVIEWERS</span>
        </div>

        <article className="detail">
          <h1>EDITORIAL REVIEWERS</h1>
          <p className="body" style={{ marginTop: 12 }}>Every compound page on PEPPUDEX is reviewed before publication and every 90 days thereafter. Reviewers sign off against the rubric at <Link href="/about/research-process" style={{ color: "var(--ink)" }}>/about/research-process</Link>.</p>

          <h2>CURRENT REVIEWERS</h2>
          <div style={{ display: "grid", gap: 16, marginTop: 14 }}>
            {REVIEWERS.map((r) => (
              <Link key={r.slug} href={`/reviewers/${r.slug}`} className="stack-card">
                <p style={{ fontFamily: "var(--font-pixel)", fontSize: 10, letterSpacing: "0.14em", opacity: 0.6 }}>REVIEWER</p>
                <p style={{ fontFamily: "var(--font-pixel)", fontSize: 14, marginTop: 6 }}>{r.name}</p>
                <p style={{ fontFamily: "var(--font-pixel)", fontSize: 9, marginTop: 4, opacity: 0.7 }}>{r.role.toUpperCase()}</p>
                <p className="body" style={{ marginTop: 8 }}>{r.bio}</p>
              </Link>
            ))}
          </div>

          <h2>REVIEWER RECRUITMENT</h2>
          <p className="body">We are actively seeking an individually-named PharmD, PhD, or MD reviewer with peptide pharmacology expertise to take over compound-level sign-off. Compensation per page negotiable. Contact <a href="mailto:editorial@peppu.studio" style={{ color: "var(--ink)" }}>editorial@peppu.studio</a> with CV + writing samples.</p>
        </article>

        <footer className="footer">PEPPUDEX · <Link href="/">INDEX</Link></footer>
      </div>
      <div className="disclaimer-band">© 2026 Peppu Studio LLC · For Laboratory Research Use Only</div>
    </main>
  );
}
