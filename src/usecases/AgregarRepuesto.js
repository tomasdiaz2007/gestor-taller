import { stockRepository } from '../repositories/stockRepository'
import { validateRepuesto } from '../validators/stockValidator'
import { ValidationError } from '../errors/ValidationError'
import { logger } from '../logger/logger'

/**
 * @param {Object} data
 * @returns {Promise<import('../types/repuesto').Repuesto>}
 */
export async function AgregarRepuesto(data) {
  const { valid, errors } = validateRepuesto(data)
  if (!valid) throw new ValidationError('Datos del repuesto inválidos', errors)

  const repuesto = await stockRepository.create(data)
  logger.info('Repuesto agregado al stock', repuesto)
  return repuesto
}
