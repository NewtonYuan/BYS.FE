export type LeaseReport = {
  leaseSummary: {
    address: string | null;
    tenancyType: "fixed_term" | "periodic" | "unknown";
    startDate: string | null;
    endDate: string | null;
    rentAmount: number | null;
    rentFrequency: "weekly" | "fortnightly" | "monthly" | null;
    bondAmount: number | null;
    rentPaymentMethod: "bank_transfer" | "cash" | "other" | "unknown";
    rentBankAccountNumber: string | null;
    rentBankAccountName: string | null;
  };
  insuranceDisclosure: {
    propertyInsured: boolean | null;
    policyAvailableOnRequest: boolean | null;
    excesses: Array<{
      item: string;
      amount: number | null;
      notes: string | null;
    }>;
  };
  healthyHomes: {
    statementProvided: boolean | null;
    compliant: boolean | null;
    heating: string | null;
    insulation: string | null;
    ventilation: string | null;
    moistureDrainage: string | null;
    draughtStopping: string | null;
  };
  unitTitle: {
    isUnitTitle: boolean | null;
    bodyCorporateRulesAttached: boolean | null;
  };
  sublettingAssignment: {
    sublettingRequiresConsent: boolean | null;
    assignmentRequiresConsent: boolean | null;
    notes: string | null;
  };
  specialTerms: Array<{
    category: "pets" | "max_occupants" | "right_of_renewal" | "recovery_costs" | "other";
    title: string;
    detail: string;
    mayBeRestrictive: boolean | null;
  }>;
  noticeRules: {
    tenantPeriodicNoticeDays: number | null;
    fixedTermNonRenewalWindowDaysMin: number | null;
    fixedTermNonRenewalWindowDaysMax: number | null;
    landlordNoticeReasons: {
      saleOfProperty: boolean | null;
      ownerOccupation: boolean | null;
      extensiveAlterations: boolean | null;
      changeOfUse: boolean | null;
      demolition: boolean | null;
      repeatedAntiSocialBehaviour: boolean | null;
      familyViolence: boolean | null;
      employmentTenancyEnding: boolean | null;
      otherReasonText: string | null;
    };
  };
  checklist: {
    inspectionReportProvided: boolean | null;
    keysSupplied: string[];
    chattels: string[];
    waterMeterReading: string | null;
    receiptAmounts: Array<{
      label: string;
      amount: number | null;
    }>;
  };
  keyPoints: Array<{
    title: string;
    whyItMatters: string;
    confidence: number;
  }>;
  keyDates: Array<{
    label: string;
    date: string | null;
    notes: string | null;
  }>;
  disclaimer: string;
  riskFlags: {
    missingHealthyHomesStatement: boolean;
    missingInsuranceStatement: boolean;
    bondExceedsFourWeeks: boolean;
    noInspectionReport: boolean;
    hasSpecialTerms: boolean;
    sublettingRequiresConsent: boolean;
    unitTitleRulesMissing: boolean;
  };
};
