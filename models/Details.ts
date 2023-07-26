import { Model, Schema, model, models } from 'mongoose'

import type { DataModels } from 'types'

const DetailsSchema = new Schema<DataModels.IDetailsDocument>(
  {
    category_id: {
      type: Schema.Types.ObjectId,
      ref: 'category',
      required: true,
    },
    info: { type: [Object], required: true },
    specification: { type: [Object], required: true },
    optionsType: {
      type: String,
      default: 'none',
      enum: ['colors', 'sizes', 'none'],
    },
  },
  { timestamps: true }
)

const Details: Model<DataModels.IDetailsDocument> =
  models.details || model<DataModels.IDetailsDocument>('details', DetailsSchema)

export default Details
