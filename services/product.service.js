import apiSlice from 'services/api'

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({
        page,
        filterCategory,
        search,
        sort,
        price,
        inStock,
        discount,
        page_size,
      }) => {
        const queryParams = new URLSearchParams({
          ...(page_size && { page_size }),
          ...(page && { page }),
          ...(sort && { sort }),
          ...(search && { search }),
          ...(inStock && { inStock }),
          ...(discount && { discount }),
          ...(price && { price }),
          ...(filterCategory && { category: filterCategory }),
        })

        return {
          url: `/api/products?${queryParams.toString()}`,
          method: 'GET',
        }
      },
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.products.map(({ _id }) => ({
                type: 'Product',
                id: _id,
              })),
              'Product',
            ]
          : ['Product'],
    }),

    getSingleProduct: builder.query({
      query: ({ id }) => ({
        url: `/api/products/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, arg) => [{ type: 'Product', id: arg.id }],
    }),

    deleteProduct: builder.mutation({
      query: ({ id }) => ({
        url: `/api/products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Product'],
    }),

    createProduct: builder.mutation({
      query: ({ body }) => ({
        url: `/api/products`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Product'],
    }),

    updateProduct: builder.mutation({
      query: ({ id, body }) => ({
        url: `/api/products/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Product', id: arg.id },
      ],
    }),
  }),
})

export const {
  useDeleteProductMutation,
  useCreateProductMutation,
  useGetProductsQuery,
  useGetSingleProductQuery,
  useUpdateProductMutation,
} = productApiSlice
