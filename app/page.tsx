import AIConcierge from "@/components/AIConcierge";
import FAQ from "@/components/FAQ";
import FeaturedListings from "@/components/FeaturedListings";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import LeadCaptureCRM from "@/components/LeadCaptureCRM";
import RevealOnScroll from "@/components/RevealOnScroll";
import Team from "@/components/Team";
import UseCases from "@/components/UseCases";
import { faqs } from "@/data/faqs";

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "Apex Luxe Realty Group",
  description:
    "Premium real estate brokerage demo using AI concierge support for listing questions, lead qualification, and CRM-ready routing.",
  areaServed: ["Bel Air", "Malibu", "West Hollywood", "Pacific Palisades", "Los Angeles"],
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

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <RevealOnScroll />
      <Header />
      <main>
        <Hero />
        <FeaturedListings />
        <AIConcierge />
        <HowItWorks />
        <LeadCaptureCRM />
        <Team />
        <UseCases />
        <FAQ />
        <section data-reveal className="bg-white py-16 sm:py-20">
          <div className="section-shell rounded-lg bg-neutral-950 px-6 py-12 text-center text-white sm:px-10">
            <p className="eyebrow">Brokerage Demo</p>
            <h2 className="mx-auto mt-3 max-w-3xl text-3xl font-semibold sm:text-4xl">
              Turn Listing Interest Into Qualified Conversations
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/68">
              Give serious buyers and sellers a polished way to ask questions, share intent, and reach the right real
              estate advisor without waiting for office hours.
            </p>
            <div className="mx-auto mt-7 flex max-w-md flex-col gap-3 sm:flex-row sm:justify-center">
              <a
                href="#crm"
                className="rounded-full bg-[#b9985a] px-6 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-white"
              >
                Request a Demo
              </a>
              <a
                href="#concierge"
                className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white"
              >
                Ask the AI Concierge
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
