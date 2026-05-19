import { NextResponse } from "next/server";
import { buildUrlsetXml, type SitemapUrl } from "@/lib/sitemap-xml";

const BASE = "https://peppudex.com";

/** Research reports + reviewers / editorial board. */
export async function GET() {
  const lastmod = new Date().toISOString();
  const urls: SitemapUrl[] = [
    {
      loc: `${BASE}/reports/peptide-research-publication-trends-2015-2026`,
      lastmod,
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      loc: `${BASE}/reports/regulatory-status-matrix`,
      lastmod,
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      loc: `${BASE}/reviewers`,
      lastmod,
      changefreq: "monthly",
      priority: 0.6,
    },
    {
      loc: `${BASE}/reviewers/editorial-board`,
      lastmod,
      changefreq: "monthly",
      priority: 0.5,
    },
  ];
  return new NextResponse(buildUrlsetXml(urls), {
    headers: { "Content-Type": "application/xml" },
  });
}
