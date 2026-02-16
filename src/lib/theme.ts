export const COLORS = {
  white: "#FFFFFF",
  black: "#000000",
  brandBlue: "#87CEFA",
  brandGreen: "#059669",
  brandGreenHover: "#047857",
  warningYellow: "#FACC15",
  dangerRed: "#DC2626",
} as const;

export const UI = {
  page: "min-h-screen bg-neutral-50 text-neutral-900",
  card: "rounded-2xl border border-neutral-200 bg-white",
  cardMuted: "rounded-2xl border border-dashed border-neutral-300 bg-neutral-50",
  primaryButton:
    "cursor-pointer rounded-xl bg-emerald-600 px-6 py-2 text-base font-semibold text-white transition hover:bg-emerald-700 hover:shadow-sm disabled:cursor-not-allowed disabled:bg-neutral-300 disabled:text-neutral-500",
  secondaryButton:
    "cursor-pointer rounded-xl border border-neutral-300 bg-white px-6 py-2 text-base font-medium text-neutral-700 transition hover:border-neutral-400 hover:bg-neutral-100 hover:shadow-sm disabled:cursor-not-allowed disabled:opacity-60",
} as const;
