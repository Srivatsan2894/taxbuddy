// src/services/tax-engine/calculator.ts

import type { SalaryInput, TaxRules, TaxCalculation, TaxSavingSuggestion } from '../../types/tax'

export class TaxCalculator {
  private rules: TaxRules

  constructor(rules: TaxRules) {
    this.rules = rules
  }

  calculate(input: SalaryInput): TaxCalculation {
    const grossIncome = this.calculateGrossIncome(input)
    const oldRegime = this.calculateOldRegime(input, grossIncome)
    const newRegime = this.calculateNewRegime(input, grossIncome)
    const { recommended, explanation } = this.recommendRegime(input, oldRegime, newRegime)
    const selectedTax = input.selectedRegime === 'old' ? oldRegime.totalTax : newRegime.totalTax
    const refundOrPayable = input.tdsPaid - selectedTax
    const monthlyTakeHome = (grossIncome - selectedTax - input.employeePF) / 12

    return {
      grossIncome,
      oldRegimeDeductions: oldRegime.deductions,
      oldRegimeTaxableIncome: oldRegime.taxableIncome,
      oldRegimeTax: oldRegime.tax,
      oldRegimeRebate: oldRegime.rebate,
      oldRegimeSurcharge: oldRegime.surcharge,
      oldRegimeCess: oldRegime.cess,
      oldRegimeTotalTax: oldRegime.totalTax,
      oldRegimeTakeHome: grossIncome - oldRegime.totalTax - input.employeePF,
      oldRegimeEffectiveRate: (oldRegime.totalTax / grossIncome) * 100,
      newRegimeDeductions: newRegime.deductions,
      newRegimeTaxableIncome: newRegime.taxableIncome,
      newRegimeTax: newRegime.tax,
      newRegimeRebate: newRegime.rebate,
      newRegimeSurcharge: newRegime.surcharge,
      newRegimeCess: newRegime.cess,
      newRegimeTotalTax: newRegime.totalTax,
      newRegimeTakeHome: grossIncome - newRegime.totalTax - input.employeePF,
      newRegimeEffectiveRate: (newRegime.totalTax / grossIncome) * 100,
      savings: Math.abs(oldRegime.totalTax - newRegime.totalTax),
      recommended,
      explanation,
      tds: input.tdsPaid,
      refundOrPayable,
      monthlyTakeHome,
    }
  }

  private calculateGrossIncome(input: SalaryInput): number {
    return (
      input.basicSalary +
      input.hra +
      input.da +
      input.specialAllowance +
      input.otherAllowance +
      input.bonus +
      input.variablePay +
      input.rentalIncome +
      input.interestIncome +
      input.otherIncome +
      input.employerPF
    )
  }

  private calculateOldRegime(input: SalaryInput, grossIncome: number) {
    const deductions = this.calculateOldRegimeDeductions(input)
    const taxableIncome = Math.max(0, grossIncome - deductions)
    const tax = this.calculateTaxFromSlabs(taxableIncome, this.rules.oldRegime.slabs)
    const rebate = this.calculateRebate(taxableIncome, tax, 'old')
    const taxAfterRebate = Math.max(0, tax - rebate)
    const surcharge = this.calculateSurcharge(taxableIncome, taxAfterRebate)
    const cess = (taxAfterRebate + surcharge) * this.rules.cess
    const totalTax = taxAfterRebate + surcharge + cess

    return { deductions, taxableIncome, tax, rebate, surcharge, cess, totalTax }
  }

  private calculateNewRegime(input: SalaryInput, grossIncome: number) {
    const deductions = this.rules.standardDeduction
    const taxableIncome = Math.max(0, grossIncome - deductions)
    const tax = this.calculateTaxFromSlabs(taxableIncome, this.rules.newRegime.slabs)
    const rebate = this.calculateRebate(taxableIncome, tax, 'new')
    const taxAfterRebate = Math.max(0, tax - rebate)
    const surcharge = this.calculateSurcharge(taxableIncome, taxAfterRebate)
    const cess = (taxAfterRebate + surcharge) * this.rules.cess
    const totalTax = taxAfterRebate + surcharge + cess

    return { deductions, taxableIncome, tax, rebate, surcharge, cess, totalTax }
  }

  private calculateOldRegimeDeductions(input: SalaryInput): number {
    let deductions = 0
    if (input.hra > 0) deductions += input.hra
    deductions += Math.min(input.section80C, this.rules.oldRegime.deductions.section80C.max)
    const maxSection80D = input.isSenior
      ? this.rules.oldRegime.deductions.section80D.maxSenior || 50000
      : this.rules.oldRegime.deductions.section80D.max
    deductions += Math.min(input.section80D, maxSection80D)
    deductions += Math.min(input.section80CCD1B, this.rules.oldRegime.deductions.section80CCD1B.max)
    if (input.hasHomeLoan) {
      deductions += Math.min(input.section24B, this.rules.oldRegime.deductions['section24B'].max)
    }
    deductions += input.section80E
    deductions += Math.min(input.section80TTA, this.rules.oldRegime.deductions.section80TTA.max)
    return deductions
  }

  private calculateTaxFromSlabs(income: number, slabs: any[]): number {
    let tax = 0
    for (const slab of slabs) {
      if (income <= slab.min) break
      const slabMax = slab.max === null ? income : Math.min(income, slab.max)
      const slabIncome = slabMax - slab.min
      tax += slabIncome * slab.rate
      if (income <= slab.max) break
    }
    return tax
  }

  private calculateRebate(taxableIncome: number, tax: number, regime: 'old' | 'new'): number {
    const rebate = this.rules.rebates.section87A[regime]
    if (taxableIncome <= rebate.maxIncome && tax <= rebate.maxTax) {
      return Math.min(tax, rebate.maxTax)
    }
    return 0
  }

  private calculateSurcharge(taxableIncome: number, tax: number): number {
    for (const slab of this.rules.surcharge) {
      if (taxableIncome >= slab.min && (slab.max === null || taxableIncome <= slab.max)) {
        return tax * slab.rate
      }
    }
    return 0
  }

  private recommendRegime(input: SalaryInput, oldRegime: any, newRegime: any) {
    const oldTax = oldRegime.totalTax
    const newTax = newRegime.totalTax
    if (oldTax < newTax) {
      const savings = newTax - oldTax
      const reasons = []
      if (input.hra > 0) reasons.push('✓ HRA Exemption')
      if (input.section80C > 0) reasons.push('✓ Section 80C')
      if (input.section80D > 0) reasons.push('✓ Health Insurance')
      if (input.section24B > 0 && input.hasHomeLoan) reasons.push('✓ Home Loan')
      return {
        recommended: 'old' as const,
        explanation: `Old Regime saves ₹${Math.round(savings).toLocaleString('en-IN')}. ${reasons.join(' ')}`,
      }
    } else {
      const savings = oldTax - newTax
      return {
        recommended: 'new' as const,
        explanation: `New Regime saves ₹${Math.round(savings).toLocaleString('en-IN')}. Simpler tax filing.`,
      }
    }
  }

  getSavingSuggestions(input: SalaryInput, calculation: TaxCalculation): TaxSavingSuggestion[] {
    const suggestions: TaxSavingSuggestion[] = []
    if (input.section80C < this.rules.oldRegime.deductions.section80C.max) {
      const available = this.rules.oldRegime.deductions.section80C.max - input.section80C
      suggestions.push({
        type: 'section80C',
        description: 'Invest in Life Insurance, PPF, or ELSS',
        maxBenefit: available * 0.2,
        maxDeduction: this.rules.oldRegime.deductions.section80C.max,
        currentUsage: input.section80C,
        availableAmount: available,
        potentialTaxSaving: available * 0.2,
        regime: 'old',
        documents: ['Insurance Policy', 'PPF Passbook', 'ELSS Statement'],
      })
    }
    return suggestions
  }
}
