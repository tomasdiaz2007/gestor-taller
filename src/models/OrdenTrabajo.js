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
 * @param {string} [data.observaciones]
 * @param {number} [data.kilometraje]
 * @param {string} [data.combustible]
 * @param {string} [data.tecnicoAsignado]
 * @param {string} [data.fechaPrometida]
 * @param {string} [data.prioridad]
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
    observaciones: data.observaciones?.trim() ?? '',
    kilometraje: data.kilometraje ?? 0,
    combustible: data.combustible ?? 'Vacio',
    tecnicoAsignado: data.tecnicoAsignado?.trim() ?? '',
    fechaPrometida: data.fechaPrometida ?? null,
    prioridad: data.prioridad ?? 'Media',
  }
}
