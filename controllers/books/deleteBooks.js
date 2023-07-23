const uploadFiles = require("../../services/upload-files");
const Books = require("../../models/Books.model");
const formidable = require("formidable");
const createError = require("http-errors");
const { ObjectId } = require("mongoose").Types;

const deleteBooks = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id, "id");
    const data = await Books.findOneAndDelete({
      _id: ObjectId(id),
    });
    console.log(data, "llll");
    res.status(200).json({
      success: true,
      data: data,
    });
  } catch (error) {
    console.log("error: ", error);
    next(error);
  }
};

module.exports = deleteBooks;
