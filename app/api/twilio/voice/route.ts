const headers = {
  "Content-Type": "text/xml",
};

function twiml(message: string) {
  return `<?xml version="1.0" encoding="UTF-8"?><Response><Say voice="alice">${message}</Say></Response>`;
}

export async function POST() {
  try {
    return new Response(
      twiml("Thanks for calling the AI avatar demo line. Please hold while we connect you."),
      { status: 200, headers }
    );
  } catch (error) {
    console.error("[Twilio Voice] Failed to generate TwiML:", error);

    return new Response(
      twiml("We are sorry. The demo line is temporarily unavailable."),
      { status: 200, headers }
    );
  }
}
