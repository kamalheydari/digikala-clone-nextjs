import apiSlice from 'services/api'

export const bannerApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSingleBanner: builder.query({
      query: ({ id }) => ({
        url: `/api/banner/${id}`,
        method: 'GET',
      }),
      providesTags: ['Banner'],
    }),

    updateBanner: builder.mutation({
      query: ({ id, body }) => ({
        url: `/api/banner/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Banner'],
    }),

    createBanner: builder.mutation({
      query: ({ body }) => ({
        url: '/api/banner',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Banner'],
    }),

    deleteBanner: builder.mutation({
      query: ({ id }) => ({
        url: `/api/banner/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Banner'],
    }),
  }),
})

export const {
  useGetSingleBannerQuery,
  useUpdateBannerMutation,
  useCreateBannerMutation,
  useDeleteBannerMutation,
} = bannerApiSlice
