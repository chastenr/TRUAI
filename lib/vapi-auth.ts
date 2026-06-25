import { NextRequest, NextResponse } from "next/server";

// Returns a 401 response when VAPI_WEBHOOK_SECRET is set and the
// x-vapi-secret header doesn't match. Returns null to allow the request.
// Always logs the outcome so secret mismatches are visible in Vercel logs.
export function checkVapiSecret(req: NextRequest): NextResponse | null {
  const secret = process.env.VAPI_WEBHOOK_SECRET;

  if (!secret) {
    // No secret configured — open access. Log once so it's visible in prod.
    console.warn(
      "[vapi-auth] VAPI_WEBHOOK_SECRET is not set. " +
        "All Vapi webhook/tool requests are accepted without authentication. " +
        "Set this variable in Vercel and add the matching x-vapi-secret header in the Vapi dashboard."
    );
    return null;
  }

  const provided = req.headers.get("x-vapi-secret");

  if (!provided) {
    console.error(
      "[vapi-auth] Rejected request — x-vapi-secret header is missing. " +
        "Make sure the Vapi dashboard → Assistant → Server URL has a custom header: " +
        "x-vapi-secret = <your VAPI_WEBHOOK_SECRET value>."
    );
    return NextResponse.json(
      { ok: false, error: "Unauthorized — x-vapi-secret header missing." },
      { status: 401 }
    );
  }

  if (provided !== secret) {
    console.error(
      "[vapi-auth] Rejected request — x-vapi-secret header does not match VAPI_WEBHOOK_SECRET. " +
        "Check that the Vercel env var and Vapi dashboard header value are identical (no extra spaces)."
    );
    return NextResponse.json(
      { ok: false, error: "Unauthorized — secret mismatch." },
      { status: 401 }
    );
  }

  return null;
}

// Vapi server tools wrap arguments inside message.toolCallList[0].function.arguments.
// This helper extracts them so routes can treat either format uniformly.
export function extractVapiArgs(raw: Record<string, unknown>): Record<string, unknown> | null {
  try {
    const message = raw.message as Record<string, unknown> | undefined;
    const list = message?.toolCallList as Array<Record<string, unknown>> | undefined;
    const fn = list?.[0]?.function as Record<string, unknown> | undefined;
    if (typeof fn?.arguments === "string") {
      return JSON.parse(fn.arguments) as Record<string, unknown>;
    }
    if (fn?.arguments && typeof fn.arguments === "object") {
      return fn.arguments as Record<string, unknown>;
    }
  } catch {
    // fall through — body is direct field format
  }
  return null;
}
