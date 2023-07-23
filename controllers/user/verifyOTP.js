const ResetPassword = require("../../models/resetPassword.model");
const User = require("../../models/User.model");
const sendEmail = require("../../services/sendEmail");

const verifyOTP = async (req, res) => {
  try {
    const { token } = req.params;

    // decode base64 token
    let buff = Buffer.from(token, "base64");
    let text = buff.toString("ascii");

    const [email, otp] = text.split("-");

    const verifyotp = await ResetPassword.findOne({
      email: email,
      otp: otp,
      isVerified: false,
    }).exec();
    if (!verifyotp) {
      return res
        .status(400)
        .send({ message: "OTP is invalid or it may be expired!" });
    }

    verifyotp.isVerified = true;
    await verifyotp.save();

    res.status(200).send({ message: "OTP verified successfully" });
  } catch (err) {
    res.status(400).send({ message: "Error occured" });
  }
};

module.exports = verifyOTP;
