import { Model, Schema, models, model } from 'mongoose'

import type { DataModels } from 'types'

const CategorySchema = new Schema<DataModels.ICategoryDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    parent: {
      type: Schema.Types.ObjectId,
      ref: 'category',
    },
    image: {
      type: String,
      required: true,
    },
    colors: { start: String, end: String },
    level: { type: Number, required: true },
  },
  { timestamps: true }
)

const Category: Model<DataModels.ICategoryDocument> =
  models.category ||
  model<DataModels.ICategoryDocument>('category', CategorySchema)

export default Category
