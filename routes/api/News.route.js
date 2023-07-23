const router = require("express").Router();

const createNews = require("../../controllers/news/createNews");

const updateNews = require("../../controllers/news/updateNews");
const deleteNews = require("../../controllers/news/deleteNews");
const getNews = require("../../controllers/news/getNews");
const getSingleNews = require("../../controllers/news/getSingleNews");
const validateAccessToken = require("../../middlewares/jwtValidation");
router.post(
  "/create",
  validateAccessToken,
  (req, res, next) => roleCheck(req, res, next, ["admin"]),

  createNews
);
router.put(
  "/:id",
  validateAccessToken,
  (req, res, next) => roleCheck(req, res, next, ["admin"]),

  updateNews
);

router.delete(
  "/:id",
  validateAccessToken,
  (req, res, next) => roleCheck(req, res, next, ["admin"]),

  deleteNews
);

router.get("/", getNews);
router.get(
  "/:id",
  (req, res, next) => roleCheck(req, res, next, ["admin"]),

  getSingleNews
);

module.exports = router;
