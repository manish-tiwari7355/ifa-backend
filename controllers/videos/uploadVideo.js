const Video = require("../../models/video.model");
const createError = require("http-errors");

const uploadVideo = async (req, res, next) => {
  try {
    const { description, link } = req.body;

    const upload = new Video({
      description,
      link,
    });

    await upload.save();

    res.status(200).json({
      success: true,
      message: "video uploaded successfully",
      upload,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
module.exports = uploadVideo;
