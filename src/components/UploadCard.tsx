"use client";

import { useMemo, useRef, useState } from "react";
import { analyze } from "@/lib/api";
import type { LeaseReport } from "@/lib/types";
import { UI } from "@/lib/theme";

type Status = "idle" | "uploading" | "done" | "error";

type UploadCardProps = {
  onReportChange: (report: LeaseReport | null) => void;
};

export default function UploadCard({ onReportChange }: UploadCardProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const canSubmit = useMemo(() => !!file && status !== "uploading", [file, status]);

  async function onSubmit() {
    if (!file) return;

    setStatus("uploading");
    setError(null);
    onReportChange(null);

    try {
      const res = await analyze(file);
      onReportChange(res);
      setStatus("done");
    } catch (e: unknown) {
      setStatus("error");
      setError(e instanceof Error ? e.message : "Something went wrong.");
      onReportChange(null);
    }
  }

  function onPickFile(f: File | null) {
    setFile(f);
    setError(null);
    setStatus("idle");
    onReportChange(null);
  }

  function onBrowse() {
    inputRef.current?.click();
  }

  return (
    <div className={`${UI.card} p-6`}>
      <h2 className="text-2xl font-semibold">Upload your contract here.</h2>
      <p className="mt-2 text-sm text-neutral-700">
        Upload the contract you wish to understand
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
          className={UI.primaryButton}
        >
          {status === "uploading" ? "Analyzing..." : "Analyze"}
        </button>

        <button
          onClick={() => onPickFile(null)}
          disabled={!file || status === "uploading"}
          className={UI.secondaryButton}
        >
          Clear
        </button>

        <div className="text-xs text-neutral-600">
          {file ? `${file.name} (${Math.ceil(file.size / 1024)} KB)` : "No file selected"}
        </div>
      </div>

      {status === "error" && error && (
        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
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
      onClick={() => {
        if (status !== "uploading") onBrowse();
      }}
      onKeyDown={(e) => {
        if (status === "uploading") return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onBrowse();
        }
      }}
      role="button"
      tabIndex={status === "uploading" ? -1 : 0}
      aria-label="Upload PDF file"
      className={[
        "rounded-2xl border-4 border-dashed p-8 transition outline-none",
        status === "uploading" ? "cursor-not-allowed opacity-70" : "cursor-pointer",
        isDragging
          ? "border-emerald-500 bg-emerald-50"
          : "border-neutral-300 bg-neutral-50 hover:border-neutral-400 hover:bg-neutral-100 hover:shadow-sm",
      ].join(" ")}
    >
      <div className="flex flex-col items-center justify-center gap-4 text-center">
        <div className="grid h-20 w-20 place-items-center rounded-full border border-neutral-300 bg-white">
          <svg
            viewBox="0 0 24 24"
            className="h-10 w-10 text-neutral-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 16V5" />
            <path d="m7 10 5-5 5 5" />
            <path d="M20 16.5a3.5 3.5 0 0 1-3.5 3.5h-9A3.5 3.5 0 0 1 4 16.5" />
          </svg>
        </div>

        <div className="text-sm text-neutral-700">
          {file ? (
            <span>
              Selected: <span className="font-semibold">{file.name}</span>
            </span>
          ) : (
            <span>Drag and drop a PDF here, or click anywhere to browse.</span>
          )}
        </div>

        <div className="text-xs text-neutral-500">
          PDF only. If your file is a scanned image PDF, results may be limited until OCR is added.
        </div>
      </div>
    </div>
  );
}
