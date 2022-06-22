import mongoose from "mongoose";

const DetailsSchema = new mongoose.Schema(
  {
    category_id: {
      type: mongoose.Types.ObjectId,
      ref: "category",
      required: true,
    },
    info: Object,
    specification: Object,
  },
  { timestamps: true }
);

const Details =
  mongoose.models.details || mongoose.model("details", DetailsSchema);

export default Details;
