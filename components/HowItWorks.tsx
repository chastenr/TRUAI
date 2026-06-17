const steps = [
  {
    step: "01",
    title: "Browse Listings",
    desc: "Explore curated estate listings filtered by neighborhood, price, and lifestyle criteria.",
  },
  {
    step: "02",
    title: "Ask the AI Concierge",
    desc: "Get instant answers on availability, price history, schools, showings, and similar properties.",
  },
  {
    step: "03",
    title: "Share Your Intent",
    desc: "The AI gathers your name, budget, timeline, and neighborhood preferences during the conversation.",
  },
  {
    step: "04",
    title: "Matched with an Advisor",
    desc: "Your profile and conversation context are routed to the most qualified agent on the team.",
  },
];

const questions = [
  "Is this property still available?",
  "Can I schedule a private showing?",
  "What schools are near this home?",
  "Can you send me similar listings?",
  "What is the estimated monthly payment?",
  "Can I speak with an agent now?",
  "Is this a strong investment area?",
  "Can I get pre-qualified before touring?",
];

export default function HowItWorks() {
  return (
    <>
      {/* ── Buyer Journey ── */}
      <section data-reveal className="bg-white py-16 sm:py-24">
        <div className="section-shell">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
            {/* Left: copy */}
            <div>
              <p className="eyebrow">The Buyer Journey</p>
              <h2 className="display-serif mt-3 text-4xl text-neutral-950 sm:text-5xl">
                From First Question<br className="hidden sm:block" /> to the Right Advisor
              </h2>
              <p className="mt-5 max-w-md text-sm leading-7 text-neutral-500">
                The AI concierge sits at the moment of maximum interest — when a buyer is
                actively browsing. It turns passive browsing into a qualified lead, fully
                contextualized for the advisor follow-up.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#listings"
                  className="rounded-full bg-neutral-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#9a7620]"
                >
                  Browse Listings
                </a>
                <a
                  href="#concierge"
                  className="rounded-full border border-neutral-300 px-6 py-3 text-sm font-semibold text-neutral-900 transition hover:border-neutral-950"
                >
                  Ask a Question
                </a>
              </div>
            </div>

            {/* Right: step cards */}
            <div className="space-y-3">
              {steps.map((s) => (
                <div
                  key={s.step}
                  className="flex gap-5 rounded-lg border border-neutral-100 bg-neutral-50 px-5 py-4 transition hover:border-neutral-200"
                >
                  <span className="mt-0.5 shrink-0 text-sm font-semibold text-[#c49a3c]">
                    {s.step}
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-neutral-950">{s.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-neutral-500">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Buyer Questions ── */}
      <section data-reveal className="bg-[#f8f6f2] py-16 sm:py-24">
        <div className="section-shell">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow">Buyer Questions</p>
              <h2 className="display-serif mt-3 text-4xl text-neutral-950 sm:text-5xl">
                Common answers, instantly
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-7 text-neutral-500">
              These are the questions real buyers ask at peak interest. The AI concierge
              handles each one in real time, day or night.
            </p>
          </div>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {questions.map((q) => (
              <a
                key={q}
                href="#concierge"
                className="soft-lift rounded-lg border border-neutral-200 bg-white px-5 py-4 text-sm font-medium leading-6 text-neutral-800 transition hover:border-[#c49a3c]/40 hover:text-[#9a7620]"
              >
                {q}
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
