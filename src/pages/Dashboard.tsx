import { useState, useEffect } from 'react'
import { getFromStorage } from '@/utils/storage'
import { TaxCalculationResult } from '@/types/tax'

export default function Dashboard() {
  const [lastResult, setLastResult] = useState<TaxCalculationResult | null>(null)

  useEffect(() => {
    const loadLastResult = async () => {
      const result = await getFromStorage('lastTaxResult')
      setLastResult(result)
    }
    loadLastResult()
  }, [])

  if (!lastResult) {
    return (
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem' }}>
        <h1 style={{ color: '#6200EA', marginBottom: '1rem' }}>Dashboard</h1>
        <div style={{
          border: '2px dashed #ddd',
          padding: '3rem',
          textAlign: 'center',
          borderRadius: '8px',
          color: '#999'
        }}>
          <p style={{ fontSize: '1.1rem' }}>No calculations yet.</p>
          <p style={{ marginTop: '0.5rem' }}>Use the Tax Calculator to get started!</p>
        </div>
      </div>
    )
  }

  const formatCurrency = (value: number) => `₹${Math.round(value).toLocaleString('en-IN')}`

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem' }}>
      <h1 style={{ color: '#6200EA', marginBottom: '1rem' }}>Dashboard</h1>
      <p style={{ color: '#666', marginBottom: '2rem' }}>Last Calculation: {new Date(lastResult.calculatedAt).toLocaleDateString()}</p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        <div style={{ background: '#e3f2fd', padding: '1.5rem', borderRadius: '8px', border: '2px solid #2196f3' }}>
          <p style={{ color: '#666', fontSize: '0.9rem' }}>Gross Income</p>
          <p style={{ fontSize: '1.5rem', color: '#2196f3', fontWeight: 'bold', marginTop: '0.5rem' }}>
            {formatCurrency(lastResult.grossIncomeOld)}
          </p>
        </div>

        <div style={{ background: '#f3e5f5', padding: '1.5rem', borderRadius: '8px', border: '2px solid #9c27b0' }}>
          <p style={{ color: '#666', fontSize: '0.9rem' }}>Old Regime Tax</p>
          <p style={{ fontSize: '1.5rem', color: '#9c27b0', fontWeight: 'bold', marginTop: '0.5rem' }}>
            {formatCurrency(lastResult.totalTaxOld)}
          </p>
        </div>

        <div style={{ background: '#e8f5e9', padding: '1.5rem', borderRadius: '8px', border: '2px solid #4caf50' }}>
          <p style={{ color: '#666', fontSize: '0.9rem' }}>New Regime Tax</p>
          <p style={{ fontSize: '1.5rem', color: '#4caf50', fontWeight: 'bold', marginTop: '0.5rem' }}>
            {formatCurrency(lastResult.totalTaxNew)}
          </p>
        </div>

        <div style={{ background: '#fff3e0', padding: '1.5rem', borderRadius: '8px', border: '2px solid #ff9800' }}>
          <p style={{ color: '#666', fontSize: '0.9rem' }}>Tax Savings</p>
          <p style={{ fontSize: '1.5rem', color: '#ff9800', fontWeight: 'bold', marginTop: '0.5rem' }}>
            {formatCurrency(lastResult.savings)}
          </p>
        </div>

        <div style={{ background: '#fce4ec', padding: '1.5rem', borderRadius: '8px', border: '2px solid #e91e63' }}>
          <p style={{ color: '#666', fontSize: '0.9rem' }}>Recommended</p>
          <p style={{ fontSize: '1.2rem', color: '#e91e63', fontWeight: 'bold', marginTop: '0.5rem' }}>
            {lastResult.recommendedRegime === 'old' ? 'Old Regime' : 'New Regime'}
          </p>
        </div>

        <div style={{ background: '#e0f2f1', padding: '1.5rem', borderRadius: '8px', border: '2px solid #009688' }}>
          <p style={{ color: '#666', fontSize: '0.9rem' }}>Tax Health Score</p>
          <p style={{ fontSize: '1.5rem', color: '#009688', fontWeight: 'bold', marginTop: '0.5rem' }}>
            {lastResult.taxHealthScore}/100
          </p>
        </div>
      </div>

      <div style={{
        background: '#f5f5f5',
        padding: '1.5rem',
        borderRadius: '8px',
        marginBottom: '2rem'
      }}>
        <h2 style={{ color: '#333', marginBottom: '1rem' }}>Recommendation</h2>
        <p style={{ color: '#666', lineHeight: '1.6' }}>
          {lastResult.explanation}
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '1rem'
      }}>
        <div style={{ background: '#e3f2fd', padding: '1.5rem', borderRadius: '8px' }}>
          <h3 style={{ color: '#2196f3', marginBottom: '0.5rem' }}>Old Regime</h3>
          <p style={{ color: '#666', marginBottom: '0.5rem' }}>Deductions: {formatCurrency(lastResult.totalDeductionsOld)}</p>
          <p style={{ color: '#666', marginBottom: '0.5rem' }}>Taxable Income: {formatCurrency(lastResult.taxableIncomeOld)}</p>
          <p style={{ color: '#666', marginBottom: '0.5rem' }}>Tax Rate: {lastResult.effectiveRateOld.toFixed(2)}%</p>
          <p style={{ color: '#666', fontWeight: 'bold' }}>Take Home: {formatCurrency(lastResult.takeHomeOld)}</p>
        </div>

        <div style={{ background: '#e8f5e9', padding: '1.5rem', borderRadius: '8px' }}>
          <h3 style={{ color: '#4caf50', marginBottom: '0.5rem' }}>New Regime</h3>
          <p style={{ color: '#666', marginBottom: '0.5rem' }}>Deductions: {formatCurrency(lastResult.totalDeductionsNew)}</p>
          <p style={{ color: '#666', marginBottom: '0.5rem' }}>Taxable Income: {formatCurrency(lastResult.taxableIncomeNew)}</p>
          <p style={{ color: '#666', marginBottom: '0.5rem' }}>Tax Rate: {lastResult.effectiveRateNew.toFixed(2)}%</p>
          <p style={{ color: '#666', fontWeight: 'bold' }}>Take Home: {formatCurrency(lastResult.takeHomeNew)}</p>
        </div>
      </div>
    </div>
  )
}
