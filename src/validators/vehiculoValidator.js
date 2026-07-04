/**
 * Valida los datos de un vehículo antes de persistirlo.
 * @param {Object} data
 * @returns {{ valid: boolean, errors: string[] }}
 */
export function validateVehiculo(data) {
  const errors = []

  if (!data.patente?.trim()) errors.push('La patente es obligatoria')
  else if (!/^[A-Za-z0-9]{6,7}$/.test(data.patente.trim()))
    errors.push('La patente debe tener 6 o 7 caracteres alfanuméricos')

  if (!data.marca?.trim()) errors.push('La marca es obligatoria')
  if (!data.modelo?.trim()) errors.push('El modelo es obligatorio')

  const año = Number(data.año)
  if (!año || año < 1900 || año > new Date().getFullYear() + 1)
    errors.push(`El año debe estar entre 1900 y ${new Date().getFullYear() + 1}`)

  if (!data.clienteNombre?.trim()) errors.push('El nombre del cliente es obligatorio')

  if (!data.clienteTelefono?.trim()) errors.push('El teléfono del cliente es obligatorio')

  return { valid: errors.length === 0, errors }
}
