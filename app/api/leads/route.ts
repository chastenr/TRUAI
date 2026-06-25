import { NextRequest, NextResponse } from "next/server";
import { ensureCrmProperties, upsertContact, sendNotificationEmail } from "@/lib/crm";

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

    const properties: Record<string, string> = {
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

    const result = await upsertContact(properties, lead.email, token);

    const subject = `New CRM lead: ${lead.firstName} ${lead.lastName}`.trim();
    const text = [
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
    ].join("\n");

    const notification = await sendNotificationEmail(subject, text);

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
