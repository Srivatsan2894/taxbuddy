import { Link } from 'react-router-dom'

interface NavbarProps {
  darkMode: boolean
  onDarkModeToggle: () => void
}

export default function Navbar({ darkMode, onDarkModeToggle }: NavbarProps) {
  return (
    <nav style={{ backgroundColor: '#6200EA', color: 'white', padding: '1rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '1.5rem', fontWeight: 'bold' }}>💰 TaxBuddy</Link>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <Link to="/" style={{ color: 'white', textDecoration: 'none', padding: '0.5rem' }}>Home</Link>
          <Link to="/dashboard" style={{ color: 'white', textDecoration: 'none', padding: '0.5rem' }}>Dashboard</Link>
          <Link to="/wizard" style={{ color: 'white', textDecoration: 'none', padding: '0.5rem' }}>Calculate</Link>
          <Link to="/academy" style={{ color: 'white', textDecoration: 'none', padding: '0.5rem' }}>Academy</Link>
          <button onClick={onDarkModeToggle} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', padding: '0.5rem', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem' }}>{darkMode ? '☀️' : '🌙'}</button>
        </div>
      </div>
    </nav>
  )
}
