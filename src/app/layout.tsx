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

export const metadata: Metadata = {
  metadataBase: new URL("https://peppudex.com"),
  title: "PEPPUDEX · Peppu Pokedex of Research Peptides",
  description:
    "PEPPUDEX · the Pokedex of research-grade peptides. Card-style profiles, mechanism notes, peer-reviewed sources. Powered by Peppu Studio and Peppu Labs.",
  openGraph: {
    title: "PEPPUDEX · Peppu Pokedex of Research Peptides",
    description:
      "Pokedex-style cards for research peptides. Mechanism notes, sources, levels and types.",
    siteName: "PEPPUDEX",
    type: "website",
    url: "https://peppudex.com",
  },
  robots: {
    index: true,
    follow: true,
  },
  // Google Search Console site verification.
  // Set GOOGLE_SITE_VERIFICATION on Vercel env to the value Google shows
  // when adding peppudex.com as a URL-prefix property.
  ...(process.env.GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } }
    : {}),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${pixel.variable} ${body.variable}`}>
      <head>
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
