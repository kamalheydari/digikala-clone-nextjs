import { Document } from 'mongoose'
import type { IAddress, IColor, ISize } from 'types'

declare namespace DataModels {
  interface IBanner {
    _id: string
    category_id: string
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

  interface ISlider {
    _id: string
    category_id: string
    image: {
      url: string
    }
    title: string
    uri?: string
    isPublic: boolean
    createdAt: Date
    updatedAt: Date
  }

  interface ICategory {
    _id: string
    name: string
    slug: string
    parent?: string
    image: string
    colors?: { start: string; end: string }
    level: number
    children?: ICategory[]
    createdAt: Date
    updatedAt: Date
  }

  interface IDetails {
    _id: string
    category_id: string
    info: { title: string }[]
    specification: { title: string }[]
    optionsType: 'colors' | 'sizes' | 'none'
    createdAt: Date
    updatedAt: Date
  }

  interface IProduct {
    _id: string
    title: string
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
  }

  interface IUser {
    _id: string
    name: string
    email: string
    password: string
    role: 'root' | 'user' | 'admin'
    root: boolean
    mobile: string
    address?: IAddress
  }

  interface IOrder {
    _id: string
    user: IUser
    address: {
      provinces: string
      city: string
      street: string
      postalCode: string
    }
    mobile: string
    cart: ICart[]
    totalItems: number
    totalPrice: number
    totalDiscount: number
    paymentMethod: string
    delivered: boolean
    paid: boolean
    dateOfPayment: Date
    createdAt: Date
    updatedAt: Date
  }

  interface IReview {
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

  // Define type for MongoDB documents
  type IBannerDocument = IBanner & Document

  type ISliderDocument = ISlider & Document

  type ICategoryDocument = ICategory & Document

  type IDetailsDocument = IDetails & Document

  type IProductDocument = IProduct & Document

  type IUserDocument = IUser & Document

  type IOrderDocument = IOrder & Document

  type IReviewDocument = IReview & Document
}

export default DataModels
