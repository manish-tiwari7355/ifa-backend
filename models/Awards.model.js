const { Schema, model } = require("mongoose");

const AwardMedia = new Schema({
  url: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});
const awardSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    media: [
      {
        type: AwardMedia,
        required: true,
      },
    ],

    type: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
    },
    year: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = model("Awards", awardSchema, "awards");
