"use client";

/**
 * Client-side half-life chart · recharts horizontal BarChart with
 * category filter (mechanism-based) and shareable result URL.
 *
 * The page wrapper is a server component (for metadata + JSON-LD).
 * This component owns the interactive state.
 */

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

export interface ChartRow {
  slug: string;
  name: string;
  hours: number;
  display: string;
  type: string;
  mechanisms: string[];
}

interface Props {
  rows: ChartRow[];
  categories: { slug: string; name: string }[];
}

/**
 * Pixel-aesthetic palette mapped to mechanism category slug. Falls
 * back to the type-token CSS variable already defined in globals.css.
 */
const CAT_COLOR: Record<string, string> = {
  "incretin-axis":       "#9CCC65",
  "incretin":            "#9CCC65",
  "metabolic":           "#FBC02D",
  "tissue-repair":       "#F06292",
  "cytoprotection":      "#66BB6A",
  "angiogenesis":        "#EF5350",
  "actin-cytoskeleton":  "#7E57C2",
  "skin-matrix":         "#EC407A",
  "longevity":           "#BA68C8",
  "sirtuin-axis":        "#9575CD",
  "mitochondrial-function": "#7E57C2",
  "exercise-mimetic":    "#26A69A",
  "gh-axis":             "#FFB74D",
  "lipolysis":           "#FF8A65",
  "nootropic":           "#4FC3F7",
  "anxiolytic":          "#4DD0E1",
  "gabaergic":           "#80DEEA",
  "neurotrophic":        "#4FC3F7",
  "bdnf-axis":           "#29B6F6",
  "multi-pathway":       "#FF6B9D",
};

function colorFor(row: ChartRow): string {
  for (const m of row.mechanisms) {
    if (CAT_COLOR[m]) return CAT_COLOR[m];
  }
  return "#FFB74D";
}

/** Parse "?compounds=a,b,c" into an ordered slug list. */
function readCompoundsParam(): string[] | null {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  const raw = params.get("compounds");
  if (!raw) return null;
  return raw
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
}

/** Parse "?category=longevity" into a single slug. */
function readCategoryParam(): string | null {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  return params.get("category");
}

export default function HalfLifeChartClient({ rows, categories }: Props) {
  const [category, setCategory] = useState<string>("all");
  const [selected, setSelected] = useState<string[] | null>(null);
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied">("idle");

  // Hydrate from URL on mount.
  useEffect(() => {
    const compounds = readCompoundsParam();
    const cat = readCategoryParam();
    if (compounds && compounds.length) setSelected(compounds);
    if (cat) setCategory(cat);
  }, []);

  // Reflect state back to URL.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams();
    if (category !== "all") params.set("category", category);
    if (selected && selected.length) {
      params.set("compounds", selected.join(","));
    }
    const qs = params.toString();
    const newUrl = qs
      ? `${window.location.pathname}?${qs}`
      : window.location.pathname;
    window.history.replaceState({}, "", newUrl);
  }, [category, selected]);

  const filtered = useMemo(() => {
    let out = rows;
    if (selected && selected.length) {
      const set = new Set(selected);
      out = out.filter((r) => set.has(r.slug));
    } else if (category !== "all") {
      out = out.filter((r) => r.mechanisms.includes(category));
    }
    return out.slice().sort((a, b) => a.hours - b.hours);
  }, [rows, category, selected]);

  const copyShareUrl = async () => {
    if (typeof window === "undefined") return;
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopyStatus("copied");
      setTimeout(() => setCopyStatus("idle"), 2000);
    } catch {
      setCopyStatus("idle");
    }
  };

  const clearPick = () => setSelected(null);

  return (
    <div style={{ marginTop: 18 }}>
      {/* Controls row */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 10,
          alignItems: "center",
          marginBottom: 14,
          background: "var(--paper)",
          border: "3px solid var(--ink)",
          padding: "10px 12px",
          boxShadow: "4px 4px 0 var(--shadow)",
        }}
      >
        <label
          style={{
            fontFamily: "var(--font-pixel)",
            fontSize: 9,
            letterSpacing: "0.14em",
          }}
        >
          CATEGORY ·
        </label>
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setSelected(null);
          }}
          style={{
            fontFamily: "var(--font-pixel)",
            fontSize: 10,
            padding: "8px 10px",
            background: "white",
            border: "3px solid var(--ink)",
            color: "var(--ink)",
            cursor: "pointer",
          }}
        >
          <option value="all">ALL · 17 COMPOUNDS</option>
          {categories.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name.toUpperCase()}
            </option>
          ))}
        </select>

        {selected && selected.length > 0 && (
          <button
            type="button"
            onClick={clearPick}
            style={{
              fontFamily: "var(--font-pixel)",
              fontSize: 9,
              letterSpacing: "0.12em",
              padding: "8px 10px",
              background: "var(--ink)",
              color: "var(--paper)",
              border: "3px solid var(--ink)",
              cursor: "pointer",
            }}
          >
            CLEAR PICK ({selected.length})
          </button>
        )}

        <span style={{ flex: 1 }} />

        <button
          type="button"
          onClick={copyShareUrl}
          style={{
            fontFamily: "var(--font-pixel)",
            fontSize: 9,
            letterSpacing: "0.14em",
            padding: "8px 12px",
            background: "var(--ink)",
            color: "var(--paper)",
            border: "3px solid var(--ink)",
            boxShadow: "3px 3px 0 rgba(0,0,0,0.35)",
            cursor: "pointer",
          }}
        >
          {copyStatus === "copied" ? "✓ COPIED" : "COPY SHARE LINK"}
        </button>
      </div>

      {/* Chart canvas */}
      <div
        style={{
          background: "var(--paper)",
          border: "3px solid var(--ink)",
          boxShadow: "6px 6px 0 var(--shadow)",
          padding: "16px 12px 4px",
          marginBottom: 14,
        }}
      >
        {filtered.length === 0 ? (
          <p
            className="body"
            style={{ textAlign: "center", padding: "40px 0" }}
          >
            No compounds match this filter.
          </p>
        ) : (
          <ResponsiveContainer
            width="100%"
            height={Math.max(260, filtered.length * 38 + 60)}
          >
            <BarChart
              data={filtered}
              layout="vertical"
              margin={{ top: 8, right: 50, left: 80, bottom: 24 }}
            >
              <XAxis
                type="number"
                scale="log"
                domain={[0.05, "dataMax"]}
                tickFormatter={(v: number) => {
                  if (v < 1) return `${Math.round(v * 60)}m`;
                  if (v < 24) return `${v}h`;
                  return `${Math.round(v / 24)}d`;
                }}
                stroke="var(--ink)"
                style={{
                  fontFamily: "var(--font-pixel)",
                  fontSize: 9,
                }}
                label={{
                  value: "PLASMA HALF-LIFE (LOG SCALE)",
                  position: "insideBottom",
                  offset: -10,
                  style: {
                    fontFamily: "var(--font-pixel)",
                    fontSize: 8,
                    fill: "var(--ink)",
                    letterSpacing: "0.14em",
                  },
                }}
              />
              <YAxis
                type="category"
                dataKey="name"
                width={120}
                stroke="var(--ink)"
                style={{
                  fontFamily: "var(--font-pixel)",
                  fontSize: 8,
                }}
                interval={0}
              />
              <Tooltip
                cursor={{ fill: "rgba(0,0,0,0.08)" }}
                contentStyle={{
                  background: "var(--paper)",
                  border: "3px solid var(--ink)",
                  fontFamily: "var(--font-pixel)",
                  fontSize: 10,
                  padding: "8px 10px",
                }}
                formatter={(_v, _n, item) => {
                  const row = (item as { payload?: ChartRow })?.payload;
                  return [row?.display ?? "", "HALF-LIFE"];
                }}
                labelFormatter={(label) => String(label ?? "")}
              />
              <Bar dataKey="hours" radius={0}>
                {filtered.map((r) => (
                  <Cell key={r.slug} fill={colorFor(r)} stroke="var(--ink)" />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Clickable label table · each row links to /[slug]. */}
      <div style={{ display: "grid", gap: 8 }}>
        {filtered.map((r) => (
          <Link
            key={r.slug}
            href={`/peptides/${r.slug}`}
            style={{
              display: "grid",
              gridTemplateColumns: "180px 1fr 140px",
              gap: 10,
              alignItems: "center",
              background: "var(--paper)",
              border: "3px solid var(--ink)",
              padding: "8px 10px",
              textDecoration: "none",
              color: "var(--ink)",
              boxShadow: "3px 3px 0 var(--shadow)",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-pixel)",
                fontSize: 9,
                letterSpacing: "0.1em",
              }}
            >
              {r.name}
            </span>
            <span
              style={{
                background: "var(--cloud)",
                border: "2px solid var(--ink)",
                height: 18,
                position: "relative",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: `${
                    Math.min(
                      100,
                      Math.max(
                        2,
                        (Math.log10(r.hours + 0.01) /
                          Math.log10(
                            Math.max(...filtered.map((x) => x.hours)) + 0.01,
                          )) *
                          100,
                      ),
                    )
                  }%`,
                  background: colorFor(r),
                }}
              />
            </span>
            <span
              style={{
                fontFamily: "var(--font-pixel)",
                fontSize: 8,
                letterSpacing: "0.1em",
                textAlign: "right",
              }}
            >
              {r.display}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
