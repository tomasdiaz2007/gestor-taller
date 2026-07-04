import { vehiculoRepository } from '../repositories/vehiculoRepository'
import { validateVehiculo } from '../validators/vehiculoValidator'
import { ValidationError } from '../errors/ValidationError'
import { logger } from '../logger/logger'

/**
 * Caso de uso: Registrar un nuevo vehículo.
 * @param {Object} data
 * @returns {Promise<import('../types/vehiculo').Vehiculo>}
 */
export async function RegistrarVehiculo(data) {
  const { valid, errors } = validateVehiculo(data)
  if (!valid) throw new ValidationError('Datos del vehículo inválidos', errors)

  const vehiculo = await vehiculoRepository.create(data)
  logger.info('Vehículo registrado', vehiculo)
  return vehiculo
}
