/**
 * Crea un objeto Vehiculo consistente con el dominio.
 * @param {Object} data
 * @param {string} [data.id]
 * @param {string} data.patente
 * @param {string} data.marca
 * @param {string} data.modelo
 * @param {number} data.año
 * @param {string} data.clienteNombre
 * @param {string} data.clienteTelefono
 * @returns {import('../types/vehiculo').Vehiculo}
 */
export function createVehiculo(data) {
  return {
    id: data.id ?? null,
    patente: data.patente?.toUpperCase().trim() ?? '',
    marca: data.marca?.trim() ?? '',
    modelo: data.modelo?.trim() ?? '',
    año: Number(data.año) || new Date().getFullYear(),
    clienteNombre: data.clienteNombre?.trim() ?? '',
    clienteTelefono: data.clienteTelefono?.trim() ?? '',
  }
}
