import React from 'react'
import { useLocation } from 'react-router-dom'
import { ROUTES } from '../../config/routes'

const pageTitles = {
  [ROUTES.DASHBOARD]: { title: 'Dashboard', subtitle: 'Resumen del taller' },
  [ROUTES.VEHICULOS_NUEVO]: { title: 'Nuevo Vehículo', subtitle: 'Registrar vehículo en el sistema' },
  [ROUTES.ORDENES]: { title: 'Órdenes de Trabajo', subtitle: 'Gestión de reparaciones' },
  [ROUTES.STOCK]: { title: 'Stock', subtitle: 'Inventario de repuestos' },
}

export default function Header({ onMenuToggle }) {
  const { pathname } = useLocation()

  // Detecta si es detalle de orden
  const isOrdenDetalle = pathname.startsWith('/ordenes/') && pathname !== '/ordenes'
  const pageInfo = isOrdenDetalle
    ? { title: 'Detalle de Orden', subtitle: 'Información de la reparación' }
    : pageTitles[pathname] ?? { title: 'TallerGest', subtitle: '' }

  return (
    <header className="app-header">
      <button className="menu-toggle" onClick={onMenuToggle} aria-label="Abrir o cerrar menú">
        <span />
        <span />
        <span />
      </button>
      <div>
        <h1>{pageInfo.title}</h1>
        {pageInfo.subtitle && (
          <p>{pageInfo.subtitle}</p>
        )}
      </div>

      {/* Indicador de estado del sistema */}
      <div className="app-status">
        <span />
        <span>Guardado local</span>
      </div>
    </header>
  )
}
