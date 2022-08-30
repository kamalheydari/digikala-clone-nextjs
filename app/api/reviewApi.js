import apiSlice from "app/api/api";

export const reviewApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReviews: builder.query({
      query: ({ page, token }) => ({
        url: `/api/reviews?page=${page}`,
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: token },
      }),
      providesTags: ["Review"],
    }),

    createReview: builder.mutation({
      query: ({ body, token, id }) => ({
        url: `/api/reviews/${id}`,
        method: "POST",
        body,
        headers: { "Content-Type": "application/json", Authorization: token },
      }),
      invalidatesTags: ["Review"],
    }),

    getProductReviews: builder.query({
      query: ({ id, page }) => ({
        url: `/api/reviews/product/${id}?page=${page}&page_size=5`,
        method: "GET",
      }),
      providesTags: ["Review"],
    }),

    getSingleReview: builder.query({
      query: ({ id }) => ({
        url: `/api/reviews/${id}`,
        method: "GET",
      }),
      providesTags: ["Review"],
    }),

    deleteReview: builder.mutation({
      query: ({ id, token }) => ({
        url: `/api/reviews/${id}`,
        method: "DELETE",
        headers: { "Content-Type": "application/json", Authorization: token },
      }),
      invalidatesTags: ["Review"],
    }),

    editReview: builder.mutation({
      query: ({ id, token, body }) => ({
        url: `/api/reviews/${id}`,
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: token },
        body,
      }),
      invalidatesTags: ["Review"],
    }),
  }),
});

export const {
  useGetReviewsQuery,
  useGetSingleReviewQuery,
  useDeleteReviewMutation,
  useGetProductReviewsQuery,
  useEditReviewMutation,
  useCreateReviewMutation,
} = reviewApiSlice;
