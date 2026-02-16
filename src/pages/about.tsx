import Header from "@/components/Header";
import { UI } from "@/lib/theme";

export default function AboutPage() {
  return (
    <main className={UI.page}>
      <Header />
      <div className="mx-auto w-full max-w-4xl px-6 py-10">
        <section className={`${UI.card} p-6`}>
          <h1 className="text-3xl font-semibold tracking-tight">About Before You Sign</h1>
          <p className="mt-4 text-sm text-neutral-700">
            Before You Sign helps renters quickly understand key terms, dates, and potential watch points in tenancy
            agreements.
          </p>
          <p className="mt-3 text-sm text-neutral-700">
            Reports are for general understanding and discussion.
          </p>
        </section>
      </div>
    </main>
  );
}
