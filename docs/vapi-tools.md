# Vapi Tools — NALA Real Estate Concierge

This document describes how Twilio, Vapi, and the Vercel backend connect, plus the exact JSON schemas to paste into your Vapi dashboard.

---

## Architecture

```
Inbound call / SMS
      │
      ▼
  Twilio (+1 470-256-5261)
      │
      │  Voice webhook → https://api.vapi.ai/twilio/inbound_call
      │  SMS webhook   → https://api.vapi.ai/twilio/sms
      │
      ▼
    Vapi (NALA assistant)
      │
      │  Tool calls when data needs to be saved
      │
      ▼
  Vercel backend (truai-qvkg.vercel.app)
      ├── POST /api/vapi/lead
      ├── POST /api/vapi/property-inquiry
      ├── POST /api/vapi/book-showing
      └── POST /api/vapi/webhook   ← general event receiver
```

**Important:** Twilio webhooks point directly to Vapi — do not change them to the Vercel URL. The Vercel backend only handles Vapi tool calls and event webhooks.

---

## Authentication

Set `VAPI_WEBHOOK_SECRET` in Vercel environment variables, then configure Vapi to send it as a custom header on every tool call:

| Vapi setting | Value |
|---|---|
| Header name | `x-vapi-secret` |
| Header value | _(your secret)_ |

If `VAPI_WEBHOOK_SECRET` is blank the routes skip the check — useful during initial testing.

---

## Tools

### 1. `capture_lead`

Saves a lead (name, phone, email, intent) captured during a call or SMS to HubSpot and sends a Resend notification email.

**Server URL:** `https://truai-qvkg.vercel.app/api/vapi/lead`
**Method:** POST

**Vapi JSON schema:**

```json
{
  "name": "capture_lead",
  "description": "Save a lead captured during a call or SMS. Call this whenever you have collected the caller's contact information or they have expressed buying/selling intent.",
  "parameters": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "description": "Full name of the caller."
      },
      "phone": {
        "type": "string",
        "description": "Phone number of the caller."
      },
      "email": {
        "type": "string",
        "description": "Email address of the caller, if provided."
      },
      "intent": {
        "type": "string",
        "description": "Buyer, seller, investor, renter, or relocation.",
        "enum": ["Buyer", "Seller", "Investor", "Renter", "Relocation", "Unknown"]
      },
      "propertyAddress": {
        "type": "string",
        "description": "Property address the caller asked about, if any."
      },
      "propertyId": {
        "type": "string",
        "description": "Internal property slug or MLS ID, if known."
      },
      "message": {
        "type": "string",
        "description": "Any additional notes or the caller's question."
      },
      "transcriptSummary": {
        "type": "string",
        "description": "Short summary of the conversation so far."
      },
      "source": {
        "type": "string",
        "description": "Lead source label. Defaults to 'Vapi Voice' or 'Vapi SMS'."
      },
      "channel": {
        "type": "string",
        "description": "Communication channel.",
        "enum": ["voice", "sms"]
      },
      "callId": {
        "type": "string",
        "description": "Vapi call ID for reference."
      }
    },
    "required": []
  }
}
```

**Returns:**
```json
{ "ok": true, "crm": "connected", "action": "created|updated", "contactId": "..." }
```

---

### 2. `property_inquiry`

Captures a property question and saves the contact to HubSpot. Use when a caller asks a specific question about a listing.

**Server URL:** `https://truai-qvkg.vercel.app/api/vapi/property-inquiry`
**Method:** POST

**Vapi JSON schema:**

```json
{
  "name": "property_inquiry",
  "description": "Save a property inquiry from a caller. Call this when the caller asks a specific question about a listing and you want to route the question to the team.",
  "parameters": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "description": "Full name of the caller."
      },
      "phone": {
        "type": "string",
        "description": "Phone number of the caller."
      },
      "email": {
        "type": "string",
        "description": "Email address of the caller, if provided."
      },
      "propertyAddress": {
        "type": "string",
        "description": "Address of the property being asked about."
      },
      "propertyId": {
        "type": "string",
        "description": "Internal property slug or MLS ID."
      },
      "question": {
        "type": "string",
        "description": "The specific question the caller has about the property."
      },
      "preferredContactMethod": {
        "type": "string",
        "description": "How the caller prefers to be contacted: phone, email, or text."
      },
      "transcriptSummary": {
        "type": "string",
        "description": "Short summary of the conversation."
      },
      "callId": {
        "type": "string",
        "description": "Vapi call ID for reference."
      }
    },
    "required": []
  }
}
```

**Returns:**
```json
{ "ok": true, "crm": "connected", "action": "created|updated", "contactId": "..." }
```

---

### 3. `book_showing`

Captures a showing appointment request and saves it to HubSpot. NALA should relay that the team will follow up to confirm — the backend does **not** auto-confirm bookings.

**Server URL:** `https://truai-qvkg.vercel.app/api/vapi/book-showing`
**Method:** POST

**Vapi JSON schema:**

```json
{
  "name": "book_showing",
  "description": "Submit a showing request for a property. Call this when a caller wants to schedule a private showing. Tell the caller that the Abbie Shepherd team will contact them to confirm — do not guarantee a confirmed appointment.",
  "parameters": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "description": "Full name of the caller."
      },
      "phone": {
        "type": "string",
        "description": "Best phone number to reach the caller."
      },
      "email": {
        "type": "string",
        "description": "Email address, if provided."
      },
      "propertyAddress": {
        "type": "string",
        "description": "Address of the property they want to tour."
      },
      "propertyId": {
        "type": "string",
        "description": "Internal property slug or MLS ID."
      },
      "preferredDate": {
        "type": "string",
        "description": "Preferred showing date, e.g. 'Saturday June 28' or '2025-06-28'."
      },
      "preferredTime": {
        "type": "string",
        "description": "Preferred showing time, e.g. '2pm' or '14:00'."
      },
      "alternativeDate": {
        "type": "string",
        "description": "Alternative date if the preferred date is not available."
      },
      "alternativeTime": {
        "type": "string",
        "description": "Alternative time if the preferred time is not available."
      },
      "notes": {
        "type": "string",
        "description": "Any additional notes from the caller."
      },
      "callId": {
        "type": "string",
        "description": "Vapi call ID for reference."
      }
    },
    "required": ["propertyAddress"]
  }
}
```

**Returns:**
```json
{
  "ok": true,
  "crm": "connected",
  "action": "created|updated",
  "contactId": "...",
  "message": "Your showing request has been received. A member of the Abbie Shepherd Real Estate Group team will contact you to confirm the appointment."
}
```

NALA should read back the `message` field from the response to the caller.

---

### 4. `vapi_webhook` (General event receiver)

Receives Vapi lifecycle events: call ended, transcripts, status updates, etc. Configure this as the **Server URL** on the assistant — not as a tool.

**Server URL:** `https://truai-qvkg.vercel.app/api/vapi/webhook`
**Method:** POST

Events handled: `end-of-call-report`, `status-update`, `tool-calls`, and all others (logged).

---

## NALA Assistant Prompt (suggested)

Paste this as the **System Prompt** in your Vapi assistant:

```
You are NALA, the AI real estate concierge for Abbie Shepherd Real Estate Group / Keller Williams Buckhead, serving the greater Atlanta, Georgia market.

Your role:
- Answer questions about active listings (Sandy Springs, Roswell, Acworth, Grant Park, Peachtree City, Dacula, and surrounding Atlanta suburbs).
- Qualify callers: understand their intent (buying, selling, investing), timeline, budget, and financing status.
- Collect contact information naturally — name, phone number, and email.
- Submit showing requests when a caller wants to tour a property.
- Capture property inquiries when a caller has a specific question you want the team to follow up on.

Tone: Warm, professional, precise. You are the first impression of Abbie Shepherd Real Estate Group. Never vague, never pushy.

Important rules:
- Do NOT confirm a showing is booked. After calling book_showing, tell the caller: "Your request has been sent to the team and someone will reach out shortly to confirm the details."
- Do NOT reveal pricing advice, legal advice, or make binding commitments.
- Direct urgent or legal questions to the team at (404) 275-5561 or abbieagent.com.
- You only represent properties in the greater Atlanta area — politely decline questions about other markets.

Tools available:
- capture_lead: call whenever you collect a caller's name + phone or name + email.
- property_inquiry: call when a caller has a specific question about a listing that needs team follow-up.
- book_showing: call when a caller wants to schedule a property tour.

Lead qualification sequence (weave naturally, never more than one question at a time):
1. What's drawing you to this area / these properties?
2. Are you working with a timeline?
3. Have you been pre-qualified for financing, or are you paying cash?
4. What's your comfortable budget range?
5. Would you like to schedule a private showing or connect with Abbie's team?
6. May I get your name and the best number or email to reach you?
```

---

## Call flow example

```
Caller: "Hi, I saw the house on Spindle Court in Sandy Springs. Can I see it?"

NALA: Asks for name and phone → collects "John Smith", "404-555-0100"
      Asks for preferred date/time → "Saturday at 2pm"
      Calls book_showing({
        name: "John Smith",
        phone: "4045550100",
        propertyAddress: "395 Spindle CT, Sandy Springs GA 30350",
        preferredDate: "Saturday June 28",
        preferredTime: "2:00 PM"
      })
      Backend saves to HubSpot + sends Resend email to agent
      NALA reads back the response message:
      "Your showing request has been received. Someone from the team will reach out shortly to confirm."
```

---

## Testing with curl

### capture_lead

```bash
curl -X POST https://truai-qvkg.vercel.app/api/vapi/lead \
  -H "Content-Type: application/json" \
  -H "x-vapi-secret: YOUR_SECRET" \
  -d '{
    "name": "Jane Smith",
    "phone": "4045550199",
    "email": "jane@example.com",
    "intent": "Buyer",
    "propertyAddress": "395 Spindle CT, Sandy Springs GA 30350",
    "message": "Interested in the Sandy Springs listing, asked about school district.",
    "channel": "voice",
    "callId": "test-call-001"
  }'
```

### property_inquiry

```bash
curl -X POST https://truai-qvkg.vercel.app/api/vapi/property-inquiry \
  -H "Content-Type: application/json" \
  -H "x-vapi-secret: YOUR_SECRET" \
  -d '{
    "name": "Marcus Johnson",
    "phone": "6785550144",
    "propertyAddress": "510 Grove Park Place, Roswell GA 30075",
    "question": "Is the HOA fee included in the price? What are the restrictions?",
    "preferredContactMethod": "phone",
    "callId": "test-call-002"
  }'
```

### book_showing

```bash
curl -X POST https://truai-qvkg.vercel.app/api/vapi/book-showing \
  -H "Content-Type: application/json" \
  -H "x-vapi-secret: YOUR_SECRET" \
  -d '{
    "name": "Priya Patel",
    "phone": "4045550177",
    "email": "priya@example.com",
    "propertyAddress": "738 Overlook TRL, Acworth GA 30101",
    "preferredDate": "Saturday June 28",
    "preferredTime": "2:00 PM",
    "alternativeDate": "Sunday June 29",
    "alternativeTime": "11:00 AM",
    "notes": "Interested in the backyard and garage situation.",
    "callId": "test-call-003"
  }'
```

### webhook (general event)

```bash
curl -X POST https://truai-qvkg.vercel.app/api/vapi/webhook \
  -H "Content-Type: application/json" \
  -H "x-vapi-secret: YOUR_SECRET" \
  -d '{
    "message": {
      "type": "end-of-call-report",
      "callId": "test-call-001",
      "endedReason": "customer-ended-call",
      "durationSeconds": 127,
      "summary": "Caller asked about the Sandy Springs property and requested a showing."
    }
  }'
```

---

## Vapi dashboard checklist

- [ ] Create assistant named **NALA**
- [ ] Set voice to your preferred Vapi voice (e.g. `jennifer` or `nova`)
- [ ] Paste the system prompt above
- [ ] Add tools: `capture_lead`, `property_inquiry`, `book_showing` — each as a **Function** tool with **Server URL** as shown above
- [ ] Set assistant **Server URL** to `https://truai-qvkg.vercel.app/api/vapi/webhook` for lifecycle events
- [ ] Add custom header `x-vapi-secret: YOUR_SECRET` on the assistant server URL settings
- [ ] Connect your Twilio phone number (+1 470-256-5261) to this assistant
- [ ] Verify Twilio voice webhook remains `https://api.vapi.ai/twilio/inbound_call`
- [ ] Verify Twilio SMS webhook remains `https://api.vapi.ai/twilio/sms`
