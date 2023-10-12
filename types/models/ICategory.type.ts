import type { ObjectId, Document } from 'mongoose'

export interface ICategory {
  _id: string
  name: string
  slug: string
  parent?: string
  image: string
  colors?: { start: string; end: string }
  level: number
  children?: ICategory[]
}

export interface ICategoryDocument extends  Document {
  _id: ObjectId
  name: string
  slug: string
  parent?: string
  image: string
  colors?: { start: string; end: string }
  level: number
  createdAt: Date
  updatedAt: Date
}
