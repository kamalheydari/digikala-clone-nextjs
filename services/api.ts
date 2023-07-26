import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { RootState } from 'store'

const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.token
      if (token) headers.set('authorization', token)
      return headers
    },
  }),
  tagTypes: [
    'User',
    'Review',
    'Details',
    'Order',
    'Product',
    'Category',
    'Slider',
    'Banner',
  ],
  endpoints: (builder) => ({}),
})

export default apiSlice
