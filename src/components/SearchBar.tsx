"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { PEPPUDEX } from "@/data/peppudex";
import { ENRICHMENT } from "@/data/enrichment";

interface SearchResult {
  slug: string;
  name: string;
  why: string;
  card?: string;
}

function buildIndex(): SearchResult[] {
  return PEPPUDEX.map((c) => {
    const enr = ENRICHMENT[c.slug];
    const aliases = enr?.aliases ?? [];
    const mechanisms = enr?.mechanisms ?? [];
    const types = c.types ?? [];
    const why = [c.tagline, ...aliases, ...mechanisms, ...types].filter(Boolean).join(" · ");
    return { slug: c.slug, name: c.name, why, card: c.card };
  });
}

const INDEX: SearchResult[] = buildIndex();

function score(query: string, r: SearchResult): number {
  const q = query.toLowerCase().trim();
  if (!q) return 0;
  const nameLower = r.name.toLowerCase();
  const whyLower = r.why.toLowerCase();
  const slugLower = r.slug.toLowerCase();

  let s = 0;
  if (nameLower === q) s += 100;
  if (slugLower === q) s += 100;
  if (nameLower.startsWith(q)) s += 50;
  if (slugLower.startsWith(q)) s += 40;
  if (nameLower.includes(q)) s += 20;
  if (slugLower.includes(q)) s += 15;
  if (whyLower.includes(q)) s += 10;
  return s;
}

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    if (!query.trim()) return [] as SearchResult[];
    return INDEX
      .map((r) => ({ r, s: score(query, r) }))
      .filter((x) => x.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 8)
      .map((x) => x.r);
  }, [query]);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  return (
    <div className="peppudex-search" ref={wrapRef}>
      <input
        type="search"
        placeholder="SEARCH 27 PEPTIDES · BPC-157, GHK-Cu, RETA..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        aria-label="Search the peptide pokedex"
      />
      {open && results.length > 0 && (
        <ul className="peppudex-search-results" role="listbox">
          {results.map((r) => (
            <li key={r.slug}>
              <Link href={`/peptides/${r.slug}`} onClick={() => setOpen(false)}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {r.card && (
                  <img src={r.card} alt="" width={32} height={56} aria-hidden="true" />
                )}
                <span className="r-name">{r.name}</span>
                <span className="r-why">{r.why}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
