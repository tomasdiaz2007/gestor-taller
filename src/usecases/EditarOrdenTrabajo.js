import { ordenRepository } from '../repositories/ordenRepository'

/**
 * @param {string} id 
 * @param {Partial<import('../types/orden').OrdenTrabajo>} data 
 * @returns {Promise<import('../types/orden').OrdenTrabajo>}
 */
export async function EditarOrdenTrabajo(id, data) {
  if (!id) throw new Error('ID de la orden es requerido')
  
  // Validaciones básicas
  if (data.vehiculoId && !data.vehiculoId.trim()) throw new Error('Debe asociar un vehículo a la orden')
  if (data.problemaInformado && !data.problemaInformado.trim()) throw new Error('El problema informado no puede estar vacío')

  return ordenRepository.update(id, data)
}
