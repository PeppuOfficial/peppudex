import { NextResponse } from "next/server";
import { STACKS } from "@/data/stacks";
import { buildUrlsetXml, type SitemapUrl } from "@/lib/sitemap-xml";

const BASE = "https://peppudex.com";

/**
 * Stacks + tools + policy / about pages + the homepage + index
 * pages for conditions / mechanisms / stacks. Index pages live
 * here so the 5-sitemap split stays semantically clean
 * (compounds.xml owns Tier-3 subtopic detail, this one owns
 * non-Tier-3 navigational + utility surfaces).
 */
export async function GET() {
  const lastmod = "2026-05-19";
  const urls: SitemapUrl[] = [
    {
      loc: `${BASE}/`,
      lastmod,
      changefreq: "daily",
      priority: 1.0,
    },
    {
      loc: `${BASE}/stacks`,
      lastmod,
      changefreq: "weekly",
      priority: 0.8,
    },
    {
      loc: `${BASE}/mechanisms`,
      lastmod,
      changefreq: "weekly",
      priority: 0.8,
    },
    {
      loc: `${BASE}/conditions`,
      lastmod,
      changefreq: "weekly",
      priority: 0.8,
    },
  ];
  for (const s of STACKS) {
    urls.push({
      loc: `${BASE}/stacks/${s.slug}`,
      lastmod,
      changefreq: "monthly",
      priority: 0.75,
    });
  }
  const flat: Array<[string, SitemapUrl["changefreq"], number]> = [
    ["/calculator", "monthly", 0.9],
    ["/tools/half-life-chart", "monthly", 0.85],
    ["/tools/stack-builder", "monthly", 0.85],
    ["/about", "monthly", 0.7],
    ["/about/research-process", "monthly", 0.6],
    ["/editorial-policy", "monthly", 0.6],
    ["/medical-disclaimer", "monthly", 0.3],
    ["/privacy-policy", "monthly", 0.3],
    ["/terms-of-use", "monthly", 0.3],
  ];
  for (const [path, changefreq, priority] of flat) {
    urls.push({ loc: `${BASE}${path}`, lastmod, changefreq, priority });
  }
  return new NextResponse(buildUrlsetXml(urls), {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
