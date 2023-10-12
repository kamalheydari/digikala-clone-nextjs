import baseApi from 'services/baseApi'

import type {
  CreateDetailsQuery,
  GetDetailsResult,
  IdQuery,
  MsgResult,
  UpdateDetailsQuery,
  UpdateDetailsResult,
} from './types'

export const detailsApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDetails: builder.query<GetDetailsResult, IdQuery>({
      query: ({ id }) => ({
        url: `/api/details/${id}`,
        method: 'GET',
      }),
      providesTags: (result, err, arg) => [{ type: 'Details', id: arg.id }],
    }),

    deleteDetails: builder.mutation<MsgResult, IdQuery>({
      query: ({ id }) => ({
        url: `/api/details/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Details'],
    }),

    createDetails: builder.mutation<MsgResult, CreateDetailsQuery>({
      query: ({ body }) => ({
        url: '/api/details',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Details'],
    }),

    updateDetails: builder.mutation<UpdateDetailsResult, UpdateDetailsQuery>({
      query: ({ id, body }) => ({
        url: `/api/details/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (result) => [
        { type: 'Details', id: result?.category_id },
      ],
    }),
  }),
})

export const {
  useDeleteDetailsMutation,
  useGetDetailsQuery,
  useCreateDetailsMutation,
  useUpdateDetailsMutation,
} = detailsApiSlice
