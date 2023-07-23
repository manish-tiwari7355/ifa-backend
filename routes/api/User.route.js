const router = require("express").Router();
const updateUser = require("../../controllers/user/updateUser");
const currentUser = require("../../controllers/user/currentUser");
const resetpassword = require("../../controllers/user/resetPassword");
const getUser = require("../../controllers/user/getUser");
const validateAccessToken = require("../../middlewares/jwtValidation");

// send tip
router.put(
  "/:id",
  validateAccessToken,
  (req, res, next) => roleCheck(req, res, next, ["admin"]),
  updateUser
);
router.get("/me", validateAccessToken, getUser);
router.get(
  "/:id",
  validateAccessToken,

  currentUser
);
router.put(
  "/resetPassword/:id",
  validateAccessToken,
  (req, res, next) => roleCheck(req, res, next, ["admin"]),
  resetpassword
);

module.exports = router;
