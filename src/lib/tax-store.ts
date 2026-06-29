import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { SavedCalculation, SalaryInput, TaxCalculation } from '../types/tax'

interface AppState {
  fy: string
  saved: Array<{ id: string; name: string; data: any }>
  savedCalculations: SavedCalculation[]
  currentInput: SalaryInput | null
  currentCalculation: TaxCalculation | null
}

interface AppStore extends AppState {
  setFY: (fy: string) => void
  setSaved: (saved: any[]) => void
  removeSaved: (id: string) => void
  saveCalculation: (calc: SavedCalculation) => void
  deleteCalculation: (id: string) => void
  loadCalculation: (id: string) => SavedCalculation | undefined
  setCurrentInput: (input: SalaryInput) => void
  setCurrentCalculation: (calc: TaxCalculation) => void
}

export const useAppState = create<AppStore>()(
  persist(
    (set, get) => ({
      fy: 'FY2025-26',
      saved: [],
      savedCalculations: [],
      currentInput: null,
      currentCalculation: null,

      setFY: (fy) => set({ fy }),
      setSaved: (saved) => set({ saved }),
      removeSaved: (id) => set((state) => ({ saved: state.saved.filter((s) => s.id !== id) })),
      
      saveCalculation: (calc) => set((state) => ({ savedCalculations: [...state.savedCalculations.filter((c) => c.id !== calc.id), calc] })),
      deleteCalculation: (id) => set((state) => ({ savedCalculations: state.savedCalculations.filter((c) => c.id !== id) })),
      loadCalculation: (id) => { const calc = get().savedCalculations.find((c) => c.id === id); if (calc) set({ currentInput: calc.input, currentCalculation: calc.calculation }); return calc },
      setCurrentInput: (input) => set({ currentInput: input }),
      setCurrentCalculation: (calc) => set({ currentCalculation: calc }),
    }),
    { name: 'app-state' },
  ),
)

export const useFY = () => useAppState((state) => state.fy)
export const useSaved = (id: string) => useAppState((state) => state.saved.find((s) => s.id === id))
export const removeSaved = (id: string) => useAppState.getState().removeSaved(id)
export const useTaxStore = useAppState
