import { vehiculoRepository } from '../repositories/vehiculoRepository'

/**
 * @param {string} id
 * @returns {Promise<import('../types/vehiculo').Vehiculo>}
 */
export async function ObtenerVehiculo(id) {
  return vehiculoRepository.getById(id)
}
