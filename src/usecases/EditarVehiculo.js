import { vehiculoRepository } from '../repositories/vehiculoRepository'

/**
 * @param {string} id 
 * @param {Partial<import('../types/vehiculo').Vehiculo>} data 
 * @returns {Promise<import('../types/vehiculo').Vehiculo>}
 */
export async function EditarVehiculo(id, data) {
  if (!id) throw new Error('ID de vehículo es requerido')
  
  // Validaciones básicas similares a RegistrarVehiculo
  if (data.patente && !data.patente.trim()) throw new Error('La patente no puede estar vacía')
  if (data.año && (data.año < 1900 || data.año > new Date().getFullYear() + 1)) {
    throw new Error('Año inválido')
  }

  return vehiculoRepository.update(id, data)
}
