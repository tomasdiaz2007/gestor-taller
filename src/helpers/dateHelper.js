/**
 * Formatea una fecha ISO string a formato legible en español.
 * @param {string} isoString
 * @returns {string}
 */
export function formatFecha(isoString) {
  if (!isoString) return '—'
  return new Date(isoString).toLocaleDateString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

/**
 * Calcula los días que un vehículo lleva en el taller.
 * @param {string} fechaIngreso - ISO string
 * @returns {number}
 */
export function calcularDiasEnTaller(fechaIngreso) {
  if (!fechaIngreso) return 0
  const ingreso = new Date(fechaIngreso)
  const hoy = new Date()
  const diffMs = hoy - ingreso
  return Math.floor(diffMs / (1000 * 60 * 60 * 24))
}
