import type { NextConfig } from "next";

// All 27 peppudex compound slugs · keep in sync with src/data/peppudex.ts.
// Inlined here because next.config.ts runs in a constrained TS eval context.
const COMPOUND_SLUGS = [
  "retatrutide",
  "tirzepatide",
  "bpc-157",
  "ghk-cu",
  "klow-blend",
  "nad-plus",
  "tb-500",
  "tesamorelin",
  "ipa-cjc1295",
  "mots-c",
  "selank",
  "semax",
  "ss-31",
  "wolverine-blend",
  "5-amino-1mq",
  "adamax",
  "igf-1-lr3",
  "cagrilintide",
  "survodutide",
  "orforglipron",
  "mazdutide",
  "pt-141",
  "epitalon",
  "aod-9604",
  "kisspeptin-10",
  "thymosin-alpha-1",
  "humanin",
] as const;

const SUBTOPICS = ["mechanism", "dosing", "safety"] as const;

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  async headers() {
    const crawlerCacheHeaders = [
      {
        key: "Cache-Control",
        value: "public, max-age=300",
      },
      {
        key: "CDN-Cache-Control",
        value: "max-age=86400, stale-while-revalidate=604800",
      },
      {
        key: "Vercel-CDN-Cache-Control",
        value: "max-age=86400, stale-while-revalidate=604800",
      },
    ];

    return [
      {
        source: "/sitemap.xml",
        headers: crawlerCacheHeaders,
      },
      {
        source: "/sitemap-:segment.xml",
        headers: crawlerCacheHeaders,
      },
      {
        source: "/robots.txt",
        headers: crawlerCacheHeaders,
      },
      {
        source: "/llms.txt",
        headers: crawlerCacheHeaders,
      },
      {
        source: "/(.*)",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=(), interest-cohort=()",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
        ],
      },
    ];
  },
  async redirects() {
    const redirects: Array<{
      source: string;
      destination: string;
      permanent: boolean;
    }> = [];
    for (const slug of COMPOUND_SLUGS) {
      redirects.push({
        source: `/${slug}`,
        destination: `/peptides/${slug}`,
        permanent: true,
      });
      for (const sub of SUBTOPICS) {
        redirects.push({
          source: `/${slug}/${sub}`,
          destination: `/peptides/${slug}/${sub}`,
          permanent: true,
        });
      }
    }
    return redirects;
  },
};

export default nextConfig;
