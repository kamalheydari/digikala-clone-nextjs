import { Model, Schema, models, model } from 'mongoose'

import type { IBannerDocument } from 'types'

const BannerSchema = new Schema<IBannerDocument>(
  {
    category_id: {
      type: Schema.Types.ObjectId,
      ref: 'category',
      required: true,
    },
    image: {
      url: {
        type: String,
        required: true,
      },
    },
    title: {
      type: String,
      required: true,
    },
    uri: {
      type: String,
      required: false,
    },
    isPublic: {
      type: Boolean,
      required: true,
      default: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

const Banner: Model<IBannerDocument> =
  models.banner || model<IBannerDocument>('banner', BannerSchema)

export default Banner
