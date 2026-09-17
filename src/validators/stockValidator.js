/**
 * Valida que haya stock suficiente antes de descontar.
 * @param {import('../types/repuesto').Repuesto} repuesto
 * @param {number} cantidad
 * @returns {{ valid: boolean, errors: string[] }}
 */
export function validateStockSuficiente(repuesto, cantidad) {
  const errors = []

  if (!repuesto) {
    errors.push('El repuesto no existe')
    return { valid: false, errors }
  }

  if (cantidad <= 0) {
    errors.push('La cantidad debe ser mayor a cero')
  }

  if (repuesto.stockActual < cantidad) {
    errors.push(
      `Stock insuficiente para "${repuesto.nombre}". Disponible: ${repuesto.stockActual}, solicitado: ${cantidad}`
    )
  }

  return { valid: errors.length === 0, errors }
}

/**
 * Valida los datos para crear un nuevo repuesto.
 * @param {Object} data
 * @returns {{ valid: boolean, errors: string[] }}
 */
export function validateRepuesto(data) {
  const errors = []
  if (!data.codigo?.trim()) errors.push('El código es obligatorio')
  if (!data.nombre?.trim()) errors.push('El nombre es obligatorio')
  if (isNaN(Number(data.stockActual)) || Number(data.stockActual) < 0)
    errors.push('El stock no puede ser negativo')
  const pLista = Number(data.precioLista ?? data.precio)
  if (isNaN(pLista) || pLista < 0)
    errors.push('El precio de lista no puede ser negativo')
  const pVenta = Number(data.precioVenta ?? data.precio)
  if (isNaN(pVenta) || pVenta < 0)
    errors.push('El precio de venta no puede ser negativo')
  return { valid: errors.length === 0, errors }
}
