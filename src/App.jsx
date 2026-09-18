import React from 'react'
import AppRouter from './routes/AppRouter'
import { ToastProvider } from './components/common/ToastProvider'
import PwaInstallPrompt from './components/PwaInstallPrompt'

export default function App() {
  return (
    <ToastProvider>
      <AppRouter />
      <PwaInstallPrompt />
    </ToastProvider>
  )
}
