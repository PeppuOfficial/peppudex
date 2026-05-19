import { NextResponse } from "next/server";
import { STACKS } from "@/data/stacks";
import { buildUrlsetXml, type SitemapUrl } from "@/lib/sitemap-xml";

const BASE = "https://peppudex.com";

/** Stacks + tools + policy / about pages. */
export async function GET() {
  const lastmod = new Date().toISOString();
  const urls: SitemapUrl[] = [];
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
    ["/medical-disclaimer", "yearly", 0.5],
    ["/privacy-policy", "yearly", 0.4],
    ["/terms-of-use", "yearly", 0.4],
  ];
  for (const [path, changefreq, priority] of flat) {
    urls.push({ loc: `${BASE}${path}`, lastmod, changefreq, priority });
  }
  return new NextResponse(buildUrlsetXml(urls), {
    headers: { "Content-Type": "application/xml" },
  });
}
