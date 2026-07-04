import { stockRepository } from '../repositories/stockRepository'
import { validateRepuesto } from '../validators/stockValidator'
import { ValidationError } from '../errors/ValidationError'
import { logger } from '../logger/logger'

/**
 * Caso de uso: Editar un repuesto existente.
 * @param {string} id
 * @param {Object} data
 * @returns {Promise<import('../types/repuesto').Repuesto>}
 */
export async function EditarRepuesto(id, data) {
  const { valid, errors } = validateRepuesto(data)
  if (!valid) throw new ValidationError('Datos del repuesto inválidos', errors)

  const repuesto = await stockRepository.update(id, data)
  logger.info('Repuesto actualizado', repuesto)
  return repuesto
}
