const { Schema, model } = require("mongoose");
const JobMedia = new Schema({
  url: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});
const JobApplication = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    fathersName: {
      type: String,
      required: true,
    },
    qualifications: {
      type: String,
      required: true,
    },
    media: [
      {
        type: JobMedia,
        required: false,
      },
    ],
    experience: {
      type: String,

      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    message: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("JobApplication", JobApplication, "jobApplications");
