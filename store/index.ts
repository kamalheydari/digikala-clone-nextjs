import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'

//? Reducers
import lastSeenReducer from './slices/lastSeen.slice'
import cartReducer from './slices/cart.slice'
import alertReducer from './slices/alert.slice'
import apiSlice from 'services/baseApi'

//? Actions
export * from './slices/lastSeen.slice'
export * from './slices/cart.slice'
export * from './slices/alert.slice'

export const store = configureStore({
  reducer: {
    lastSeen: lastSeenReducer,
    cart: cartReducer,
    alert: alertReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (gDM) => gDM().concat(apiSlice.middleware),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

setupListeners(store.dispatch)
