import type { ObjectId, Document } from 'mongoose'

export interface IBanner {
  _id: string
  category_id: string
  image: {
    url: string
  }
  title: string
  uri?: string
  isPublic: boolean
  type: string
}

export interface IBannerDocument extends Document {
  _id: ObjectId
  category_id: ObjectId
  image: {
    url: string
  }
  title: string
  uri?: string
  isPublic: boolean
  type: string
  createdAt: Date
  updatedAt: Date
}
