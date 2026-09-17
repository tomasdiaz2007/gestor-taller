import React, { useEffect, useState } from 'react'
import Card from '../components/common/Card'
import Button from '../components/common/Button'
import Modal from '../components/common/Modal'
import Input from '../components/common/Input'
import { useStockStore } from '../store/stock/stockStore'
import { selectRepuestos } from '../store/stock/stockSelectors'
import { useToast } from '../components/common/ToastProvider'
import { formatPrecio } from '../helpers/formatHelper'

const initialForm = { codigo: '', nombre: '', stockActual: '', precioLista: '', precioVenta: '' }

// Icono editar
function IconEdit() {
  return <span className="action-icon" aria-hidden="true">✎</span>
}

// Icono eliminar
function IconTrash() {
  return <span className="action-icon" aria-hidden="true">🗑</span>
}

export default function Stock() {
  const addToast = useToast()
  const repuestos = useStockStore(selectRepuestos)
  const { fetchRepuestos, agregarRepuesto, editarRepuesto, eliminarRepuesto, ajustarStock, loading } = useStockStore()

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

  // ── Ajustar Stock (+ / -) ──────────────────────────────────────────────────
  const handleAjustarStock = async (id, delta) => {
    try {
      await ajustarStock(id, delta)
      const msj = delta > 0 ? 'Stock incrementado' : 'Stock decrementado'
      addToast(msj, 'success')
    } catch (err) {
      addToast(err.message, 'error')
    }
  }

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
      precioLista: String(repuesto.precioLista ?? repuesto.precio ?? 0),
      precioVenta: String(repuesto.precioVenta ?? repuesto.precio ?? 0),
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
      <div className="stock-toolbar">
        <div className="stock-toolbar-actions">
          <Button onClick={() => setModalCrearOpen(true)} size="sm" id="btn-nuevo-repuesto">
            + Nuevo repuesto
          </Button>
        </div>
        <div className="stock-search-row">
          <div className="stock-search">
            <input
              id="search-repuesto"
              type="text"
              placeholder="Buscar por nombre o código..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <span className="search-icon" aria-hidden="true">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
        </div>
      </div>

      {/* Tabla */}
      <Card padding={false}>
        <div className="table-scroll-wrap">
          <table className="table-base table--stock">
            <thead>
              <tr>
                <th>Código</th>
                <th>Nombre</th>
                <th>Stock</th>
                <th>Precio Lista</th>
                <th>Precio Venta</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {repuestosFiltrados.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-slate-500">
                    No se encontraron repuestos
                  </td>
                </tr>
              ) : (
                repuestosFiltrados.map((r) => (
                  <tr key={r.id}>
                    <td className="font-mono text-slate-400 text-xs">{r.codigo}</td>
                    <td className="text-slate-200 font-medium">{r.nombre}</td>
                    <td>
                      <div className="flex items-center gap-1.5">
                        <button
                          id={`btn-restar-stock-${r.id}`}
                          onClick={() => handleAjustarStock(r.id, -1)}
                          disabled={r.stockActual <= 0 || loading}
                          title="Restar 1 al stock"
                          className="stock-adj-btn"
                        >
                          -
                        </button>
                        <span className={`font-mono font-semibold min-w-[2rem] text-center ${
                          r.stockActual === 0
                            ? 'text-red-400'
                            : r.stockActual < 3
                            ? 'text-amber-400'
                            : 'text-emerald-400'
                        }`}>
                          {r.stockActual}
                        </span>
                        <button
                          id={`btn-sumar-stock-${r.id}`}
                          onClick={() => handleAjustarStock(r.id, 1)}
                          disabled={loading}
                          title="Sumar 1 al stock"
                          className="stock-adj-btn"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="text-slate-300">{formatPrecio(r.precioLista ?? r.precio)}</td>
                    <td className="text-slate-300">{formatPrecio(r.precioVenta ?? r.precio)}</td>
                    <td>
                      <div className="flex items-center gap-1">
                        <button
                          id={`btn-editar-repuesto-${r.id}`}
                          onClick={() => abrirEditar(r)}
                          title="Editar repuesto"
                          className="action-button"
                        >
                          <IconEdit />
                        </button>
                        <button
                          id={`btn-eliminar-repuesto-${r.id}`}
                          onClick={() => abrirEliminar(r)}
                          title="Eliminar repuesto"
                          className="action-button action-button--danger"
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
            <Input id="precioLista" label="Precio de Lista (ARS)" type="number" placeholder="1000" value={formCrear.precioLista} onChange={handleChangeCrear('precioLista')} required />
            <Input id="precioVenta" label="Precio de Venta (ARS)" type="number" placeholder="1200" value={formCrear.precioVenta} onChange={handleChangeCrear('precioVenta')} required />
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
            <Input id="edit-precioLista" label="Precio de Lista (ARS)" type="number" placeholder="1000" value={formEditar.precioLista} onChange={handleChangeEditar('precioLista')} required />
            <Input id="edit-precioVenta" label="Precio de Venta (ARS)" type="number" placeholder="1200" value={formEditar.precioVenta} onChange={handleChangeEditar('precioVenta')} required />
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
