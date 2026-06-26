import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getFromStorage } from '../utils/storage'
import { TaxCalculationResult } from '../types/tax'

export default function Results() {
  const navigate = useNavigate()
  const [result, setResult] = useState<TaxCalculationResult | null>(null)

  useEffect(() => {
    const loadResult = async () => {
      const data = await getFromStorage('lastTaxResult')
      setResult(data)
    }
    loadResult()
  }, [])

  if (!result) {
    return (
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem' }}>
        <p>No results found. Please calculate taxes first.</p>
        <button
          onClick={() => navigate('/wizard')}
          style={{
            padding: '0.75rem 1.5rem',
            background: '#6200EA',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Go to Calculator
        </button>
      </div>
    )
  }

  const formatCurrency = (value: number) => `₹${Math.round(value).toLocaleString('en-IN')}`

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem' }}>
      <h1 style={{ color: '#6200EA', marginBottom: '0.5rem' }}>Tax Calculation Results</h1>
      <p style={{ color: '#666', marginBottom: '2rem' }}>{result.fy} | {new Date(result.calculatedAt).toLocaleDateString()}</p>

      <div style={{
        background: result.recommendedRegime === 'old' ? '#e3f2fd' : '#e8f5e9',
        border: `2px solid ${result.recommendedRegime === 'old' ? '#2196f3' : '#4caf50'}`,
        padding: '2rem',
        borderRadius: '8px',
        marginBottom: '2rem',
        textAlign: 'center'
      }}>
        <h2 style={{ color: result.recommendedRegime === 'old' ? '#2196f3' : '#4caf50', marginBottom: '0.5rem' }}>
          Recommended: {result.recommendedRegime === 'old' ? 'OLD' : 'NEW'} REGIME
        </h2>
        <p style={{ fontSize: '2rem', fontWeight: 'bold', color: result.recommendedRegime === 'old' ? '#2196f3' : '#4caf50', marginBottom: '0.5rem' }}>
          Save {formatCurrency(result.savings)}
        </p>
        <p style={{ color: '#666', lineHeight: '1.6' }}>{result.explanation}</p>
      </div>

      <h2 style={{ color: '#333', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid #6200EA' }}>
        Income Overview
      </h2>
      <div style={{
        background: '#f5f5f5',
        padding: '1.5rem',
        borderRadius: '8px',
        marginBottom: '2rem'
      }}>
        <p style={{ color: '#666', marginBottom: '0.5rem' }}>
          <strong>Gross Income:</strong> {formatCurrency(result.grossIncomeOld)}
        </p>
        <p style={{ color: '#666', marginBottom: '0.5rem' }}>
          <strong>Old Regime Deductions:</strong> {formatCurrency(result.totalDeductionsOld)}
        </p>
        <p style={{ color: '#666' }}>
          <strong>New Regime Standard Deduction:</strong> {formatCurrency(result.totalDeductionsNew)}
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
        marginBottom: '2rem'
      }}>
        <div style={{
          background: '#e3f2fd',
          border: '2px solid #2196f3',
          padding: '2rem',
          borderRadius: '8px'
        }}>
          <h3 style={{ color: '#2196f3', textAlign: 'center', marginBottom: '1.5rem' }}>OLD REGIME</h3>
          <div style={{ lineHeight: '2' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #bbb', paddingBottom: '0.5rem' }}>
              <span>Taxable Income:</span>
              <strong>{formatCurrency(result.taxableIncomeOld)}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #bbb', paddingBottom: '0.5rem' }}>
              <span>Tax (before surcharge):</span>
              <strong>{formatCurrency(result.taxBeforeSurchargeOld)}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #bbb', paddingBottom: '0.5rem' }}>
              <span>Surcharge:</span>
              <strong>{formatCurrency(result.surchargeOld)}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #bbb', paddingBottom: '0.5rem' }}>
              <span>Cess (4%):</span>
              <strong>{formatCurrency(result.cessOld)}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', background: '#fff9c4', padding: '0.5rem', borderRadius: '4px', marginTop: '1rem' }}>
              <span style={{ fontWeight: 'bold' }}>Total Tax:</span>
              <strong style={{ fontSize: '1.2rem', color: '#2196f3' }}>{formatCurrency(result.totalTaxOld)}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', padding: '0.5rem', background: '#e8f5e9', borderRadius: '4px' }}>
              <span style={{ fontWeight: 'bold' }}>Take Home:</span>
              <strong style={{ fontSize: '1.2rem', color: '#4caf50' }}>{formatCurrency(result.takeHomeOld)}</strong>
            </div>
            <div style={{ marginTop: '1rem', padding: '0.5rem', background: '#fff3e0', borderRadius: '4px' }}>
              <p style={{ fontSize: '0.9rem', color: '#666' }}>
                <strong>Effective Tax Rate:</strong> {result.effectiveRateOld.toFixed(2)}%
              </p>
            </div>
          </div>
        </div>

        <div style={{
          background: '#e8f5e9',
          border: '2px solid #4caf50',
          padding: '2rem',
          borderRadius: '8px'
        }}>
          <h3 style={{ color: '#4caf50', textAlign: 'center', marginBottom: '1.5rem' }}>NEW REGIME</h3>
          <div style={{ lineHeight: '2' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #bbb', paddingBottom: '0.5rem' }}>
              <span>Taxable Income:</span>
              <strong>{formatCurrency(result.taxableIncomeNew)}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #bbb', paddingBottom: '0.5rem' }}>
              <span>Tax (before surcharge):</span>
              <strong>{formatCurrency(result.taxBeforeSurchargeNew)}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #bbb', paddingBottom: '0.5rem' }}>
              <span>Surcharge:</span>
              <strong>{formatCurrency(result.surchargeNew)}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #bbb', paddingBottom: '0.5rem' }}>
              <span>Cess (4%):</span>
              <strong>{formatCurrency(result.cessNew)}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', background: '#fff9c4', padding: '0.5rem', borderRadius: '4px', marginTop: '1rem' }}>
              <span style={{ fontWeight: 'bold' }}>Total Tax:</span>
              <strong style={{ fontSize: '1.2rem', color: '#4caf50' }}>{formatCurrency(result.totalTaxNew)}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', padding: '0.5rem', background: '#e8f5e9', borderRadius: '4px' }}>
              <span style={{ fontWeight: 'bold' }}>Take Home:</span>
              <strong style={{ fontSize: '1.2rem', color: '#4caf50' }}>{formatCurrency(result.takeHomeNew)}</strong>
            </div>
            <div style={{ marginTop: '1rem', padding: '0.5rem', background: '#fff3e0', borderRadius: '4px' }}>
              <p style={{ fontSize: '0.9rem', color: '#666' }}>
                <strong>Effective Tax Rate:</strong> {result.effectiveRateNew.toFixed(2)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      <div style={{
        background: '#f0f4ff',
        padding: '2rem',
        borderRadius: '8px',
        marginBottom: '2rem'
      }}>
        <h2 style={{ color: '#6200EA', marginBottom: '1rem' }}>Tax Health Score</h2>
        <div style={{ fontSize: '3rem', color: '#6200EA', fontWeight: 'bold', textAlign: 'center', marginBottom: '1rem' }}>
          {result.taxHealthScore}/100
        </div>
        <p style={{ color: '#666', textAlign: 'center' }}>
          {result.taxHealthScore >= 80 ? '✅ Excellent tax planning' : result.taxHealthScore >= 60 ? '⚠️ Good, but can be improved' : '❌ Consider more deductions'}
        </p>
      </div>

      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <button
          onClick={() => navigate('/wizard')}
          style={{
            padding: '0.75rem 1.5rem',
            background: '#6200EA',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          Calculate Again
        </button>
        <button
          onClick={() => navigate('/dashboard')}
          style={{
            padding: '0.75rem 1.5rem',
            background: '#666',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  )
}
