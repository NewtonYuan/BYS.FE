import { COLORS } from "@/lib/theme";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-800 text-neutral-200" style={{ backgroundColor: COLORS.black }}>
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 text-sm">
        <span>(c) {new Date().getFullYear()} Before You Sign</span>
        <span className="text-neutral-400">Educational information only</span>
      </div>
    </footer>
  );
}
