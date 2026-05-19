import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { PEPPUDEX } from "@/data/peppudex";

/**
 * IndexNow ping endpoint · peppudex.com
 *
 * Tells Bing/Yandex/Seznam to recrawl URLs immediately rather than wait
 * for the next sitemap poll. Microsoft adopted this protocol in 2021;
 * Bing + Yandex + Naver + Seznam are all live endpoints.
 *
 * Usage
 * ─────
 *   GET  /api/indexnow-ping                         · pings entire sitemap
 *   GET  /api/indexnow-ping?url=/peptides/bpc-157   · ad-hoc single URL
 *   POST /api/indexnow-ping  { urls: ["...","..."] } · explicit batch
 *
 * Reference: https://www.indexnow.org/documentation
 */

const HOST = "peppudex.com";
const BASE = "https://peppudex.com";
const KEY = "0d626342e2ad9ed0db95f5d5f3c6d41b";
const KEY_LOCATION = `${BASE}/${KEY}.txt`;
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/IndexNow";

const SUBTOPICS = ["mechanism", "dosing", "safety"] as const;

/** Build the full canonical URL list mirroring sitemap-compounds.xml. */
function buildSitemapUrls(): string[] {
  const urls: string[] = [
    `${BASE}/`,
    `${BASE}/calculator`,
    `${BASE}/tools`,
    `${BASE}/about`,
    `${BASE}/reviewers`,
    `${BASE}/reports`,
    `${BASE}/editorial-policy`,
    `${BASE}/medical-disclaimer`,
    `${BASE}/privacy-policy`,
    `${BASE}/terms-of-use`,
    `${BASE}/conditions`,
    `${BASE}/mechanisms`,
    `${BASE}/stacks`,
    `${BASE}/vs`,
  ];
  for (const p of PEPPUDEX) {
    urls.push(`${BASE}/peptides/${p.slug}`);
    for (const sub of SUBTOPICS) {
      urls.push(`${BASE}/peptides/${p.slug}/${sub}`);
    }
  }
  return urls;
}

/** Normalize a partial path or full URL into a canonical absolute URL. */
function normalizeUrl(input: string): string | null {
  const trimmed = input.trim();
  if (!trimmed) return null;
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    // Must live on peppudex.com or IndexNow rejects the payload.
    try {
      const u = new URL(trimmed);
      if (u.host !== HOST) return null;
      return u.toString();
    } catch {
      return null;
    }
  }
  // Treat as path.
  const path = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
  return `${BASE}${path}`;
}

async function pingIndexNow(urlList: string[]) {
  if (urlList.length === 0) {
    return { ok: false, status: 400, error: "no urls" };
  }
  // IndexNow caps payloads at 10,000 URLs per request · we are well under.
  const body = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList,
  };
  const res = await fetch(INDEXNOW_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(body),
  });
  return {
    ok: res.ok,
    status: res.status,
    statusText: res.statusText,
    pinged: urlList.length,
  };
}

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");
  let urlList: string[];
  if (url) {
    const normalized = normalizeUrl(url);
    if (!normalized) {
      return NextResponse.json(
        { ok: false, error: "url must be a peppudex.com path or absolute URL" },
        { status: 400 },
      );
    }
    urlList = [normalized];
  } else {
    urlList = buildSitemapUrls();
  }
  const result = await pingIndexNow(urlList);
  return NextResponse.json(result, { status: result.ok ? 200 : 502 });
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid json" }, { status: 400 });
  }
  const raw = (body as { urls?: unknown })?.urls;
  if (!Array.isArray(raw)) {
    return NextResponse.json(
      { ok: false, error: "expected { urls: string[] }" },
      { status: 400 },
    );
  }
  const urlList = raw
    .map((u) => (typeof u === "string" ? normalizeUrl(u) : null))
    .filter((u): u is string => Boolean(u));
  const result = await pingIndexNow(urlList);
  return NextResponse.json(result, { status: result.ok ? 200 : 502 });
}
