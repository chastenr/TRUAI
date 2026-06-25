import { NextRequest, NextResponse } from "next/server";
import { ensureCrmProperties, upsertContact, sendNotificationEmail } from "@/lib/crm";
import { checkVapiSecret, extractVapiArgs } from "@/lib/vapi-auth";

type VapiBookShowingBody = {
  name?: string;
  phone?: string;
  email?: string;
  propertyId?: string;
  propertyAddress?: string;
  preferredDate?: string;
  preferredTime?: string;
  alternativeDate?: string;
  alternativeTime?: string;
  notes?: string;
  callId?: string;
};

function clean(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

function parseName(full: string): { firstName: string; lastName: string } {
  const parts = full.trim().split(/\s+/);
  return { firstName: parts[0] ?? "", lastName: parts.slice(1).join(" ") };
}

export async function POST(req: NextRequest) {
  const authError = checkVapiSecret(req);
  if (authError) return authError;

  let raw: Record<string, unknown>;
  try {
    raw = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  const body = (extractVapiArgs(raw) ?? raw) as VapiBookShowingBody;

  const name = clean(body.name);
  const phone = clean(body.phone);
  const email = clean(body.email).toLowerCase();
  const propertyAddress = clean(body.propertyAddress);
  const callId = clean(body.callId);

  console.info("[Vapi /book-showing] payload:", {
    name,
    phone,
    email: email || "(none)",
    propertyAddress: propertyAddress || "(none)",
    preferredDate: body.preferredDate || "N/A",
    preferredTime: body.preferredTime || "N/A",
    callId: callId || "N/A",
  });

  if (!name && !phone && !email) {
    return NextResponse.json(
      { ok: false, error: "At least one of name, phone, or email is required." },
      { status: 400 }
    );
  }

  if (!propertyAddress && !body.propertyId) {
    return NextResponse.json(
      { ok: false, error: "propertyAddress or propertyId is required for a showing request." },
      { status: 400 }
    );
  }

  const token = process.env.HUBSPOT_PRIVATE_APP_TOKEN;
  if (!token) {
    console.warn("[Vapi /book-showing] HUBSPOT_PRIVATE_APP_TOKEN not set — CRM skipped.");
    return NextResponse.json({
      ok: true,
      crm: "skipped",
      message: "Showing request received. CRM is not configured.",
    });
  }

  const { firstName, lastName } = parseName(name);

  const showingDetails = [
    body.preferredDate || body.preferredTime
      ? `Preferred: ${[body.preferredDate, body.preferredTime].filter(Boolean).join(" ")}`
      : null,
    body.alternativeDate || body.alternativeTime
      ? `Alternative: ${[body.alternativeDate, body.alternativeTime].filter(Boolean).join(" ")}`
      : null,
    body.notes ? `Notes: ${body.notes}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  const crmMessage = [
    `Showing request for: ${propertyAddress || body.propertyId}`,
    showingDetails,
  ]
    .filter(Boolean)
    .join("\n");

  const properties: Record<string, string> = {};
  if (email) properties.email = email;
  if (firstName) properties.firstname = firstName;
  if (lastName) properties.lastname = lastName;
  if (phone) properties.phone = phone;
  properties.real_estate_lead_source = "Vapi Voice — Showing Request";
  if (propertyAddress || body.propertyId) {
    properties.real_estate_location = propertyAddress || clean(body.propertyId);
  }
  properties.real_estate_buy_or_sell = "Buyer";
  if (crmMessage) properties.real_estate_message = crmMessage;

  try {
    await ensureCrmProperties(token);
    const result = await upsertContact(properties, email || undefined, token);

    console.info("[Vapi /book-showing] CRM:", result.action, result.contact.id);

    const subject = `Showing request: ${propertyAddress || body.propertyId || "unknown"} — ${name || phone || email}`;
    const text = [
      `Source:      Vapi Voice — Showing Request`,
      `Call ID:     ${callId || "N/A"}`,
      "",
      `Name:        ${name || "Not provided"}`,
      `Phone:       ${phone || "Not provided"}`,
      `Email:       ${email || "Not provided"}`,
      `Property:    ${propertyAddress || body.propertyId || "Not provided"}`,
      "",
      `Preferred:   ${[body.preferredDate, body.preferredTime].filter(Boolean).join(" ") || "Not provided"}`,
      `Alternative: ${[body.alternativeDate, body.alternativeTime].filter(Boolean).join(" ") || "Not provided"}`,
      "",
      body.notes ? `Notes:\n${body.notes}` : "Notes: Not provided",
    ].join("\n");

    const notification = await sendNotificationEmail(subject, text);

    return NextResponse.json({
      ok: true,
      crm: "connected",
      action: result.action,
      contactId: result.contact.id,
      emailNotification: notification,
      // NALA should relay this message to the caller — not a confirmed booking
      message:
        "Your showing request has been received. A member of the Abbie Shepherd Real Estate Group team will contact you to confirm the appointment.",
    });
  } catch (error) {
    console.error("[Vapi /book-showing] CRM error:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to save showing request to CRM." },
      { status: 502 }
    );
  }
}
