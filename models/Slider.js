import mongoose from 'mongoose'

const SliderSchema = new mongoose.Schema(
  {
    category_id: {
      type: mongoose.Types.ObjectId,
      ref: 'category',
      required: true,
    },
    sliders: { type: [Object], required: true },
  },
  { timestamps: true }
)

const Slider = mongoose.models.slider || mongoose.model('slider', SliderSchema)

export default Slider
