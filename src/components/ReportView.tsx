import type { LeaseReport } from "@/lib/types";
import type { ReactNode } from "react";
import {
  NOT_FOUND_TEXT,
  formatMoney,
  formatPaymentMethod,
  formatSpecialTermCategory,
  formatTenancyType,
  joinOrNotFound,
  valueOrNotFound,
} from "@/lib/report";

type RiskKey = keyof LeaseReport["riskFlags"];
type SectionTone = "success" | "warning" | "danger" | "neutral";
type BoxTone = "normal" | "warning" | "danger";
const SCORE_MAX = 100;
const SCORE_DEBUG_OVERRIDE: number | null = null;

const RISK_FLAGS: Array<{ key: RiskKey; label: string; helper: string }> = [
  {
    key: "missingHealthyHomesStatement",
    label: "Healthy Homes statement missing",
    helper: "Worth checking carefully before signing.",
  },
  {
    key: "missingInsuranceStatement",
    label: "Insurance details missing",
    helper: "Worth checking carefully before signing.",
  },
  {
    key: "bondExceedsFourWeeks",
    label: "Bond may be high",
    helper: "Check if the bond amount looks right for this tenancy.",
  },
  {
    key: "noInspectionReport",
    label: "Inspection report not listed",
    helper: "Worth checking carefully before move-in.",
  },
  {
    key: "hasSpecialTerms",
    label: "Special terms present",
    helper: "Some terms may be restrictive.",
  },
  {
    key: "sublettingRequiresConsent",
    label: "Subletting needs consent",
    helper: "Plan ahead if flatmate arrangements may change.",
  },
  {
    key: "unitTitleRulesMissing",
    label: "Unit title rules not attached",
    helper: "Worth checking carefully with the landlord or agent.",
  },
];

export default function ReportView({ report }: { report: LeaseReport }) {
  const s = report.leaseSummary;
  const computedScore = calculateAgreementScore(report);
  const agreementScore =
    SCORE_DEBUG_OVERRIDE == null ? computedScore : Math.max(0, Math.min(SCORE_MAX, SCORE_DEBUG_OVERRIDE));
  const scoreRatio = Math.max(0, Math.min(1, agreementScore / SCORE_MAX));
  const scoreColorClass = scoreRatio >= 0.8 ? "text-emerald-700" : scoreRatio >= 0.5 ? "text-yellow-700" : "text-red-700";
  const scoreStrokeColor = agreementScore >= 80 ? "#10b981" : agreementScore >= 50 ? "#facc15" : "#ef4444";
  const gaugeRadius = 50;
  const scorePctOnArc = scoreRatio * 100;
  const theta = Math.PI - (Math.PI * scorePctOnArc) / 100;
  const cx = 60;
  const cy = 60;
  const indicatorInner = gaugeRadius - 8;
  const indicatorOuter = gaugeRadius + 8;
  const ix1 = cx + indicatorInner * Math.cos(theta);
  const iy1 = cy - indicatorInner * Math.sin(theta);
  const ix2 = cx + indicatorOuter * Math.cos(theta);
  const iy2 = cy - indicatorOuter * Math.sin(theta);

  const hasRiskProblems = Object.values(report.riskFlags).some(Boolean);
  const snapshotNeedsCheck = [s.address, s.startDate, s.endDate, s.rentAmount, s.bondAmount].some((v) => v == null);
  const insuranceProblem = report.riskFlags.missingInsuranceStatement;
  const insuranceNeedsCheck =
    !insuranceProblem &&
    (report.insuranceDisclosure.propertyInsured == null ||
      report.insuranceDisclosure.policyAvailableOnRequest == null ||
      report.insuranceDisclosure.excesses.some((e) => e.amount == null || e.notes == null));
  const healthyHomesProblem = report.riskFlags.missingHealthyHomesStatement || report.healthyHomes.compliant === false;
  const healthyHomesNeedsCheck =
    !healthyHomesProblem &&
    [
      report.healthyHomes.statementProvided,
      report.healthyHomes.heating,
      report.healthyHomes.insulation,
      report.healthyHomes.ventilation,
      report.healthyHomes.moistureDrainage,
      report.healthyHomes.draughtStopping,
    ].some((v) => v == null);
  const unitTitleProblem = report.riskFlags.unitTitleRulesMissing;
  const unitTitleNeedsCheck =
    !unitTitleProblem && report.unitTitle.isUnitTitle === true && report.unitTitle.bodyCorporateRulesAttached !== true;
  const rentPaymentNeedsCheck = s.rentPaymentMethod === "unknown";
  const sublettingNeedsCheck =
    report.sublettingAssignment.sublettingRequiresConsent === true ||
    report.sublettingAssignment.assignmentRequiresConsent === true ||
    report.sublettingAssignment.notes != null;
  const specialTermsNeedsCheck = report.specialTerms.length > 0;
  const noticeRulesNeedsCheck =
    report.noticeRules.tenantPeriodicNoticeDays == null ||
    report.noticeRules.fixedTermNonRenewalWindowDaysMin == null ||
    report.noticeRules.fixedTermNonRenewalWindowDaysMax == null ||
    Object.values(report.noticeRules.landlordNoticeReasons).some((v) => v === true);
  const checklistProblem = report.riskFlags.noInspectionReport;
  const checklistNeedsCheck =
    !checklistProblem &&
    (report.checklist.inspectionReportProvided == null ||
      report.checklist.keysSupplied.length === 0 ||
      report.checklist.chattels.length === 0 ||
      report.checklist.waterMeterReading == null);
  const keyPointsNeedsCheck = report.keyPoints.length > 0;
  const keyDatesNeedsCheck = report.keyDates.length > 0;

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-neutral-200 bg-white p-5">
        <h3 className="text-base font-semibold text-neutral-900">Agreement Signal</h3>
        <p className="mt-1 text-xs text-neutral-600">
          Quick visual guide based on extracted details. Use this to decide what is worth checking carefully.
        </p>

        <div className="mt-4 flex justify-center">
          <div className="relative h-28 w-52 overflow-hidden">
            <svg viewBox="0 0 120 70" className="h-full w-full">
              <path
                d="M10 60 A50 50 0 0 1 110 60"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="7"
                strokeLinecap="round"
                pathLength={100}
              />
              <path
                d="M10 60 A50 50 0 0 1 110 60"
                fill="none"
                stroke={scoreStrokeColor}
                strokeWidth="7"
                strokeLinecap={agreementScore >= SCORE_MAX ? "round" : "butt"}
                pathLength={SCORE_MAX}
                strokeDasharray={`${agreementScore} ${SCORE_MAX}`}
              />
              {agreementScore > 0 ? <circle cx="10" cy="60" r="3.5" fill={scoreStrokeColor} /> : null}
              <line
                x1={ix1}
                y1={iy1}
                x2={ix2}
                y2={iy2}
                stroke="#111827"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-x-0 bottom-2 text-center">
              <div className="text-sm font-semibold text-neutral-700">Score</div>
              <div className={["text-5xl font-bold tracking-tight", scoreColorClass].join(" ")}>{agreementScore}</div>
            </div>
          </div>
        </div>
      </section>

      <Section title="Risk Flags" helper="Quick checks based on extracted details." tone={hasRiskProblems ? "danger" : "success"}>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {RISK_FLAGS.map((flag) => {
            const active = report.riskFlags[flag.key];
            return (
              <div
                key={flag.key}
                className={[
                  "rounded-xl border p-4",
                  active ? "border-2 border-red-500 bg-white" : "border-2 border-emerald-500 bg-white",
                ].join(" ")}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="text-sm font-semibold text-neutral-900">{flag.label}</div>
                  <YesNoBadge value={active} variant="risk" />
                </div>
                <p className="mt-2 text-xs text-neutral-600">{flag.helper}</p>
              </div>
            );
          })}
        </div>
      </Section>

      <Section title="Snapshot" helper="The core tenancy details found in the agreement." tone={snapshotNeedsCheck ? "warning" : "success"}>
        <FieldGrid>
          <Field label="Address" value={valueOrNotFound(s.address)} tone={s.address == null ? "warning" : "normal"} />
          <Field label="Tenancy type" value={formatTenancyType(s.tenancyType)} />
          <Field label="Start date" value={valueOrNotFound(s.startDate)} tone={s.startDate == null ? "warning" : "normal"} />
          <Field label="End date" value={valueOrNotFound(s.endDate)} tone={s.endDate == null ? "warning" : "normal"} />
          <Field label="Rent" value={formatMoney(s.rentAmount, s.rentFrequency)} tone={s.rentAmount == null ? "warning" : "normal"} />
          <Field label="Bond" value={formatMoney(s.bondAmount, null)} tone={s.bondAmount == null ? "warning" : "normal"} />
        </FieldGrid>
      </Section>

      <Section title="Insurance" helper="Insurance disclosure details listed in the agreement." tone={insuranceProblem ? "danger" : insuranceNeedsCheck ? "warning" : "success"}>
        <FieldGrid>
          <BoolField
            label="Property insured"
            value={report.insuranceDisclosure.propertyInsured}
            tone={report.riskFlags.missingInsuranceStatement ? "danger" : report.insuranceDisclosure.propertyInsured == null ? "warning" : "normal"}
          />
          <BoolField
            label="Policy available on request"
            value={report.insuranceDisclosure.policyAvailableOnRequest}
            tone={report.riskFlags.missingInsuranceStatement ? "danger" : report.insuranceDisclosure.policyAvailableOnRequest == null ? "warning" : "normal"}
          />
        </FieldGrid>

        <h4 className="mt-4 text-sm font-semibold text-neutral-800">Insurance excesses</h4>
        {report.insuranceDisclosure.excesses.length ? (
          <div className="mt-2 space-y-2">
            {report.insuranceDisclosure.excesses.map((excess, idx) => (
              <div
                key={`${excess.item}-${idx}`}
                className={[
                  "rounded-lg border p-3",
                  excess.amount == null || excess.notes == null ? "border-2 border-amber-500 bg-white" : "border-neutral-200 bg-white",
                ].join(" ")}
              >
                <div className="text-sm font-medium text-neutral-900">{excess.item}</div>
                <div className="mt-1 text-sm text-neutral-700">
                  Amount: {excess.amount == null ? NOT_FOUND_TEXT : formatMoney(excess.amount, null)}
                </div>
                <div className="mt-1 text-xs text-neutral-600">Notes: {valueOrNotFound(excess.notes)}</div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyLine />
        )}
      </Section>

      <Section title="Healthy Homes" helper="Statement and notes recorded in the agreement." tone={healthyHomesProblem ? "danger" : healthyHomesNeedsCheck ? "warning" : "success"}>
        <FieldGrid>
          <BoolField
            label="Statement provided"
            value={report.healthyHomes.statementProvided}
            tone={report.riskFlags.missingHealthyHomesStatement ? "danger" : report.healthyHomes.statementProvided == null ? "warning" : "normal"}
          />
          <BoolField
            label="Compliant"
            value={report.healthyHomes.compliant}
            tone={report.healthyHomes.compliant === false ? "danger" : report.healthyHomes.compliant == null ? "warning" : "normal"}
          />
          <Field label="Heating" value={valueOrNotFound(report.healthyHomes.heating)} tone={report.healthyHomes.heating == null ? "warning" : "normal"} />
          <Field label="Insulation" value={valueOrNotFound(report.healthyHomes.insulation)} tone={report.healthyHomes.insulation == null ? "warning" : "normal"} />
          <Field label="Ventilation" value={valueOrNotFound(report.healthyHomes.ventilation)} tone={report.healthyHomes.ventilation == null ? "warning" : "normal"} />
          <Field label="Moisture drainage" value={valueOrNotFound(report.healthyHomes.moistureDrainage)} tone={report.healthyHomes.moistureDrainage == null ? "warning" : "normal"} />
          <Field label="Draught stopping" value={valueOrNotFound(report.healthyHomes.draughtStopping)} tone={report.healthyHomes.draughtStopping == null ? "warning" : "normal"} />
        </FieldGrid>
      </Section>

      <Section title="Unit Title / Body Corporate" helper="Checks for unit title properties." tone={unitTitleProblem ? "danger" : unitTitleNeedsCheck ? "warning" : "success"}>
        <FieldGrid>
          <BoolField label="Unit title property" value={report.unitTitle.isUnitTitle} tone={report.unitTitle.isUnitTitle == null ? "warning" : "normal"} />
          <BoolField
            label="Body corporate rules attached"
            value={report.unitTitle.bodyCorporateRulesAttached}
            tone={report.riskFlags.unitTitleRulesMissing ? "danger" : report.unitTitle.bodyCorporateRulesAttached == null ? "warning" : "normal"}
          />
        </FieldGrid>
      </Section>

      <Section title="Rent Payment Details" helper="How rent is expected to be paid." tone={rentPaymentNeedsCheck ? "warning" : "success"}>
        <FieldGrid>
          <Field label="Payment method" value={formatPaymentMethod(s.rentPaymentMethod)} tone={s.rentPaymentMethod === "unknown" ? "warning" : "normal"} />
          <Field label="Bank account number" value="Confidential (hidden)" />
          <Field label="Bank account name" value="Confidential (hidden)" />
        </FieldGrid>
      </Section>

      <Section title="Subletting / Assignment" helper="Consent details for changing occupants." tone={sublettingNeedsCheck ? "warning" : "success"}>
        <FieldGrid>
          <BoolField
            label="Subletting requires consent"
            value={report.sublettingAssignment.sublettingRequiresConsent}
            variant="warning"
            tone={report.sublettingAssignment.sublettingRequiresConsent ? "warning" : "normal"}
          />
          <BoolField
            label="Assignment requires consent"
            value={report.sublettingAssignment.assignmentRequiresConsent}
            variant="warning"
            tone={report.sublettingAssignment.assignmentRequiresConsent ? "warning" : "normal"}
          />
          <Field label="Notes" value={valueOrNotFound(report.sublettingAssignment.notes)} tone={report.sublettingAssignment.notes ? "warning" : "normal"} />
        </FieldGrid>
      </Section>

      <Section title="Special Terms" helper="These terms may be restrictive, so read carefully." tone={specialTermsNeedsCheck ? "warning" : "success"}>
        {report.specialTerms.length ? (
          <div className="mt-3 space-y-3">
            {report.specialTerms.map((term, idx) => (
              <div
                key={`${term.title}-${idx}`}
                className={[
                  "rounded-xl border p-4",
                  term.mayBeRestrictive === true ? "border-2 border-amber-500 bg-white" : "border-neutral-200 bg-white",
                ].join(" ")}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="text-sm font-semibold text-neutral-900">{term.title}</div>
                  <span className="rounded-full bg-neutral-100 px-2 py-1 text-xs text-neutral-700">
                    {formatSpecialTermCategory(term.category)}
                  </span>
                </div>
                <p className="mt-2 text-sm text-neutral-700">{valueOrNotFound(term.detail)}</p>
                <div className="mt-2">
                  <YesNoBadge label="May be restrictive" value={term.mayBeRestrictive} variant="warning" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyLine />
        )}
      </Section>

      <Section title="Notice Rules" helper="Notice windows and listed landlord reasons." tone={noticeRulesNeedsCheck ? "warning" : "success"}>
        <FieldGrid>
          <Field
            label="Tenant periodic notice (days)"
            value={valueOrNotFound(report.noticeRules.tenantPeriodicNoticeDays)}
            tone={report.noticeRules.tenantPeriodicNoticeDays == null ? "warning" : "normal"}
          />
          <Field
            label="Fixed-term non-renewal min (days)"
            value={valueOrNotFound(report.noticeRules.fixedTermNonRenewalWindowDaysMin)}
            tone={report.noticeRules.fixedTermNonRenewalWindowDaysMin == null ? "warning" : "normal"}
          />
          <Field
            label="Fixed-term non-renewal max (days)"
            value={valueOrNotFound(report.noticeRules.fixedTermNonRenewalWindowDaysMax)}
            tone={report.noticeRules.fixedTermNonRenewalWindowDaysMax == null ? "warning" : "normal"}
          />
        </FieldGrid>

        <h4 className="mt-4 text-sm font-semibold text-neutral-800">Listed landlord notice reasons</h4>
        <div className="mt-2 grid gap-2 md:grid-cols-2">
          <Reason label="Sale of property" value={report.noticeRules.landlordNoticeReasons.saleOfProperty} tone={report.noticeRules.landlordNoticeReasons.saleOfProperty ? "warning" : "normal"} />
          <Reason label="Owner occupation" value={report.noticeRules.landlordNoticeReasons.ownerOccupation} tone={report.noticeRules.landlordNoticeReasons.ownerOccupation ? "warning" : "normal"} />
          <Reason
            label="Extensive alterations"
            value={report.noticeRules.landlordNoticeReasons.extensiveAlterations}
            tone={report.noticeRules.landlordNoticeReasons.extensiveAlterations ? "warning" : "normal"}
          />
          <Reason label="Change of use" value={report.noticeRules.landlordNoticeReasons.changeOfUse} tone={report.noticeRules.landlordNoticeReasons.changeOfUse ? "warning" : "normal"} />
          <Reason label="Demolition" value={report.noticeRules.landlordNoticeReasons.demolition} tone={report.noticeRules.landlordNoticeReasons.demolition ? "warning" : "normal"} />
          <Reason
            label="Repeated anti-social behaviour"
            value={report.noticeRules.landlordNoticeReasons.repeatedAntiSocialBehaviour}
            tone={report.noticeRules.landlordNoticeReasons.repeatedAntiSocialBehaviour ? "warning" : "normal"}
          />
          <Reason label="Family violence" value={report.noticeRules.landlordNoticeReasons.familyViolence} tone={report.noticeRules.landlordNoticeReasons.familyViolence ? "warning" : "normal"} />
          <Reason
            label="Employment tenancy ending"
            value={report.noticeRules.landlordNoticeReasons.employmentTenancyEnding}
            tone={report.noticeRules.landlordNoticeReasons.employmentTenancyEnding ? "warning" : "normal"}
          />
        </div>

        <div className="mt-3 text-sm text-neutral-700">
          Other reason text: {valueOrNotFound(report.noticeRules.landlordNoticeReasons.otherReasonText)}
        </div>
      </Section>

      <Section title="Move-in Checklist" helper="Useful setup items and receipt details." tone={checklistProblem ? "danger" : checklistNeedsCheck ? "warning" : "success"}>
        <FieldGrid>
          <BoolField
            label="Inspection report provided"
            value={report.checklist.inspectionReportProvided}
            tone={report.riskFlags.noInspectionReport ? "danger" : report.checklist.inspectionReportProvided == null ? "warning" : "normal"}
          />
          <Field label="Keys supplied" value={joinOrNotFound(report.checklist.keysSupplied)} tone={report.checklist.keysSupplied.length === 0 ? "warning" : "normal"} />
          <Field label="Chattels" value={joinOrNotFound(report.checklist.chattels)} tone={report.checklist.chattels.length === 0 ? "warning" : "normal"} />
          <Field label="Water meter reading" value={valueOrNotFound(report.checklist.waterMeterReading)} tone={report.checklist.waterMeterReading == null ? "warning" : "normal"} />
        </FieldGrid>

        <h4 className="mt-4 text-sm font-semibold text-neutral-800">Receipt amounts</h4>
        {report.checklist.receiptAmounts.length ? (
          <div className="mt-2 divide-y divide-neutral-200 rounded-xl border border-neutral-200 bg-white">
            {report.checklist.receiptAmounts.map((receipt, idx) => (
              <div
                key={`${receipt.label}-${idx}`}
                className={[
                  "flex items-center justify-between gap-3 p-3 text-sm",
                  receipt.amount == null ? "border-l-4 border-amber-400" : "",
                ].join(" ")}
              >
                <span className="font-medium text-neutral-800">{receipt.label}</span>
                <span className="text-neutral-700">{formatMoney(receipt.amount, null)}</span>
              </div>
            ))}
          </div>
        ) : (
          <EmptyLine />
        )}
      </Section>

      <Section title="Key Points" helper="Points worth checking carefully in plain language." tone={keyPointsNeedsCheck ? "warning" : "success"}>
        {report.keyPoints.length ? (
          <div className="mt-3 space-y-3">
            {report.keyPoints.map((point, idx) => (
              <div key={`${point.title}-${idx}`} className="rounded-xl border-2 border-amber-500 bg-white p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="font-semibold text-neutral-900">{point.title}</div>
                  <div className="text-xs text-neutral-500">Confidence {(point.confidence * 100).toFixed(0)}%</div>
                </div>
                <p className="mt-2 text-sm text-neutral-700">{valueOrNotFound(point.whyItMatters)}</p>
              </div>
            ))}
          </div>
        ) : (
          <EmptyLine />
        )}
      </Section>

      <Section title="Key Dates" helper="Dates pulled out of the agreement text." tone={keyDatesNeedsCheck ? "warning" : "success"}>
        {report.keyDates.length ? (
          <div className="mt-2 divide-y divide-neutral-200 rounded-xl border border-neutral-200 bg-white">
            {report.keyDates.map((item, idx) => (
              <div key={`${item.label}-${idx}`} className="flex items-start justify-between gap-4 p-4">
                <div>
                  <div className="font-medium text-neutral-900">{item.label}</div>
                  <div className="mt-1 text-xs text-neutral-600">{valueOrNotFound(item.notes)}</div>
                </div>
                <div className="text-sm text-neutral-700">{valueOrNotFound(item.date)}</div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyLine />
        )}
      </Section>

      <div className="pt-1 text-xs text-neutral-600">
        <span className="font-semibold text-neutral-700">Disclaimer:</span> {valueOrNotFound(report.disclaimer)}
      </div>
    </div>
  );
}

function Section({
  title,
  helper,
  tone = "neutral",
  children,
}: {
  title: string;
  helper?: string;
  tone?: SectionTone;
  children: ReactNode;
}) {
  const toneClass =
    tone === "danger"
      ? "border-red-200 bg-red-50"
      : tone === "warning"
        ? "border-yellow-200 bg-yellow-50"
        : tone === "success"
          ? "border-emerald-200 bg-emerald-50"
          : "border-neutral-200 bg-neutral-50";

  return (
    <details className={["group rounded-2xl border p-5", toneClass].join(" ")}>
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 select-none">
        <div>
          <h3 className="text-base font-semibold text-neutral-900">{title}</h3>
          {helper ? <p className="mt-1 text-xs text-neutral-600">{helper}</p> : null}
        </div>
        <svg
          viewBox="0 0 20 20"
          className="h-6 w-6 text-neutral-600 transition-transform group-open:rotate-90"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m7 4 6 6-6 6" />
        </svg>
      </summary>
      <div className="mt-4">{children}</div>
    </details>
  );
}

function FieldGrid({ children }: { children: ReactNode }) {
  return <div className="mt-4 grid gap-3 md:grid-cols-2">{children}</div>;
}

function FieldBase({ label, value, tone }: { label: string; value: string; tone: BoxTone }) {
  const toneClass =
    tone === "danger"
      ? "border-2 border-red-500 bg-white"
      : tone === "warning"
        ? "border-2 border-amber-500 bg-white"
        : "border-neutral-200 bg-white";

  return (
    <div className={["rounded-xl border p-4", toneClass].join(" ")}>
      <div className="text-xs text-neutral-500">{label}</div>
      <div className="mt-1 text-sm font-semibold text-neutral-900">{value}</div>
    </div>
  );
}

function Field({ label, value, tone = "normal" }: { label: string; value: string; tone?: BoxTone }) {
  return <FieldBase label={label} value={value} tone={tone} />;
}

function BoolField({
  label,
  value,
  variant = "positive",
  tone = "normal",
}: {
  label: string;
  value: boolean | null;
  variant?: "positive" | "warning";
  tone?: BoxTone;
}) {
  const toneClass =
    tone === "danger"
      ? "border-2 border-red-500 bg-white"
      : tone === "warning"
        ? "border-2 border-amber-500 bg-white"
        : "border-neutral-200 bg-white";

  return (
    <div className={["rounded-xl border p-4", toneClass].join(" ")}>
      <div className="text-xs text-neutral-500">{label}</div>
      <div className="mt-2">
        <YesNoBadge value={value} variant={variant} />
      </div>
    </div>
  );
}

function EmptyLine() {
  return <p className="mt-2 text-sm text-neutral-600">{NOT_FOUND_TEXT}</p>;
}

function Reason({ label, value, tone = "normal" }: { label: string; value: boolean | null; tone?: BoxTone }) {
  const toneClass =
    tone === "danger"
      ? "border-2 border-red-500 bg-white"
      : tone === "warning"
        ? "border-2 border-amber-500 bg-white"
        : "border-neutral-200 bg-white";

  return (
    <div className={["flex items-center justify-between rounded-lg border px-3 py-2", toneClass].join(" ")}>
      <span className="text-sm text-neutral-700">{label}</span>
      <YesNoBadge value={value} variant="warning" />
    </div>
  );
}

function YesNoBadge({
  value,
  label,
  variant = "positive",
}: {
  value: boolean | null;
  label?: string;
  variant?: "positive" | "risk" | "warning";
}) {
  const text = value == null ? NOT_FOUND_TEXT : value ? "Yes" : "No";
  const className =
    value == null
      ? "bg-neutral-100 text-neutral-700"
      : variant === "risk"
        ? value
          ? "bg-red-100 text-red-800"
          : "bg-emerald-100 text-emerald-800"
        : variant === "warning"
          ? value
            ? "bg-yellow-100 text-yellow-800"
            : "bg-emerald-100 text-emerald-800"
          : value
            ? "bg-emerald-100 text-emerald-800"
            : "bg-red-100 text-red-800";

  return (
    <span
      className={[
        "inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold",
        className,
      ].join(" ")}
    >
      {label ? `${label}: ${text}` : text}
    </span>
  );
}

function calculateAgreementScore(report: LeaseReport): number {
  const yellowBoxCount = countYellowBoxes(report);
  const riskCount = Object.values(report.riskFlags).filter(Boolean).length;
  const statementPenalties =
    (report.healthyHomes.statementProvided === false ? 1 : 0) +
    (report.insuranceDisclosure.propertyInsured === false ? 1 : 0);

  const deductions = riskCount * 12 + statementPenalties * 6 + yellowBoxCount;
  return Math.max(0, Math.min(SCORE_MAX, SCORE_MAX - deductions));
}

function countYellowBoxes(report: LeaseReport): number {
  const s = report.leaseSummary;
  let count = 0;

  // Snapshot warning boxes
  if (s.address == null) count += 1;
  if (s.startDate == null) count += 1;
  if (s.endDate == null) count += 1;
  if (s.rentAmount == null) count += 1;
  if (s.bondAmount == null) count += 1;

  // Insurance warning boxes (exclude danger path)
  if (!report.riskFlags.missingInsuranceStatement) {
    if (report.insuranceDisclosure.propertyInsured == null) count += 1;
    if (report.insuranceDisclosure.policyAvailableOnRequest == null) count += 1;
  }
  count += report.insuranceDisclosure.excesses.filter((e) => e.amount == null || e.notes == null).length;

  // Healthy Homes warning boxes (exclude danger path for statement/compliant false)
  if (!report.riskFlags.missingHealthyHomesStatement && report.healthyHomes.statementProvided == null) count += 1;
  if (report.healthyHomes.compliant == null) count += 1;
  if (report.healthyHomes.heating == null) count += 1;
  if (report.healthyHomes.insulation == null) count += 1;
  if (report.healthyHomes.ventilation == null) count += 1;
  if (report.healthyHomes.moistureDrainage == null) count += 1;
  if (report.healthyHomes.draughtStopping == null) count += 1;

  // Unit Title / Body Corporate warning boxes
  if (report.unitTitle.isUnitTitle == null) count += 1;
  if (!report.riskFlags.unitTitleRulesMissing && report.unitTitle.bodyCorporateRulesAttached == null) count += 1;

  // Rent payment warning box
  if (s.rentPaymentMethod === "unknown") count += 1;

  // Subletting / Assignment warning boxes
  if (report.sublettingAssignment.sublettingRequiresConsent === true) count += 1;
  if (report.sublettingAssignment.assignmentRequiresConsent === true) count += 1;
  if (report.sublettingAssignment.notes != null) count += 1;

  // Special terms warning boxes
  count += report.specialTerms.filter((term) => term.mayBeRestrictive === true).length;

  // Notice rules warning boxes
  if (report.noticeRules.tenantPeriodicNoticeDays == null) count += 1;
  if (report.noticeRules.fixedTermNonRenewalWindowDaysMin == null) count += 1;
  if (report.noticeRules.fixedTermNonRenewalWindowDaysMax == null) count += 1;
  const reasons = report.noticeRules.landlordNoticeReasons;
  if (reasons.saleOfProperty === true) count += 1;
  if (reasons.ownerOccupation === true) count += 1;
  if (reasons.extensiveAlterations === true) count += 1;
  if (reasons.changeOfUse === true) count += 1;
  if (reasons.demolition === true) count += 1;
  if (reasons.repeatedAntiSocialBehaviour === true) count += 1;
  if (reasons.familyViolence === true) count += 1;
  if (reasons.employmentTenancyEnding === true) count += 1;

  // Checklist warning boxes (exclude danger path)
  if (!report.riskFlags.noInspectionReport && report.checklist.inspectionReportProvided == null) count += 1;
  if (report.checklist.keysSupplied.length === 0) count += 1;
  if (report.checklist.chattels.length === 0) count += 1;
  if (report.checklist.waterMeterReading == null) count += 1;
  count += report.checklist.receiptAmounts.filter((r) => r.amount == null).length;

  // Key points/date rows are rendered as warning-toned boxes
  count += report.keyPoints.length;
  count += report.keyDates.length;

  return count;
}
