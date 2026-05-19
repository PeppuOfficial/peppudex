import type { NextRequest } from "next/server";
import { fireDiscord, type TrackEvent } from "@/lib/discord-webhook";

/**
 * POST /api/track · client-fired tracking endpoint.
 *
 * Accepts a JSON body matching TrackEvent. Server-side fires to
 * the configured Discord webhook. Returns 200 with `{ok:true}` on
 * success (or webhook failure · we never expose webhook errors to
 * the client).
 */
export async function POST(req: NextRequest) {
  let body: Partial<TrackEvent> = {};
  try {
    body = (await req.json()) as Partial<TrackEvent>;
  } catch {
    return Response.json({ ok: false, error: "bad-json" }, { status: 400 });
  }

  const event = body.event;
  if (event !== "pageview" && event !== "click" && event !== "search" && event !== "custom") {
    return Response.json({ ok: false, error: "bad-event" }, { status: 400 });
  }

  // Extract client signals from request headers (Vercel-injected).
  const ip =
    req.headers.get("x-real-ip") ??
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "";
  const userAgent = req.headers.get("user-agent") ?? "";
  const referer = req.headers.get("referer") ?? "";

  // Block self-referrers to reduce noise.
  if (referer.includes("/api/track")) {
    return Response.json({ ok: true, skipped: "self-referer" });
  }

  // Fire and forget · don't await error-handling propagation.
  await fireDiscord({
    event,
    page: body.page,
    target: body.target,
    href: body.href,
    compound: body.compound,
    ip,
    userAgent,
    referer,
    meta: body.meta,
  });

  return Response.json({ ok: true });
}

/** GET handler · health check. */
export async function GET() {
  return Response.json({
    ok: true,
    endpoint: "peppudex /api/track",
    methods: ["POST"],
  });
}
