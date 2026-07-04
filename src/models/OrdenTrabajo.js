import { ESTADOS_ORDEN } from '../config/status'

/**
 * Crea un objeto OrdenTrabajo consistente con el dominio.
 * @param {Object} data
 * @param {string} [data.id]
 * @param {string} data.vehiculoId
 * @param {string} [data.fechaIngreso]
 * @param {string|null} [data.fechaEntrega]
 * @param {string} [data.estadoActual]
 * @param {string} [data.problemaInformado]
 * @param {string} [data.diagnostico]
 * @returns {import('../types/orden').OrdenTrabajo}
 */
export function createOrdenTrabajo(data) {
  return {
    id: data.id ?? null,
    vehiculoId: data.vehiculoId,
    fechaIngreso: data.fechaIngreso ?? new Date().toISOString(),
    fechaEntrega: data.fechaEntrega ?? null,
    estadoActual: data.estadoActual ?? ESTADOS_ORDEN.INGRESADO,
    problemaInformado: data.problemaInformado?.trim() ?? '',
    diagnostico: data.diagnostico?.trim() ?? '',
  }
}
