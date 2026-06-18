const systemPrompt = `You are NALA, a 24/7 AI real estate assistant powered by Northside Advanced Learning Applications, Inc., deployed for Abbie Shepherd Real Estate Group (Keller Williams Buckhead). Your job is to help buyers, sellers, investors, and relocating clients understand available properties and take the next best step.

You serve the greater Atlanta market, including Buckhead, Brookhaven, Sandy Springs, East Cobb, Roswell, Midtown, Decatur, Peachtree City, and surrounding communities.

You should answer questions about property listings, price, location, bedrooms, bathrooms, square footage, lot size, amenities, taxes, HOA, estimated monthly costs, showing availability, disclosures, neighborhood details, nearby schools, commute considerations, and similar properties.

When a visitor asks about a listing, be helpful, clear, and professional. If the visitor seems interested, ask for their name, email, phone number, budget range, desired neighborhood, buying timeline, and whether they are already working with an agent.

If the visitor wants to tour a property, ask whether they are prequalified, paying cash, or able to provide proof of funds. Explain that showing confirmations require contact with the listing agent — Abbie Shepherd Real Estate Group can be reached at (404) 275-5561 or through abbieagent.com.

If the visitor is just browsing, continue helping them compare neighborhoods, property types, price ranges, and lifestyle needs. If they are serious, guide them toward scheduling a showing or speaking with Abbie or Doug Blanchard directly.

Always be polite, trustworthy, and concise. Never claim that a showing, price, availability, tax amount, or financial estimate is guaranteed. Say that final details should be verified with Abbie Shepherd Real Estate Group or the listing agent.`;

const capabilities = [
  { label: "Listing Q&A",       desc: "Price, beds, baths, sq ft, features, availability" },
  { label: "Neighborhood Info",  desc: "Schools, commutes, lifestyle, price comparisons" },
  { label: "Showing Requests",   desc: "Collects buyer info and routes to advisor" },
  { label: "Lead Qualification", desc: "Budget, timeline, prequalification status" },
  { label: "CRM Routing",        desc: "Sends lead data to connected CRM platform" },
  { label: "After-Hours Cover",  desc: "Captures serious buyers 24/7 with full context" },
];

export default function AvatarInstructions() {
  return (
    <section data-reveal className="bg-[#f8f6f2] py-16 sm:py-24">
      <div className="section-shell">
        {/* Section header */}
        <div className="flex flex-col gap-5 border-b border-neutral-200 pb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">NALA Avatar Configuration</p>
            <h2 className="display-serif mt-3 text-4xl text-neutral-950 sm:text-5xl">
              How NALA Is Trained<br className="hidden sm:block" /> to Respond
            </h2>
          </div>
          <div className="max-w-sm">
            <p className="text-sm leading-7 text-neutral-500">
              The system prompt below is the instruction set loaded into the NALA avatar
              configuration to deploy NALA as a 24/7 AI concierge for Abbie Shepherd Real Estate Group.
            </p>
            <div className="mt-3 flex items-center gap-2">
              <span className="rounded-full bg-neutral-950 px-3 py-1 text-[0.65rem] font-semibold text-white">
                NALA
              </span>
              <span className="text-xs text-neutral-400">
                Northside Advanced Learning Applications, Inc.
              </span>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">
          {/* System prompt display */}
          <div>
            <div className="flex items-center justify-between rounded-t-xl border border-neutral-200 bg-neutral-950 px-5 py-3">
              <div className="flex items-center gap-2">
                <span className="size-2.5 rounded-full bg-red-400" />
                <span className="size-2.5 rounded-full bg-amber-400" />
                <span className="size-2.5 rounded-full bg-emerald-400" />
              </div>
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/40">
                NALA · System Prompt · v1
              </p>
              <span className="rounded-full border border-[#e0be6e]/30 bg-[#e0be6e]/10 px-2.5 py-0.5 text-[0.62rem] font-semibold text-[#e0be6e]">
                NALA
              </span>
            </div>
            <pre className="overflow-x-auto rounded-b-xl border border-t-0 border-neutral-200 bg-[#0f1117] p-6 text-[0.78rem] leading-7 text-emerald-300/80 whitespace-pre-wrap">
              {systemPrompt}
            </pre>
            <p className="mt-3 text-xs text-neutral-400">
              This prompt is loaded into the NALA avatar configuration panel. It
              defines NALA&apos;s persona, scope, tone, and lead qualification behavior.
              Customize for each brokerage, agent team, or market before going live.
            </p>
          </div>

          {/* Capability tiles */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-neutral-400">
              What NALA Handles
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {capabilities.map((c) => (
                <div
                  key={c.label}
                  className="flex gap-4 rounded-lg border border-neutral-200 bg-white px-5 py-4"
                >
                  <span className="mt-0.5 text-base text-[#c49a3c]">✓</span>
                  <div>
                    <p className="text-sm font-semibold text-neutral-950">{c.label}</p>
                    <p className="mt-0.5 text-xs leading-5 text-neutral-500">{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Powered-by block */}
            <div className="rounded-lg border border-neutral-200 bg-neutral-950 p-5 text-white">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#e0be6e]">
                Powered by NALA
              </p>
              <p className="mt-2 text-sm font-semibold">
                Northside Advanced Learning Applications, Inc.
              </p>
              <p className="mt-2 text-xs leading-6 text-white/50">
                NALA handles the AI intelligence layer, avatar experience, voice experience,
                and real-time interaction — delivering a seamless concierge from first
                question to qualified lead handoff.
              </p>
              <a
                href="#crm"
                className="mt-4 block rounded-full bg-[#c49a3c] px-5 py-2.5 text-center text-xs font-semibold text-neutral-950 transition hover:bg-white"
              >
                Deploy NALA for Your Brokerage
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
