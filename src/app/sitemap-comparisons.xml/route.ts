import { NextResponse } from "next/server";
import { COMPARISONS } from "@/data/comparisons";
import { buildUrlsetXml, type SitemapUrl } from "@/lib/sitemap-xml";

const BASE = "https://peppudex.com";

/** /vs index + /vs/{pair} comparison pages. */
export async function GET() {
  const lastmod = new Date().toISOString();
  const urls: SitemapUrl[] = [
    {
      loc: `${BASE}/vs`,
      lastmod,
      changefreq: "weekly",
      priority: 0.8,
    },
  ];
  for (const c of COMPARISONS) {
    urls.push({
      loc: `${BASE}/vs/${c.slug}`,
      lastmod,
      changefreq: "monthly",
      priority: 0.85,
    });
  }
  return new NextResponse(buildUrlsetXml(urls), {
    headers: { "Content-Type": "application/xml" },
  });
}
