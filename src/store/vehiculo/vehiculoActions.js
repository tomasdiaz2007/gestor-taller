import { ListarVehiculos } from '../../usecases/ListarVehiculos'
import { RegistrarVehiculo } from '../../usecases/RegistrarVehiculo'
import { ObtenerVehiculo } from '../../usecases/ObtenerVehiculo'
import { EditarVehiculo } from '../../usecases/EditarVehiculo'
import { EliminarVehiculo } from '../../usecases/EliminarVehiculo'
import { logger } from '../../logger/logger'

/**
 * Acciones del store de vehículos.
 * @param {Function} set
 */
export function vehiculoActions(set) {
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

    editarVehiculo: async (id, data) => {
      set({ loading: true, error: null })
      try {
        const vehiculoActualizado = await EditarVehiculo(id, data)
        set((state) => ({
          vehiculos: state.vehiculos.map((v) => (v.id === id ? vehiculoActualizado : v)),
          vehiculoActual: state.vehiculoActual?.id === id ? vehiculoActualizado : state.vehiculoActual,
          loading: false,
        }))
        return vehiculoActualizado
      } catch (err) {
        logger.error('editarVehiculo', err)
        set({ error: err.message, loading: false })
        throw err
      }
    },

    eliminarVehiculo: async (id) => {
      set({ loading: true, error: null })
      try {
        await EliminarVehiculo(id)
        set((state) => ({
          vehiculos: state.vehiculos.filter((v) => v.id !== id),
          vehiculoActual: state.vehiculoActual?.id === id ? null : state.vehiculoActual,
          loading: false,
        }))
      } catch (err) {
        logger.error('eliminarVehiculo', err)
        set({ error: err.message, loading: false })
        throw err
      }
    },

    clearError: () => set({ error: null }),
  }
}
