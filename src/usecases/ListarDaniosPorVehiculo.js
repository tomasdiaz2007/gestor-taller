import { danioRepository } from '../repositories/danioRepository'
import { ordenRepository } from '../repositories/ordenRepository'

export async function ListarDaniosPorVehiculo(vehiculoId) {
  if (!vehiculoId) return []
  
  const ordenes = await ordenRepository.getAll()
  const ordenesVehiculo = ordenes.filter((o) => o.vehiculoId === vehiculoId)
  
  let todosLosDanios = []
  for (const o of ordenesVehiculo) {
    const danios = await danioRepository.getAllByOrden(o.id)
    todosLosDanios = [...todosLosDanios, ...danios]
  }
  
  return todosLosDanios
}
