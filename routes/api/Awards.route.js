const router = require("express").Router();

const createAwards = require("../../controllers/Awards/createAwards");
const getAwards = require("../../controllers/Awards/getAwards");
const updateAwards = require("../../controllers/Awards/updateAwards");
const deleteAwards = require("../../controllers/Awards/deleteAwards");
const getSingleAwards = require("../../controllers/Awards/getSingleAwards");

const roleCheck = require("../../middlewares/roleCheck");
const getAllImages = require("../../controllers/blogs/getAllImages");

const validateAccessToken = require("../../middlewares/jwtValidation");

router.get("/images", getAllImages);

router.post(
  "/create",
  validateAccessToken,
  (req, res, next) => roleCheck(req, res, next, ["admin"]),
  createAwards
);
router.get(
  "/",
  // validateAccessToken,
  // (req, res, next) => roleCheck(req, res, next, ["admin"]),
  getAwards
);
router.put(
  "/:id",
  validateAccessToken,
  (req, res, next) => roleCheck(req, res, next, ["admin"]),
  updateAwards
);
router.delete(
  "/:awardId",
  validateAccessToken,
  (req, res, next) => roleCheck(req, res, next, ["admin"]),
  deleteAwards
);
router.get(
  "/:awardId",
  validateAccessToken,
  (req, res, next) => roleCheck(req, res, next, ["admin"]),
  getSingleAwards
);

module.exports = router;
