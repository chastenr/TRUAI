const useCases = [
  "Buyer questions on listings",
  "Seller intake",
  "Showing requests",
  "Relocation support",
  "Luxury property inquiries",
  "After-hours lead capture",
  "Agent team website chatbot",
  "SMS/text-style inquiry automation",
  "CRM routing",
];

export default function UseCases() {
  return (
    <section data-reveal className="bg-neutral-950 py-16 text-white sm:py-20">
      <div className="section-shell">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">Use Cases</p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Built for real brokerage workflows</h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-white/68">
            The concierge fits into the moments where prospects need confidence, speed, and a clear handoff to the
            right advisor.
          </p>
        </div>
        <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {useCases.map((useCase) => (
            <article key={useCase} className="soft-lift rounded-lg border border-white/12 bg-white/[0.06] p-5">
              <h3 className="text-base font-semibold text-white">{useCase}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
