// Rutas de la aplicación — usar siempre estas constantes, nunca strings sueltos
export const ROUTES = {
  DASHBOARD: '/',
  VEHICULOS: '/vehiculos',
  VEHICULOS_NUEVO: '/vehiculos/nuevo',
  VEHICULOS_EDITAR: '/vehiculos/:id/editar',
  VEHICULOS_DETALLE: '/vehiculos/:id',
  ORDENES: '/ordenes',
  ORDENES_NUEVA: '/ordenes/nueva',
  ORDEN_DETALLE: '/ordenes/:id',
  ORDENES_EDITAR: '/ordenes/:id/editar',
  STOCK: '/stock',
}

/**
 * Genera la ruta de detalle de una orden con el ID concreto
 * @param {string} id
 * @returns {string}
 */
export function ordenDetalleRoute(id) {
  return `/ordenes/${id}`
}
