"use client";

import { useSyncExternalStore, useState } from "react";
import { getLeadSnapshot, subscribeToLead } from "@/lib/lead-store";
import DocUpload from "./DocUpload";

const crmProviders = [
  { name: "HubSpot",        color: "bg-orange-500" },
  { name: "Salesforce",     color: "bg-blue-600" },
  { name: "Follow Up Boss", color: "bg-green-600" },
  { name: "Lofty",          color: "bg-violet-600" },
  { name: "Go High Level",  color: "bg-emerald-600" },
  { name: "Zapier",         color: "bg-orange-400" },
  { name: "ActiveCampaign", color: "bg-blue-500" },
  { name: "Custom CRM",     color: "bg-neutral-600" },
];

function useLead() {
  return useSyncExternalStore(subscribeToLead, getLeadSnapshot, getLeadSnapshot);
}

function Field({ label, value }: { label: string; value: string | null | boolean }) {
  const empty = value === null || value === "" || value === false || value === "Awaiting input";
  const display = empty ? "Awaiting input" : String(value);
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 px-5 py-3.5">
      <p className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-white/40">{label}</p>
      <p
        className={`text-sm font-medium transition-colors duration-500 ${
          empty ? "italic text-white/25" : "text-[#e0be6e]"
        }`}
      >
        {display}
      </p>
    </div>
  );
}

export default function CRMHandoff() {
  const lead = useLead();
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSendCRM() {
    setSending(true);
    try {
      await fetch("/api/crm-webhook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lead, source: "nala-web-chat", timestamp: new Date().toISOString() }),
      });
      setSent(true);
    } catch {
      // Demo — show success regardless
      setSent(true);
    } finally {
      setSending(false);
    }
  }

  return (
    <section id="crm-handoff" data-reveal className="bg-neutral-950 py-16 text-white sm:py-24">
      <div className="section-shell">
        {/* Header */}
        <div className="flex flex-col gap-5 border-b border-white/10 pb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">Agent / CRM Handoff · Live Preview</p>
            <h2 className="display-serif mt-3 text-4xl text-white sm:text-5xl">
              What Your Agent<br className="hidden sm:block" /> Receives
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-7 text-white/50">
            Chat with NALA above and watch this card fill in real time. When you're ready,
            send it to any connected CRM platform with one click.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_400px]">
          {/* Left: live CRM record */}
          <div className="space-y-4">
            {/* Terminal header */}
            <div className="flex items-center gap-2 rounded-t-xl border border-white/10 bg-black px-4 py-3">
              <span className="size-2.5 rounded-full bg-red-400" />
              <span className="size-2.5 rounded-full bg-amber-400" />
              <span className="size-2.5 rounded-full bg-emerald-400" />
              <p className="ml-3 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/40">
                NALA · Lead Handoff Record · Live
              </p>
              <div className="ml-auto flex items-center gap-1.5">
                <span className="relative flex size-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-emerald-400" />
                </span>
                <span className="text-[0.6rem] font-semibold text-white/40">Live</span>
              </div>
            </div>

            {/* Fields — live-fill from lead store */}
            <div className="rounded-b-xl border border-t-0 border-white/10 bg-[#0a0c10]">
              <div className="divide-y divide-white/6">
                <Field label="Buyer Name"          value={lead.name} />
                <Field label="Phone"               value={lead.phone} />
                <Field label="Email"               value={lead.email} />
                <Field label="Interested Property" value={lead.property} />
                <Field label="Budget Range"        value={lead.budget} />
                <Field label="Timeline"            value={lead.timeline} />
                <Field label="Financing Status"    value={lead.financing} />
                <Field label="Uploaded Document"   value={lead.docStatus} />

                {/* Summary */}
                <div className="px-5 py-4">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-white/40">
                    Chat Summary
                  </p>
                  <p
                    className={`mt-2 text-sm leading-7 transition-colors duration-500 ${
                      lead.summary ? "text-[#e0be6e]" : "italic text-white/25"
                    }`}
                  >
                    {lead.summary ?? "NALA will summarize buyer questions and intent here."}
                  </p>
                </div>

                {/* Next step */}
                <div className="px-5 py-4">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-white/40">
                    Recommended Next Step
                  </p>
                  <p
                    className={`mt-2 text-sm leading-7 transition-colors duration-500 ${
                      lead.nextStep ? "text-[#e0be6e]" : "text-white/60"
                    }`}
                  >
                    {lead.nextStep ?? "Agent follow-up or private showing request"}
                  </p>
                </div>

                {/* Escalate banner */}
                {lead.escalate && (
                  <div className="mx-5 mb-4 mt-0 rounded-lg border border-amber-400/30 bg-amber-400/10 px-4 py-3">
                    <p className="text-xs font-semibold text-amber-400">
                      ⚡ Escalation Requested
                    </p>
                    <p className="mt-1 text-xs text-amber-400/70">
                      {lead.escalateReason ?? "Buyer requested advisor contact or has an urgent inquiry."}
                    </p>
                  </div>
                )}
              </div>

              {/* Send to CRM */}
              <div className="border-t border-white/8 px-5 py-4">
                <button
                  type="button"
                  onClick={handleSendCRM}
                  disabled={sending || sent}
                  className={`w-full rounded-full py-3 text-sm font-semibold transition ${
                    sent
                      ? "bg-emerald-500 text-white"
                      : sending
                      ? "bg-neutral-700 text-white/50 cursor-wait"
                      : "bg-[#c49a3c] text-neutral-950 hover:bg-[#e0be6e]"
                  }`}
                >
                  {sent ? "✓ Sent to CRM" : sending ? "Sending…" : "Send Lead to CRM"}
                </button>
                <p className="mt-2 text-center text-[0.62rem] text-white/25">
                  Triggers a server-side webhook POST — no keys exposed to the browser.
                </p>
              </div>
            </div>

            <p className="text-xs leading-6 text-white/35">
              <strong className="font-semibold text-white/50">Integration note:</strong>{" "}
              Lead data is sent via a Next.js API route — never exposing private CRM keys to the
              browser. Supports HubSpot, Salesforce, Follow Up Boss, Lofty, Go High Level, Zapier,
              and any custom REST endpoint.
            </p>
          </div>

          {/* Right: doc upload + badges */}
          <div className="space-y-5">
            <div className="rounded-xl border border-white/10 bg-white/[0.04] p-5">
              <p className="text-sm font-semibold text-white">Proof of Funds / Prequalification</p>
              <p className="mt-1 text-xs leading-5 text-white/45">
                NALA prompts serious buyers to upload a document before confirming a showing.
                The file is attached to the CRM lead record.
              </p>
              <div className="mt-4">
                <DocUpload />
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.04] p-5">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/40">
                Supported CRM Platforms
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {crmProviders.map((p) => (
                  <span
                    key={p.name}
                    className={`${p.color} rounded-full px-3 py-1 text-[0.65rem] font-semibold text-white`}
                  >
                    {p.name}
                  </span>
                ))}
              </div>
              <p className="mt-3 text-xs leading-6 text-white/35">
                All integrations are handled server-side. No private API keys are exposed to the browser.
              </p>
            </div>

            <div className="rounded-xl border border-[#c49a3c]/20 bg-[#c49a3c]/5 p-5">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#c49a3c]">
                What NALA Collects
              </p>
              <ul className="mt-3 space-y-2">
                {[
                  "Buyer name, phone, and email",
                  "Budget range and financing status",
                  "Desired neighborhood and property type",
                  "Timeline and urgency",
                  "Proof of funds or prequalification document",
                  "Full conversation summary",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs leading-5 text-white/60">
                    <span className="mt-0.5 shrink-0 text-[#c49a3c]">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="#concierge"
                className="mt-5 block rounded-full bg-[#c49a3c] px-5 py-2.5 text-center text-xs font-semibold text-neutral-950 transition hover:bg-[#e0be6e]"
              >
                Chat with NALA Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
