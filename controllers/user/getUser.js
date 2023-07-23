const createError = require("http-errors");

const User = require("../../models/User.model");
const { ObjectId } = require("mongoose").Types;

const getUser = async (req, res, next) => {
  try {
    const { email } = req.user;
    const user = await User.findOne({ email });
    if (!user) {
      return next(createError(404));
    }
    res.status(200).json({
      message: "success",
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error while fetching user",
      error: err,
    });
  }
};

module.exports = getUser;
