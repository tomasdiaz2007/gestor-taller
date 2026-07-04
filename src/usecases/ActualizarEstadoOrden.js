import { ordenRepository } from '../repositories/ordenRepository'
import { validateTransicionEstado } from '../validators/ordenValidator'
import { ValidationError } from '../errors/ValidationError'
import { logger } from '../logger/logger'

/**
 * Caso de uso: Actualizar el estado de una orden de trabajo.
 * Aplica la máquina de estados — no se permiten transiciones inversas.
 * Las órdenes ENTREGADAS son inmutables.
 * @param {string} ordenId
 * @param {string} nuevoEstado
 * @returns {Promise<import('../types/orden').OrdenTrabajo>}
 */
export async function ActualizarEstadoOrden(ordenId, nuevoEstado) {
  const orden = await ordenRepository.getById(ordenId)

  const { valid, errors } = validateTransicionEstado(orden.estadoActual, nuevoEstado)
  if (!valid) throw new ValidationError('Transición de estado inválida', errors)

  const actualizada = await ordenRepository.update(ordenId, { estadoActual: nuevoEstado })
  logger.info(`Orden ${ordenId}: ${orden.estadoActual} → ${nuevoEstado}`)
  return actualizada
}
