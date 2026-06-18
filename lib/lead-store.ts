// Module-level reactive lead store — shared across all client components
// Uses useSyncExternalStore pattern for React concurrent-mode safety

export type LeadRecord = {
  name: string | null;
  phone: string | null;
  email: string | null;
  budget: string | null;
  timeline: string | null;
  financing: string | null;
  financingStatus: string | null;
  property: string | null;
  propertyInterest: string | null;
  showingRequest: boolean | null;
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
  financingStatus: null,
  property: null,
  propertyInterest: null,
  showingRequest: null,
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
  const normalized: Partial<LeadRecord> = { ...delta };

  if (delta.propertyInterest && !delta.property) {
    normalized.property = delta.propertyInterest;
  }
  if (delta.property && !delta.propertyInterest) {
    normalized.propertyInterest = delta.property;
  }
  if (delta.financingStatus && !delta.financing) {
    normalized.financing = delta.financingStatus;
  }
  if (delta.financing && !delta.financingStatus) {
    normalized.financingStatus = delta.financing;
  }

  for (const [k, v] of Object.entries(normalized)) {
    if (v !== null && v !== undefined && v !== "" && v !== false) {
      (updates as Record<string, unknown>)[k] = v;
    }
  }

  if (normalized.showingRequest === true) updates.showingRequest = true;
  if (normalized.escalate === true) updates.escalate = true;
  if (normalized.escalateReason) updates.escalateReason = normalized.escalateReason;

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
