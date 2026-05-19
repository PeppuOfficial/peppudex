import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Research Process · Evidence Grading Rubric · PEPPUDEX",
  description: "PEPPUDEX uses an A-F evidence grading rubric modeled on Examine.com. Grade A requires multiple high-quality RCTs. Grade F means no credible evidence.",
  alternates: { canonical: "https://peppudex.com/about/research-process" },
};

const GRADES = [
  { grade: "A", label: "Strong human evidence", criteria: "Multiple high-quality human RCTs with large sample sizes, consistent direction of effect, peer-reviewed in major journals (NEJM, Lancet, JAMA, Cell). Mechanism well-characterized." },
  { grade: "B", label: "Moderate evidence", criteria: "Small human studies (Phase 1/2, pilot RCTs) OR strong, reproducible animal evidence with translational plausibility. Mechanism understood. May lack long-term safety data." },
  { grade: "C", label: "Early / preclinical", criteria: "Preclinical mechanism plus early-stage human data (Phase 1, case series, or open-label pilots). Heterogeneous results across small trials. Translation to clinical outcomes uncertain." },
  { grade: "D", label: "Anecdotal / single source", criteria: "Anecdotal reports, a single isolated study, or mechanism-only speculation without human or robust animal validation. Cited but never weighted as evidence for a claim." },
];

export default function ResearchProcess() {
  return (
    <main>
      <div className="header-strip">FOR LABORATORY RESEARCH USE ONLY · NOT FOR HUMAN CONSUMPTION</div>
      <div className="page">
        <div className="brandbar">
          <Link href="/about" style={{ background: "var(--ink)", color: "var(--paper)", fontFamily: "var(--font-pixel)", fontSize: 10, padding: "10px 14px", textDecoration: "none", letterSpacing: "0.14em" }}>◀ ABOUT</Link>
          <span style={{ fontFamily: "var(--font-pixel)", fontSize: 14, color: "var(--paper)", textShadow: "3px 3px 0 var(--ink)" }}>RESEARCH PROCESS</span>
        </div>

        <article className="detail">
          <h1>RESEARCH PROCESS</h1>
          <p className="body" style={{ marginTop: 12 }}>Every PEPPUDEX compound page carries evidence grades A through D per outcome. This page documents the rubric. The system is modeled on the Examine.com supplement-research grading framework and adapted for peptide pharmacology.</p>

          <h2>EVIDENCE GRADING RUBRIC</h2>
          <p className="body">Each outcome is graded separately. A compound can be Grade A on body-weight reduction and Grade C on long-term safety simultaneously. Grades reflect study quality, not the size of the marketing budget behind the molecule.</p>

          <div style={{ display: "grid", gap: 12, marginTop: 14 }}>
            {GRADES.map((g) => (
              <div key={g.grade} className="move">
                <div className="row">
                  <span>▶ GRADE {g.grade} · {g.label}</span>
                </div>
                <p className="desc">{g.criteria}</p>
              </div>
            ))}
          </div>

          <h2>SOURCE HIERARCHY</h2>
          <ol style={{ paddingLeft: 24 }}>
            <li className="body" style={{ marginTop: 8 }}>Phase 3 RCTs with PMIDs (highest weight)</li>
            <li className="body" style={{ marginTop: 8 }}>Phase 2 RCTs</li>
            <li className="body" style={{ marginTop: 8 }}>Meta-analyses + systematic reviews</li>
            <li className="body" style={{ marginTop: 8 }}>Single-arm clinical trials</li>
            <li className="body" style={{ marginTop: 8 }}>Animal-model studies (preclinical)</li>
            <li className="body" style={{ marginTop: 8 }}>In-vitro mechanistic studies</li>
            <li className="body" style={{ marginTop: 8 }}>Case reports + anecdote (cited but not weighted as evidence)</li>
          </ol>

          <h2>CITATION REQUIREMENTS</h2>
          <p className="body">Every evidence claim must cite either a PubMed PMID, a ClinicalTrials.gov NCT, or a peer-reviewed journal article DOI. Anecdotal information is allowed only in clearly-marked FAQ entries with a Grade D label.</p>

          <h2>REVIEW CADENCE</h2>
          <p className="body">Each compound page is reviewed every 90 days. The &ldquo;Last Updated&rdquo; date at the top of each page reflects the most recent fact-check. Reviewers are listed at <Link href="/reviewers" style={{ color: "var(--ink)" }}>/reviewers</Link>.</p>

          <h2>CORRECTIONS</h2>
          <p className="body">Errors are corrected within 7 days of substantiated report. The correction is logged with date + reason at the bottom of the compound page. Report errors to <a href="mailto:corrections@peppu.studio" style={{ color: "var(--ink)" }}>corrections@peppu.studio</a>.</p>
        </article>

        <footer className="footer">
          PEPPUDEX · <Link href="/">INDEX</Link> · <a href="https://peppu.studio">PEPPU STUDIO</a>
        </footer>
      </div>
      <div className="disclaimer-band">© 2026 Peppu Studio LLC · For Laboratory Research Use Only</div>
    </main>
  );
}
