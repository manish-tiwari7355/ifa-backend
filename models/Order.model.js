const { Schema, model } = require("mongoose");

// order schema
const OrderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [{
      type: String,
      required: true,
    }],
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "processing", "shipped", "delivered"],
      default: "pending",
    },
    tracking: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = model("Order", OrderSchema, "orders");
