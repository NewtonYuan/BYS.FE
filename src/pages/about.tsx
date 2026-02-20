import Header from "@/components/Header";
import Link from "next/link";
import Image from "next/image";
import { COLORS, UI } from "@/lib/theme";

export default function AboutPage() {
  return (
    <main className={UI.page}>
      <Header />

      <section style={{ backgroundColor: COLORS.brandBlue }}>
        <div className="mx-auto grid w-full max-w-6xl items-center gap-14 px-8 py-20 md:grid-cols-3 md:px-12">
          <div className="md:col-span-2">
            <h1 className="text-5xl font-bold tracking-tight text-white">
              Our Mission
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-white/90">
              We make renting safer and simpler by helping Kiwis quickly
              understand the parts of an agreement that deserve closer
              attention.
            </p>
          </div>
          <div className="md:col-span-1">
            <div className="relative h-52 overflow-hidden rounded-lg">
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
                src="/images/skytower.jpg"
                alt="Sky Tower skyline"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 33vw, 100vw"
              />
            </div>
          </div>
          <div className="md:col-span-2">
            <h2 className="text-4xl font-semibold tracking-tight text-neutral-900">
              Designed for Aotearoa
            </h2>
            <p className="mt-3 max-w-2xl text-lg text-neutral-700">
              From first flat to long-term lease, we help New Zealand renters
              review agreements with clearer structure and practical context.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-14 px-8 pb-20 pt-8 md:grid-cols-3 md:px-12">
          <div className="md:col-span-2">
            <h2 className="text-4xl font-semibold tracking-tight text-neutral-900">
              Made for New Renters, Built for All
            </h2>
            <p className="mt-3 max-w-2xl text-lg text-neutral-700">
              Whether you&apos;re a student renting your first flat or someone
              moving into your fifth place, we help you quickly understand key
              terms, important dates, and what to check before you sign.
            </p>
          </div>
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
        </div>
      </section>

      <section className="relative overflow-hidden bg-neutral-900 text-white">
        <div
          className="absolute right-0 top-0 h-40 w-40 rounded-full blur-2xl"
          style={{ backgroundColor: `${COLORS.brandBlue}33` }}
        />
        <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-emerald-400/20 blur-2xl" />
        <div className="relative mx-auto w-full max-w-6xl px-8 py-20 md:px-12">
          <h2 className="text-4xl font-semibold tracking-tight">
            Ready to Review Your Agreement?
          </h2>
          <p className="mt-3 max-w-3xl text-lg text-white/90">
            Use the tool to generate a clear report, then review the sections
            that matter most before you sign.
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
