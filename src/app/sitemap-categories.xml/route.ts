import { NextResponse } from "next/server";
import { MECHANISMS } from "@/data/mechanisms";
import { CONDITIONS } from "@/data/conditions";
import { buildUrlsetXml, type SitemapUrl } from "@/lib/sitemap-xml";

const BASE = "https://peppudex.com";

/** /mechanism/{slug} + /condition/{slug} category pages. */
export async function GET() {
  const lastmod = new Date().toISOString();
  const urls: SitemapUrl[] = [];
  for (const m of MECHANISMS) {
    urls.push({
      loc: `${BASE}/mechanisms/${m.slug}`,
      lastmod,
      changefreq: "monthly",
      priority: 0.7,
    });
  }
  for (const c of CONDITIONS) {
    urls.push({
      loc: `${BASE}/conditions/${c.slug}`,
      lastmod,
      changefreq: "monthly",
      priority: 0.7,
    });
  }
  return new NextResponse(buildUrlsetXml(urls), {
    headers: { "Content-Type": "application/xml" },
  });
}
