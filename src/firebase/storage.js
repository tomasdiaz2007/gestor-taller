import { getStorage } from 'firebase/storage'
import { app } from './config'

// Instancia de Firebase Storage — preparada para futuras fotografías de vehículos
export const storage = getStorage(app)
