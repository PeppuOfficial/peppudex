import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Use · PEPPUDEX",
  description: "PEPPUDEX terms of use. Research use only, 21+, US-only, AAA arbitration. Published by Peppu Studio LLC.",
  alternates: { canonical: "https://peppudex.com/terms-of-use" },
};

export default function TermsOfUse() {
  return (
    <main>
      <div className="header-strip">FOR LABORATORY RESEARCH USE ONLY · NOT FOR HUMAN CONSUMPTION</div>
      <div className="page">
        <div className="brandbar">
          <Link href="/" style={{ background: "var(--ink)", color: "var(--paper)", fontFamily: "var(--font-pixel)", fontSize: 10, padding: "10px 14px", textDecoration: "none", letterSpacing: "0.14em" }}>◀ INDEX</Link>
          <span style={{ fontFamily: "var(--font-pixel)", fontSize: 14, color: "var(--paper)", textShadow: "3px 3px 0 var(--ink)" }}>TERMS OF USE</span>
        </div>

        <article className="detail">
          <h1>TERMS OF USE</h1>
          <p className="body" style={{ marginTop: 12 }}><strong>Effective date · 2026-05-19</strong></p>

          <h2>ACCEPTANCE</h2>
          <p className="body">By using PEPPUDEX (peppudex.com) you agree to these Terms of Use. If you do not agree, you must not use the site.</p>

          <h2>ELIGIBILITY</h2>
          <p className="body">You must be 21 years or older. The site is intended for laboratory researchers and adults in jurisdictions where research-grade peptide content is legal. You represent that your use complies with all applicable laws in your jurisdiction.</p>

          <h2>RESEARCH USE ONLY</h2>
          <p className="body">All content on PEPPUDEX is for laboratory research use only. Nothing on the site is medical advice. See <Link href="/medical-disclaimer" style={{ color: "var(--ink)" }}>/medical-disclaimer</Link>.</p>

          <h2>NO LIABILITY</h2>
          <p className="body">PEPPUDEX content is provided AS-IS without warranty of any kind, express or implied. Peppu Studio LLC, its members, officers, and contributors disclaim all liability for any direct or indirect damages arising from use of the site or from any decision made in reliance on site content.</p>

          <h2>INTELLECTUAL PROPERTY</h2>
          <p className="body">Site content (text, evidence-grade rubric, FAQ writing) is copyright Peppu Studio LLC unless otherwise noted. Third-party citations are linked to primary literature. The PEPPUDEX name, Pokedex-style card design, and Peppu trademarks are the property of Peppu Studio LLC.</p>

          <h2>USER CONDUCT</h2>
          <p className="body">You may not: scrape the site at unreasonable rates, attempt to circumvent rate limits or security controls, copy substantial portions of site content for republication without permission, or use the site to facilitate illegal activity in your jurisdiction.</p>

          <h2>EXTERNAL LINKS</h2>
          <p className="body">PEPPUDEX links to PubMed, ClinicalTrials.gov, FDA, WADA, manufacturer pages, and other third-party sites. We do not control external content and are not responsible for it.</p>

          <h2>PUBLISHER</h2>
          <p className="body">PEPPUDEX is published by Peppu Studio LLC, organized under the U.S. state of Wyoming.</p>

          <h2>GEOGRAPHIC SCOPE</h2>
          <p className="body">The site is intended for use within the United States. Buyers outside the U.S. are responsible for verifying local legality before accessing or transacting on any linked storefront.</p>

          <h2>GOVERNING LAW</h2>
          <p className="body">These Terms are governed by the laws of the U.S. state of Wyoming, without regard to conflict-of-law principles.</p>

          <h2>DISPUTE RESOLUTION</h2>
          <p className="body">Any dispute arising from these Terms or use of the site will be resolved by binding individual arbitration administered by the American Arbitration Association (AAA) under its Commercial Arbitration Rules. Arbitration will take place in Wyoming. Class-action arbitration is waived to the extent permitted by law. Either party may seek injunctive relief in court for IP claims.</p>

          <h2>CHANGES</h2>
          <p className="body">We may update these Terms. The effective date reflects the latest revision. Continued use after a revision constitutes acceptance.</p>

          <h2>CONTACT</h2>
          <p className="body">Questions · <a href="mailto:legal@peppu.studio" style={{ color: "var(--ink)" }}>legal@peppu.studio</a>.</p>
        </article>

        <footer className="footer">PEPPUDEX · <Link href="/">INDEX</Link></footer>
      </div>
      <div className="disclaimer-band">© 2026 Peppu Studio LLC · For Laboratory Research Use Only</div>
    </main>
  );
}
