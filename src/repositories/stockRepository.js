import { repuestosMock } from '../mock/repuestos'
import { createRepuesto } from '../models/Repuesto'
import { NotFoundError } from '../errors/NotFoundError'
import { StockError } from '../errors/StockError'

let _repuestos = repuestosMock.map(createRepuesto)
let _nextId = _repuestos.length + 1

/**
 * CONTRACT:
 * getAll() | getById(id) | create(data) | update(id, data) | descontarStock(id, cantidad)
 */
export const stockRepository = {
  /** @returns {Promise<import('../types/repuesto').Repuesto[]>} */
  async getAll() {
    return _repuestos.map((r) => ({ ...r }))
  },

  /**
   * @param {string} id
   * @returns {Promise<import('../types/repuesto').Repuesto>}
   */
  async getById(id) {
    const repuesto = _repuestos.find((r) => r.id === id)
    if (!repuesto) throw new NotFoundError('Repuesto', id)
    return { ...repuesto }
  },

  /**
   * @param {Object} data
   * @returns {Promise<import('../types/repuesto').Repuesto>}
   */
  async create(data) {
    const repuesto = createRepuesto({ ...data, id: `r${_nextId++}` })
    _repuestos.push(repuesto)
    return { ...repuesto }
  },

  /**
   * @param {string} id
   * @param {Partial<import('../types/repuesto').Repuesto>} data
   * @returns {Promise<import('../types/repuesto').Repuesto>}
   */
  async update(id, data) {
    const index = _repuestos.findIndex((r) => r.id === id)
    if (index === -1) throw new NotFoundError('Repuesto', id)
    _repuestos[index] = createRepuesto({ ..._repuestos[index], ...data, id })
    return { ..._repuestos[index] }
  },

  /**
   * @param {string} id
   * @returns {Promise<void>}
   */
  async delete(id) {
    const index = _repuestos.findIndex((r) => r.id === id)
    if (index === -1) throw new NotFoundError('Repuesto', id)
    _repuestos.splice(index, 1)
  },

  /**
   * Descuenta stock de forma atómica.
   * En Fase 4 se reemplaza con una transacción Firestore.
   * @param {string} id
   * @param {number} cantidad
   * @returns {Promise<import('../types/repuesto').Repuesto>}
   */
  async descontarStock(id, cantidad) {
    const index = _repuestos.findIndex((r) => r.id === id)
    if (index === -1) throw new NotFoundError('Repuesto', id)

    const repuesto = _repuestos[index]
    if (repuesto.stockActual < cantidad) {
      throw new StockError(repuesto.nombre, repuesto.stockActual, cantidad)
    }

    _repuestos[index] = { ...repuesto, stockActual: repuesto.stockActual - cantidad }
    return { ..._repuestos[index] }
  },
}
