import { vehiculoRepository } from '../repositories/vehiculoRepository'

/** @returns {Promise<import('../types/vehiculo').Vehiculo[]>} */
export async function ListarVehiculos() {
  return vehiculoRepository.getAll()
}
