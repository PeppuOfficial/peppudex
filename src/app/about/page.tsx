import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About PEPPUDEX · Mission, Funding, Conflicts of Interest",
  description: "PEPPUDEX is a research-peptide knowledge base published by Peppu Studio LLC. Mechanism, evidence grades, and citations · no medical advice.",
  alternates: { canonical: "https://peppudex.com/about" },
};

export default function About() {
  return (
    <main>
      <div className="header-strip">FOR LABORATORY RESEARCH USE ONLY · NOT FOR HUMAN CONSUMPTION</div>
      <div className="page">
        <div className="brandbar">
          <Link href="/" style={{ background: "var(--ink)", color: "var(--paper)", fontFamily: "var(--font-pixel)", fontSize: 10, padding: "10px 14px", textDecoration: "none", letterSpacing: "0.14em" }}>◀ INDEX</Link>
          <span style={{ fontFamily: "var(--font-pixel)", fontSize: 14, color: "var(--paper)", textShadow: "3px 3px 0 var(--ink)" }}>ABOUT</span>
        </div>

        <article className="detail">
          <h1>ABOUT PEPPUDEX</h1>
          <p className="body" style={{ marginTop: 12 }}>PEPPUDEX is a research-peptide knowledge base in Pokedex format. Each entry covers one compound: mechanism of action, evidence grades A-F, FAQs, peer-reviewed citations, and links to the underlying primary literature.</p>

          <h2>OUR MISSION</h2>
          <p className="body">Make peer-reviewed peptide research accessible without diluting the science. Every compound page cites primary literature with PubMed PMIDs and ClinicalTrials.gov NCTs. Evidence grades reflect study quality, not commercial interest.</p>

          <h2>METHODOLOGY</h2>
          <p className="body">We aggregate peer-reviewed peptide data. Every compound entry starts with a structured research brief built from PubMed PMIDs, ClinicalTrials.gov NCTs, and journal DOIs. Each claim is paired with a citation before draft. Each draft is then graded against the rubric at <Link href="/about/research-process" style={{ color: "var(--ink)" }}>/about/research-process</Link>. We do not generate evidence. We summarize and grade what the literature already says.</p>

          <h2>PUBLISHER</h2>
          <p className="body">PEPPUDEX is published by Peppu Studio LLC, organized under the laws of the U.S. state of Wyoming. The site is editorially independent from the storefront. Research peptides referenced on the site are available for purchase at peppu.studio, but evidence grades and FAQs are not adjusted to favor inventory.</p>

          <h2>FUNDING TRANSPARENCY</h2>
          <p className="body">PEPPUDEX is self-funded by Peppu Studio LLC. The company derives revenue from research-grade peptide sales at peppu.studio. There is no external investor, no pharmaceutical-company funding, no affiliate-network revenue. The site does not run display ads.</p>

          <h2>CONFLICT OF INTEREST DISCLOSURE</h2>
          <p className="body">Peppu Studio LLC is affiliated with the research-peptide storefront at peppu.studio. Because of that affiliation, we link out to peppu.studio from compound pages and from billboard placements on the index. We present the research neutrally regardless. A compound that we do not stock receives the same coverage as a compound that we do. Evidence grades are anchored to study quality, not to inventory. We do not accept paid placement, sponsored entries, or advertorial. Where a compound is FDA-approved under a branded name (e.g. tirzepatide as Mounjaro and Zepbound), we link to the originator and note the regulatory status. No diagnostic or treatment claims are made.</p>

          <h2>EDITORIAL BOARD</h2>
          <p className="body">Sign-off is currently handled by the Peppu Studio Research Desk, a composite editorial team. We are actively recruiting an individually-named PharmD or MD reviewer to take over compound-level sign-off · pending Q3 2026. The current desk profile lives at <Link href="/reviewers/editorial-board" style={{ color: "var(--ink)" }}>/reviewers/editorial-board</Link>.</p>

          <h2>EDITORIAL STANDARDS</h2>
          <p className="body">See <Link href="/editorial-policy" style={{ color: "var(--ink)" }}>/editorial-policy</Link> for citation requirements, fact-check workflow, and correction policy. See <Link href="/about/research-process" style={{ color: "var(--ink)" }}>/about/research-process</Link> for the evidence-grading rubric.</p>

          <h2>CONTACT</h2>
          <p className="body">Editorial inquiries · <a href="mailto:editorial@peppu.studio" style={{ color: "var(--ink)" }}>editorial@peppu.studio</a>. Corrections · <a href="mailto:corrections@peppu.studio" style={{ color: "var(--ink)" }}>corrections@peppu.studio</a>.</p>

          <h2>RELATED</h2>
          <ul>
            <li><Link href="/editorial-policy" style={{ color: "var(--ink)" }}>Editorial Policy</Link></li>
            <li><Link href="/medical-disclaimer" style={{ color: "var(--ink)" }}>Medical Disclaimer</Link></li>
            <li><Link href="/reviewers" style={{ color: "var(--ink)" }}>Editorial Reviewers</Link></li>
            <li><Link href="/about/research-process" style={{ color: "var(--ink)" }}>Research Process</Link></li>
          </ul>
        </article>

        <footer className="footer">
          PEPPUDEX · <Link href="/">INDEX</Link> · <a href="https://peppu.studio">PEPPU STUDIO</a> · <a href="https://pepputree.com">PEPPUTREE</a>
        </footer>
      </div>
      <div className="disclaimer-band">© 2026 Peppu Studio LLC · For Laboratory Research Use Only</div>
    </main>
  );
}
