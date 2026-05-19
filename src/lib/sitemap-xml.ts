/** Shared helpers for sub-sitemap XML route handlers. */

export interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority?: number;
}

export function buildUrlsetXml(urls: SitemapUrl[]): string {
  const body = urls
    .map((u) => {
      const lines = [`    <loc>${escapeXml(u.loc)}</loc>`];
      if (u.lastmod) lines.push(`    <lastmod>${u.lastmod}</lastmod>`);
      if (u.changefreq)
        lines.push(`    <changefreq>${u.changefreq}</changefreq>`);
      if (u.priority !== undefined)
        lines.push(`    <priority>${u.priority.toFixed(2)}</priority>`);
      return `  <url>\n${lines.join("\n")}\n  </url>`;
    })
    .join("\n");
  return (
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    `${body}\n` +
    `</urlset>\n`
  );
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
