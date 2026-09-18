import { useState, useEffect } from 'react'

/**
 * PwaInstallPrompt
 *
 * Muestra un banner sutil en la parte inferior de la pantalla cuando el
 * navegador está listo para instalar la app. Si el usuario lo descarta,
 * se guarda en localStorage y no vuelve a aparecer.
 */
export default function PwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Si el usuario ya lo descartó antes, no mostrar
    if (localStorage.getItem('pwa-install-dismissed') === 'true') return

    const handler = (e) => {
      // Previene que Chrome muestre su mini-infobar por defecto
      e.preventDefault()
      setDeferredPrompt(e)
      setVisible(true)
    }

    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted') {
      setVisible(false)
    }
    setDeferredPrompt(null)
  }

  const handleDismiss = () => {
    localStorage.setItem('pwa-install-dismissed', 'true')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div style={{
      position: 'fixed',
      bottom: '1rem',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 100,
      width: 'min(420px, calc(100% - 2rem))',
      background: '#fff',
      border: '1px solid #dfe3e6',
      borderRadius: '8px',
      boxShadow: '0 4px 16px rgb(37 48 58 / 14%)',
      padding: '1rem 1.25rem',
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
    }}>
      <img
        src="/pwa-192x192.png"
        alt="AutoWare"
        style={{ width: '2.5rem', height: '2.5rem', borderRadius: '6px', flexShrink: 0 }}
      />

      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ margin: 0, fontWeight: 600, fontSize: '.9rem', color: '#263842' }}>
          Instalar AutoWare
        </p>
        <p style={{ margin: 0, fontSize: '.8rem', color: '#71808c' }}>
          Añade la app a tu pantalla de inicio para acceder más rápido.
        </p>
      </div>

      <div style={{ display: 'flex', gap: '.5rem', flexShrink: 0 }}>
        <button
          onClick={handleDismiss}
          style={{
            padding: '.4rem .7rem',
            border: '1px solid #b7c1c7',
            borderRadius: '4px',
            background: '#fff',
            color: '#52616a',
            fontSize: '.82rem',
            cursor: 'pointer',
          }}
        >
          Ahora no
        </button>
        <button
          onClick={handleInstall}
          style={{
            padding: '.4rem .8rem',
            border: '1px solid #536f7a',
            borderRadius: '4px',
            background: '#536f7a',
            color: '#fff',
            fontSize: '.82rem',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Instalar
        </button>
      </div>
    </div>
  )
}
