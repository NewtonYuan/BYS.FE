import Header from "@/components/Header";
import Link from "next/link";
import { UI } from "@/lib/theme";

export default function AboutPage() {
  return (
    <main className={UI.page}>
      <Header />

      <section className="bg-sky-100">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-14 px-8 py-20 md:grid-cols-3 md:px-12">
          <div className="md:col-span-2">
            <h1 className="text-4xl font-bold tracking-tight text-neutral-900">Our Mission</h1>
            <p className="mt-4 max-w-2xl text-base text-neutral-700">
              Before You Sign helps renters understand tenancy agreements in plain language. We focus on clarity,
              structure, and practical details so you can review confidently before committing.
            </p>
          </div>
          <div className="md:col-span-1">
            <div className="grid h-52 place-items-center rounded-lg bg-white/70 text-sky-700">
              <svg viewBox="0 0 24 24" className="h-16 w-16" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M6 3h9l3 3v15H6z" />
                <path d="M15 3v3h3" />
                <path d="M9 12h6M9 16h6M9 8h3" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-14 px-8 pb-8 pt-20 md:grid-cols-3 md:px-12">
          <div className="md:col-span-1">
            <div className="grid h-48 place-items-center rounded-lg bg-neutral-50 text-neutral-700">
              <svg viewBox="0 0 24 24" className="h-14 w-14" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M4 7h16M4 12h10M4 17h8" />
              </svg>
            </div>
          </div>
          <div className="md:col-span-2">
            <h2 className="text-3xl font-semibold tracking-tight text-neutral-900">Built for Students and First-Time Renters</h2>
            <p className="mt-3 max-w-2xl text-neutral-700">
              Agreements can feel dense and overwhelming. We organize key terms, dates, and risk signals in a format
              that is quick to scan on desktop and mobile.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-14 px-8 pb-20 pt-8 md:grid-cols-3 md:px-12">
          <div className="md:col-span-2">
            <h2 className="text-3xl font-semibold tracking-tight text-neutral-900">Clear, Structured, Actionable</h2>
            <p className="mt-3 max-w-2xl text-neutral-700">
              We keep the experience simple: upload once, get a structured summary, and focus on details worth
              checking carefully. No unnecessary complexity.
            </p>
          </div>
          <div className="md:col-span-1">
            <div className="grid h-48 place-items-center rounded-lg bg-neutral-50 text-neutral-700">
              <svg viewBox="0 0 24 24" className="h-14 w-14" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="12" cy="12" r="9" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-neutral-50">
        <div className="mx-auto w-full max-w-6xl px-8 py-20 md:px-12">
          <h2 className="text-center text-3xl font-semibold tracking-tight text-neutral-900">What We Prioritize</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <article className="rounded-lg border border-neutral-200 bg-white p-5">
              <h3 className="text-lg font-semibold text-neutral-900">Clarity</h3>
              <p className="mt-2 text-sm text-neutral-700">Simple labels and focused sections that make agreements easier to read.</p>
            </article>
            <article className="rounded-lg border border-neutral-200 bg-white p-5">
              <h3 className="text-lg font-semibold text-neutral-900">Trust</h3>
              <p className="mt-2 text-sm text-neutral-700">Conservative wording and transparent signals so you can decide what to review next.</p>
            </article>
            <article className="rounded-lg border border-neutral-200 bg-white p-5">
              <h3 className="text-lg font-semibold text-neutral-900">Speed</h3>
              <p className="mt-2 text-sm text-neutral-700">Fast upload-to-summary workflow designed for real student timelines.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-neutral-900 text-white">
        <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-sky-400/20 blur-2xl" />
        <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-emerald-400/20 blur-2xl" />
        <div className="relative mx-auto w-full max-w-6xl px-8 py-20 md:px-12">
          <h2 className="text-3xl font-semibold tracking-tight">Ready to Review Your Agreement?</h2>
          <p className="mt-3 max-w-3xl text-neutral-200">
            Use the tool to generate a clear report, then review the sections that matter most before you sign.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/#tool"
              className="rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-100"
            >
              Open Tool
            </Link>
            <Link
              href="/contact"
              className="rounded-xl border border-neutral-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
