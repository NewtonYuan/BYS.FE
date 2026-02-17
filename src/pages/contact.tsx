import Header from "@/components/Header";
import { UI } from "@/lib/theme";

export default function ContactPage() {
  return (
    <main className={UI.page}>
      <Header />

      <section className="bg-sky-100">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-14 px-8 py-20 md:grid-cols-3 md:px-12 pb-36">
          <div className="md:col-span-2">
            <h1 className="text-4xl font-bold tracking-tight text-neutral-900">Contact Us</h1>
            <p className="mt-4 max-w-2xl text-base text-neutral-700">
              Need help with Before You Sign, want a demo, or have partnership questions? Reach out and our team will
              point you in the right direction.
            </p>
          </div>
          <div className="md:col-span-1">
            <div className="grid h-52 place-items-center rounded-lg bg-white/70 text-sky-700">
              <svg viewBox="0 0 24 24" className="h-16 w-16" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M4 6h16v12H4z" />
                <path d="m4 8 8 6 8-6" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto -mt-6 w-full max-w-6xl px-8 pb-8 md:px-12">
          <div className="grid gap-5 md:grid-cols-2">
            <article className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm relative top-[-64px]">
              <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">Contact Sales</h2>
              <p className="mt-3 text-sm text-neutral-700">
                For teams, schools, and partnership opportunities, email
                {" "}
                <span className="font-semibold">sales@beforeyousign.local</span>.
              </p>
            </article>
            <article className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm relative top-[-64px]">
              <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">Customer Support</h2>
              <p className="mt-3 text-sm text-neutral-700">
                If you need product help or want to report an issue, email
                {" "}
                <span className="font-semibold">support@beforeyousign.local</span>
                {" "}
                with details and screenshots.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto w-full max-w-6xl px-8 py-14 md:px-12">
          <h2 className="text-3xl font-semibold tracking-tight text-neutral-900">Where We Work</h2>
          <p className="mt-4 max-w-3xl text-neutral-700">
            We don&apos;t have a physical office yet. We&apos;re currently a remote team, and we support customers
            online by email while we continue building.
          </p>
        </div>
      </section>
    </main>
  );
}
