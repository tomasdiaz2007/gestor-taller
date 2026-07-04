import { ESTADOS_ORDEN } from '../config/status'

/** @type {import('../types/orden').OrdenTrabajo[]} */
export const ordenesMock = [
  {
    id: 'o1',
    vehiculoId: 'v1',
    fechaIngreso: '2026-06-25T09:00:00.000Z',
    fechaEntrega: null,
    estadoActual: ESTADOS_ORDEN.EN_REPARACION,
    problemaInformado: 'Ruido en motor al acelerar',
    diagnostico: 'Falla en correa de distribución',
  },
  {
    id: 'o2',
    vehiculoId: 'v2',
    fechaIngreso: '2026-06-28T11:30:00.000Z',
    fechaEntrega: null,
    estadoActual: ESTADOS_ORDEN.EN_DIAGNOSTICO,
    problemaInformado: 'Luz de check engine encendida',
    diagnostico: '',
  },
  {
    id: 'o3',
    vehiculoId: 'v3',
    fechaIngreso: '2026-07-01T08:00:00.000Z',
    fechaEntrega: null,
    estadoActual: ESTADOS_ORDEN.INGRESADO,
    problemaInformado: 'Revisión de frenos y aceite',
    diagnostico: '',
  },
]
