import { ListarRepuestos } from '../../usecases/ListarRepuestos'
import { AgregarRepuesto } from '../../usecases/AgregarRepuesto'
import { EditarRepuesto } from '../../usecases/EditarRepuesto'
import { EliminarRepuesto } from '../../usecases/EliminarRepuesto'
import { AjustarStock } from '../../usecases/AjustarStock'
import { logger } from '../../logger/logger'

export function stockActions(set, get) {
  return {
    fetchRepuestos: async () => {
      set({ loading: true, error: null })
      try {
        const repuestos = await ListarRepuestos()
        set({ repuestos, loading: false })
      } catch (err) {
        logger.error('fetchRepuestos', err)
        set({ error: err.message, loading: false })
      }
    },

    agregarRepuesto: async (data) => {
      set({ loading: true, error: null })
      try {
        const repuesto = await AgregarRepuesto(data)
        set((state) => ({ repuestos: [...state.repuestos, repuesto], loading: false }))
        return repuesto
      } catch (err) {
        logger.error('agregarRepuesto', err)
        set({ error: err.message, loading: false })
        throw err
      }
    },

    editarRepuesto: async (id, data) => {
      set({ loading: true, error: null })
      try {
        const repuesto = await EditarRepuesto(id, data)
        set((state) => ({
          repuestos: state.repuestos.map((r) => (r.id === id ? repuesto : r)),
          loading: false,
        }))
        return repuesto
      } catch (err) {
        logger.error('editarRepuesto', err)
        set({ error: err.message, loading: false })
        throw err
      }
    },

    eliminarRepuesto: async (id) => {
      set({ loading: true, error: null })
      try {
        await EliminarRepuesto(id)
        set((state) => ({
          repuestos: state.repuestos.filter((r) => r.id !== id),
          loading: false,
        }))
      } catch (err) {
        logger.error('eliminarRepuesto', err)
        set({ error: err.message, loading: false })
        throw err
      }
    },

    ajustarStock: async (id, delta) => {
      set({ loading: true, error: null })
      try {
        const repuesto = await AjustarStock(id, delta)
        set((state) => ({
          repuestos: state.repuestos.map((r) => (r.id === id ? repuesto : r)),
          loading: false,
        }))
        return repuesto
      } catch (err) {
        logger.error('ajustarStock', err)
        set({ error: err.message, loading: false })
        throw err
      }
    },

    // Refresca un repuesto en el store local luego de descontar stock
    actualizarRepuestoLocal: (repuestoActualizado) => {
      set((state) => ({
        repuestos: state.repuestos.map((r) =>
          r.id === repuestoActualizado.id ? repuestoActualizado : r
        ),
      }))
    },

    clearError: () => set({ error: null }),
  }
}
