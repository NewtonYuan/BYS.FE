export type LeaseReport = {
  leaseSummary: {
    address?: string | null;
    rentAmount?: number | null;
    rentFrequency?: "weekly" | "fortnightly" | "monthly" | null;
    bondAmount?: number | null;
    tenancyType: "fixed_term" | "periodic" | "unknown";
    startDate?: string | null;
    endDate?: string | null;
    noticePeriod?: string | null;
  };
  keyPoints: Array<{
    title: string;
    whyItMatters: string;
    confidence: number; // 0..1
  }>;
  keyDates: Array<{
    label: string;
    date: string | null;
    notes?: string;
  }>;
  disclaimer: string;
};
