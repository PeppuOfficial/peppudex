/**
 * Bulbapedia-pattern auto-linker.
 *
 * Scans body prose for compound names + aliases and converts the FIRST
 * occurrence per article into a Link to the canonical compound page.
 *
 * Single-pass, word-boundary regex. First-occurrence-only to avoid link spam.
 * Falls back to plain text if no match.
 */
import Link from "next/link";
import { Fragment } from "react";
import { PEPPUDEX } from "@/data/peppudex";
import { ENRICHMENT } from "@/data/enrichment";

interface LinkEntry {
  slug: string;
  patterns: string[];
}

function buildLinkMap(): LinkEntry[] {
  return PEPPUDEX.map((p) => {
    const aliases = ENRICHMENT[p.slug]?.aliases ?? [];
    return {
      slug: p.slug,
      patterns: [p.name, ...aliases].filter(Boolean),
    };
  });
}

const LINK_MAP = buildLinkMap();

function escapeRegex(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Replace first occurrence of each compound name/alias with a Link.
 * Returns JSX fragments interleaving plain text with anchor elements.
 */
export function autoLink(text: string, currentSlug?: string): React.ReactNode {
  if (!text) return text;

  // Sort patterns by length (longest first) so "BPC-157" matches before "BPC"
  const candidates: { slug: string; pattern: string }[] = [];
  for (const { slug, patterns } of LINK_MAP) {
    if (slug === currentSlug) continue; // don't self-link
    for (const p of patterns) {
      candidates.push({ slug, pattern: p });
    }
  }
  candidates.sort((a, b) => b.pattern.length - a.pattern.length);

  const used = new Set<string>(); // first-occurrence-only per slug
  const segments: { type: "text" | "link"; content: string; slug?: string }[] = [
    { type: "text", content: text },
  ];

  for (const { slug, pattern } of candidates) {
    if (used.has(slug)) continue;
    const re = new RegExp(`\\b${escapeRegex(pattern)}\\b`, "i");
    for (let i = 0; i < segments.length; i++) {
      const seg = segments[i];
      if (seg.type !== "text") continue;
      const m = seg.content.match(re);
      if (!m || m.index === undefined) continue;
      const before = seg.content.slice(0, m.index);
      const matched = seg.content.slice(m.index, m.index + m[0].length);
      const after = seg.content.slice(m.index + m[0].length);
      const replacement: typeof segments = [];
      if (before) replacement.push({ type: "text", content: before });
      replacement.push({ type: "link", content: matched, slug });
      if (after) replacement.push({ type: "text", content: after });
      segments.splice(i, 1, ...replacement);
      used.add(slug);
      break;
    }
  }

  return (
    <>
      {segments.map((s, i) =>
        s.type === "link" ? (
          <Link key={i} href={`/peptides/${s.slug}`} style={{ color: "var(--ink)", textDecoration: "underline" }}>
            {s.content}
          </Link>
        ) : (
          <Fragment key={i}>{s.content}</Fragment>
        )
      )}
    </>
  );
}
