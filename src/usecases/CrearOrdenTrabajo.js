import { ordenRepository } from '../repositories/ordenRepository'
import { validateOrden } from '../validators/ordenValidator'
import { ValidationError } from '../errors/ValidationError'
import { logger } from '../logger/logger'

/**
 * Caso de uso: Crear una nueva orden de trabajo.
 * @param {Object} data
 * @returns {Promise<import('../types/orden').OrdenTrabajo>}
 */
export async function CrearOrdenTrabajo(data) {
  const { valid, errors } = validateOrden(data)
  if (!valid) throw new ValidationError('Datos de la orden inválidos', errors)

  const orden = await ordenRepository.create(data)
  logger.info('Orden de trabajo creada', orden)
  return orden
}
