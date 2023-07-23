const { Schema, model } = require("mongoose");

const AlumniSchema = new Schema(
  {
    email: { type: String },

    name: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["male","female","others"]
    },
    yearOfPassout: {
      type: Number,
    },
    phone: {
      type: Number,
    },

    workingInIndustry: {
      type: String,
      enum: ['Working In Industry',
      'Higher Education',
      'Qualified Competitive Exam',
      'Gov. Job',
      'Running Own/Family Business(Entrepreneurs)',
      'Working in Education Institutes',
      'Others'],
    },

    branch: {
      type: String,
      enum: [ 'Select branch',
      'Computer Science And Engineering',
      'Civil Engineering',
      'Mechanical Engineering',
      'Others',],
    },

    message: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Alumni = model("Alumni", AlumniSchema, "alumni");

// make this available to our users in our Node applications
module.exports = Alumni;
