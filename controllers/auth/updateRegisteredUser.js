const createError = require("http-errors");

const RegisterUser = require("../../models/RegisterUser.model");
const { registerValidation } = require("../../services/validation_schema");
const updateRegisteredUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      name,
      fatherName,
      fatherOccupation,
      motherName,
      motherOccupation,
      email,
      phone,
      telephoneNumber,
      freshAdmission,
      permanentAddress,
      admissionSought,
      presentlyStudying,
      currentSchool,
      currentBoard,
      remark,
    } = req.body;
    const user = await RegisterUser.findOne({ _id: id });
    if (!user) {
      return next(createError(404, "User not found"));
    }
    const updatedUser = await RegisterUser.findOneAndUpdate(
      { _id: id },
      {
        name,
        fatherName,
        fatherOccupation,
        motherName,
        motherOccupation,
        email,
        phone,
        telephoneNumber,
        freshAdmission,
        permanentAddress,
        admissionSought,
        presentlyStudying,
        currentSchool,
        currentBoard,
        remark,
      },
      { new: true }
    );
    res.status(200).json({
      message: "success",
      updatedUser,
    });
  } catch (error) {
    console.log("error: ", error);
    next(error);
  }
};

module.exports = updateRegisteredUser;
