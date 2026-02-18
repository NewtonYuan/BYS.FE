export default function ReportSkeleton() {
  const waveDelays = ["0ms", "120ms", "240ms"];

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-5">
      <div className="space-y-4">
        <div className="h-5 w-40 rounded bg-neutral-200 animate-pulse" />
        <div className="grid gap-3 md:grid-cols-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-neutral-200 p-4">
              <div
                className="mb-2 h-3 w-24 rounded bg-neutral-200 animate-pulse"
                style={{ animationDelay: waveDelays[i % waveDelays.length] }}
              />
              <div
                className="h-4 w-32 rounded bg-neutral-200 animate-pulse"
                style={{ animationDelay: waveDelays[(i + 1) % waveDelays.length] }}
              />
            </div>
          ))}
        </div>
        <div className="h-3 w-56 rounded bg-neutral-200 animate-pulse" />
      </div>
    </div>
  );
}
