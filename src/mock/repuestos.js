/** @type {import('../types/repuesto').Repuesto[]} */
export const repuestosMock = [
  {
    id: 'r1',
    codigo: 'FILT-001',
    nombre: 'Filtro de aceite',
    stockActual: 15,
    precio: 1200,
  },
  {
    id: 'r2',
    codigo: 'FILT-002',
    nombre: 'Filtro de aire',
    stockActual: 8,
    precio: 950,
  },
  {
    id: 'r3',
    codigo: 'CORR-001',
    nombre: 'Correa de distribución',
    stockActual: 3,
    precio: 4500,
  },
  {
    id: 'r4',
    codigo: 'PAST-001',
    nombre: 'Pastillas de freno delanteras',
    stockActual: 6,
    precio: 3200,
  },
  {
    id: 'r5',
    codigo: 'ACEI-001',
    nombre: 'Aceite 10W40 (1L)',
    stockActual: 0,
    precio: 800,
  },
]

/** @type {import('../types/repuesto').RepuestoUsado[]} */
export const repuestosUsadosMock = [
  {
    id: 'ru1',
    ordenTrabajoId: 'o1',
    repuestoId: 'r3',
    cantidad: 1,
  },
]
