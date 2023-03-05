import apiSlice from 'app/api/api'

export const detailsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDetails: builder.query({
      query: ({ id }) => ({
        url: `/api/details/${id}`,
        method: 'GET',
      }),
      providesTags: ['Details'],
    }),

    deleteDetails: builder.mutation({
      query: ({ id }) => ({
        url: `/api/details/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Details'],
    }),

    createDetails: builder.mutation({
      query: ({ body }) => ({
        url: '/api/details',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Details'],
    }),

    updateDetails: builder.mutation({
      query: ({ id, body }) => ({
        url: `/api/details/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Details'],
    }),
  }),
})

export const {
  useDeleteDetailsMutation,
  useGetDetailsQuery,
  useCreateDetailsMutation,
  useUpdateDetailsMutation,
} = detailsApiSlice
