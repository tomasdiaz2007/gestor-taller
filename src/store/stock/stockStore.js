import { create } from 'zustand'
import { stockActions } from './stockActions'

export const useStockStore = create((set, get) => ({
  repuestos: [],
  loading: false,
  error: null,

  ...stockActions(set, get),
}))
