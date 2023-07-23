const ResetPassword = require("../../models/ResetPassword.model");
const User = require("../../models/User.model");
const bcrypt = require("bcryptjs");
const resetPassword = async (req, res) => {
  try {
    const { password, email } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    user.password = hashedPassword;
    await user.save();
    res.status(200).json({
      message: "success",
      user,
    });
  } catch (err) {
    res.status(400).send({ message: "Error occured" });
  }
};
module.exports = resetPassword;
