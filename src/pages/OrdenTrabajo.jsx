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
    <div className="space-y-6 animate-fade-in max-w-5xl mx-auto">
      {/* Header info */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-3">
            Orden #{ordenActual.id}
            <StatusBadge estado={ordenActual.estadoActual} />
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Ingreso: {formatFecha(ordenActual.fechaIngreso)} · {calcularDiasEnTaller(ordenActual.fechaIngreso)} días en taller
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" onClick={() => navigate('/ordenes')}>
            Volver
          </Button>
          {!isEntregado && (
            <Button onClick={() => navigate(`/ordenes/${id}/editar`)}>
              Editar Orden
            </Button>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Columna Izquierda: Datos */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <h2 className="text-lg font-semibold text-slate-200 mb-4 border-b border-slate-700 pb-2">Datos del Vehículo</h2>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-slate-500 text-xs">Vehículo</p>
                <p className="text-slate-200 font-medium">{vehiculoActual?.marca} {vehiculoActual?.modelo}</p>
              </div>
              <div>
                <p className="text-slate-500 text-xs">Patente</p>
                <p className="text-slate-200 font-mono">{vehiculoActual?.patente}</p>
              </div>
              <div>
                <p className="text-slate-500 text-xs">Kilometraje</p>
                <p className="text-slate-200">{ordenActual.kilometraje ? `${ordenActual.kilometraje} km` : '—'}</p>
              </div>
              <div>
                <p className="text-slate-500 text-xs">Nivel de Combustible</p>
                <p className="text-slate-200">{ordenActual.combustible || '—'}</p>
              </div>
            </div>
          </Card>

          <Card>
            <h2 className="text-lg font-semibold text-slate-200 mb-4 border-b border-slate-700 pb-2">Datos del Cliente</h2>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-slate-500 text-xs">Nombre</p>
                <p className="text-slate-200">{vehiculoActual?.clienteNombre}</p>
              </div>
              <div>
                <p className="text-slate-500 text-xs">Teléfono</p>
                <p className="text-slate-200">{vehiculoActual?.clienteTelefono}</p>
              </div>
            </div>
          </Card>

          <Card>
            <h2 className="text-lg font-semibold text-slate-200 mb-4 border-b border-slate-700 pb-2">Datos de Gestión</h2>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-slate-500 text-xs">Prioridad</p>
                <p className={`font-medium ${ordenActual.prioridad === 'Urgente' || ordenActual.prioridad === 'Alta' ? 'text-red-400' : 'text-slate-200'}`}>
                  {ordenActual.prioridad || 'Media'}
                </p>
              </div>
              <div>
                <p className="text-slate-500 text-xs">Técnico Asignado</p>
                <p className="text-slate-200">{ordenActual.tecnicoAsignado || 'Sin asignar'}</p>
              </div>
              <div>
                <p className="text-slate-500 text-xs">Fecha Prometida</p>
                <p className="text-slate-200">{ordenActual.fechaPrometida ? formatFecha(ordenActual.fechaPrometida) : '—'}</p>
              </div>
            </div>
          </Card>

          {/* Acciones de estado */}
          <Card>
            <h2 className="text-lg font-semibold text-slate-200 mb-4 border-b border-slate-700 pb-2">Gestión de Estado</h2>
            {isEntregado ? (
              <p className="text-sm text-slate-500">Esta orden está entregada y es inmutable.</p>
            ) : (
              <div className="space-y-2">
                {transicionesPosibles.map((estado) => (
                  <Button
                    key={estado}
                    variant="secondary"
                    size="sm"
                    className="w-full justify-center"
                    onClick={() => handleAvanzarEstado(estado)}
                    loading={loading}
                  >
                    → Cambiar a {ETIQUETAS_ESTADO[estado]}
                  </Button>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* Columna Derecha: Detalles operativos */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <h2 className="text-lg font-semibold text-slate-200 mb-4 border-b border-slate-700 pb-2">Diagnóstico</h2>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-slate-500 mb-1">Problema Informado</p>
                <div className="p-3 bg-slate-900/50 rounded-lg text-sm text-slate-300">
                  {ordenActual.problemaInformado || '—'}
                </div>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Diagnóstico del Taller</p>
                <div className="p-3 bg-slate-900/50 rounded-lg text-sm text-slate-300 whitespace-pre-wrap">
                  {ordenActual.diagnostico || 'Sin diagnóstico registrado.'}
                </div>
              </div>
              {ordenActual.observaciones && (
                <div>
                  <p className="text-xs text-slate-500 mb-1">Observaciones / Notas Internas</p>
                  <div className="p-3 bg-slate-800/50 border border-slate-700 rounded-lg text-sm text-slate-400 whitespace-pre-wrap">
                    {ordenActual.observaciones}
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Diagrama de daños */}
          {!isEntregado && (
            <Card>
              <h2 className="text-lg font-semibold text-slate-200 mb-4 border-b border-slate-700 pb-2">Daños Registrados</h2>
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
              <h2 className="text-lg font-semibold text-slate-200">Repuestos Utilizados</h2>
              {!isEntregado && (
                <Button size="sm" onClick={() => setModalRepuesto(true)} id="btn-agregar-repuesto">
                  + Agregar Repuesto
                </Button>
              )}
            </div>
            {repuestosUsados.length === 0 ? (
              <p className="px-5 py-8 text-sm text-slate-500 text-center">No se han registrado repuestos en esta orden.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="table-base w-full text-left">
                  <thead>
                    <tr>
                      <th>Código</th>
                      <th>Repuesto</th>
                      <th>Cant.</th>
                      <th>Precio unit.</th>
                      <th className="text-right">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {repuestosUsados.map((ru, i) => (
                      <tr key={i} className="hover:bg-slate-800/50">
                        <td className="font-mono text-slate-400">{ru.repuesto?.codigo}</td>
                        <td>{ru.repuesto?.nombre}</td>
                        <td className="font-mono">{ru.cantidad}</td>
                        <td className="text-slate-400">{formatPrecio(ru.repuesto?.precio ?? 0)}</td>
                        <td className="font-semibold text-slate-200 text-right">
                          {formatPrecio((ru.repuesto?.precio ?? 0) * ru.cantidad)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        </div>
      </div>

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
