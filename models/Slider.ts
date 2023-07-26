import { Model, Schema, model, models } from 'mongoose'

import type { DataModels } from 'types'

const SliderSchema = new Schema<DataModels.ISliderDocument>(
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
  },
  { timestamps: true }
)

const Slider: Model<DataModels.ISliderDocument> =
  models.slider || model<DataModels.ISliderDocument>('slider', SliderSchema)

export default Slider
