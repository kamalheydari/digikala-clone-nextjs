import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    address: Object,
    mobile: String,
    cart: [Object],
    totalItems: Number,
    totalPrice: Number,
    totalDiscount: Number,
    paymentMethod: String,
    delivered: {
      type: Boolean,
      default: false,
    },
    paid: {
      type: Boolean,
      default: false,
    },
    dateOfPayment: Date,
  },
  { timestamps: true }
);

const Order = mongoose.models.order || mongoose.model("order", orderSchema);
export default Order;
