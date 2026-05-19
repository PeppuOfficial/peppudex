import { NextResponse } from "next/server";

const BASE = "https://peppudex.com";

/**
 * Sitemap index · references 5 segmented sub-sitemaps.
 * Per https://www.sitemaps.org/protocol.html sitemap-index schema.
 */
export async function GET() {
  const lastmod = "2026-05-19";
  const segments = [
    "compounds",
    "categories",
    "comparisons",
    "studies",
    "guides",
  ];
  const entries = segments
    .map(
      (seg) =>
        `  <sitemap>\n` +
        `    <loc>${BASE}/sitemap-${seg}.xml</loc>\n` +
        `    <lastmod>${lastmod}</lastmod>\n` +
        `  </sitemap>`,
    )
    .join("\n");
  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    `${entries}\n` +
    `</sitemapindex>\n`;
  return new NextResponse(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
