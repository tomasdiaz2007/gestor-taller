import React from 'react'
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import Dashboard from '../pages/Dashboard'
import IngresoVehiculo from '../pages/IngresoVehiculo'
import ListaOrdenes from '../pages/ListaOrdenes'
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
          <Route path="/vehiculos/nuevo" element={<IngresoVehiculo />} />
          <Route path="/ordenes" element={<ListaOrdenes />} />
          <Route path="/ordenes/:id" element={<OrdenTrabajo />} />
          <Route path="/stock" element={<Stock />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
