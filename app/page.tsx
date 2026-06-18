import AIConcierge from "@/components/AIConcierge";
import AvatarInstructions from "@/components/AvatarInstructions";
import CRMHandoff from "@/components/CRMHandoff";
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
    "Luxury real estate AI concierge demo — powered by NALA and Trulience. Demonstrating 24/7 avatar-assisted buyer qualification, CRM lead routing, and showing request management for Atlanta luxury properties.",
  areaServed: [
    "Buckhead",
    "Sandy Springs",
    "North Atlanta",
    "Vinings",
    "Atlanta",
    "Georgia",
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
  name: "Atlanta Luxury Demo Listings — Luminary Realty Group",
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
        {/* 1 · Hero */}
        <Hero />

        {/* Trust bar */}
        <div className="border-b border-neutral-100 bg-white py-5">
          <div className="section-shell flex flex-wrap items-center justify-center gap-x-10 gap-y-3 sm:justify-between">
            {[
              "Avatar-Powered Buyer Qualification",
              "24/7 AI Concierge",
              "CRM-Ready Lead Handoff",
              "Document Collection Built-In",
              "Powered by NALA",
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

        {/* 2 · Atlanta demo listings */}
        <FeaturedListings />

        {/* 3 · AI Concierge — live Trulience avatar */}
        <AIConcierge />

        {/* 4 · CRM Handoff + document upload */}
        <CRMHandoff />

        {/* 5 · Neighborhoods */}
        <Neighborhoods />

        {/* 6 · Buyer Journey */}
        <HowItWorks />

        {/* 7 · Advisory Team */}
        <Team />

        {/* 8 · Lead Capture form */}
        <LeadCaptureCRM />

        {/* 9 · Use Cases */}
        <UseCases />

        {/* 10 · NALA Avatar Instructions */}
        <AvatarInstructions />

        {/* 11 · FAQ */}
        <FAQ />

        {/* 12 · Final CTA */}
        <section data-reveal className="bg-white py-16 sm:py-20">
          <div className="section-shell rounded-2xl bg-gradient-to-br from-neutral-950 via-[#1a1208] to-neutral-950 px-8 py-14 text-white sm:px-12">
            <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              <div className="max-w-xl">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#c49a3c]/30 bg-[#c49a3c]/10 px-3 py-1.5">
                  <span className="flex size-4 items-center justify-center rounded-full bg-[#c49a3c] text-[0.48rem] font-bold text-neutral-950">N</span>
                  <span className="text-[0.62rem] font-semibold text-[#e0be6e]">Powered by NALA</span>
                </div>
                <h2 className="display-serif text-3xl text-white sm:text-4xl">
                  Turn Listing Interest Into Qualified Conversations
                </h2>
                <p className="mt-4 text-sm leading-7 text-white/60">
                  Give buyers a polished way to ask questions at peak interest and give your
                  team the context they need to close — all through one AI-powered workflow.
                </p>
              </div>
              <div className="flex shrink-0 flex-col gap-3 sm:flex-row md:flex-col">
                <a
                  href="#concierge"
                  className="rounded-full bg-[#c49a3c] px-7 py-3 text-center text-sm font-semibold text-neutral-950 transition hover:bg-[#e0be6e]"
                >
                  Try the Avatar Now
                </a>
                <a
                  href="#crm-handoff"
                  className="rounded-full border border-white/20 px-7 py-3 text-center text-sm font-semibold text-white transition hover:border-white"
                >
                  See CRM Handoff Demo
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
