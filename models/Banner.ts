import { Model, Schema, models, model } from 'mongoose'

import type { DataModels } from 'types'

const BannerSchema = new Schema<DataModels.IBannerDocument>(
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

const Banner: Model<DataModels.IBannerDocument> =
  models.banner || model<DataModels.IBannerDocument>('banner', BannerSchema)

export default Banner
