import { useState, useEffect } from 'react'
import { getFromStorage } from '../utils/storage'
import { TaxResult } from '../types/tax'

export default function Dashboard() {
  const [result, setResult] = useState<TaxResult | null>(null)

  useEffect(() => {
    getFromStorage('lastTaxResult').then(setResult)
  }, [])

  if (!result) {
    return (
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        <h1 style={{ color: '#6200EA', marginBottom: '2rem' }}>Dashboard</h1>
        <div style={{ border: '2px dashed #ddd', padding: '3rem', textAlign: 'center', borderRadius: '8px', color: '#999' }}>
          <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>No calculations yet</p>
          <p>Use the Tax Calculator to get started!</p>
        </div>
      </div>
    )
  }

  const f = (v: number) => `₹${Math.round(v).toLocaleString('en-IN')}`

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      <h1 style={{ color: '#6200EA', marginBottom: '1rem' }}>Dashboard</h1>
      <p style={{ color: '#666', marginBottom: '2rem' }}>Last Calculation: {new Date(result.calculatedAt).toLocaleDateString()}</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <div style={{ background: '#e3f2fd', padding: '1.5rem', borderRadius: '8px', border: '2px solid #2196f3' }}>
          <p style={{ color: '#666', fontSize: '0.9rem' }}>Gross Income</p>
          <p style={{ fontSize: '1.5rem', color: '#2196f3', fontWeight: 'bold', marginTop: '0.5rem' }}>{f(result.grossIncome)}</p>
        </div>
        <div style={{ background: '#f3e5f5', padding: '1.5rem', borderRadius: '8px', border: '2px solid #9c27b0' }}>
          <p style={{ color: '#666', fontSize: '0.9rem' }}>Old Regime Tax</p>
          <p style={{ fontSize: '1.5rem', color: '#9c27b0', fontWeight: 'bold', marginTop: '0.5rem' }}>{f(result.oldRegimeTax)}</p>
        </div>
        <div style={{ background: '#e8f5e9', padding: '1.5rem', borderRadius: '8px', border: '2px solid #4caf50' }}>
          <p style={{ color: '#666', fontSize: '0.9rem' }}>New Regime Tax</p>
          <p style={{ fontSize: '1.5rem', color: '#4caf50', fontWeight: 'bold', marginTop: '0.5rem' }}>{f(result.newRegimeTax)}</p>
        </div>
        <div style={{ background: '#fff3e0', padding: '1.5rem', borderRadius: '8px', border: '2px solid #ff9800' }}>
          <p style={{ color: '#666', fontSize: '0.9rem' }}>Tax Savings</p>
          <p style={{ fontSize: '1.5rem', color: '#ff9800', fontWeight: 'bold', marginTop: '0.5rem' }}>{f(result.savings)}</p>
        </div>
      </div>
      <div style={{ background: '#f5f5f5', padding: '1.5rem', borderRadius: '8px' }}>
        <h2 style={{ color: '#333', marginBottom: '0.5rem' }}>Recommendation</h2>
        <p style={{ color: '#666', lineHeight: '1.6' }}>{result.explanation}</p>
      </div>
    </div>
  )
}
