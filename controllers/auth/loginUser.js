const bcrypt = require("bcryptjs");
const createError = require("http-errors");

// import nodemailer function and verification template
// const sendEmail = require("../../config/nodemailer");
// const emailTemplate = require("../../config/emailTemplates/emailTemplate");

// import models and helpers
const User = require("../../models/User.model");
const Token = require("../../models/RefreshToken.model");
const {
  generateAccessToken,
  generateRefreshToken,
  generateCryptoKey,
} = require("../../services/generate_token");

const { accessTokenLife, refreshTokenLife } = require("../../config/keys").jwt;

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email }).exec();

    if (!user) {
      throw createError.BadRequest("Email or phone number is incorrect");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw createError.Unauthorized("Incorrect password. Please try again.");
    }
    const payload = {
      email: user.email,
      name: user.name,
      role: "admin",
      _id: user._id,
    };
    const accessToken = generateAccessToken(payload, accessTokenLife);
    const refreshToken = generateRefreshToken(payload, refreshTokenLife);
    if (accessToken && refreshToken) {
      const token = new Token({
        user: user._id,
        token: refreshToken,
      });
      await token.save();
      res.cookie("auth", refreshToken, { httpOnly: true });
      res.status(200).json({
        success: true,
        accessToken,
        user: payload,
      });
    }
  } catch (error) {
    console.log("error login: ", error);
    if (error.isJoi === true) error.status = 422;
    next(error);
  }
};

module.exports = loginUser;
