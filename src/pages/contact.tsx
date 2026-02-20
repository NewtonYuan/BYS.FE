"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Image from "next/image";
import { COLORS, UI } from "@/lib/theme";
import { sendContact } from "@/lib/api";

type ContactType = "sales" | "support";

type ContactFormValues = {
  name: string;
  email: string;
  message: string;
  website: string;
};

type ContactFormState = {
  values: ContactFormValues;
  submitting: boolean;
  success: string | null;
  error: string | null;
  fieldErrors: Partial<Record<keyof ContactFormValues, string>>;
};

const INITIAL_FORM_STATE: ContactFormState = {
  values: { name: "", email: "", message: "", website: "" },
  submitting: false,
  success: null,
  error: null,
  fieldErrors: {},
};

export default function ContactPage() {
  const [showSalesForm, setShowSalesForm] = useState(false);
  const [showSupportForm, setShowSupportForm] = useState(false);
  const [salesForm, setSalesForm] = useState<ContactFormState>(INITIAL_FORM_STATE);
  const [supportForm, setSupportForm] = useState<ContactFormState>(INITIAL_FORM_STATE);

  function getSetter(type: ContactType) {
    return type === "sales" ? setSalesForm : setSupportForm;
  }

  function getState(type: ContactType) {
    return type === "sales" ? salesForm : supportForm;
  }

  function setField(type: ContactType, field: keyof ContactFormValues, value: string) {
    const setter = getSetter(type);
    setter((prev) => ({
      ...prev,
      values: { ...prev.values, [field]: value },
      error: null,
      success: null,
      fieldErrors: { ...prev.fieldErrors, [field]: undefined },
    }));
  }

  async function onSubmit(type: ContactType) {
    const setter = getSetter(type);
    const state = getState(type);
    const values = state.values;

    const fieldErrors: ContactFormState["fieldErrors"] = {};
    if (!values.name.trim() || values.name.trim().length > 100) {
      fieldErrors.name = "Name must be between 1 and 100 characters.";
    }
    if (!values.email.trim() || values.email.trim().length > 254) {
      fieldErrors.email = "Enter a valid email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      fieldErrors.email = "Enter a valid email address.";
    }
    if (!values.message.trim() || values.message.trim().length < 10 || values.message.trim().length > 4000) {
      fieldErrors.message = "Message must be between 10 and 4000 characters.";
    }
    if (values.website && values.website.trim() !== "") {
      fieldErrors.website = "Invalid submission.";
    }

    if (Object.keys(fieldErrors).length > 0) {
      setter((prev) => ({
        ...prev,
        fieldErrors,
        success: null,
        error: "Please correct the highlighted fields.",
      }));
      return;
    }

    setter((prev) => ({
      ...prev,
      submitting: true,
      error: null,
      success: null,
      fieldErrors: {},
    }));

    try {
      const result = await sendContact({
        type,
        name: values.name.trim(),
        email: values.email.trim(),
        message: values.message.trim(),
        website: values.website ?? "",
      });

      if (result.ok) {
        setter((prev) => ({
          ...prev,
          submitting: false,
          error: null,
          success: "Message sent successfully.",
          values: { name: "", email: "", message: "", website: "" },
          fieldErrors: {},
        }));
        return;
      }

      if (result.status === 400 && result.error === "validation_error") {
        const detailErrors: ContactFormState["fieldErrors"] = {};
        for (const detail of result.details ?? []) {
          const key = detail.path?.split(".").pop();
          if (key === "name" || key === "email" || key === "message" || key === "website") {
            detailErrors[key] = detail.message || "Invalid value.";
          }
        }
        setter((prev) => ({
          ...prev,
          submitting: false,
          error: result.message || "Please check your inputs.",
          fieldErrors: detailErrors,
        }));
        return;
      }

      if (result.status === 429 && result.error === "rate_limited") {
        setter((prev) => ({
          ...prev,
          submitting: false,
          error: "Too many requests. Please try again later.",
        }));
        return;
      }

      setter((prev) => ({
        ...prev,
        submitting: false,
        error: result.message || "Something went wrong. Please try again.",
      }));
    } catch {
      setter((prev) => ({
        ...prev,
        submitting: false,
        error: "Could not send message. Please try again.",
      }));
    }
  }

  return (
    <main className={UI.page}>
      <Header />

      <section className="relative overflow-visible" style={{ backgroundColor: COLORS.brandBlue }}>
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
              className="relative z-0 h-52 overflow-hidden rounded-lg md:h-[30rem] md:-mb-64"
            >
              <Image
                src="/images/contact-us.jpg"
                alt="Contact Before You Sign"
                fill
                className="object-cover md:-translate-y-10"
                sizes="(min-width: 768px) 33vw, 100vw"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 bg-white">
        <div className="mx-auto -mt-6 w-full max-w-6xl px-8 pb-8 md:px-12">
          <div className="grid items-start gap-5 md:grid-cols-2">
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
              <button
                type="button"
                onClick={() => setShowSalesForm(true)}
                disabled={showSalesForm}
                className="mt-6 inline-flex self-center rounded-xl px-6 py-3 text-base font-semibold text-white transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-60"
                style={{ backgroundColor: COLORS.brandBlue }}
              >
                Email Sales
              </button>
              {showSalesForm ? (
                <form
                  className="mt-6 w-full max-w-md text-left"
                  onSubmit={(e) => {
                    e.preventDefault();
                    void onSubmit("sales");
                  }}
                >
                  <label className="mb-2 block text-sm font-medium text-neutral-800">
                    Name
                    <input
                      type="text"
                      value={salesForm.values.name}
                      onChange={(e) => setField("sales", "name", e.target.value)}
                      className="mt-1 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 outline-none transition focus:border-neutral-500"
                      placeholder="Your name"
                    />
                    {salesForm.fieldErrors.name ? <p className="mt-1 text-xs text-red-600">{salesForm.fieldErrors.name}</p> : null}
                  </label>
                  <label className="mb-2 block text-sm font-medium text-neutral-800">
                    Email
                    <input
                      type="email"
                      value={salesForm.values.email}
                      onChange={(e) => setField("sales", "email", e.target.value)}
                      className="mt-1 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 outline-none transition focus:border-neutral-500"
                      placeholder="you@example.com"
                    />
                    {salesForm.fieldErrors.email ? <p className="mt-1 text-xs text-red-600">{salesForm.fieldErrors.email}</p> : null}
                  </label>
                  <label className="block text-sm font-medium text-neutral-800">
                    Message
                    <textarea
                      rows={4}
                      value={salesForm.values.message}
                      onChange={(e) => setField("sales", "message", e.target.value)}
                      className="mt-1 w-full resize-y rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 outline-none transition focus:border-neutral-500"
                      placeholder="Tell us about your enquiry..."
                    />
                    {salesForm.fieldErrors.message ? <p className="mt-1 text-xs text-red-600">{salesForm.fieldErrors.message}</p> : null}
                  </label>
                  <input
                    type="text"
                    value={salesForm.values.website}
                    onChange={(e) => setField("sales", "website", e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                    className="sr-only"
                    aria-hidden="true"
                  />
                  <div className="mt-2 flex items-center justify-between">
                    <button
                      type="submit"
                      disabled={salesForm.submitting}
                      className="inline-flex min-w-28 justify-center rounded-lg px-5 py-2 text-sm font-semibold text-white transition hover:opacity-80"
                      style={{ backgroundColor: COLORS.brandBlue }}
                    >
                      {salesForm.submitting ? "Sending..." : "Send"}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowSalesForm(false);
                        setSalesForm(INITIAL_FORM_STATE);
                      }}
                      disabled={salesForm.submitting}
                      className="rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition hover:bg-neutral-100"
                    >
                      Cancel
                    </button>
                  </div>
                  {salesForm.error ? <p className="mt-2 text-sm text-red-600">{salesForm.error}</p> : null}
                  {salesForm.success ? <p className="mt-2 text-sm text-emerald-700">{salesForm.success}</p> : null}
                </form>
              ) : null}
            </article>
            <article className="relative z-20 top-[-64px] flex flex-col items-center rounded-lg border border-neutral-200 bg-white px-6 py-10 text-center shadow-sm">
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
              <button
                type="button"
                onClick={() => setShowSupportForm(true)}
                disabled={showSupportForm}
                className="mt-6 inline-flex self-center rounded-xl px-6 py-3 text-base font-semibold text-white transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-60"
                style={{ backgroundColor: COLORS.brandBlue }}
              >
                Email Support
              </button>
              {showSupportForm ? (
                <form
                  className="mt-6 w-full max-w-md text-left"
                  onSubmit={(e) => {
                    e.preventDefault();
                    void onSubmit("support");
                  }}
                >
                  <label className="mb-2 block text-sm font-medium text-neutral-800">
                    Name
                    <input
                      type="text"
                      value={supportForm.values.name}
                      onChange={(e) => setField("support", "name", e.target.value)}
                      className="mt-1 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 outline-none transition focus:border-neutral-500"
                      placeholder="Your name"
                    />
                    {supportForm.fieldErrors.name ? <p className="mt-1 text-xs text-red-600">{supportForm.fieldErrors.name}</p> : null}
                  </label>
                  <label className="mb-2 block text-sm font-medium text-neutral-800">
                    Email
                    <input
                      type="email"
                      value={supportForm.values.email}
                      onChange={(e) => setField("support", "email", e.target.value)}
                      className="mt-1 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 outline-none transition focus:border-neutral-500"
                      placeholder="you@example.com"
                    />
                    {supportForm.fieldErrors.email ? <p className="mt-1 text-xs text-red-600">{supportForm.fieldErrors.email}</p> : null}
                  </label>
                  <label className="block text-sm font-medium text-neutral-800">
                    Message
                    <textarea
                      rows={4}
                      value={supportForm.values.message}
                      onChange={(e) => setField("support", "message", e.target.value)}
                      className="mt-1 w-full resize-y rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 outline-none transition focus:border-neutral-500"
                      placeholder="Tell us how we can help..."
                    />
                    {supportForm.fieldErrors.message ? <p className="mt-1 text-xs text-red-600">{supportForm.fieldErrors.message}</p> : null}
                  </label>
                  <input
                    type="text"
                    value={supportForm.values.website}
                    onChange={(e) => setField("support", "website", e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                    className="sr-only"
                    aria-hidden="true"
                  />
                  <div className="mt-2 flex items-center justify-between">
                    <button
                      type="submit"
                      disabled={supportForm.submitting}
                      className="inline-flex min-w-28 justify-center rounded-lg px-5 py-2 text-sm font-semibold text-white transition hover:opacity-80"
                      style={{ backgroundColor: COLORS.brandBlue }}
                    >
                      {supportForm.submitting ? "Sending..." : "Send"}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowSupportForm(false);
                        setSupportForm(INITIAL_FORM_STATE);
                      }}
                      disabled={supportForm.submitting}
                      className="rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition hover:bg-neutral-100"
                    >
                      Cancel
                    </button>
                  </div>
                  {supportForm.error ? <p className="mt-2 text-sm text-red-600">{supportForm.error}</p> : null}
                  {supportForm.success ? <p className="mt-2 text-sm text-emerald-700">{supportForm.success}</p> : null}
                </form>
              ) : null}
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
