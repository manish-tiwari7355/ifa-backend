const mongoose = require("mongoose");
const { ObjectId } = require("mongoose").Types;
const Video = new mongoose.Schema({
  description: {
    type: String,
  },
  link: {
    type: String,
  },
});
module.exports = mongoose.model("videos", Video, "videos");
