import { danioRepository } from '../repositories/danioRepository'
import { logger } from '../logger/logger'

/**
 * Caso de uso: Agregar un daño a una orden de trabajo.
 * Las coordenadas deben estar normalizadas (0.0–1.0).
 * @param {Object} data
 * @returns {Promise<import('../types/danio').Danio>}
 */
export async function AgregarDanio(data) {
  const danio = await danioRepository.create(data)
  logger.info('Daño registrado', danio)
  return danio
}
