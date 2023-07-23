const router = require("express").Router();

const deleteVideo = require("../../controllers/videos/deleteVideo");
const getAllVideos = require("../../controllers/videos/getAllVideo");
const uploadVideo = require("../../controllers/videos/uploadVideo");

router.delete("/:id", deleteVideo);
router.post("/add", uploadVideo);
router.get("/",getAllVideos)

module.exports = router;
