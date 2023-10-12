import { Model, Schema, model, models } from 'mongoose'

import type {  IDetailsDocument } from 'types'

const DetailsSchema = new Schema<IDetailsDocument>(
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

const Details: Model<IDetailsDocument> =
  models.details || model<IDetailsDocument>('details', DetailsSchema)

export default Details
