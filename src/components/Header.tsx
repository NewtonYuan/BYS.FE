import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import icon from "@/app/icon.png";
import { COLORS } from "@/lib/theme";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  function closeMobileMenu() {
    setMobileOpen(false);
  }

  return (
    <nav className={`sticky top-0 z-20 border-b border-neutral-200 bg-white/90 backdrop-blur`}>
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-8 py-4 md:px-12">
        <div className="flex items-center gap-6">
          <Link href="/" className="inline-flex items-center gap-2" onClick={closeMobileMenu}>
            <Image
              src={icon}
              alt="Before You Sign logo"
              width={32}
              height={32}
              className="h-8 w-8 rounded-md object-cover"
              priority
            />
            <span className="text-xl font-semibold text-neutral-800">Before You Sign</span>
          </Link>

          <div className="ml-16 hidden items-center gap-16 text-base font-semibold text-neutral-400 md:flex">
            <Link href="/tool" className="transition hover:text-neutral-900">
              Tool
            </Link>
            <Link href="/about" className="transition hover:text-neutral-900">
              About
            </Link>
            <Link href="/contact" className="transition hover:text-neutral-900">
              Contact
            </Link>
          </div>
        </div>

        <div className="hidden items-center gap-3 md:flex">
            <Link
              href="/contact"
              className="rounded-lg px-3 py-1.5 text-base font-semibold text-white transition hover:opacity-90"
              style={{ backgroundColor: COLORS.brandBlue }}
            >
              Contact Sales
            </Link>
            <Link
              href="/login"
              className="rounded-lg border border-neutral-300 bg-white px-3 py-1.5 text-base font-medium text-neutral-700 transition hover:bg-neutral-100"
            >
              Login
            </Link>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-300 text-neutral-700 transition hover:bg-neutral-100 md:hidden"
        >
          <span className="sr-only">Open main menu</span>
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {mobileOpen ? (
        <div className="border-t border-neutral-200 px-8 py-4 md:hidden">
          <div className="flex flex-col gap-3 text-sm font-semibold text-neutral-700">
            <Link href="/tool" className="transition hover:text-neutral-900" onClick={closeMobileMenu}>
              Tool
            </Link>
            <Link href="/about" className="transition hover:text-neutral-900" onClick={closeMobileMenu}>
              About
            </Link>
            <Link href="/contact" className="transition hover:text-neutral-900" onClick={closeMobileMenu}>
              Contact
            </Link>
          </div>

          <div className="mt-4 flex flex-col gap-2">
            <Link
              href="/contact"
              onClick={closeMobileMenu}
              className="rounded-lg px-3 py-2 text-center text-sm font-semibold text-white transition hover:opacity-90"
              style={{ backgroundColor: COLORS.brandBlue }}
            >
              Contact Sales
            </Link>
            <Link
              href="/login"
              onClick={closeMobileMenu}
              className="rounded-lg border border-neutral-300 bg-white px-3 py-2 text-center text-sm font-medium text-neutral-700 transition hover:bg-neutral-100"
            >
              Login
            </Link>
          </div>
        </div>
      ) : null}
    </nav>
  );
}
