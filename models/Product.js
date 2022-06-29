import mongoose from "mongoose";

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
      required: true,
    },
    discount: { type: Number, default: 0 },
    images: {
      type: Array,
      required: true,
    },
    sizes: { type: Array },
    colors: { type: Array },
    category: {
      type: String,
      required: true,
    },
    inStock: {
      type: Number,
      default: 0,
    },
    sold: {
      type: Number,
      default: 0,
    },
    info: { type: Array },
    specification: { type: Array },
  },
  {
    timestamps: true,
  }
);

const Product =
  mongoose.models.product || mongoose.model("product", productSchema);
export default Product;
