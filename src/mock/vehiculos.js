import { ESTADOS_ORDEN } from '../config/status'

/** @type {import('../types/vehiculo').Vehiculo[]} */
export const vehiculosMock = [
  {
    id: 'v1',
    patente: 'AB123CD',
    marca: 'Toyota',
    modelo: 'Corolla',
    año: 2020,
    clienteNombre: 'Juan Pérez',
    clienteTelefono: '11-4567-8901',
  },
  {
    id: 'v2',
    patente: 'EF456GH',
    marca: 'Volkswagen',
    modelo: 'Golf',
    año: 2019,
    clienteNombre: 'María García',
    clienteTelefono: '11-2345-6789',
  },
  {
    id: 'v3',
    patente: 'IJ789KL',
    marca: 'Ford',
    modelo: 'Focus',
    año: 2021,
    clienteNombre: 'Carlos López',
    clienteTelefono: '11-9876-5432',
  },
]
