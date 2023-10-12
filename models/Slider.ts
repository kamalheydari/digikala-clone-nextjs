import { Model, Schema, model, models } from 'mongoose'

import type { ISliderDocument } from 'types'

const SliderSchema = new Schema<ISliderDocument>(
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

const Slider: Model<ISliderDocument> =
  models.slider || model<ISliderDocument>('slider', SliderSchema)

export default Slider
