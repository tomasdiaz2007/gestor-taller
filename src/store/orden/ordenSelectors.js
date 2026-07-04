export const selectOrdenes = (state) => state.ordenes
export const selectOrdenActual = (state) => state.ordenActual
export const selectOrdenLoading = (state) => state.loading
export const selectOrdenError = (state) => state.error

/** @param {string} id */
export const selectOrdenById = (id) => (state) =>
  state.ordenes.find((o) => o.id === id) ?? null

/** @param {string} vehiculoId */
export const selectOrdenesByVehiculo = (vehiculoId) => (state) =>
  state.ordenes.filter((o) => o.vehiculoId === vehiculoId)

/** Órdenes activas (no entregadas) */
export const selectOrdenesActivas = (state) =>
  state.ordenes.filter((o) => o.estadoActual !== 'ENTREGADO')
