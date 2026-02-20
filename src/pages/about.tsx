import Header from "@/components/Header";
import Link from "next/link";
import Image from "next/image";
import { COLORS, UI } from "@/lib/theme";

export default function AboutPage() {
  return (
    <main className={UI.page}>
      <Header />

      <section style={{ backgroundColor: `${COLORS.brandBlue}33` }}>
        <div className="mx-auto grid w-full max-w-6xl items-center gap-14 px-8 py-20 md:grid-cols-3 md:px-12">
          <div className="md:col-span-2">
            <h1 className="text-4xl font-bold tracking-tight text-neutral-900">Our Mission</h1>
            <p className="mt-4 max-w-2xl text-base text-neutral-700">
              Before You Sign helps renters understand tenancy agreements in plain language. We focus on clarity,
              structure, and practical details so you can review confidently before committing.
            </p>
          </div>
          <div className="md:col-span-1">
            <div
              className="relative h-52 overflow-hidden rounded-lg"
            >
              <Image
                src="/images/about-us.jpg"
                alt="Students reviewing a rental agreement"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 33vw, 100vw"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-14 px-8 pb-8 pt-20 md:grid-cols-3 md:px-12">
          <div className="md:col-span-1">
            <div className="relative h-48 overflow-hidden rounded-lg">
              <Image
                src="/images/students.jpg"
                alt="Student reading housing documents"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 33vw, 100vw"
              />
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
            <div className="relative h-48 overflow-hidden rounded-lg">
              <Image
                src="/images/skytower.jpg"
                alt="Sky Tower skyline"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 33vw, 100vw"
              />
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
        <div
          className="absolute right-0 top-0 h-40 w-40 rounded-full blur-2xl"
          style={{ backgroundColor: `${COLORS.brandBlue}33` }}
        />
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
