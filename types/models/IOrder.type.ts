import type { ObjectId, Document } from 'mongoose'
import type { IUser, ICart } from 'types'

export interface IOrder {
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

export interface IOrderDocument extends Document {
  _id: ObjectId
  user: ObjectId
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
