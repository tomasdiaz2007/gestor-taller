import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Card from '../components/common/Card'
import Button from '../components/common/Button'
import Input from '../components/common/Input'
import { useVehiculoStore } from '../store/vehiculo/vehiculoStore'
import { useToast } from '../components/common/ToastProvider'
import { ROUTES } from '../config/routes'

const initialForm = {
  patente: '',
  marca: '',
  modelo: '',
  año: new Date().getFullYear(),
  clienteNombre: '',
  clienteTelefono: '',
}

export default function IngresoVehiculo() {
  const { id } = useParams()
  const isEditing = Boolean(id)
  const navigate = useNavigate()
  const addToast = useToast()
  const { registrarVehiculo, editarVehiculo, fetchVehiculoActual, vehiculoActual, loading } = useVehiculoStore()
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (isEditing) {
      fetchVehiculoActual(id)
    }
  }, [id, isEditing, fetchVehiculoActual])

  useEffect(() => {
    if (isEditing && vehiculoActual && vehiculoActual.id === id) {
      setForm({
        patente: vehiculoActual.patente,
        marca: vehiculoActual.marca,
        modelo: vehiculoActual.modelo,
        año: vehiculoActual.año,
        clienteNombre: vehiculoActual.clienteNombre,
        clienteTelefono: vehiculoActual.clienteTelefono,
      })
    }
  }, [isEditing, vehiculoActual, id])

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (isEditing) {
        await editarVehiculo(id, form)
        addToast(`Vehículo ${form.patente} actualizado correctamente`, 'success')
        navigate(ROUTES.VEHICULOS)
      } else {
        const vehiculo = await registrarVehiculo(form)
        addToast(`Vehículo ${vehiculo.patente} registrado correctamente`, 'success')
        navigate(ROUTES.VEHICULOS)
      }
    } catch (err) {
      // Errores de validación: mostrar por campo
      if (err.errors?.length) {
        const fieldErrors = {}
        err.errors.forEach((msg) => {
          if (msg.includes('patente')) fieldErrors.patente = msg
          else if (msg.includes('marca')) fieldErrors.marca = msg
          else if (msg.includes('modelo')) fieldErrors.modelo = msg
          else if (msg.includes('año')) fieldErrors.año = msg
          else if (msg.includes('nombre')) fieldErrors.clienteNombre = msg
          else if (msg.includes('teléfono')) fieldErrors.clienteTelefono = msg
        })
        setErrors(fieldErrors)
      }
      addToast(err.message, 'error')
    }
  }

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <Card>
        <h2 className="text-lg font-semibold text-slate-100 mb-6">
          {isEditing ? 'Editar vehículo' : 'Datos del vehículo'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Datos del vehículo */}
          <div className="grid grid-cols-2 gap-4">
            <Input
              id="patente"
              label="Patente"
              placeholder="AB123CD"
              value={form.patente}
              onChange={handleChange('patente')}
              error={errors.patente}
              required
            />
            <Input
              id="año"
              label="Año"
              type="number"
              placeholder="2024"
              min={1900}
              max={2026}
              value={form.año}
              onChange={handleChange('año')}
              error={errors.año}
              required
            />
            <Input
              id="marca"
              label="Marca"
              placeholder="Marca del vehículo"
              value={form.marca}
              onChange={handleChange('marca')}
              error={errors.marca}
              required
            />
            <Input
              id="modelo"
              label="Modelo"
              placeholder="Modelo del vehículo"
              value={form.modelo}
              onChange={handleChange('modelo')}
              error={errors.modelo}
              required
            />
          </div>

          <hr className="divider-gradient" />

          {/* Datos del cliente */}
          <h3 className="text-sm font-medium text-slate-400">Datos del cliente</h3>
          <div className="grid grid-cols-2 gap-4">
            <Input
              id="clienteNombre"
              label="Nombre"
              placeholder="Nombre del cliente"
              value={form.clienteNombre}
              onChange={handleChange('clienteNombre')}
              error={errors.clienteNombre}
              required
            />
            <Input
              id="clienteTelefono"
              label="Teléfono"
              type="tel"
              inputMode="numeric"
              placeholder="Ej: 1123456789"
              maxLength={15}
              value={form.clienteTelefono}
              onChange={(e) => {
                const soloNumeros = e.target.value.replace(/\D/g, '').slice(0, 15)
                setForm((prev) => ({ ...prev, clienteTelefono: soloNumeros }))
                if (errors.clienteTelefono) setErrors((prev) => ({ ...prev, clienteTelefono: '' }))
              }}
              error={errors.clienteTelefono}
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button variant="ghost" onClick={() => navigate(-1)} type="button">
              Cancelar
            </Button>
            <Button type="submit" loading={loading} id="btn-registrar-vehiculo">
              {isEditing ? 'Guardar cambios' : 'Registrar vehículo'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
