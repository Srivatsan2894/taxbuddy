import { useState, useEffect } from 'react'
import { getFromStorage } from '../utils/storage'
import { TaxCalculationResult } from '../types/tax'

export default function Dashboard() {
  const [lastResult, setLastResult] = useState<TaxCalculationResult | null>(null)

  useEffect(() => {
    getFromStorage('lastTaxResult').then(setLastResult)
  }, [])

  if (!lastResult) {
    return <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem' }}><h1 style={{ color: '#6200EA' }}>Dashboard</h1><p>No calculations yet. Use the calculator to get started!</p></div>
  }

  const f = (v: number) => `₹${Math.round(v).toLocaleString('en-IN')}`

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem' }}>
      <h1 style={{ color: '#6200EA', marginBottom: '1rem' }}>Dashboard</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
        <div style={{ background: '#e3f2fd', padding: '1.5rem', borderRadius: '8px' }}>
          <p style={{ color: '#666' }}>Gross Income</p>
          <p style={{ fontSize: '1.5rem', color: '#2196f3', fontWeight: 'bold' }}>{f(lastResult.grossIncomeOld)}</p>
        </div>
        <div style={{ background: '#f3e5f5', padding: '1.5rem', borderRadius: '8px' }}>
          <p style={{ color: '#666' }}>Old Regime Tax</p>
          <p style={{ fontSize: '1.5rem', color: '#9c27b0', fontWeight: 'bold' }}>{f(lastResult.totalTaxOld)}</p>
        </div>
        <div style={{ background: '#e8f5e9', padding: '1.5rem', borderRadius: '8px' }}>
          <p style={{ color: '#666' }}>New Regime Tax</p>
          <p style={{ fontSize: '1.5rem', color: '#4caf50', fontWeight: 'bold' }}>{f(lastResult.totalTaxNew)}</p>
        </div>
        <div style={{ background: '#fff3e0', padding: '1.5rem', borderRadius: '8px' }}>
          <p style={{ color: '#666' }}>Tax Savings</p>
          <p style={{ fontSize: '1.5rem', color: '#ff9800', fontWeight: 'bold' }}>{f(lastResult.savings)}</p>
        </div>
      </div>
      <div style={{ background: '#f5f5f5', padding: '1.5rem', borderRadius: '8px', marginTop: '1rem' }}>
        <h2>Recommendation</h2>
        <p style={{ color: '#666' }}>{lastResult.explanation}</p>
      </div>
    </div>
  )
}
