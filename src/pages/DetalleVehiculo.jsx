import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import Card from '../components/common/Card'
import Button from '../components/common/Button'
import StatusBadge from '../components/common/StatusBadge'
import { useVehiculoStore } from '../store/vehiculo/vehiculoStore'
import { useOrdenStore } from '../store/orden/ordenStore'
import { ROUTES } from '../config/routes'
import { formatFecha } from '../helpers/dateHelper'
import { formatIdCorto } from '../helpers/formatHelper'
import { ListarDaniosPorVehiculo } from '../usecases/ListarDaniosPorVehiculo'

export default function DetalleVehiculo() {
  const { id } = useParams()
  const navigate = useNavigate()
  
  const { vehiculoActual, fetchVehiculoActual, loading: loadingVehiculo } = useVehiculoStore()
  const { ordenes, fetchOrdenes, loading: loadingOrdenes } = useOrdenStore()
  const [danios, setDanios] = useState([])
  const [loadingDanios, setLoadingDanios] = useState(true)

  useEffect(() => {
    if (id) {
      fetchVehiculoActual(id)
      fetchOrdenes()
      
      ListarDaniosPorVehiculo(id)
        .then(setDanios)
        .catch(console.error)
        .finally(() => setLoadingDanios(false))
    }
  }, [id, fetchVehiculoActual, fetchOrdenes])

  if (loadingVehiculo && !vehiculoActual) {
    return <div className="p-8 text-center text-slate-500">Cargando vehículo...</div>
  }

  if (!vehiculoActual) {
    return <div className="p-8 text-center text-slate-500">Vehículo no encontrado.</div>
  }

  const ordenesVehiculo = ordenes.filter(o => o.vehiculoId === id)

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <h1 className="text-2xl font-bold text-slate-100">Ficha del Vehículo</h1>
        <div className="flex gap-2">
          <Button variant="ghost" onClick={() => navigate(ROUTES.VEHICULOS)}>
            Volver
          </Button>
          <Button onClick={() => navigate(`/vehiculos/${id}/editar`)}>
            Editar Vehículo
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <h2 className="text-lg font-semibold text-slate-200 mb-4">Información</h2>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-slate-500 text-xs">Patente</p>
                <p className="text-slate-200 font-mono text-base font-bold">{vehiculoActual.patente}</p>
              </div>
              <div>
                <p className="text-slate-500 text-xs">Vehículo</p>
                <p className="text-slate-200">{vehiculoActual.marca} {vehiculoActual.modelo} ({vehiculoActual.año})</p>
              </div>
              <hr className="border-slate-700" />
              <div>
                <p className="text-slate-500 text-xs">Cliente</p>
                <p className="text-slate-200">{vehiculoActual.clienteNombre}</p>
              </div>
              <div>
                <p className="text-slate-500 text-xs">Teléfono</p>
                <p className="text-slate-200">{vehiculoActual.clienteTelefono}</p>
              </div>
            </div>
          </Card>

          <Card>
            <h2 className="text-lg font-semibold text-slate-200 mb-4">Daños Registrados</h2>
            {loadingDanios ? (
              <p className="text-slate-500 text-sm">Cargando daños...</p>
            ) : danios.length === 0 ? (
              <p className="text-slate-500 text-sm">No hay daños registrados.</p>
            ) : (
              <ul className="space-y-2">
                {danios.map(d => (
                  <li key={d.id} className="text-sm text-slate-300 flex items-start gap-2">
                    <span className="text-red-400 mt-0.5">•</span>
                    <div>
                      <span className="font-medium">{d.tipoDanio}</span>
                      {d.descripcion && <span className="text-slate-400"> - {d.descripcion}</span>}
                      <p className="text-xs text-slate-500">Vista: {d.vista}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-slate-200">Órdenes de Trabajo</h2>
              <Button size="sm" onClick={() => navigate(ROUTES.ORDENES)}>
                + Nueva Orden
              </Button>
            </div>
            
            {loadingOrdenes && ordenesVehiculo.length === 0 ? (
              <p className="text-slate-500 text-sm py-4">Cargando órdenes...</p>
            ) : ordenesVehiculo.length === 0 ? (
              <p className="text-slate-500 text-sm py-4">No hay órdenes de trabajo para este vehículo.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="table-base w-full text-left">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Fecha Ingreso</th>
                      <th>Estado</th>
                      <th>Problema</th>
                      <th className="text-right">Acción</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {ordenesVehiculo.map(o => (
                      <tr key={o.id} className="hover:bg-slate-800/50">
                        <td className="font-mono text-slate-400" title={o.id}>#{formatIdCorto(o.id)}</td>
                        <td>{formatFecha(o.fechaIngreso)}</td>
                        <td><StatusBadge estado={o.estadoActual} size="sm" /></td>
                        <td className="truncate max-w-xs">{o.problemaInformado || '—'}</td>
                        <td className="text-right">
                          <Link 
                            to={`/ordenes/${o.id}`}
                            className="text-blue-400 hover:text-blue-300 text-sm font-medium"
                          >
                            Ver Orden
                          </Link>
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
    </div>
  )
}
