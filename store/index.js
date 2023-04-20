import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'

//? Reducers
import userReducer from './slices/user.slice'
import cartReducer from './slices/cart.slice'
import alertReducer from './slices/alert.slice'
import filtersReducer from './slices/filters.slice'
import apiSlice from 'services/api'

//? Actions
export * from './slices/user.slice'
export * from './slices/cart.slice'
export * from './slices/alert.slice'
export * from './slices/filters.slice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    alert: alertReducer,
    filters: filtersReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (gDM) => gDM().concat(apiSlice.middleware),
})

// enable listener behavior for the store
setupListeners(store.dispatch)
