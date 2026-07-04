import { AppError } from './AppError'

/**
 * Error lanzado cuando el stock de un repuesto es insuficiente
 * para completar la operación solicitada.
 */
export class StockError extends AppError {
  /**
   * @param {string} repuestoNombre
   * @param {number} stockActual
   * @param {number} cantidadSolicitada
   */
  constructor(repuestoNombre, stockActual, cantidadSolicitada) {
    super(
      `Stock insuficiente para "${repuestoNombre}". Disponible: ${stockActual}, solicitado: ${cantidadSolicitada}`,
      'STOCK_INSUFICIENTE'
    )
    this.name = 'StockError'
    this.repuestoNombre = repuestoNombre
    this.stockActual = stockActual
    this.cantidadSolicitada = cantidadSolicitada
  }
}
