import { vehiculosMock } from '../mock/vehiculos'
import { createVehiculo } from '../models/Vehiculo'
import { NotFoundError } from '../errors/NotFoundError'

// Copia mutable en memoria — en Fase 4 se reemplaza el interior por Firestore
// sin cambiar la interfaz pública del repository
let _vehiculos = vehiculosMock.map(createVehiculo)
let _nextId = _vehiculos.length + 1

/**
 * CONTRACT — métodos permitidos en este repository:
 * getAll() | getById(id) | create(data) | update(id, data) | delete(id)
 */
export const vehiculoRepository = {
  /** @returns {Promise<import('../types/vehiculo').Vehiculo[]>} */
  async getAll() {
    return [..._vehiculos]
  },

  /**
   * @param {string} id
   * @returns {Promise<import('../types/vehiculo').Vehiculo>}
   */
  async getById(id) {
    const vehiculo = _vehiculos.find((v) => v.id === id)
    if (!vehiculo) throw new NotFoundError('Vehiculo', id)
    return { ...vehiculo }
  },

  /**
   * @param {Object} data
   * @returns {Promise<import('../types/vehiculo').Vehiculo>}
   */
  async create(data) {
    const vehiculo = createVehiculo({ ...data, id: `v${_nextId++}` })
    _vehiculos.push(vehiculo)
    return { ...vehiculo }
  },

  /**
   * @param {string} id
   * @param {Partial<import('../types/vehiculo').Vehiculo>} data
   * @returns {Promise<import('../types/vehiculo').Vehiculo>}
   */
  async update(id, data) {
    const index = _vehiculos.findIndex((v) => v.id === id)
    if (index === -1) throw new NotFoundError('Vehiculo', id)
    _vehiculos[index] = createVehiculo({ ..._vehiculos[index], ...data, id })
    return { ..._vehiculos[index] }
  },

  /**
   * @param {string} id
   * @returns {Promise<void>}
   */
  async delete(id) {
    const index = _vehiculos.findIndex((v) => v.id === id)
    if (index === -1) throw new NotFoundError('Vehiculo', id)
    _vehiculos.splice(index, 1)
  },
}
