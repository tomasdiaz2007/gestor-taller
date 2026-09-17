import { TRANSICIONES_VALIDAS, ESTADOS_ORDEN } from '../config/status'

/**
 * Valida que la transición de estado de una orden sea permitida.
 * @param {string} estadoActual
 * @param {string} estadoNuevo
 * @returns {{ valid: boolean, errors: string[] }}
 */
export function validateTransicionEstado(estadoActual, estadoNuevo) {
  const errors = []

  if (estadoActual === ESTADOS_ORDEN.ENTREGADO) {
    errors.push('Una orden ENTREGADA es inmutable y no puede cambiar de estado')
    return { valid: false, errors }
  }

  const transicionesPermitidas = TRANSICIONES_VALIDAS[estadoActual] ?? []
  if (!transicionesPermitidas.includes(estadoNuevo)) {
    errors.push(
      `No se permite la transición de "${estadoActual}" a "${estadoNuevo}"`
    )
  }

  return { valid: errors.length === 0, errors }
}

/**
 * Valida los datos mínimos de una orden al crearla.
 * @param {Object} data
 * @returns {{ valid: boolean, errors: string[] }}
 */
export function validateOrden(data) {
  const errors = []
  if (!data.vehiculoId) errors.push('La orden debe pertenecer a un vehículo')
  return { valid: errors.length === 0, errors }
}
