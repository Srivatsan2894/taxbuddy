import { useState } from 'react'
import { clearAllStorage } from '../utils/storage'

export default function Settings() {
  const [showClearConfirm, setShowClearConfirm] = useState(false)

  const handleClearData = async () => {
    await clearAllStorage()
    setShowClearConfirm(false)
    alert('All data cleared successfully!')
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <h1 style={{ color: '#6200EA', marginBottom: '2rem' }}>Settings</h1>

      <div style={{
        background: '#f9f9f9',
        padding: '2rem',
        borderRadius: '8px',
        border: '1px solid #eee',
        marginBottom: '2rem'
      }}>
        <h2 style={{ color: '#333', marginBottom: '1rem' }}>App Information</h2>
        <div style={{ color: '#666', lineHeight: '2' }}>
          <p>
            <strong>App Name:</strong> TaxBuddy
          </p>
          <p>
            <strong>Version:</strong> 1.0.0
          </p>
          <p>
            <strong>Purpose:</strong> India's Smart Salary & Tax Companion
          </p>
          <p>
            <strong>Supported Tax Years:</strong> FY 2024-25, 2025-26, 2026-27
          </p>
        </div>
      </div>

      <div style={{
        background: '#f9f9f9',
        padding: '2rem',
        borderRadius: '8px',
        border: '1px solid #eee',
        marginBottom: '2rem'
      }}>
        <h2 style={{ color: '#333', marginBottom: '1rem' }}>How to Use TaxBuddy</h2>
        <ol style={{ color: '#666', lineHeight: '1.8' }}>
          <li>Go to Tax Calculator (Calculate tab)</li>
          <li>Enter your income details (Gross Salary, Bonus, etc.)</li>
          <li>Enter your deductions (80C, 80D, Home Loan Interest, etc.)</li>
          <li>Click "Calculate Tax"</li>
          <li>View detailed results comparing Old vs New Regime</li>
          <li>Check your tax health score and recommendations</li>
          <li>Visit Academy to learn more about tax planning</li>
        </ol>
      </div>

      <div style={{
        background: '#fff3e0',
        padding: '2rem',
        borderRadius: '8px',
        border: '2px solid #ff9800',
        marginBottom: '2rem'
      }}>
        <h2 style={{ color: '#e65100', marginBottom: '1rem' }}>⚠️ Important Disclaimers</h2>
        <ul style={{ color: '#666', lineHeight: '1.8' }}>
          <li>TaxBuddy provides general tax information for educational purposes</li>
          <li>Results are estimates based on current tax laws</li>
          <li>Consult with a qualified Chartered Accountant (CA) for personalized advice</li>
          <li>We are NOT responsible for any tax liability or penalties</li>
          <li>Tax laws change frequently - verify with official sources</li>
          <li>This app does NOT replace professional tax consultation</li>
        </ul>
      </div>

      <div style={{
        background: '#e3f2fd',
        padding: '2rem',
        borderRadius: '8px',
        border: '2px solid #2196f3',
        marginBottom: '2rem'
      }}>
        <h2 style={{ color: '#2196f3', marginBottom: '1rem' }}>🔒 Data & Privacy</h2>
        <p style={{ color: '#666', lineHeight: '1.8', marginBottom: '1rem' }}>
          Your calculations and personal information are stored locally on your device.
          We do NOT send your data to any server or third party.
          All data remains private and secure on your phone.
        </p>
        <p style={{ color: '#666', marginBottom: '1.5rem' }}>
          <strong>You can clear all data anytime using the button below.</strong>
        </p>

        {showClearConfirm ? (
          <div style={{
            background: '#ffebee',
            border: '2px solid #f44336',
            padding: '1.5rem',
            borderRadius: '4px'
          }}>
            <p style={{ color: '#c62828', marginBottom: '1rem', fontWeight: 'bold' }}>
              Are you sure you want to delete ALL data?
            </p>
            <p style={{ color: '#666', marginBottom: '1rem' }}>
              This action cannot be undone. All calculations and saved data will be permanently deleted.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                onClick={handleClearData}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: '#f44336',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                Yes, Delete All Data
              </button>
              <button
                onClick={() => setShowClearConfirm(false)}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: '#ccc',
                  color: '#333',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowClearConfirm(true)}
            style={{
              padding: '0.75rem 1.5rem',
              background: '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '600'
            }}
          >
            🗑️ Delete All Data
          </button>
        )}
      </div>

      <div style={{
        background: '#e8f5e9',
        padding: '2rem',
        borderRadius: '8px',
        border: '2px solid #4caf50'
      }}>
        <h2 style={{ color: '#2e7d32', marginBottom: '1rem' }}>✨ Key Features</h2>
        <ul style={{ color: '#666', lineHeight: '1.8' }}>
          <li>✅ Real-time tax calculations</li>
          <li>✅ Old vs New Regime comparison</li>
          <li>✅ Detailed tax breakdown</li>
          <li>✅ Tax health score</li>
          <li>✅ Deduction tracking (80C, 80D, NPS, etc.)</li>
          <li>✅ Tax education resources</li>
          <li>✅ Offline functionality</li>
          <li>✅ Dark mode support</li>
          <li>✅ Works on all Android devices</li>
          <li>✅ No internet required</li>
        </ul>
      </div>
    </div>
  )
}
