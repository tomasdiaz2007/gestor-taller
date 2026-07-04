import { ordenRepository } from '../repositories/ordenRepository'

/** @returns {Promise<import('../types/orden').OrdenTrabajo[]>} */
export async function ListarOrdenes() {
  return ordenRepository.getAll()
}
