const router = require("express").Router();

const createContactUs = require("../../controllers/contactUs/createContactUs");

const deleteContactUs = require("../../controllers/contactUs/deleteContactUs");
const getContactUs = require("../../controllers/contactUs/getContactUs");
const validateAccessToken = require("../../middlewares/jwtValidation");

const roleCheck = require("../../middlewares/roleCheck");
const getSingleContactUs = require("../../controllers/contactUs/getSingleContactUs");
const updateContactUs = require("../../controllers/contactUs/updateContactUs");

router.post("/create", createContactUs);
router.delete(
  "/:id",
  validateAccessToken,

  (req, res, next) => roleCheck(req, res, next, ["admin"]),
  deleteContactUs
);
router.get(
  "/",

  getContactUs
);
router.get(
  "/:id",

  getSingleContactUs
);
router.put(
  "/:id",
  validateAccessToken,
  (req, res, next) => roleCheck(req, res, next, ["admin"]),
  updateContactUs
);

module.exports = router;
