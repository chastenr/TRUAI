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
  title: "Abbie Shepherd Real Estate Group | Powered by NALA",
  description:
    "Abbie Shepherd Real Estate Group — Keller Williams Buckhead. Serving buyers and sellers across Buckhead, Brookhaven, Sandy Springs, East Cobb, Roswell, Midtown, Decatur, and greater Atlanta. Powered by NALA, a 24/7 AI real estate concierge.",
  keywords: [
    "Abbie Shepherd real estate",
    "Atlanta homes for sale",
    "Buckhead real estate",
    "Brookhaven homes",
    "Sandy Springs real estate",
    "Keller Williams Buckhead",
    "Atlanta AI real estate concierge",
    "NALA real estate AI",
  ],
  openGraph: {
    title: "Abbie Shepherd Real Estate Group | Powered by NALA",
    description:
      "Browse real Atlanta listings from Abbie Shepherd Real Estate Group, ask questions through NALA — the 24/7 AI concierge — and connect with an advisor who knows your market.",
    type: "website",
    siteName: "Abbie Shepherd Real Estate Group",
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
