import { Model, Schema, model, models } from 'mongoose'

import type { DataModels } from 'types'

const userSchema = new Schema<DataModels.IUserDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: {
    type: {
      postalCode: {
        type: String,
      },
      street: {
        type: String,
      },
      city: {
        id: {
          type: Number,
        },
        name: {
          type: String,
        },
        slug: {
          type: String,
        },
        province_id: {
          type: Number,
        },
      },
      province: {
        id: {
          type: Number,
        },
        name: {
          type: String,
        },
        slug: {
          type: String,
        },
      },
    },
    required: false,
  },
  mobile: { type: String },
  role: { type: String, default: 'user' },
  root: { type: Boolean, default: false },
})

const User: Model<DataModels.IUserDocument> =
  models.user || model<DataModels.IUserDocument>('user', userSchema)

export default User
