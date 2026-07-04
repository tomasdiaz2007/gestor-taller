import { createVehiculo } from '../models/Vehiculo'

/**
 * Convierte un documento Firestore a modelo de dominio.
 * @param {import('firebase/firestore').DocumentSnapshot} doc
 * @returns {import('../types/vehiculo').Vehiculo}
 */
export function vehiculoFromFirestore(doc) {
  const data = doc.data()
  return createVehiculo({ ...data, id: doc.id })
}

/**
 * Convierte un modelo de dominio al formato que Firestore espera.
 * Excluye el id (Firestore lo maneja como document ID).
 * @param {import('../types/vehiculo').Vehiculo} vehiculo
 * @returns {Object}
 */
export function vehiculoToFirestore(vehiculo) {
  const { id, ...rest } = vehiculo
  return rest
}
