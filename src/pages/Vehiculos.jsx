import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Card from '../components/common/Card'
import Button from '../components/common/Button'
import Input from '../components/common/Input'
import Modal from '../components/common/Modal'
import { useVehiculoStore } from '../store/vehiculo/vehiculoStore'
import { useToast } from '../components/common/ToastProvider'
import { ROUTES } from '../config/routes'

export default function Vehiculos() {
  const navigate = useNavigate()
  const addToast = useToast()
  const { vehiculos, fetchVehiculos, eliminarVehiculo, loading } = useVehiculoStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, vehiculoId: null, patente: '' })

  useEffect(() => {
    fetchVehiculos()
  }, [fetchVehiculos])

  const filteredVehiculos = vehiculos.filter((v) => {
    const term = searchTerm.toLowerCase()
    return (
      v.patente.toLowerCase().includes(term) ||
      v.marca.toLowerCase().includes(term) ||
      v.modelo.toLowerCase().includes(term)
    )
  })

  const confirmDelete = (vehiculo) => {
    setDeleteModal({ isOpen: true, vehiculoId: vehiculo.id, patente: vehiculo.patente })
  }

  const handleDelete = async () => {
    try {
      await eliminarVehiculo(deleteModal.vehiculoId)
      addToast(`Vehículo ${deleteModal.patente} eliminado`, 'success')
      setDeleteModal({ isOpen: false, vehiculoId: null, patente: '' })
    } catch (err) {
      addToast(err.message, 'error')
      setDeleteModal({ isOpen: false, vehiculoId: null, patente: '' })
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-100">Vehículos</h1>
        <Button onClick={() => navigate(ROUTES.VEHICULOS_NUEVO)}>
          + Nuevo Vehículo
        </Button>
      </div>

      <Card padding={false}>
        <div className="p-4 border-b border-slate-700">
          <div className="max-w-md">
            <Input
              placeholder="Buscar por patente, marca o modelo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {loading && vehiculos.length === 0 ? (
          <div className="p-8 text-center text-slate-500">Cargando vehículos...</div>
        ) : filteredVehiculos.length === 0 ? (
          <div className="p-8 text-center text-slate-500">No se encontraron vehículos.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table-base w-full text-left">
              <thead>
                <tr>
                  <th>Patente</th>
                  <th>Marca</th>
                  <th>Modelo</th>
                  <th>Año</th>
                  <th>Cliente</th>
                  <th className="text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filteredVehiculos.map((v) => (
                  <tr key={v.id} className="hover:bg-slate-800/50 transition-colors">
                    <td className="font-mono text-slate-300">{v.patente}</td>
                    <td>{v.marca}</td>
                    <td>{v.modelo}</td>
                    <td className="text-slate-400">{v.año}</td>
                    <td>{v.clienteNombre}</td>
                    <td className="text-right space-x-2">
                      <Link 
                        to={`/vehiculos/${v.id}`}
                        className="p-2 text-slate-400 hover:text-blue-400 transition-colors inline-block"
                        title="Ver detalle"
                      >
                        👁
                      </Link>
                      <Link 
                        to={`/vehiculos/${v.id}/editar`}
                        className="p-2 text-slate-400 hover:text-yellow-400 transition-colors inline-block"
                        title="Editar"
                      >
                        ✏️
                      </Link>
                      <button 
                        onClick={() => confirmDelete(v)}
                        className="p-2 text-slate-400 hover:text-red-400 transition-colors inline-block"
                        title="Eliminar"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Modal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, vehiculoId: null, patente: '' })}
        title="Confirmar eliminación"
        size="sm"
        footer={
          <>
            <Button variant="ghost" onClick={() => setDeleteModal({ isOpen: false, vehiculoId: null, patente: '' })}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={handleDelete} loading={loading}>
              Eliminar
            </Button>
          </>
        }
      >
        <p className="text-sm text-slate-300">
          ¿Desea eliminar el vehículo con patente <strong className="text-slate-100">{deleteModal.patente}</strong>?
        </p>
        <p className="text-sm text-red-400 mt-2 font-medium">
          Esta acción no puede deshacerse.
        </p>
      </Modal>
    </div>
  )
}
