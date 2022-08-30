import apiSlice from "app/api/api";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ page, filterCategory, search }) => ({
        url: `/api/products?page_size=10&page=${page}&category=${filterCategory}&search=${search}`,
        method: "GET",
      }),
      providesTags: ["Product"],
    }),

    deleteProduct: builder.mutation({
      query: ({ id, token }) => ({
        url: `/api/products/${id}`,
        method: "DELETE",
        headers: { "Content-Type": "application/json", Authorization: token },
      }),
      invalidatesTags: ["Product"],
    }),

    createProduct: builder.mutation({
      query: ({ body, token }) => ({
        url: `/api/products`,
        method: "POST",
        body,
        headers: { "Content-Type": "application/json", Authorization: token },
      }),
      invalidatesTags: ["Product"],
    }),

    updateProduct: builder.mutation({
      query: ({ id, token, body }) => ({
        url: `/api/products/${id}`,
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: token },
        body,
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useDeleteProductMutation,
  useCreateProductMutation,
  useGetProductsQuery,
  useUpdateProductMutation,
} = productApiSlice;
