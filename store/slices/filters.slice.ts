import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface FilterState {
  inStock: boolean
  discount: boolean
  maxPrice: number
  minPrice: number
}

const initialState: FilterState = {
  inStock: false,
  discount: false,
  maxPrice: 0,
  minPrice: 0,
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    updateFilter: (
      state,
      action: PayloadAction<{
        name: keyof FilterState
        value: boolean | number
      }>
    ) => {
      const { name, value } = action.payload
      if (name === 'inStock' || name === 'discount')
        state[name] = value as boolean
      else state[name] = value as number
    },
    resetFilter: (
      state,
      action: PayloadAction<{ maxPrice: number; minPrice: number }>
    ) => {
      const { maxPrice, minPrice } = action.payload
      Object.assign(state, initialState, { maxPrice, minPrice })
    },
    loadFilters: (
      state,
      action: PayloadAction<{
        discount?: string
        inStock?: string
        price?: string
      }>
    ) => {
      const { discount, inStock, price } = action.payload
      if (discount !== undefined) {
        state.discount = discount === 'true'
      }
      if (inStock !== undefined) {
        state.inStock = inStock === 'true'
      }
      if (price) {
        const [min, max] = price.split('-').map(Number)
        state.minPrice = min
        state.maxPrice = max
      }
    },
  },
})

export const { updateFilter, resetFilter, loadFilters } = filterSlice.actions

export default filterSlice.reducer
