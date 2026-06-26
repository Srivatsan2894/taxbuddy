import { useState } from 'react'
import { clearAllStorage } from '../utils/storage'

export default function Settings() {
  const [showClearConfirm, setShowClearConfirm] = useState(false)

  const handleClearData = async () => {
    await clearAllStorage()
    setShowClearConfirm(false)
    alert('Data cleared!')
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <h1 style={{ color: '#6200EA', marginBottom: '2rem' }}>Settings</h1>
      <div style={{ background: '#f9f9f9', padding: '2rem', borderRadius: '8px', marginBottom: '2rem' }}>
        <h2>About TaxBuddy</h2>
        <p>Version: 1.0.0</p>
        <p>India's Smart Salary & Tax Companion</p>
      </div>
      <div style={{ background: '#fff3e0', padding: '2rem', borderRadius: '8px' }}>
        <h2 style={{ color: '#e65100' }}>⚠️ Data Management</h2>
        <p>All data is stored locally on your device.</p>
        {showClearConfirm ? (
          <div>
            <p style={{ fontWeight: 'bold', color: '#c62828' }}>Delete all data? This cannot be undone.</p>
            <button onClick={handleClearData} style={{ background: '#f44336', color: 'white', border: 'none', padding: '0.5rem 1rem', marginRight: '0.5rem', borderRadius: '4px', cursor: 'pointer' }}>Yes, Delete</button>
            <button onClick={() => setShowClearConfirm(false)} style={{ background: '#ccc', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>
          </div>
        ) : (
          <button onClick={() => setShowClearConfirm(true)} style={{ background: '#f44336', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer', marginTop: '1rem' }}>🗑️ Delete All Data</button>
        )}
      </div>
    </div>
  )
}
