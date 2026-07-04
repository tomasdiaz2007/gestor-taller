/**
 * Error base de la aplicación.
 * Todos los errores de dominio extienden de esta clase.
 */
export class AppError extends Error {
  /**
   * @param {string} message - Mensaje legible para el usuario
   * @param {string} [code] - Código interno del error
   */
  constructor(message, code = 'APP_ERROR') {
    super(message)
    this.name = 'AppError'
    this.code = code
  }
}
