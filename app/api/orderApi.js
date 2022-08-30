import apiSlice from "app/api/api";

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: ({ page, token, pageSize }) => ({
        url: `/api/order?page=${page}&page_size=${pageSize}`,
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: token },
      }),
      providesTags: ["Order"],
    }),

    getSingleOrder: builder.query({
      query: ({ id }) => ({
        url: `/api/order/${id}`,
        method: "GET",
      }),
      providesTags: ["Order"],
    }),

    updateOrder: builder.mutation({
      query: ({ id, token, body }) => ({
        url: `/api/order/delivered/${id}`,
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: token },
        body,
      }),
      invalidatesTags: ["Order"],
    }),

    editOrder: builder.mutation({
      query: ({ id, token, body }) => ({
        url: `/api/order/${id}`,
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: token },
        body,
      }),
      invalidatesTags: ["Order"],
    }),

    createOrder: builder.mutation({
      query: ({ token, body }) => ({
        url: "/api/order",
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: token },
        body,
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetSingleOrderQuery,
  useUpdateOrderMutation,
  useEditOrderMutation,
  useCreateOrderMutation
} = orderApiSlice;
