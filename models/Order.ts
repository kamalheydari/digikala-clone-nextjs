import mongoose, { Model, Schema, model, models } from 'mongoose'

import type { DataModels } from 'types'

const orderSchema = new Schema<DataModels.IOrderDocument>(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'user',
    },
    address: Object,
    mobile: String,
    cart: [
      {
        itemID: { type: String },
        productID: { type: Schema.Types.ObjectId },
        name: { type: String },
        price: { type: Number },
        discount: { type: Number },
        inStock: { type: Number },
        sold: { type: Number },
        color: {
          type: {
            id: { type: String, required: true },
            name: { type: String, required: true },
            hashCode: { type: String, required: true },
          },
          required: false,
        },
        size: {
          type: {
            id: { type: String, required: true },
            size: { type: String, required: true },
          },
          required: false,
        },
        img: {
          public_id: { type: String },
          url: { type: String },
        },
        quantity: { type: Number },
      },
    ],
    totalItems: Number,
    totalPrice: Number,
    totalDiscount: Number,
    paymentMethod: String,
    delivered: {
      type: Boolean,
      default: false,
    },
    paid: {
      type: Boolean,
      default: false,
    },
    dateOfPayment: Date,
  },
  { timestamps: true }
)

const Order: Model<DataModels.IOrderDocument> =
  models.order || model<DataModels.IOrderDocument>('order', orderSchema)
export default Order
