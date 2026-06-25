import { NextRequest, NextResponse } from "next/server";
import { ensureCrmProperties, upsertContact, sendNotificationEmail } from "@/lib/crm";
import { checkVapiSecret, extractVapiArgs } from "@/lib/vapi-auth";

type VapiLeadBody = {
  name?: string;
  phone?: string;
  email?: string;
  source?: string;
  message?: string;
  propertyAddress?: string;
  propertyId?: string;
  intent?: string;
  transcriptSummary?: string;
  callId?: string;
  channel?: string;
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

  const body = (extractVapiArgs(raw) ?? raw) as VapiLeadBody;

  const name = clean(body.name);
  const phone = clean(body.phone);
  const email = clean(body.email).toLowerCase();
  const channel = clean(body.channel) || "voice";
  const source = clean(body.source) || `Vapi ${channel === "sms" ? "SMS" : "Voice"}`;
  const callId = clean(body.callId);

  console.info("[Vapi /lead] payload:", { name, phone, email: email || "(none)", source, callId: callId || "N/A" });

  if (!name && !phone && !email) {
    return NextResponse.json(
      { ok: false, error: "At least one of name, phone, or email is required." },
      { status: 400 }
    );
  }

  const token = process.env.HUBSPOT_PRIVATE_APP_TOKEN;
  if (!token) {
    console.warn("[Vapi /lead] HUBSPOT_PRIVATE_APP_TOKEN not set — CRM skipped.");
    return NextResponse.json({
      ok: true,
      crm: "skipped",
      message: "Lead received. CRM is not configured.",
    });
  }

  const { firstName, lastName } = parseName(name);
  const notes = [body.message, body.transcriptSummary].filter(Boolean).join("\n\n");

  const properties: Record<string, string> = {};
  if (email) properties.email = email;
  if (firstName) properties.firstname = firstName;
  if (lastName) properties.lastname = lastName;
  if (phone) properties.phone = phone;
  if (source) properties.real_estate_lead_source = source;
  if (body.intent) properties.real_estate_buy_or_sell = clean(body.intent);
  if (body.propertyAddress) properties.real_estate_location = clean(body.propertyAddress);
  if (notes) properties.real_estate_message = notes;

  try {
    await ensureCrmProperties(token);
    const result = await upsertContact(properties, email || undefined, token);

    console.info("[Vapi /lead] CRM:", result.action, result.contact.id);

    const subject = `New Vapi lead: ${name || phone || email}`;
    const text = [
      `Source:   ${source}`,
      `Channel:  ${channel}`,
      `Call ID:  ${callId || "N/A"}`,
      "",
      `Name:     ${name || "Not provided"}`,
      `Phone:    ${phone || "Not provided"}`,
      `Email:    ${email || "Not provided"}`,
      `Intent:   ${body.intent || "Not provided"}`,
      `Property: ${body.propertyAddress || body.propertyId || "Not provided"}`,
      "",
      notes ? `Notes:\n${notes}` : "Notes: Not provided",
    ].join("\n");

    const notification = await sendNotificationEmail(subject, text);

    return NextResponse.json({
      ok: true,
      crm: "connected",
      action: result.action,
      contactId: result.contact.id,
      emailNotification: notification,
    });
  } catch (error) {
    console.error("[Vapi /lead] CRM error:", error);
    return NextResponse.json({ ok: false, error: "Failed to save lead to CRM." }, { status: 502 });
  }
}
