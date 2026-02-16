import Header from "@/components/Header";
import { UI } from "@/lib/theme";

export default function ContactPage() {
  return (
    <main className={UI.page}>
      <Header />
      <div className="mx-auto w-full max-w-4xl px-6 py-10">
        <section className={`${UI.card} p-6`}>
          <h1 className="text-3xl font-semibold tracking-tight">Contact</h1>
          <p className="mt-4 text-sm text-neutral-700">
            For product questions, partnerships, or sales inquiries, contact us at sales@beforeyousign.local.
          </p>
        </section>
      </div>
    </main>
  );
}
