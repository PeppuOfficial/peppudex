export const CARD_IMAGE_WIDTHS = [160, 320, 480, 640] as const;

export type CardImageVariant = "grid" | "detail" | "thumb";

const CARD_PATH_RE = /^\/cards\/([^/?#]+)\.(?:png|jpe?g|webp)$/i;

function cardBaseName(src?: string): string | null {
  if (!src) return null;
  const match = src.match(CARD_PATH_RE);
  return match?.[1] ?? null;
}

export function cardImageSrc(src?: string, width = 320): string {
  const base = cardBaseName(src);
  if (!base) return src || "/cards/placeholder.svg";
  return `/cards/optimized/${base}-${width}.webp`;
}

export function cardImageSrcSet(src?: string, variant: CardImageVariant = "grid"): string | undefined {
  const base = cardBaseName(src);
  if (!base) return undefined;
  const widths = variant === "detail" ? CARD_IMAGE_WIDTHS : CARD_IMAGE_WIDTHS.filter((width) => width <= 480);
  return widths
    .map((width) => `/cards/optimized/${base}-${width}.webp ${width}w`)
    .join(", ");
}

export function cardImageSizes(variant: CardImageVariant): string {
  switch (variant) {
    case "thumb":
      return "32px";
    case "detail":
      return "(max-width: 600px) min(100vw - 28px, 340px), 340px";
    case "grid":
    default:
      return "(max-width: 480px) 110px, (max-width: 768px) 150px, 204px";
  }
}

export function cardImageFallbackWidth(variant: CardImageVariant): number {
  switch (variant) {
    case "thumb":
      return 160;
    case "detail":
      return 640;
    case "grid":
    default:
      return 320;
  }
}
