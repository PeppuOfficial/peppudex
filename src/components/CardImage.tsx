import type { ImgHTMLAttributes } from "react";

import {
  cardImageFallbackWidth,
  cardImageSizes,
  cardImageSrc,
  cardImageSrcSet,
  type CardImageVariant,
} from "@/lib/card-images";

interface CardImageProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "srcSet" | "sizes"> {
  src?: string;
  variant?: CardImageVariant;
  priority?: boolean;
}

export default function CardImage({
  src,
  variant = "grid",
  priority = false,
  loading,
  decoding,
  fetchPriority,
  ...props
}: CardImageProps) {
  const resolvedSrc = src || "/cards/placeholder.svg";
  const srcSet = cardImageSrcSet(resolvedSrc, variant);

  return (
    <img
      {...props}
      src={cardImageSrc(resolvedSrc, cardImageFallbackWidth(variant))}
      srcSet={srcSet}
      sizes={srcSet ? cardImageSizes(variant) : undefined}
      loading={loading ?? (priority ? "eager" : "lazy")}
      decoding={decoding ?? "async"}
      fetchPriority={fetchPriority ?? (priority ? "high" : "auto")}
    />
  );
}
