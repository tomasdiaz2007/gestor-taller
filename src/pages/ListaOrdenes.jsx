import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../components/common/Card'
import Button from '../components/common/Button'
import StatusBadge from '../components/common/StatusBadge'
import Modal from '../components/common/Modal'
import Input from '../components/common/Input'
import { useOrdenStore } from '../store/orden/ordenStore'
import { useVehiculoStore } from '../store/vehiculo/vehiculoStore'
import { selectOrdenes } from '../store/orden/ordenSelectors'
import { selectVehiculos } from '../store/vehiculo/vehiculoSelectors'
import { useToast } from '../components/common/ToastProvider'
import { ESTADOS_ORDEN, ETIQUETAS_ESTADO } from '../config/status'
import { formatFecha, calcularDiasEnTaller } from '../helpers/dateHelper'
import { ordenDetalleRoute } from '../config/routes'

function IconTrash() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  )
}

const initialOrdenForm = {
  vehiculoId: '',
  problemaInformado: '',
  diagnostico: '',
}

export default function ListaOrdenes() {
  const navigate = useNavigate()
  const addToast = useToast()
  const ordenes = useOrdenStore(selectOrdenes)
  const fetchOrdenes = useOrdenStore((s) => s.fetchOrdenes)
  const crearOrden = useOrdenStore((s) => s.crearOrden)
  const eliminarOrden = useOrdenStore((s) => s.eliminarOrden)
  const loading = useOrdenStore((s) => s.loading)
  const vehiculos = useVehiculoStore(selectVehiculos)
  const fetchVehiculos = useVehiculoStore((s) => s.fetchVehiculos)

  const [filtroEstado, setFiltroEstado] = useState('TODOS')
  const [modalOpen, setModalOpen] = useState(false)
  const [form, setForm] = useState(initialOrdenForm)

  // Modal confirmar eliminación
  const [modalEliminarOpen, setModalEliminarOpen] = useState(false)
  const [ordenEliminar, setOrdenEliminar] = useState(null)

  useEffect(() => {
    fetchOrdenes()
    fetchVehiculos()
  }, [fetchOrdenes, fetchVehiculos])

  const ordenesFiltradas = filtroEstado === 'TODOS'
    ? ordenes
    : ordenes.filter((o) => o.estadoActual === filtroEstado)

  const handleCrearOrden = async () => {
    try {
      const orden = await crearOrden(form)
      addToast('Orden de trabajo creada', 'success')
      setModalOpen(false)
      setForm(initialOrdenForm)
      navigate(ordenDetalleRoute(orden.id))
    } catch (err) {
      addToast(err.message, 'error')
    }
  }

  const abrirEliminarOrden = (orden) => {
    setOrdenEliminar(orden)
    setModalEliminarOpen(true)
  }

  const handleEliminarOrden = async () => {
    try {
      await eliminarOrden(ordenEliminar.id)
      addToast('Orden de trabajo eliminada', 'success')
      setModalEliminarOpen(false)
      setOrdenEliminar(null)
    } catch (err) {
      addToast(err.message, 'error')
    }
  }

  const estadosFiltro = ['TODOS', ...Object.values(ESTADOS_ORDEN)]

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {estadosFiltro.map((estado) => (
            <button
              key={estado}
              onClick={() => setFiltroEstado(estado)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                filtroEstado === estado
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700'
              }`}
            >
              {estado === 'TODOS' ? 'Todas' : ETIQUETAS_ESTADO[estado]}
            </button>
          ))}
        </div>
        <Button onClick={() => setModalOpen(true)} size="sm" id="btn-nueva-orden">
          + Nueva orden
        </Button>
      </div>

      {/* Tabla */}
      <Card padding={false}>
        <div className="overflow-x-auto">
          <table className="table-base">
            <thead>
              <tr>
                <th>Vehículo</th>
                <th>Cliente</th>
                <th>Ingreso</th>
                <th>Días</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {ordenesFiltradas.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-slate-500">
                    No hay órdenes para mostrar
                  </td>
                </tr>
              ) : (
                ordenesFiltradas.map((orden) => {
                  const vehiculo = vehiculos.find((v) => v.id === orden.vehiculoId)
                  return (
                    <tr key={orden.id}>
                      <td>
                        <div>
                          <p className="font-medium text-slate-200">
                            {vehiculo?.marca} {vehiculo?.modelo}
                          </p>
                          <p className="text-xs text-slate-500">{vehiculo?.patente}</p>
                        </div>
                      </td>
                      <td>{vehiculo?.clienteNombre}</td>
                      <td>{formatFecha(orden.fechaIngreso)}</td>
                      <td>
                        <span className="font-mono text-slate-300">
                          {calcularDiasEnTaller(orden.fechaIngreso)}d
                        </span>
                      </td>
                      <td><StatusBadge estado={orden.estadoActual} /></td>
                      <td>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigate(ordenDetalleRoute(orden.id))}
                          >
                            Ver detalle →
                          </Button>
                          <button
                            id={`btn-eliminar-orden-${orden.id}`}
                            onClick={() => abrirEliminarOrden(orden)}
                            title="Eliminar orden"
                            className="p-1.5 rounded-md text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                          >
                            <IconTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Modal nueva orden */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Nueva Orden de Trabajo"
        footer={
          <>
            <Button variant="ghost" onClick={() => setModalOpen(false)}>Cancelar</Button>
            <Button onClick={handleCrearOrden} loading={loading} id="btn-confirmar-orden">
              Crear orden
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-300">
              Vehículo <span className="text-red-400">*</span>
            </label>
            <select
              id="select-vehiculo"
              value={form.vehiculoId}
              onChange={(e) => setForm((p) => ({ ...p, vehiculoId: e.target.value }))}
              className="w-full rounded-lg border border-slate-600 px-3 py-2 text-sm bg-slate-800 text-slate-100 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30"
            >
              <option value="">Seleccionar vehículo...</option>
              {vehiculos.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.patente} — {v.marca} {v.modelo} ({v.clienteNombre})
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-300">
              Problema informado <span className="text-red-400">*</span>
            </label>
            <textarea
              id="problema-informado"
              rows={3}
              value={form.problemaInformado}
              onChange={(e) => setForm((p) => ({ ...p, problemaInformado: e.target.value }))}
              placeholder="Describa el problema reportado por el cliente..."
              className="w-full rounded-lg border border-slate-600 px-3 py-2 text-sm bg-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 resize-none"
            />
          </div>
        </div>
      </Modal>

      {/* Modal confirmar eliminación de orden */}
      <Modal
        isOpen={modalEliminarOpen}
        onClose={() => setModalEliminarOpen(false)}
        title="Eliminar Orden de Trabajo"
        footer={
          <>
            <Button variant="ghost" onClick={() => setModalEliminarOpen(false)}>Cancelar</Button>
            <Button
              variant="danger"
              onClick={handleEliminarOrden}
              loading={loading}
              id="btn-confirmar-eliminar-orden"
            >
              Eliminar
            </Button>
          </>
        }
      >
        <div className="space-y-3">
          {ordenEliminar && (() => {
            const v = vehiculos.find((veh) => veh.id === ordenEliminar.vehiculoId)
            return (
              <>
                <p className="text-slate-300">
                  ¿Estás seguro que querés eliminar la orden de{' '}
                  <span className="font-semibold text-white">
                    {v?.marca} {v?.modelo} ({v?.patente})
                  </span>?
                </p>
                <p className="text-sm text-slate-500">
                  Esta acción no se puede deshacer.
                </p>
              </>
            )
          })()}
        </div>
      </Modal>
    </div>
  )
}
