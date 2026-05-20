"use client";

import { useEffect, useState } from "react";

type Section = { id: string; label: string };

type Props = {
  sections: Section[];
};

/**
 * Sticky table-of-contents · desktop-only (>= 1024px). On scroll the active
 * section highlights using IntersectionObserver. Mobile gets the existing
 * collapsible-section flow with no ToC overlay. Anchored to a series of
 * `id`'d h2's in the detail page · we render the same id strings the page
 * passes here so the two stay in lockstep.
 */
export function TableOfContents({ sections }: Props) {
  const [activeId, setActiveId] = useState<string | null>(sections[0]?.id ?? null);

  useEffect(() => {
    if (typeof window === "undefined" || sections.length === 0) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio - a.intersectionRatio))[0];
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-100px 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [sections]);

  if (sections.length === 0) return null;

  return (
    <nav
      aria-label="On this page"
      className="peptide-toc"
    >
      <p className="peptide-toc__label">▶ ON THIS PAGE</p>
      <ul className="peptide-toc__list">
        {sections.map((s) => (
          <li key={s.id}>
            <a
              href={"#" + s.id}
              className={"peptide-toc__link" + (activeId === s.id ? " is-active" : "")}
              onClick={(e) => {
                const el = document.getElementById(s.id);
                if (!el) return;
                e.preventDefault();
                el.scrollIntoView({ behavior: "smooth", block: "start" });
                history.replaceState(null, "", "#" + s.id);
              }}
            >
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
