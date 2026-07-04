import { stockRepository } from '../repositories/stockRepository'

/** @returns {Promise<import('../types/repuesto').Repuesto[]>} */
export async function ListarRepuestos() {
  return stockRepository.getAll()
}
