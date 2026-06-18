const team = [
  {
    name: "Abbie Shepherd",
    initials: "AS",
    role: "Lead Sellers Agent",
    brokerage: "Keller Williams Buckhead",
    specialties: ["Seller Strategy", "Market Positioning", "Negotiation"],
    copy: "Known for detailed market knowledge, organized communication, and results-driven positioning. Guides sellers through every step with precision and a clear strategy from first call to closing.",
    phone: "(404) 275-5561",
  },
  {
    name: "Doug Blanchard",
    initials: "DB",
    role: "Lead Buyers Agent",
    brokerage: "Keller Williams Buckhead",
    specialties: ["Buyer Consultation", "Showings", "Offer Strategy"],
    copy: "Helps buyers compare properties, assess fit, and navigate offers across the greater Atlanta market. Focused on clarity, confidence, and finding the right home at the right terms.",
    phone: "(717) 542-5552",
  },
  {
    name: "Listing Coordination",
    initials: "LC",
    role: "Listing & Transaction Support",
    brokerage: "Abbie Shepherd Real Estate Group",
    specialties: ["Staging Coordination", "Pricing Research", "Launch Prep"],
    copy: "Supports sellers with launch preparation, pricing analysis, and transaction coordination from listing agreement to closing — keeping every detail on track.",
    phone: null,
  },
  {
    name: "Relocation Services",
    initials: "RS",
    role: "Relocation & Buyer Advisory",
    brokerage: "Abbie Shepherd Real Estate Group",
    specialties: ["Out-of-Market Buyers", "Schools", "Community Fit"],
    copy: "Serves executives, families, and investors relocating to greater Atlanta. Provides neighborhood comparisons, school district guidance, and hands-on support from first virtual tour to move-in.",
    phone: null,
  },
];

export default function Team() {
  return (
    <section id="team" data-reveal className="bg-white py-16 sm:py-24">
      <div className="section-shell">
        {/* Section header */}
        <div className="flex flex-col gap-5 border-b border-neutral-100 pb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">Abbie Shepherd Real Estate Group</p>
            <h2 className="display-serif mt-3 text-4xl text-neutral-950 sm:text-5xl">
              Human Advisors Behind<br className="hidden sm:block" /> Every Qualified Lead
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-7 text-neutral-500">
            NALA qualifies each inquiry and hands off to the right advisor with full context.
            No cold introductions — just warm, context-rich conversations.
          </p>
        </div>

        {/* Team grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <article
              key={member.name}
              className="soft-lift flex flex-col rounded-lg border border-neutral-200 bg-neutral-50 p-6"
            >
              {/* Avatar */}
              <div className="flex size-[60px] items-center justify-center rounded-full bg-neutral-950 text-base font-semibold text-white">
                {member.initials}
              </div>

              {/* Name + role */}
              <div className="mt-5">
                <h3 className="text-base font-semibold text-neutral-950">{member.name}</h3>
                <p className="mt-0.5 text-[0.75rem] font-semibold text-[#9a7620]">{member.role}</p>
                <p className="mt-0.5 text-[0.68rem] text-neutral-400">{member.brokerage}</p>
              </div>

              {/* Bio */}
              <p className="mt-3 flex-1 text-sm leading-6 text-neutral-600">{member.copy}</p>

              {/* Specialty tags */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {member.specialties.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-neutral-200 bg-white px-2.5 py-1 text-[0.65rem] font-medium text-neutral-600"
                  >
                    {s}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <a
                href="#crm"
                className="mt-5 block rounded-full border border-neutral-300 py-2 text-center text-[0.75rem] font-semibold text-neutral-800 transition hover:border-neutral-950 hover:bg-neutral-950 hover:text-white"
              >
                Request Consultation
              </a>
            </article>
          ))}
        </div>

        {/*
          Custom avatar production:
          Clients may configure the avatar to represent an agent, the principal broker,
          or a branded brokerage spokesperson. Final scope and cost depend on the
          selected avatar package, delivery requirements, and customization depth.
        */}
      </div>
    </section>
  );
}
