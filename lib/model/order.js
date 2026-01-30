import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true }, // buyer
    products: [
      {
        productId: { type: String, required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true, default: 1 }, // quantity added
      },
    ],
    total: { type: Number, required: true }, // total for the order
    status: { type: String, default: "pending" }, // pending, shipped, delivered, canceled
  },
  { timestamps: true }
);

// Only compile model if it doesn’t already exist (prevents OverwriteModelError)
const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
