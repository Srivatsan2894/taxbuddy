import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#6200EA', marginBottom: '0.5rem' }}>Welcome to TaxBuddy</h1>
        <p style={{ fontSize: '1.2rem', color: '#666' }}>India's Smart Salary & Tax Companion</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
        <div style={{ border: '1px solid #ddd', padding: '2rem', borderRadius: '8px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📊</div>
          <h3>Dashboard</h3>
          <p style={{ color: '#666', marginTop: '0.5rem' }}>View your tax summary and insights</p>
          <Link to="/dashboard" style={{ display: 'inline-block', marginTop: '1rem', padding: '0.5rem 1rem', background: '#6200EA', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>View</Link>
        </div>
        <div style={{ border: '1px solid #ddd', padding: '2rem', borderRadius: '8px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🧮</div>
          <h3>Tax Calculator</h3>
          <p style={{ color: '#666', marginTop: '0.5rem' }}>Compare Old vs New tax regime</p>
          <Link to="/wizard" style={{ display: 'inline-block', marginTop: '1rem', padding: '0.5rem 1rem', background: '#6200EA', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>Calculate</Link>
        </div>
        <div style={{ border: '1px solid #ddd', padding: '2rem', borderRadius: '8px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📚</div>
          <h3>Tax Academy</h3>
          <p style={{ color: '#666', marginTop: '0.5rem' }}>Learn about Indian tax system</p>
          <Link to="/academy" style={{ display: 'inline-block', marginTop: '1rem', padding: '0.5rem 1rem', background: '#6200EA', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>Learn</Link>
        </div>
      </div>
      <div style={{ background: '#f0f4ff', padding: '2rem', borderRadius: '8px' }}>
        <h2 style={{ color: '#6200EA', marginBottom: '1rem' }}>Features</h2>
        <ul style={{ color: '#666', lineHeight: '1.8' }}>
          <li>✅ Calculate taxes for FY 2024-25, 2025-26, 2026-27</li>
          <li>✅ Compare Old Regime vs New Regime instantly</li>
          <li>✅ Detailed tax breakdown with explanations</li>
          <li>✅ Track deductions (80C, 80D, NPS, etc.)</li>
          <li>✅ Tax health score</li>
          <li>✅ Educational resources on tax planning</li>
          <li>✅ Save and manage calculations</li>
        </ul>
      </div>
    </div>
  )
}
