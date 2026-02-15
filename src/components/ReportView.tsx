import type { LeaseReport } from "@/lib/types";

export default function ReportView({ report }: { report: LeaseReport }) {
  const s = report.leaseSummary;

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
        <h3 className="text-base font-semibold">Lease snapshot</h3>

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <Item label="Rent" value={formatMoney(s.rentAmount, s.rentFrequency)} />
          <Item label="Bond" value={formatMoney(s.bondAmount, null)} />
          <Item label="Tenancy type" value={formatTenancyType(s.tenancyType)} />
          <Item label="Notice period" value={s.noticePeriod ?? "-"} />
          <Item label="Start date" value={s.startDate ?? "-"} />
          <Item label="End date" value={s.endDate ?? "-"} />
          <Item label="Address" value={s.address ?? "-"} />
        </div>
      </section>

      <section className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
        <h3 className="text-base font-semibold">Things to look at carefully</h3>
        {report.keyPoints?.length ? (
          <div className="mt-4 space-y-3">
            {report.keyPoints.map((k, idx) => (
              <div key={idx} className="rounded-xl border border-neutral-200 bg-white p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="font-semibold">{k.title}</div>
                  <div className="text-xs text-neutral-500">
                    {typeof k.confidence === "number" ? `Confidence ${(k.confidence * 100).toFixed(0)}%` : ""}
                  </div>
                </div>
                <p className="mt-2 text-sm text-neutral-700">{k.whyItMatters}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-3 text-sm text-neutral-600">No watch points were detected from the extracted text.</p>
        )}
      </section>

      <section className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
        <h3 className="text-base font-semibold">Key dates</h3>
        {report.keyDates?.length ? (
          <div className="mt-3 divide-y divide-neutral-200 rounded-xl border border-neutral-200 bg-white">
            {report.keyDates.map((d, idx) => (
              <div key={idx} className="flex items-start justify-between gap-4 p-4">
                <div>
                  <div className="font-medium">{d.label}</div>
                  {d.notes ? <div className="mt-1 text-xs text-neutral-500">{d.notes}</div> : null}
                </div>
                <div className="text-sm text-neutral-700">{d.date ?? "-"}</div>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-3 text-sm text-neutral-600">No key dates were extracted.</p>
        )}
      </section>

      <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4 text-xs text-neutral-600">
        {report.disclaimer ?? "This tool provides general information only and is not legal advice."}
      </div>
    </div>
  );
}

function Item({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-4">
      <div className="text-xs text-neutral-500">{label}</div>
      <div className="mt-1 text-sm font-semibold text-neutral-900">{value}</div>
    </div>
  );
}

function formatTenancyType(t?: string | null) {
  if (!t) return "-";
  if (t === "fixed_term") return "Fixed term";
  if (t === "periodic") return "Periodic";
  return "Unknown";
}

function formatMoney(amount?: number | null, freq?: string | null) {
  if (amount == null || Number.isNaN(amount)) return "-";
  const money = new Intl.NumberFormat("en-NZ", { style: "currency", currency: "NZD" }).format(amount);
  if (!freq) return money;
  const suffix = freq === "weekly" ? "/week" : freq === "fortnightly" ? "/fortnight" : "/month";
  return `${money} ${suffix}`;
}
