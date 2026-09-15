import React, { useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../components/common/Card'
import StatusBadge from '../components/common/StatusBadge'
import { useVehiculoStore } from '../store/vehiculo/vehiculoStore'
import { useOrdenStore } from '../store/orden/ordenStore'
import { useStockStore } from '../store/stock/stockStore'
import { selectVehiculos } from '../store/vehiculo/vehiculoSelectors'
import { selectOrdenes } from '../store/orden/ordenSelectors'
import { selectRepuestos } from '../store/stock/stockSelectors'
import { ESTADOS_ORDEN } from '../config/status'
import { ordenDetalleRoute } from '../config/routes'
import { formatFecha, calcularDiasEnTaller } from '../helpers/dateHelper'

export default function Dashboard() {
  const navigate = useNavigate()
  const vehiculos = useVehiculoStore(selectVehiculos)
  const fetchVehiculos = useVehiculoStore((s) => s.fetchVehiculos)
  const ordenes = useOrdenStore(selectOrdenes)
  const fetchOrdenes = useOrdenStore((s) => s.fetchOrdenes)
  const repuestos = useStockStore(selectRepuestos)
  const fetchRepuestos = useStockStore((s) => s.fetchRepuestos)

  // ✅ useMemo evita que .filter() cree una nueva referencia en cada render
  const ordenesActivas = useMemo(
    () => ordenes.filter((o) => o.estadoActual !== ESTADOS_ORDEN.ENTREGADO),
    [ordenes]
  )
  const repuestosSinStock = useMemo(
    () => repuestos.filter((r) => r.stockActual === 0),
    [repuestos]
  )


  useEffect(() => {
    fetchVehiculos()
    fetchOrdenes()
    fetchRepuestos()
  }, [fetchVehiculos, fetchOrdenes, fetchRepuestos])

  const stats = [
    {
      label: 'Vehículos registrados',
      value: vehiculos.length,
      icon: '🚗',
      color: 'border-blue-800/50 bg-blue-900/20',
    },
    {
      label: 'Órdenes activas',
      value: ordenesActivas.length,
      icon: '🔧',
      color: 'border-amber-800/50 bg-amber-900/20',
    },
    {
      label: 'Total repuestos',
      value: repuestos.length,
      icon: '📦',
      color: 'border-emerald-800/50 bg-emerald-900/20',
    },
    {
      label: 'Sin stock',
      value: repuestosSinStock.length,
      icon: '⚠️',
      color: 'border-red-800/50 bg-red-900/20',
    },
  ]

  return (
    <div className="space-y-6 ">
      {/* Métricas */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className={`border ${stat.color}`}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-slate-400 mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-slate-100">{stat.value}</p>
              </div>
              <span className="text-2xl">{stat.icon}</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Órdenes recientes */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card padding={false} className="dashboard-list-card">
          <div className="dashboard-list-heading">
            <h2 className="font-semibold text-slate-200">Órdenes activas</h2>
          </div>
          {ordenesActivas.length === 0 ? (
            <p className="dashboard-list-empty">No hay órdenes activas</p>
          ) : (
            <div className="divide-y divide-slate-700/50">
              {ordenesActivas.slice(0, 5).map((orden) => {
                const vehiculo = vehiculos.find((v) => v.id === orden.vehiculoId)
                return (
                  <div
                    key={orden.id}
                    onClick={() => navigate(ordenDetalleRoute(orden.id))}
                    className="dashboard-list-item"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-200">
                          {vehiculo?.marca} {vehiculo?.modelo}
                        </p>
                        <p className="text-xs text-slate-500">
                          {vehiculo?.patente} · {calcularDiasEnTaller(orden.fechaIngreso)}d en taller
                        </p>
                      </div>
                      <StatusBadge estado={orden.estadoActual} />
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </Card>

        {/* Repuestos sin stock */}
        <Card padding={false} className="dashboard-list-card">
          <div className="dashboard-list-heading">
            <h2 className="font-semibold text-slate-200">Repuestos sin stock</h2>
          </div>
          {repuestosSinStock.length === 0 ? (
            <p className="dashboard-list-empty">✅ Todo el stock en orden</p>
          ) : (
            <div className="divide-y divide-slate-700/50">
              {repuestosSinStock.map((r) => (
                <div key={r.id} className="dashboard-list-item flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-red-400">{r.nombre}</p>
                    <p className="text-xs text-slate-500">{r.codigo}</p>
                  </div>
                  <span className="text-xs font-bold text-red-500 bg-red-900/30 px-2 py-0.5 rounded">SIN STOCK</span>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
