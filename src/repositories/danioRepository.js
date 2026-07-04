import { daniosMock } from '../mock/danios'
import { createDanio } from '../models/Danio'
import { NotFoundError } from '../errors/NotFoundError'

let _danios = daniosMock.map(createDanio)
let _nextId = _danios.length + 1

/**
 * CONTRACT:
 * getAllByOrden(ordenId) | create(data) | delete(id)
 */
export const danioRepository = {
  /**
   * @param {string} ordenId
   * @returns {Promise<import('../types/danio').Danio[]>}
   */
  async getAllByOrden(ordenId) {
    return _danios.filter((d) => d.ordenTrabajoId === ordenId).map((d) => ({ ...d }))
  },

  /**
   * @param {Object} data
   * @returns {Promise<import('../types/danio').Danio>}
   */
  async create(data) {
    const danio = createDanio({ ...data, id: `d${_nextId++}` })
    _danios.push(danio)
    return { ...danio }
  },

  /**
   * @param {string} id
   * @returns {Promise<void>}
   */
  async delete(id) {
    const index = _danios.findIndex((d) => d.id === id)
    if (index === -1) throw new NotFoundError('Danio', id)
    _danios.splice(index, 1)
  },
}
