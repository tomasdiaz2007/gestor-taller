/**
 * Selectores del store de vehículos.
 * Uso: const vehiculo = useVehiculoStore(selectVehiculoById('v1'))
 */

/**
 * @param {string} id
 * @returns {Function} selector para Zustand
 */
export const selectVehiculoById = (id) => (state) =>
  state.vehiculos.find((v) => v.id === id) ?? null

/** @param {Object} state */
export const selectVehiculos = (state) => state.vehiculos

/** @param {Object} state */
export const selectVehiculoActual = (state) => state.vehiculoActual

/** @param {Object} state */
export const selectVehiculoLoading = (state) => state.loading

/** @param {Object} state */
export const selectVehiculoError = (state) => state.error
