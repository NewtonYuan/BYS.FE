"use client";

import { useState } from "react";
import { checkHealth } from "@/lib/api";

export default function HealthCheckButton() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string>("");

  const runHealthCheck = async () => {
    setLoading(true);
    setResult("");

    try {
      const response = await checkHealth();
      setResult(`${response.status} ${response.statusText}${response.body ? `: ${response.body}` : ""}`);
    } catch (error) {
      setResult(error instanceof Error ? error.message : "Request failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        onClick={runHealthCheck}
        disabled={loading}
        className="inline-flex w-fit items-center rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-800 transition hover:border-neutral-400 hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Checking..." : "Test /health API"}
      </button>
      {result ? <p className="text-xs text-neutral-600">{result}</p> : null}
    </div>
  );
}
