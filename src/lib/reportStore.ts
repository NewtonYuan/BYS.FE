import { normalizeLeaseReport } from "@/lib/report";
import type { LeaseReport } from "@/lib/types";

const REPORT_STORAGE_KEY = "bys:last-report";
const listeners = new Set<() => void>();
let lastRaw: string | null = null;
let lastSnapshot: LeaseReport | null = null;

function notify() {
  for (const listener of listeners) listener();
}

export function subscribeReport(listener: () => void): () => void {
  listeners.add(listener);

  const onStorage = (event: StorageEvent) => {
    if (event.key === REPORT_STORAGE_KEY) listener();
  };

  if (typeof window !== "undefined") {
    window.addEventListener("storage", onStorage);
  }

  return () => {
    listeners.delete(listener);
    if (typeof window !== "undefined") {
      window.removeEventListener("storage", onStorage);
    }
  };
}

export function getReportSnapshot(): LeaseReport | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(REPORT_STORAGE_KEY);
    if (!raw) {
      lastRaw = null;
      lastSnapshot = null;
      return null;
    }

    if (raw === lastRaw) {
      return lastSnapshot;
    }

    const parsed: unknown = JSON.parse(raw);
    lastRaw = raw;
    lastSnapshot = normalizeLeaseReport(parsed);
    return lastSnapshot;
  } catch {
    window.localStorage.removeItem(REPORT_STORAGE_KEY);
    lastRaw = null;
    lastSnapshot = null;
    return null;
  }
}

export function getReportServerSnapshot(): LeaseReport | null {
  return null;
}

export function setPersistedReport(report: LeaseReport | null): void {
  if (typeof window === "undefined") return;

  try {
    if (report) {
      const raw = JSON.stringify(report);
      window.localStorage.setItem(REPORT_STORAGE_KEY, raw);
      lastRaw = raw;
      lastSnapshot = report;
    } else {
      window.localStorage.removeItem(REPORT_STORAGE_KEY);
      lastRaw = null;
      lastSnapshot = null;
    }
  } catch {
    // Ignore storage failures (quota/private mode).
  }

  notify();
}
