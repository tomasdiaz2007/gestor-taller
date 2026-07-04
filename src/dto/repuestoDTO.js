import { createRepuesto } from '../models/Repuesto'

/**
 * @param {import('firebase/firestore').DocumentSnapshot} doc
 * @returns {import('../types/repuesto').Repuesto}
 */
export function repuestoFromFirestore(doc) {
  return createRepuesto({ ...doc.data(), id: doc.id })
}

/**
 * @param {import('../types/repuesto').Repuesto} repuesto
 * @returns {Object}
 */
export function repuestoToFirestore(repuesto) {
  const { id, ...rest } = repuesto
  return rest
}
