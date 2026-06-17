import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Real Estate Concierge Demo | Apex Luxe Realty Group",
  description:
    "Premium real estate brokerage demo showing how Trulience avatar technology can answer buyer questions, qualify leads, and send inquiries to a CRM.",
  openGraph: {
    title: "AI Real Estate Concierge Demo | Apex Luxe Realty Group",
    description:
      "Explore a premium brokerage website demo with AI concierge support, lead qualification, and CRM-ready inquiry capture.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
