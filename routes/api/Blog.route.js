const router = require("express").Router();

const createBlog = require("../../controllers/blogs/createBlog");
const updateBlog = require("../../controllers/blogs/updateBlog");
const getAllImages = require("../../controllers/blogs/getAllImages");
const getSingleBlog = require("../../controllers/blogs/getSingleBlog");
const deleteBlogs = require("../../controllers/blogs/deleteBlogs");
const getAllBlogs = require("../../controllers/blogs/getAllBlogs");
const roleCheck = require("../../middlewares/roleCheck");

const validateAccessToken = require("../../middlewares/jwtValidation");

router.post(
  "/create",
  validateAccessToken,
  (req, res, next) => roleCheck(req, res, next, ["admin"]),
  createBlog
);
router.get("/:blogId", getSingleBlog);

router.put(
  "/:blogId",
  validateAccessToken,

  (req, res, next) => roleCheck(req, res, next, ["admin"]),
  updateBlog
);
router.get("/", getAllBlogs);
router.get("/images", getAllImages);
router.delete("/:blogId", deleteBlogs);

module.exports = router;
