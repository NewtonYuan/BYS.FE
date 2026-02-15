"use client";

import { useState } from "react";
import UploadCard from "@/components/UploadCard";
import HealthCheckButton from "@/components/HealthCheckButton";
import ReportView from "@/components/ReportView";
import type { LeaseReport } from "@/lib/types";

export default function Home() {
  const [report, setReport] = useState<LeaseReport | null>(null);

  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center px-6 py-10">
        <header className="mb-8 flex flex-col items-center gap-4 text-center">
          {/*<div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1 text-sm text-neutral-600">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            BeforeYouSign - NZ tenancy agreement clarity for students
          </div>*/}
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            <span className="block text-neutral-600">Understand your contract</span></h1>
          <h1 className="text-3xl font-semibold tracking-tight md:text-5xl mt-[-8px]">
            <span
              className="inline-block px-2 py-1 text-neutral-900"
              style={{ backgroundImage: "linear-gradient(to top, #87CEFA 30%, transparent 30%)" }}
            >
              Before You Sign.
            </span>
          </h1>
          <HealthCheckButton />
        </header>

        <section className="grid items-start gap-6 md:grid-cols-2">
          <div className="w-full">
            <UploadCard onReportChange={setReport} />
          </div>

          <div className="w-full rounded-2xl border border-neutral-200 bg-white p-6">
            <h2 className="text-2xl font-semibold">View your report.</h2>
            <p className="mt-2 text-sm text-neutral-600">
              Your lease summary and key points will appear here after analysis
            </p>

            <div className="mt-5">
              {report ? (
                <ReportView report={report} />
              ) : (
                <div className="rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 p-8 text-sm text-neutral-500">
                  No report yet. Upload a PDF and click Analyze lease.
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
