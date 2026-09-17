import { createVehiculo } from '../models/Vehiculo'
import { NotFoundError } from '../errors/NotFoundError'
import { createId, readCollection, writeCollection } from './localStorage'

const COLLECTION = 'vehiculos'

export const vehiculoRepository = {
  async getAll() {
    return readCollection(COLLECTION).map((vehiculo) => ({ ...vehiculo }))
  },

  async getById(id) {
    const vehiculo = readCollection(COLLECTION).find((item) => item.id === id)
    if (!vehiculo) throw new NotFoundError('Vehiculo', id)
    return { ...vehiculo }
  },

  async create(data) {
    const vehiculo = createVehiculo({ ...data, id: createId('vehiculo') })
    writeCollection(COLLECTION, [...readCollection(COLLECTION), vehiculo])
    return { ...vehiculo }
  },

  async update(id, data) {
    const vehiculos = readCollection(COLLECTION)
    const index = vehiculos.findIndex((item) => item.id === id)
    if (index === -1) throw new NotFoundError('Vehiculo', id)
    const actualizado = createVehiculo({ ...vehiculos[index], ...data, id })
    vehiculos[index] = actualizado
    writeCollection(COLLECTION, vehiculos)
    return { ...actualizado }
  },

  async delete(id) {
    const vehiculos = readCollection(COLLECTION)
    if (!vehiculos.some((item) => item.id === id)) throw new NotFoundError('Vehiculo', id)
    writeCollection(COLLECTION, vehiculos.filter((item) => item.id !== id))
  },
}
