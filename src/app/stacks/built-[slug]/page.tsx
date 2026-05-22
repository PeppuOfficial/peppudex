import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PEPPUDEX } from "@/data/peppudex";
import { ENRICHMENT } from "@/data/enrichment";
import { getSupabaseAdmin } from "@/lib/supabase-server";
import { storefrontProductUrl } from "@/lib/storefront-map";

/**
 * GET /stacks/built-<slug> · render a user-assembled compound stack.
 *
 * Server component · fetches the row by slug, emits a JSON-LD
 * collection wrapping every component as a research compound term and
 * the stack itself as an ItemList. Also bumps `view_count` server
 * side (fire-and-forget; failures do not block the render).
 */

const BASE = "https://peppudex.com";

interface StackRow {
  slug: string;
  compounds_json: string[];
  set_hash: string;
  created_at: string;
  view_count: number;
}

async function fetchStack(slug: string): Promise<StackRow | null> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("peppudex_stacks")
    .select("slug, compounds_json, set_hash, created_at, view_count")
    .eq("slug", slug)
    .maybeSingle();
  if (error || !data) return null;
  return data as StackRow;
}

async function bumpViewCount(slug: string, current: number): Promise<void> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return;
  await supabase
    .from("peppudex_stacks")
    .update({ view_count: current + 1 })
    .eq("slug", slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const row = await fetchStack(slug);
  if (!row) return { title: "Stack not found · PEPPUDEX" };

  const names = row.compounds_json
    .map((s) => PEPPUDEX.find((p) => p.slug === s)?.name ?? s)
    .join(" + ");

  return {
    title: `${names} · Built Stack · PEPPUDEX`,
    description: `User-assembled research peptide stack: ${names}. Component breakdown, mechanism, and primary-literature citations.`,
    alternates: {
      canonical: `${BASE}/stacks/built-${slug}`,
    },
  };
}

export default async function BuiltStackPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const row = await fetchStack(slug);
  if (!row) notFound();

  const components = row.compounds_json
    .map((s) => PEPPUDEX.find((p) => p.slug === s))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  if (components.length === 0) notFound();

  // Fire-and-forget view counter bump.
  bumpViewCount(slug, row.view_count).catch(() => {});

  const url = `${BASE}/stacks/built-${slug}`;
  const names = components.map((c) => c.name).join(" + ");

  // JSON-LD · ItemList wrapping research compound entries.
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${url}#stack`,
    name: `${names} · Built Stack`,
    description: `User-assembled research peptide stack of ${components.length} compounds.`,
    url,
    numberOfItems: components.length,
    itemListElement: components.map((c, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      item: {
        "@type": "DefinedTerm",
        "@id": `${BASE}/peptides/${c.slug}#substance`,
        name: c.name,
        url: `${BASE}/peptides/${c.slug}`,
        description: c.mechanism,
      },
    })),
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "PEPPUDEX",
        item: BASE,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Stacks",
        item: `${BASE}/stacks`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: names,
        item: url,
      },
    ],
  };

  return (
    <main>
      <div className="header-strip">
        FOR LABORATORY RESEARCH USE ONLY · NOT FOR HUMAN CONSUMPTION
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumb),
        }}
      />

      <div className="page">
        <div className="brandbar">
          <Link
            href="/tools/stack-builder"
            style={{
              background: "var(--ink)",
              color: "var(--paper)",
              fontFamily: "var(--font-pixel)",
              fontSize: 10,
              padding: "10px 14px",
              textDecoration: "none",
              letterSpacing: "0.14em",
              boxShadow: "3px 3px 0 rgba(0,0,0,0.35)",
            }}
          >
            ◀ BUILD ANOTHER
          </Link>
          <span
            style={{
              fontFamily: "var(--font-pixel)",
              fontSize: 14,
              color: "var(--paper)",
              textShadow: "3px 3px 0 var(--ink)",
            }}
          >
            PEPPU<span style={{ color: "#FFE680" }}>DEX</span>
          </span>
        </div>

        <article className="detail" style={{ paddingTop: 12 }}>
          <span
            style={{
              display: "inline-block",
              background: "var(--paper)",
              padding: "6px 14px",
              border: "3px solid var(--ink)",
              fontFamily: "var(--font-pixel)",
              fontSize: 10,
              letterSpacing: "0.14em",
            }}
          >
            BUILT STACK
          </span>
          <h1 style={{ marginTop: 14 }}>{names}</h1>
          <p className="body" style={{ marginTop: 12 }}>
            <strong>Composition · </strong>
            {components.length} compounds ·{" "}
            {components.map((c) => c.name).join(", ")}.
          </p>

          <h2>COMPONENTS</h2>
          <div className="grid">
            {components.map((c) => {
              const enr = ENRICHMENT[c.slug];
              return (
                <Link
                  key={c.slug}
                  href={`/peptides/${c.slug}`}
                  className="card"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="art"
                    src={c.card || "/cards/placeholder.svg"}
                    alt={`${c.name} card`}
                  />
                  <div className="meta">
                    <span>No. {c.id}</span>
                    <span className="hp">HP {c.hp}</span>
                  </div>
                  <div className="name">{c.name}</div>
                  <p
                    className="body"
                    style={{
                      marginTop: 4,
                      fontSize: 14,
                      opacity: 0.85,
                    }}
                  >
                    {enr?.classLabel ?? c.tagline}
                  </p>
                </Link>
              );
            })}
          </div>

          <h2>WHAT THIS STACK MEANS</h2>
          <p className="body">
            Built stacks on PEPPUDEX are user-assembled combinations of
            research compounds with no curated protocol attached. Each
            component links back to its monograph where you can read
            the primary-literature citations, evidence grades, and
            regulatory status. No human dosing schedule is implied or
            recommended.
          </p>

          <h2>MECHANISMS PRESENT</h2>
          <ul>
            {Array.from(
              new Set(
                components.flatMap(
                  (c) => ENRICHMENT[c.slug]?.mechanisms ?? [],
                ),
              ),
            ).map((m) => (
              <li key={m}>
                <Link
                  href={`/mechanisms/${m}`}
                  style={{ color: "var(--ink)" }}
                >
                  {m}
                </Link>
              </li>
            ))}
          </ul>

          <h2>RESEARCH NOTE</h2>
          <p className="body">
            Stacks are persisted to a public collection so the same
            compound set always resolves to the same canonical URL.
            Identical stacks with components in a different order are
            deduplicated. View count on this stack ·{" "}
            {row.view_count + 1}.
          </p>

          <h2>SOURCED FROM PEPPU LABS</h2>
          <p className="body" style={{ marginBottom: 14 }}>
            Each component is available individually as research-grade
            material at Peppu Studio · ≥99% purity · per-batch CoA. For
            laboratory research use only.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {components.map((c) => (
              <a
                key={c.slug}
                className="back"
                style={{
                  fontFamily: "var(--font-pixel)",
                  fontSize: 10,
                  padding: "10px 14px",
                  color: "var(--paper)",
                  textDecoration: "none",
                  background: "var(--ink)",
                }}
                href={storefrontProductUrl(c.slug, "built-stack")}
                target="_blank"
                rel="noopener noreferrer"
              >
                SOURCE {c.name} ▶
              </a>
            ))}
          </div>
        </article>
      </div>
      <div className="disclaimer-band">
        © 2026 Peppu Studio LLC · For Laboratory Research Use Only
      </div>
    </main>
  );
}
