import { ordenRepository } from '../repositories/ordenRepository'
import { logger } from '../logger/logger'

/**
 * Caso de uso: Eliminar una orden de trabajo.
 * @param {string} id
 * @returns {Promise<void>}
 */
export async function EliminarOrden(id) {
  await ordenRepository.delete(id)
  logger.info('Orden de trabajo eliminada', { id })
}
