import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Card from '../components/common/Card'
import Button from '../components/common/Button'
import StatusBadge from '../components/common/StatusBadge'
import Modal from '../components/common/Modal'
import { useOrdenStore } from '../store/orden/ordenStore'
import { useVehiculoStore } from '../store/vehiculo/vehiculoStore'
import { useStockStore } from '../store/stock/stockStore'
import { useToast } from '../components/common/ToastProvider'
import { ESTADOS_ORDEN, TRANSICIONES_VALIDAS, ETIQUETAS_ESTADO } from '../config/status'
import { formatFecha, calcularDiasEnTaller } from '../helpers/dateHelper'
import { formatPrecio } from '../helpers/formatHelper'
import { selectRepuestos } from '../store/stock/stockSelectors'
import VehicleDiagram from '../components/vehicle/VehicleDiagram'

export default function OrdenTrabajo() {
  const { id } = useParams()
  const navigate = useNavigate()
  const addToast = useToast()

  const { ordenActual, loading, fetchOrdenActual, actualizarEstado, agregarDanio, agregarRepuestoAOrden } = useOrdenStore()
  const { fetchVehiculoActual, vehiculoActual } = useVehiculoStore()
  const fetchRepuestos = useStockStore((s) => s.fetchRepuestos)
  const repuestos = useStockStore(selectRepuestos)

  const [modalRepuesto, setModalRepuesto] = useState(false)
  const [repuestoForm, setRepuestoForm] = useState({ repuestoId: '', cantidad: 1 })
  const [repuestosUsados, setRepuestosUsados] = useState([])

  useEffect(() => {
    fetchOrdenActual(id)
    fetchRepuestos()
  }, [id, fetchOrdenActual, fetchRepuestos])

  useEffect(() => {
    if (ordenActual?.vehiculoId) fetchVehiculoActual(ordenActual.vehiculoId)
  }, [ordenActual?.vehiculoId, fetchVehiculoActual])

  if (loading && !ordenActual) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
      </div>
    )
  }

  if (!ordenActual) return null

  const transicionesPosibles = TRANSICIONES_VALIDAS[ordenActual.estadoActual] ?? []
  const isEntregado = ordenActual.estadoActual === ESTADOS_ORDEN.ENTREGADO

  const handleAvanzarEstado = async (nuevoEstado) => {
    try {
      await actualizarEstado(id, nuevoEstado)
      addToast(`Estado actualizado a "${ETIQUETAS_ESTADO[nuevoEstado]}"`, 'success')
    } catch (err) {
      addToast(err.message, 'error')
    }
  }

  const handleAgregarDanio = async (danioData) => {
    try {
      await agregarDanio({ ...danioData, ordenTrabajoId: id })
      addToast('Daño registrado', 'success')
    } catch (err) {
      addToast(err.message, 'error')
    }
  }

  const handleAgregarRepuesto = async () => {
    try {
      const repuesto = repuestos.find((r) => r.id === repuestoForm.repuestoId)
      await agregarRepuestoAOrden(id, repuestoForm.repuestoId, Number(repuestoForm.cantidad))
      setRepuestosUsados((prev) => [...prev, {
        repuesto,
        cantidad: Number(repuestoForm.cantidad),
      }])
      addToast(`Repuesto "${repuesto?.nombre}" agregado`, 'success')
      setModalRepuesto(false)
      setRepuestoForm({ repuestoId: '', cantidad: 1 })
      fetchRepuestos() // refresca stock
    } catch (err) {
      addToast(err.message, 'error')
    }
  }

  return (
    <div className="space-y-5 animate-fade-in max-w-5xl">
      {/* Header info */}
      <div className="grid lg:grid-cols-3 gap-4">
        {/* Vehículo */}
        <Card className="lg:col-span-2">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-slate-500 mb-1">Vehículo</p>
              <h2 className="text-xl font-bold text-slate-100">
                {vehiculoActual?.marca} {vehiculoActual?.modelo}
              </h2>
              <p className="text-slate-400 font-mono text-sm mt-0.5">{vehiculoActual?.patente} · {vehiculoActual?.año}</p>
            </div>
            <StatusBadge estado={ordenActual.estadoActual} className="flex-shrink-0" />
          </div>
          <hr className="divider-gradient" />
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-xs text-slate-500">Cliente</p>
              <p className="text-slate-200">{vehiculoActual?.clienteNombre}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500">Teléfono</p>
              <p className="text-slate-200">{vehiculoActual?.clienteTelefono}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500">Ingreso</p>
              <p className="text-slate-200">{formatFecha(ordenActual.fechaIngreso)}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500">Días en taller</p>
              <p className="text-slate-200 font-mono">{calcularDiasEnTaller(ordenActual.fechaIngreso)}d</p>
            </div>
          </div>
        </Card>

        {/* Acciones de estado */}
        <Card>
          <p className="text-xs text-slate-500 mb-3">Estado actual</p>
          <StatusBadge estado={ordenActual.estadoActual} className="mb-4" />
          {isEntregado ? (
            <p className="text-xs text-slate-500 mt-2">Esta orden es inmutable.</p>
          ) : (
            <div className="space-y-2 mt-4">
              {transicionesPosibles.map((estado) => (
                <Button
                  key={estado}
                  variant="secondary"
                  size="sm"
                  className="w-full justify-center"
                  onClick={() => handleAvanzarEstado(estado)}
                  loading={loading}
                >
                  → {ETIQUETAS_ESTADO[estado]}
                </Button>
              ))}
            </div>
          )}
        </Card>
      </div>

      {/* Problema y diagnóstico */}
      <div className="grid lg:grid-cols-2 gap-4">
        <Card>
          <p className="text-xs text-slate-500 mb-2">Problema informado</p>
          <p className="text-slate-200 text-sm">{ordenActual.problemaInformado || '—'}</p>
        </Card>
        <Card>
          <p className="text-xs text-slate-500 mb-2">Diagnóstico</p>
          <p className="text-slate-200 text-sm">{ordenActual.diagnostico || 'Sin diagnóstico registrado'}</p>
        </Card>
      </div>

      {/* Diagrama de daños */}
      {!isEntregado && (
        <Card>
          <h3 className="font-semibold text-slate-200 mb-4">Registro de Daños</h3>
          <VehicleDiagram
            danios={ordenActual.danios || []}
            onAgregarDanio={handleAgregarDanio}
            readonly={isEntregado}
          />
        </Card>
      )}

      {/* Repuestos utilizados */}
      <Card padding={false}>
        <div className="px-5 py-4 border-b border-slate-700 flex items-center justify-between">
          <h3 className="font-semibold text-slate-200">Repuestos utilizados</h3>
          {!isEntregado && (
            <Button size="sm" onClick={() => setModalRepuesto(true)} id="btn-agregar-repuesto">
              + Agregar repuesto
            </Button>
          )}
        </div>
        {repuestosUsados.length === 0 ? (
          <p className="px-5 py-8 text-sm text-slate-500 text-center">No se han registrado repuestos</p>
        ) : (
          <table className="table-base">
            <thead>
              <tr>
                <th>Código</th>
                <th>Repuesto</th>
                <th>Cantidad</th>
                <th>Precio unit.</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {repuestosUsados.map((ru, i) => (
                <tr key={i}>
                  <td className="font-mono text-slate-400">{ru.repuesto?.codigo}</td>
                  <td>{ru.repuesto?.nombre}</td>
                  <td className="font-mono">{ru.cantidad}</td>
                  <td>{formatPrecio(ru.repuesto?.precio ?? 0)}</td>
                  <td className="font-semibold text-slate-200">
                    {formatPrecio((ru.repuesto?.precio ?? 0) * ru.cantidad)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>

      {/* Modal agregar repuesto */}
      <Modal
        isOpen={modalRepuesto}
        onClose={() => setModalRepuesto(false)}
        title="Agregar repuesto a la orden"
        footer={
          <>
            <Button variant="ghost" onClick={() => setModalRepuesto(false)}>Cancelar</Button>
            <Button onClick={handleAgregarRepuesto} loading={loading} id="btn-confirmar-repuesto">
              Agregar
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-300">Repuesto</label>
            <select
              id="select-repuesto"
              value={repuestoForm.repuestoId}
              onChange={(e) => setRepuestoForm((p) => ({ ...p, repuestoId: e.target.value }))}
              className="w-full rounded-lg border border-slate-600 px-3 py-2 text-sm bg-slate-800 text-slate-100 focus:outline-none focus:border-blue-500"
            >
              <option value="">Seleccionar repuesto...</option>
              {repuestos.map((r) => (
                <option key={r.id} value={r.id} disabled={r.stockActual === 0}>
                  {r.nombre} ({r.codigo}) — Stock: {r.stockActual}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-300">Cantidad</label>
            <input
              id="input-cantidad"
              type="number"
              min={1}
              value={repuestoForm.cantidad}
              onChange={(e) => setRepuestoForm((p) => ({ ...p, cantidad: e.target.value }))}
              className="w-full rounded-lg border border-slate-600 px-3 py-2 text-sm bg-slate-800 text-slate-100 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </Modal>
    </div>
  )
}
