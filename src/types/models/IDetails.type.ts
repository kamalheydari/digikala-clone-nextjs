import type { ObjectId, Document } from 'mongoose'

export interface IDetails {
  _id: string
  category_id: string
  info: { title: string }[]
  specification: { title: string }[]
  optionsType: 'colors' | 'sizes' | 'none'
}

export interface IDetailsDocument extends Document {
  _id: ObjectId
  category_id: ObjectId
  info: { title: string }[]
  specification: { title: string }[]
  optionsType: 'colors' | 'sizes' | 'none'
  createdAt: Date
  updatedAt: Date
}
