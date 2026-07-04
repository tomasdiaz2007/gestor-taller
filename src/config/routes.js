// Rutas de la aplicación — usar siempre estas constantes, nunca strings sueltos
export const ROUTES = {
  DASHBOARD: '/',
  VEHICULOS_NUEVO: '/vehiculos/nuevo',
  ORDENES: '/ordenes',
  ORDEN_DETALLE: '/ordenes/:id',
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
