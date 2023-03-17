import mongoose from 'mongoose'

const BannerSchema = new mongoose.Schema(
  {
    category_id: {
      type: mongoose.Types.ObjectId,
      ref: 'category',
      required: true,
    },
    banners: { type: [Object], required: true },
  },
  { timestamps: true }
)

const Banner = mongoose.models.banner || mongoose.model('banner', BannerSchema)

export default Banner
