import { getFirestore } from 'firebase/firestore'
import { app } from './config'

// Instancia de Firestore — importar desde aquí en los repositories (Fase 4)
export const db = getFirestore(app)
