import type { NextRequest } from "next/server";
import { createHash } from "crypto";
import { getSupabaseAdmin } from "@/lib/supabase-server";
import { PEPPUDEX } from "@/data/peppudex";

/**
 * POST /api/stacks/save · persist a user-assembled compound stack.
 *
 * Request body shape:
 *   { compounds: string[] }   // ordered slugs · 2..6 entries
 *
 * Response shape:
 *   { ok: true, slug: string, url: string }
 *
 * Behaviour:
 *  · validates each slug against PEPPUDEX (rejects unknown slugs)
 *  · enforces 2..6 compound count
 *  · computes a stable set-hash so identical stacks reuse the same
 *    slug (dedup by hash, not by ordering)
 *  · generates a slug from compound short-tokens plus a 4-char hash
 *    suffix (e.g. "bpc-tb500-ghk-3a7b")
 *  · stores `{ id, slug, compounds_json, set_hash, created_at,
 *    view_count }` in the `peppudex_stacks` table
 *  · returns `/stacks/built-<slug>` as the canonical URL
 */

const VALID_SLUGS = new Set(PEPPUDEX.map((p) => p.slug));

/** Short-tokens used for slug construction. */
const SHORT: Record<string, string> = {
  "retatrutide": "reta",
  "tirzepatide": "tirz",
  "bpc-157": "bpc",
  "tb-500": "tb500",
  "ghk-cu": "ghk",
  "klow-blend": "klow",
  "nad-plus": "nad",
  "mots-c": "motsc",
  "tesamorelin": "tesa",
  "ipa-cjc1295": "ipacjc",
  "selank": "selank",
  "semax": "semax",
  "ss-31": "ss31",
  "wolverine-blend": "wolv",
  "5-amino-1mq": "amino1mq",
  "adamax": "adamax",
  "igf-1-lr3": "igflr3",
  "cagrilintide": "cagri",
  "survodutide": "survo",
  "orforglipron": "orfor",
  "mazdutide": "mazd",
  "pt-141": "pt141",
  "epitalon": "epi",
  "aod-9604": "aod",
  "kisspeptin-10": "kiss10",
  "thymosin-alpha-1": "thyalpha",
  "humanin": "human",
};

interface SaveBody {
  compounds?: unknown;
}

export async function POST(req: NextRequest) {
  // 1. Parse body.
  let body: SaveBody;
  try {
    body = (await req.json()) as SaveBody;
  } catch {
    return Response.json(
      { ok: false, error: "bad-json" },
      { status: 400 },
    );
  }

  // 2. Validate compound list.
  const raw = body.compounds;
  if (!Array.isArray(raw)) {
    return Response.json(
      { ok: false, error: "compounds-must-be-array" },
      { status: 400 },
    );
  }
  const compounds = raw
    .filter((s): s is string => typeof s === "string")
    .map((s) => s.toLowerCase().trim());

  if (compounds.length < 2 || compounds.length > 6) {
    return Response.json(
      { ok: false, error: "must-be-2-to-6-compounds" },
      { status: 400 },
    );
  }

  for (const s of compounds) {
    if (!VALID_SLUGS.has(s)) {
      return Response.json(
        { ok: false, error: `unknown-slug:${s}` },
        { status: 400 },
      );
    }
  }

  // De-duplicate while preserving order.
  const seen = new Set<string>();
  const ordered: string[] = [];
  for (const s of compounds) {
    if (seen.has(s)) continue;
    seen.add(s);
    ordered.push(s);
  }
  if (ordered.length < 2) {
    return Response.json(
      { ok: false, error: "duplicates-collapsed-below-minimum" },
      { status: 400 },
    );
  }

  // 3. Compute set-hash (order-independent, so two stacks with the
  //    same components in a different order resolve to the same row).
  const setHash = createHash("sha256")
    .update(ordered.slice().sort().join("|"))
    .digest("hex")
    .slice(0, 16);

  // 4. Talk to Supabase.
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return Response.json(
      { ok: false, error: "supabase-not-configured" },
      { status: 503 },
    );
  }

  // Dedupe: look up existing row by set_hash.
  const existing = await supabase
    .from("peppudex_stacks")
    .select("slug")
    .eq("set_hash", setHash)
    .maybeSingle();

  if (existing.error) {
    return Response.json(
      { ok: false, error: existing.error.message },
      { status: 500 },
    );
  }
  if (existing.data?.slug) {
    return Response.json({
      ok: true,
      slug: existing.data.slug,
      url: `/stacks/built-${existing.data.slug}`,
      reused: true,
    });
  }

  // 5. Build a fresh slug.
  const tokens = ordered.map((s) => SHORT[s] ?? s.replace(/[^a-z0-9]+/g, ""));
  const slug = `${tokens.join("-")}-${setHash.slice(0, 4)}`;

  // 6. Insert.
  const insert = await supabase
    .from("peppudex_stacks")
    .insert({
      slug,
      compounds_json: ordered,
      set_hash: setHash,
      view_count: 0,
    })
    .select("slug")
    .single();

  if (insert.error) {
    return Response.json(
      { ok: false, error: insert.error.message },
      { status: 500 },
    );
  }

  return Response.json({
    ok: true,
    slug,
    url: `/stacks/built-${slug}`,
    reused: false,
  });
}

export async function GET() {
  return Response.json({
    ok: true,
    endpoint: "peppudex /api/stacks/save",
    methods: ["POST"],
  });
}
