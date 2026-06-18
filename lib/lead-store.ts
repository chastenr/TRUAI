// Module-level reactive lead store — shared across all client components
// Uses useSyncExternalStore pattern for React concurrent-mode safety

export type LeadRecord = {
  name: string | null;
  phone: string | null;
  email: string | null;
  budget: string | null;
  timeline: string | null;
  financing: string | null;
  property: string | null;
  intent: string | null;
  summary: string | null;
  nextStep: string | null;
  escalate: boolean;
  escalateReason: string | null;
  docStatus: string;
};

const DEFAULT_LEAD: LeadRecord = {
  name: null,
  phone: null,
  email: null,
  budget: null,
  timeline: null,
  financing: null,
  property: null,
  intent: null,
  summary: null,
  nextStep: null,
  escalate: false,
  escalateReason: null,
  docStatus: "Not uploaded",
};

let _lead: LeadRecord = { ...DEFAULT_LEAD };
const _listeners = new Set<() => void>();

export function getLeadSnapshot(): LeadRecord {
  return _lead;
}

export function subscribeToLead(cb: () => void): () => void {
  _listeners.add(cb);
  return () => _listeners.delete(cb);
}

export function mergeLead(delta: Partial<LeadRecord>): void {
  const updates: Partial<LeadRecord> = {};
  for (const [k, v] of Object.entries(delta)) {
    if (v !== null && v !== undefined && v !== "" && v !== false) {
      (updates as Record<string, unknown>)[k] = v;
    }
  }
  // Always allow escalate: true to come through
  if (delta.escalate === true) updates.escalate = true;
  if (delta.escalateReason) updates.escalateReason = delta.escalateReason;

  if (Object.keys(updates).length > 0) {
    _lead = { ..._lead, ...updates };
    _listeners.forEach((l) => l());
  }
}

export function setDocStatus(status: string): void {
  _lead = { ..._lead, docStatus: status };
  _listeners.forEach((l) => l());
}

export function resetLead(): void {
  _lead = { ...DEFAULT_LEAD };
  _listeners.forEach((l) => l());
}
