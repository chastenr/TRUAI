import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import NalaFloatButton from "@/components/NalaFloatButton";
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
  title: "Atlanta Luxury Real Estate | Luminary Realty Group",
  description:
    "Premier luxury real estate brokerage serving Buckhead, North Buckhead, Sandy Springs, Vinings, Chastain Park, and greater Atlanta. Browse exclusive estates, connect with top advisors, and get instant answers through NALA — our 24/7 AI concierge.",
  keywords: [
    "luxury real estate Atlanta",
    "Buckhead homes for sale",
    "North Buckhead luxury estates",
    "Sandy Springs real estate",
    "Vinings homes for sale",
    "Atlanta AI real estate concierge",
    "NALA real estate AI",
  ],
  openGraph: {
    title: "Atlanta Luxury Real Estate | Luminary Realty Group",
    description:
      "Browse curated estate listings, ask questions through NALA our AI concierge, and connect with a luxury Atlanta advisor — all on one premium brokerage platform.",
    type: "website",
    siteName: "Luminary Realty Group",
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
        <NalaFloatButton />
      </body>
    </html>
  );
}
