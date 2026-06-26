import { SalaryInput, TaxCalculationResult } from '../types/tax'

export class TaxCalculator {
  calculate(input: SalaryInput): TaxCalculationResult {
    const id = Math.random().toString(36).substr(2, 9)
    const totalIncome = this.getTotalIncome(input)
    const oldDeductions = this.calculateOldRegimeDeductions(input)
    const oldTaxableIncome = Math.max(0, totalIncome - oldDeductions)
    const oldTax = this.calculateTaxFromIncome(oldTaxableIncome)
    const oldSurcharge = this.calculateSurcharge(oldTax, totalIncome)
    const oldCess = this.calculateCess(oldTax + oldSurcharge)
    const totalTaxOld = oldTax + oldSurcharge + oldCess

    const newDeductions = 750000
    const newTaxableIncome = Math.max(0, totalIncome - newDeductions)
    const newTax = this.calculateTaxFromIncome(newTaxableIncome)
    const newSurcharge = this.calculateSurcharge(newTax, totalIncome)
    const newCess = this.calculateCess(newTax + newSurcharge)
    const totalTaxNew = newTax + newSurcharge + newCess

    const recommendedRegime = oldTax < newTax ? 'old' : 'new'
    const savings = Math.abs(oldTax - newTax)
    const explanation = recommendedRegime === 'old' ? `Old Regime saves ₹${Math.round(savings).toLocaleString('en-IN')}` : `New Regime saves ₹${Math.round(savings).toLocaleString('en-IN')}`
    const taxHealthScore = 85

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
      input.grossSalary + input.bonus + input.variablePay + input.joiningBonus +
      input.retentionBonus + input.leaveEncashment + input.gratuity +
      input.freelancingIncome + input.rentalIncome + input.interestIncome +
      input.capitalGains + input.otherIncome
    )
  }

  private calculateOldRegimeDeductions(input: SalaryInput): number {
    let deductions = 0
    deductions += Math.min(1500000, input.section80C)
    deductions += Math.min(250000, input.section80D)
    deductions += Math.min(500000, input.section80E)
    if (input.hasHomeLoan) deductions += Math.min(2000000, input.homeLoanInterestPaid)
    deductions += Math.min(500000, input.npsContribution)
    return deductions
  }

  private calculateTaxFromIncome(taxableIncome: number): number {
    if (taxableIncome <= 2500000) return 0
    if (taxableIncome <= 5000000) return (taxableIncome - 2500000) * 0.05
    if (taxableIncome <= 10000000) return 125000 + (taxableIncome - 5000000) * 0.2
    if (taxableIncome <= 15000000) return 1250000 + (taxableIncome - 10000000) * 0.3
    return 2750000 + (taxableIncome - 15000000) * 0.3
  }

  private calculateSurcharge(tax: number, totalIncome: number): number {
    if (totalIncome > 50000000) return tax * 0.25
    if (totalIncome > 10000000) return tax * 0.15
    return 0
  }

  private calculateCess(tax: number): number {
    return tax * 0.04
  }
}

export const taxCalculator = new TaxCalculator()
