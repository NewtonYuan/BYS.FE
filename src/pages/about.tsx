import Header from "@/components/Header";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900">
      <Header />
      <div className="mx-auto w-full max-w-4xl px-6 py-10">
        <section className="rounded-2xl border border-neutral-200 bg-white p-6">
          <h1 className="text-3xl font-semibold tracking-tight">About Before You Sign</h1>
          <p className="mt-4 text-sm text-neutral-700">
            Before You Sign helps renters quickly understand key terms, dates, and potential watch points in tenancy
            agreements.
          </p>
          <p className="mt-3 text-sm text-neutral-700">
            Reports are informational only and are not legal advice.
          </p>
        </section>
      </div>
    </main>
  );
}
