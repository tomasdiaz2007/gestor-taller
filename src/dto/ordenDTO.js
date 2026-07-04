import { createOrdenTrabajo } from '../models/OrdenTrabajo'

/**
 * @param {import('firebase/firestore').DocumentSnapshot} doc
 * @returns {import('../types/orden').OrdenTrabajo}
 */
export function ordenFromFirestore(doc) {
  const data = doc.data()
  return createOrdenTrabajo({
    ...data,
    id: doc.id,
    // Firestore Timestamps → ISO string
    fechaIngreso: data.fechaIngreso?.toDate?.()?.toISOString() ?? data.fechaIngreso,
    fechaEntrega: data.fechaEntrega?.toDate?.()?.toISOString() ?? data.fechaEntrega,
  })
}

/**
 * @param {import('../types/orden').OrdenTrabajo} orden
 * @returns {Object}
 */
export function ordenToFirestore(orden) {
  const { id, ...rest } = orden
  return rest
}
