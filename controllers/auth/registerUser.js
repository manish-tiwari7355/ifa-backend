const createError = require("http-errors");

const RegisterUser = require("../../models/RegisterUser.model");
const { registerValidation } = require("../../services/validation_schema");
const AdmissionRegistration = require("../../template/AdmissionRegistration");
const sendMessage = require("../../services/sendEmail");

const createRegisterUser = async (req, res, next) => {
  try {
    const result = await registerValidation.validateAsync(req.body);
    const {
      name,
      dateOfBirth,
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
    } = result;

    const userExistingEmail = await RegisterUser.findOne({
      email,
    });
    if (userExistingEmail) {
      throw new Error(`${email} is already exist. Please login.`);
    }
    const RegisterUserExistingEmail = await RegisterUser.findOne({
      email,
    });
    if (RegisterUserExistingEmail) {
      throw new Error(`${email} is already exist. Please login.`);
    }

    const User = new RegisterUser({
      name,
      dateOfBirth,
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
    });

    await User.save();
    await sendMessage.sendEmail2(
      ["chairmanifa@gmail.com"],
      "Admission Registration",
      AdmissionRegistration(User)
    );
    res.status(200).json({
      message: " User Registered successfully",
      success: true,
      status: 200,
    });
  } catch (error) {
    console.log("error: ", error);
    next(error);
  }
};

module.exports = createRegisterUser;
