export interface SalaryInput {
  fy: string
  grossSalary: number
  bonus: number
  variablePay: number
  section80C: number
  section80D: number
  npsContribution: number
  homeLoanInterest: number
  hasHomeLoan: boolean
}

export interface TaxResult {
  id: string
  fy: string
  input: SalaryInput
  calculatedAt: Date
  grossIncome: number
  oldRegimeTax: number
  newRegimeTax: number
  savings: number
  recommended: 'old' | 'new'
  explanation: string
}
