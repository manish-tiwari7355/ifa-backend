const { boolean } = require("joi");
const { Schema, model } = require("mongoose");

const ContactSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,

      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
      required: true,
    },
    notes: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = model("ContactUs", ContactSchema, "contactUs");
