import { SalaryInput, TaxResult } from '../types/tax'

export function calculateTax(input: SalaryInput): TaxResult {
  const grossIncome = input.grossSalary + input.bonus + input.variablePay

  const oldDeductions = Math.min(1500000, input.section80C) + Math.min(250000, input.section80D) + Math.min(500000, input.npsContribution) + (input.hasHomeLoan ? Math.min(2000000, input.homeLoanInterest) : 0)
  const oldTaxableIncome = Math.max(0, grossIncome - oldDeductions)
  const oldRegimeTax = calculateIncomeTax(oldTaxableIncome)

  const newTaxableIncome = Math.max(0, grossIncome - 750000)
  const newRegimeTax = calculateIncomeTax(newTaxableIncome)

  const savings = Math.abs(oldRegimeTax - newRegimeTax)
  const recommended = oldRegimeTax < newRegimeTax ? 'old' : 'new'

  return {
    id: Math.random().toString(36).slice(2),
    fy: input.fy,
    input,
    calculatedAt: new Date(),
    grossIncome,
    oldRegimeTax,
    newRegimeTax,
    savings,
    recommended,
    explanation: `${recommended === 'old' ? 'Old' : 'New'} Regime saves ₹${Math.round(savings).toLocaleString('en-IN')}`
  }
}

function calculateIncomeTax(taxableIncome: number): number {
  if (taxableIncome <= 2500000) return 0
  if (taxableIncome <= 5000000) return (taxableIncome - 2500000) * 0.05
  if (taxableIncome <= 10000000) return 125000 + (taxableIncome - 5000000) * 0.2
  if (taxableIncome <= 15000000) return 1250000 + (taxableIncome - 10000000) * 0.3
  return 2750000 + (taxableIncome - 15000000) * 0.3
}
