import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getFromStorage } from '../utils/storage'
import { TaxResult } from '../types/tax'

export default function Results() {
  const navigate = useNavigate()
  const [result, setResult] = useState<TaxResult | null>(null)

  useEffect(() => {
    getFromStorage('lastTaxResult').then(setResult)
  }, [])

  if (!result) {
    return (
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        <h1>No results found</h1>
        <button onClick={() => navigate('/calculator')} style={{ padding: '0.75rem 1.5rem', background: '#6200EA', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Go to Calculator</button>
      </div>
    )
  }

  const f = (v: number) => `₹${Math.round(v).toLocaleString('en-IN')}`

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      <h1 style={{ color: '#6200EA', marginBottom: '1rem' }}>Tax Results</h1>
      <div style={{ background: result.recommended === 'old' ? '#e3f2fd' : '#e8f5e9', border: `2px solid ${result.recommended === 'old' ? '#2196f3' : '#4caf50'}`, padding: '2rem', borderRadius: '8px', marginBottom: '2rem', textAlign: 'center' }}>
        <h2 style={{ color: result.recommended === 'old' ? '#2196f3' : '#4caf50', marginBottom: '0.5rem' }}>Recommended: {result.recommended.toUpperCase()} REGIME</h2>
        <p style={{ fontSize: '2rem', fontWeight: 'bold', color: result.recommended === 'old' ? '#2196f3' : '#4caf50', marginBottom: '0.5rem' }}>Save {f(result.savings)}</p>
        <p style={{ color: '#666' }}>{result.explanation}</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
        <div style={{ background: '#e3f2fd', border: '2px solid #2196f3', padding: '2rem', borderRadius: '8px' }}>
          <h3 style={{ color: '#2196f3', marginBottom: '1rem' }}>OLD REGIME</h3>
          <div style={{ lineHeight: '2' }}>
            <div><span>Gross Income:</span> <strong>{f(result.grossIncome)}</strong></div>
            <div><span>Tax:</span> <strong>{f(result.oldRegimeTax)}</strong></div>
            <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #bbb' }}>
              <span style={{ fontWeight: 'bold' }}>Effective Rate:</span> <strong>{((result.oldRegimeTax / result.grossIncome) * 100).toFixed(2)}%</strong>
            </div>
          </div>
        </div>
        <div style={{ background: '#e8f5e9', border: '2px solid #4caf50', padding: '2rem', borderRadius: '8px' }}>
          <h3 style={{ color: '#4caf50', marginBottom: '1rem' }}>NEW REGIME</h3>
          <div style={{ lineHeight: '2' }}>
            <div><span>Gross Income:</span> <strong>{f(result.grossIncome)}</strong></div>
            <div><span>Tax:</span> <strong>{f(result.newRegimeTax)}</strong></div>
            <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #bbb' }}>
              <span style={{ fontWeight: 'bold' }}>Effective Rate:</span> <strong>{((result.newRegimeTax / result.grossIncome) * 100).toFixed(2)}%</strong>
            </div>
          </div>
        </div>
      </div>
      <button onClick={() => navigate('/calculator')} style={{ padding: '0.75rem 1.5rem', background: '#6200EA', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '0.5rem' }}>Calculate Again</button>
      <button onClick={() => navigate('/dashboard')} style={{ padding: '0.75rem 1.5rem', background: '#666', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Go to Dashboard</button>
    </div>
  )
}
