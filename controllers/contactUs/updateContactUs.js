const createError = require("http-errors");
const ContactUs = require("../../models/ContactUs.model");
const { ObjectId } = require("mongoose").Types;
const updateContactUs = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { notes, status } = req.body;
    const contactUs = await ContactUs.findOne({ _id: id });
    if (!contactUs) {
      return next(createError(404));
    }
    contactUs.notes = notes;
    contactUs.status = status;
    await contactUs.save();
    res.status(200).json({
      message: "success",
      contactUs,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateContactUs;
