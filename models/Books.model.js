const { Schema, model } = require("mongoose");

const Books = new Schema(
  {
    classes: {
      type: String,
      enums: [
        "Class 1",
        "Class 2",
        "Class 3",
        "Class 4",
        "Class 5",
        "Class 6",
        "Class 7",
        "Class 8",
        "Class 9",
        "Class 10",
        "Class 11",
        "Class 12",
        // "Class 11 (Medical)",
        // "Class 11 (Non. Medical)",
        // "Class 11 (Commerce)",
        // "Class 11 (Arts)",
        // "Class 12 (Medical)",
        // "Class 12 (Non. Medical)",
        // "Class 12 (Commerce)",
        // "Class 12 (Arts)",
      ],
    },

    bookName: {
      type: String,
    },

    subject: {
      type: String,
    },

    publisher: {
      type: String,
    },

    media: [
      {
        url: { type: String },
        type: { type: String, default: "image/pdf" },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = model("Books", Books, "Books");
