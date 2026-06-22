import http from "node:http";
import { WebSocketServer, WebSocket } from "ws";

const PORT = Number(process.env.PORT || 8080);
const MEDIA_STREAM_PATH = "/api/twilio/media-stream";
const OPENAI_REALTIME_URL = "wss://api.openai.com/v1/realtime?model=gpt-realtime";
const HUBSPOT_API_BASE = "https://api.hubapi.com";

const SYSTEM_PROMPT =
  "You are an AI receptionist for a real estate demo business. Answer caller questions, ask whether they are looking to buy, sell, schedule a showing, or request information. Collect name, phone, email if available, location, budget, timeline, and callback preference. If they ask for a real person, offer callback or transfer. Keep responses short and natural.";

const realEstateProperties = [
  {
    name: "real_estate_buy_or_sell",
    label: "Real Estate Buy/Sell Intent",
    description: "Buyer, seller, investor, relocation, or partner intent from the phone receptionist.",
  },
  {
    name: "real_estate_budget",
    label: "Real Estate Budget",
    description: "Budget range captured by the phone receptionist.",
  },
  {
    name: "real_estate_location",
    label: "Real Estate Location",
    description: "Preferred city, neighborhood, address, or service area from the phone call.",
  },
  {
    name: "real_estate_timeline",
    label: "Real Estate Timeline",
    description: "Buying or selling timeline captured by the phone receptionist.",
  },
  {
    name: "real_estate_message",
    label: "Real Estate Lead Message",
    description: "Phone call summary or caller request.",
  },
  {
    name: "real_estate_lead_source",
    label: "Real Estate Lead Source",
    description: "Source channel for the real estate lead.",
  },
];

function log(...args) {
  console.log("[Phone Receptionist]", ...args);
}

function safeJson(data) {
  try {
    return JSON.parse(data.toString());
  } catch {
    return null;
  }
}

function openAiMessage(type, payload = {}) {
  return JSON.stringify({ type, ...payload });
}

function twilioMediaMessage(streamSid, payload) {
  return JSON.stringify({
    event: "media",
    streamSid,
    media: { payload },
  });
}

function extractLeadFromTranscript(transcript, callerPhone) {
  const email = transcript.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)?.[0] || "";
  const budget = transcript.match(/\$[\d,.]+(?:\s?-\s?\$?[\d,.]+)?[kKmM]?/)?.[0] || "";
  const timelineMatch = transcript.match(/\b(today|tomorrow|this week|next week|this month|next month|within \d+ days|within \d+ months|as soon as possible|soon)\b/i);
  const intentMatch = transcript.match(/\b(buy|buyer|sell|seller|showing|tour|schedule|information|info|relocat|invest)\w*\b/i);

  return {
    firstName: "Phone",
    lastName: "Lead",
    email,
    phone: callerPhone || "",
    buyOrSell: intentMatch?.[0] || "Phone inquiry",
    budget,
    location: "",
    timeline: timelineMatch?.[0] || "",
    message: transcript || "Phone call completed with AI receptionist.",
    source: "NALA AI phone receptionist",
  };
}

async function crmFetch(path, token, init = {}) {
  const response = await fetch(`${HUBSPOT_API_BASE}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...init.headers,
    },
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : {};

  if (!response.ok) {
    throw new Error(JSON.stringify({ status: response.status, data }));
  }

  return data;
}

async function findContactByEmailOrPhone(lead, token) {
  const filters = [];

  if (lead.email) {
    filters.push({ propertyName: "email", operator: "EQ", value: lead.email });
  }

  if (lead.phone) {
    filters.push({ propertyName: "phone", operator: "EQ", value: lead.phone });
  }

  if (filters.length === 0) return null;

  const data = await crmFetch("/crm/v3/objects/contacts/search", token, {
    method: "POST",
    body: JSON.stringify({
      filterGroups: filters.map((filter) => ({ filters: [filter] })),
      properties: ["email", "phone", "firstname", "lastname"],
      limit: 1,
    }),
  });

  return data.results?.[0] || null;
}

async function ensureHubSpotProperties(token) {
  await Promise.all(
    realEstateProperties.map(async (property) => {
      try {
        await crmFetch(`/crm/v3/properties/contacts/${property.name}`, token);
      } catch {
        try {
          await crmFetch("/crm/v3/properties/contacts", token, {
            method: "POST",
            body: JSON.stringify({
              groupName: "contactinformation",
              name: property.name,
              label: property.label,
              description: property.description,
              type: "string",
              fieldType: "text",
              formField: true,
            }),
          });
        } catch (error) {
          if (!error.message.includes('"status":409')) throw error;
        }
      }
    })
  );
}

async function saveLeadToHubSpot(lead) {
  const token = process.env.HUBSPOT_PRIVATE_APP_TOKEN;

  if (!token) {
    log("HubSpot save skipped: HUBSPOT_PRIVATE_APP_TOKEN is not configured.");
    return;
  }

  const properties = {
    firstname: lead.firstName,
    lastname: lead.lastName,
    email: lead.email,
    phone: lead.phone,
    real_estate_buy_or_sell: lead.buyOrSell,
    real_estate_budget: lead.budget,
    real_estate_location: lead.location,
    real_estate_timeline: lead.timeline,
    real_estate_message: lead.message,
    real_estate_lead_source: lead.source,
  };

  await ensureHubSpotProperties(token);
  const existing = await findContactByEmailOrPhone(lead, token);

  if (existing) {
    await crmFetch(`/crm/v3/objects/contacts/${existing.id}`, token, {
      method: "PATCH",
      body: JSON.stringify({ properties }),
    });
    log("HubSpot contact updated:", existing.id);
    return;
  }

  const created = await crmFetch("/crm/v3/objects/contacts", token, {
    method: "POST",
    body: JSON.stringify({ properties }),
  });

  log("HubSpot contact created:", created.id);
}

function connectOpenAI({ twilioSocket, callState }) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    log("OpenAI unavailable: OPENAI_API_KEY is not configured.");
    return null;
  }

  const openAiSocket = new WebSocket(OPENAI_REALTIME_URL, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });

  openAiSocket.on("open", () => {
    log("OpenAI Realtime connected for call:", callState.callSid || "unknown");
    openAiSocket.send(
      openAiMessage("session.update", {
        session: {
          modalities: ["audio", "text"],
          instructions: SYSTEM_PROMPT,
          voice: "alloy",
          input_audio_format: "g711_ulaw",
          output_audio_format: "g711_ulaw",
          input_audio_transcription: { model: "whisper-1" },
          turn_detection: { type: "server_vad" },
        },
      })
    );
    openAiSocket.send(openAiMessage("response.create"));
  });

  openAiSocket.on("message", (raw) => {
    const event = safeJson(raw);
    if (!event) return;

    if (
      (event.type === "response.output_audio.delta" || event.type === "response.audio.delta") &&
      event.delta &&
      callState.streamSid
    ) {
      twilioSocket.send(twilioMediaMessage(callState.streamSid, event.delta));
      return;
    }

    if (event.type === "response.output_text.delta" && event.delta) {
      callState.transcript.push(`AI: ${event.delta}`);
      return;
    }

    if (event.type === "response.output_audio_transcript.delta" && event.delta) {
      callState.transcript.push(`AI: ${event.delta}`);
      return;
    }

    if (event.type === "conversation.item.input_audio_transcription.completed" && event.transcript) {
      callState.transcript.push(`Caller: ${event.transcript}`);
      return;
    }

    if (event.type === "error") {
      log("OpenAI Realtime error:", JSON.stringify(event.error || event));
    }
  });

  openAiSocket.on("close", () => {
    log("OpenAI Realtime closed for call:", callState.callSid || "unknown");
  });

  openAiSocket.on("error", (error) => {
    log("OpenAI Realtime socket error:", error.message);
  });

  return openAiSocket;
}

function handleTwilioConnection(twilioSocket, request) {
  const callState = {
    streamSid: "",
    callSid: "",
    callerPhone: "",
    transcript: [],
  };

  log("Twilio WebSocket connected:", request.url);
  const openAiSocket = connectOpenAI({ twilioSocket, callState });

  twilioSocket.on("message", (raw) => {
    const event = safeJson(raw);
    if (!event) return;

    if (event.event !== "media") {
      log("Twilio event:", event.event);
    }

    if (event.event === "start") {
      callState.streamSid = event.start?.streamSid || event.streamSid || "";
      callState.callSid = event.start?.callSid || "";
      callState.callerPhone = event.start?.customParameters?.From || "";
      log("Call start:", {
        callSid: callState.callSid,
        streamSid: callState.streamSid,
        mediaFormat: event.start?.mediaFormat,
      });
      return;
    }

    if (event.event === "media" && event.media?.payload) {
      if (openAiSocket?.readyState === WebSocket.OPEN) {
        openAiSocket.send(
          openAiMessage("input_audio_buffer.append", {
            audio: event.media.payload,
          })
        );
      }
      return;
    }

    if (event.event === "stop") {
      log("Call end:", callState.callSid || "unknown");
      openAiSocket?.close();
      const transcript = callState.transcript.join(" ").trim();
      const lead = extractLeadFromTranscript(transcript, callState.callerPhone);
      saveLeadToHubSpot(lead).catch((error) => {
        log("HubSpot save failed:", error.message);
      });
    }
  });

  twilioSocket.on("close", () => {
    log("Twilio WebSocket closed:", callState.callSid || "unknown");
    openAiSocket?.close();
  });

  twilioSocket.on("error", (error) => {
    log("Twilio WebSocket error:", error.message);
    openAiSocket?.close();
  });
}

const server = http.createServer((req, res) => {
  if (req.url === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ ok: true }));
    return;
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ ok: false, error: "Not found" }));
});

const wss = new WebSocketServer({ noServer: true });

server.on("upgrade", (request, socket, head) => {
  const { pathname } = new URL(request.url || "/", `http://${request.headers.host}`);

  if (pathname !== MEDIA_STREAM_PATH) {
    socket.destroy();
    return;
  }

  wss.handleUpgrade(request, socket, head, (websocket) => {
    wss.emit("connection", websocket, request);
  });
});

wss.on("connection", handleTwilioConnection);

server.listen(PORT, () => {
  log(`WebSocket bridge listening on port ${PORT}`);
  log(`Twilio Media Stream path: ${MEDIA_STREAM_PATH}`);
});
