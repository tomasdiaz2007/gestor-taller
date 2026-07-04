/**
 * Formatea un precio en pesos argentinos.
 * @param {number} precio
 * @returns {string}
 */
export function formatPrecio(precio) {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
  }).format(precio)
}

/**
 * Formatea una patente para mostrarla con guión (ej: AB123CD → AB 123 CD).
 * @param {string} patente
 * @returns {string}
 */
export function formatPatente(patente) {
  if (!patente) return ''
  const p = patente.toUpperCase().trim()
  // Formato nuevo: ABC123 (6 dígitos)
  if (/^[A-Z]{2}\d{3}[A-Z]{2}$/.test(p)) return `${p.slice(0, 2)} ${p.slice(2, 5)} ${p.slice(5)}`
  return p
}
