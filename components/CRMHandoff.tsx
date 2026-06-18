"use client";

import { useState } from "react";
import DocUpload from "./DocUpload";

const crmProviders = [
  { name: "HubSpot",     color: "bg-orange-500" },
  { name: "Salesforce",  color: "bg-blue-600" },
  { name: "Follow Up Boss", color: "bg-green-600" },
  { name: "Lofty",       color: "bg-violet-600" },
  { name: "Go High Level", color: "bg-emerald-600" },
  { name: "Zapier",      color: "bg-orange-400" },
  { name: "ActiveCampaign", color: "bg-blue-500" },
  { name: "Custom CRM",  color: "bg-neutral-600" },
];

type FieldValue = string;

const defaultFields: { label: string; key: string; value: FieldValue }[] = [
  { label: "Buyer Name",        key: "name",        value: "Awaiting input" },
  { label: "Phone",             key: "phone",       value: "Awaiting input" },
  { label: "Email",             key: "email",       value: "Awaiting input" },
  { label: "Interested Property", key: "property",  value: "4188 Ridge Hollow Drive NE" },
  { label: "Budget Range",      key: "budget",      value: "Awaiting input" },
  { label: "Timeline",          key: "timeline",    value: "Awaiting input" },
  { label: "Financing Status",  key: "financing",   value: "Awaiting input" },
  { label: "Uploaded Document", key: "doc",         value: "Not uploaded yet" },
];

export default function CRMHandoff() {
  const [fields] = useState(defaultFields);
  const [sent, setSent] = useState(false);

  return (
    <section id="crm-handoff" data-reveal className="bg-neutral-950 py-16 text-white sm:py-24">
      <div className="section-shell">
        {/* Header */}
        <div className="flex flex-col gap-5 border-b border-white/10 pb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">Agent / CRM Handoff Preview</p>
            <h2 className="display-serif mt-3 text-4xl text-white sm:text-5xl">
              What the Agent<br className="hidden sm:block" /> Receives
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-7 text-white/50">
            After NALA qualifies a buyer, this structured lead record is sent to the
            brokerage CRM via webhook. In production, it routes to HubSpot, Follow Up Boss,
            Salesforce, or any connected platform.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_400px]">
          {/* Left: CRM record preview */}
          <div className="space-y-4">
            {/* Terminal-style header */}
            <div className="flex items-center gap-2 rounded-t-xl border border-white/10 bg-black px-4 py-3">
              <span className="size-2.5 rounded-full bg-red-400" />
              <span className="size-2.5 rounded-full bg-amber-400" />
              <span className="size-2.5 rounded-full bg-emerald-400" />
              <p className="ml-3 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/40">
                NALA · Lead Handoff Record · Live Preview
              </p>
              <div className="ml-auto flex items-center gap-1.5">
                <span className="relative flex size-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-emerald-400" />
                </span>
                <span className="text-[0.6rem] font-semibold text-white/40">Live</span>
              </div>
            </div>

            {/* Fields */}
            <div className="rounded-b-xl border border-t-0 border-white/10 bg-[#0a0c10]">
              <dl className="divide-y divide-white/6">
                {fields.map((f) => (
                  <div key={f.key} className="flex flex-wrap items-center justify-between gap-2 px-5 py-3.5">
                    <dt className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-white/40">
                      {f.label}
                    </dt>
                    <dd className={`text-sm font-medium ${
                      f.value === "Awaiting input" || f.value === "Not uploaded yet"
                        ? "italic text-white/25"
                        : "text-[#e0be6e]"
                    }`}>
                      {f.value}
                    </dd>
                  </div>
                ))}

                {/* Chat summary */}
                <div className="px-5 py-4">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-white/40">
                    Chat Summary
                  </p>
                  <p className="mt-2 text-sm italic leading-7 text-white/30">
                    The avatar will summarize buyer questions and next steps here.
                  </p>
                </div>

                {/* Recommended next step */}
                <div className="px-5 py-4">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-white/40">
                    Recommended Next Step
                  </p>
                  <p className="mt-2 text-sm leading-7 text-white/70">
                    Agent follow-up or private showing request
                  </p>
                </div>
              </dl>

              {/* Send to CRM button */}
              <div className="border-t border-white/8 px-5 py-4">
                <button
                  type="button"
                  onClick={() => setSent((v) => !v)}
                  className={`w-full rounded-full py-3 text-sm font-semibold transition ${
                    sent
                      ? "bg-emerald-500 text-white"
                      : "bg-[#c49a3c] text-neutral-950 hover:bg-[#e0be6e]"
                  }`}
                >
                  {sent ? "✓ Sent to CRM (demo)" : "Send Lead to CRM"}
                </button>
                <p className="mt-2 text-center text-[0.62rem] text-white/25">
                  In production, this sends a webhook POST to the connected CRM platform.
                </p>
              </div>
            </div>

            {/* CRM integrations note */}
            <p className="text-xs leading-6 text-white/35">
              <strong className="font-semibold text-white/50">Integration note:</strong>{" "}
              In production, lead data is sent server-side via a Next.js API route — never
              exposing private CRM API keys to the browser. Supports HubSpot Contacts API,
              Salesforce Lead objects, Follow Up Boss POST /contacts, Lofty webhooks, Go
              High Level contacts, Zapier webhooks, and any custom CRM REST endpoint.
            </p>
          </div>

          {/* Right: doc upload + CRM badges */}
          <div className="space-y-5">
            {/* Document upload */}
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

            {/* CRM provider badges */}
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
                All integrations are handled server-side. No private API keys are exposed
                to the browser.
              </p>
            </div>

            {/* NALA capability summary */}
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
                Test the Avatar Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
