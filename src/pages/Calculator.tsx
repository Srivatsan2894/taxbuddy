import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { calculateTax } from '../lib/calculator'
import { saveToStorage } from '../utils/storage'
import { SalaryInput } from '../types/tax'

export default function Calculator() {
  const navigate = useNavigate()
  const [input, setInput] = useState<SalaryInput>({
    fy: '2025-26',
    grossSalary: 1000000,
    bonus: 0,
    variablePay: 0,
    section80C: 150000,
    section80D: 0,
    npsContribution: 0,
    homeLoanInterest: 0,
    hasHomeLoan: false
  })

  const handleCalculate = async () => {
    const result = calculateTax(input)
    await saveToStorage('lastTaxResult', result)
    navigate('/results')
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <h1 style={{ color: '#6200EA', marginBottom: '2rem' }}>Tax Calculator</h1>
      <form style={{ background: '#f9f9f9', padding: '2rem', borderRadius: '8px' }} onSubmit={(e) => { e.preventDefault(); handleCalculate() }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Financial Year</label>
          <select value={input.fy} onChange={(e) => setInput({...input, fy: e.target.value})} style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' }}>
            <option>2024-25</option>
            <option>2025-26</option>
            <option>2026-27</option>
          </select>
        </div>
        <fieldset style={{ border: 'none', marginBottom: '1.5rem' }}>
          <legend style={{ fontWeight: 'bold', marginBottom: '1rem', fontSize: '1.1rem' }}>Income (₹)</legend>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Gross Salary</label>
            <input type="number" value={input.grossSalary} onChange={(e) => setInput({...input, grossSalary: Number(e.target.value)})} style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' }} />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Bonus</label>
            <input type="number" value={input.bonus} onChange={(e) => setInput({...input, bonus: Number(e.target.value)})} style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Variable Pay</label>
            <input type="number" value={input.variablePay} onChange={(e) => setInput({...input, variablePay: Number(e.target.value)})} style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' }} />
          </div>
        </fieldset>
        <fieldset style={{ border: 'none', marginBottom: '1.5rem' }}>
          <legend style={{ fontWeight: 'bold', marginBottom: '1rem', fontSize: '1.1rem' }}>Deductions (₹)</legend>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>80C (Max ₹15L)</label>
            <input type="number" value={input.section80C} onChange={(e) => setInput({...input, section80C: Number(e.target.value)})} style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' }} />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>80D (Max ₹2.5L)</label>
            <input type="number" value={input.section80D} onChange={(e) => setInput({...input, section80D: Number(e.target.value)})} style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>NPS (Max ₹5L)</label>
            <input type="number" value={input.npsContribution} onChange={(e) => setInput({...input, npsContribution: Number(e.target.value)})} style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' }} />
          </div>
        </fieldset>
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
            <input type="checkbox" checked={input.hasHomeLoan} onChange={(e) => setInput({...input, hasHomeLoan: e.target.checked})} style={{ marginRight: '0.5rem' }} />
            <span>I have a Home Loan</span>
          </label>
          {input.hasHomeLoan && (
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>Home Loan Interest (Max ₹20L)</label>
              <input type="number" value={input.homeLoanInterest} onChange={(e) => setInput({...input, homeLoanInterest: Number(e.target.value)})} style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' }} />
            </div>
          )}
        </div>
        <button type="submit" style={{ width: '100%', padding: '1rem', background: '#6200EA', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem', fontWeight: 'bold' }}>
          Calculate Tax
        </button>
      </form>
    </div>
  )
}
