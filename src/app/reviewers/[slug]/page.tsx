import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Reviewer {
  slug: string;
  name: string;
  role: string;
  credentials: string;
  bio: string;
  expertise: string[];
  orcid?: string;
  pubmedAuthor?: string;
  linkedin?: string;
}

const REVIEWERS: Record<string, Reviewer> = {
  "editorial-board": {
    slug: "editorial-board",
    name: "Peppu Studio Research Desk",
    role: "Editorial Board · Composite",
    credentials: "Credentials pending verification. Recruiting individually-named PharmD or MD reviewers · pending Q3 2026.",
    bio: "The Peppu Studio Research Desk is the composite editorial team currently signing off PEPPUDEX content. The desk reads primary PubMed sources first, fact-checks every claim against the linked PMID or NCT, applies the rubric documented at /about/research-process, and posts corrections quarterly. Members are not individually named pending the recruitment of an individually-credentialed PharmD or MD reviewer.",
    expertise: [
      "Peptide pharmacology",
      "Citation verification",
      "Evidence-grade rubric application",
      "FDA/WADA regulatory status tracking",
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(REVIEWERS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const r = REVIEWERS[slug];
  if (!r) return {};
  return {
    title: `${r.name} · ${r.role} · PEPPUDEX Reviewer`,
    description: r.bio.slice(0, 160),
    alternates: { canonical: `https://peppudex.com/reviewers/${slug}` },
  };
}

export default async function ReviewerBio({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const r = REVIEWERS[slug];
  if (!r) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": r.name,
    "url": `https://peppudex.com/reviewers/${r.slug}`,
    "jobTitle": r.role,
    "worksFor": { "@type": "Organization", "name": "Peppu Studio LLC", "url": "https://peppu.studio" },
    "knowsAbout": r.expertise,
    "sameAs": [r.orcid, r.linkedin, r.pubmedAuthor].filter(Boolean),
  };

  return (
    <main>
      <div className="header-strip">FOR LABORATORY RESEARCH USE ONLY · NOT FOR HUMAN CONSUMPTION</div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="page">
        <div className="brandbar">
          <Link href="/reviewers" style={{ background: "var(--ink)", color: "var(--paper)", fontFamily: "var(--font-pixel)", fontSize: 10, padding: "10px 14px", textDecoration: "none", letterSpacing: "0.14em" }}>◀ REVIEWERS</Link>
          <span style={{ fontFamily: "var(--font-pixel)", fontSize: 14, color: "var(--paper)", textShadow: "3px 3px 0 var(--ink)" }}>BIO</span>
        </div>

        <article className="detail">
          <h1>{r.name}</h1>
          <p className="body" style={{ marginTop: 8, opacity: 0.7 }}>{r.role.toUpperCase()}</p>

          <h2>CREDENTIALS</h2>
          <p className="body">{r.credentials}</p>

          <h2>BIO</h2>
          <p className="body">{r.bio}</p>

          <h2>EXPERTISE</h2>
          <ul>
            {r.expertise.map((e) => <li key={e}>{e}</li>)}
          </ul>

          {(r.orcid || r.linkedin || r.pubmedAuthor) && (
            <>
              <h2>ELSEWHERE</h2>
              <ul>
                {r.orcid && <li><a href={r.orcid} target="_blank" rel="noopener noreferrer" style={{ color: "var(--ink)" }}>ORCID profile</a></li>}
                {r.pubmedAuthor && <li><a href={r.pubmedAuthor} target="_blank" rel="noopener noreferrer" style={{ color: "var(--ink)" }}>PubMed author search</a></li>}
                {r.linkedin && <li><a href={r.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: "var(--ink)" }}>LinkedIn</a></li>}
              </ul>
            </>
          )}
        </article>

        <footer className="footer">PEPPUDEX · <Link href="/">INDEX</Link></footer>
      </div>
      <div className="disclaimer-band">© 2026 Peppu Studio LLC · For Laboratory Research Use Only</div>
    </main>
  );
}
