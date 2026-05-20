import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Peptide Reconstitution Calculator · BAC Water + Syringe Units · Peppudex",
  description:
    "Free peptide reconstitution calculator. Convert vial mg + bacteriostatic water mL to syringe units per dose. Works for BPC-157, GHK-Cu, retatrutide, tirzepatide, all 27 research peptides on Peppudex. Shareable result URL.",
  alternates: { canonical: "https://peppudex.com/calculator" },
  openGraph: {
    title: "Peptide Reconstitution Calculator · 27 Research Peptides",
    description:
      "Convert vial mg + BAC water mL to syringe units. Presets for BPC-157, GHK-Cu, retatrutide, tirzepatide, MOTS-c and 22 more.",
    type: "website",
    url: "https://peppudex.com/calculator",
  },
};

export default function CalculatorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
