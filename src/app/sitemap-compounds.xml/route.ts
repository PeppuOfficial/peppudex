import { NextResponse } from "next/server";
import { PEPPUDEX } from "@/data/peppudex";
import { buildUrlsetXml, type SitemapUrl } from "@/lib/sitemap-xml";

const BASE = "https://peppudex.com";
const SUBTOPICS = ["mechanism", "dosing", "safety"] as const;

/** Compound pages + 3 Tier-3 subtopic pages each. */
export async function GET() {
  const lastmod = "2026-05-19";
  const urls: SitemapUrl[] = [];
  for (const p of PEPPUDEX) {
    urls.push({
      loc: `${BASE}/${p.slug}`,
      lastmod,
      changefreq: "weekly",
      priority: 0.9,
    });
    for (const sub of SUBTOPICS) {
      urls.push({
        loc: `${BASE}/${p.slug}/${sub}`,
        lastmod,
        changefreq: "monthly",
        priority: 0.75,
      });
    }
  }
  return new NextResponse(buildUrlsetXml(urls), {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
