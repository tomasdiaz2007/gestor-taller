import { createDanio } from '../models/Danio'
import { NotFoundError } from '../errors/NotFoundError'
import { createId, readCollection, writeCollection } from './localStorage'

const COLLECTION = 'danios'

export const danioRepository = {
  async getAllByOrden(ordenId) {
    return readCollection(COLLECTION)
      .filter((danio) => danio.ordenTrabajoId === ordenId)
      .map((danio) => ({ ...danio }))
  },

  async create(data) {
    const danio = createDanio({ ...data, id: createId('danio') })
    writeCollection(COLLECTION, [...readCollection(COLLECTION), danio])
    return { ...danio }
  },

  async update(id, data) {
    const danios = readCollection(COLLECTION)
    const index = danios.findIndex((danio) => danio.id === id)
    if (index === -1) throw new NotFoundError('Danio', id)
    const actualizado = createDanio({ ...danios[index], ...data, id })
    danios[index] = actualizado
    writeCollection(COLLECTION, danios)
    return { ...actualizado }
  },

  async delete(id) {
    const danios = readCollection(COLLECTION)
    if (!danios.some((danio) => danio.id === id)) throw new NotFoundError('Danio', id)
    writeCollection(COLLECTION, danios.filter((danio) => danio.id !== id))
  },
}
