import { SalaryInput, TaxCalculationResult } from '../types/tax'

export class TaxCalculator {
  private taxSlabs = {
    FY_2024_25: {
      old: [
        { min: 0, max: 2500000, rate: 0 },
        { min: 2500000, max: 5000000, rate: 0.05 },
        { min: 5000000, max: 10000000, rate: 0.2 },
        { min: 10000000, max: 15000000, rate: 0.3 },
        { min: 15000000, max: Infinity, rate: 0.3 },
      ],
      new: [
        { min: 0, max: 3000000, rate: 0 },
        { min: 3000000, max: 7000000, rate: 0.05 },
        { min: 7000000, max: 10000000, rate: 0.1 },
        { min: 10000000, max: 12500000, rate: 0.15 },
        { min: 12500000, max: 15000000, rate: 0.2 },
        { min: 15000000, max: Infinity, rate: 0.3 },
      ],
    },
  }

  calculate(input: SalaryInput): TaxCalculationResult {
    const id = Math.random().toString(36).substr(2, 9)
    const totalIncome = this.getTotalIncome(input)

    const oldDeductions = this.calculateOldRegimeDeductions(input)
    const oldTaxableIncome = Math.max(0, totalIncome - oldDeductions)
    const oldTax = this.calculateTaxFromIncome(oldTaxableIncome, input.fy, 'old')
    const oldSurcharge = this.calculateSurcharge(oldTax, totalIncome)
    const oldCess = this.calculateCess(oldTax + oldSurcharge)
    const totalTaxOld = oldTax + oldSurcharge + oldCess

    const newDeductions = 750000
    const newTaxableIncome = Math.max(0, totalIncome - newDeductions)
    const newTax = this.calculateTaxFromIncome(newTaxableIncome, input.fy, 'new')
    const newSurcharge = this.calculateSurcharge(newTax, totalIncome)
    const newCess = this.calculateCess(newTax + newSurcharge)
    const totalTaxNew = newTax + newSurcharge + newCess

    const recommendedRegime = oldTax < newTax ? 'old' : 'new'
    const savings = Math.abs(oldTax - newTax)
    const explanation = this.getExplanation(oldTax, newTax, oldDeductions)

    const taxHealthScore = this.calculateTaxHealthScore(input, oldDeductions, totalTaxOld, totalIncome)

    return {
      id,
      fy: input.fy,
      input,
      calculatedAt: new Date(),
      grossIncomeOld: totalIncome,
      totalDeductionsOld: oldDeductions,
      taxableIncomeOld: oldTaxableIncome,
      taxBeforeSurchargeOld: oldTax,
      surchargeOld: oldSurcharge,
      cessOld: oldCess,
      totalTaxOld,
      effectiveRateOld: totalIncome > 0 ? (totalTaxOld / totalIncome) * 100 : 0,
      takeHomeOld: totalIncome - totalTaxOld - input.employeePfContribution,
      grossIncomeNew: totalIncome,
      totalDeductionsNew: newDeductions,
      taxableIncomeNew: newTaxableIncome,
      taxBeforeSurchargeNew: newTax,
      surchargeNew: newSurcharge,
      cessNew: newCess,
      totalTaxNew,
      effectiveRateNew: totalIncome > 0 ? (totalTaxNew / totalIncome) * 100 : 0,
      takeHomeNew: totalIncome - totalTaxNew - input.employeePfContribution,
      recommendedRegime,
      savings,
      explanation,
      taxHealthScore,
    }
  }

  private getTotalIncome(input: SalaryInput): number {
    return (
      input.grossSalary +
      input.bonus +
      input.variablePay +
      input.joiningBonus +
      input.retentionBonus +
      input.leaveEncashment +
      input.gratuity +
      input.freelancingIncome +
      input.rentalIncome +
      input.interestIncome +
      input.capitalGains +
      input.otherIncome
    )
  }

  private calculateOldRegimeDeductions(input: SalaryInput): number {
    let deductions = 0
    deductions += Math.min(1500000, input.section80C)
    deductions += Math.min(250000, input.section80D)
    deductions += Math.min(500000, input.section80E)
    if (input.hasHomeLoan) {
      deductions += Math.min(2000000, input.homeLoanInterestPaid)
    }
    deductions += Math.min(500000, input.npsContribution)
    return deductions
  }

  private calculateTaxFromIncome(
    taxableIncome: number,
    fy: string,
    regime: 'old' | 'new'
  ): number {
    const slabs = this.taxSlabs[fy as keyof typeof this.taxSlabs]?.[regime] || this.taxSlabs.FY_2024_25[regime]

    let tax = 0
    for (const slab of slabs) {
      if (taxableIncome > slab.min) {
        const incomeInSlab = Math.min(taxableIncome, slab.max) - slab.min
        tax += incomeInSlab * slab.rate
      }
    }

    return Math.max(0, tax)
  }

  private calculateSurcharge(tax: number, totalIncome: number): number {
    if (totalIncome > 50000000) {
      return tax * 0.25
    }
    if (totalIncome > 10000000) {
      return tax * 0.15
    }
    return 0
  }

  private calculateCess(tax: number): number {
    return tax * 0.04
  }

  private getExplanation(oldTax: number, newTax: number, oldDeductions: number): string {
    if (oldTax < newTax) {
      return `Old Regime saves ₹${Math.round(newTax - oldTax).toLocaleString('en-IN')} with your deductions of ₹${Math.round(oldDeductions).toLocaleString('en-IN')}`
    }
    return `New Regime saves ₹${Math.round(oldTax - newTax).toLocaleString('en-IN')} with lower tax slabs`
  }

  private calculateTaxHealthScore(
    input: SalaryInput,
    deductions: number,
    tax: number,
    totalIncome: number
  ): number {
    let score = 100

    if (deductions < 500000) score -= 15
    else if (deductions < 1000000) score -= 5

    if (totalIncome > 0) {
      const effectiveRate = tax / totalIncome
      if (effectiveRate > 0.3) score -= 10
    }

    if (input.section80D > 0) score += 10
    if (input.epfContribution > 0) score += 5
    if (input.ppfContribution > 0) score += 5

    return Math.min(100, Math.max(0, score))
  }
}

export const taxCalculator = new TaxCalculator()
