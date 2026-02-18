import Header from "@/components/Header";
import { COLORS, UI } from "@/lib/theme";

export default function ContactPage() {
  return (
    <main className={UI.page}>
      <Header />

      <section style={{ backgroundColor: COLORS.brandBlue }}>
        <div className="mx-auto grid w-full max-w-6xl items-center gap-14 px-8 py-20 md:grid-cols-3 md:px-12 pb-36">
          <div className="md:col-span-2">
            <h1 className="text-5xl font-bold tracking-tight text-white">Contact Us</h1>
            <p className="mt-4 max-w-2xl text-lg text-white/90">
              Have a question about BeforeYouSign, found a bug, or want to collaborate?
              <br/>Send us a message! We&apos;d love to hear from you.
            </p>
          </div>
          <div className="md:col-span-1">
            <div
              className="grid h-52 place-items-center rounded-lg bg-white/10 text-white"
            >
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
            <article className="relative top-[-64px] flex flex-col items-center rounded-lg border border-neutral-200 bg-white px-6 py-10 text-center shadow-sm">
              <div
                className="mb-4 grid h-12 w-12 place-items-center rounded-full"
                style={{ backgroundColor: `${COLORS.brandBlue}33`, color: COLORS.brandBlue }}
              >
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M4 6h16v12H4z" />
                  <path d="m4 8 8 6 8-6" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">Contact Sales</h2>
              <p className="mt-3 text-md text-neutral-700">
                Like BeforeYouSign&apos;s software? Let&apos;s talk.
                <br/>For businesses, schools, student associations.
              </p>
              <a
                href="mailto:prestigedevelops@gmail.com?subject=Sales%20-%20BeforeYouSign"
                className="mt-6 inline-flex self-center rounded-xl px-6 py-3 text-base font-semibold text-white transition hover:opacity-90"
                style={{ backgroundColor: COLORS.brandBlue }}
              >
                Email Sales
              </a>
            </article>
            <article className="relative top-[-64px] flex flex-col items-center rounded-lg border border-neutral-200 bg-white px-6 py-10 text-center shadow-sm">
              <div className="mb-4 grid h-12 w-12 place-items-center rounded-full bg-emerald-100 text-emerald-700">
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M8 10h8" />
                  <path d="M8 14h5" />
                  <path d="M5 5h14v14H5z" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">Customer Support</h2>
              <p className="mt-3 text-md text-neutral-700">
                Need help? Don&apos;t hesistate to reach out. 
                <br/>We&apos;ll get you back on track.
              </p>
              <a
                href="mailto:prestigedevelops@gmail.com?subject=Support%20-%20BeforeYouSign"
                className="mt-6 inline-flex self-center rounded-xl px-6 py-3 text-base font-semibold text-white transition hover:opacity-90"
                style={{ backgroundColor: COLORS.brandBlue }}
              >
                Email Support
              </a>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto w-full max-w-6xl px-8 py-14 md:px-12">
          <h2 className="text-4xl font-semibold tracking-tight text-neutral-900">Built Online</h2>
          <p className="mt-4 max-w-3xl text-neutral-700 text-lg pb-24">
            BeforeYouSign is built and supported online.
            <br/>We keep things simple, helping you through the the renting process across New Zealand.
          </p>
        </div>
      </section>
    </main>
  );
}
