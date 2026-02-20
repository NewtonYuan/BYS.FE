import { useState, useSyncExternalStore } from "react";
import Header from "@/components/Header";
import UploadCard from "@/components/UploadCard";
import HealthCheckButton from "@/components/HealthCheckButton";
import ReportView from "@/components/ReportView";
import ReportSkeleton from "@/components/ReportSkeleton";
import { getReportServerSnapshot, getReportSnapshot, setPersistedReport, subscribeReport } from "@/lib/reportStore";
import { COLORS, UI } from "@/lib/theme";

export default function Home() {
  const report = useSyncExternalStore(subscribeReport, getReportSnapshot, getReportServerSnapshot);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const clearReport = () => setPersistedReport(null);

  return (
    <main className={UI.page}>
      <Header />

      <div className="mx-auto flex min-h-[calc(100vh-61px)] w-full max-w-7xl flex-col justify-center px-6 py-10">
        <header id="about" className="mb-8 flex flex-col items-center gap-4 text-center">
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            <span className="block text-neutral-700">Understand your agreement</span>
            <span
              className="mt-2 inline-block px-2 py-1 text-neutral-900 md:text-5xl"
              style={{ backgroundImage: `linear-gradient(to top, ${COLORS.brandBlue}55 30%, transparent 30%)` }}
            >
              Before You Sign.
            </span>
          </h1>
          <HealthCheckButton />
        </header>

        <section id="tool" className="grid items-start gap-6 md:grid-cols-2">
          <div className="w-full">
            <UploadCard onReportChange={setPersistedReport} onAnalyzeStateChange={setIsAnalyzing} />
          </div>

          <div className={`${UI.card} w-full p-6`}>
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-2xl font-semibold">View your report.</h2>
              {report ? (
                <button
                  type="button"
                  onClick={clearReport}
                  className="cursor-pointer rounded-lg border border-neutral-300 bg-white px-3 py-1.5 text-sm font-medium text-neutral-700 transition hover:border-neutral-400 hover:bg-neutral-100"
                >
                  Clear report
                </button>
              ) : null}
            </div>
            <p className="mt-2 text-sm text-neutral-600">
              Your lease summary and key points will appear here after analysis
            </p>

            <div className="mt-5">
              {report ? (
                <ReportView report={report} />
              ) : isAnalyzing ? (
                <ReportSkeleton />
              ) : (
                <div className={`${UI.cardMuted} p-8 text-sm text-neutral-500`}>
                  No report yet. Upload a PDF and click Analyze.
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
