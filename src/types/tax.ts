export interface SalaryInput {
  fy: string
  grossSalary: number
  bonus: number
  variablePay: number
  joiningBonus: number
  retentionBonus: number
  leaveEncashment: number
  gratuity: number
  freelancingIncome: number
  rentalIncome: number
  interestIncome: number
  capitalGains: number
  otherIncome: number
  section80C: number
  section80D: number
  section80E: number
  npsContribution: number
  epfContribution: number
  ppfContribution: number
  elssContribution: number
  licContribution: number
  homeLoanInterestPaid: number
  hasHomeLoan: boolean
  employeePfContribution: number
  basic: number
  monthlyRent: number
  receivesHra: boolean
  livesInMetroCity: boolean
}

export interface TaxCalculationResult {
  id: string
  fy: string
  input: SalaryInput
  calculatedAt: Date
  
  // Old Regime
  grossIncomeOld: number
  totalDeductionsOld: number
  taxableIncomeOld: number
  taxBeforeSurchargeOld: number
  surchargeOld: number
  cessOld: number
  totalTaxOld: number
  effectiveRateOld: number
  takeHomeOld: number
  
  // New Regime
  grossIncomeNew: number
  totalDeductionsNew: number
  taxableIncomeNew: number
  taxBeforeSurchargeNew: number
  surchargeNew: number
  cessNew: number
  totalTaxNew: number
  effectiveRateNew: number
  takeHomeNew: number
  
  // Recommendation
  recommendedRegime: 'old' | 'new'
  savings: number
  explanation: string
  taxHealthScore: number
}

export type FinancialYear = 'FY_2024_25' | 'FY_2025_26' | 'FY_2026_27'
