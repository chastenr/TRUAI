import { NextRequest, NextResponse } from "next/server";
import { ensureCrmProperties, upsertContact, sendNotificationEmail } from "@/lib/crm";
import { checkVapiSecret, extractVapiArgs } from "@/lib/vapi-auth";

type VapiPropertyInquiryBody = {
  name?: string;
  phone?: string;
  email?: string;
  propertyId?: string;
  propertyAddress?: string;
  question?: string;
  preferredContactMethod?: string;
  transcriptSummary?: string;
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

  const body = (extractVapiArgs(raw) ?? raw) as VapiPropertyInquiryBody;

  const name = clean(body.name);
  const phone = clean(body.phone);
  const email = clean(body.email).toLowerCase();
  const propertyAddress = clean(body.propertyAddress);
  const callId = clean(body.callId);

  console.info("[Vapi /property-inquiry] payload:", {
    name,
    phone,
    email: email || "(none)",
    propertyAddress: propertyAddress || "(none)",
    callId: callId || "N/A",
  });

  if (!name && !phone && !email) {
    return NextResponse.json(
      { ok: false, error: "At least one of name, phone, or email is required." },
      { status: 400 }
    );
  }

  const token = process.env.HUBSPOT_PRIVATE_APP_TOKEN;
  if (!token) {
    console.warn("[Vapi /property-inquiry] HUBSPOT_PRIVATE_APP_TOKEN not set — CRM skipped.");
    return NextResponse.json({
      ok: true,
      crm: "skipped",
      message: "Inquiry received. CRM is not configured.",
    });
  }

  const { firstName, lastName } = parseName(name);
  const notes = [body.question, body.transcriptSummary].filter(Boolean).join("\n\n");

  const properties: Record<string, string> = {};
  if (email) properties.email = email;
  if (firstName) properties.firstname = firstName;
  if (lastName) properties.lastname = lastName;
  if (phone) properties.phone = phone;
  properties.real_estate_lead_source = "Vapi Voice — Property Inquiry";
  if (propertyAddress || body.propertyId) {
    properties.real_estate_location = propertyAddress || clean(body.propertyId);
  }
  if (notes) properties.real_estate_message = notes;

  try {
    await ensureCrmProperties(token);
    const result = await upsertContact(properties, email || undefined, token);

    console.info("[Vapi /property-inquiry] CRM:", result.action, result.contact.id);

    const subject = `Property inquiry: ${propertyAddress || body.propertyId || "unknown"} — ${name || phone || email}`;
    const text = [
      `Source:    Vapi Voice — Property Inquiry`,
      `Call ID:   ${callId || "N/A"}`,
      "",
      `Name:      ${name || "Not provided"}`,
      `Phone:     ${phone || "Not provided"}`,
      `Email:     ${email || "Not provided"}`,
      `Property:  ${propertyAddress || body.propertyId || "Not provided"}`,
      `Contact:   ${body.preferredContactMethod || "Not provided"}`,
      "",
      body.question ? `Question:\n${body.question}` : "Question: Not provided",
      "",
      body.transcriptSummary ? `Transcript summary:\n${body.transcriptSummary}` : "",
    ]
      .filter((l) => l !== "")
      .join("\n");

    const notification = await sendNotificationEmail(subject, text);

    return NextResponse.json({
      ok: true,
      crm: "connected",
      action: result.action,
      contactId: result.contact.id,
      emailNotification: notification,
    });
  } catch (error) {
    console.error("[Vapi /property-inquiry] CRM error:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to save property inquiry to CRM." },
      { status: 502 }
    );
  }
}
