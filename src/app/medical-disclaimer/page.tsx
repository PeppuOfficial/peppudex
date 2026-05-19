import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Medical Disclaimer · Research Use Only · PEPPUDEX",
  description: "All PEPPUDEX content is for laboratory research use only. No medical advice, diagnosis, or treatment. No doctor-patient relationship.",
  alternates: { canonical: "https://peppudex.com/medical-disclaimer" },
};

export default function MedicalDisclaimer() {
  return (
    <main>
      <div className="header-strip">FOR LABORATORY RESEARCH USE ONLY · NOT FOR HUMAN CONSUMPTION</div>
      <div className="page">
        <div className="brandbar">
          <Link href="/" style={{ background: "var(--ink)", color: "var(--paper)", fontFamily: "var(--font-pixel)", fontSize: 10, padding: "10px 14px", textDecoration: "none", letterSpacing: "0.14em" }}>◀ INDEX</Link>
          <span style={{ fontFamily: "var(--font-pixel)", fontSize: 14, color: "var(--paper)", textShadow: "3px 3px 0 var(--ink)" }}>MEDICAL DISCLAIMER</span>
        </div>

        <article className="detail">
          <h1>MEDICAL DISCLAIMER</h1>

          <h2>RESEARCH USE ONLY</h2>
          <p className="body" style={{ marginTop: 12 }}>All content on PEPPUDEX and all material sold via peppu.studio is for laboratory research use only. None of the compounds described are intended for human or veterinary consumption, diagnosis, treatment, cure, or prevention of any disease.</p>

          <h2>NO MEDICAL ADVICE</h2>
          <p className="body">Information on this site is provided for educational reference only. Nothing on the site constitutes medical advice. Reading this site does not create a doctor-patient relationship. Always consult a qualified, licensed medical professional before making any health decision.</p>

          <h2>NO ENDORSEMENT</h2>
          <p className="body">Where this site references FDA-approved drugs (e.g. tirzepatide marketed as Mounjaro), the reference is informational and does not constitute endorsement, recommendation, or off-label use suggestion. Approved medications must be obtained through licensed pharmacies under physician supervision.</p>

          <h2>RISK ACKNOWLEDGEMENT</h2>
          <p className="body">Peptides discussed on this site have varying levels of clinical evidence. Many are investigational or not approved by any regulatory body for human use. Some have known or theoretical adverse effects. Self-administration of unapproved investigational compounds carries serious health risks including but not limited to: contamination, immunogenic reactions, dose-dependent toxicity, drug-drug interactions, and unknown long-term effects.</p>

          <h2>NO AGE 21+ HEALTH CLAIM</h2>
          <p className="body">Site access is restricted to laboratory researchers and adults 21 years or older in jurisdictions where research-grade chemical sales are legal. This is not a recommendation for human dosing. No content on this site should be interpreted as a recommendation, instruction, or protocol for personal use.</p>

          <h2>NOT FDA EVALUATED</h2>
          <p className="body">Statements on this site have not been evaluated by the FDA, EMA, MHRA, or any other regulatory body. The compounds are not intended to diagnose, treat, cure, or prevent any disease.</p>

          <h2>GEOGRAPHIC RESTRICTIONS</h2>
          <p className="body">Research-chemical regulations vary by jurisdiction. The site does not solicit sales in jurisdictions where research-grade peptide sale is restricted. Buyer is responsible for verifying local legality.</p>

          <h2>CONTACT</h2>
          <p className="body">Questions about this disclaimer · <a href="mailto:legal@peppu.studio" style={{ color: "var(--ink)" }}>legal@peppu.studio</a>.</p>
        </article>

        <footer className="footer">PEPPUDEX · <Link href="/">INDEX</Link></footer>
      </div>
      <div className="disclaimer-band">© 2026 Peppu Studio LLC · For Laboratory Research Use Only</div>
    </main>
  );
}
