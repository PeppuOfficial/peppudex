import { ImageResponse } from "next/og";
import { PEPPUDEX } from "@/data/peppudex";

/**
 * Dynamic OpenGraph image · /peptides/[slug]/opengraph-image
 *
 * Reference: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image
 *
 * Layout (1200x630, black bg):
 *   ┌─────────────────────────────────────────────────┐
 *   │  [card image · left half]   │  NAME (huge)      │
 *   │                             │  Lv. + HP + types │
 *   │                             │  mechanism (clip) │
 *   │                             │                   │
 *   │  PEPPUDEX · peppudex.com                        │
 *   └─────────────────────────────────────────────────┘
 */

export const runtime = "nodejs"; // edge runtime cannot reach the on-disk PNG via fetch+localhost
export const alt = "Peppudex compound card";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateImageMetadata({ params }: { params: { slug: string } }) {
  const e = PEPPUDEX.find((p) => p.slug === params.slug);
  return [
    {
      id: "default",
      alt: e ? `${e.name} · PEPPUDEX` : "Peppudex compound",
      contentType: "image/png",
      size: { width: 1200, height: 630 },
    },
  ];
}

const TYPE_COLOR: Record<string, string> = {
  metabolic: "#F06292",
  incretin: "#BA68C8",
  longevity: "#FFE680",
  cognition: "#64B5F6",
  regen: "#81C784",
  growth: "#FFB74D",
  cytoprotection: "#A1887F",
  multi: "#FFFFFF",
};

const BASE = "https://peppudex.com";

export default async function OgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = PEPPUDEX.find((p) => p.slug === slug);

  // Fallback if slug somehow unknown · still returns a valid PNG.
  const name = entry?.name ?? "PEPPUDEX";
  const mechanism = entry?.mechanism ?? "Reference encyclopedia of research-grade peptides.";
  const level = entry?.level ?? 0;
  const hp = entry?.hp ?? 0;
  const types = entry?.types ?? [];
  const cardSrc = entry?.card ? `${BASE}${entry.card}` : null;

  // Clip mechanism so the right column never overflows.
  const mechClip = mechanism.length > 220 ? mechanism.slice(0, 217) + "..." : mechanism;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0A0A0A",
          display: "flex",
          flexDirection: "row",
          fontFamily: "sans-serif",
          color: "#FFFFFF",
          position: "relative",
        }}
      >
        {/* Subtle radial accent · sells "card" energy without an image asset. */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 25% 40%, rgba(255,230,128,0.10) 0%, transparent 55%)",
            display: "flex",
          }}
        />

        {/* LEFT · card image */}
        <div
          style={{
            width: 540,
            height: 630,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 40,
            zIndex: 1,
          }}
        >
          {cardSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={cardSrc}
              alt={name}
              width={460}
              height={550}
              style={{
                objectFit: "contain",
                borderRadius: 12,
                boxShadow: "0 12px 36px rgba(0,0,0,0.55)",
              }}
            />
          ) : (
            <div
              style={{
                width: 460,
                height: 550,
                background: "#1A1A1A",
                border: "4px solid #FFE680",
                borderRadius: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 48,
                color: "#FFE680",
                letterSpacing: "0.1em",
              }}
            >
              PEPPUDEX
            </div>
          )}
        </div>

        {/* RIGHT · name + meta + mechanism */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            padding: "60px 60px 60px 0",
            zIndex: 1,
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 900,
              lineHeight: 1.0,
              letterSpacing: "-0.02em",
              color: "#FFFFFF",
              textShadow: "3px 3px 0 #000000",
              display: "flex",
            }}
          >
            {name}
          </div>

          {entry && (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 16,
                marginTop: 24,
                alignItems: "center",
              }}
            >
              <div
                style={{
                  background: "#FFE680",
                  color: "#0A0A0A",
                  padding: "8px 16px",
                  fontSize: 22,
                  fontWeight: 700,
                  borderRadius: 6,
                  display: "flex",
                }}
              >
                Lv. {level}
              </div>
              <div
                style={{
                  background: "#F06292",
                  color: "#FFFFFF",
                  padding: "8px 16px",
                  fontSize: 22,
                  fontWeight: 700,
                  borderRadius: 6,
                  display: "flex",
                }}
              >
                HP {hp}
              </div>
              {types.slice(0, 2).map((t) => (
                <div
                  key={t}
                  style={{
                    background: TYPE_COLOR[t] ?? "#FFFFFF",
                    color: "#0A0A0A",
                    padding: "8px 16px",
                    fontSize: 18,
                    fontWeight: 700,
                    borderRadius: 6,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    display: "flex",
                  }}
                >
                  {t}
                </div>
              ))}
            </div>
          )}

          <div
            style={{
              marginTop: 36,
              fontSize: 26,
              lineHeight: 1.35,
              color: "#DDDDDD",
              display: "flex",
            }}
          >
            {mechClip}
          </div>

          <div style={{ flex: 1, display: "flex" }} />

          {/* Bottom brand mark */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 16,
              marginTop: 32,
            }}
          >
            <div
              style={{
                fontSize: 28,
                fontWeight: 900,
                letterSpacing: "0.14em",
                color: "#FFFFFF",
                display: "flex",
              }}
            >
              PEPPU
              <span style={{ color: "#FFE680", display: "flex" }}>DEX</span>
            </div>
            <div
              style={{
                fontSize: 20,
                color: "#888888",
                letterSpacing: "0.05em",
                display: "flex",
              }}
            >
              · peppudex.com
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
