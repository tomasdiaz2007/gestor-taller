import { stockRepository } from '../repositories/stockRepository'
import { ordenRepository } from '../repositories/ordenRepository'
import { validateStockSuficiente } from '../validators/stockValidator'
import { ValidationError } from '../errors/ValidationError'
import { logger } from '../logger/logger'

/**
 * Caso de uso: Agregar un repuesto a una orden de trabajo.
 * Orquesta: valida stock → descuenta → registra consumo.
 * Si no hay stock suficiente, la operación se cancela (StockError).
 *
 * @param {string} ordenId
 * @param {string} repuestoId
 * @param {number} cantidad
 * @returns {Promise<import('../types/repuesto').RepuestoUsado>}
 */
export async function AgregarRepuestoAOrden(ordenId, repuestoId, cantidad) {
  const repuesto = await stockRepository.getById(repuestoId)

  const { valid, errors } = validateStockSuficiente(repuesto, cantidad)
  if (!valid) throw new ValidationError('Stock insuficiente', errors)

  // En Fase 4 estas dos operaciones serán una transacción atómica de Firestore
  await stockRepository.descontarStock(repuestoId, cantidad)
  const repuestoUsado = await ordenRepository.addRepuestoUsado({
    ordenTrabajoId: ordenId,
    repuestoId,
    cantidad,
  })

  logger.info(`Repuesto "${repuesto.nombre}" x${cantidad} agregado a orden ${ordenId}`)
  return repuestoUsado
}
