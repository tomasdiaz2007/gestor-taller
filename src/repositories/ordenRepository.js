import { ordenesMock } from '../mock/ordenes'
import { createOrdenTrabajo } from '../models/OrdenTrabajo'
import { NotFoundError } from '../errors/NotFoundError'
import { repuestosUsadosMock } from '../mock/repuestos'
import { createRepuestoUsado } from '../models/RepuestoUsado'

let _ordenes = ordenesMock.map(createOrdenTrabajo)
let _nextId = _ordenes.length + 1
let _repuestosUsados = [...repuestosUsadosMock]
let _nextRuId = _repuestosUsados.length + 1

/**
 * CONTRACT:
 * getAll() | getById(id) | create(data) | update(id, data) | delete(id)
 * + getRepuestosUsados(ordenId) | addRepuestoUsado(data)
 */
export const ordenRepository = {
  /** @returns {Promise<import('../types/orden').OrdenTrabajo[]>} */
  async getAll() {
    return [..._ordenes]
  },

  /**
   * @param {string} id
   * @returns {Promise<import('../types/orden').OrdenTrabajo>}
   */
  async getById(id) {
    const orden = _ordenes.find((o) => o.id === id)
    if (!orden) throw new NotFoundError('OrdenTrabajo', id)
    return { ...orden }
  },

  /**
   * @param {Object} data
   * @returns {Promise<import('../types/orden').OrdenTrabajo>}
   */
  async create(data) {
    const orden = createOrdenTrabajo({ ...data, id: `o${_nextId++}` })
    _ordenes.push(orden)
    return { ...orden }
  },

  /**
   * @param {string} id
   * @param {Partial<import('../types/orden').OrdenTrabajo>} data
   * @returns {Promise<import('../types/orden').OrdenTrabajo>}
   */
  async update(id, data) {
    const index = _ordenes.findIndex((o) => o.id === id)
    if (index === -1) throw new NotFoundError('OrdenTrabajo', id)
    _ordenes[index] = createOrdenTrabajo({ ..._ordenes[index], ...data, id })
    return { ..._ordenes[index] }
  },

  /**
   * @param {string} id
   * @returns {Promise<void>}
   */
  async delete(id) {
    const index = _ordenes.findIndex((o) => o.id === id)
    if (index === -1) throw new NotFoundError('OrdenTrabajo', id)
    _ordenes.splice(index, 1)
  },

  /**
   * @param {string} ordenId
   * @returns {Promise<import('../types/repuesto').RepuestoUsado[]>}
   */
  async getRepuestosUsados(ordenId) {
    return _repuestosUsados.filter((ru) => ru.ordenTrabajoId === ordenId)
  },

  /**
   * @param {Object} data
   * @returns {Promise<import('../types/repuesto').RepuestoUsado>}
   */
  async addRepuestoUsado(data) {
    const ru = createRepuestoUsado({ ...data, id: `ru${_nextRuId++}` })
    _repuestosUsados.push(ru)
    return { ...ru }
  },
}
