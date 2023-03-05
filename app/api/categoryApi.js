import apiSlice from 'app/api/api'

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => ({
        url: '/api/category',
        method: 'GET',
      }),
      providesTags: ['Category'],
    }),

    createCategory: builder.mutation({
      query: ({ body }) => ({
        url: '/api/category',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Category'],
    }),

    getImages: builder.query({
      query: () => ({
        url: '/api/images',
        method: 'GET',
      }),
      providesTags: ['Category'],
    }),
  }),
})

export const {
  useCreateCategoryMutation,
  useGetImagesQuery,
  useGetCategoriesQuery,
} = userApiSlice
