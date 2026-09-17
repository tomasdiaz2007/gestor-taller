import { createRepuesto } from '../models/Repuesto'
import { NotFoundError } from '../errors/NotFoundError'
import { StockError } from '../errors/StockError'
import { createId, readCollection, writeCollection } from './localStorage'

const COLLECTION = 'repuestos'

export const stockRepository = {
  async getAll() {
    return readCollection(COLLECTION).map((repuesto) => ({ ...repuesto }))
  },

  async getById(id) {
    const repuesto = readCollection(COLLECTION).find((item) => item.id === id)
    if (!repuesto) throw new NotFoundError('Repuesto', id)
    return { ...repuesto }
  },

  async create(data) {
    const repuesto = createRepuesto({ ...data, id: createId('repuesto') })
    writeCollection(COLLECTION, [...readCollection(COLLECTION), repuesto])
    return { ...repuesto }
  },

  async update(id, data) {
    const repuestos = readCollection(COLLECTION)
    const index = repuestos.findIndex((item) => item.id === id)
    if (index === -1) throw new NotFoundError('Repuesto', id)
    const actualizado = createRepuesto({ ...repuestos[index], ...data, id })
    repuestos[index] = actualizado
    writeCollection(COLLECTION, repuestos)
    return { ...actualizado }
  },

  async delete(id) {
    const repuestos = readCollection(COLLECTION)
    if (!repuestos.some((item) => item.id === id)) throw new NotFoundError('Repuesto', id)
    writeCollection(COLLECTION, repuestos.filter((item) => item.id !== id))
  },

  async descontarStock(id, cantidad) {
    const repuestos = readCollection(COLLECTION)
    const index = repuestos.findIndex((item) => item.id === id)
    if (index === -1) throw new NotFoundError('Repuesto', id)
    const repuesto = repuestos[index]
    if (repuesto.stockActual < cantidad) throw new StockError(repuesto.nombre, repuesto.stockActual, cantidad)
    const actualizado = { ...repuesto, stockActual: repuesto.stockActual - cantidad }
    repuestos[index] = actualizado
    writeCollection(COLLECTION, repuestos)
    return { ...actualizado }
  },
}
