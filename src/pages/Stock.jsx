import React, { useEffect, useState } from 'react'
import Card from '../components/common/Card'
import Button from '../components/common/Button'
import Modal from '../components/common/Modal'
import Input from '../components/common/Input'
import { useStockStore } from '../store/stock/stockStore'
import { selectRepuestos } from '../store/stock/stockSelectors'
import { useToast } from '../components/common/ToastProvider'
import { formatPrecio } from '../helpers/formatHelper'

const initialForm = { codigo: '', nombre: '', stockActual: '', precio: '' }

// Icono editar
function IconEdit() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
  )
}

// Icono eliminar
function IconTrash() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  )
}

export default function Stock() {
  const addToast = useToast()
  const repuestos = useStockStore(selectRepuestos)
  const { fetchRepuestos, agregarRepuesto, editarRepuesto, eliminarRepuesto, loading } = useStockStore()

  const [search, setSearch] = useState('')

  // Modal crear
  const [modalCrearOpen, setModalCrearOpen] = useState(false)
  const [formCrear, setFormCrear] = useState(initialForm)

  // Modal editar
  const [modalEditarOpen, setModalEditarOpen] = useState(false)
  const [repuestoEditar, setRepuestoEditar] = useState(null)
  const [formEditar, setFormEditar] = useState(initialForm)

  // Modal confirmar eliminación
  const [modalEliminarOpen, setModalEliminarOpen] = useState(false)
  const [repuestoEliminar, setRepuestoEliminar] = useState(null)

  useEffect(() => { fetchRepuestos() }, [fetchRepuestos])

  const repuestosFiltrados = repuestos.filter((r) =>
    r.nombre.toLowerCase().includes(search.toLowerCase()) ||
    r.codigo.toLowerCase().includes(search.toLowerCase())
  )

  // ── Crear ──────────────────────────────────────────────────────────────────
  const handleChangeCrear = (field) => (e) =>
    setFormCrear((p) => ({ ...p, [field]: e.target.value }))

  const handleCrear = async () => {
    try {
      await agregarRepuesto(formCrear)
      addToast('Repuesto agregado al stock', 'success')
      setModalCrearOpen(false)
      setFormCrear(initialForm)
    } catch (err) {
      addToast(err.message, 'error')
    }
  }

  // ── Editar ─────────────────────────────────────────────────────────────────
  const abrirEditar = (repuesto) => {
    setRepuestoEditar(repuesto)
    setFormEditar({
      codigo: repuesto.codigo,
      nombre: repuesto.nombre,
      stockActual: String(repuesto.stockActual),
      precio: String(repuesto.precio),
    })
    setModalEditarOpen(true)
  }

  const handleChangeEditar = (field) => (e) =>
    setFormEditar((p) => ({ ...p, [field]: e.target.value }))

  const handleEditar = async () => {
    try {
      await editarRepuesto(repuestoEditar.id, formEditar)
      addToast('Repuesto actualizado correctamente', 'success')
      setModalEditarOpen(false)
      setRepuestoEditar(null)
    } catch (err) {
      addToast(err.message, 'error')
    }
  }

  // ── Eliminar ───────────────────────────────────────────────────────────────
  const abrirEliminar = (repuesto) => {
    setRepuestoEliminar(repuesto)
    setModalEliminarOpen(true)
  }

  const handleEliminar = async () => {
    try {
      await eliminarRepuesto(repuestoEliminar.id)
      addToast('Repuesto eliminado del stock', 'success')
      setModalEliminarOpen(false)
      setRepuestoEliminar(null)
    } catch (err) {
      addToast(err.message, 'error')
    }
  }

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Toolbar */}
      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            id="search-repuesto"
            type="text"
            placeholder="Buscar por nombre o código..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-600 bg-slate-800 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>
        <Button onClick={() => setModalCrearOpen(true)} size="sm" id="btn-nuevo-repuesto">
          + Nuevo repuesto
        </Button>
      </div>

      {/* Tabla */}
      <Card padding={false}>
        <div className="overflow-x-auto">
          <table className="table-base">
            <thead>
              <tr>
                <th>Código</th>
                <th>Nombre</th>
                <th>Stock</th>
                <th>Precio</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {repuestosFiltrados.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-10 text-slate-500">
                    No se encontraron repuestos
                  </td>
                </tr>
              ) : (
                repuestosFiltrados.map((r) => (
                  <tr key={r.id}>
                    <td className="font-mono text-slate-400 text-xs">{r.codigo}</td>
                    <td className="text-slate-200 font-medium">{r.nombre}</td>
                    <td>
                      <span className={`font-mono font-semibold ${
                        r.stockActual === 0
                          ? 'text-red-400'
                          : r.stockActual < 3
                          ? 'text-amber-400'
                          : 'text-emerald-400'
                      }`}>
                        {r.stockActual}
                      </span>
                      {r.stockActual === 0 && (
                        <span className="ml-2 text-xs bg-red-900/40 text-red-400 border border-red-800 px-1.5 py-0.5 rounded-full">
                          Sin stock
                        </span>
                      )}
                    </td>
                    <td className="text-slate-300">{formatPrecio(r.precio)}</td>
                    <td>
                      <div className="flex items-center gap-1">
                        <button
                          id={`btn-editar-repuesto-${r.id}`}
                          onClick={() => abrirEditar(r)}
                          title="Editar repuesto"
                          className="p-1.5 rounded-md text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 transition-colors"
                        >
                          <IconEdit />
                        </button>
                        <button
                          id={`btn-eliminar-repuesto-${r.id}`}
                          onClick={() => abrirEliminar(r)}
                          title="Eliminar repuesto"
                          className="p-1.5 rounded-md text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                        >
                          <IconTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Modal nuevo repuesto */}
      <Modal
        isOpen={modalCrearOpen}
        onClose={() => setModalCrearOpen(false)}
        title="Nuevo Repuesto"
        footer={
          <>
            <Button variant="ghost" onClick={() => setModalCrearOpen(false)}>Cancelar</Button>
            <Button onClick={handleCrear} loading={loading} id="btn-confirmar-repuesto-stock">
              Guardar
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input id="codigo" label="Código" placeholder="FILT-001" value={formCrear.codigo} onChange={handleChangeCrear('codigo')} required />
            <Input id="stockInicial" label="Stock inicial" type="number" placeholder="10" value={formCrear.stockActual} onChange={handleChangeCrear('stockActual')} required />
            <Input id="nombreRepuesto" label="Nombre" placeholder="Filtro de aceite" value={formCrear.nombre} onChange={handleChangeCrear('nombre')} required className="col-span-2" />
            <Input id="precio" label="Precio (ARS)" type="number" placeholder="1200" value={formCrear.precio} onChange={handleChangeCrear('precio')} required />
          </div>
        </div>
      </Modal>

      {/* Modal editar repuesto */}
      <Modal
        isOpen={modalEditarOpen}
        onClose={() => setModalEditarOpen(false)}
        title="Editar Repuesto"
        footer={
          <>
            <Button variant="ghost" onClick={() => setModalEditarOpen(false)}>Cancelar</Button>
            <Button onClick={handleEditar} loading={loading} id="btn-confirmar-editar-repuesto">
              Guardar cambios
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input id="edit-codigo" label="Código" placeholder="FILT-001" value={formEditar.codigo} onChange={handleChangeEditar('codigo')} required />
            <Input id="edit-stock" label="Stock actual" type="number" placeholder="10" value={formEditar.stockActual} onChange={handleChangeEditar('stockActual')} required />
            <Input id="edit-nombre" label="Nombre" placeholder="Filtro de aceite" value={formEditar.nombre} onChange={handleChangeEditar('nombre')} required className="col-span-2" />
            <Input id="edit-precio" label="Precio (ARS)" type="number" placeholder="1200" value={formEditar.precio} onChange={handleChangeEditar('precio')} required />
          </div>
        </div>
      </Modal>

      {/* Modal confirmar eliminación de repuesto */}
      <Modal
        isOpen={modalEliminarOpen}
        onClose={() => setModalEliminarOpen(false)}
        title="Eliminar Repuesto"
        footer={
          <>
            <Button variant="ghost" onClick={() => setModalEliminarOpen(false)}>Cancelar</Button>
            <Button
              variant="danger"
              onClick={handleEliminar}
              loading={loading}
              id="btn-confirmar-eliminar-repuesto"
            >
              Eliminar
            </Button>
          </>
        }
      >
        <div className="space-y-3">
          <p className="text-slate-300">
            ¿Estás seguro que querés eliminar el repuesto{' '}
            <span className="font-semibold text-white">{repuestoEliminar?.nombre}</span>?
          </p>
          <p className="text-sm text-slate-500">
            Esta acción no se puede deshacer.
          </p>
        </div>
      </Modal>
    </div>
  )
}
