"use client";

import { FormEvent, useState } from "react";
import type { LeadFormData } from "@/types";

const initialLead: LeadFormData = {
  fullName: "",
  email: "",
  phone: "",
  persona: "Buyer",
  budget: "",
  neighborhood: "",
  timeline: "",
  message: "",
};

const crmProviders = [
  "HubSpot",
  "Salesforce",
  "Follow Up Boss",
  "Lofty / Chime",
  "GoHighLevel",
  "ActiveCampaign",
  "Zapier Webhook",
  "Custom CRM API",
];

const fieldLabel: Record<keyof LeadFormData, string> = {
  fullName: "Full Name",
  email: "Email",
  phone: "Phone",
  persona: "Client Type",
  budget: "Budget Range",
  neighborhood: "Preferred Neighborhood",
  timeline: "Timeline",
  message: "Message",
};

export default function LeadCaptureCRM() {
  const [lead, setLead] = useState<LeadFormData>(initialLead);
  const [submittedLead, setSubmittedLead] = useState<LeadFormData | null>(null);

  function update(field: keyof LeadFormData, value: string) {
    setLead((cur) => ({ ...cur, [field]: value }));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmittedLead(lead);

    /*
      ── CRM Integration Point ────────────────────────────────────────────────
      Send lead data from a server action or API route — never expose private
      keys in this client component.

      Supported future destinations:
        - HubSpot:         POST to /crm/v3/objects/contacts via HubSpot API
        - Salesforce:      POST to Salesforce REST API /sobjects/Lead
        - Follow Up Boss:  POST to /v1/people via FUB REST API
        - Lofty / Chime:   Webhook endpoint configured in Lofty dashboard
        - GoHighLevel:     POST to GHL contact endpoint with location API key
        - ActiveCampaign:  POST to /api/3/contacts
        - Zapier:          POST JSON payload to Zapier catch webhook URL
        - Custom CRM:      POST to any REST endpoint, configurable via env vars

      Env vars to configure (example):
        NEXT_PUBLIC_CRM_PROVIDER=hubspot   (for display config only)
        CRM_API_KEY=...                    (server-side only, never expose)
        CRM_WEBHOOK_URL=...               (server-side only)

      SMS notification integration:
        Trigger an SMS via Twilio or similar after lead capture
        to alert the advisor in real time.
      ──────────────────────────────────────────────────────────────────────
    */
  }

  const preview = submittedLead ?? lead;

  return (
    <section id="crm" data-reveal className="bg-[#f8f6f2] py-16 sm:py-24">
      <div className="section-shell">
        {/* Section header */}
        <div className="flex flex-col gap-5 border-b border-neutral-200 pb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">CRM-Ready Lead Capture</p>
            <h2 className="display-serif mt-3 text-4xl text-neutral-950 sm:text-5xl">
              Capture the Context<br className="hidden sm:block" /> Advisors Need
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-7 text-neutral-500">
            This demo captures the lead locally and shows the payload that would be routed
            to a CRM once production credentials are connected.
          </p>
        </div>

        {/* Form + preview grid */}
        <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="rounded-lg border border-neutral-200 bg-white p-6 sm:p-8"
            noValidate
          >
            {submittedLead && (
              <div className="mb-6 rounded-lg border border-[#b9985a]/30 bg-[#f5efe1] px-4 py-3 text-sm font-medium text-neutral-800">
                Lead captured for demo preview. A production integration would route this
                securely to your connected CRM.
              </div>
            )}

            {/* Personal info row */}
            <fieldset className="mb-0">
              <legend className="mb-4 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-neutral-400">
                Contact Information
              </legend>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm font-semibold text-neutral-800">
                  Full Name
                  <input
                    required
                    value={lead.fullName}
                    onChange={(e) => update("fullName", e.target.value)}
                    className="rounded-lg border border-neutral-200 px-4 py-3 text-sm font-normal text-neutral-950 outline-none transition focus:border-[#8c743f] focus:ring-1 focus:ring-[#8c743f]/20"
                    placeholder="Jordan Ellis"
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm font-semibold text-neutral-800">
                  Email
                  <input
                    required
                    type="email"
                    value={lead.email}
                    onChange={(e) => update("email", e.target.value)}
                    className="rounded-lg border border-neutral-200 px-4 py-3 text-sm font-normal text-neutral-950 outline-none transition focus:border-[#8c743f] focus:ring-1 focus:ring-[#8c743f]/20"
                    placeholder="jordan@example.com"
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm font-semibold text-neutral-800">
                  Phone
                  <input
                    type="tel"
                    value={lead.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    className="rounded-lg border border-neutral-200 px-4 py-3 text-sm font-normal text-neutral-950 outline-none transition focus:border-[#8c743f] focus:ring-1 focus:ring-[#8c743f]/20"
                    placeholder="(310) 555-0110"
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm font-semibold text-neutral-800">
                  I am a
                  <select
                    value={lead.persona}
                    onChange={(e) => update("persona", e.target.value)}
                    className="rounded-lg border border-neutral-200 bg-white px-4 py-3 text-sm font-normal text-neutral-950 outline-none transition focus:border-[#8c743f] focus:ring-1 focus:ring-[#8c743f]/20"
                  >
                    <option>Buyer</option>
                    <option>Seller</option>
                    <option>Investor</option>
                    <option>Relocating</option>
                    <option>Agent / Partner</option>
                  </select>
                </label>
              </div>
            </fieldset>

            {/* Property intent row */}
            <fieldset className="mt-6">
              <legend className="mb-4 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-neutral-400">
                Property Intent
              </legend>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm font-semibold text-neutral-800">
                  Budget Range
                  <input
                    value={lead.budget}
                    onChange={(e) => update("budget", e.target.value)}
                    className="rounded-lg border border-neutral-200 px-4 py-3 text-sm font-normal text-neutral-950 outline-none transition focus:border-[#8c743f] focus:ring-1 focus:ring-[#8c743f]/20"
                    placeholder="$3M – $7M"
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm font-semibold text-neutral-800">
                  Preferred Neighborhood
                  <input
                    value={lead.neighborhood}
                    onChange={(e) => update("neighborhood", e.target.value)}
                    className="rounded-lg border border-neutral-200 px-4 py-3 text-sm font-normal text-neutral-950 outline-none transition focus:border-[#8c743f] focus:ring-1 focus:ring-[#8c743f]/20"
                    placeholder="Malibu, Bel Air, Palisades"
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm font-semibold text-neutral-800 sm:col-span-2">
                  Timeline
                  <input
                    value={lead.timeline}
                    onChange={(e) => update("timeline", e.target.value)}
                    className="rounded-lg border border-neutral-200 px-4 py-3 text-sm font-normal text-neutral-950 outline-none transition focus:border-[#8c743f] focus:ring-1 focus:ring-[#8c743f]/20"
                    placeholder="Touring this month, ready to offer within 90 days"
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm font-semibold text-neutral-800 sm:col-span-2">
                  Message
                  <textarea
                    rows={4}
                    value={lead.message}
                    onChange={(e) => update("message", e.target.value)}
                    className="rounded-lg border border-neutral-200 px-4 py-3 text-sm font-normal text-neutral-950 outline-none transition focus:border-[#8c743f] focus:ring-1 focus:ring-[#8c743f]/20"
                    placeholder="I'm looking for an ocean-view property with privacy and guest accommodations."
                  />
                </label>
              </div>
            </fieldset>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                className="rounded-full bg-neutral-950 px-8 py-3 text-sm font-semibold text-white transition hover:bg-[#8c743f] sm:w-auto"
              >
                {submittedLead ? "Resubmit Lead Preview" : "Preview CRM Lead"}
              </button>
              <p className="text-xs text-neutral-400">
                Demo only · No data is sent to any server
              </p>
            </div>
          </form>

          {/* CRM preview panel */}
          <aside className="flex flex-col gap-4">
            <div className="flex-1 rounded-lg border border-neutral-200 bg-neutral-950 p-6 text-white sm:p-7">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-white">Mock CRM Lead Card</h3>
                <span className="rounded-full border border-white/14 px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-wider text-white/50">
                  Demo Preview
                </span>
              </div>

              <dl className="mt-5 divide-y divide-white/8">
                {(Object.keys(fieldLabel) as Array<keyof LeadFormData>).map((key) => (
                  <div key={key} className="py-3">
                    <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#d4b87a]">
                      {fieldLabel[key]}
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-white/70">
                      {preview[key] || (
                        <span className="italic text-white/28">Awaiting input</span>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* CRM destination badges */}
            <div className="rounded-lg border border-neutral-200 bg-white p-5">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-neutral-400">
                Available CRM Destinations
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {crmProviders.map((p) => (
                  <span
                    key={p}
                    className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-[0.7rem] font-medium text-neutral-600"
                  >
                    {p}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-xs leading-5 text-neutral-400">
                Connect via API key or Zapier webhook. SMS and voice routing can be added
                with Twilio or a compatible provider.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
