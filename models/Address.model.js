const { Schema, model } = require("mongoose");

const AddressSchema = new Schema({
  street: {
    type: String,
    required: true,
  },
  zip: {
    type: Number,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
});

const UserAddressSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    address: {
      type: AddressSchema,
    },
    isPrimary: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Address = model("Address", UserAddressSchema, "addresses");

// make this available to our users in our Node applications
module.exports = Address;
