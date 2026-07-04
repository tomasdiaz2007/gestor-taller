import { stockRepository } from '../repositories/stockRepository'
import { logger } from '../logger/logger'

/**
 * Caso de uso: Eliminar un repuesto del stock.
 * @param {string} id
 * @returns {Promise<void>}
 */
export async function EliminarRepuesto(id) {
  await stockRepository.delete(id)
  logger.info('Repuesto eliminado', { id })
}
