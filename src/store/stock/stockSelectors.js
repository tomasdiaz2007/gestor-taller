export const selectRepuestos = (state) => state.repuestos
export const selectStockLoading = (state) => state.loading
export const selectStockError = (state) => state.error

/** Repuestos con stock 0 */
export const selectRepuestosSinStock = (state) =>
  state.repuestos.filter((r) => r.stockActual === 0)

/** @param {string} id */
export const selectRepuestoById = (id) => (state) =>
  state.repuestos.find((r) => r.id === id) ?? null
