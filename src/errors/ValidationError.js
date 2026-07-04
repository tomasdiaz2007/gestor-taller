import { AppError } from './AppError'

/**
 * Error de validación de datos de formulario o entidad.
 */
export class ValidationError extends AppError {
  /**
   * @param {string} message
   * @param {string[]} [errors] - Lista de mensajes de error de campo
   */
  constructor(message, errors = []) {
    super(message, 'VALIDATION_ERROR')
    this.name = 'ValidationError'
    this.errors = errors
  }
}
