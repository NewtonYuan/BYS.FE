"use client";

import { useMemo, useRef, useState } from "react";
import { analyzeLease } from "@/lib/api";
import type { LeaseReport } from "@/lib/types";
import ReportView from "@/components/ReportView";

type Status = "idle" | "uploading" | "done" | "error";

export default function UploadCard() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [report, setReport] = useState<LeaseReport | null>(null);

  const canSubmit = useMemo(() => !!file && status !== "uploading", [file, status]);

  async function onSubmit() {
    if (!file) return;

    setStatus("uploading");
    setError(null);
    setReport(null);

    try {
      const res = await analyzeLease(file);
      setReport(res);
      setStatus("done");
    } catch (e: unknown) {
      setStatus("error");
      setError(e instanceof Error ? e.message : "Something went wrong.");
    }
  }

  function onPickFile(f: File | null) {
    setFile(f);
    setError(null);
    setReport(null);
    setStatus("idle");
  }

  function onBrowse() {
    inputRef.current?.click();
  }

  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6">
      <h2 className="text-lg font-semibold">Upload your tenancy agreement (PDF)</h2>
      <p className="mt-2 text-sm text-neutral-300">
        You’ll get a structured report: lease snapshot, key dates, and watch points.
      </p>

      <div className="mt-5">
        <DropZone
          file={file}
          status={status}
          onBrowse={onBrowse}
          onFile={onPickFile}
        />
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={(e) => onPickFile(e.target.files?.[0] ?? null)}
        />
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          onClick={onSubmit}
          disabled={!canSubmit}
          className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-neutral-950 disabled:cursor-not-allowed disabled:bg-neutral-700 disabled:text-neutral-300"
        >
          {status === "uploading" ? "Analyzing..." : "Analyze lease"}
        </button>

        <button
          onClick={() => onPickFile(null)}
          disabled={!file || status === "uploading"}
          className="rounded-xl border border-neutral-800 bg-neutral-950/30 px-4 py-2 text-sm text-neutral-200 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Clear
        </button>

        <div className="text-xs text-neutral-400">
          {file ? `${file.name} (${Math.ceil(file.size / 1024)} KB)` : "No file selected"}
        </div>
      </div>

      {status === "error" && error && (
        <div className="mt-4 rounded-xl border border-red-900/60 bg-red-950/40 p-4 text-sm text-red-200">
          {error}
        </div>
      )}

      {status === "done" && report && (
        <div className="mt-6">
          <ReportView report={report} />
        </div>
      )}
    </div>
  );
}

function DropZone({
  file,
  status,
  onBrowse,
  onFile,
}: {
  file: File | null;
  status: Status;
  onBrowse: () => void;
  onFile: (f: File | null) => void;
}) {
  const [isDragging, setIsDragging] = useState(false);

  function onDragOver(e: React.DragEvent) {
    e.preventDefault();
    if (status === "uploading") return;
    setIsDragging(true);
  }
  function onDragLeave(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
  }
  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
    if (status === "uploading") return;
    const f = e.dataTransfer.files?.[0];
    if (!f) return;
    if (f.type !== "application/pdf") {
      onFile(null);
      return;
    }
    onFile(f);
  }

  return (
    <div
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      className={[
        "rounded-2xl border border-dashed p-6 transition",
        isDragging ? "border-emerald-500 bg-emerald-950/30" : "border-neutral-700 bg-neutral-950/30",
      ].join(" ")}
    >
      <div className="flex flex-col items-start gap-3">
        <div className="text-sm text-neutral-200">
          {file ? (
            <span>
              Selected: <span className="font-semibold">{file.name}</span>
            </span>
          ) : (
            <span>Drag and drop a PDF here, or browse.</span>
          )}
        </div>

        <button
          onClick={onBrowse}
          disabled={status === "uploading"}
          className="rounded-xl border border-neutral-800 bg-neutral-900 px-4 py-2 text-sm text-neutral-200 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Browse files
        </button>

        <div className="text-xs text-neutral-500">
          PDF only. If your file is a scanned image PDF, results may be limited until OCR is added.
        </div>
      </div>
    </div>
  );
}
