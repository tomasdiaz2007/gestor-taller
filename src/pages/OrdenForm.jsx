import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Card from '../components/common/Card'
import Button from '../components/common/Button'
import Input from '../components/common/Input'
import { useOrdenStore } from '../store/orden/ordenStore'
import { useVehiculoStore } from '../store/vehiculo/vehiculoStore'
import { AgregarDanio } from '../usecases/AgregarDanio'
import { selectVehiculos } from '../store/vehiculo/vehiculoSelectors'
import { useToast } from '../components/common/ToastProvider'
import VehicleDiagram from '../components/vehicle/VehicleDiagram'
import { ordenDetalleRoute } from '../config/routes'

const hoy = () => new Date().toISOString().slice(0, 10)

const initialForm = {
  vehiculoId: '',
  problemaInformado: '',
  diagnostico: '',
  observaciones: '',
  kilometraje: '',
  combustible: 'Vacio',
  tecnicoAsignado: '',
  fechaPrometida: '',
  prioridad: 'Media',
}

export default function OrdenForm() {
  const { id } = useParams()
  const isEditing = Boolean(id)
  const navigate = useNavigate()
  const addToast = useToast()
  
  const { crearOrden, editarOrden, fetchOrdenActual, ordenActual, loading } = useOrdenStore()
  const vehiculos = useVehiculoStore(selectVehiculos)
  const fetchVehiculos = useVehiculoStore((s) => s.fetchVehiculos)
  
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [daniosNuevos, setDaniosNuevos] = useState([])

  const handleAgregarDanio = async (danioData) => {
    setDaniosNuevos((prev) => [...prev, { id: crypto.randomUUID(), ...danioData }])
  }

  const handleEditarDanio = async (danioId, danioData) => {
    setDaniosNuevos((prev) => prev.map((d) => (d.id === danioId ? { ...d, ...danioData } : d)))
  }

  useEffect(() => {
    fetchVehiculos()
    if (isEditing) {
      fetchOrdenActual(id)
    }
  }, [id, isEditing, fetchVehiculos, fetchOrdenActual])

  useEffect(() => {
    if (isEditing && ordenActual && ordenActual.id === id) {
      setForm({
        vehiculoId: ordenActual.vehiculoId,
        problemaInformado: ordenActual.problemaInformado,
        diagnostico: ordenActual.diagnostico,
        observaciones: ordenActual.observaciones,
        kilometraje: ordenActual.kilometraje,
        combustible: ordenActual.combustible,
        tecnicoAsignado: ordenActual.tecnicoAsignado,
        fechaPrometida: ordenActual.fechaPrometida ? ordenActual.fechaPrometida.slice(0, 10) : '',
        prioridad: ordenActual.prioridad,
      })
    }
  }, [isEditing, ordenActual, id])

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validaciones
    if (!form.vehiculoId) {
      setErrors({ vehiculoId: 'Debe seleccionar un vehículo' })
      return
    }

    try {
      const dataToSave = { ...form, kilometraje: Number(form.kilometraje) || 0 }
      if (isEditing) {
        await editarOrden(id, dataToSave)
        addToast(`Orden de trabajo actualizada`, 'success')
        navigate(ordenDetalleRoute(id))
      } else {
        const orden = await crearOrden(dataToSave)
        for (const danio of daniosNuevos) {
          try {
            await AgregarDanio({ ...danio, ordenTrabajoId: orden.id })
          } catch (err) {
            console.error('No se pudo guardar un daño', err)
          }
        }
        addToast(`Orden de trabajo creada`, 'success')
        navigate(ordenDetalleRoute(orden.id))
      }
    } catch (err) {
      addToast(err.message, 'error')
    }
  }

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <Card>
        <h2 className="text-xl font-bold text-slate-100 mb-6">
          {isEditing ? 'Editar Orden de Trabajo' : 'Nueva Orden de Trabajo'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Vehículo */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-slate-400 border-b border-slate-800 pb-2">
              Datos Principales
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1 md:col-span-2">
                <label className="text-sm font-medium text-slate-300">
                  Vehículo <span className="text-red-400">*</span>
                </label>
                <select
                  value={form.vehiculoId}
                  onChange={handleChange('vehiculoId')}
                  disabled={isEditing}
                  className={`w-full rounded-lg border px-3 py-2 text-sm bg-slate-800 text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500/30 ${
                    errors.vehiculoId ? 'border-red-500' : 'border-slate-600 focus:border-blue-500'
                  }`}
                >
                  <option value="">Seleccionar vehículo...</option>
                  {vehiculos.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.patente} — {v.marca} {v.modelo} ({v.clienteNombre})
                    </option>
                  ))}
                </select>
                {errors.vehiculoId && <p className="text-xs text-red-400">{errors.vehiculoId}</p>}
              </div>

              <div className="flex flex-col gap-1 md:col-span-2">
                <label className="text-sm font-medium text-slate-300">
                  Problema informado
                </label>
                <textarea
                  rows={2}
                  value={form.problemaInformado}
                  onChange={handleChange('problemaInformado')}
                  placeholder="Describa el problema reportado por el cliente..."
                  className={`w-full rounded-lg border px-3 py-2 text-sm bg-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none resize-none ${
                    errors.problemaInformado ? 'border-red-500 focus:border-red-500' : 'border-slate-600 focus:border-blue-500'
                  }`}
                />
                {errors.problemaInformado && <p className="text-xs text-red-400">{errors.problemaInformado}</p>}
              </div>
            </div>
          </div>

          {/* Estado del Vehículo */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-slate-400 border-b border-slate-800 pb-2">
              Estado del Vehículo
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label="Kilometraje"
                type="number"
                placeholder="100000"
                value={form.kilometraje}
                onChange={handleChange('kilometraje')}
              />
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-slate-300">Combustible</label>
                <select
                  value={form.combustible}
                  onChange={handleChange('combustible')}
                  className="w-full rounded-lg border border-slate-600 px-3 py-2 text-sm bg-slate-800 text-slate-100 focus:outline-none focus:border-blue-500"
                >
                  <option value="Vacio">Vacío</option>
                  <option value="1/4">1/4 Tanque</option>
                  <option value="1/2">1/2 Tanque</option>
                  <option value="3/4">3/4 Tanque</option>
                  <option value="Lleno">Lleno</option>
                </select>
              </div>
            </div>
          </div>

          {/* Diagnóstico e Info Interna */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-slate-400 border-b border-slate-800 pb-2">
              Diagnóstico y Operación
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1 md:col-span-2">
                <label className="text-sm font-medium text-slate-300">Diagnóstico</label>
                <textarea
                  rows={2}
                  value={form.diagnostico}
                  onChange={handleChange('diagnostico')}
                  placeholder="Diagnóstico del taller..."
                  className="w-full rounded-lg border border-slate-600 px-3 py-2 text-sm bg-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 resize-none"
                />
              </div>

              <Input
                label="Técnico Asignado"
                placeholder="Nombre del mecánico..."
                value={form.tecnicoAsignado}
                onChange={handleChange('tecnicoAsignado')}
              />

              <Input
                label="Fecha Prometida"
                type="date"
                min={hoy()}
                value={form.fechaPrometida}
                onChange={handleChange('fechaPrometida')}
              />

              <div className="flex flex-col gap-1 md:col-span-2">
                <label className="text-sm font-medium text-slate-300">Prioridad</label>
                <select
                  value={form.prioridad}
                  onChange={handleChange('prioridad')}
                  className="w-full rounded-lg border border-slate-600 px-3 py-2 text-sm bg-slate-800 text-slate-100 focus:outline-none focus:border-blue-500"
                >
                  <option value="Baja">Baja</option>
                  <option value="Media">Media</option>
                  <option value="Alta">Alta</option>
                  <option value="Urgente">Urgente</option>
                </select>
              </div>

              <div className="flex flex-col gap-1 md:col-span-2">
                <label className="text-sm font-medium text-slate-300">Observaciones</label>
                <textarea
                  rows={2}
                  value={form.observaciones}
                  onChange={handleChange('observaciones')}
                  placeholder="Notas internas..."
                  className="w-full rounded-lg border border-slate-600 px-3 py-2 text-sm bg-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 resize-none"
                />
              </div>
            </div>
          </div>

          {/* Daños del vehículo (solo al crear) */}
          {!isEditing && form.vehiculoId && (
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-slate-400 border-b border-slate-800 pb-2">
                Daños del Vehículo
              </h3>
              <VehicleDiagram
                danios={daniosNuevos}
                onAgregarDanio={handleAgregarDanio}
                onEditarDanio={handleEditarDanio}
              />
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
            <Button variant="ghost" onClick={() => navigate(-1)} type="button">
              Cancelar
            </Button>
            <Button type="submit" loading={loading}>
              {isEditing ? 'Guardar Cambios' : 'Crear Orden'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
