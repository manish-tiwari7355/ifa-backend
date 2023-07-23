const Books = require("../../models/Books.model");
const createError = require("http-errors");
const { ObjectId } = require("mongoose").Types;

const getSingleBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await Books.findOne({
      _id: ObjectId(id),
    });
    if (!data) throw createError.BadRequest("book not found");
    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.log("error: ", error);
    next(error);
  }
};

module.exports = getSingleBook;