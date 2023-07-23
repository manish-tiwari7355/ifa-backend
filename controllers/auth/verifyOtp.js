const ResetPassword = require("../../models/ResetPassword.model");
const User = require("../../models/User.model");
const sendEmail = require("../../services/sendEmail");

const verifyOTP = async (req, res) => {
  try {
    const { token } = req.params;
    let buff = Buffer.from(token, "base64");
    let text = buff.toString("ascii");

    const [email, otp] = text.split("-");

    const verifyOtp = await ResetPassword.findOne({
      email,
      otp,
    });
    if (!verifyOtp) {
      return res
        .status(400)
        .send({ message: "OTP is invalid or it may be expired!" });
    }
    verifyOtp.isVerified = true;
    await verifyOtp.save();
    res.status(200).send({ message: "OTP verified successfully" });
  } catch (err) {
    res.status(400).send({ message: "Error occured" });
  }
};

module.exports = verifyOTP;
