const team = [
  {
    name: "Vivian Mercer",
    initials: "VM",
    role: "Principal Broker · Team Lead",
    specialties: ["Estate Sales", "Negotiation", "Off-Market"],
    transactions: "180+",
    years: "18",
    copy: "Guides luxury clients through complex transactions with discreet negotiation and market-leading positioning strategy.",
  },
  {
    name: "Julian Cross",
    initials: "JC",
    role: "Luxury Buyer Specialist",
    specialties: ["Buyer Strategy", "Showings", "Offer Structuring"],
    transactions: "120+",
    years: "12",
    copy: "Helps buyers compare estates, assess lifestyle fit, navigate private showings, and build competitive offer strategies.",
  },
  {
    name: "Mara Chen",
    initials: "MC",
    role: "Listing Specialist",
    specialties: ["Staging", "Pricing", "Launch Strategy"],
    transactions: "95+",
    years: "9",
    copy: "Builds premium launch plans, compelling pricing narratives, and proactive seller communication workflows.",
  },
  {
    name: "Elena Brooks",
    initials: "EB",
    role: "Relocation Advisor",
    specialties: ["Out-of-Market", "Schools", "Investment"],
    transactions: "70+",
    years: "7",
    copy: "Supports executives, families, and investors comparing neighborhoods from out of market — from first call to closing.",
  },
];

export default function Team() {
  return (
    <section id="team" data-reveal className="bg-white py-16 sm:py-24">
      <div className="section-shell">
        {/* Section header */}
        <div className="flex flex-col gap-5 border-b border-neutral-100 pb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">The Advisory Team</p>
            <h2 className="display-serif mt-3 text-4xl text-neutral-950 sm:text-5xl">
              Human Advisors Behind<br className="hidden sm:block" /> Every Qualified Lead
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-7 text-neutral-500">
            The AI concierge qualifies each inquiry and hands off to the advisor who knows
            your market best. No cold handoffs — just warm, context-rich introductions.
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
                <p className="mt-0.5 text-[0.75rem] font-semibold text-[#8c743f]">{member.role}</p>
              </div>

              {/* Bio */}
              <p className="mt-3 flex-1 text-sm leading-6 text-neutral-600">{member.copy}</p>

              {/* Stats */}
              <div className="mt-5 flex gap-4 border-t border-neutral-200 pt-4">
                <div>
                  <p className="text-sm font-semibold text-neutral-950">{member.transactions}</p>
                  <p className="text-[0.68rem] text-neutral-400 uppercase tracking-wider">Transactions</p>
                </div>
                <div className="border-l border-neutral-200 pl-4">
                  <p className="text-sm font-semibold text-neutral-950">{member.years} yrs</p>
                  <p className="text-[0.68rem] text-neutral-400 uppercase tracking-wider">Experience</p>
                </div>
              </div>

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
          Trulience custom avatar note:
          Clients may configure the avatar to look like an agent, the principal broker,
          or a fictional brokerage spokesperson. Custom avatar creation may involve
          additional cost depending on the Trulience account tier and avatar specifications.
        */}
      </div>
    </section>
  );
}
