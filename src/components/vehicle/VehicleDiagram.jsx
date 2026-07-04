import React, { useState } from 'react'
import { VISTAS_VEHICULO } from '../../config/constants'
import VehicleView from './VehicleView'
import DamagePopup from './DamagePopup'

const VISTAS = Object.values(VISTAS_VEHICULO)
const VISTA_LABELS = {
  [VISTAS_VEHICULO.FRENTE]: 'Frente',
  [VISTAS_VEHICULO.TRASERA]: 'Trasera',
  [VISTAS_VEHICULO.LATERAL_IZQUIERDO]: 'Lateral Izq.',
  [VISTAS_VEHICULO.LATERAL_DERECHO]: 'Lateral Der.',
}

/**
 * Componente principal del diagrama de daños.
 * Orquesta la selección de vista, el popup y la confirmación.
 *
 * @param {{
 *   danios: import('../../types/danio').Danio[],
 *   onAgregarDanio: (data: Object) => Promise<void>,
 *   readonly?: boolean,
 * }} props
 */
export default function VehicleDiagram({ danios = [], onAgregarDanio, readonly = false }) {
  const [vistaActiva, setVistaActiva] = useState(VISTAS_VEHICULO.FRENTE)
  const [pendiente, setPendiente] = useState(null) // { x, y } coordenadas normalizadas
  const [popupOpen, setPopupOpen] = useState(false)

  const handleClickSVG = (x, y) => {
    if (readonly) return
    setPendiente({ x, y })
    setPopupOpen(true)
  }

  const handleConfirmar = async (data) => {
    await onAgregarDanio(data)
    setPopupOpen(false)
    setPendiente(null)
  }

  const handleCancelar = () => {
    setPopupOpen(false)
    setPendiente(null)
  }

  const daniosDeLaVista = danios.filter((d) => d.vista === vistaActiva)

  return (
    <div className="space-y-3">
      {/* Selector de vistas */}
      <div className="flex gap-2 flex-wrap">
        {VISTAS.map((vista) => {
          const count = danios.filter((d) => d.vista === vista).length
          return (
            <button
              key={vista}
              onClick={() => setVistaActiva(vista)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border flex items-center gap-1.5 ${
                vistaActiva === vista
                  ? 'bg-blue-600/20 border-blue-600/50 text-blue-400'
                  : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-300'
              }`}
            >
              {VISTA_LABELS[vista]}
              {count > 0 && (
                <span className="w-4 h-4 rounded-full bg-red-600 text-white text-[10px] flex items-center justify-center font-bold">
                  {count}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Diagrama SVG */}
      <VehicleView
        vista={vistaActiva}
        danios={danios}
        onClickSVG={handleClickSVG}
        readonly={readonly}
      />

      {/* Leyenda */}
      {daniosDeLaVista.length > 0 && (
        <div className="space-y-1">
          <p className="text-xs text-slate-500 font-medium">
            {daniosDeLaVista.length} daño{daniosDeLaVista.length > 1 ? 's' : ''} registrado{daniosDeLaVista.length > 1 ? 's' : ''} en esta vista
          </p>
          <div className="flex flex-wrap gap-2">
            {daniosDeLaVista.map((d) => (
              <span key={d.id} className="text-xs bg-slate-800 border border-slate-700 rounded-lg px-2 py-1 text-slate-300">
                <span className="font-medium text-red-400">{d.tipoDanio}</span>
                {d.descripcion && ` · ${d.descripcion}`}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Popup para datos del daño */}
      <DamagePopup
        isOpen={popupOpen}
        coordenadas={pendiente}
        vista={vistaActiva}
        onConfirmar={handleConfirmar}
        onCancelar={handleCancelar}
      />
    </div>
  )
}
