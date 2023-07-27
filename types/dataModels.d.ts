import { Document, ObjectId } from 'mongoose'
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
  }

  interface IDetails {
    _id: string
    category_id: string
    info: { title: string }[]
    specification: { title: string }[]
    optionsType: 'colors' | 'sizes' | 'none'
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
  }

  // Define type for MongoDB documents
  interface IBannerDocument extends IBanner, Document {
    _id: ObjectId
    category_id: ObjectId
    createdAt: Date
    updatedAt: Date
  }

  interface ISliderDocument extends ISlider, Document {
    _id: ObjectId
    category_id: ObjectId
    createdAt: Date
    updatedAt: Date
  }

  interface ICategoryDocument extends ICategory, Document {
    _id: ObjectId
    createdAt: Date
    updatedAt: Date
  }

  interface IDetailsDocument extends IDetails, Document {
    _id: ObjectId
    category_id: ObjectId
    createdAt: Date
    updatedAt: Date
  }

  interface IProductDocument extends IProduct, Document {
    _id: ObjectId
    category: ObjectId[]
    category_levels: {
      level_one: ObjectId
      level_two: ObjectId
      Level_three: ObjectId
    }
    createdAt: Date
    updatedAt: Date
  }

  interface IUserDocument extends IUser, Document {
    _id: ObjectId
    createdAt: Date
    updatedAt: Date
  }

  interface IOrderDocument extends IOrder, Document {
    _id: ObjectId
    user: ObjectId
    createdAt: Date
    updatedAt: Date
  }

  interface IReviewDocument extends IReview, Document {
    _id: ObjectId
    user: ObjectId
    product: ObjectId
    createdAt: Date
    updatedAt: Date
  }
}

export default DataModels
