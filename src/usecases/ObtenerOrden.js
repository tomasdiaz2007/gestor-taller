import { ordenRepository } from '../repositories/ordenRepository'

/**
 * @param {string} id
 * @returns {Promise<import('../types/orden').OrdenTrabajo>}
 */
export async function ObtenerOrden(id) {
  return ordenRepository.getById(id)
}
