import React from 'react'
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import Dashboard from '../pages/Dashboard'
import IngresoVehiculo from '../pages/IngresoVehiculo'
import Vehiculos from '../pages/Vehiculos'
import DetalleVehiculo from '../pages/DetalleVehiculo'
import ListaOrdenes from '../pages/ListaOrdenes'
import OrdenForm from '../pages/OrdenForm'
import OrdenTrabajo from '../pages/OrdenTrabajo'
import Stock from '../pages/Stock'

/** Wrapper que pasa {children} al Layout usando Outlet */
function LayoutWrapper() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LayoutWrapper />}>
          <Route index element={<Dashboard />} />
          <Route path="/vehiculos" element={<Vehiculos />} />
          <Route path="/vehiculos/nuevo" element={<IngresoVehiculo />} />
          <Route path="/vehiculos/:id" element={<DetalleVehiculo />} />
          <Route path="/vehiculos/:id/editar" element={<IngresoVehiculo />} />
          <Route path="/ordenes" element={<ListaOrdenes />} />
          <Route path="/ordenes/nueva" element={<OrdenForm />} />
          <Route path="/ordenes/:id" element={<OrdenTrabajo />} />
          <Route path="/ordenes/:id/editar" element={<OrdenForm />} />
          <Route path="/stock" element={<Stock />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
