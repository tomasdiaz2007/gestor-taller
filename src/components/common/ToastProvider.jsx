import React, { createContext, useContext, useState, useCallback } from 'react'
import Toast from "./Toast"

const ToastContext = createContext(null)

let _toastId = 0

/**
 * Proveedor global de toasts.
 * Usar useToast() en cualquier componente para mostrar notificaciones.
 */
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback((message, type = 'info') => {
    const id = ++_toastId
    setToasts((prev) => [...prev, { id, message, type }])
  }, [])

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={addToast}>
      {children}
      {/* Portal de toasts — esquina inferior derecha */}
      <div className="fixed bottom-5 right-5 z-[100] flex flex-col gap-2 min-w-[280px] max-w-sm">
        {toasts.map((t) => (
          <Toast key={t.id} message={t.message} type={t.type} onClose={() => removeToast(t.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

/**
 * Hook para mostrar toasts desde cualquier componente.
 * @returns {(message: string, type?: 'success'|'error'|'warning'|'info') => void}
 */
export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast debe usarse dentro de ToastProvider')
  return ctx
}
