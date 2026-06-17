const prompts = [
  "Is 31802 Pacific Cove Lane still available?",
  "Can I schedule a private showing this weekend?",
  "Show me homes similar to this under $6M.",
  "I'm relocating from New York — which neighborhoods should I compare?",
  "What are the monthly costs on the Bel Air listing?",
  "Can I speak with an advisor about the Beverly Hills estate?",
];

export default function AIConcierge() {
  return (
    <section id="concierge" data-reveal className="bg-neutral-950 py-16 text-white sm:py-24">
      <div className="section-shell">
        {/* Section header */}
        <div className="flex flex-col gap-5 border-b border-white/10 pb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">AI Real Estate Concierge</p>
            <h2 className="display-serif mt-3 text-4xl text-white sm:text-5xl">
              Instant Answers.<br className="hidden sm:block" /> Any Property. Any Hour.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-7 text-white/55">
            Our AI concierge is embedded directly into the listing experience — buyers get
            real-time answers on availability, pricing, showings, and neighborhood details
            without waiting for a callback.
          </p>
        </div>

        {/* Main content grid */}
        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1fr]">
          {/* Left: Avatar embed area */}
          <div className="flex flex-col gap-6">
            {/*
              ── Trulience Avatar Embed ──────────────────────────────────────────
              Replace the placeholder div below with the Trulience iframe/script
              once account access and approved embed credentials are available.

              Example embed pattern (verify with Trulience documentation):
                <iframe
                  src="https://avatar.trulience.com/embed?avatarId=YOUR_AVATAR_ID&apiKey=YOUR_API_KEY"
                  width="100%"
                  height="480"
                  allow="microphone; camera"
                  title="Apex Luxe AI Concierge"
                />

              Configuration options to pass to Trulience:
                - avatarId: custom avatar representing the brokerage advisor persona
                - greeting: "Hello! I'm the Apex Luxe AI Concierge. Ask me about any listing."
                - knowledgeBase: link to listing data and brokerage FAQ content
                - crmWebhook: endpoint to receive captured lead data (see CRM section)
                - brandColor: #b9985a
                - fontFamily: Playfair Display, Geist Sans

              Custom avatar creation (looking like a specific agent or broker)
              may have additional cost depending on Trulience account tier.
              ──────────────────────────────────────────────────────────────────
            */}
            <div className="relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.04]">
              {/* Avatar placeholder */}
              <div className="flex min-h-[420px] flex-col items-center justify-center gap-6 p-8 text-center">
                <div className="flex size-24 items-center justify-center rounded-full border border-white/16 bg-white/8 text-3xl font-semibold text-[#d4b87a]">
                  AI
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d4b87a]">
                    Trulience Avatar Placeholder
                  </p>
                  <p className="mt-3 max-w-xs text-sm leading-7 text-white/58">
                    The Trulience avatar embed appears here once account access and API
                    credentials are configured for this brokerage.
                  </p>
                </div>
                <a
                  href="#crm"
                  className="rounded-full bg-[#b9985a] px-6 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-white"
                >
                  Request Concierge Demo
                </a>
              </div>

              {/* Live indicator */}
              <div className="absolute right-4 top-4 flex items-center gap-2 rounded-full border border-white/12 bg-black/40 px-3 py-1.5 backdrop-blur-sm">
                <span className="relative flex size-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-emerald-400" />
                </span>
                <span className="text-[0.65rem] font-semibold text-white/70">Available Now</span>
              </div>
            </div>

            {/* Concierge response mock */}
            <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
              {/*
                Future text/chat integration:
                - Connect typed messages to a listing knowledge base
                - Support intent detection (buy / sell / tour / relocate)
                - Route qualified leads to CRM via webhook

                Future SMS integration:
                - Automate text-style inquiry workflows with consent + compliance rules
                - Send listing links, showing confirmations, and follow-up reminders via SMS

                Future voice/phone API integration:
                - Support inbound call-style lead intake through an approved voice provider
                - Transcribe and route phone inquiries to the advisor CRM
              */}
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-white/40">
                AI Response Preview
              </p>
              <p className="mt-3 text-sm leading-7 text-white/72">
                &ldquo;I can answer listing questions, qualify your timeline, check availability, and
                connect you with the right Apex advisor — 24 hours a day, 7 days a week.&rdquo;
              </p>
            </div>
          </div>

          {/* Right: Conversation starters + features */}
          <div className="flex flex-col gap-6">
            {/* Prompt chips */}
            <div className="rounded-lg border border-white/10 bg-white/[0.04] p-6">
              <h3 className="text-sm font-semibold text-white">
                Ask the AI Concierge anything about a property
              </h3>
              <p className="mt-2 text-xs leading-5 text-white/50">
                Tap a question below or type your own. The concierge will answer using
                current listing data and brokerage information.
              </p>
              <div className="mt-5 space-y-2.5">
                {prompts.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-left text-sm leading-6 text-white/75 transition hover:border-[#b9985a]/50 hover:bg-white/[0.08] hover:text-white"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            {/* Feature highlights */}
            <div className="grid grid-cols-2 gap-3">
              {[
                {
                  icon: "◎",
                  title: "Listing Knowledge",
                  desc: "Instant answers on price, beds, baths, availability, and more.",
                },
                {
                  icon: "◷",
                  title: "24/7 Availability",
                  desc: "Captures after-hours leads when your team is offline.",
                },
                {
                  icon: "◈",
                  title: "Lead Qualification",
                  desc: "Collects name, budget, timeline, and preferences.",
                },
                {
                  icon: "◉",
                  title: "CRM Handoff",
                  desc: "Routes qualified leads to HubSpot, FUB, or any webhook.",
                },
              ].map((f) => (
                <div
                  key={f.title}
                  className="rounded-lg border border-white/10 bg-white/[0.04] p-4"
                >
                  <span className="text-xl text-[#d4b87a]">{f.icon}</span>
                  <p className="mt-2 text-sm font-semibold text-white">{f.title}</p>
                  <p className="mt-1 text-xs leading-5 text-white/52">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
