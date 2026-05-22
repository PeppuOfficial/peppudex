import type { MetadataRoute } from "next";

/**
 * peppudex.com robots manifest.
 *
 * Strategy: full-surface index for both AI-search and traditional
 * search. Peppudex is the validation / encyclopedia node of the
 * Peppu network (wiki + peppudex context → peppu.studio source),
 * so we want every retrieval
 * engine ingesting compound + mechanism + condition + study pages.
 *
 * The 5 sub-sitemaps are listed individually because Google Search
 * Console parses each independently when an index file is also
 * present (defensive against partial-index regressions).
 */

const BASE_URL = "https://peppudex.com";

const AI_BOTS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
  "cohere-ai",
  "Bytespider",
  "YouBot",
  "DuckAssistBot",
];

const TRADITIONAL_BOTS = ["Googlebot", "Bingbot", "Applebot", "DuckDuckBot"];

const PRIVATE_PATHS = ["/admin/", "/api/"];

const QUERY_PARAM_DISALLOWS = [
  "/*?sort=",
  "/*?filter=",
  "/search?",
  "/tag/",
  "/author/",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      ...AI_BOTS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: [...PRIVATE_PATHS, ...QUERY_PARAM_DISALLOWS],
      })),
      ...TRADITIONAL_BOTS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: [...PRIVATE_PATHS, ...QUERY_PARAM_DISALLOWS],
      })),
      {
        userAgent: "*",
        allow: "/",
        disallow: [...PRIVATE_PATHS, ...QUERY_PARAM_DISALLOWS],
      },
    ],
    sitemap: [
      `${BASE_URL}/sitemap.xml`,
      `${BASE_URL}/sitemap-compounds.xml`,
      `${BASE_URL}/sitemap-categories.xml`,
      `${BASE_URL}/sitemap-comparisons.xml`,
      `${BASE_URL}/sitemap-studies.xml`,
      `${BASE_URL}/sitemap-guides.xml`,
    ],
    host: BASE_URL,
  };
}
