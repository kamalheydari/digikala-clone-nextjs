import { Model, Schema, models, model } from 'mongoose'

import type { ICategoryDocument } from 'types'

const CategorySchema = new Schema<ICategoryDocument>(
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

const Category: Model<ICategoryDocument> =
  models.category || model<ICategoryDocument>('category', CategorySchema)

export default Category
