import React from 'react'
import { ETIQUETAS_ESTADO, COLORES_ESTADO } from '../../config/status'

/**
 * @param {{ estado: string, className?: string }} props
 */
export default function StatusBadge({ estado, className = '' }) {
  const color = COLORES_ESTADO[estado] ?? 'gray'
  const label = ETIQUETAS_ESTADO[estado] ?? estado

  return (
    <span
      className={`status-badge status-badge--${color} ${className}`}
    >
      <span aria-hidden="true" />
      {label}
    </span>
  )
}
