const bcrypt = require("bcryptjs");
const createError = require("http-errors");

const User = require("../../models/User.model");
const Token = require("../../models/RefreshToken.model");
const {
  generateAccessToken,
  generateRefreshToken,
  generateCryptoKey,
} = require("../../services/generate_token");

const { accessTokenLife, refreshTokenLife } = require("../../config/keys").jwt;
const sendEmail = require("../../services/sendEmail");
const verifyEmailTemplate = require("../../config/emailTemplates/verifyEmail");
const ResetPassword = require("../../models/ResetPassword.model");

const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).send({ message: "This email is not registered" });
    }
    await ResetPassword.findOneAndDelete({ email: email });
    const otp = sendEmail.generateOTP();
    const forgotPassword = new ResetPassword({
      otp,
      email,
    });
    await forgotPassword.save();
    res.status(200).send({ message: "OTP sent successfully", otp });
  } catch (error) {
    console.log("error register: ", error);
    if (error.isJoi === true) error.status = 422;
    next(error);
  }
};

module.exports = forgotPassword;
