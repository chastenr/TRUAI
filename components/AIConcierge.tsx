import Image from "next/image";
import AskNalaButton from "./AskNalaButton";
import NalaSupportPanel from "./NalaSupportPanel";
import TrulienceEmbed from "./TrulienceEmbed";

export default function AIConcierge() {
  return (
    <section id="concierge" data-reveal className="bg-neutral-950 py-16 text-white sm:py-24">
      <div className="section-shell">
        {/* Banner image */}
        <div className="relative mb-10 overflow-hidden rounded-2xl">
          <div className="relative h-[260px] w-full sm:h-[320px] lg:h-[360px]">
            <Image
              src="/images/concierge-header.png"
              alt="Luxury Atlanta estate — NALA AI Real Estate Concierge"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1200px) 100vw, 1160px"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
          <div className="absolute inset-0 flex flex-col items-start justify-center px-7 sm:px-10">
            <span className="rounded-full border border-[#c49a3c]/40 bg-[#c49a3c]/15 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[#c49a3c] backdrop-blur-sm">
              NALA AI Concierge
            </span>
            <h2 className="display-serif mt-4 text-3xl text-white drop-shadow-lg sm:text-4xl lg:text-5xl">
              Ask Our AI Real<br className="hidden sm:block" /> Estate Concierge
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-7 text-white/72 sm:text-base">
              Never miss a lead. NALA answers buyer questions 24/7, qualifies prospects,
              and routes every serious inquiry to your CRM — while your team sleeps.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#crm-handoff" className="rounded-full bg-[#c49a3c] px-6 py-2.5 text-sm font-semibold text-neutral-950 transition hover:bg-[#e0be6e]">
                See Live Lead Card
              </a>
              <AskNalaButton
                address=""
                question="Which current listing should I look at first?"
                className="rounded-full border border-white/25 px-6 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-white hover:bg-white/10"
              >
                Ask About a Listing
              </AskNalaButton>
            </div>
          </div>
        </div>

        {/* Section header */}
        <div className="flex flex-col gap-5 border-b border-white/10 pb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">AI Concierge · Available 24/7</p>
            <h3 className="display-serif mt-3 text-4xl text-white sm:text-5xl">
              Instant Answers.<br className="hidden sm:block" /> Any Property. Any Hour.
            </h3>
          </div>
          <p className="max-w-sm text-sm leading-7 text-white/50">
            NALA handles every conversation live through the avatar — by voice or text.
            Use Trulience for the live conversation, then review the CRM-ready handoff
            preview below for routing into your platform.
          </p>
        </div>

        {/* Main grid: avatar + listing / lead panel */}
        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1fr]">
          {/* Left: live avatar */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2.5">
              <div className="flex items-center gap-2">
                <span className="relative flex size-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70" />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
                </span>
                <span className="text-xs font-semibold text-white/70">NALA Online · 24/7</span>
              </div>
              <span className="rounded-full bg-[#c49a3c]/15 px-2.5 py-1 text-[0.62rem] font-semibold text-[#c49a3c]">
                AI Concierge
              </span>
            </div>

            {/* NALA voice avatar */}
            <TrulienceEmbed />

            <div className="rounded-xl border border-white/10 bg-white/[0.04] p-5">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: "◎", title: "Listing Knowledge",   desc: "Price, availability, features, neighborhood details." },
                  { icon: "◷", title: "24/7 Availability",   desc: "Captures after-hours leads when your team is offline." },
                  { icon: "◈", title: "Lead Qualification",  desc: "Collects name, budget, timeline, and intent." },
                  { icon: "◉", title: "CRM Handoff",         desc: "Routes leads to HubSpot, FUB, or any webhook." },
                ].map((f) => (
                  <div key={f.title} className="rounded-lg border border-white/8 bg-white/[0.03] p-3">
                    <span className="text-lg text-[#e0be6e]">{f.icon}</span>
                    <p className="mt-1.5 text-xs font-semibold text-white">{f.title}</p>
                    <p className="mt-1 text-[0.68rem] leading-5 text-white/45">{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: listing reference + live lead preview */}
          <div className="flex flex-col">
            <NalaSupportPanel />
          </div>
        </div>
      </div>
    </section>
  );
}
