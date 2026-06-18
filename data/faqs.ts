import type { FAQ } from "@/types";

export const faqs: FAQ[] = [
  {
    question: "How can AI help real estate brokerages?",
    answer:
      "An AI concierge can answer common listing questions, capture buyer and seller intent, route urgent inquiries, and support visitors after hours while the brokerage team focuses on high-value conversations.",
  },
  {
    question: "Can buyers ask questions about listings?",
    answer:
      "Yes. The demo is designed around listing-specific questions such as availability, price, showing times, neighborhood details, school proximity, and similar homes.",
  },
  {
    question: "Can the avatar qualify buyer and seller leads?",
    answer:
      "Yes. The concierge can collect contact details, budget, timeline, preferred neighborhoods, buying or selling intent, and notes for the advisor follow-up.",
  },
  {
    question: "Can this connect to a CRM?",
    answer:
      "The current prototype shows CRM-ready lead data. A production build can connect to HubSpot, Salesforce, Follow Up Boss, Lofty, GoHighLevel, ActiveCampaign, Zapier, or a custom CRM API.",
  },
  {
    question: "Can the avatar look like the agent or CEO?",
    answer:
      "Yes. Clients may customize the avatar to represent an agent, broker, CEO, or team spokesperson, depending on the selected implementation scope and custom avatar package.",
  },
  {
    question: "Can this support SMS or phone calls later?",
    answer:
      "Yes. SMS and phone or voice workflows can be added later through approved provider APIs and compliant lead-routing rules.",
  },
  {
    question: "Is this meant for individual agents or brokerage teams?",
    answer:
      "Both. The same experience can support individual agent websites, luxury teams, relocation divisions, investment groups, or multi-office brokerages.",
  },
];
