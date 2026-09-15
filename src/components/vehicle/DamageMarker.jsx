import React, { useState } from 'react'
import { TIPOS_DANIO } from '../../config/constants'

const colorPorTipo = {
  [TIPOS_DANIO.RAYON]:      '#f59e0b',
  [TIPOS_DANIO.ABOLLADURA]: '#ef4444',
  [TIPOS_DANIO.ROTURA]:     '#dc2626',
  [TIPOS_DANIO.FALTANTE]:   '#8b5cf6',
  [TIPOS_DANIO.OTRO]:       '#6b7280',
}

/**
 * Marcador visual de un daño sobre el SVG.
 * Se posiciona usando coordenadas normalizadas multiplicadas por svgW/svgH.
 *
 * @param {{
 *   danio: import('../../types/danio').Danio,
 *   svgW: number,
 *   svgH: number,
 * }} props
 */
export default function DamageMarker({ danio, svgW, svgH }) {
  const [showTooltip, setShowTooltip] = useState(false)
  const cx = danio.coordenadaX * svgW
  const cy = danio.coordenadaY * svgH
  const color = colorPorTipo[danio.tipoDanio] ?? '#6b7280'

  return (
    <g
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Anillo pulsante */}
      <circle cx={cx} cy={cy} r={14} fill={color} opacity={0.15} />
      <circle cx={cx} cy={cy} r={9} fill={color} opacity={0.35} />
      {/* Punto central */}
      <circle cx={cx} cy={cy} r={5} fill={color} stroke="white" strokeWidth={1.5} />

      {/* Tooltip */}
      {showTooltip && (
        <g>
          <rect
            x={cx + 10}
            y={cy - 28}
            width={Math.max(danio.descripcion.length * 6.5, 80)}
            height={danio.descripcion ? 44 : 26}
            rx={5}
            fill="#0f172a"
            stroke="#334155"
            strokeWidth={1}
          />
          <text x={cx + 16} y={cy - 12} fontSize={10} fill={color} fontWeight="bold">
            {danio.tipoDanio}
          </text>
          {danio.descripcion && (
            <text x={cx + 16} y={cy + 4} fontSize={9} fill="#94a3b8">
              {danio.descripcion.slice(0, 30)}{danio.descripcion.length > 30 ? '…' : ''}
            </text>
          )}
        </g>
      )}
    </g>
  )
}
