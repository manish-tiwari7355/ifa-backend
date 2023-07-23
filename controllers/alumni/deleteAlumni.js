const AlumniSchema = require("../../models/Alumni.model");
const { ObjectId } = require("mongoose").Types;

const deleteAlumni = async (req, res, next) => {
    try {
      const { id } = req.params;
      await AlumniSchema.findOneAndDelete({
        _id: ObjectId(id),
      });
      res.status(200).json({
        success: true,
      });
    } catch (error) {
      console.log("error: ", error);
      next(error);
    }
  };
  
  module.exports = deleteAlumni;