import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy · PEPPUDEX",
  description: "PEPPUDEX privacy policy. What data we collect, how we use it, GDPR/CCPA rights, cookie practice. Published by Peppu Studio LLC.",
  alternates: { canonical: "https://peppudex.com/privacy-policy" },
};

export default function PrivacyPolicy() {
  return (
    <main>
      <div className="header-strip">FOR LABORATORY RESEARCH USE ONLY · NOT FOR HUMAN CONSUMPTION</div>
      <div className="page">
        <div className="brandbar">
          <Link href="/" style={{ background: "var(--ink)", color: "var(--paper)", fontFamily: "var(--font-pixel)", fontSize: 10, padding: "10px 14px", textDecoration: "none", letterSpacing: "0.14em" }}>◀ INDEX</Link>
          <span style={{ fontFamily: "var(--font-pixel)", fontSize: 14, color: "var(--paper)", textShadow: "3px 3px 0 var(--ink)" }}>PRIVACY POLICY</span>
        </div>

        <article className="detail">
          <h1>PRIVACY POLICY</h1>
          <p className="body" style={{ marginTop: 12 }}><strong>Effective date · 2026-05-19</strong></p>

          <h2>WHO WE ARE</h2>
          <p className="body">PEPPUDEX is operated by Peppu Studio LLC. Contact · <a href="mailto:privacy@peppu.studio" style={{ color: "var(--ink)" }}>privacy@peppu.studio</a>.</p>

          <h2>WHAT WE COLLECT</h2>
          <p className="body">PEPPUDEX is a static research-reference site and collects minimal personal data.</p>
          <ul>
            <li>Standard server log data (IP, user-agent, referrer, timestamp) for security and analytics, retained 30 days.</li>
            <li>No account creation, no purchase flow, no personally identifying data form.</li>
            <li>Calculator input (vial mg, BAC mL, target dose) is processed client-side only and never transmitted to our servers.</li>
          </ul>

          <h2>COOKIES</h2>
          <p className="body">PEPPUDEX does not set first-party tracking cookies. Vercel may set a small number of operational cookies for routing and performance. No third-party advertising cookies are used. No Facebook pixel.</p>

          <h2>ANALYTICS</h2>
          <p className="body">We use Vercel Analytics and Vercel Speed Insights to measure aggregate site performance (page views, route latency, Core Web Vitals). These services are privacy-friendly by design and do not require a cookie banner under EU guidance. We do not run Google Analytics. Microsoft Clarity may be added in the future for heat-map debugging. If added, it will be disclosed here and respects Do-Not-Track signals.</p>

          <h2>NO PII SALE</h2>
          <p className="body">We do not sell, rent, or otherwise transfer personal information to any third party for marketing or advertising purposes. We never have, and the business model does not depend on it.</p>

          <h2>GDPR / UK GDPR RIGHTS</h2>
          <p className="body">If you are in the EU or UK, you have the right to access, correct, port, or delete personal data we hold about you. Because the site collects minimal personal data, most requests will return &ldquo;no record found.&rdquo; Contact <a href="mailto:privacy@peppu.studio" style={{ color: "var(--ink)" }}>privacy@peppu.studio</a> for any request.</p>
          <p className="body">Legal basis for processing the limited server-log data is &ldquo;legitimate interest&rdquo; (Article 6(1)(f)) for security monitoring.</p>

          <h2>CCPA / CPRA RIGHTS</h2>
          <p className="body">California residents have the right to know what personal information we collect, the right to delete it, and the right to opt out of sale. We do not sell personal information. Contact <a href="mailto:privacy@peppu.studio" style={{ color: "var(--ink)" }}>privacy@peppu.studio</a> for any request.</p>

          <h2>CHILDREN</h2>
          <p className="body">PEPPUDEX is not directed at children under 18. We do not knowingly collect data from anyone under 18.</p>

          <h2>CHANGES TO THIS POLICY</h2>
          <p className="body">We will update this policy as the site evolves. The effective date at the top reflects the most recent revision.</p>

          <h2>CONTACT</h2>
          <p className="body">Privacy questions or rights requests · <a href="mailto:privacy@peppu.studio" style={{ color: "var(--ink)" }}>privacy@peppu.studio</a>.</p>
        </article>

        <footer className="footer">PEPPUDEX · <Link href="/">INDEX</Link></footer>
      </div>
      <div className="disclaimer-band">© 2026 Peppu Studio LLC · For Laboratory Research Use Only</div>
    </main>
  );
}
