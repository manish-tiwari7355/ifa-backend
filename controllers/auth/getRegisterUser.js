const createError = require("http-errors");

const RegisterUser = require("../../models/RegisterUser.model");
const { registerValidation } = require("../../services/validation_schema");
const getRegisterUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const registerUser = await RegisterUser.findOne({ _id: id });
    if (!registerUser) {
      return next(createError(404, "User not found"));
    }
    res.status(200).json({
      message: "success",
      registerUser,
    });
  } catch (error) {
    console.log("error: ", error);
    next(error);
  }
};

module.exports = getRegisterUser;
