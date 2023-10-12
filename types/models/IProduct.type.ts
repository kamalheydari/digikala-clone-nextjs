import type { ObjectId, Document } from 'mongoose'
import type { ISize, IColor, ICategory } from 'types'

export interface IProduct {
  _id: string
  title: string
  slug: string
  price: number
  description: string
  discount: number
  images: {
    url: string
  }[]
  sizes: ISize[] | []
  colors: IColor[] | []
  category: string[]
  category_levels: {
    level_one: ICategory
    level_two: ICategory
    Level_three: ICategory
  }
  inStock: number
  sold: number
  info: { title: string; value?: string }[]
  specification: { title: string; value?: string }[]
  rating: number
  numReviews: number
  optionsType: 'colors' | 'sizes' | 'none'
}

export interface IProductDocument extends Document {
  _id: ObjectId
  title: string
  slug: string
  price: number
  description: string
  discount: number
  images: {
    url: string
  }[]
  sizes: ISize[] | []
  colors: IColor[] | []
  category: ObjectId[]
  category_levels: {
    level_one: ObjectId
    level_two: ObjectId
    Level_three: ObjectId
  }
  inStock: number
  sold: number
  info: { title: string; value?: string }[]
  specification: { title: string; value?: string }[]
  rating: number
  numReviews: number
  optionsType: 'colors' | 'sizes' | 'none'
  createdAt: Date
  updatedAt: Date
}
