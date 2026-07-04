/**
 * Crea un objeto RepuestoUsado consistente con el dominio.
 * @param {Object} data
 * @param {string} [data.id]
 * @param {string} data.ordenTrabajoId
 * @param {string} data.repuestoId
 * @param {number} data.cantidad
 * @returns {import('../types/repuesto').RepuestoUsado}
 */
export function createRepuestoUsado(data) {
  return {
    id: data.id ?? null,
    ordenTrabajoId: data.ordenTrabajoId,
    repuestoId: data.repuestoId,
    cantidad: Number(data.cantidad) || 1,
  }
}
