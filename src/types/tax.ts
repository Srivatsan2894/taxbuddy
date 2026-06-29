// src/types/tax.ts

export interface SalaryInput {
  id?: string
  fy: string // "FY2025-26"
  
  // Income Components
  basicSalary: number
  hra: number
  da: number
  specialAllowance: number
  otherAllowance: number
  bonus: number
  variablePay: number
  rentalIncome: number
  interestIncome: number
  otherIncome: number
  
  // Employer/Employee Contributions
  employerPF: number
  employeePF: number
  
  // Deductions (Old Regime Only)
  section80C: number
  section80D: number
  section80CCD1B: number
  section24B: number
  section80E: number
  section80TTA: number
  
  // Tax Info
  tdsPaid: number
  professionalTax: number
  state: string
  
  // Flags
  isSenior: boolean
  hasHomeLoan: boolean
  selectedRegime: 'old' | 'new'
  
  // Metadata
  calculatedAt?: Date
  name?: string
}

export interface TaxSlab {
  min: number
  max: number | null
  rate: number
}

export interface Deduction {
  max: number
  description: string
  maxSenior?: number
}

export interface TaxRules {
  financialYear: string
  taxYear: string
  standardDeduction: number
  oldRegime: {
    slabs: TaxSlab[]
    deductions: Record<string, Deduction>
    allowances: Record<string, boolean>
  }
  newRegime: {
    slabs: TaxSlab[]
    deductions: Record<string, Deduction>
    allowances: Record<string, boolean>
  }
  surcharge: TaxSlab[]
  cess: number
  professionalTax: {
    maxDeduction: number
    states: Record<string, { max: number; rate: number }>
  }
  pfContribution: {
    employeeRate: number
    employerRate: number
    maxPFWage: number
    deductionInOldRegime: boolean
  }
  rebates: any
  deadline: Record<string, string>
}

export interface TaxCalculation {
  grossIncome: number
  oldRegimeDeductions: number
  oldRegimeTaxableIncome: number
  oldRegimeTax: number
  oldRegimeRebate: number
  oldRegimeSurcharge: number
  oldRegimeCess: number
  oldRegimeTotalTax: number
  oldRegimeTakeHome: number
  oldRegimeEffectiveRate: number
  newRegimeDeductions: number
  newRegimeTaxableIncome: number
  newRegimeTax: number
  newRegimeRebate: number
  newRegimeSurcharge: number
  newRegimeCess: number
  newRegimeTotalTax: number
  newRegimeTakeHome: number
  newRegimeEffectiveRate: number
  savings: number
  recommended: 'old' | 'new'
  explanation: string
  tds: number
  refundOrPayable: number
  monthlyTakeHome: number
}

export interface TaxSavingSuggestion {
  type: string
  description: string
  maxBenefit: number
  maxDeduction: number
  currentUsage: number
  availableAmount: number
  potentialTaxSaving: number
  documents?: string[]
  regime: 'old' | 'new' | 'both'
}

export interface SavedCalculation {
  id: string
  name: string
  fy: string
  input: SalaryInput
  calculation: TaxCalculation
  suggestions: TaxSavingSuggestion[]
  createdAt: Date
  updatedAt: Date
}
