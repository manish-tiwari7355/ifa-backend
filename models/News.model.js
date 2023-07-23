const { Schema, model } = require("mongoose");

const NewsMedia = new Schema({
  url: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ["image", "video"],
  },
});

const NewsSchema = new Schema(
  {
    isActive: {
      type: Boolean,
      default: true,
    },
    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
    media: [
      {
        type: NewsMedia,
        required: false,
      },
    ],
    type: {
      type: String,
      default: "news",
      enum: ["events", "activities", "awards", "tours", "news"],
      required: true,
    },

    addedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    available: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = model("News", NewsSchema, "news");
