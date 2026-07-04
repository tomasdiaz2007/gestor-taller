import React, { useState } from 'react'
import Modal from '../common/Modal'
import Button from '../common/Button'
import { TIPOS_DANIO } from '../../config/constants'

/**
 * Modal para completar los datos de un daño después de hacer click en el diagrama.
 *
 * @param {{
 *   isOpen: boolean,
 *   coordenadas: { x: number, y: number } | null,
 *   vista: string,
 *   onConfirmar: (data: Object) => void,
 *   onCancelar: () => void,
 * }} props
 */
export default function DamagePopup({ isOpen, coordenadas, vista, onConfirmar, onCancelar }) {
  const [tipoDanio, setTipoDanio] = useState(TIPOS_DANIO.RAYON)
  const [descripcion, setDescripcion] = useState('')

  const handleConfirmar = () => {
    if (!coordenadas) return
    onConfirmar({
      vista,
      coordenadaX: coordenadas.x,
      coordenadaY: coordenadas.y,
      tipoDanio,
      descripcion,
    })
    setTipoDanio(TIPOS_DANIO.RAYON)
    setDescripcion('')
  }

  const handleCancelar = () => {
    setTipoDanio(TIPOS_DANIO.RAYON)
    setDescripcion('')
    onCancelar()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleCancelar}
      title="Registrar daño"
      size="sm"
      footer={
        <>
          <Button variant="ghost" onClick={handleCancelar}>Cancelar</Button>
          <Button onClick={handleConfirmar} variant="danger" id="btn-confirmar-danio">
            Registrar daño
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
          <div className="grid grid-cols-2 gap-2">
            {Object.values(TIPOS_DANIO).map((tipo) => (
              <button
                key={tipo}
                type="button"
                onClick={() => setTipoDanio(tipo)}
                className={`px-3 py-2 rounded-lg text-xs font-medium border transition-all ${
                  tipoDanio === tipo
                    ? 'bg-red-600/30 border-red-600 text-red-300'
                    : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500'
                }`}
              >
                {tipo}
              </button>
            ))}
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
