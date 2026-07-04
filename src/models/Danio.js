/**
 * Crea un objeto Danio consistente con el dominio.
 * Las coordenadas son normalizadas (0.0 a 1.0), no en píxeles.
 * @param {Object} data
 * @param {string} [data.id]
 * @param {string} data.ordenTrabajoId
 * @param {string} data.vista - FRENTE | TRASERA | LATERAL_IZQUIERDO | LATERAL_DERECHO
 * @param {number} data.coordenadaX - valor normalizado 0.0–1.0
 * @param {number} data.coordenadaY - valor normalizado 0.0–1.0
 * @param {string} data.tipoDanio
 * @param {string} [data.descripcion]
 * @returns {import('../types/danio').Danio}
 */
export function createDanio(data) {
  return {
    id: data.id ?? null,
    ordenTrabajoId: data.ordenTrabajoId,
    vista: data.vista,
    coordenadaX: Number(data.coordenadaX),
    coordenadaY: Number(data.coordenadaY),
    tipoDanio: data.tipoDanio,
    descripcion: data.descripcion?.trim() ?? '',
  }
}
