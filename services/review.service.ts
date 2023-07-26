import apiSlice from 'services/api'
import type { DataModels, IPagination, IReviewForm } from 'types'

type MsgResult = { msg: string }
type IdQuery = { id: string }
type GetReviewsResult = {
  reviews: DataModels.IReview[]
  reviewsLength: number
  pagination: IPagination
}
type GetReviewsQuery = { page: number }
type CreateReviewQuery = { id: string; body: IReviewForm }
type GetProductReviewsResult = {
  reviews: DataModels.IReview[]
  reviewsLength: number
  pagination: IPagination
}
type GetProductReviewsQuery = { id: string; page: number }
type GetSingleReviewResult = { review: DataModels.IReview }
type EditReviewQuery = { id: string; body: Partial<DataModels.IReview> }

export const reviewApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReviews: builder.query<GetReviewsResult, GetReviewsQuery>({
      query: ({ page }) => ({
        url: `/api/reviews?page=${page}`,
        method: 'GET',
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.reviews.map(({ _id }) => ({
                type: 'Review' as const,
                id: _id,
              })),
              'Review',
            ]
          : ['Review'],
    }),

    createReview: builder.mutation<MsgResult, CreateReviewQuery>({
      query: ({ body, id }) => ({
        url: `/api/reviews/${id}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Review'],
    }),

    getProductReviews: builder.query<
      GetProductReviewsResult,
      GetProductReviewsQuery
    >({
      query: ({ id, page }) => ({
        url: `/api/reviews/product/${id}?page=${page}&page_size=5`,
        method: 'GET',
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.reviews.map(({ _id }) => ({
                type: 'Review' as const,
                id: _id,
              })),
              'Review',
            ]
          : ['Review'],
    }),

    getSingleReview: builder.query<GetSingleReviewResult, IdQuery>({
      query: ({ id }) => ({
        url: `/api/reviews/${id}`,
        method: 'GET',
      }),
      providesTags: (result, err, arg) => [{ type: 'Review', id: arg.id }],
    }),

    deleteReview: builder.mutation<MsgResult, IdQuery>({
      query: ({ id }) => ({
        url: `/api/reviews/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Review'],
    }),

    editReview: builder.mutation<MsgResult, EditReviewQuery>({
      query: ({ id, body }) => ({
        url: `/api/reviews/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (result, err, arg) => [{ type: 'Review', id: arg.id }],
    }),
  }),
})

export const {
  useGetReviewsQuery,
  useGetSingleReviewQuery,
  useDeleteReviewMutation,
  useGetProductReviewsQuery,
  useEditReviewMutation,
  useCreateReviewMutation,
} = reviewApiSlice
