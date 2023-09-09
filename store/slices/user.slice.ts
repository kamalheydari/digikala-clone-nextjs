import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { DataModels } from 'types'

const initialState: { userInfo: DataModels.IUser | null; isLoading: boolean } =
  { userInfo: null, isLoading: false }

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<DataModels.IUser>) => {
      state.userInfo = action.payload
    },
    logout: (state) => {
      state.userInfo = initialState.userInfo
    },
    startFetching: (state) => {
      state.isLoading = true
    },
    endFetching: (state) => {
      state.isLoading = false
    },
  },
})

export default userSlice.reducer

export const { logout, login, startFetching, endFetching } = userSlice.actions
