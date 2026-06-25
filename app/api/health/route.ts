import { NextResponse } from "next/server";

// GET /api/health
// Safe diagnostic endpoint — shows which env vars are present, never exposes values.
export async function GET() {
  return NextResponse.json({
    ok: true,
    service: "vapi-backend",
    timestamp: new Date().toISOString(),
    router: "app",
    routes: {
      webhook: "/api/vapi/webhook",
      lead: "/api/vapi/lead",
      propertyInquiry: "/api/vapi/property-inquiry",
      bookShowing: "/api/vapi/book-showing",
    },
    env: {
      // Vapi
      hasVapiWebhookSecret: Boolean(process.env.VAPI_WEBHOOK_SECRET),
      hasVapiApiKey: Boolean(process.env.VAPI_API_KEY),
      hasVapiAssistantId: Boolean(process.env.VAPI_ASSISTANT_ID),
      hasVapiPhoneNumberId: Boolean(process.env.VAPI_PHONE_NUMBER_ID),
      // Twilio (informational — Vapi handles outbound SMS directly)
      hasTwilioSid: Boolean(process.env.TWILIO_ACCOUNT_SID),
      hasTwilioToken: Boolean(process.env.TWILIO_AUTH_TOKEN),
      hasTwilioPhone: Boolean(process.env.TWILIO_PHONE_NUMBER),
      // CRM / notifications
      hasHubspot: Boolean(process.env.HUBSPOT_PRIVATE_APP_TOKEN),
      hasResend: Boolean(process.env.RESEND_API_KEY),
      hasLeadEmail: Boolean(process.env.LEAD_NOTIFICATION_EMAIL),
    },
  });
}
