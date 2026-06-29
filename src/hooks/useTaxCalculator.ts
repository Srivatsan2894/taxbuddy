// src/hooks/useTaxCalculator.ts

import { useState } from 'react'
import { TaxCalculator, FY202526Rules } from '../services/tax-engine'
import type { SalaryInput, TaxCalculation, TaxSavingSuggestion } from '../types/tax'

export function useTaxCalculator() {
  const [calculation, setCalculation] = useState<TaxCalculation | null>(null)
  const [suggestions, setSuggestions] = useState<TaxSavingSuggestion[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const calculate = (input: SalaryInput) => {
    try {
      setLoading(true)
      setError(null)

      const calculator = new TaxCalculator(FY202526Rules as any)
      const result = calculator.calculate(input)
      const savingSuggestions = calculator.getSavingSuggestions(input, result)

      setCalculation(result)
      setSuggestions(savingSuggestions)
      
      return { result, savingSuggestions }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Calculation failed'
      setError(message)
      console.error('Tax calculation error:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return {
    calculation,
    suggestions,
    loading,
    error,
    calculate,
  }
}
