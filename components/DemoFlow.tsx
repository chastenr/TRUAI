const flowSteps = [
  "Buyer asks about property",
  "NALA answers instantly",
  "Buyer requests showing",
  "Lead is captured",
  "Calendar event can be created",
  "CRM stores the lead",
  "Agent follows up / drip campaign starts",
];

export default function DemoFlow() {
  return (
    <section data-reveal className="bg-white py-16 sm:py-24">
      <div className="section-shell">
        <div className="flex flex-col gap-5 border-b border-neutral-100 pb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">Demo Flow</p>
            <h2 className="display-serif mt-3 text-4xl text-neutral-950 sm:text-5xl">
              From First Question<br className="hidden sm:block" /> to Follow-Up
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-7 text-neutral-500">
            The demo shows how NALA turns a browsing visitor into a qualified inquiry
            with enough context for the agent to act quickly.
          </p>
        </div>

        <div className="mt-10 grid gap-3 md:grid-cols-7">
          {flowSteps.map((step, index) => (
            <div key={step} className="relative rounded-lg border border-neutral-200 bg-[#f8f6f2] p-4">
              <span className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-[#9a7620]">
                Step {index + 1}
              </span>
              <p className="mt-2 text-sm font-semibold leading-6 text-neutral-900">{step}</p>
              {index < flowSteps.length - 1 && (
                <span className="absolute -right-2 top-1/2 hidden size-4 -translate-y-1/2 rotate-45 border-r border-t border-neutral-300 bg-[#f8f6f2] md:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
