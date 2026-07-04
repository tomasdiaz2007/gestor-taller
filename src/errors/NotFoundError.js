import { AppError } from './AppError'

/**
 * Error lanzado cuando una entidad no se encuentra en el repositorio.
 */
export class NotFoundError extends AppError {
  /**
   * @param {string} entity - Nombre de la entidad (ej: 'Vehiculo')
   * @param {string} id
   */
  constructor(entity, id) {
    super(`${entity} con id "${id}" no encontrado`, 'NOT_FOUND')
    this.name = 'NotFoundError'
    this.entity = entity
    this.id = id
  }
}
