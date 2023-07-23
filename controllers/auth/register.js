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
const sendEmail = require("../../services/sendEmail");
const verifyEmailTemplate = require("../../config/emailTemplates/verifyEmail");
const VerifyTokenModel = require("../../models/VerifyToken.model");

const registerUser = async (req, res, next) => {
  try {
    // validation code here
    if (!req.body?.email && !req.body?.phone)
      throw createError.BadRequest(
        "Email or phone number is required for registration."
      );
    // const result = await registerValidation.validateAsync(req.body);

    // eslint-disable-next-line no-unused-vars
    const { email, password, name, role } = req.body;

    // this runs when the user is new
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
      is_verified: false,
    });

    // Save user to DB
    const createdUser = await user.save();
    console.log(createdUser);
    if (!createdUser)
      throw createError.InternalServerError(
        "Your request could not be processed. Please contact support or try again after some time."
      );

    // generate verify email token and save to db

    const verificationToken = generateCryptoKey();
    const hashedToken = await bcrypt.hash(verificationToken, 10);
    const verification = new VerifyTokenModel({
      user: createdUser._id,
      token: hashedToken,
      type: "verify-email",
    });
    await verification.save();
    console.log(verification);

    // send verification email to saved user
    // await sendEmail(
    //   [email],
    //   "Verify your account",
    //   verifyEmailTemplate(
    //     { name: createdUser.name },
    //     `http://localhost:3000/verify-email?vt=${verificationToken}&i=${Buffer.from(
    //       createdUser._id
    //     ).toString("base64")}`
    //   )
    // );

    // generate access and refresh token

    const jwtPayload = {
      _id: createdUser._id,
      role: createdUser.role,
      email: createdUser.email,
      name: createdUser.name,
      verified: createdUser.verified,
    };

    const accessToken = generateAccessToken(jwtPayload, accessTokenLife);
    const refreshToken = generateRefreshToken(jwtPayload, refreshTokenLife);
    if (accessToken && refreshToken) {
      const newToken = new Token({
        user: user._id,
        token: refreshToken,
      });
      // save refresh token to db
      const savedToken = await newToken.save();
      if (!savedToken)
        throw createError.InternalServerError(
          "Your request could not be processed. Please try again."
        );
      // send response
      res.cookie("auth", refreshToken, { httpOnly: true });
      res.status(200).json({
        success: true,
        accessToken,
        refreshToken,
        user: jwtPayload.data,
      });
    }
  } catch (error) {
    console.log("error register: ", error);
    if (error.isJoi === true) error.status = 422;
    next(error);
  }
};

module.exports = registerUser;
