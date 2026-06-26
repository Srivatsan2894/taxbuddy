import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav style={{ backgroundColor: '#6200EA', color: 'white', padding: '1rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>💰 TaxBuddy</Link>
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
          <Link to="/dashboard" style={{ color: 'white', textDecoration: 'none' }}>Dashboard</Link>
          <Link to="/calculator" style={{ color: 'white', textDecoration: 'none' }}>Calculate</Link>
          <Link to="/academy" style={{ color: 'white', textDecoration: 'none' }}>Academy</Link>
          <Link to="/settings" style={{ color: 'white', textDecoration: 'none' }}>Settings</Link>
        </div>
      </div>
    </nav>
  )
}
