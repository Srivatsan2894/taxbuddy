// src/lib/tax-store.ts

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { SavedCalculation, SalaryInput, TaxCalculation } from '../types/tax'

interface TaxStore {
  savedCalculations: SavedCalculation[]
  currentInput: SalaryInput | null
  currentCalculation: TaxCalculation | null
  
  // Actions
  saveCalculation: (calc: SavedCalculation) => void
  deleteCalculation: (id: string) => void
  loadCalculation: (id: string) => SavedCalculation | undefined
  setCurrentInput: (input: SalaryInput) => void
  setCurrentCalculation: (calc: TaxCalculation) => void
}

export const useTaxStore = create<TaxStore>()(
  persist(
    (set, get) => ({
      savedCalculations: [],
      currentInput: null,
      currentCalculation: null,

      saveCalculation: (calc) =>
        set((state) => ({
          savedCalculations: [
            ...state.savedCalculations.filter((c) => c.id !== calc.id),
            calc,
          ],
        })),

      deleteCalculation: (id) =>
        set((state) => ({
          savedCalculations: state.savedCalculations.filter((c) => c.id !== id),
        })),

      loadCalculation: (id) => {
        const calc = get().savedCalculations.find((c) => c.id === id)
        if (calc) {
          set({ currentInput: calc.input, currentCalculation: calc.calculation })
        }
        return calc
      },

      setCurrentInput: (input) => set({ currentInput: input }),
      setCurrentCalculation: (calc) => set({ currentCalculation: calc }),
    }),
    {
      name: 'tax-store',
    },
  ),
)
