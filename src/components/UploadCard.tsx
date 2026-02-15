"use client";

import { useMemo, useRef, useState } from "react";
import { analyzeLease } from "@/lib/api";
import type { LeaseReport } from "@/lib/types";

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
      const res = await analyzeLease(file);
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
    <div className="rounded-2xl border border-neutral-200 bg-white p-6">
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
          className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:bg-neutral-300 disabled:text-neutral-500"
        >
          {status === "uploading" ? "Analyzing..." : "Analyze lease"}
        </button>

        <button
          onClick={() => onPickFile(null)}
          disabled={!file || status === "uploading"}
          className="rounded-xl border border-neutral-300 bg-white px-4 py-2 text-sm text-neutral-700 disabled:cursor-not-allowed disabled:opacity-60"
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
      className={[
        "rounded-2xl border border-dashed p-6 transition",
        isDragging ? "border-emerald-500 bg-emerald-50" : "border-neutral-300 bg-neutral-50",
      ].join(" ")}
    >
      <div className="flex flex-col items-start gap-3">
        <div className="text-sm text-neutral-700">
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
          className="rounded-xl border border-neutral-300 bg-white px-4 py-2 text-sm text-neutral-700 disabled:cursor-not-allowed disabled:opacity-60"
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
