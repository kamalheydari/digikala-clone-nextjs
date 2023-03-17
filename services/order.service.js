import apiSlice from 'services/api'

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: ({ page, pageSize }) => ({
        url: `/api/order?page=${page}&page_size=${pageSize}`,
        method: 'GET',
      }),
      providesTags: ['Order'],
    }),

    getSingleOrder: builder.query({
      query: ({ id }) => ({
        url: `/api/order/${id}`,
        method: 'GET',
      }),
      providesTags: ['Order'],
    }),

    updateOrder: builder.mutation({
      query: ({ id, body }) => ({
        url: `/api/order/delivered/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Order'],
    }),

    editOrder: builder.mutation({
      query: ({ id, body }) => ({
        url: `/api/order/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Order'],
    }),

    createOrder: builder.mutation({
      query: ({ body }) => ({
        url: '/api/order',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Order'],
    }),
  }),
})

export const {
  useGetOrdersQuery,
  useGetSingleOrderQuery,
  useUpdateOrderMutation,
  useEditOrderMutation,
  useCreateOrderMutation,
} = orderApiSlice
