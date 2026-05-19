"use client";

/**
 * PEPPUDEX · stack builder.
 *
 * Click-to-add interface to assemble a 2..6 compound stack. On save
 * the canonical stack URL is generated server-side via
 * `/api/stacks/save`, which dedupes by component set.
 *
 * Pure client component · talks to the API and updates local state.
 */

import { useMemo, useState } from "react";
import Link from "next/link";
import { PEPPUDEX } from "@/data/peppudex";

const MIN_COMPOUNDS = 2;
const MAX_COMPOUNDS = 6;

const SHORT: Record<string, string> = {
  "retatrutide": "RETA",
  "tirzepatide": "TIRZ",
  "bpc-157": "BPC-157",
  "ghk-cu": "GHK-Cu",
  "klow-blend": "KLOW",
  "nad-plus": "NAD+",
  "tb-500": "TB-500",
  "tesamorelin": "TESA",
  "ipa-cjc1295": "IPA/CJC",
  "mots-c": "MOTS-c",
  "selank": "SELANK",
  "semax": "SEMAX",
};

interface SaveResponse {
  ok: boolean;
  slug?: string;
  url?: string;
  reused?: boolean;
  error?: string;
}

export default function StackBuilderPage() {
  const [picked, setPicked] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [result, setResult] = useState<
    { url: string; reused: boolean } | null
  >(null);
  const [error, setError] = useState<string | null>(null);

  const canSave = picked.length >= MIN_COMPOUNDS && !saving;
  const pickedSet = useMemo(() => new Set(picked), [picked]);

  const togglePick = (slug: string) => {
    setResult(null);
    setError(null);
    setPicked((prev) => {
      if (prev.includes(slug)) {
        return prev.filter((s) => s !== slug);
      }
      if (prev.length >= MAX_COMPOUNDS) return prev;
      return [...prev, slug];
    });
  };

  const clear = () => {
    setPicked([]);
    setResult(null);
    setError(null);
  };

  const save = async () => {
    if (!canSave) return;
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/stacks/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ compounds: picked }),
      });
      const data = (await res.json()) as SaveResponse;
      if (!data.ok || !data.url) {
        setError(data.error ?? "save-failed");
      } else {
        setResult({
          url: data.url,
          reused: Boolean(data.reused),
        });
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : "network-error";
      setError(msg);
    } finally {
      setSaving(false);
    }
  };

  return (
    <main>
      <div className="header-strip">
        FOR LABORATORY RESEARCH USE ONLY · NOT FOR HUMAN CONSUMPTION
      </div>

      <div className="page">
        <div className="brandbar">
          <Link
            href="/"
            style={{
              background: "var(--ink)",
              color: "var(--paper)",
              fontFamily: "var(--font-pixel)",
              fontSize: 10,
              padding: "10px 14px",
              textDecoration: "none",
              letterSpacing: "0.14em",
            }}
          >
            ◀ INDEX
          </Link>
          <span
            style={{
              fontFamily: "var(--font-pixel)",
              fontSize: 14,
              color: "var(--paper)",
              textShadow: "3px 3px 0 var(--ink)",
            }}
          >
            STACK BUILDER
          </span>
        </div>

        <article className="detail">
          <h1>BUILD A STACK</h1>
          <p className="body" style={{ marginTop: 12 }}>
            Pick {MIN_COMPOUNDS} to {MAX_COMPOUNDS} compounds. Save to
            generate a permanent shareable URL. Identical compound sets
            collapse to the same canonical page.
          </p>

          {/* Picker grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill, minmax(116px, 1fr))",
              gap: 10,
              marginTop: 18,
            }}
          >
            {PEPPUDEX.map((p) => {
              const active = pickedSet.has(p.slug);
              const orderIndex = picked.indexOf(p.slug) + 1;
              return (
                <button
                  key={p.slug}
                  type="button"
                  onClick={() => togglePick(p.slug)}
                  disabled={!active && picked.length >= MAX_COMPOUNDS}
                  style={{
                    cursor:
                      !active && picked.length >= MAX_COMPOUNDS
                        ? "not-allowed"
                        : "pointer",
                    padding: "12px 6px",
                    height: 78,
                    position: "relative",
                    background: active
                      ? "var(--ink)"
                      : "var(--paper)",
                    color: active ? "var(--paper)" : "var(--ink)",
                    border: "3px solid var(--ink)",
                    boxShadow: active
                      ? "2px 2px 0 rgba(0,0,0,0.35)"
                      : "4px 4px 0 var(--shadow)",
                    fontFamily: "var(--font-pixel)",
                    letterSpacing: "0.04em",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 4,
                    transform: active ? "translate(2px, 2px)" : "none",
                    whiteSpace: "nowrap",
                    opacity:
                      !active && picked.length >= MAX_COMPOUNDS
                        ? 0.4
                        : 1,
                  }}
                >
                  {active && (
                    <span
                      style={{
                        position: "absolute",
                        top: 4,
                        right: 6,
                        fontFamily: "var(--font-pixel)",
                        fontSize: 8,
                        background: "#FFE680",
                        color: "var(--ink)",
                        border: "2px solid var(--ink)",
                        padding: "2px 4px",
                      }}
                    >
                      {orderIndex}
                    </span>
                  )}
                  <span
                    style={{
                      fontSize: 7,
                      opacity: 0.55,
                      letterSpacing: "0.18em",
                    }}
                  >
                    NO.{p.id}
                  </span>
                  <span style={{ fontSize: 10 }}>
                    {SHORT[p.slug] ?? p.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Status / actions */}
          <div
            className="box"
            style={{ marginTop: 20, marginBottom: 14 }}
          >
            <p
              style={{
                fontFamily: "var(--font-pixel)",
                fontSize: 11,
                letterSpacing: "0.16em",
              }}
            >
              ▶ CURRENT STACK · {picked.length}/{MAX_COMPOUNDS}
            </p>
            <p
              className="body"
              style={{ marginTop: 10, opacity: 0.85 }}
            >
              {picked.length === 0
                ? "No compounds picked yet."
                : picked
                    .map((s) => SHORT[s] ?? s.toUpperCase())
                    .join(" + ")}
            </p>
            <div
              style={{
                display: "flex",
                gap: 10,
                marginTop: 14,
                flexWrap: "wrap",
              }}
            >
              <button
                type="button"
                onClick={save}
                disabled={!canSave}
                style={{
                  fontFamily: "var(--font-pixel)",
                  fontSize: 10,
                  letterSpacing: "0.14em",
                  padding: "10px 16px",
                  background: canSave ? "var(--grass-deep)" : "#999",
                  color: "var(--paper)",
                  border: "3px solid var(--ink)",
                  boxShadow: "3px 3px 0 rgba(0,0,0,0.35)",
                  cursor: canSave ? "pointer" : "not-allowed",
                }}
              >
                {saving ? "SAVING..." : "SAVE STACK ▶"}
              </button>
              <button
                type="button"
                onClick={clear}
                disabled={picked.length === 0}
                style={{
                  fontFamily: "var(--font-pixel)",
                  fontSize: 10,
                  letterSpacing: "0.14em",
                  padding: "10px 16px",
                  background: "var(--ink)",
                  color: "var(--paper)",
                  border: "3px solid var(--ink)",
                  boxShadow: "3px 3px 0 rgba(0,0,0,0.35)",
                  cursor: picked.length === 0 ? "not-allowed" : "pointer",
                  opacity: picked.length === 0 ? 0.4 : 1,
                }}
              >
                CLEAR
              </button>
            </div>

            {error && (
              <p
                className="body"
                style={{
                  marginTop: 12,
                  color: "#B71C1C",
                  fontFamily: "var(--font-pixel)",
                  fontSize: 10,
                }}
              >
                ERROR · {error}
              </p>
            )}

            {result && (
              <div
                style={{
                  marginTop: 14,
                  background: "#FFE680",
                  border: "3px solid var(--ink)",
                  padding: "12px 14px",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-pixel)",
                    fontSize: 10,
                    letterSpacing: "0.14em",
                  }}
                >
                  {result.reused
                    ? "▶ EXISTING STACK"
                    : "▶ STACK SAVED"}
                </p>
                <p className="body" style={{ marginTop: 8 }}>
                  Permanent URL ·{" "}
                  <Link
                    href={result.url}
                    style={{ color: "var(--ink)" }}
                  >
                    {result.url}
                  </Link>
                </p>
              </div>
            )}
          </div>

          <h2>HOW IT WORKS</h2>
          <ul>
            <li>
              Click any compound card to add or remove it from the
              stack.
            </li>
            <li>
              Order matters for display, but two stacks with the same
              compounds in any order collapse to one canonical page.
            </li>
            <li>
              Saved stacks live at{" "}
              <code>/stacks/built-&lt;slug&gt;</code> and emit
              schema.org DietarySupplement JSON-LD for the full
              collection.
            </li>
            <li>
              Component pages and primary-literature citations are
              one click away from every built-stack page.
            </li>
          </ul>

          <h2>RELATED</h2>
          <ul>
            <li>
              <Link
                href="/stacks"
                style={{ color: "var(--ink)" }}
              >
                Featured Stacks (curated)
              </Link>
            </li>
            <li>
              <Link
                href="/tools/half-life-chart"
                style={{ color: "var(--ink)" }}
              >
                Half-Life Comparison Chart
              </Link>
            </li>
            <li>
              <Link
                href="/calculator"
                style={{ color: "var(--ink)" }}
              >
                Reconstitution Calculator
              </Link>
            </li>
          </ul>
        </article>

        <footer className="footer">
          PEPPUDEX · <Link href="/">INDEX</Link>
        </footer>
      </div>
      <div className="disclaimer-band">
        © 2026 Peppu Studio LLC · For Laboratory Research Use Only
      </div>
    </main>
  );
}
