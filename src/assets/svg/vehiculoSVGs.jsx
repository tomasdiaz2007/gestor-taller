import React from 'react'

/**
 * SVG esquemático — Vista FRENTE del vehículo.
 * Diseñado para ser clickeable con coordenadas normalizadas.
 */
export function FronteVehiculo() {
  return (
    <g>
      {/* Carrocería principal */}
      <rect x="100" y="120" width="200" height="130" rx="12" fill="#334155" stroke="#475569" strokeWidth="2"/>
      {/* Capó */}
      <rect x="115" y="80" width="170" height="50" rx="8" fill="#3b4f65" stroke="#475569" strokeWidth="1.5"/>
      {/* Parabrisas */}
      <rect x="125" y="90" width="150" height="40" rx="5" fill="#1e3a5f" stroke="#60a5fa" strokeWidth="1.5" opacity="0.8"/>
      {/* Faros izquierdo */}
      <rect x="108" y="130" width="55" height="28" rx="6" fill="#1e3a5f" stroke="#60a5fa" strokeWidth="1.5"/>
      <ellipse cx="135" cy="144" rx="18" ry="10" fill="#fbbf24" opacity="0.7"/>
      {/* Faros derecho */}
      <rect x="237" y="130" width="55" height="28" rx="6" fill="#1e3a5f" stroke="#60a5fa" strokeWidth="1.5"/>
      <ellipse cx="265" cy="144" rx="18" ry="10" fill="#fbbf24" opacity="0.7"/>
      {/* Parrilla */}
      <rect x="155" y="198" width="90" height="22" rx="4" fill="#1e293b" stroke="#475569" strokeWidth="1.5"/>
      <line x1="168" y1="198" x2="168" y2="220" stroke="#475569" strokeWidth="1"/>
      <line x1="182" y1="198" x2="182" y2="220" stroke="#475569" strokeWidth="1"/>
      <line x1="196" y1="198" x2="196" y2="220" stroke="#475569" strokeWidth="1"/>
      <line x1="210" y1="198" x2="210" y2="220" stroke="#475569" strokeWidth="1"/>
      <line x1="224" y1="198" x2="224" y2="220" stroke="#475569" strokeWidth="1"/>
      {/* Logo central */}
      <circle cx="200" cy="175" r="12" fill="#1d4ed8" stroke="#60a5fa" strokeWidth="1.5"/>
      {/* Ruedas */}
      <circle cx="135" cy="255" r="28" fill="#1e293b" stroke="#475569" strokeWidth="2"/>
      <circle cx="135" cy="255" r="16" fill="#0f172a" stroke="#475569" strokeWidth="1.5"/>
      <circle cx="265" cy="255" r="28" fill="#1e293b" stroke="#475569" strokeWidth="2"/>
      <circle cx="265" cy="255" r="16" fill="#0f172a" stroke="#475569" strokeWidth="1.5"/>
      {/* Parachoques */}
      <rect x="95" y="220" width="210" height="18" rx="5" fill="#374151" stroke="#475569" strokeWidth="1.5"/>
    </g>
  )
}

/**
 * SVG esquemático — Vista TRASERA del vehículo.
 */
export function TraseraVehiculo() {
  return (
    <g>
      {/* Carrocería */}
      <rect x="100" y="100" width="200" height="150" rx="12" fill="#334155" stroke="#475569" strokeWidth="2"/>
      {/* Luneta */}
      <rect x="120" y="108" width="160" height="45" rx="5" fill="#1e3a5f" stroke="#60a5fa" strokeWidth="1.5" opacity="0.8"/>
      {/* Portalón/baúl */}
      <rect x="115" y="155" width="170" height="55" rx="4" fill="#3b4f65" stroke="#475569" strokeWidth="1.5"/>
      {/* Manija */}
      <rect x="180" y="187" width="40" height="8" rx="4" fill="#1e293b" stroke="#475569" strokeWidth="1"/>
      {/* Luces traseras izquierda */}
      <rect x="105" y="108" width="18" height="70" rx="5" fill="#1e293b" stroke="#ef4444" strokeWidth="1.5"/>
      <rect x="106" y="110" width="16" height="30" rx="3" fill="#ef4444" opacity="0.7"/>
      {/* Luces traseras derecha */}
      <rect x="277" y="108" width="18" height="70" rx="5" fill="#1e293b" stroke="#ef4444" strokeWidth="1.5"/>
      <rect x="278" y="110" width="16" height="30" rx="3" fill="#ef4444" opacity="0.7"/>
      {/* Escape */}
      <ellipse cx="175" cy="255" rx="12" ry="8" fill="#0f172a" stroke="#475569" strokeWidth="1.5"/>
      <ellipse cx="225" cy="255" rx="12" ry="8" fill="#0f172a" stroke="#475569" strokeWidth="1.5"/>
      {/* Parachoques trasero */}
      <rect x="95" y="215" width="210" height="20" rx="5" fill="#374151" stroke="#475569" strokeWidth="1.5"/>
      {/* Ruedas */}
      <circle cx="135" cy="268" r="28" fill="#1e293b" stroke="#475569" strokeWidth="2"/>
      <circle cx="135" cy="268" r="16" fill="#0f172a" stroke="#475569" strokeWidth="1.5"/>
      <circle cx="265" cy="268" r="28" fill="#1e293b" stroke="#475569" strokeWidth="2"/>
      <circle cx="265" cy="268" r="16" fill="#0f172a" stroke="#475569" strokeWidth="1.5"/>
    </g>
  )
}

/**
 * SVG esquemático — Vista LATERAL del vehículo (izquierdo y derecho usan el mismo)
 */
export function LateralVehiculo() {
  return (
    <g>
      {/* Carrocería principal — perfil */}
      <path
        d="M60 200 L60 160 Q65 130 110 115 L170 100 Q200 90 240 90 L310 90 Q350 90 370 110 L390 140 L400 165 L400 200 Z"
        fill="#334155" stroke="#475569" strokeWidth="2"
      />
      {/* Techo */}
      <path
        d="M110 115 L115 90 Q130 70 155 68 L285 68 Q320 68 340 90 L370 110"
        fill="#3b4f65" stroke="#475569" strokeWidth="1.5"
      />
      {/* Parabrisas delantero */}
      <path
        d="M115 112 L120 88 Q130 72 152 70 L195 70 L200 88 L175 115 Z"
        fill="#1e3a5f" stroke="#60a5fa" strokeWidth="1.5" opacity="0.85"
      />
      {/* Luneta trasera */}
      <path
        d="M280 70 L330 70 Q345 70 355 88 L360 110 L320 115 L295 90 Z"
        fill="#1e3a5f" stroke="#60a5fa" strokeWidth="1.5" opacity="0.85"
      />
      {/* Puerta delantera */}
      <rect x="165" y="118" width="95" height="75" rx="4" fill="#3b4f65" stroke="#475569" strokeWidth="1.5"/>
      <circle cx="255" cy="158" r="5" fill="#94a3b8"/>
      {/* Puerta trasera */}
      <rect x="265" y="118" width="90" height="75" rx="4" fill="#3b4f65" stroke="#475569" strokeWidth="1.5"/>
      <circle cx="270" cy="158" r="5" fill="#94a3b8"/>
      {/* Faro delantero */}
      <path d="M60 160 L95 145 L100 175 L62 185 Z" fill="#1e3a5f" stroke="#60a5fa" strokeWidth="1.5"/>
      <ellipse cx="80" cy="165" rx="14" ry="10" fill="#fbbf24" opacity="0.7"/>
      {/* Faro trasero */}
      <rect x="386" y="145" width="16" height="45" rx="3" fill="#1e293b" stroke="#ef4444" strokeWidth="1.5"/>
      <rect x="387" y="146" width="14" height="22" rx="2" fill="#ef4444" opacity="0.8"/>
      {/* Escape */}
      <ellipse cx="395" cy="205" rx="8" ry="5" fill="#0f172a" stroke="#475569" strokeWidth="1"/>
      {/* Rueda delantera */}
      <circle cx="130" cy="220" r="34" fill="#1e293b" stroke="#475569" strokeWidth="2.5"/>
      <circle cx="130" cy="220" r="20" fill="#0f172a" stroke="#475569" strokeWidth="2"/>
      <circle cx="130" cy="220" r="8" fill="#1e293b" stroke="#64748b" strokeWidth="1"/>
      {/* Rueda trasera */}
      <circle cx="330" cy="220" r="34" fill="#1e293b" stroke="#475569" strokeWidth="2.5"/>
      <circle cx="330" cy="220" r="20" fill="#0f172a" stroke="#475569" strokeWidth="2"/>
      <circle cx="330" cy="220" r="8" fill="#1e293b" stroke="#64748b" strokeWidth="1"/>
      {/* Umbral */}
      <rect x="95" y="195" width="265" height="12" rx="4" fill="#475569"/>
    </g>
  )
}
