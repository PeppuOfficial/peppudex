/**
 * Server-side Discord webhook helper for peppudex tracking.
 *
 * Fires structured events to the Discord channel attached to env
 * `DISCORD_WEBHOOK_PEPPUDEX`. Used for funnel tracking · pageview,
 * outbound-click (wiki / peppu.studio / pepputree), and
 * daily aggregate-summary posts from the cron job.
 *
 * NEVER throw · failures are logged and swallowed so a webhook outage
 * does not break user navigation.
 */

const WEBHOOK = process.env.DISCORD_WEBHOOK_PEPPUDEX || "";

export type TrackEvent = {
  event: "pageview" | "click" | "search" | "daily-summary" | "custom";
  page?: string;
  target?: string;
  href?: string;
  compound?: string;
  ip?: string;
  userAgent?: string;
  referer?: string;
  meta?: Record<string, unknown>;
};

/**
 * Map an event to a Discord embed color (decimal).
 * Pageview = grey, click-out = orange, search = blue, summary = green.
 */
function colorFor(event: TrackEvent["event"]): number {
  switch (event) {
    case "pageview": return 0x6b7280; // grey
    case "click": return 0xf97316; // orange
    case "search": return 0x3b82f6; // blue
    case "daily-summary": return 0x10b981; // green
    default: return 0x8b5cf6; // purple
  }
}

function titleFor(t: TrackEvent): string {
  switch (t.event) {
    case "pageview":
      return `📊 PV · ${t.page ?? "/"}`;
    case "click":
      return `🔗 ${t.target ?? "click"} → ${t.href ?? "?"}`;
    case "search":
      return `🔍 ${t.meta?.query ?? "search"}`;
    case "daily-summary":
      return `📈 Daily summary · peppudex`;
    default:
      return `· ${t.target ?? "event"}`;
  }
}

/**
 * Build the Discord embed payload + send it. Returns true on success.
 */
export async function fireDiscord(t: TrackEvent): Promise<boolean> {
  if (!WEBHOOK) {
    console.warn("[peppudex/track] DISCORD_WEBHOOK_PEPPUDEX env not set, skipping fire");
    return false;
  }
  const fields: Array<{ name: string; value: string; inline?: boolean }> = [];
  if (t.page) fields.push({ name: "page", value: t.page, inline: true });
  if (t.compound) fields.push({ name: "compound", value: t.compound, inline: true });
  if (t.href) fields.push({ name: "href", value: t.href.slice(0, 256), inline: false });
  if (t.referer) fields.push({ name: "referer", value: t.referer.slice(0, 200), inline: false });
  if (t.ip) fields.push({ name: "ip", value: t.ip, inline: true });
  if (t.userAgent) {
    fields.push({
      name: "ua",
      value: t.userAgent.slice(0, 200),
      inline: false,
    });
  }
  if (t.meta) {
    for (const [k, v] of Object.entries(t.meta).slice(0, 8)) {
      fields.push({ name: k, value: String(v).slice(0, 200), inline: true });
    }
  }
  const body = {
    username: "peppudex",
    embeds: [
      {
        title: titleFor(t).slice(0, 256),
        color: colorFor(t.event),
        timestamp: new Date().toISOString(),
        fields,
      },
    ],
  };
  try {
    const res = await fetch(WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      console.warn("[peppudex/track] discord webhook failed", res.status);
      return false;
    }
    return true;
  } catch (err) {
    console.warn("[peppudex/track] discord webhook threw", err);
    return false;
  }
}
