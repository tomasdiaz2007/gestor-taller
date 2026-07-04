import { ListarOrdenes } from '../../usecases/ListarOrdenes'
import { CrearOrdenTrabajo } from '../../usecases/CrearOrdenTrabajo'
import { ObtenerOrden } from '../../usecases/ObtenerOrden'
import { ActualizarEstadoOrden } from '../../usecases/ActualizarEstadoOrden'
import { EditarOrdenTrabajo } from '../../usecases/EditarOrdenTrabajo'
import { AgregarDanio } from '../../usecases/AgregarDanio'
import { ListarDanios } from '../../usecases/ListarDanios'
import { AgregarRepuestoAOrden } from '../../usecases/AgregarRepuestoAOrden'
import { EliminarOrden } from '../../usecases/EliminarOrden'
import { logger } from '../../logger/logger'

export function ordenActions(set, get) {
  return {
    fetchOrdenes: async () => {
      set({ loading: true, error: null })
      try {
        const ordenes = await ListarOrdenes()
        set({ ordenes, loading: false })
      } catch (err) {
        logger.error('fetchOrdenes', err)
        set({ error: err.message, loading: false })
      }
    },

    crearOrden: async (data) => {
      set({ loading: true, error: null })
      try {
        const orden = await CrearOrdenTrabajo(data)
        set((state) => ({ ordenes: [...state.ordenes, orden], loading: false }))
        return orden
      } catch (err) {
        logger.error('crearOrden', err)
        set({ error: err.message, loading: false })
        throw err
      }
    },

    fetchOrdenActual: async (id) => {
      set({ loading: true, error: null })
      try {
        const orden = await ObtenerOrden(id)
        const danios = await ListarDanios(id)
        set({ ordenActual: { ...orden, danios }, loading: false })
      } catch (err) {
        logger.error('fetchOrdenActual', err)
        set({ error: err.message, loading: false })
      }
    },

    actualizarEstado: async (ordenId, nuevoEstado) => {
      set({ loading: true, error: null })
      try {
        const actualizada = await ActualizarEstadoOrden(ordenId, nuevoEstado)
        set((state) => ({
          ordenes: state.ordenes.map((o) => (o.id === ordenId ? actualizada : o)),
          ordenActual: state.ordenActual?.id === ordenId ? { ...state.ordenActual, ...actualizada } : state.ordenActual,
          loading: false,
        }))
        return actualizada
      } catch (err) {
        logger.error('actualizarEstado', err)
        set({ error: err.message, loading: false })
        throw err
      }
    },

    editarOrden: async (id, data) => {
      set({ loading: true, error: null })
      try {
        const ordenActualizada = await EditarOrdenTrabajo(id, data)
        set((state) => ({
          ordenes: state.ordenes.map((o) => (o.id === id ? ordenActualizada : o)),
          ordenActual: state.ordenActual?.id === id ? { ...state.ordenActual, ...ordenActualizada } : state.ordenActual,
          loading: false,
        }))
        return ordenActualizada
      } catch (err) {
        logger.error('editarOrden', err)
        set({ error: err.message, loading: false })
        throw err
      }
    },

    agregarDanio: async (data) => {
      set({ loading: true, error: null })
      try {
        const danio = await AgregarDanio(data)
        set((state) => ({
          ordenActual: state.ordenActual
            ? { ...state.ordenActual, danios: [...(state.ordenActual.danios || []), danio] }
            : state.ordenActual,
          loading: false,
        }))
        return danio
      } catch (err) {
        logger.error('agregarDanio', err)
        set({ error: err.message, loading: false })
        throw err
      }
    },

    agregarRepuestoAOrden: async (ordenId, repuestoId, cantidad) => {
      set({ loading: true, error: null })
      try {
        const repuestoUsado = await AgregarRepuestoAOrden(ordenId, repuestoId, cantidad)
        set({ loading: false })
        return repuestoUsado
      } catch (err) {
        logger.error('agregarRepuestoAOrden', err)
        set({ error: err.message, loading: false })
        throw err
      }
    },

    eliminarOrden: async (id) => {
      set({ loading: true, error: null })
      try {
        await EliminarOrden(id)
        set((state) => ({
          ordenes: state.ordenes.filter((o) => o.id !== id),
          ordenActual: state.ordenActual?.id === id ? null : state.ordenActual,
          loading: false,
        }))
      } catch (err) {
        logger.error('eliminarOrden', err)
        set({ error: err.message, loading: false })
        throw err
      }
    },

    clearError: () => set({ error: null }),
  }
}
