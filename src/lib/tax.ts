// TaxBuddy India — pure tax calculation logic for FY 2025-26.
// Reasonable approximations of Indian Income Tax rules; for education.

export type Regime = "old" | "new";

export interface IncomeInputs {
  baseSalary: number;
  bonus: number;
  variable: number;
  otherIncome: number;
}

export interface DeductionInputs {
  standard: number; // standard deduction
  sec80C: number;
  sec80D: number;
  nps80CCD1B: number;
  hra: number;
  homeLoan24B: number;
  lta: number;
  educationLoan80E: number;
}

export const DEDUCTION_LIMITS = {
  standard: { old: 50000, new: 75000 },
  sec80C: 150000,
  sec80D: 25000,
  nps80CCD1B: 50000,
  hra: 200000, // soft cap for UI; actual rule complex
  homeLoan24B: 200000,
  lta: 100000, // soft cap
  educationLoan80E: 200000, // no upper limit but used as input cap
} as const;

export interface TaxResult {
  gross: number;
  totalDeductions: number;
  taxableIncome: number;
  taxBeforeRebate: number;
  rebate: number;
  taxAfterRebate: number;
  surcharge: number;
  cess: number;
  netTax: number;
  effectiveRate: number;
  takeHome: number;
  slabBreakdown: Array<{ slab: string; rate: number; tax: number }>;
}

const NEW_SLABS_FY2526 = [
  { upto: 400000, rate: 0 },
  { upto: 800000, rate: 0.05 },
  { upto: 1200000, rate: 0.1 },
  { upto: 1600000, rate: 0.15 },
  { upto: 2000000, rate: 0.2 },
  { upto: 2400000, rate: 0.25 },
  { upto: Infinity, rate: 0.3 },
];

const OLD_SLABS = [
  { upto: 250000, rate: 0 },
  { upto: 500000, rate: 0.05 },
  { upto: 1000000, rate: 0.2 },
  { upto: Infinity, rate: 0.3 },
];

function applySlabs(taxable: number, slabs: typeof OLD_SLABS) {
  let prev = 0;
  let tax = 0;
  const breakdown: TaxResult["slabBreakdown"] = [];
  for (const s of slabs) {
    if (taxable <= prev) break;
    const slice = Math.min(taxable, s.upto) - prev;
    const slabTax = slice * s.rate;
    tax += slabTax;
    breakdown.push({
      slab:
        s.upto === Infinity
          ? `Above ₹${(prev / 100000).toFixed(0)}L`
          : `₹${(prev / 100000).toFixed(0)}L – ₹${(s.upto / 100000).toFixed(0)}L`,
      rate: s.rate,
      tax: slabTax,
    });
    prev = s.upto;
  }
  return { tax, breakdown };
}

export function calculateTax(
  income: IncomeInputs,
  deductions: DeductionInputs,
  regime: Regime
): TaxResult {
  const gross =
    (income.baseSalary || 0) +
    (income.bonus || 0) +
    (income.variable || 0) +
    (income.otherIncome || 0);

  let totalDeductions = 0;
  if (regime === "old") {
    totalDeductions =
      Math.min(deductions.standard, DEDUCTION_LIMITS.standard.old) +
      Math.min(deductions.sec80C, DEDUCTION_LIMITS.sec80C) +
      Math.min(deductions.sec80D, DEDUCTION_LIMITS.sec80D) +
      Math.min(deductions.nps80CCD1B, DEDUCTION_LIMITS.nps80CCD1B) +
      Math.min(deductions.hra, DEDUCTION_LIMITS.hra) +
      Math.min(deductions.homeLoan24B, DEDUCTION_LIMITS.homeLoan24B) +
      Math.min(deductions.lta, DEDUCTION_LIMITS.lta) +
      Math.min(deductions.educationLoan80E, DEDUCTION_LIMITS.educationLoan80E);
  } else {
    // New regime: only standard deduction (₹75k) is allowed for salaried
    totalDeductions = Math.min(deductions.standard, DEDUCTION_LIMITS.standard.new);
  }

  const taxableIncome = Math.max(0, gross - totalDeductions);

  const { tax: taxBeforeRebate, breakdown } = applySlabs(
    taxableIncome,
    regime === "old" ? OLD_SLABS : NEW_SLABS_FY2526
  );

  // 87A Rebate
  let rebate = 0;
  if (regime === "old" && taxableIncome <= 500000) {
    rebate = Math.min(taxBeforeRebate, 12500);
  } else if (regime === "new" && taxableIncome <= 1200000) {
    rebate = Math.min(taxBeforeRebate, 60000);
  }

  const taxAfterRebate = Math.max(0, taxBeforeRebate - rebate);

  // Surcharge (simplified)
  let surcharge = 0;
  if (taxableIncome > 50000000) surcharge = taxAfterRebate * 0.25;
  else if (taxableIncome > 20000000) surcharge = taxAfterRebate * 0.15;
  else if (taxableIncome > 10000000) surcharge = taxAfterRebate * 0.1;
  else if (taxableIncome > 5000000) surcharge = taxAfterRebate * 0.1;

  const cess = (taxAfterRebate + surcharge) * 0.04;
  const netTax = Math.round(taxAfterRebate + surcharge + cess);
  const effectiveRate = gross > 0 ? (netTax / gross) * 100 : 0;
  const takeHome = Math.max(0, gross - netTax);

  return {
    gross,
    totalDeductions,
    taxableIncome,
    taxBeforeRebate,
    rebate,
    taxAfterRebate,
    surcharge,
    cess,
    netTax,
    effectiveRate,
    takeHome,
    slabBreakdown: breakdown,
  };
}

export function formatINR(n: number): string {
  if (!isFinite(n)) return "₹0";
  const sign = n < 0 ? "-" : "";
  const abs = Math.abs(Math.round(n));
  return sign + "₹" + abs.toLocaleString("en-IN");
}

export function formatINRCompact(n: number): string {
  const abs = Math.abs(n);
  if (abs >= 10000000) return `₹${(n / 10000000).toFixed(2)} Cr`;
  if (abs >= 100000) return `₹${(n / 100000).toFixed(2)} L`;
  if (abs >= 1000) return `₹${(n / 1000).toFixed(1)}K`;
  return formatINR(n);
}

export const FINANCIAL_YEARS = ["FY 2025-26", "FY 2026-27", "FY 2027-28"];

export const DEFAULT_INCOME: IncomeInputs = {
  baseSalary: 1200000,
  bonus: 100000,
  variable: 150000,
  otherIncome: 0,
};

export const DEFAULT_DEDUCTIONS: DeductionInputs = {
  standard: 50000,
  sec80C: 150000,
  sec80D: 25000,
  nps80CCD1B: 50000,
  hra: 0,
  homeLoan24B: 0,
  lta: 0,
  educationLoan80E: 0,
};