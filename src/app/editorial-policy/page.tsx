import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Editorial Policy · Citation Standards, Fact-Check, Corrections · PEPPUDEX",
  description: "PEPPUDEX editorial standards: peer-reviewed citation requirements, 90-day review cadence, 7-day correction policy, no paid placement.",
  alternates: { canonical: "https://peppudex.com/editorial-policy" },
};

export default function EditorialPolicy() {
  return (
    <main>
      <div className="header-strip">FOR LABORATORY RESEARCH USE ONLY · NOT FOR HUMAN CONSUMPTION</div>
      <div className="page">
        <div className="brandbar">
          <Link href="/" style={{ background: "var(--ink)", color: "var(--paper)", fontFamily: "var(--font-pixel)", fontSize: 10, padding: "10px 14px", textDecoration: "none", letterSpacing: "0.14em" }}>◀ INDEX</Link>
          <span style={{ fontFamily: "var(--font-pixel)", fontSize: 14, color: "var(--paper)", textShadow: "3px 3px 0 var(--ink)" }}>EDITORIAL POLICY</span>
        </div>

        <article className="detail">
          <h1>EDITORIAL POLICY</h1>
          <p className="body" style={{ marginTop: 12 }}>PEPPUDEX is editorially independent. This page documents the standards every compound page is held to.</p>

          <h2>SOURCE STANDARDS</h2>
          <p className="body">Every mechanism claim, evidence grade, and FAQ answer must cite a peer-reviewed source. Primary literature with PubMed PMIDs is preferred over secondary sources. Pre-print servers (bioRxiv, medRxiv) may be cited with a clear pre-print flag.</p>

          <h2>FACT-CHECK WORKFLOW</h2>
          <ol style={{ paddingLeft: 24 }}>
            <li className="body" style={{ marginTop: 8 }}>Initial drafts are written from a structured research brief that lists all required citations.</li>
            <li className="body" style={{ marginTop: 8 }}>Citations are verified against PubMed, ClinicalTrials.gov, or journal DOIs at draft time.</li>
            <li className="body" style={{ marginTop: 8 }}>Evidence grades are assigned per outcome by the criteria documented at <Link href="/about/research-process" style={{ color: "var(--ink)" }}>/about/research-process</Link>.</li>
            <li className="body" style={{ marginTop: 8 }}>Editorial reviewer signs off before publication.</li>
            <li className="body" style={{ marginTop: 8 }}>Every page is re-reviewed every 90 days. The &ldquo;Last Updated&rdquo; date reflects the most recent review.</li>
          </ol>

          <h2>CORRECTIONS POLICY</h2>
          <p className="body">Errors substantiated by primary literature are corrected within 7 days of report. Corrections are logged at the bottom of the affected page with date + reason. Material corrections (those changing evidence grade or safety claim) also trigger a sitemap re-ping.</p>
          <p className="body">Report errors to <a href="mailto:corrections@peppu.studio" style={{ color: "var(--ink)" }}>corrections@peppu.studio</a> with a primary-source citation.</p>

          <h2>CONFLICT OF INTEREST</h2>
          <p className="body">PEPPUDEX is published by Peppu Studio LLC, which sells research-grade peptides at peppu.studio. We disclose this commercial relationship on every compound page. Evidence grades are not adjusted to favor inventory: Grade A compounds and Grade D compounds are both listed at full coverage.</p>
          <p className="body">We do not accept paid placement, sponsored entries, or advertorial. Where a compound has FDA-approved brand-name forms (e.g. Mounjaro), we link to manufacturer information and note regulatory status without commercial bias.</p>

          <h2>NO MEDICAL ADVICE</h2>
          <p className="body">PEPPUDEX is a research-grade chemistry reference. No content on this site constitutes medical advice, diagnosis, or treatment recommendation. See <Link href="/medical-disclaimer" style={{ color: "var(--ink)" }}>/medical-disclaimer</Link>.</p>

          <h2>AI USE</h2>
          <p className="body">Drafts may be produced with AI assistance. All claims are human-verified against primary literature before publication. Every page is signed off by a named editorial reviewer.</p>

          <h2>RELATED</h2>
          <ul>
            <li><Link href="/about" style={{ color: "var(--ink)" }}>About</Link></li>
            <li><Link href="/about/research-process" style={{ color: "var(--ink)" }}>Research Process · Evidence Grading</Link></li>
            <li><Link href="/medical-disclaimer" style={{ color: "var(--ink)" }}>Medical Disclaimer</Link></li>
            <li><Link href="/reviewers" style={{ color: "var(--ink)" }}>Editorial Reviewers</Link></li>
          </ul>
        </article>

        <footer className="footer">PEPPUDEX · <Link href="/">INDEX</Link></footer>
      </div>
      <div className="disclaimer-band">© 2026 Peppu Studio LLC · For Laboratory Research Use Only</div>
    </main>
  );
}
