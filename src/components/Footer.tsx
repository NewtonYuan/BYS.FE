import { COLORS } from "@/lib/theme";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-800 text-neutral-200" style={{ backgroundColor: COLORS.brandBlue }}>
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-center gap-1 px-8 py-5 text-center text-sm md:px-12">
        <span>(c) {new Date().getFullYear()} Before You Sign</span>
        <span className="text-neutral-400">Educational information only</span>
      </div>
    </footer>
  );
}
