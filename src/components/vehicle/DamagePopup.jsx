import React, { useEffect, useState } from 'react'
import Modal from '../common/Modal'
import Button from '../common/Button'
import { TIPOS_DANIO } from '../../config/constants'

/**
 * Modal para completar o editar los datos de un daño del diagrama.
 *
 * @param {{
 *   isOpen: boolean,
 *   coordenadas: { x: number, y: number } | null,
 *   vista: string,
 *   danio?: import('../../types/danio').Danio | null,
 *   onConfirmar: (data: Object) => void,
 *   onCancelar: () => void,
 * }} props
 */
export default function DamagePopup({ isOpen, coordenadas, vista, danio = null, onConfirmar, onCancelar }) {
  const [tipoDanio, setTipoDanio] = useState(TIPOS_DANIO.RAYON)
  const [descripcion, setDescripcion] = useState('')

  useEffect(() => {
    if (isOpen) {
      setTipoDanio(danio?.tipoDanio ?? TIPOS_DANIO.RAYON)
      setDescripcion(danio?.descripcion ?? '')
    }
  }, [isOpen, danio])

  const esEdicion = Boolean(danio)

  const handleConfirmar = () => {
    if (!coordenadas && !esEdicion) return
    onConfirmar({
      vista,
      coordenadaX: coordenadas?.x ?? danio.coordenadaX,
      coordenadaY: coordenadas?.y ?? danio.coordenadaY,
      tipoDanio,
      descripcion,
    })
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onCancelar}
      title={esEdicion ? 'Editar daño' : 'Registrar daño'}
      size="sm"
      footer={
        <>
          <Button variant="ghost" onClick={onCancelar}>Cancelar</Button>
          <Button onClick={handleConfirmar} variant="danger" id="btn-confirmar-danio">
            {esEdicion ? 'Guardar cambios' : 'Registrar daño'}
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        {coordenadas && (
          <div className="flex gap-3 text-xs text-slate-500 bg-slate-900/50 rounded-lg px-3 py-2 font-mono">
            <span>Vista: <span className="text-slate-300">{vista}</span></span>
            <span>X: <span className="text-slate-300">{coordenadas.x.toFixed(3)}</span></span>
            <span>Y: <span className="text-slate-300">{coordenadas.y.toFixed(3)}</span></span>
          </div>
        )}

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-slate-300">Tipo de daño</label>
          <div className="grid grid-cols-2 damage-type-grid">
            {Object.values(TIPOS_DANIO).map((tipo) => {
              const seleccionado = tipoDanio === tipo
              return (
                <button
                  key={tipo}
                  type="button"
                  onClick={() => setTipoDanio(tipo)}
                  className={`damage-type-btn${seleccionado ? ' damage-type-btn--selected' : ''}`}
                  data-tipo={tipo}
                >
                  <span className="damage-type-dot" aria-hidden="true" />
                  {tipo}
                  {seleccionado && (
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M3 8.5 6.5 12 13 4.5" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-slate-300">Descripción (opcional)</label>
          <textarea
            id="danio-descripcion"
            rows={2}
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Detalles del daño..."
            className="w-full rounded-lg border border-slate-600 px-3 py-2 text-sm bg-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 resize-none"
          />
        </div>
      </div>
    </Modal>
  )
}
