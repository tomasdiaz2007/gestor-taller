import { createOrdenTrabajo } from '../models/OrdenTrabajo'
import { createRepuestoUsado } from '../models/RepuestoUsado'
import { NotFoundError } from '../errors/NotFoundError'
import { createId, readCollection, writeCollection } from './localStorage'

const ORDERS = 'ordenes'
const USED_PARTS = 'repuestos-usados'

export const ordenRepository = {
  async getAll() {
    return readCollection(ORDERS).map((orden) => ({ ...orden }))
  },

  async getById(id) {
    const orden = readCollection(ORDERS).find((item) => item.id === id)
    if (!orden) throw new NotFoundError('OrdenTrabajo', id)
    return { ...orden }
  },

  async create(data) {
    const orden = createOrdenTrabajo({ ...data, id: createId('orden') })
    writeCollection(ORDERS, [...readCollection(ORDERS), orden])
    return { ...orden }
  },

  async update(id, data) {
    const ordenes = readCollection(ORDERS)
    const index = ordenes.findIndex((item) => item.id === id)
    if (index === -1) throw new NotFoundError('OrdenTrabajo', id)
    const actualizada = createOrdenTrabajo({ ...ordenes[index], ...data, id })
    ordenes[index] = actualizada
    writeCollection(ORDERS, ordenes)
    return { ...actualizada }
  },

  async delete(id) {
    const ordenes = readCollection(ORDERS)
    if (!ordenes.some((item) => item.id === id)) throw new NotFoundError('OrdenTrabajo', id)
    writeCollection(ORDERS, ordenes.filter((item) => item.id !== id))
    writeCollection(USED_PARTS, readCollection(USED_PARTS).filter((item) => item.ordenTrabajoId !== id))
  },

  async getRepuestosUsados(ordenId) {
    return readCollection(USED_PARTS)
      .filter((item) => item.ordenTrabajoId === ordenId)
      .map((item) => ({ ...item }))
  },

  async addRepuestoUsado(data) {
    const repuestoUsado = createRepuestoUsado({ ...data, id: createId('repuesto-usado') })
    writeCollection(USED_PARTS, [...readCollection(USED_PARTS), repuestoUsado])
    return { ...repuestoUsado }
  },
}
