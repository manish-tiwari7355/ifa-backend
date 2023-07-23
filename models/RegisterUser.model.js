const { Schema, model } = require("mongoose");

const RegisterUser = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },

    fatherName: {
      type: String,
      required: true,
    },
    fatherOccupation: {
      type: String,

      required: true,
    },
    motherName: {
      type: String,
      required: false,
    },
    motherOccupation: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: false,
    },
    telephoneNumber: {
      type: String,
    },
    freshAdmission: {
      type: Boolean,
      required: true,
    },
    permanentAddress: {
      type: String,
      required: true,
    },
    admissionSought: {
      type: String,
      required: false,
    },
    presentlyStudying: {
      type: String,
      required: false,
    },
    currentSchool: {
      type: String,
      required: false,
    },
    currentBoard: {
      type: String,
      required: false,
    },
    remark: {
      type: String,
    },
    lastUpdatedAt: {
      type: Date,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = model("RegisterUser", RegisterUser, "registeruser");
