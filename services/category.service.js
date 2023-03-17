import apiSlice from 'services/api'

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => ({
        url: '/api/category',
        method: 'GET',
      }),
      providesTags: ['Category'],
    }),

    getSingleCategory: builder.query({
      query: ({ id }) => ({
        url: `/api/category/${id}`,
        method: 'GET',
      }),
      providesTags: ['Category'],
    }),

    updateCategory: builder.mutation({
      query: ({ id, body }) => ({
        url: `/api/category/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Category'],
    }),

    createCategory: builder.mutation({
      query: ({ body }) => ({
        url: '/api/category',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Category'],
    }),
  }),
})

export const {
  useCreateCategoryMutation,
  useGetCategoriesQuery,
  useGetSingleCategoryQuery,
  useUpdateCategoryMutation,
} = categoryApiSlice
