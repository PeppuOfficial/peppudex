"use client";

/**
 * Client-side tracking helpers.
 *
 * - `<PageviewBeacon>` mount-time pageview fire. Use once per page in
 *   a server component (it self-mounts the client beacon).
 * - `trackClick(target, href, compound?)` · fire-and-forget click ping
 *   from any client handler. Does NOT block navigation.
 */

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

type Meta = Record<string, string | number | boolean>;

async function fireTrack(payload: {
  event: "pageview" | "click" | "search" | "custom";
  page?: string;
  target?: string;
  href?: string;
  compound?: string;
  meta?: Meta;
}) {
  try {
    await fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    });
  } catch {
    // swallow · tracking must never block UX
  }
}

/**
 * Mount once per page · fires pageview. Re-fires on route change.
 * `compound` is optional for compound-detail pages.
 */
export function PageviewBeacon({ compound }: { compound?: string }) {
  const pathname = usePathname();
  const last = useRef<string | null>(null);
  useEffect(() => {
    if (last.current === pathname) return;
    last.current = pathname;
    fireTrack({ event: "pageview", page: pathname, compound });
  }, [pathname, compound]);
  return null;
}

/**
 * Fire a click event without blocking navigation. Use in onClick of
 * outbound anchor tags or buttons.
 */
export function trackClick(target: string, href?: string, compound?: string, meta?: Meta) {
  fireTrack({ event: "click", target, href, compound, meta });
}

/**
 * Tracked external anchor · fires a click event before allowing the
 * browser to navigate. `target` prop is renamed to `eventName` to avoid
 * collision with the HTML `target` attribute. Use `target_attr` for the
 * HTML target prop or pass it through ...rest as `target="_blank"`.
 */
export function TrackedLink({
  eventName,
  href,
  compound,
  meta,
  children,
  target_attr,
  ...rest
}: {
  eventName: string;
  href: string;
  compound?: string;
  meta?: Meta;
  children: React.ReactNode;
  /** Standard HTML target attribute · "_blank" etc. */
  target_attr?: React.HTMLAttributeAnchorTarget;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "target" | "href">) {
  return (
    <a
      href={href}
      target={target_attr}
      onClick={() => trackClick(eventName, href, compound, meta)}
      {...rest}
    >
      {children}
    </a>
  );
}
