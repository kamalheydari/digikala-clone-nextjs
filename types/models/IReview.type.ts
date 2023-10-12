import type { ObjectId, Document } from 'mongoose'
import type { IUser, IProduct } from 'types'

export interface IReview {
  _id: string
  user: IUser
  product: IProduct
  title: string
  rating: number
  comment: string
  status: number
  positivePoints: {
    id: string
    title: string
  }[]
  negativePoints: {
    id: string
    title: string
  }[]
  createdAt: Date
  updatedAt: Date
}

export interface IReviewDocument extends Document {
  _id: ObjectId
  user: ObjectId
  product: ObjectId
  title: string
  rating: number
  comment: string
  status: number
  positivePoints: {
    id: string
    title: string
  }[]
  negativePoints: {
    id: string
    title: string
  }[]
  createdAt: Date
  updatedAt: Date
}
