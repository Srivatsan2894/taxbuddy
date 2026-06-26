import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { saveToStorage } from '../utils/storage'
import { taxCalculator } from '../lib/taxCalculator'
import { SalaryInput } from '../types/tax'

export default function Wizard() {
  const navigate = useNavigate()
  const [input, setInput] = useState<SalaryInput>({
    fy: '2025-26', grossSalary: 1000000, bonus: 0, variablePay: 0, joiningBonus: 0, retentionBonus: 0,
    leaveEncashment: 0, gratuity: 0, freelancingIncome: 0, rentalIncome: 0, interestIncome: 0, capitalGains: 0,
    otherIncome: 0, section80C: 150000, section80D: 0, section80E: 0, npsContribution: 0, epfContribution: 0,
    ppfContribution: 0, elssContribution: 0, licContribution: 0, homeLoanInterestPaid: 0, hasHomeLoan: false,
    employeePfContribution: 12500, basic: 400000, monthlyRent: 10000, receivesHra: true, livesInMetroCity: true
  })

  const handleCalculate = async () => {
    const result = taxCalculator.calculate(input)
    await saveToStorage('lastTaxResult', result)
    navigate('/results')
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <h1 style={{ color: '#6200EA', marginBottom: '2rem' }}>Tax Calculator Wizard</h1>
      
      <div style={{ background: '#f5f5f5', padding: '1.5rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Financial Year</label>
        <select value={input.fy} onChange={(e) => setInput({...input, fy: e.target.value})} style={{ width: '100%', padding: '0.5rem' }}>
          <option>2024-25</option>
          <option>2025-26</option>
          <option>2026-27</option>
        </select>
      </div>

      <div style={{ background: '#f5f5f5', padding: '1.5rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
        <h3 style={{ color: '#333' }}>Income</h3>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Gross Salary (₹)</label>
          <input type="number" value={input.grossSalary} onChange={(e) => setInput({...input, grossSalary: Number(e.target.value)})} style={{ width: '100%', padding: '0.5rem' }} />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Bonus (₹)</label>
          <input type="number" value={input.bonus} onChange={(e) => setInput({...input, bonus: Number(e.target.value)})} style={{ width: '100%', padding: '0.5rem' }} />
        </div>
      </div>

      <div style={{ background: '#f5f5f5', padding: '1.5rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
        <h3 style={{ color: '#333' }}>Deductions</h3>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>80C (Max ₹1.5L)</label>
          <input type="number" value={input.section80C} onChange={(e) => setInput({...input, section80C: Number(e.target.value)})} style={{ width: '100%', padding: '0.5rem' }} />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>80D Health Insurance (Max ₹2.5L)</label>
          <input type="number" value={input.section80D} onChange={(e) => setInput({...input, section80D: Number(e.target.value)})} style={{ width: '100%', padding: '0.5rem' }} />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>NPS Contribution (Max ₹5L)</label>
          <input type="number" value={input.npsContribution} onChange={(e) => setInput({...input, npsContribution: Number(e.target.value)})} style={{ width: '100%', padding: '0.5rem' }} />
        </div>
      </div>

      <button onClick={handleCalculate} style={{ width: '100%', padding: '1rem', background: '#6200EA', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem', fontWeight: 'bold' }}>
        Calculate Tax
      </button>
    </div>
  )
}
