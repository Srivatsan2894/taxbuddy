import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Wizard from './pages/Wizard'
import Results from './pages/Results'
import Academy from './pages/Academy'
import Settings from './pages/Settings'

function App() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('darkMode')
    if (saved) setDarkMode(JSON.parse(saved))
  }, [])

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
    document.documentElement.style.filter = darkMode ? 'invert(1) hue-rotate(180deg)' : 'none'
  }, [darkMode])

  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar darkMode={darkMode} onDarkModeToggle={() => setDarkMode(!darkMode)} />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/wizard" element={<Wizard />} />
            <Route path="/results" element={<Results />} />
            <Route path="/academy" element={<Academy />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
