"use client";

/**
 * PEPPUDEX · reconstitution calculator · pixel edition.
 *
 * Same reconstitution math as the canonical Peppu/ recon · wrapped
 * in 16-bit Nintendo / GBA / Kirby chrome. Built around per-peptide
 * "PEPPUDEX" cards so the picker doubles as a quick-link back to
 * the index. For laboratory research use only.
 */

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { PEPPUDEX } from "@/data/peppudex";

/** Default vial + dose presets per peptide · mirrored from the storefront. */
const PRESETS: Record<string, { vialMg: number; doseMcg: number }> = {
  "retatrutide":  { vialMg: 10, doseMcg: 2000 },
  "tirzepatide":  { vialMg: 20, doseMcg: 2500 },
  "bpc-157":      { vialMg: 10, doseMcg: 250 },
  "ghk-cu":       { vialMg: 50, doseMcg: 1000 },
  "klow-blend":   { vialMg: 80, doseMcg: 1000 },
  "nad-plus":     { vialMg: 500, doseMcg: 25000 },
  "tb-500":       { vialMg: 10, doseMcg: 500 },
  "tesamorelin":  { vialMg: 10, doseMcg: 1000 },
  "ipa-cjc1295":  { vialMg: 10, doseMcg: 300 },
  "mots-c":       { vialMg: 10, doseMcg: 1000 },
  "selank":       { vialMg: 10, doseMcg: 300 },
  "semax":        { vialMg: 10, doseMcg: 500 },
};

/** Short button labels · Press Start 2P breaks ugly on long compound names. */
const SHORT: Record<string, string> = {
  "retatrutide":  "RETA",
  "tirzepatide":  "TIRZ",
  "bpc-157":      "BPC-157",
  "ghk-cu":       "GHK-Cu",
  "klow-blend":   "KLOW",
  "nad-plus":     "NAD+",
  "tb-500":       "TB-500",
  "tesamorelin":  "TESA",
  "ipa-cjc1295":  "IPA/CJC",
  "mots-c":       "MOTS-c",
  "selank":       "SELANK",
  "semax":        "SEMAX",
};

function reconstitute(vialMg: number, bacMl: number, doseMcg: number) {
  if (vialMg <= 0 || bacMl <= 0 || doseMcg <= 0) return { mcgPerMl: 0, doseMl: 0, doseUnits: 0, totalDoses: 0 };
  const mcgPerMl = (vialMg * 1000) / bacMl;
  const doseMl = doseMcg / mcgPerMl;
  return {
    mcgPerMl,
    doseMl,
    doseUnits: doseMl * 100,
    totalDoses: Math.floor((vialMg * 1000) / doseMcg),
  };
}

export default function CalculatorPage() {
  const [slug, setSlug] = useState<string>("bpc-157");
  const [vialMg, setVialMg] = useState(PRESETS["bpc-157"].vialMg);
  const [bacMl, setBacMl] = useState(2);
  const [doseMcg, setDoseMcg] = useState(PRESETS["bpc-157"].doseMcg);
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied">("idle");

  const result = useMemo(() => reconstitute(vialMg, bacMl, doseMcg), [vialMg, bacMl, doseMcg]);

  // C3 · Shareable result URL · hydrate state from query params on mount,
  // and reflect changes back via replaceState so the URL stays shareable.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const q_slug = params.get("slug");
    const q_vial = params.get("vial");
    const q_bac = params.get("bac");
    const q_dose = params.get("dose");
    if (q_slug && PRESETS[q_slug]) setSlug(q_slug);
    if (q_vial && !isNaN(parseFloat(q_vial))) setVialMg(parseFloat(q_vial));
    if (q_bac && !isNaN(parseFloat(q_bac))) setBacMl(parseFloat(q_bac));
    if (q_dose && !isNaN(parseFloat(q_dose))) setDoseMcg(parseFloat(q_dose));
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams();
    params.set("slug", slug);
    params.set("vial", String(vialMg));
    params.set("bac", String(bacMl));
    params.set("dose", String(doseMcg));
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, "", newUrl);
  }, [slug, vialMg, bacMl, doseMcg]);

  const applyPreset = (s: string) => {
    setSlug(s);
    const preset = PRESETS[s];
    if (preset) { setVialMg(preset.vialMg); setDoseMcg(preset.doseMcg); }
  };

  const copyShareUrl = async () => {
    if (typeof window === "undefined") return;
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      setCopyStatus("copied");
      setTimeout(() => setCopyStatus("idle"), 2000);
    } catch {
      setCopyStatus("idle");
    }
  };

  const activeCard = PEPPUDEX.find((p) => p.slug === slug);

  return (
    <main>
      <div className="header-strip">FOR LABORATORY RESEARCH USE ONLY · NOT FOR HUMAN CONSUMPTION</div>

      {/* Single centered container · brand row + content share the same axis */}
      <div style={{ maxWidth: 920, margin: "0 auto", padding: "14px 14px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, gap: 10 }}>
          <Link href="/" style={{ background: "var(--ink)", color: "var(--paper)", fontFamily: "var(--font-pixel)", fontSize: 10, padding: "10px 14px", textDecoration: "none", boxShadow: "3px 3px 0 rgba(0,0,0,0.35)", letterSpacing: "0.14em" }}>
            ◀ INDEX
          </Link>
          <span style={{ fontFamily: "var(--font-pixel)", fontSize: 18, color: "var(--paper)", letterSpacing: "0.04em", textShadow: "3px 3px 0 var(--ink)" }}>
            ▶ RECON<span style={{ color: "#FFE680" }}>CALC</span>
          </span>
        </div>

      <section>
        <div className="box" style={{ marginBottom: 14 }}>
          <p style={{ fontFamily: "var(--font-pixel)", fontSize: 11, letterSpacing: "0.16em" }}>
            ▶ SELECT YOUR PEP
          </p>
          <p className="body" style={{ marginTop: 8, opacity: 0.8 }}>
            Pick a card · its vial size + dose preset auto-fills below. Override any field by typing.
          </p>
        </div>

        {/* Peptide picker grid · short labels, fixed-height tiles, single line */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(116px, 1fr))", gap: 10, marginBottom: 20 }}>
          {PEPPUDEX.map((p) => {
            const active = p.slug === slug;
            return (
              <button
                key={p.slug}
                type="button"
                onClick={() => applyPreset(p.slug)}
                style={{
                  cursor: "pointer", padding: "12px 6px", height: 70,
                  background: active ? "var(--ink)" : "var(--paper)",
                  color: active ? "var(--paper)" : "var(--ink)",
                  border: "3px solid var(--ink)",
                  boxShadow: active ? "2px 2px 0 rgba(0,0,0,0.35)" : "4px 4px 0 var(--shadow)",
                  fontFamily: "var(--font-pixel)", letterSpacing: "0.04em",
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6,
                  transform: active ? "translate(2px, 2px)" : "none",
                  whiteSpace: "nowrap",
                }}
              >
                <span style={{ fontSize: 7, opacity: 0.55, letterSpacing: "0.18em" }}>NO.{p.id}</span>
                <span style={{ fontSize: 11 }}>{SHORT[p.slug] ?? p.name}</span>
              </button>
            );
          })}
        </div>

        {/* Sliders / inputs */}
        <div className="box" style={{ marginBottom: 14 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
            <NumField label="VIAL · mg" value={vialMg} onChange={setVialMg} step={0.1} />
            <NumField label="BAC · mL"  value={bacMl}  onChange={setBacMl}  step={0.1} />
            <NumField label="DOSE · mcg" value={doseMcg} onChange={setDoseMcg} step={1} />
          </div>
        </div>

        {/* Battle-card output */}
        <div className="box" style={{ marginBottom: 14, background: "linear-gradient(180deg, #FFE680 0%, #F2A93F 100%)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <p style={{ fontFamily: "var(--font-pixel)", fontSize: 11, letterSpacing: "0.18em" }}>
              ▶ DRAW YOUR DOSE
            </p>
            <button
              type="button"
              onClick={copyShareUrl}
              style={{
                fontFamily: "var(--font-pixel)", fontSize: 9, letterSpacing: "0.14em",
                padding: "8px 12px", background: "var(--ink)", color: "var(--paper)",
                border: "3px solid var(--ink)", boxShadow: "3px 3px 0 rgba(0,0,0,0.35)",
                cursor: "pointer",
              }}
            >
              {copyStatus === "copied" ? "✓ COPIED" : "COPY SHARE LINK"}
            </button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10, marginTop: 10 }}>
            <Result label="UNITS" value={result.doseUnits.toFixed(1)} sub="@ U-100 syringe" />
            <Result label="MILLILITERS" value={result.doseMl.toFixed(2)} sub="exact volume" />
            <Result label="STRENGTH" value={Math.round(result.mcgPerMl).toLocaleString()} sub="mcg per mL" />
            <Result label="VIAL YIELDS" value={String(result.totalDoses)} sub="doses total" />
          </div>
        </div>

        {/* Active card detail */}
        {activeCard && (
          <div className="box" style={{ marginBottom: 14 }}>
            <p style={{ fontFamily: "var(--font-pixel)", fontSize: 10, letterSpacing: "0.16em" }}>
              ▶ ABOUT THIS PEP
            </p>
            <p className="body" style={{ marginTop: 10 }}>
              <strong style={{ fontFamily: "var(--font-pixel)", fontSize: 12 }}>{activeCard.name}</strong>
              {" · "}{activeCard.tagline}
            </p>
            <p className="body" style={{ marginTop: 8, opacity: 0.85 }}>{activeCard.mechanism}</p>
            <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
              <Link href={`/peptides/${activeCard.slug}`} className="back" style={{ fontFamily: "var(--font-pixel)", fontSize: 10, padding: "8px 12px", color: "var(--paper)", textDecoration: "none", background: "var(--ink)" }}>
                FULL CARD ▶
              </Link>
              <a className="back" style={{ fontFamily: "var(--font-pixel)", fontSize: 10, padding: "8px 12px", color: "var(--paper)", textDecoration: "none", background: "var(--grass-deep)" }}
                href={`https://peppu.studio?utm_source=peppudex&utm_medium=calc&utm_campaign=${activeCard.slug}`} target="_blank" rel="noopener noreferrer">
                BUY AT PEPPU LABS ▶
              </a>
            </div>
          </div>
        )}

        {/* How-to */}
        <div className="box" style={{ marginBottom: 14 }}>
          <p style={{ fontFamily: "var(--font-pixel)", fontSize: 10, letterSpacing: "0.16em" }}>▶ TRAINER MANUAL</p>
          <ol className="body" style={{ marginTop: 10, paddingLeft: 22 }}>
            <li>Wipe vial stoppers with 70% isopropyl. Let dry.</li>
            <li>Draw BAC water into a sterile syringe.</li>
            <li>Pierce vial at 45° · aim at the glass wall, not the cake.</li>
            <li><strong>Do not shake.</strong> Let it dissolve. Swirl gently if needed.</li>
            <li>Label the vial · date + concentration.</li>
            <li>Store reconstituted at 2–8 °C. See per-peptide shelf-life in the wiki.</li>
          </ol>
        </div>
      </section>
      </div>

      <footer className="footer">
        PEPPUDEX RECON CALCULATOR · v1.0<br />
        <a href="https://peppu.studio">PEPPU STUDIO</a> · <a href="https://pepputree.com">PEPPUTREE</a> · <a href="https://wiki.peppu.studio">WIKI</a>
      </footer>

      <div className="disclaimer-band">
        © 2026 Peppu Studio LLC · For Laboratory Research Use Only
      </div>
    </main>
  );
}

function NumField({ label, value, onChange, step = 1 }: { label: string; value: number; onChange: (n: number) => void; step?: number }) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <span style={{ fontFamily: "var(--font-pixel)", fontSize: 8, letterSpacing: "0.18em", color: "var(--ink)" }}>{label}</span>
      <input
        type="number"
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
        style={{
          fontFamily: "var(--font-pixel)", fontSize: 14, fontWeight: 700,
          padding: "10px 12px", background: "white",
          border: "3px solid var(--ink)", boxShadow: "3px 3px 0 var(--shadow)",
          color: "var(--ink)", textAlign: "center", outline: "none",
        }}
      />
    </label>
  );
}

function Result({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div style={{ background: "var(--paper)", border: "3px solid var(--ink)", boxShadow: "4px 4px 0 var(--shadow)", padding: "12px 10px", textAlign: "center" }}>
      <p style={{ fontFamily: "var(--font-pixel)", fontSize: 7, letterSpacing: "0.18em" }}>{label}</p>
      <p style={{ fontFamily: "var(--font-pixel)", fontSize: 18, lineHeight: 1.2, marginTop: 6, color: "var(--ink)" }}>{value}</p>
      <p style={{ fontFamily: "var(--font-body)", fontSize: 18, marginTop: 2, opacity: 0.7 }}>{sub}</p>
    </div>
  );
}
