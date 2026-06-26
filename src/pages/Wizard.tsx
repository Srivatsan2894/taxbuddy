import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { taxCalculator } from '../lib/taxCalculator'
import { SalaryInput } from '../types/tax'
import { saveToStorage } from '../utils/storage'

export default function Wizard() {
  const navigate = useNavigate()
  const [input, setInput] = useState<SalaryInput>({
    fy: 'FY_2024_25',
    grossSalary: 0,
    bonus: 0,
    variablePay: 0,
    joiningBonus: 0,
    retentionBonus: 0,
    leaveEncashment: 0,
    gratuity: 0,
    freelancingIncome: 0,
    rentalIncome: 0,
    interestIncome: 0,
    capitalGains: 0,
    otherIncome: 0,
    section80C: 0,
    section80D: 0,
    section80E: 0,
    npsContribution: 0,
    epfContribution: 0,
    ppfContribution: 0,
    elssContribution: 0,
    licContribution: 0,
    homeLoanInterestPaid: 0,
    hasHomeLoan: false,
    employeePfContribution: 0,
    basic: 0,
    monthlyRent: 0,
    receivesHra: false,
    livesInMetroCity: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : parseFloat(value) || 0
    setInput({
      ...input,
      [name]: newValue,
    })
  }

  const handleCalculate = async () => {
    const result = taxCalculator.calculate(input)
    await saveToStorage('lastTaxResult', result)
    navigate('/results')
  }

  const InputGroup = ({ label, name, hint }: { label: string; name: keyof SalaryInput; hint?: string }) => (
    <div style={{ marginBottom: '1rem' }}>
      <label style={{ display: 'block', marginBottom: '0.3rem', color: '#333', fontWeight: '500' }}>
        {label}
      </label>
      {hint && <p style={{ fontSize: '0.85rem', color: '#999', marginBottom: '0.3rem' }}>{hint}</p>}
      <input
        type="number"
        name={name}
        value={(input[name] as number) || ''}
        onChange={handleChange}
        placeholder="0"
        style={{
          width: '100%',
          padding: '0.75rem',
          border: '1px solid #ddd',
          borderRadius: '4px',
          fontSize: '1rem',
        }}
      />
    </div>
  )

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <h1 style={{ color: '#6200EA', marginBottom: '0.5rem' }}>Tax Calculator Wizard</h1>
      <p style={{ color: '#666', marginBottom: '2rem' }}>Enter your income and deduction details</p>

      <div style={{ background: '#f9f9f9', padding: '2rem', borderRadius: '8px', border: '1px solid #eee' }}>
        <div style={{ marginBottom: '2rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: '#333', fontWeight: '500' }}>
            Financial Year
          </label>
          <select
            name="fy"
            value={input.fy}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '1rem',
            }}
          >
            <option value="FY_2024_25">FY 2024-25</option>
            <option value="FY_2025_26">FY 2025-26</option>
            <option value="FY_2026_27">FY 2026-27</option>
          </select>
        </div>

        <h2 style={{ fontSize: '1.1rem', color: '#333', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid #6200EA' }}>
          Income
        </h2>
        <InputGroup label="Gross Salary" name="grossSalary" hint="Basic + DA + Other fixed allowances" />
        <InputGroup label="Bonus" name="bonus" hint="Annual bonus/performance incentive" />
        <InputGroup label="Variable Pay" name="variablePay" hint="Commission or variable compensation" />
        <InputGroup label="Joining Bonus" name="joiningBonus" />
        <InputGroup label="Retention Bonus" name="retentionBonus" />
        <InputGroup label="Leave Encashment" name="leaveEncashment" hint="Unused leave payout" />
        <InputGroup label="Gratuity" name="gratuity" hint="Received amount" />
        <InputGroup label="Freelancing Income" name="freelancingIncome" />
        <InputGroup label="Rental Income" name="rentalIncome" hint="Annual rent after deductions" />
        <InputGroup label="Interest Income" name="interestIncome" hint="Savings account, FD interest" />
        <InputGroup label="Capital Gains" name="capitalGains" hint="From investments/property" />
        <InputGroup label="Other Income" name="otherIncome" />

        <h2 style={{ fontSize: '1.1rem', color: '#333', marginBottom: '1rem', marginTop: '2rem', paddingBottom: '0.5rem', borderBottom: '2px solid #6200EA' }}>
          Deductions (Old Regime)
        </h2>
        <InputGroup label="Section 80C" name="section80C" hint="EPF + PPF + ELSS (Max ₹1,50,000)" />
        <InputGroup label="Section 80D" name="section80D" hint="Health Insurance (Max ₹2,50,000)" />
        <InputGroup label="Section 80E" name="section80E" hint="Education Loan Interest (Max ₹50,000)" />
        <InputGroup label="NPS Contribution" name="npsContribution" hint="Additional NPS (Max ₹50,000)" />
        <InputGroup label="Home Loan Interest" name="homeLoanInterestPaid" hint="Section 24(b) - Max ₹2,00,000" />
        <InputGroup label="Employee PF Contribution" name="employeePfContribution" hint="12% of basic or actual" />

        <h2 style={{ fontSize: '1.1rem', color: '#333', marginBottom: '1rem', marginTop: '2rem', paddingBottom: '0.5rem', borderBottom: '2px solid #6200EA' }}>
          Other Information
        </h2>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', color: '#333' }}>
            <input
              type="checkbox"
              name="hasHomeLoan"
              checked={input.hasHomeLoan}
              onChange={handleChange}
              style={{ marginRight: '0.5rem' }}
            />
            Have Home Loan
          </label>
        </div>

        <button
          onClick={handleCalculate}
          style={{
            width: '100%',
            padding: '1rem',
            background: '#6200EA',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            marginTop: '1rem',
          }}
        >
          Calculate Tax
        </button>
      </div>
    </div>
  )
}
