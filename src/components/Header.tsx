import Link from "next/link";
import Image from "next/image";
import icon from "@/app/icon.png";

export default function Header() {
  return (
    <nav className="sticky top-0 z-20 border-b border-neutral-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-3">
        <div className="flex items-center gap-6">
          <Link href="/" className="inline-flex items-center gap-2">
            <Image
              src={icon}
              alt="Before You Sign logo"
              width={32}
              height={32}
              className="h-8 w-8 rounded-md object-cover"
              priority
            />
            <span className="text-lg font-semibold text-neutral-800">Before You Sign</span>
          </Link>

          <div className="ml-16 flex items-center gap-16 text- font-semibold text-neutral-400">
            <Link href="/about" className="transition hover:text-neutral-900">
              About Us
            </Link>
            <Link href="/contact" className="transition hover:text-neutral-900">
              Contact
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="rounded-lg bg-neutral-900 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-neutral-700"
          >
            Contact Sales
          </Link>
          <Link
            href="/login"
            className="rounded-lg border border-neutral-300 bg-white px-3 py-1.5 text-sm font-medium text-neutral-700 transition hover:bg-neutral-100"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}
