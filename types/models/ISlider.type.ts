import type { ObjectId, Document } from 'mongoose'

export interface ISlider {
  _id: string
  category_id: string
  image: {
    url: string
  }
  title: string
  uri?: string
  isPublic: boolean
}

export interface ISliderDocument extends Document {
  _id: ObjectId
  category_id: ObjectId
  image: {
    url: string
  }
  title: string
  uri?: string
  isPublic: boolean
  createdAt: Date
  updatedAt: Date
}
