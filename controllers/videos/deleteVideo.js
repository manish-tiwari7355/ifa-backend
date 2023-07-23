const Video = require("../../models/video.model");
const { ObjectId } = require("mongoose").Types;

const deleteVideo = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Video.findOneAndDelete({
      _id: ObjectId(id),
    });
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.log("error: ", error);
    next(error);
  }
};

module.exports = deleteVideo;