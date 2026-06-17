import Image from "next/image";

const prompts = [
  "Is 31802 Pacific Cove Lane still available?",
  "Can I schedule a private showing this weekend?",
  "Show me homes similar to this under $6M.",
  "I'm relocating from New York — which neighborhoods should I compare?",
  "What are the monthly costs on the Buckhead Ridge Estate?",
  "Can I speak with an advisor about 4188 Ridge Hollow Drive?",
];

export default function AIConcierge() {
  return (
    <section id="concierge" data-reveal className="bg-neutral-950 py-16 text-white sm:py-24">
      <div className="section-shell">
        {/* ── Banner image header ──────────────────────────────────────────
            Place banner image at: /public/images/concierge-header.png
            Ideal size: 1440×480, landscape. The image is dimmed with a dark
            gradient overlay — any luxury estate photography works well here.
        ──────────────────────────────────────────────────────────────────── */}
        <div className="relative mb-10 overflow-hidden rounded-2xl">
          {/* Banner image */}
          <div className="relative h-[260px] w-full sm:h-[320px] lg:h-[360px]">
            <Image
              src="/images/concierge-header.png"
              alt="Luxury estate at dusk — AI Real Estate Concierge"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1200px) 100vw, 1160px"
            />
          </div>

          {/* Dark overlay for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />

          {/* Banner text */}
          <div className="absolute inset-0 flex flex-col items-start justify-center px-7 sm:px-10">
            {/* NALA powered badge */}
            <span className="rounded-full border border-[#e0be6e]/40 bg-[#e0be6e]/15 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[#e0be6e] backdrop-blur-sm">
              Powered by NALA
            </span>

            <h2 className="display-serif mt-4 text-3xl text-white drop-shadow-lg sm:text-4xl lg:text-5xl">
              Ask Our AI Real<br className="hidden sm:block" /> Estate Concierge
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-7 text-white/72 sm:text-base">
              A 24/7 avatar assistant that answers property questions, qualifies buyers,
              captures contact details, and routes serious inquiries to the right advisor.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#crm"
                className="rounded-full bg-[#c49a3c] px-6 py-2.5 text-sm font-semibold text-neutral-950 transition hover:bg-white"
              >
                Start Avatar Demo
              </a>
              <a
                href="#listings"
                className="rounded-full border border-white/25 px-6 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-white hover:bg-white/10"
              >
                Ask About a Listing
              </a>
            </div>
          </div>
        </div>

        {/* ── Section header ── */}
        <div className="flex flex-col gap-5 border-b border-white/10 pb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">AI Concierge · Available 24/7</p>
            <h3 className="display-serif mt-3 text-4xl text-white sm:text-5xl">
              Instant Answers.<br className="hidden sm:block" /> Any Property. Any Hour.
            </h3>
          </div>
          <p className="max-w-sm text-sm leading-7 text-white/50">
            NALA is embedded directly into the listing experience — buyers get
            real-time answers on availability, pricing, showings, and neighborhood
            details without waiting for a callback.
          </p>
        </div>

        {/* ── Main content grid ── */}
        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1fr]">
          {/* Left: Avatar embed */}
          <div className="flex flex-col gap-6">
            {/*
              ── Trulience Avatar Embed ──────────────────────────────────────
              Replace the placeholder below with the Trulience iframe once
              account access and approved embed credentials are available.

              Example embed:
                <iframe
                  src="https://avatar.trulience.com/embed?avatarId=YOUR_ID&apiKey=YOUR_KEY"
                  width="100%" height="480"
                  allow="microphone; camera"
                  title="NALA — Luminary Realty AI Concierge"
                />

              Trulience configuration:
                - avatarId: custom avatar (agent, broker, or branded persona)
                - greeting: "Hi, I'm NALA! Ask me anything about our listings."
                - knowledgeBase: link to listing data and brokerage FAQ
                - crmWebhook: POST endpoint for captured lead data
                - brandColor: #c49a3c
                - fontFamily: Playfair Display, Geist Sans
                - poweredBy: "NALA — Northside Advanced Learning Applications, Inc."

              Custom avatar creation may have additional cost.
              ────────────────────────────────────────────────────────────────
            */}
            <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.04]">
              <div className="flex min-h-[420px] flex-col items-center justify-center gap-6 p-8 text-center">
                {/* NALA avatar placeholder */}
                <div className="relative">
                  <div className="flex size-24 items-center justify-center rounded-full border border-[#e0be6e]/30 bg-[#e0be6e]/10 text-2xl font-bold text-[#e0be6e]">
                    NALA
                  </div>
                  {/* Animated ring */}
                  <div className="animate-ping absolute inset-0 rounded-full border border-[#e0be6e]/20" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#e0be6e]">
                    Trulience Avatar Placeholder
                  </p>
                  <p className="mt-1 text-[0.7rem] text-white/40">
                    Powered by NALA — Northside Advanced Learning Applications
                  </p>
                  <p className="mt-3 max-w-xs text-sm leading-7 text-white/55">
                    The Trulience avatar embed appears here once your account
                    credentials and API keys are configured.
                  </p>
                </div>
                <a
                  href="#crm"
                  className="rounded-full bg-[#c49a3c] px-6 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-white"
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
                <span className="text-[0.65rem] font-semibold text-white/70">NALA Online</span>
              </div>
            </div>

            {/* AI response mock */}
            <div className="rounded-xl border border-white/10 bg-white/[0.04] p-5">
              {/*
                Future integrations:
                - Text/chat: connect typed messages to listing knowledge base + CRM
                - SMS: automate text inquiries with consent and compliance rules
                - Voice/phone: inbound call intake via approved voice provider
              */}
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/35">
                NALA Response Preview
              </p>
              <p className="mt-3 text-sm leading-7 text-white/70">
                &ldquo;Hi! I&apos;m NALA, your AI real estate concierge. I can answer listing questions,
                qualify your timeline, check availability, and connect you with the right
                Luminary advisor — 24 hours a day, 7 days a week.&rdquo;
              </p>
              <div className="mt-3 flex items-center gap-2">
                <span className="rounded-full bg-[#e0be6e]/15 px-2.5 py-1 text-[0.62rem] font-semibold text-[#e0be6e]">
                  Powered by NALA
                </span>
                <span className="text-[0.62rem] text-white/30">
                  Northside Advanced Learning Applications, Inc.
                </span>
              </div>
            </div>
          </div>

          {/* Right: Conversation starters + feature highlights */}
          <div className="flex flex-col gap-6">
            <div className="rounded-xl border border-white/10 bg-white/[0.04] p-6">
              <h4 className="text-sm font-semibold text-white">
                Ask NALA anything about a property
              </h4>
              <p className="mt-2 text-xs leading-5 text-white/45">
                Tap a question or type your own. NALA answers using current listing data
                and brokerage information.
              </p>
              <div className="mt-5 space-y-2.5">
                {prompts.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-left text-sm leading-6 text-white/70 transition hover:border-[#c49a3c]/50 hover:bg-white/[0.08] hover:text-white"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            {/* Feature cards */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: "◎", title: "Listing Knowledge",  desc: "Price, availability, features, and neighborhood details." },
                { icon: "◷", title: "24/7 Availability",  desc: "Captures after-hours leads when your team is offline." },
                { icon: "◈", title: "Lead Qualification", desc: "Collects name, budget, timeline, and intent." },
                { icon: "◉", title: "CRM Handoff",        desc: "Routes leads to HubSpot, FUB, or any webhook." },
              ].map((f) => (
                <div key={f.title} className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                  <span className="text-xl text-[#e0be6e]">{f.icon}</span>
                  <p className="mt-2 text-sm font-semibold text-white">{f.title}</p>
                  <p className="mt-1 text-xs leading-5 text-white/48">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
