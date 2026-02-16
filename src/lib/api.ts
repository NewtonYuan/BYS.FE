import type { LeaseReport } from "@/lib/types";
import { normalizeLeaseReport } from "@/lib/report";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:2001";

export type HealthCheckResult = {
  ok: boolean;
  status: number;
  statusText: string;
  body: string;
};

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
