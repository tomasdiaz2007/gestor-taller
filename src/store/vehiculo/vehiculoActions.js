import { ListarVehiculos } from '../../usecases/ListarVehiculos'
import { RegistrarVehiculo } from '../../usecases/RegistrarVehiculo'
import { ObtenerVehiculo } from '../../usecases/ObtenerVehiculo'
import { logger } from '../../logger/logger'

/**
 * Acciones del store de vehículos.
 * @param {Function} set
 * @param {Function} get
 */
export function vehiculoActions(set, get) {
  return {
    fetchVehiculos: async () => {
      set({ loading: true, error: null })
      try {
        const vehiculos = await ListarVehiculos()
        set({ vehiculos, loading: false })
      } catch (err) {
        logger.error('fetchVehiculos', err)
        set({ error: err.message, loading: false })
      }
    },

    registrarVehiculo: async (data) => {
      set({ loading: true, error: null })
      try {
        const vehiculo = await RegistrarVehiculo(data)
        set((state) => ({ vehiculos: [...state.vehiculos, vehiculo], loading: false }))
        return vehiculo
      } catch (err) {
        logger.error('registrarVehiculo', err)
        set({ error: err.message, loading: false })
        throw err
      }
    },

    fetchVehiculoActual: async (id) => {
      set({ loading: true, error: null })
      try {
        const vehiculo = await ObtenerVehiculo(id)
        set({ vehiculoActual: vehiculo, loading: false })
      } catch (err) {
        logger.error('fetchVehiculoActual', err)
        set({ error: err.message, loading: false })
      }
    },

    clearError: () => set({ error: null }),
  }
}
