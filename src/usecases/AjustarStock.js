import { stockRepository } from '../repositories/stockRepository'
import { logger } from '../logger/logger'

/**
 * Caso de uso: Ajustar stock sumando o restando una cantidad.
 * @param {string} id
 * @param {number} delta
 * @returns {Promise<import('../types/repuesto').Repuesto>}
 */
export async function AjustarStock(id, delta) {
  const repuesto = await stockRepository.ajustarStock(id, delta)
  logger.info(`Stock ajustado para "${repuesto.nombre}": delta ${delta}, nuevo stock: ${repuesto.stockActual}`)
  return repuesto
}
