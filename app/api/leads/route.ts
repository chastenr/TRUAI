import { NextRequest, NextResponse } from "next/server";

type LeadPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  buyOrSell: string;
  budget: string;
  location: string;
  timeline: string;
  message: string;
  source: string;
};

type CrmContact = {
  id: string;
  properties?: Record<string, string>;
};

const HUBSPOT_API_BASE = "https://api.hubapi.com";

const realEstateProperties = [
  {
    name: "real_estate_buy_or_sell",
    label: "Real Estate Buy/Sell Intent",
    description: "Buyer, seller, investor, relocation, or partner intent from the website lead flow.",
  },
  {
    name: "real_estate_budget",
    label: "Real Estate Budget",
    description: "Budget range submitted through the website or live avatar lead flow.",
  },
  {
    name: "real_estate_location",
    label: "Real Estate Location",
    description: "Preferred city, neighborhood, address, or service area for the lead.",
  },
  {
    name: "real_estate_timeline",
    label: "Real Estate Timeline",
    description: "Buying or selling timeline submitted by the lead.",
  },
  {
    name: "real_estate_message",
    label: "Real Estate Lead Message",
    description: "Lead notes, showing request, or conversation summary.",
  },
  {
    name: "real_estate_lead_source",
    label: "Real Estate Lead Source",
    description: "Website, live avatar, or CRM demo source for the lead.",
  },
];

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeLead(body: Record<string, unknown>): LeadPayload {
  const fullName = clean(body.fullName);
  const firstName = clean(body.firstName) || fullName.split(/\s+/)[0] || "";
  const lastName =
    clean(body.lastName) ||
    (fullName ? fullName.split(/\s+/).slice(1).join(" ") : "");

  return {
    firstName,
    lastName,
    email: clean(body.email).toLowerCase(),
    phone: clean(body.phone),
    buyOrSell: clean(body.buyOrSell) || clean(body.persona),
    budget: clean(body.budget) || clean(body.budgetRange),
    location: clean(body.location) || clean(body.neighborhood) || clean(body.interestedProperty),
    timeline: clean(body.timeline),
    message: clean(body.message) || clean(body.chatSummary),
    source: clean(body.source) || "Website lead form",
  };
}

function validateLead(lead: LeadPayload) {
  const errors: Partial<Record<keyof LeadPayload, string>> = {};
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!lead.firstName && !lead.lastName) errors.firstName = "A first or last name is required.";
  if (!lead.email) {
    errors.email = "Email is required.";
  } else if (!emailPattern.test(lead.email)) {
    errors.email = "Email must be valid.";
  }
  if (!lead.buyOrSell) errors.buyOrSell = "Buy/sell intent is required.";
  if (!lead.timeline) errors.timeline = "Timeline is required.";

  return errors;
}

async function crmFetch<T>(
  path: string,
  token: string,
  init: RequestInit = {}
): Promise<{ data: T; response: Response }> {
  const response = await fetch(`${HUBSPOT_API_BASE}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...init.headers,
    },
  });

  const text = await response.text();
  const data = text ? (JSON.parse(text) as T) : ({} as T);

  if (!response.ok) {
    throw new Error(
      JSON.stringify({
        status: response.status,
        data,
      })
    );
  }

  return { data, response };
}

async function ensureCrmProperties(token: string) {
  await Promise.all(
    realEstateProperties.map(async (property) => {
      try {
        await crmFetch(`/crm/v3/properties/contacts/${property.name}`, token);
      } catch {
        try {
          await crmFetch(`/crm/v3/properties/contacts`, token, {
            method: "POST",
            body: JSON.stringify({
              groupName: "contactinformation",
              name: property.name,
              label: property.label,
              description: property.description,
              type: "string",
              fieldType: "text",
              formField: true,
            }),
          });
        } catch (error) {
          const message = error instanceof Error ? error.message : "";
          if (!message.includes('"status":409')) throw error;
        }
      }
    })
  );
}

async function findCrmContactByEmail(email: string, token: string) {
  const { data } = await crmFetch<{ results: CrmContact[] }>(
    "/crm/v3/objects/contacts/search",
    token,
    {
      method: "POST",
      body: JSON.stringify({
        filterGroups: [
          {
            filters: [
              {
                propertyName: "email",
                operator: "EQ",
                value: email,
              },
            ],
          },
        ],
        properties: ["email", "firstname", "lastname"],
        limit: 1,
      }),
    }
  );

  return data.results[0] ?? null;
}

async function upsertCrmContact(lead: LeadPayload, token: string) {
  const properties = {
    email: lead.email,
    firstname: lead.firstName,
    lastname: lead.lastName,
    phone: lead.phone,
    real_estate_buy_or_sell: lead.buyOrSell,
    real_estate_budget: lead.budget,
    real_estate_location: lead.location,
    real_estate_timeline: lead.timeline,
    real_estate_message: lead.message,
    real_estate_lead_source: lead.source,
  };

  const existingContact = await findCrmContactByEmail(lead.email, token);

  if (existingContact) {
    const { data } = await crmFetch<CrmContact>(
      `/crm/v3/objects/contacts/${existingContact.id}`,
      token,
      {
        method: "PATCH",
        body: JSON.stringify({ properties }),
      }
    );

    return { contact: data, action: "updated" as const };
  }

  const { data } = await crmFetch<CrmContact>("/crm/v3/objects/contacts", token, {
    method: "POST",
    body: JSON.stringify({ properties }),
  });

  return { contact: data, action: "created" as const };
}

async function sendLeadNotification(lead: LeadPayload) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFICATION_EMAIL;

  if (!apiKey || !to) return { skipped: true };

  const from = process.env.LEAD_NOTIFICATION_FROM || "NALA Leads <onboarding@resend.dev>";

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      subject: `New CRM lead: ${lead.firstName} ${lead.lastName}`.trim(),
      text: [
        "A new real estate lead was saved to the CRM.",
        "",
        `Name: ${lead.firstName} ${lead.lastName}`.trim(),
        `Email: ${lead.email}`,
        `Phone: ${lead.phone || "Not provided"}`,
        `Intent: ${lead.buyOrSell}`,
        `Budget: ${lead.budget || "Not provided"}`,
        `Location: ${lead.location || "Not provided"}`,
        `Timeline: ${lead.timeline}`,
        `Source: ${lead.source}`,
        "",
        lead.message ? `Message: ${lead.message}` : "Message: Not provided",
      ].join("\n"),
    }),
  });

  if (!response.ok) {
    console.error("[Leads] Resend notification failed:", response.status, await response.text());
    return { skipped: false, error: true };
  }

  return { skipped: false, error: false };
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;

  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  const nestedLead = body.lead && typeof body.lead === "object" ? body.lead : {};
  const lead = normalizeLead({ ...body, ...(nestedLead as Record<string, unknown>) });
  const errors = validateLead(lead);

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, error: "Lead validation failed.", errors }, { status: 400 });
  }

  const token = process.env.HUBSPOT_PRIVATE_APP_TOKEN;

  if (!token) {
    return NextResponse.json(
      {
        ok: false,
        error: "The CRM is not configured. Add the private app token to the environment.",
      },
      { status: 503 }
    );
  }

  try {
    await ensureCrmProperties(token);
    const result = await upsertCrmContact(lead, token);
    const notification = await sendLeadNotification(lead);

    return NextResponse.json({
      ok: true,
      crm: "connected-crm",
      action: result.action,
      contactId: result.contact.id,
      emailNotification: notification,
      message: `Lead ${result.action} in the CRM.`,
    });
  } catch (error) {
    console.error("[Leads] CRM lead sync failed:", error);

    return NextResponse.json(
      {
        ok: false,
        error:
          "Could not save lead to the CRM. Check the private app token and contact/property scopes.",
      },
      { status: 502 }
    );
  }
}
