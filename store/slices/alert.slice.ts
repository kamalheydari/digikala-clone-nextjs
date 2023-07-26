import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface AlertState {
  title: string
  status: string
  isShow: boolean
}

const initialState: AlertState = { title: '', status: '', isShow: false }

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    showAlert: (
      state,
      action: PayloadAction<{ title: string; status: string }>
    ) => {
      const { status, title } = action.payload

      state.isShow = true
      state.title = title
      state.status = status
    },
    removeAlert: (state) => {
      state.isShow = false
      state.status = ''
      state.title = ''
    },
  },
})

export const { showAlert, removeAlert } = alertSlice.actions

export default alertSlice.reducer
