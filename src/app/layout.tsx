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

// Mobile viewport · viewport-fit=cover so safe-area-inset env() resolves
// on iPhone notch + home indicator. Apple HIG · iOS native pattern.
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover" as const,
  themeColor: "#1A1A2E",
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "List of Peptides and What They Do · 27 Research Peptide Cards · Peppudex",
  description:
    "List of 27 research peptides with mechanism, evidence grades A-F, FAQs and peer-reviewed sources. BPC-157, GHK-Cu, retatrutide, tirzepatide, MOTS-c, NAD+, TB-500 and 20 more. Research-only encyclopedia.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "List of Peptides and What They Do · 27 Research Peptide Reference Cards",
    description:
      "Mechanism, evidence grades, FAQs, peer-reviewed sources for 27 research peptides. Built like a Pokedex.",
    siteName: "Peppudex",
    type: "website",
    url: BASE_URL,
    locale: "en_US",
    images: [
      {
        url: `${BASE_URL}/og-default.png`,
        width: 1344,
        height: 768,
        alt: "Peppudex · Research Peptide Encyclopedia · 7 trading-card spread",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "List of Peptides and What They Do · 27 Research Peptide Reference Cards",
    description:
      "Mechanism, evidence grades, FAQs, peer-reviewed sources for 27 research peptides.",
    images: [`${BASE_URL}/og-default.png`],
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
  ...(process.env.GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } }
    : {}),
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

const ORG_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${BASE_URL}/#organization`,
  name: "Peppu Labs",
  legalName: "Peppu Studio LLC",
  alternateName: ["Peppu Studio", "Peppu Studio LLC", "Peppudex", "Peppu", "Peppulabs"],
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
};

const WEBSITE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${BASE_URL}/#website`,
  name: "Peptide Pokedex",
  alternateName: [
    "Peppudex",
    "Peptide Pokedex",
    "Peppudex · The Peptide Pokedex",
    "Research Peptide Encyclopedia",
    "List of Peptides and What They Do",
    "Research Peptide Database",
    "Peptide Reference Guide",
    "Peptide Database",
  ],
  url: BASE_URL,
  publisher: { "@id": `${BASE_URL}/#organization` },
  inLanguage: ["en-US"],
  copyrightYear: 2026,
  copyrightHolder: { "@id": `${BASE_URL}/#organization` },
  potentialAction: {
    "@type": "SearchAction",
    target: `${BASE_URL}/?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${pixel.variable} ${body.variable}`}>
      <head>
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
