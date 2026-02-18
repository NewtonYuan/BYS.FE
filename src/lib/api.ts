import type { LeaseReport } from "@/lib/types";
import { normalizeLeaseReport } from "@/lib/report";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:2001";

export type HealthCheckResult = {
  ok: boolean;
  status: number;
  statusText: string;
  body: string;
};

export type ContactType = "sales" | "support";

export type ContactPayload = {
  type: ContactType;
  name: string;
  email: string;
  message: string;
  website?: string;
};

export type ContactValidationDetail = {
  path?: string;
  message?: string;
};

export type ContactApiError = {
  ok: false;
  status: number;
  error: string;
  message: string;
  details?: ContactValidationDetail[];
};

export type ContactApiSuccess = {
  ok: true;
};

export async function sendContact(payload: ContactPayload): Promise<ContactApiSuccess | ContactApiError> {
  try {
    const response = await fetch(`${API_BASE}/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    let data: unknown = null;
    try {
      data = await response.json();
    } catch {
      // Ignore non-JSON response and return generic fallback below.
    }

    if (response.ok) {
      return { ok: true };
    }

    const body = (data ?? {}) as {
      error?: string;
      message?: string;
      details?: ContactValidationDetail[];
    };

    return {
      ok: false,
      status: response.status,
      error: body.error ?? "server_error",
      message: body.message ?? "Something went wrong. Please try again.",
      details: body.details,
    };
  } catch {
    return {
      ok: false,
      status: 0,
      error: "network_error",
      message: "Could not send message. Please try again.",
    };
  }
}

export async function analyze(file: File): Promise<LeaseReport> {
  const form = new FormData();
  form.append("file", file);

  const res = await fetch(`${API_BASE}/analyze-lease`, {
    method: "POST",
    body: form,
  });

  if (!res.ok) {
    let msg = `Request failed (${res.status})`;
    try {
      const data = await res.json();
      if (data?.error) msg = data.error;
    } catch {}
    throw new Error(msg);
  }

  const data: unknown = await res.json();
  return normalizeLeaseReport(data);
}

export async function checkHealth(): Promise<HealthCheckResult> {
  const res = await fetch(`${API_BASE}/health`, { cache: "no-store" });
  const body = await res.text();

  return {
    ok: res.ok,
    status: res.status,
    statusText: res.statusText,
    body,
  };
}
