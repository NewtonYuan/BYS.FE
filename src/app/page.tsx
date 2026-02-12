import UploadCard from "@/components/UploadCard";
import HealthCheckButton from "@/components/HealthCheckButton";

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <header className="flex flex-col gap-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900 px-3 py-1 text-sm text-neutral-300">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            BeforeYouSign — NZ tenancy agreement clarity for students
          </div>

          <HealthCheckButton />

          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
            Understand your flatting agreement <span className="text-neutral-400">before you sign.</span>
          </h1>

          <p className="max-w-2xl text-neutral-300">
            Upload your tenancy agreement PDF. Get a clean summary, key dates, and “things to look at carefully”.
            <span className="text-neutral-400"> Not legal advice.</span>
          </p>
        </header>

        <section className="mt-10 grid gap-6 md:grid-cols-5">
          <div className="md:col-span-3">
            <UploadCard />
          </div>

          <aside className="md:col-span-2">
            <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6">
              <h2 className="text-lg font-semibold">What you’ll get</h2>
              <ul className="mt-4 space-y-3 text-sm text-neutral-300">
                <li>• Lease snapshot (rent, bond, term, notice)</li>
                <li>• Key dates (end date, notice window if found)</li>
                <li>• Watch points (clauses worth reading carefully)</li>
                <li>• Easy to read on mobile</li>
              </ul>

              <div className="mt-6 rounded-xl bg-neutral-950/40 p-4 text-xs text-neutral-400">
                We don’t store your file. It’s processed to generate your report.
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-neutral-800 bg-neutral-900 p-6">
              <h2 className="text-lg font-semibold">Privacy</h2>
              <p className="mt-3 text-sm text-neutral-300">
                Avoid uploading documents that include highly sensitive ID numbers. This tool is for informational use.
              </p>
            </div>
          </aside>
        </section>

        <footer className="mt-14 border-t border-neutral-900 pt-6 text-xs text-neutral-500">
          © {new Date().getFullYear()} BeforeYouSign. Educational information only — not legal advice.
        </footer>
      </div>
    </main>
  );
}
