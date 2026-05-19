import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/search?", "/*?sort=", "/*?filter=", "/tag/", "/author/"],
      },
      // Explicit allow for AI-search bots (Perplexity, ChatGPT, Anthropic, Google AI overview).
      { userAgent: "GPTBot",          allow: "/" },
      { userAgent: "ChatGPT-User",    allow: "/" },
      { userAgent: "PerplexityBot",   allow: "/" },
      { userAgent: "Claude-Web",      allow: "/" },
      { userAgent: "anthropic-ai",    allow: "/" },
      { userAgent: "ClaudeBot",       allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "CCBot",           allow: "/" },
      { userAgent: "Bytespider",      allow: "/" },
      { userAgent: "Applebot",        allow: "/" },
      { userAgent: "Applebot-Extended", allow: "/" },
      { userAgent: "Bingbot",         allow: "/" },
    ],
    sitemap: [
      "https://peppudex.com/sitemap.xml",
      "https://peppudex.com/sitemap-compounds.xml",
      "https://peppudex.com/sitemap-categories.xml",
      "https://peppudex.com/sitemap-comparisons.xml",
      "https://peppudex.com/sitemap-studies.xml",
      "https://peppudex.com/sitemap-guides.xml",
    ],
    host: "https://peppudex.com",
  };
}
