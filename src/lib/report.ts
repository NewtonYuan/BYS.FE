import type { LeaseReport } from "@/lib/types";

export const NOT_FOUND_TEXT = "Not found";

const TENANCY_TYPES = new Set(["fixed_term", "periodic", "unknown"]);
const RENT_FREQS = new Set(["weekly", "fortnightly", "monthly"]);
const PAYMENT_METHODS = new Set(["bank_transfer", "cash", "other", "unknown"]);
const SPECIAL_TERM_CATEGORIES = new Set(["pets", "max_occupants", "right_of_renewal", "recovery_costs", "other"]);

function asObject(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as Record<string, unknown>) : {};
}

function asString(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function asNumber(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function asBoolean(value: unknown): boolean | null {
  return typeof value === "boolean" ? value : null;
}

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => asString(item))
    .filter((item): item is string => Boolean(item));
}

function asEnum<T extends string | null>(value: unknown, allowed: Set<string>, fallback: T): T {
  return typeof value === "string" && allowed.has(value) ? (value as T) : fallback;
}

export function normalizeLeaseReport(raw: unknown): LeaseReport {
  const root = asObject(raw);
  const leaseSummary = asObject(root.leaseSummary);
  const insuranceDisclosure = asObject(root.insuranceDisclosure);
  const healthyHomes = asObject(root.healthyHomes);
  const unitTitle = asObject(root.unitTitle);
  const sublettingAssignment = asObject(root.sublettingAssignment);
  const noticeRules = asObject(root.noticeRules);
  const landlordNoticeReasons = asObject(noticeRules.landlordNoticeReasons);
  const checklist = asObject(root.checklist);
  const riskFlags = asObject(root.riskFlags);

  return {
    leaseSummary: {
      address: asString(leaseSummary.address),
      tenancyType: asEnum(leaseSummary.tenancyType, TENANCY_TYPES, "unknown"),
      startDate: asString(leaseSummary.startDate),
      endDate: asString(leaseSummary.endDate),
      rentAmount: asNumber(leaseSummary.rentAmount),
      rentFrequency: asEnum(leaseSummary.rentFrequency, RENT_FREQS, null),
      bondAmount: asNumber(leaseSummary.bondAmount),
      rentPaymentMethod: asEnum(leaseSummary.rentPaymentMethod, PAYMENT_METHODS, "unknown"),
      rentBankAccountNumber: asString(leaseSummary.rentBankAccountNumber),
      rentBankAccountName: asString(leaseSummary.rentBankAccountName),
    },
    insuranceDisclosure: {
      propertyInsured: asBoolean(insuranceDisclosure.propertyInsured),
      policyAvailableOnRequest: asBoolean(insuranceDisclosure.policyAvailableOnRequest),
      excesses: Array.isArray(insuranceDisclosure.excesses)
        ? insuranceDisclosure.excesses.map((entry) => {
            const item = asObject(entry);
            return {
              item: asString(item.item) ?? "Unnamed item",
              amount: asNumber(item.amount),
              notes: asString(item.notes),
            };
          })
        : [],
    },
    healthyHomes: {
      statementProvided: asBoolean(healthyHomes.statementProvided),
      compliant: asBoolean(healthyHomes.compliant),
      heating: asString(healthyHomes.heating),
      insulation: asString(healthyHomes.insulation),
      ventilation: asString(healthyHomes.ventilation),
      moistureDrainage: asString(healthyHomes.moistureDrainage),
      draughtStopping: asString(healthyHomes.draughtStopping),
    },
    unitTitle: {
      isUnitTitle: asBoolean(unitTitle.isUnitTitle),
      bodyCorporateRulesAttached: asBoolean(unitTitle.bodyCorporateRulesAttached),
    },
    sublettingAssignment: {
      sublettingRequiresConsent: asBoolean(sublettingAssignment.sublettingRequiresConsent),
      assignmentRequiresConsent: asBoolean(sublettingAssignment.assignmentRequiresConsent),
      notes: asString(sublettingAssignment.notes),
    },
    specialTerms: Array.isArray(root.specialTerms)
      ? root.specialTerms.map((term) => {
          const entry = asObject(term);
          return {
            category: asEnum(entry.category, SPECIAL_TERM_CATEGORIES, "other"),
            title: asString(entry.title) ?? "Special term",
            detail: asString(entry.detail) ?? "",
            mayBeRestrictive: asBoolean(entry.mayBeRestrictive),
          };
        })
      : [],
    noticeRules: {
      tenantPeriodicNoticeDays: asNumber(noticeRules.tenantPeriodicNoticeDays),
      fixedTermNonRenewalWindowDaysMin: asNumber(noticeRules.fixedTermNonRenewalWindowDaysMin),
      fixedTermNonRenewalWindowDaysMax: asNumber(noticeRules.fixedTermNonRenewalWindowDaysMax),
      landlordNoticeReasons: {
        saleOfProperty: asBoolean(landlordNoticeReasons.saleOfProperty),
        ownerOccupation: asBoolean(landlordNoticeReasons.ownerOccupation),
        extensiveAlterations: asBoolean(landlordNoticeReasons.extensiveAlterations),
        changeOfUse: asBoolean(landlordNoticeReasons.changeOfUse),
        demolition: asBoolean(landlordNoticeReasons.demolition),
        repeatedAntiSocialBehaviour: asBoolean(landlordNoticeReasons.repeatedAntiSocialBehaviour),
        familyViolence: asBoolean(landlordNoticeReasons.familyViolence),
        employmentTenancyEnding: asBoolean(landlordNoticeReasons.employmentTenancyEnding),
        otherReasonText: asString(landlordNoticeReasons.otherReasonText),
      },
    },
    checklist: {
      inspectionReportProvided: asBoolean(checklist.inspectionReportProvided),
      keysSupplied: asStringArray(checklist.keysSupplied),
      chattels: asStringArray(checklist.chattels),
      waterMeterReading: asString(checklist.waterMeterReading),
      receiptAmounts: Array.isArray(checklist.receiptAmounts)
        ? checklist.receiptAmounts.map((receipt) => {
            const entry = asObject(receipt);
            return {
              label: asString(entry.label) ?? "Receipt item",
              amount: asNumber(entry.amount),
            };
          })
        : [],
    },
    keyPoints: Array.isArray(root.keyPoints)
      ? root.keyPoints.map((point) => {
          const entry = asObject(point);
          return {
            title: asString(entry.title) ?? "Key point",
            whyItMatters: asString(entry.whyItMatters) ?? "",
            confidence: asNumber(entry.confidence) ?? 0,
          };
        })
      : [],
    keyDates: Array.isArray(root.keyDates)
      ? root.keyDates.map((dateItem) => {
          const entry = asObject(dateItem);
          return {
            label: asString(entry.label) ?? "Date",
            date: asString(entry.date),
            notes: asString(entry.notes),
          };
        })
      : [],
    disclaimer: asString(root.disclaimer) ?? "Summary generated from the agreement text.",
    riskFlags: {
      missingHealthyHomesStatement: Boolean(riskFlags.missingHealthyHomesStatement),
      missingInsuranceStatement: Boolean(riskFlags.missingInsuranceStatement),
      bondExceedsFourWeeks: Boolean(riskFlags.bondExceedsFourWeeks),
      noInspectionReport: Boolean(riskFlags.noInspectionReport),
      hasSpecialTerms: Boolean(riskFlags.hasSpecialTerms),
      sublettingRequiresConsent: Boolean(riskFlags.sublettingRequiresConsent),
      unitTitleRulesMissing: Boolean(riskFlags.unitTitleRulesMissing),
    },
  };
}

export function valueOrNotFound(value: string | number | null | undefined): string {
  if (value == null || value === "") return NOT_FOUND_TEXT;
  return String(value);
}

export function boolToText(value: boolean | null): string {
  if (value == null) return NOT_FOUND_TEXT;
  return value ? "Yes" : "No";
}

export function formatMoney(amount: number | null, freq: LeaseReport["leaseSummary"]["rentFrequency"]): string {
  if (amount == null || Number.isNaN(amount)) return NOT_FOUND_TEXT;
  const money = new Intl.NumberFormat("en-NZ", { style: "currency", currency: "NZD" }).format(amount);
  if (!freq) return money;
  const suffix = freq === "weekly" ? "/week" : freq === "fortnightly" ? "/fortnight" : "/month";
  return `${money} ${suffix}`;
}

export function formatTenancyType(value: LeaseReport["leaseSummary"]["tenancyType"]): string {
  if (value === "fixed_term") return "Fixed term";
  if (value === "periodic") return "Periodic";
  return "Unknown";
}

export function formatPaymentMethod(value: LeaseReport["leaseSummary"]["rentPaymentMethod"]): string {
  if (value === "bank_transfer") return "Bank transfer";
  if (value === "cash") return "Cash";
  if (value === "other") return "Other";
  return "Unknown";
}

export function formatSpecialTermCategory(value: LeaseReport["specialTerms"][number]["category"]): string {
  if (value === "max_occupants") return "Max occupants";
  if (value === "right_of_renewal") return "Right of renewal";
  if (value === "recovery_costs") return "Recovery costs";
  if (value === "pets") return "Pets";
  return "Other";
}

export function joinOrNotFound(values: string[]): string {
  return values.length ? values.join(", ") : NOT_FOUND_TEXT;
}
