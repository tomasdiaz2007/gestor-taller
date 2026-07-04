import React from 'react'
import { ETIQUETAS_ESTADO, COLORES_ESTADO } from '../../config/status'

const colorMap = {
  blue:   'bg-blue-900/40 text-blue-300 border-blue-800',
  yellow: 'bg-yellow-900/40 text-yellow-300 border-yellow-800',
  orange: 'bg-orange-900/40 text-orange-300 border-orange-800',
  green:  'bg-emerald-900/40 text-emerald-300 border-emerald-800',
  gray:   'bg-slate-700/50 text-slate-300 border-slate-600',
}

/**
 * @param {{ estado: string, className?: string }} props
 */
export default function StatusBadge({ estado, className = '' }) {
  const color = COLORES_ESTADO[estado] ?? 'gray'
  const label = ETIQUETAS_ESTADO[estado] ?? estado

  return (
    <span
      className={`
        inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
        border ${colorMap[color]} ${className}
      `}
    >
      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${color === 'gray' ? 'bg-slate-400' : `bg-${color === 'blue' ? 'blue' : color === 'yellow' ? 'yellow' : color === 'orange' ? 'orange' : color === 'green' ? 'emerald' : 'slate'}-400`}`} />
      {label}
    </span>
  )
}
