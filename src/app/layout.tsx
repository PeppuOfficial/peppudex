import type { Metadata } from "next";
import { Press_Start_2P, VT323 } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

// Microsoft Clarity project ID. Env var lets operator rotate without code
// changes. Default fallback is the peppudex.com Clarity project.
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID || "wta0434oly";
// GA4 Measurement ID. Same env-var-rotation pattern as Clarity.
const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-75ZC28V8VJ";

const pixel = Press_Start_2P({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pixel",
  display: "swap",
});
const body = VT323({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-body",
  display: "swap",
});

const BASE_URL = "https://peppudex.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "PEPPUDEX · Peppu Pokedex of Research Peptides",
  description:
    "PEPPUDEX · the Pokedex of research-grade peptides. Card-style profiles, mechanism notes, peer-reviewed sources. Powered by Peppu Studio and Peppu Labs.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "PEPPUDEX · Peppu Pokedex of Research Peptides",
    description:
      "Pokedex-style cards for research peptides. Mechanism notes, sources, levels and types.",
    siteName: "PEPPUDEX",
    type: "website",
    url: BASE_URL,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "PEPPUDEX · Peppu Pokedex of Research Peptides",
    description:
      "Pokedex-style cards for research peptides. Mechanism notes, sources, levels and types.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  // Google Search Console site verification.
  // Set GOOGLE_SITE_VERIFICATION on Vercel env to the value Google shows
  // when adding peppudex.com as a URL-prefix property.
  ...(process.env.GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } }
    : {}),
  // Icon stack · mirrored from peppu.studio so all 4 Peppu surfaces
  // share one install icon set (PWA + iOS + Android + Windows 11).
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/peppu-app-icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/peppu-app-icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/peppu-app-icon-192.png",
  },
};

// Organization JSON-LD · brand entity for the 3-property Peppu network.
// `sameAs` lists the other 2 properties + all socials so Google collapses
// peppu.studio + peppudex.com + pepputree.com + peppugirl.com into a
// single Knowledge Graph node. Mirror with peppu-link-site + peppu.studio.
const ORG_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${BASE_URL}/#organization`,
  name: "Peppu Labs",
  legalName: "Peppu Studio LLC",
  alternateName: ["Peppu Studio", "Peppu Studio LLC", "Peppudex", "Peppu", "ペップ", "Peppulabs"],
  url: BASE_URL,
  description:
    "Peppudex is the Pokedex-style reference encyclopedia of research peptides. Card-style profiles, mechanism notes, evidence grades, peer-reviewed sources. Operated by Peppu Studio LLC.",
  slogan: "A Pokedex of research peptides",
  brand: { "@type": "Brand", name: "Peppu Labs" },
  foundingDate: "2026",
  sameAs: [
    "https://peppu.studio",
    "https://pepputree.com",
    "https://peppugirl.com",
    "https://discord.gg/pXhrnxCvJ",
    "https://t.me/peppunews",
    "https://t.me/peppulabs",
    "https://www.instagram.com/peppulabs",
    "https://www.youtube.com/@PeppuStudio",
    "https://www.tiktok.com/@peppumaxxing",
  ],
  knowsAbout: [
    "Research peptides",
    "Retatrutide",
    "Tirzepatide",
    "BPC-157",
    "GHK-Cu",
    "MOTS-c",
    "NAD+",
    "TB-500",
    "Tesamorelin",
    "Ipamorelin",
    "CJC-1295",
    "Selank",
    "Semax",
    "Kisspeptin",
    "Cagrilintide",
    "Survodutide",
    "Orforglipron",
    "Mazdutide",
    "PT-141",
    "Epitalon",
    "AOD-9604",
    "Thymosin Alpha-1",
    "Humanin",
    "Mechanism of action",
    "Evidence grading",
    "Longevity research",
    "Transhumanism",
    "Biohacking",
  ],
};

// WebSite JSON-LD · publisher references the Organization @id above so
// the entity graph stays singular.
const WEBSITE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${BASE_URL}/#website`,
  name: "PEPPUDEX",
  alternateName: "Peppudex · Pokedex of Research Peptides",
  url: BASE_URL,
  publisher: { "@id": `${BASE_URL}/#organization` },
  inLanguage: ["en-US"],
  copyrightYear: 2026,
  copyrightHolder: { "@id": `${BASE_URL}/#organization` },
  about: [
    { "@type": "Thing", name: "Research peptides" },
    { "@type": "Thing", name: "Peptide mechanism of action" },
    { "@type": "Thing", name: "Evidence-graded peptide profiles" },
    { "@type": "Thing", name: "Longevity research" },
    { "@type": "Thing", name: "Transhumanism" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${pixel.variable} ${body.variable}`}>
      <head>
        {/* Organization + WebSite JSON-LD · 3-property entity unification.
            sameAs lists peppu.studio + pepputree.com + peppugirl.com so
            Google merges the network into one Knowledge Graph node. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSONLD) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_JSONLD) }}
        />
        {/* Microsoft Clarity · session replay + heatmap. afterInteractive so
            it never blocks first paint. */}
        {CLARITY_ID && (
          <Script id="microsoft-clarity" strategy="afterInteractive">
            {`
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${CLARITY_ID}");
            `}
          </Script>
        )}
        {/* GA4 · gtag.js loader + init. afterInteractive. */}
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              id="ga4-loader"
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        )}
      </head>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
