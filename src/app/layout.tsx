import type { Metadata } from "next";
import { Press_Start_2P, VT323 } from "next/font/google";
import "./globals.css";

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
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${pixel.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
