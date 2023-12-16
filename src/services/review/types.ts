import type { IPagination, IReview, IReviewForm } from 'types'

export type MsgResult = { msg: string }
export type IdQuery = { id: string }
export type GetReviewsResult = {
  reviews: IReview[]
  reviewsLength: number
  pagination: IPagination
}
export type GetReviewsQuery = { page: number }
export type CreateReviewQuery = { id: string; body: IReviewForm }
export type GetProductReviewsResult = {
  reviews: IReview[]
  reviewsLength: number
  pagination: IPagination
}
export type GetProductReviewsQuery = { id: string; page: number }
export type GetSingleReviewResult = { review: IReview }
export type EditReviewQuery = { id: string; body: Partial<IReview> }
