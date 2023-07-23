const { Schema, model } = require("mongoose");

const BlogMedia = new Schema({
  url: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    required: false,
  },
});
const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["events", "activities", "awards", "tour", "news"],
      default: "events",
    },
    media: [
      {
        type: BlogMedia,
        required: false,
      },
    ],
    description: {
      type: String,
      required: true,
    },
    altDescription: {
      type: String,
    },
    isActive: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = model("Blog", blogSchema, "blogs");
