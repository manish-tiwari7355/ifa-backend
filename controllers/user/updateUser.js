const createError = require("http-errors");

// import user model
const User = require("../../models/User.model");
// const PostGift = require("../../models/PostGift.model");
const { ObjectId } = require("mongoose").Types;

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const user = await User.findOne({ _id: id });
    if (!user) {
      return next(createError(404));
    }
    user.name = name;

    await user.save();
    res.status(200).json({
      message: "success",
      user,
    });
  } catch (error) {
    console.log("error: ", error);
    next(error);
  }
};

module.exports = updateUser;
