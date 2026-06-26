import { useState } from 'react'
import { clearStorage } from '../utils/storage'

export default function Settings() {
  const [showClearConfirm, setShowClearConfirm] = useState(false)

  const handleClearData = async () => {
    await clearStorage()
    setShowClearConfirm(false)
    alert('All data cleared!')
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <h1 style={{ color: '#6200EA', marginBottom: '2rem' }}>Settings</h1>
      <div style={{ background: '#f9f9f9', padding: '1.5rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
        <h2 style={{ color: '#333', marginBottom: '0.5rem' }}>About TaxBuddy</h2>
        <p style={{ color: '#666' }}>Version: 1.0.0</p>
        <p style={{ color: '#666', marginTop: '0.5rem' }}>India's Smart Salary & Tax Companion</p>
      </div>
      <div style={{ background: '#fff3e0', border: '2px solid #ff9800', padding: '1.5rem', borderRadius: '8px' }}>
        <h2 style={{ color: '#e65100', marginBottom: '1rem' }}>⚠️ Data Management</h2>
        <p style={{ color: '#666', marginBottom: '1.5rem' }}>All your data is stored locally on your device. You can clear it anytime.</p>
        {showClearConfirm ? (
          <div>
            <p style={{ color: '#c62828', fontWeight: 'bold', marginBottom: '1rem' }}>This will delete all calculations and data permanently!</p>
            <button onClick={handleClearData} style={{ padding: '0.75rem 1.5rem', background: '#f44336', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '0.5rem' }}>Yes, Delete All</button>
            <button onClick={() => setShowClearConfirm(false)} style={{ padding: '0.75rem 1.5rem', background: '#ccc', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>
          </div>
        ) : (
          <button onClick={() => setShowClearConfirm(true)} style={{ padding: '0.75rem 1.5rem', background: '#f44336', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>🗑️ Delete All Data</button>
        )}
      </div>
    </div>
  )
}
