"use client";

import { useMemo, useState } from "react";
import { featuredListing } from "@/data/listings";
import DocUpload from "./DocUpload";

type DemoLead = {
  buyerName: string;
  phone: string;
  email: string;
  interestedProperty: string;
  budgetRange: string;
  timeline: string;
  financingStatus: string;
  showingRequest: string;
  uploadedDocument: string;
  chatSummary: string;
  recommendedNextStep: string;
};

const crmProviders = [
  { name: "HubSpot", color: "bg-orange-500" },
  { name: "Salesforce", color: "bg-blue-600" },
  { name: "Follow Up Boss", color: "bg-green-600" },
  { name: "Lofty", color: "bg-violet-600" },
  { name: "Go High Level", color: "bg-emerald-600" },
  { name: "Zapier", color: "bg-orange-400" },
  { name: "ActiveCampaign", color: "bg-blue-500" },
  { name: "Custom CRM", color: "bg-neutral-600" },
];

const baseLead: DemoLead = {
  buyerName: "Jordan Ellis",
  phone: "(404) 555-0198",
  email: "jordan.ellis@example.com",
  interestedProperty: featuredListing.address,
  budgetRange: "$900K - $1.1M",
  timeline: "Touring this week, decision within 60 days",
  financingStatus: "Prequalified; lender letter available",
  showingRequest: "Requested private showing",
  uploadedDocument: "Prequalification pending",
  chatSummary: `Buyer asked about ${featuredListing.address}, pricing, neighborhood access, and showing availability.`,
  recommendedNextStep: "Advisor follow-up and private showing coordination",
};

const emptyLead: DemoLead = {
  buyerName: "",
  phone: "",
  email: "",
  interestedProperty: featuredListing.address,
  budgetRange: "",
  timeline: "",
  financingStatus: "",
  showingRequest: "Not requested",
  uploadedDocument: "Not uploaded",
  chatSummary: "Use the Trulience avatar for the live conversation. Add manual notes here for the CRM demo.",
  recommendedNextStep: "Advisor follow-up",
};

const fieldLabels: Record<keyof DemoLead, string> = {
  buyerName: "Buyer Name",
  phone: "Phone",
  email: "Email",
  interestedProperty: "Interested Property",
  budgetRange: "Budget Range",
  timeline: "Timeline",
  financingStatus: "Financing Status",
  showingRequest: "Showing Request",
  uploadedDocument: "Uploaded Document",
  chatSummary: "Chat Summary",
  recommendedNextStep: "Recommended Next Step",
};

function DisplayField({ label, value }: { label: string; value: string }) {
  const display = value.trim() || "Demo input pending";

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 px-5 py-3.5">
      <p className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-white/40">{label}</p>
      <p
        className={`text-right text-sm font-medium transition-colors duration-500 ${
          value.trim() ? "text-[#e0be6e]" : "italic text-white/25"
        }`}
      >
        {display}
      </p>
    </div>
  );
}

function InputField({
  field,
  lead,
  updateLead,
  multiline = false,
}: {
  field: keyof DemoLead;
  lead: DemoLead;
  updateLead: (field: keyof DemoLead, value: string) => void;
  multiline?: boolean;
}) {
  const className =
    "rounded-lg border border-white/10 bg-white/[0.05] px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#c49a3c]/60 focus:bg-white/[0.08]";

  return (
    <label className={`flex flex-col gap-1.5 text-xs font-semibold text-white/70 ${multiline ? "sm:col-span-2" : ""}`}>
      {fieldLabels[field]}
      {multiline ? (
        <textarea
          rows={3}
          value={lead[field]}
          onChange={(event) => updateLead(field, event.target.value)}
          className={className}
        />
      ) : (
        <input
          value={lead[field]}
          onChange={(event) => updateLead(field, event.target.value)}
          className={className}
        />
      )}
    </label>
  );
}

export default function CRMHandoff() {
  const [lead, setLead] = useState<DemoLead>(baseLead);
  const [sending, setSending] = useState(false);
  const [sentMessage, setSentMessage] = useState("");
  const [sendError, setSendError] = useState("");

  const webhookPayload = useMemo(
    () => ({
      lead,
      source: "nala-trulience-manual-demo",
      mode: "manual-demo",
      liveConversationProvider: "Trulience",
      timestamp: new Date().toISOString(),
    }),
    [lead]
  );

  function updateLead(field: keyof DemoLead, value: string) {
    setLead((current) => ({ ...current, [field]: value }));
    setSentMessage("");
    setSendError("");
  }

  function focusTrulience() {
    document.getElementById("concierge")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function handleSendCRM() {
    setSending(true);
    setSentMessage("");
    setSendError("");

    try {
      const response = await fetch("/api/crm-webhook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(webhookPayload),
      });

      if (!response.ok) throw new Error("crm_webhook_failed");

      const result = (await response.json().catch(() => ({}))) as { demo?: boolean };
      setSentMessage(
        result.demo
          ? "Demo success: CRM webhook is not connected, but this lead payload is ready."
          : "Lead sent to CRM webhook."
      );
    } catch {
      setSendError("Could not reach the CRM webhook. The demo lead is still ready to copy or resend.");
    } finally {
      setSending(false);
    }
  }

  return (
    <section id="crm-handoff" data-reveal className="bg-neutral-950 py-16 text-white sm:py-24">
      <div className="section-shell">
        <div className="flex flex-col gap-5 border-b border-white/10 pb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">Agent / CRM Handoff - Manual Demo</p>
            <h2 className="display-serif mt-3 text-4xl text-white sm:text-5xl">
              What Your Agent<br className="hidden sm:block" /> Receives
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-7 text-white/50">
            Trulience handles the live chat and voice experience. This card stays usable
            as a manual CRM demo until structured lead extraction is connected.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_420px]">
          <div className="space-y-4">
            <div className="flex items-center gap-2 rounded-t-xl border border-white/10 bg-black px-4 py-3">
              <span className="size-2.5 rounded-full bg-red-400" />
              <span className="size-2.5 rounded-full bg-amber-400" />
              <span className="size-2.5 rounded-full bg-emerald-400" />
              <p className="ml-3 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/40">
                NALA - CRM Lead Record - Demo
              </p>
              <span className="ml-auto rounded-full border border-[#c49a3c]/25 bg-[#c49a3c]/10 px-2.5 py-1 text-[0.6rem] font-semibold text-[#e0be6e]">
                Manual Mode
              </span>
            </div>

            <div className="rounded-b-xl border border-t-0 border-white/10 bg-[#0a0c10]">
              <div className="divide-y divide-white/6">
                <DisplayField label="Buyer Name" value={lead.buyerName} />
                <DisplayField label="Phone" value={lead.phone} />
                <DisplayField label="Email" value={lead.email} />
                <DisplayField label="Interested Property" value={lead.interestedProperty} />
                <DisplayField label="Budget Range" value={lead.budgetRange} />
                <DisplayField label="Timeline" value={lead.timeline} />
                <DisplayField label="Financing Status" value={lead.financingStatus} />
                <DisplayField label="Showing Request" value={lead.showingRequest} />
                <DisplayField label="Uploaded Document" value={lead.uploadedDocument} />

                <div className="px-5 py-4">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-white/40">
                    Chat Summary
                  </p>
                  <p className="mt-2 text-sm leading-7 text-[#e0be6e]">{lead.chatSummary}</p>
                </div>

                <div className="px-5 py-4">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-white/40">
                    Recommended Next Step
                  </p>
                  <p className="mt-2 text-sm leading-7 text-white/70">{lead.recommendedNextStep}</p>
                </div>
              </div>

              <div className="border-t border-white/8 px-5 py-4">
                <button
                  type="button"
                  onClick={handleSendCRM}
                  disabled={sending}
                  className={`w-full rounded-full py-3 text-sm font-semibold transition ${
                    sentMessage
                      ? "bg-emerald-500 text-white"
                      : sending
                        ? "cursor-wait bg-neutral-700 text-white/50"
                        : "bg-[#c49a3c] text-neutral-950 hover:bg-[#e0be6e]"
                  }`}
                >
                  {sentMessage ? "Lead Ready / Sent" : sending ? "Sending Lead..." : "Send Lead to CRM"}
                </button>
                <p
                  className={`mt-2 text-center text-[0.62rem] ${
                    sendError ? "text-red-300" : sentMessage ? "text-emerald-300" : "text-white/25"
                  }`}
                >
                  {sendError || sentMessage || "Posts the current manual lead JSON to the CRM webhook."}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <div className="rounded-xl border border-white/10 bg-white/[0.04] p-5">
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setLead(baseLead)}
                  className="rounded-full bg-[#c49a3c] px-4 py-2 text-xs font-semibold text-neutral-950 transition hover:bg-[#e0be6e]"
                >
                  Load Buyer Demo
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setLead((current) => ({
                      ...current,
                      interestedProperty: featuredListing.address,
                      chatSummary: `Buyer is reviewing ${featuredListing.address} and asked for showing guidance through the Trulience avatar.`,
                      recommendedNextStep: "Confirm showing window and advisor availability",
                    }))
                  }
                  className="rounded-full border border-white/15 px-4 py-2 text-xs font-semibold text-white/70 transition hover:border-white/30 hover:text-white"
                >
                  Use Featured Listing
                </button>
                <button
                  type="button"
                  onClick={() => setLead(emptyLead)}
                  className="rounded-full border border-white/15 px-4 py-2 text-xs font-semibold text-white/70 transition hover:border-white/30 hover:text-white"
                >
                  Reset Demo
                </button>
              </div>
              <p className="mt-3 text-xs leading-6 text-white/45">
                These controls keep the CRM card useful while Trulience handles the live
                conversation and voice layer.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.04] p-5">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/40">
                Manual CRM Fields
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <InputField field="buyerName" lead={lead} updateLead={updateLead} />
                <InputField field="phone" lead={lead} updateLead={updateLead} />
                <InputField field="email" lead={lead} updateLead={updateLead} />
                <InputField field="interestedProperty" lead={lead} updateLead={updateLead} />
                <InputField field="budgetRange" lead={lead} updateLead={updateLead} />
                <InputField field="timeline" lead={lead} updateLead={updateLead} />
                <InputField field="financingStatus" lead={lead} updateLead={updateLead} />
                <InputField field="showingRequest" lead={lead} updateLead={updateLead} />
                <InputField field="uploadedDocument" lead={lead} updateLead={updateLead} />
                <InputField field="recommendedNextStep" lead={lead} updateLead={updateLead} />
                <InputField field="chatSummary" lead={lead} updateLead={updateLead} multiline />
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.04] p-5">
              <p className="text-sm font-semibold text-white">Proof of Funds / Prequalification</p>
              <p className="mt-1 text-xs leading-5 text-white/45">
                Use this upload area as a visual demo. Mark the CRM field manually once a
                buyer provides a document.
              </p>
              <div className="mt-4">
                <DocUpload />
              </div>
              <button
                type="button"
                onClick={() => updateLead("uploadedDocument", "Prequalification uploaded")}
                className="mt-3 w-full rounded-full border border-[#c49a3c]/30 px-4 py-2 text-xs font-semibold text-[#e0be6e] transition hover:bg-[#c49a3c]/10"
              >
                Mark Document Uploaded
              </button>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.04] p-5">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/40">
                Supported CRM Platforms
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {crmProviders.map((provider) => (
                  <span
                    key={provider.name}
                    className={`${provider.color} rounded-full px-3 py-1 text-[0.65rem] font-semibold text-white`}
                  >
                    {provider.name}
                  </span>
                ))}
              </div>
              <p className="mt-3 text-xs leading-6 text-white/35">
                Ready for contact creation, task routing, notes, tags, and advisor notifications.
              </p>
            </div>

            <button
              type="button"
              onClick={focusTrulience}
              className="block w-full rounded-full bg-[#c49a3c] px-5 py-2.5 text-center text-xs font-semibold text-neutral-950 transition hover:bg-[#e0be6e]"
            >
              Use Live Trulience Avatar
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
