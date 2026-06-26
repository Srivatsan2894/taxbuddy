import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getFromStorage } from '../utils/storage'
import { TaxCalculationResult } from '../types/tax'

export default function Results() {
  const navigate = useNavigate()
  const [result, setResult] = useState<TaxCalculationResult | null>(null)

  useEffect(() => {
    getFromStorage('lastTaxResult').then(setResult)
  }, [])

  if (!result) {
    return <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem' }}><p>No results. Go to calculator first.</p></div>
  }

  const f = (v: number) => `₹${Math.round(v).toLocaleString('en-IN')}`

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem' }}>
      <h1 style={{ color: '#6200EA', marginBottom: '1rem' }}>Tax Results</h1>
      <div style={{ background: result.recommendedRegime === 'old' ? '#e3f2fd' : '#e8f5e9', border: `2px solid ${result.recommendedRegime === 'old' ? '#2196f3' : '#4caf50'}`, padding: '2rem', borderRadius: '8px', marginBottom: '2rem', textAlign: 'center' }}>
        <h2 style={{ color: result.recommendedRegime === 'old' ? '#2196f3' : '#4caf50' }}>Recommended: {result.recommendedRegime.toUpperCase()} REGIME</h2>
        <p style={{ fontSize: '2rem', fontWeight: 'bold', color: result.recommendedRegime === 'old' ? '#2196f3' : '#4caf50' }}>Save {f(result.savings)}</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
        <div style={{ background: '#e3f2fd', border: '2px solid #2196f3', padding: '2rem', borderRadius: '8px' }}>
          <h3 style={{ color: '#2196f3' }}>OLD REGIME</h3>
          <p>Taxable: {f(result.taxableIncomeOld)}</p>
          <p>Tax: {f(result.totalTaxOld)}</p>
          <p style={{ fontWeight: 'bold', marginTop: '1rem' }}>Take Home: {f(result.takeHomeOld)}</p>
        </div>
        <div style={{ background: '#e8f5e9', border: '2px solid #4caf50', padding: '2rem', borderRadius: '8px' }}>
          <h3 style={{ color: '#4caf50' }}>NEW REGIME</h3>
          <p>Taxable: {f(result.taxableIncomeNew)}</p>
          <p>Tax: {f(result.totalTaxNew)}</p>
          <p style={{ fontWeight: 'bold', marginTop: '1rem' }}>Take Home: {f(result.takeHomeNew)}</p>
        </div>
      </div>
      <button onClick={() => navigate('/wizard')} style={{ padding: '0.75rem 1.5rem', background: '#6200EA', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Calculate Again</button>
    </div>
  )
}
