import React from 'react'
import { useLocation } from 'react-router-dom'
import { ROUTES } from '../../config/routes'

const pageTitles = {
  [ROUTES.DASHBOARD]: { title: 'Dashboard', subtitle: 'Resumen del taller' },
  [ROUTES.VEHICULOS_NUEVO]: { title: 'Nuevo Vehículo', subtitle: 'Registrar vehículo en el sistema' },
  [ROUTES.ORDENES]: { title: 'Órdenes de Trabajo', subtitle: 'Gestión de reparaciones' },
  [ROUTES.STOCK]: { title: 'Stock', subtitle: 'Inventario de repuestos' },
}

export default function Header() {
  const { pathname } = useLocation()

  // Detecta si es detalle de orden
  const isOrdenDetalle = pathname.startsWith('/ordenes/') && pathname !== '/ordenes'
  const pageInfo = isOrdenDetalle
    ? { title: 'Detalle de Orden', subtitle: 'Información de la reparación' }
    : pageTitles[pathname] ?? { title: 'TallerGest', subtitle: '' }

  return (
    <header className="h-16 flex items-center px-6 border-b border-slate-800 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-30">
      <div className="flex-1">
        <h1 className="text-base font-semibold text-slate-100">{pageInfo.title}</h1>
        {pageInfo.subtitle && (
          <p className="text-xs text-slate-500">{pageInfo.subtitle}</p>
        )}
      </div>

      {/* Indicador de estado del sistema */}
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-xs text-slate-500">Mock</span>
      </div>
    </header>
  )
}
