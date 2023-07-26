import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import Cookies from 'js-cookie'

interface Product {
  productID: string
  title: string
  image: { url: string }
}

interface UserState {
  lastSeen: Product[]
  token: string
}

const getLastSeen = (): Product[] => {
  if (typeof window !== 'undefined') {
    const lastSeenJSON = localStorage.getItem('lastSeen')
    if (lastSeenJSON) return JSON.parse(lastSeenJSON as string)
  }

  return [] as Product[]
}

const getToken = (): string => Cookies.get('token') ?? ''

const initialState: UserState = { lastSeen: getLastSeen(), token: getToken() }

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLogout: (state) => {
      Cookies.remove('token')
      state.token = ''
    },

    userLogin: (state, action: PayloadAction<string>) => {
      Cookies.set('token', action.payload, { expires: 10 })

      state.token = action.payload
    },

    addToLastSeen: (state, action: PayloadAction<Product>) => {
      let isItemExist = state.lastSeen.find(
        (item) => item.productID === action.payload.productID
      )

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

export const { userLogout, userLogin, addToLastSeen } = userSlice.actions

export default userSlice.reducer
