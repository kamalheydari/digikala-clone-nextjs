import apiSlice from "app/api/api";

export const detailsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDetails: builder.query({
      query: ({ id }) => ({
        url: `/api/details/${id}`,
        method: "GET",
      }),
      providesTags: ["Details"],
    }),

    deleteDetails: builder.mutation({
      query: ({ id, token }) => ({
        url: `/api/details/${id}`,
        method: "DELETE",
        headers: { "Content-Type": "application/json", Authorization: token },
      }),
      invalidatesTags: ["Details"],
    }),

    createDetails: builder.mutation({
      query: ({ body, token }) => ({
        url: "/api/details",
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: token },
        body,
      }),
      invalidatesTags: ["Details"],
    }),

    updateDetails: builder.mutation({
      query: ({ id, token, body }) => ({
        url: `/api/details/${id}`,
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: token },
        body,
      }),
      invalidatesTags: ["Details"],
    }),
  }),
});

export const {
  useDeleteDetailsMutation,
  useGetDetailsQuery,
  useCreateDetailsMutation,
  useUpdateDetailsMutation
} = detailsApiSlice;
