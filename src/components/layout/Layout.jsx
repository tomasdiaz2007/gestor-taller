import React, { useState } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'

export default function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="app-shell">
      <Sidebar isOpen={menuOpen} onNavigate={() => setMenuOpen(false)} />
      <div className="app-content">
        <Header onMenuToggle={() => setMenuOpen((open) => !open)} />
        <main className="app-main">
          {children}
        </main>
      </div>
    </div>
  )
}
