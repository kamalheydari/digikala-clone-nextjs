import apiSlice from 'services/api'
import type { DataModels, IPagination, IProductForm } from 'types'

type MsgResult = { msg: string }
type IdQuery = { id: string }
type GetProductsResult = {
  products: DataModels.IProduct[]
  productsLength: number
  mainMaxPrice: number
  mainMinPrice: number
  pagination: IPagination
}
type GetProductsQuery = { [key: string]: string | number | boolean }
type GetSingleProductResult = { product: DataModels.IProduct }
type CreateProductQuery = { body: IProductForm }
type UpdateProductQuery = { body: DataModels.IProduct; id: string }

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<GetProductsResult, GetProductsQuery>({
      query: ({
        category,
        page_size,
        page,
        sort,
        search,
        inStock,
        discount,
        price,
      }) => {
        const queryParams = new URLSearchParams()

        Object.entries({
          category,
          page_size,
          page,
          sort,
          search,
          inStock,
          discount,
          price,
        }).forEach(([key, value]) => {
          if (value) queryParams.set(key, value as string)
        })

        return {
          url: `/api/products?${queryParams.toString()}`,
          method: 'GET',
        }
      },
      providesTags: (result) =>
        result
          ? [
              ...result.products.map(({ _id }) => ({
                type: 'Product' as const,
                id: _id,
              })),
              'Product',
            ]
          : ['Product'],
    }),

    getSingleProduct: builder.query<GetSingleProductResult, IdQuery>({
      query: ({ id }) => ({
        url: `/api/products/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, arg) => [{ type: 'Product', id: arg.id }],
    }),

    deleteProduct: builder.mutation<MsgResult, IdQuery>({
      query: ({ id }) => ({
        url: `/api/products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Product'],
    }),

    createProduct: builder.mutation<MsgResult, CreateProductQuery>({
      query: ({ body }) => ({
        url: `/api/products`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Product'],
    }),

    updateProduct: builder.mutation<MsgResult, UpdateProductQuery>({
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
