import { vehiculoRepository } from '../repositories/vehiculoRepository'
import { ordenRepository } from '../repositories/ordenRepository'

/**
 * @param {string} id 
 * @returns {Promise<void>}
 */
export async function EliminarVehiculo(id) {
  if (!id) throw new Error('ID de vehículo es requerido')

  // Verificar si existen órdenes de trabajo asociadas
  const ordenes = await ordenRepository.getAll()
  const ordenesDelVehiculo = ordenes.filter(o => o.vehiculoId === id)

  if (ordenesDelVehiculo.length > 0) {
    throw new Error(`No se puede eliminar el vehículo. Tiene ${ordenesDelVehiculo.length} orden(es) de trabajo asociada(s).`)
  }

  await vehiculoRepository.delete(id)
}
