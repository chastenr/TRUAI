const previewFields = [
  ["Lead source", "Website / NALA AI Concierge"],
  ["Name", "Jordan Ellis"],
  ["Phone", "(404) 555-0198"],
  ["Email", "jordan.ellis@example.com"],
  ["Interested property", "395 Spindle CT"],
  ["Buyer intent", "Private showing request"],
  ["Budget", "$900K - $1.1M"],
  ["Timeline", "Touring this week, decision within 60 days"],
  ["Conversation summary", "Buyer asked about pricing, neighborhood access, schools, and available showing windows."],
  ["Showing requested", "Yes"],
  ["Next action", "Agent follow-up with showing confirmation"],
];

export default function CRMHandoffPreview() {
  return (
    <section data-reveal className="bg-neutral-950 py-16 text-white sm:py-24">
      <div className="section-shell">
        <div className="flex flex-col gap-5 border-b border-white/10 pb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">Lead Database Preview</p>
            <h2 className="display-serif mt-3 text-4xl text-white sm:text-5xl">
              What the Agent<br className="hidden sm:block" /> Receives
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-7 text-white/50">
            NALA creates structured lead context for future follow-up, drip campaigns,
            showing coordination, and long-term revenue opportunities.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="rounded-xl border border-white/10 bg-[#0a0c10]">
            <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3">
              <span className="size-2.5 rounded-full bg-red-400" />
              <span className="size-2.5 rounded-full bg-amber-400" />
              <span className="size-2.5 rounded-full bg-emerald-400" />
              <p className="ml-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/35">
                CRM-ready lead record
              </p>
            </div>
            <dl className="divide-y divide-white/8">
              {previewFields.map(([label, value]) => (
                <div key={label} className="grid gap-2 px-5 py-3.5 sm:grid-cols-[180px_1fr]">
                  <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-white/35">
                    {label}
                  </dt>
                  <dd className="text-sm leading-6 text-[#e0be6e]">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="rounded-xl border border-[#c49a3c]/25 bg-[#c49a3c]/10 p-6">
            <p className="text-sm font-semibold text-[#e0be6e]">Why this matters</p>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-white/65">
              <li>• Agents know who the buyer is and what they want before calling.</li>
              <li>• The team can build a searchable lead database over time.</li>
              <li>• Follow-up campaigns can be based on budget, location, and intent.</li>
              <li>• Future production workflows can sync this data into the client CRM.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
