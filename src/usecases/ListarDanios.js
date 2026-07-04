import { danioRepository } from '../repositories/danioRepository'

/**
 * @param {string} ordenId
 * @returns {Promise<import('../types/danio').Danio[]>}
 */
export async function ListarDanios(ordenId) {
  return danioRepository.getAllByOrden(ordenId)
}
