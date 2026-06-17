const useCases = [
  {
    icon: "❶",
    title: "Buyer Questions on Listings",
    desc: "Buyers ask about price, availability, features, HOA, and neighborhood comparisons in real time — without waiting for a callback.",
  },
  {
    icon: "❷",
    title: "Seller Intake",
    desc: "Sellers describe their property, timeline, and pricing goals. The AI captures the context and qualifies their intent for the listing team.",
  },
  {
    icon: "❸",
    title: "Private Showing Requests",
    desc: "Buyers request specific dates and properties. The AI logs the request and routes it to the agent with scheduling context.",
  },
  {
    icon: "❹",
    title: "Relocation Support",
    desc: "Out-of-market buyers compare neighborhoods, schools, commute times, and lifestyle before narrowing their search remotely.",
  },
  {
    icon: "❺",
    title: "After-Hours Lead Capture",
    desc: "The concierge captures serious inquiries at midnight just as well as at noon — fully qualified and CRM-ready for morning follow-up.",
  },
  {
    icon: "❻",
    title: "CRM Routing & Handoff",
    desc: "Every lead is tagged with intent, budget, timeline, and neighborhood and routed to the right advisor via webhook or direct CRM API.",
  },
];

export default function UseCases() {
  return (
    <section data-reveal className="bg-neutral-950 py-16 text-white sm:py-24">
      <div className="section-shell">
        {/* Section header */}
        <div className="flex flex-col gap-5 border-b border-white/10 pb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">Use Cases</p>
            <h2 className="display-serif mt-3 text-4xl text-white sm:text-5xl">
              Built for Real<br className="hidden sm:block" /> Brokerage Workflows
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-7 text-white/50">
            The AI concierge fits into the moments where buyers and sellers need
            speed, clarity, and a qualified handoff to the right advisor.
          </p>
        </div>

        {/* Use case grid */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {useCases.map((u) => (
            <article
              key={u.title}
              className="soft-lift rounded-lg border border-white/10 bg-white/[0.04] p-6 transition hover:border-white/20 hover:bg-white/[0.07]"
            >
              <span className="text-lg text-[#e0be6e]" aria-hidden="true">
                {u.icon}
              </span>
              <h3 className="mt-3 text-base font-semibold text-white">{u.title}</h3>
              <p className="mt-2 text-sm leading-7 text-white/55">{u.desc}</p>
            </article>
          ))}
        </div>

        {/* Bottom CTA row */}
        <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-white/45">
            Works for individual agents, team websites, relocation divisions, and multi-office brokerages.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href="#crm"
              className="rounded-full bg-[#c49a3c] px-6 py-3 text-center text-sm font-semibold text-neutral-950 transition hover:bg-white"
            >
              Request a Demo
            </a>
            <a
              href="#concierge"
              className="rounded-full border border-white/20 px-6 py-3 text-center text-sm font-semibold text-white transition hover:border-white"
            >
              Try the AI Concierge
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
