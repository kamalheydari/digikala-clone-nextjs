import type { ObjectId, Document } from 'mongoose'
import type { IAddress } from 'types'

export interface IUser {
  _id: string
  name: string
  email: string
  password: string
  role: 'root' | 'user' | 'admin'
  mobile: string
  address?: IAddress
}

export interface IUserDocument extends Document {
  _id: ObjectId
  name: string
  email: string
  password: string
  role: 'root' | 'user' | 'admin'
  mobile: string
  address?: IAddress
  createdAt: Date
  updatedAt: Date
}
