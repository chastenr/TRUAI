const team = [
  {
    name: "Vivian Mercer",
    role: "Principal Broker / Team Lead",
    copy: "Guides luxury clients through complex transactions with discreet negotiation and market positioning.",
  },
  {
    name: "Julian Cross",
    role: "Luxury Buyer Specialist",
    copy: "Helps buyers compare estates, lifestyle fit, private showings, and offer strategy.",
  },
  {
    name: "Mara Chen",
    role: "Listing Specialist",
    copy: "Builds premium launch plans, pricing narratives, and seller communication workflows.",
  },
  {
    name: "Elena Brooks",
    role: "Relocation Advisor",
    copy: "Supports executives, families, and investors comparing neighborhoods from out of market.",
  },
];

export default function Team() {
  return (
    <section id="team" data-reveal className="bg-white py-16 sm:py-20">
      <div className="section-shell">
        <div className="max-w-2xl">
          <p className="eyebrow">Brokerage Team</p>
          <h2 className="mt-3 text-3xl font-semibold text-neutral-950 sm:text-4xl">Human advisors behind every qualified lead</h2>
        </div>
        <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <article key={member.name} className="soft-lift rounded-lg border border-neutral-200 bg-neutral-50 p-5">
              <div className="flex size-16 items-center justify-center rounded-full bg-neutral-950 text-lg font-semibold text-white">
                {member.name
                  .split(" ")
                  .map((part) => part[0])
                  .join("")}
              </div>
              <h3 className="mt-5 text-lg font-semibold text-neutral-950">{member.name}</h3>
              <p className="mt-1 text-sm font-semibold text-[#8c743f]">{member.role}</p>
              <p className="mt-3 text-sm leading-6 text-neutral-600">{member.copy}</p>
            </article>
          ))}
        </div>
        {/* Clients may customize the avatar to look like an agent, CEO, broker, or team representative. Trulience custom avatar creation may have additional cost. */}
      </div>
    </section>
  );
}
