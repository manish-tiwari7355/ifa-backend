const router = require("express").Router();

const registerUser = require("../../controllers/auth/registerUser");
const registerAdminUser = require("../../controllers/auth/register");
const loginUser = require("../../controllers/auth/loginUser");
const getRegisterUser = require("../../controllers/auth/getRegisterUser");
const getAllRegisterUser = require("../../controllers/auth/getAllRegisterUser");
const updateRegisteredUser = require("../../controllers/auth/updateRegisteredUser");
const forgotPassword = require("../../controllers/auth/forgotPassword");
const verifyOtp = require("../../controllers/auth/verifyOtp");
const resetPassword = require("../../controllers/auth/resetPassword");

router.post("/registeruser", registerUser);
router.get("/registeruser/:id", getRegisterUser);
router.get("/getAllRegisteruser/", getAllRegisterUser);
router.put("/updateRegisteredUser/:id", updateRegisteredUser);
router.post("/admin/create", registerAdminUser);
router.post("/admin/login", loginUser);
router.post("/forgotPassword", forgotPassword);
router.post("/verifyOtp/:token", verifyOtp);
router.post("/resetPassword", resetPassword);

module.exports = router;
