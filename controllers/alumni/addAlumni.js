const createError = require("http-errors");
const { ObjectId } = require("mongoose").Types;

const Alumni = require("../../models/Alumni.model");
const sendMessage = require("../../services/sendEmail");

const AlumniTemplate = require("../../template/Alumni");

const addAlumni = async (req, res, next) => {
  try {
    const {
      email,
      name,
      gender,
      yearOfPassout,
      phone,
      branch,
      // currentStatus,
      message,
    } = req.body;

    const data = new Alumni({
      email,
      name,
      gender,
      yearOfPassout,
      phone,
      branch,
      // currentStatus,
      message,
    });
    await data.save();
    await sendMessage.sendEmail2(
      ["chairmanifa@gmail.com"],
      "Alumni",
      AlumniTemplate(data)
    );
    res.status(200).json({
      message: "Alumni added successfully",
      data,
    });
  } catch (error) {
    console.log("error: ", error);
    next(error);
  }
};

module.exports = addAlumni;
