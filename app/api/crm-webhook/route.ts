import { NextRequest, NextResponse } from "next/server";

// Server-side CRM webhook proxy — never exposes CRM credentials to the browser.
// Set CRM_WEBHOOK_URL in environment variables to activate.

export async function POST(req: NextRequest) {
  const webhookUrl = process.env.CRM_WEBHOOK_URL;

  if (!webhookUrl) {
    // Graceful demo fallback — log and return success so the UI doesn't break
    const body = await req.json().catch(() => ({}));
    console.info("[CRM webhook] CRM_WEBHOOK_URL not configured — demo payload:", body);
    return NextResponse.json({ ok: true, demo: true, message: "Demo mode — no CRM connected" });
  }

  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  let upstream: Response;
  try {
    upstream = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.CRM_WEBHOOK_SECRET
          ? { Authorization: `Bearer ${process.env.CRM_WEBHOOK_SECRET}` }
          : {}),
      },
      body: JSON.stringify(payload),
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: "CRM webhook unavailable" },
      { status: 502 }
    );
  }

  if (!upstream.ok) {
    console.error("[CRM webhook] Upstream error:", upstream.status, await upstream.text());
    return NextResponse.json(
      { ok: false, error: "CRM webhook failed", status: upstream.status },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
