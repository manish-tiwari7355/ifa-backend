const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  role: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },
});

module.exports = model("User", UserSchema, "users");
