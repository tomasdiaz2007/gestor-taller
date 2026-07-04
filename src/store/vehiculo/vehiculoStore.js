import { create } from 'zustand'
import { vehiculoActions } from './vehiculoActions'

/**
 * Store de vehículos.
 * Estado: vehiculos[], loading, error, vehiculoActual
 */
export const useVehiculoStore = create((set, get) => ({
  vehiculos: [],
  vehiculoActual: null,
  loading: false,
  error: null,

  ...vehiculoActions(set, get),
}))
