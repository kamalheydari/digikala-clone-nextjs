import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'

//? Reducers
import lastSeenReducer from './slices/lastSeen.slice'
import cartReducer from './slices/cart.slice'
import alertReducer from './slices/alert.slice'
import filtersReducer from './slices/filters.slice'
import userReducer from './slices/user.slice'
import apiSlice from 'services/api'

//? Actions
export * from './slices/lastSeen.slice'
export * from './slices/cart.slice'
export * from './slices/alert.slice'
export * from './slices/filters.slice'
export * from './slices/user.slice'

export const store = configureStore({
  reducer: {
    lastSeen: lastSeenReducer,
    cart: cartReducer,
    alert: alertReducer,
    filters: filtersReducer,
    user: userReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (gDM) => gDM().concat(apiSlice.middleware),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

setupListeners(store.dispatch)
