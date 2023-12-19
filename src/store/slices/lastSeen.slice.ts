import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface Product {
  productID: string
  slug: string
  title: string
  image: { url: string; placeholder: string }
}

interface UserState {
  lastSeen: Product[]
}

const getLastSeen = (): Product[] => {
  if (typeof window !== 'undefined') {
    const lastSeenJSON = localStorage.getItem('lastSeen')
    if (lastSeenJSON) return JSON.parse(lastSeenJSON as string)
  }

  return [] as Product[]
}

const initialState: UserState = { lastSeen: getLastSeen() }

const lastSeenSlice = createSlice({
  name: 'lastSeen',
  initialState,
  reducers: {
    addToLastSeen: (state, action: PayloadAction<Product>) => {
      const isItemExist = state.lastSeen.find((item) => item.productID === action.payload.productID)

      if (!isItemExist) {
        if (state.lastSeen.length === 15) {
          state.lastSeen.splice(14, 1)
        }
        state.lastSeen.unshift(action.payload)
        localStorage.setItem('lastSeen', JSON.stringify(state.lastSeen))
      }
    },
  },
})

export const { addToLastSeen } = lastSeenSlice.actions

export default lastSeenSlice.reducer
