import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    discount: { type: Number, default: 0 },
    images: {
      type: Array,
      required: true,
    },
    sizes: { type: Array },
    colors: { type: Array },
    category: {
      type: Array,
      required: true,
    },
    category_levels: {
      level_one: {
        type: mongoose.Types.ObjectId,
        ref: 'category',
      },
      level_two: {
        type: mongoose.Types.ObjectId,
        ref: 'category',
      },
      Level_three: {
        type: mongoose.Types.ObjectId,
        ref: 'category',
      },
    },
    inStock: {
      type: Number,
      default: 0,
    },
    sold: {
      type: Number,
      default: 0,
    },
    info: { type: [Object] },
    specification: { type: [Object] },
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
  },
  {
    timestamps: true,
  }
)

const Product =
  mongoose.models.product || mongoose.model('product', productSchema)
export default Product
