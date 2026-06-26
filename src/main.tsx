import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Capacitor } from '@capacitor/core'

// Initialize Capacitor if on native platform
if (Capacitor.isNativePlatform()) {
  import('@capacitor/app').then(({ App }) => {
    App.addListener('backButton', () => {
      if (window.location.pathname === '/') {
        App.exitApp()
      } else {
        window.history.back()
      }
    })
  })
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
