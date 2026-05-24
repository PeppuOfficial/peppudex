/**
 * Inline POV video preview for compound detail pages.
 *
 * Renders a looping autoplay video above the card image when the slug
 * has a video file present at `/cards/videos/<slug>.mp4`. List is
 * hardcoded at build time so we never request a missing file or pay
 * for client-side existence checks. Card image stays as the poster
 * fallback for slugs that have no video.
 *
 * Style matches the detail-side card image: same effective width,
 * rounded corners, drop shadow, paper background.
 */

const VIDEO_SLUGS = new Set<string>([
  "bpc-157",
  "ghk-cu",
  "humanin",
  "ipa-cjc1295",
  "kisspeptin-10",
  "klow-blend",
  "mots-c",
  "nad-plus",
  "pt-141",
  "retatrutide",
  "selank",
  "semax",
  "tesamorelin",
  "thymosin-alpha-1",
  "tirzepatide",
]);

export function hasCompoundVideo(slug: string): boolean {
  return VIDEO_SLUGS.has(slug);
}

interface CompoundVideoProps {
  slug: string;
  name: string;
}

export default function CompoundVideo({ slug, name }: CompoundVideoProps) {
  if (!hasCompoundVideo(slug)) return null;
  const src = `/cards/videos/${slug}.mp4`;
  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      src={src}
      aria-label={`${name} POV video preview`}
      style={{
        width: "100%",
        aspectRatio: "9 / 16",
        objectFit: "cover",
        border: "3px solid var(--ink)",
        borderRadius: 14,
        background: "var(--ink)",
        boxShadow: "6px 6px 0 rgba(0,0,0,0.35)",
        display: "block",
      }}
    />
  );
}
