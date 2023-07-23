const router = require("express").Router();

const authRoutes = require("./Auth.route");

const contactUsRoutes = require("./ContactUs.route");
const JobApplicationRoutes = require("./JobApplication.route.js");
const newsRoutes = require("./News.route.js");
const User = require("./User.route.js");
const Blog = require("./Blog.route.js");
const Alumni = require("./Alumni.route.js");
const Awards = require("./Awards.route.js");
const validateAccessToken = require("../../middlewares/jwtValidation");
const Books = require("./Books.route.js");
const Video= require("./Video.route");


router.use("/video",Video);
router.use("/book",Books);
router.use("/auth", authRoutes);
router.use("/news", newsRoutes);
router.use("/contact", contactUsRoutes);
router.use("/job", JobApplicationRoutes);
router.use("/blog", Blog);
router.use("/user", User);
router.use("/awards", Awards);
router.use("/alumni", Alumni);

router.get("/test", validateAccessToken, (req, res) => {
  res.status(200).json({
    message: "success",
  });
});

router.get("/ping", (req, res) => {
  res.json({ success: "true", message: "successful request" });
});

module.exports = router;
