import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../components/common/Card'
import Button from '../components/common/Button'
import StatusBadge from '../components/common/StatusBadge'
import Modal from '../components/common/Modal'
import { useOrdenStore } from '../store/orden/ordenStore'
import { useVehiculoStore } from '../store/vehiculo/vehiculoStore'
import { selectOrdenes } from '../store/orden/ordenSelectors'
import { selectVehiculos } from '../store/vehiculo/vehiculoSelectors'
import { useToast } from '../components/common/ToastProvider'
import { ESTADOS_ORDEN, ETIQUETAS_ESTADO } from '../config/status'
import { formatFecha, calcularDiasEnTaller } from '../helpers/dateHelper'
import { ordenDetalleRoute } from '../config/routes'

function IconTrash() {
  return <span className="action-icon" aria-hidden="true">🗑</span>
}

export default function ListaOrdenes() {
  const navigate = useNavigate()
  const addToast = useToast()
  const ordenes = useOrdenStore(selectOrdenes)
  const fetchOrdenes = useOrdenStore((s) => s.fetchOrdenes)
  const eliminarOrden = useOrdenStore((s) => s.eliminarOrden)
  const loading = useOrdenStore((s) => s.loading)
  const vehiculos = useVehiculoStore(selectVehiculos)
  const fetchVehiculos = useVehiculoStore((s) => s.fetchVehiculos)

  const [filtroEstado, setFiltroEstado] = useState('TODOS')

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
        <Button onClick={() => navigate('/ordenes/nueva')} size="sm" id="btn-nueva-orden">
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
                            className="action-button action-button--danger"
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
