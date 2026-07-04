import React, { useEffect } from 'react'

const icons = {
  success: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  ),
  error: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  warning: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
    </svg>
  ),
  info: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
}

const styles = {
  success: 'bg-emerald-900/80 border-emerald-700 text-emerald-200',
  error:   'bg-red-900/80 border-red-700 text-red-200',
  warning: 'bg-amber-900/80 border-amber-700 text-amber-200',
  info:    'bg-blue-900/80 border-blue-700 text-blue-200',
}

/**
 * @param {{
 *   message: string,
 *   type?: 'success'|'error'|'warning'|'info',
 *   onClose: () => void,
 *   duration?: number,
 * }} props
 */
export default function Toast({ message, type = 'info', onClose, duration = 4000 }) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration)
    return () => clearTimeout(timer)
  }, [onClose, duration])

  return (
    <div
      className={`
        flex items-start gap-3 px-4 py-3 rounded-xl border shadow-2xl
        backdrop-blur-sm text-sm font-medium animate-fade-in
        ${styles[type]}
      `}
    >
      <span className="mt-0.5 flex-shrink-0">{icons[type]}</span>
      <span className="flex-1">{message}</span>
      <button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100 flex-shrink-0">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  )
}
