const headers = {
  "Content-Type": "text/xml",
};

function xmlEscape(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function sayTwiml(message: string) {
  return `<?xml version="1.0" encoding="UTF-8"?><Response><Say voice="alice">${message}</Say></Response>`;
}

function streamTwiml(streamUrl: string, params: Record<string, string>) {
  const parameters = Object.entries(params)
    .filter(([, value]) => value)
    .map(
      ([name, value]) =>
        `<Parameter name="${xmlEscape(name)}" value="${xmlEscape(value)}" />`
    )
    .join("");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    "<Response>",
    '<Connect>',
    `<Stream url="${xmlEscape(streamUrl)}">${parameters}</Stream>`,
    "</Connect>",
    '<Say voice="alice">The AI assistant has ended the call. Goodbye.</Say>',
    "</Response>",
  ].join("");
}

export async function POST(req: Request) {
  try {
    const streamUrl = process.env.TWILIO_MEDIA_STREAM_URL;

    if (!streamUrl) {
      console.warn("[Twilio Voice] TWILIO_MEDIA_STREAM_URL is not configured; returning fallback TwiML.");
      return new Response(
        sayTwiml("Sorry, the AI assistant is currently unavailable. Please leave your name and number and we will call you back."),
        { status: 200, headers }
      );
    }

    console.info("[Twilio Voice] Connecting call to media stream:", streamUrl);
    const formData = await req.formData().catch(() => null);
    const from = String(formData?.get("From") || "");
    const callSid = String(formData?.get("CallSid") || "");

    return new Response(
      streamTwiml(streamUrl, { From: from, CallSid: callSid }),
      { status: 200, headers }
    );
  } catch (error) {
    console.error("[Twilio Voice] Failed to generate TwiML:", error);

    return new Response(
      sayTwiml("Sorry, the AI assistant is currently unavailable. Please leave your name and number and we will call you back."),
      { status: 200, headers }
    );
  }
}
