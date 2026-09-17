import { danioRepository } from '../repositories/danioRepository'
import { logger } from '../logger/logger'

/**
 * Caso de uso: Editar un daño registrado.
 * @param {string} id
 * @param {Object} data
 * @returns {Promise<import('../types/danio').Danio>}
 */
export async function EditarDanio(id, data) {
  const danio = await danioRepository.update(id, data)
  logger.info('Daño actualizado', danio)
  return danio
}
