import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: true,
    },
    product: {
      type: mongoose.Types.ObjectId,
      ref: "product",
      required: true,
    },
    title: { type: String, required: true },
    rating: { type: Number, default: 0, required: true },
    comment: { type: String, required: true },
    status: {
      type: Number,
      default: 1,
      enum: [1, 2, 3],
    },
    positivePoints: { type: Array },
    negativePoints: { type: Array },
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.models.review || mongoose.model("review", reviewSchema);

export default Review;
