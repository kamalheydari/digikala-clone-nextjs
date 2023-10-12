import baseApi from 'services/baseApi'

import type {
  CreateOrderQuery,
  GetOrdersQuery,
  GetOrdersResult,
  GetSingleOrderResult,
  IdQuery,
  MsgResult,
  UpdateOrderQuery,
} from './types'

export const orderApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query<GetOrdersResult, GetOrdersQuery>({
      query: ({ page = 1, pageSize = 10 }) => ({
        url: `/api/order?page=${page}&page_size=${pageSize}`,
        method: 'GET',
      }),
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.orders.map(({ _id }) => ({
                type: 'Order' as const,
                id: _id,
              })),
              'Order',
            ]
          : ['Order'],
    }),

    getSingleOrder: builder.query<GetSingleOrderResult, IdQuery>({
      query: ({ id }) => ({
        url: `/api/order/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, arg) => [{ type: 'Order', id: arg.id }],
    }),

    updateOrder: builder.mutation<MsgResult, UpdateOrderQuery>({
      query: ({ id, body }) => ({
        url: `/api/order/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Order', id: arg.id }],
    }),

    createOrder: builder.mutation<MsgResult, CreateOrderQuery>({
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
  useCreateOrderMutation,
} = orderApiSlice
