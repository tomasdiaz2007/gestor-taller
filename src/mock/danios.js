import { VISTAS_VEHICULO, TIPOS_DANIO } from '../config/constants'

/** @type {import('../types/danio').Danio[]} */
export const daniosMock = [
  {
    id: 'd1',
    ordenTrabajoId: 'o1',
    vista: VISTAS_VEHICULO.LATERAL_IZQUIERDO,
    coordenadaX: 0.42,
    coordenadaY: 0.67,
    tipoDanio: TIPOS_DANIO.ABOLLADURA,
    descripcion: 'Abolladura en puerta trasera izquierda',
  },
  {
    id: 'd2',
    ordenTrabajoId: 'o1',
    vista: VISTAS_VEHICULO.FRENTE,
    coordenadaX: 0.5,
    coordenadaY: 0.3,
    tipoDanio: TIPOS_DANIO.RAYON,
    descripcion: 'Rayón en capó',
  },
]
