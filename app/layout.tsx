import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Luxury Real Estate Los Angeles | Apex Luxe Realty Group",
  description:
    "Premier luxury real estate brokerage serving Bel Air, Malibu, Beverly Hills, Pacific Palisades, and greater Los Angeles. Browse exclusive estates, connect with top advisors, and get instant answers through our AI concierge.",
  keywords: [
    "luxury real estate Los Angeles",
    "Bel Air homes for sale",
    "Malibu beach estates",
    "Beverly Hills real estate",
    "Pacific Palisades homes",
    "AI real estate concierge",
    "Trulience avatar real estate",
  ],
  openGraph: {
    title: "Luxury Real Estate Los Angeles | Apex Luxe Realty Group",
    description:
      "Browse curated estate listings, ask questions through our AI concierge, and connect with a luxury advisor — all on one premium brokerage platform.",
    type: "website",
    siteName: "Apex Luxe Realty Group",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplay.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
