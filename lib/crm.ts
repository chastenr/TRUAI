// Shared HubSpot CRM and Resend email helpers — used by all lead/Vapi routes.

const HUBSPOT_API_BASE = "https://api.hubapi.com";

export type CrmContact = {
  id: string;
  properties?: Record<string, string>;
};

export type UpsertResult = {
  contact: CrmContact;
  action: "created" | "updated";
};

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
    description: "Website, live avatar, Vapi voice, or Vapi SMS source for the lead.",
  },
];

export async function crmFetch<T>(
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
    throw new Error(JSON.stringify({ status: response.status, data }));
  }

  return { data, response };
}

export async function ensureCrmProperties(token: string): Promise<void> {
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

export async function findCrmContactByEmail(
  email: string,
  token: string
): Promise<CrmContact | null> {
  const { data } = await crmFetch<{ results: CrmContact[] }>(
    "/crm/v3/objects/contacts/search",
    token,
    {
      method: "POST",
      body: JSON.stringify({
        filterGroups: [
          {
            filters: [{ propertyName: "email", operator: "EQ", value: email }],
          },
        ],
        properties: ["email", "firstname", "lastname"],
        limit: 1,
      }),
    }
  );

  return data.results[0] ?? null;
}

// Upsert a contact with an arbitrary HubSpot properties map.
// Pass email to enable deduplication; omit to always create.
export async function upsertContact(
  properties: Record<string, string>,
  email: string | undefined,
  token: string
): Promise<UpsertResult> {
  const existing = email ? await findCrmContactByEmail(email, token) : null;

  if (existing) {
    const { data } = await crmFetch<CrmContact>(
      `/crm/v3/objects/contacts/${existing.id}`,
      token,
      { method: "PATCH", body: JSON.stringify({ properties }) }
    );
    return { contact: data, action: "updated" };
  }

  const { data } = await crmFetch<CrmContact>("/crm/v3/objects/contacts", token, {
    method: "POST",
    body: JSON.stringify({ properties }),
  });

  return { contact: data, action: "created" };
}

// Send a notification email via Resend to LEAD_NOTIFICATION_EMAIL.
// Skips silently when RESEND_API_KEY or LEAD_NOTIFICATION_EMAIL are not set.
export async function sendNotificationEmail(
  subject: string,
  text: string
): Promise<{ skipped: boolean; error?: boolean }> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFICATION_EMAIL;

  if (!apiKey || !to) return { skipped: true };

  const from = process.env.LEAD_NOTIFICATION_FROM ?? "NALA Leads <onboarding@resend.dev>";

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from, to, subject, text }),
  });

  if (!response.ok) {
    console.error("[CRM] Resend notification failed:", response.status, await response.text());
    return { skipped: false, error: true };
  }

  return { skipped: false };
}
