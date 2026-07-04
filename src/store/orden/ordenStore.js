import { create } from 'zustand'
import { ordenActions } from './ordenActions'

export const useOrdenStore = create((set, get) => ({
  ordenes: [],
  ordenActual: null,
  loading: false,
  error: null,

  ...ordenActions(set, get),
}))
