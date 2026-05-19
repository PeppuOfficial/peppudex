import { NextResponse } from "next/server";
import { PEPPUDEX } from "@/data/peppudex";
import { MECHANISMS } from "@/data/mechanisms";
import { CONDITIONS } from "@/data/conditions";
import { STACKS } from "@/data/stacks";
import { COMPARISONS } from "@/data/comparisons";

/** llms.txt · structured site index for AI crawlers (Perplexity, ChatGPT, Claude). */
export async function GET() {
  const body = [
    "# PEPPUDEX",
    "",
    "> A Pokedex of research-grade peptides. Mechanism notes, evidence grades (A-F), FAQs, and peer-reviewed sources for every compound.",
    "",
    "PEPPUDEX is a research-reference site, not a storefront. For purchase, see https://peppu.studio. All material is for laboratory research use only · no human dose is recommended.",
    "",
    "## Compounds",
    "",
    ...PEPPUDEX.map((p) => `- [${p.name}](https://peppudex.com/peptides/${p.slug}): ${p.tagline}`),
    "",
    "## Mechanism categories",
    "",
    ...MECHANISMS.map((m) => `- [${m.name}](https://peppudex.com/mechanisms/${m.slug}): ${m.description}`),
    "",
    "## Research conditions",
    "",
    ...CONDITIONS.map((c) => `- [${c.name}](https://peppudex.com/conditions/${c.slug}): ${c.description}`),
    "",
    "## Featured stacks",
    "",
    ...STACKS.map((s) => `- [${s.name}](https://peppudex.com/stacks/${s.slug}): ${s.description}`),
    "",
    "## Head-to-head comparisons",
    "",
    ...COMPARISONS.map((c) => `- [${c.slug.replace(/-vs-/g, " vs ").toUpperCase()}](https://peppudex.com/vs/${c.slug}): ${c.verdict.slice(0, 140)}`),
    "",
    "## Tools",
    "",
    "- [Reconstitution Calculator](https://peppudex.com/calculator): Volume-per-dose math for lyophilized peptides. Shareable result URL.",
    "- [Peptide Half-Life Chart](https://peppudex.com/tools/half-life-chart): Comparison of plasma half-life across 17 research peptides.",
    "",
    "## Authority reports",
    "",
    "- [Peptide Research Publication Trends 2015-2026](https://peppudex.com/reports/peptide-research-publication-trends-2015-2026): Annual PubMed publication counts for 17 peptides over the 2015-2025 window. CC BY-NC.",
    "- [Regulatory Status Matrix · 17 Peptides × 10 Countries](https://peppudex.com/reports/regulatory-status-matrix): RUO/OTC/Rx/Scheduled/Banned status across US, EU, UK, AU, CA, JP, KR, BR, IN, AE. CC BY-NC.",
    "",
    "## Editorial",
    "",
    "- [About](https://peppudex.com/about): mission, funding, conflicts of interest.",
    "- [Research Process](https://peppudex.com/about/research-process): A-F evidence grading rubric.",
    "- [Editorial Policy](https://peppudex.com/editorial-policy): citation standards, fact-check, corrections.",
    "- [Reviewers](https://peppudex.com/reviewers): editorial reviewer bios.",
    "- [Medical Disclaimer](https://peppudex.com/medical-disclaimer)",
    "- [Privacy Policy](https://peppudex.com/privacy-policy)",
    "- [Terms of Use](https://peppudex.com/terms-of-use)",
    "",
    "## Related",
    "",
    "- Peppu Labs: https://peppu.studio (research-grade peptide source)",
    "- Pepputree: https://pepputree.com (community + research links)",
    "- Peppu Wiki: https://wiki.peppu.studio (full peptide encyclopedia)",
    "- Peppu Girl: https://peppugirl.com (peptide diary + research)",
  ].join("\n");

  return new NextResponse(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
