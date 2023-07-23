const { Schema, model } = require("mongoose");

const WishlistSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  items: [
    {
      type: Schema.Types.ObjectId,
      ref: "WishlistItem",
      required: false,
    },
  ],
});

module.exports = model("Wishlist", WishlistSchema, "wishlists");
