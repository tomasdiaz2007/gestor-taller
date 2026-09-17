import React, { useRef } from 'react'
import { VISTAS_VEHICULO } from '../../config/constants'
import { FronteVehiculo, TraseraVehiculo, LateralVehiculo } from '../../assets/svg/vehiculoSVGs'
import DamageMarker from './DamageMarker'

const SVG_W = 460
const SVG_H = 320

/**
 * Renderiza la carrocería SVG correspondiente a la vista activa.
 */
function VehicleBody({ vista }) {
  switch (vista) {
    case VISTAS_VEHICULO.FRENTE:   return <FronteVehiculo />
    case VISTAS_VEHICULO.TRASERA:  return <TraseraVehiculo />
    case VISTAS_VEHICULO.LATERAL_IZQUIERDO:
    case VISTAS_VEHICULO.LATERAL_DERECHO:
      return (
        <g transform={vista === VISTAS_VEHICULO.LATERAL_DERECHO ? `scale(-1,1) translate(-${SVG_W},0)` : ''}>
          <LateralVehiculo />
        </g>
      )
    default: return null
  }
}

/**
 * Vista SVG interactiva del vehículo.
 * Captura clicks y normaliza las coordenadas a 0.0–1.0.
 *
 * @param {{
 *   vista: string,
 *   danios: import('../../types/danio').Danio[],
 *   onClickSVG: (x: number, y: number) => void,
 *   onDanioClick?: (danio: import('../../types/danio').Danio) => void,
 *   readonly: boolean,
 * }} props
 */
export default function VehicleView({ vista, danios, onClickSVG, onDanioClick, readonly }) {
  const svgRef = useRef(null)

  const daniosDeLaVista = danios.filter((d) => d.vista === vista)

  const handleClick = (e) => {
    if (readonly) return
    const rect = svgRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    onClickSVG(
      Math.round(x * 1000) / 1000,
      Math.round(y * 1000) / 1000
    )
  }

  return (
    <div>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        onClick={handleClick}
      >
        <VehicleBody vista={vista} />
        {/* Marcadores de daños */}
        {daniosDeLaVista.map((danio) => (
          <DamageMarker
            key={danio.id}
            danio={danio}
            svgW={SVG_W}
            svgH={SVG_H}
            onClick={!readonly ? () => onDanioClick?.(danio) : undefined}
          />
        ))}
      </svg>
    </div>
  )
}
