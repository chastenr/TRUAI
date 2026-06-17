import AIConcierge from "@/components/AIConcierge";
import AvatarInstructions from "@/components/AvatarInstructions";
import BuckheadFeature from "@/components/BuckheadFeature";
import FAQ from "@/components/FAQ";
import FeaturedListings from "@/components/FeaturedListings";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import LeadCaptureCRM from "@/components/LeadCaptureCRM";
import Neighborhoods from "@/components/Neighborhoods";
import RevealOnScroll from "@/components/RevealOnScroll";
import Team from "@/components/Team";
import UseCases from "@/components/UseCases";
import { faqs } from "@/data/faqs";
import { listings } from "@/data/listings";

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "Luminary Realty Group",
  description:
    "Premium luxury real estate brokerage serving Bel Air, Malibu, Beverly Hills, Pacific Palisades, and greater Los Angeles, with AI concierge support for buyer questions, lead qualification, and CRM-ready routing.",
  areaServed: [
    "Bel Air",
    "Malibu",
    "Beverly Hills",
    "Pacific Palisades",
    "Brentwood",
    "West Hollywood",
    "Los Angeles",
  ],
  url: "https://example.com",
  sameAs: [],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Featured Luxury Listings — Luminary Realty Group",
  itemListElement: listings.map((l, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: l.address,
    description: l.summary,
  })),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <RevealOnScroll />
      <Header />

      <main>
        {/* 1 · Hero — luxury brokerage entry point */}
        <Hero />

        {/* Trust bar — credibility signals between hero and listings */}
        <div className="border-b border-neutral-100 bg-white py-5">
          <div className="section-shell flex flex-wrap items-center justify-center gap-x-10 gap-y-3 sm:justify-between">
            {[
              "Luxury Portfolio Specialists",
              "Discreet Off-Market Access",
              "Curated Buyer Matching",
              "AI-Powered Lead Routing",
              "24/7 Concierge Support",
            ].map((item) => (
              <p
                key={item}
                className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-neutral-400"
              >
                {item}
              </p>
            ))}
          </div>
        </div>

        {/* 2 · Featured Listings — 6 Compass-style property cards */}
        <FeaturedListings />

        {/* 3 · Neighborhoods — 6 LA luxury market cards */}
        <Neighborhoods />

        {/* 3b · Featured Demo Listing — The Buckhead Ridge Estate, Atlanta */}
        <BuckheadFeature />

        {/* 4 · AI Concierge — Trulience avatar embed + conversation starters */}
        <AIConcierge />

        {/* 5 · Buyer Journey — steps + buyer question chips */}
        <HowItWorks />

        {/* 6 · Advisory Team — 4 agent cards with specialties */}
        <Team />

        {/* 7 · CRM Lead Capture — form + mock CRM lead preview */}
        <LeadCaptureCRM />

        {/* 8 · Use Cases — 6 workflow cards with descriptions */}
        <UseCases />

        {/* 8b · Avatar Instructions — NALA system prompt + capability tiles */}
        <AvatarInstructions />

        {/* 9 · FAQ — SEO-friendly accordion */}
        <FAQ />

        {/* 10 · Final CTA band */}
        <section data-reveal className="bg-white py-16 sm:py-20">
          <div className="section-shell rounded-lg bg-neutral-950 px-8 py-14 text-white sm:px-12">
            <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              <div className="max-w-xl">
                <p className="eyebrow">Ready to Get Started?</p>
                <h2 className="display-serif mt-3 text-3xl text-white sm:text-4xl">
                  Turn Listing Interest Into Qualified Conversations
                </h2>
                <p className="mt-4 text-sm leading-7 text-white/60">
                  Give buyers a polished way to ask questions at peak interest and give your
                  team the context they need to close — all through one AI-powered workflow.
                </p>
              </div>
              <div className="flex shrink-0 flex-col gap-3 sm:flex-row md:flex-col">
                <a
                  href="#crm"
                  className="rounded-full bg-[#b9985a] px-7 py-3 text-center text-sm font-semibold text-neutral-950 transition hover:bg-white"
                >
                  Request a Demo
                </a>
                <a
                  href="#concierge"
                  className="rounded-full border border-white/20 px-7 py-3 text-center text-sm font-semibold text-white transition hover:border-white"
                >
                  Ask the AI Concierge
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
