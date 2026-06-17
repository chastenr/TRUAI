const prompts = [
  "Tell me more about 31802 Pacific Cove Lane.",
  "Can I tour this property on Saturday?",
  "Send me homes like this under $6M.",
  "I am relocating. Which neighborhoods should I compare?",
];

export default function AIConcierge() {
  return (
    <section id="concierge" data-reveal className="bg-neutral-950 py-16 text-white sm:py-20">
      <div className="section-shell grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <p className="eyebrow">Trulience Avatar Demo</p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Ask Our AI Real Estate Concierge</h2>
          <p className="mt-5 text-base leading-8 text-white/72">
            The avatar demo represents the website-based AI concierge experience. Buyers can ask property questions,
            request showings, and submit their contact details for follow-up.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href="#crm"
              className="rounded-full bg-[#b9985a] px-6 py-3 text-center text-sm font-semibold text-neutral-950 transition hover:bg-white"
            >
              Start Avatar Demo
            </a>
            <a
              href="#listings"
              className="rounded-full border border-white/20 px-6 py-3 text-center text-sm font-semibold text-white transition hover:border-white"
            >
              Ask About a Listing
            </a>
          </div>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4 sm:p-5">
          <div className="grid gap-4 md:grid-cols-[0.9fr_1.1fr]">
            <div className="flex min-h-80 flex-col justify-between rounded-lg bg-gradient-to-br from-[#3a3936] via-[#1f1f1f] to-black p-5">
              {/* Trulience avatar iframe/embed code will be inserted here. */}
              {/* Future Trulience custom avatar configuration can map avatar identity, voice, greeting, and brokerage context. */}
              {/* Trulience custom avatar creation may have additional cost depending on client requirements. */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d8be84]">Avatar Placeholder</p>
                <div className="mx-auto mt-8 flex size-36 items-center justify-center rounded-full border border-white/20 bg-white/10 text-4xl font-semibold">
                  AI
                </div>
              </div>
              <p className="text-sm leading-6 text-white/70">
                Embedded real-time avatar experience appears here once Trulience account access and approved embed
                credentials are available.
              </p>
            </div>
            <div className="rounded-lg bg-white p-5 text-neutral-950">
              <h3 className="text-lg font-semibold">Conversation starters</h3>
              <div className="mt-4 space-y-3">
                {prompts.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    className="w-full rounded-lg border border-neutral-200 bg-neutral-50 p-3 text-left text-sm leading-6 transition hover:border-[#b9985a] hover:bg-white"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
              <div className="mt-5 rounded-lg bg-neutral-950 p-4 text-sm leading-6 text-white">
                {/* Future text/chat integration can connect typed messages to a knowledge base and CRM workflow. */}
                {/* Future phone/voice API integration can support call-style lead intake and appointment routing. */}
                {/* Future SMS integration can automate text-style inquiries with consent and compliance rules. */}
                "I can answer listing questions, qualify your timeline, and connect you with the right Apex advisor."
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
