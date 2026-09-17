/**
 * Crea un objeto Repuesto consistente con el dominio.
 * @param {Object} data
 * @param {string} [data.id]
 * @param {string} data.codigo
 * @param {string} data.nombre
 * @param {number} data.stockActual
 * @param {number} [data.precioLista]
 * @param {number} [data.precioVenta]
 * @param {number} [data.precio]
 * @returns {import('../types/repuesto').Repuesto}
 */
export function createRepuesto(data) {
  const precioLista = Number(data.precioLista ?? data.precio) || 0
  const precioVenta = Number(data.precioVenta ?? data.precio) || 0
  return {
    id: data.id ?? null,
    codigo: data.codigo?.toUpperCase().trim() ?? '',
    nombre: data.nombre?.trim() ?? '',
    stockActual: Number(data.stockActual) || 0,
    precioLista,
    precioVenta,
    precio: precioVenta,
  }
}

