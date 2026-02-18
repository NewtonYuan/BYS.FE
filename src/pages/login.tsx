import Image from "next/image";
import Header from "@/components/Header";
import icon from "@/app/icon.png";
import { UI } from "@/lib/theme";

export default function LoginPage() {
  return (
    <main className={UI.page}>
      <Header />
      <section className="mx-auto flex min-h-[calc(100vh-61px)] w-full max-w-3xl items-center justify-center px-6 py-12">
        <div className={`${UI.card} w-full max-w-xl p-10 text-center`}>
          <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-2xl border border-neutral-200 bg-neutral-50">
            <Image src={icon} alt="Under development icon" width={36} height={36} className="h-9 w-9 rounded-md" priority />
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-neutral-900">Accounts are coming soon 👋</h1>
          <p className="mt-3 text-sm text-neutral-600">You can use the lease analyzer without an account.
          <br/>Saving reports, reminders, and auto-sign are on the way.</p>
        </div>
      </section>
    </main>
  );
}
