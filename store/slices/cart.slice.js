import { createSlice, nanoid } from '@reduxjs/toolkit'

import { exsitItem, getTotal } from 'utils'

const getCartItems =
  typeof window !== 'undefined' && localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : []

const setCartItems = (cartItems) =>
  localStorage.setItem('cartItems', JSON.stringify(cartItems))

const initialState = {
  cartItems: getCartItems,
  totalItems: getTotal(getCartItems, 'quantity'),
  totalPrice: getTotal(getCartItems, 'price'),
  totalDiscount: getTotal(getCartItems, 'discount'),
  tempSize: null,
  tempColor: null,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      let isItemExist = exsitItem(
        state.cartItems,
        action.payload.productID,
        action.payload.color,
        action.payload.size
      )

      if (isItemExist) {
        isItemExist.quantity += 1
        state.totalItems = getTotal(state.cartItems, 'quantity')
        state.totalPrice = getTotal(state.cartItems, 'price')
        state.totalDiscount = getTotal(state.cartItems, 'discount')
        setCartItems(state.cartItems)
      } else {
        state.cartItems.push({ itemID: nanoid(), ...action.payload })
        state.totalItems = getTotal(state.cartItems, 'quantity')
        state.totalPrice = getTotal(state.cartItems, 'price')
        state.totalDiscount = getTotal(state.cartItems, 'discount')
        setCartItems(state.cartItems)
      }
    },

    removeFromCart: (state, action) => {
      const index = state.cartItems.findIndex(
        (item) => item.itemID === action.payload
      )

      if (index !== -1) {
        state.cartItems.splice(index, 1)
        state.totalItems = getTotal(state.cartItems, 'quantity')
        state.totalPrice = getTotal(state.cartItems, 'price')
        state.totalDiscount = getTotal(state.cartItems, 'discount')
        setCartItems(state.cartItems)
      }
    },

    increase: (state, action) => {
      state.cartItems.forEach((item) => {
        if (item.itemID === action.payload) item.quantity += 1
      })
      state.totalItems = getTotal(state.cartItems, 'quantity')
      state.totalPrice = getTotal(state.cartItems, 'price')
      state.totalDiscount = getTotal(state.cartItems, 'discount')
      setCartItems(state.cartItems)
    },

    decrease: (state, action) => {
      state.cartItems.forEach((item) => {
        if (item.itemID === action.payload) item.quantity -= 1
      })
      state.totalItems = getTotal(state.cartItems, 'quantity')
      state.totalPrice = getTotal(state.cartItems, 'price')
      state.totalDiscount = getTotal(state.cartItems, 'discount')
      setCartItems(state.cartItems)
    },

    clearCart: (state, action) => {
      state.cartItems = []
      state.totalItems = 0
      state.totalPrice = 0
      state.totalDiscount = 0
      localStorage.removeItem('cartItems')
    },

    setTempColor: (state, action) => {
      state.tempColor = action.payload
    },

    setTempSize: (state, action) => {
      state.tempSize = action.payload
    },
  },
})

export const {
  addToCart,
  removeFromCart,
  clearCart,
  decrease,
  increase,
  setTempColor,
  setTempSize,
} = cartSlice.actions

export default cartSlice.reducer
