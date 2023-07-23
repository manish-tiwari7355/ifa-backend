const Joi = require("joi");

const registerValidation = Joi.object({
  name: Joi.string().required(),
  dateOfBirth: Joi.date(),
  fatherName: Joi.string().required(),
  fatherOccupation: Joi.string().required(),
  motherName: Joi.string().required(),
  motherOccupation: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string(),
  telephoneNumber: Joi.string().allow(""),
  permanentAddress: Joi.string().required(),
  admissionSought: Joi.allow(),
  presentlyStudying: Joi.allow(),
  currentSchool: Joi.allow(),
  currentBoard: Joi.allow(),
  remark: Joi.string().allow(""),
  freshAdmission: Joi.boolean().required(),
});

const updateProspectValidation = Joi.object({
  status: Joi.string().required(),
  rejectionCause: Joi.string().allow(""),
});
const categoryValidation = Joi.object({
  name: Joi.string().required(),
  slug: Joi.string().required(),
  description: Joi.string().required(),
  image: Joi.string(),
  parent: Joi.string(),
  children: Joi.array(),
  subCategory: Joi.array(),
});
const contactUsValidation = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  phone: Joi.string().required(),
  address: Joi.string().required(),
  email: Joi.string().email().required(),
  message: Joi.string().required(),
});
const jobApplicationValidation = Joi.object({
  name: Joi.string().required(),
  fathersName: Joi.string().required(),
  qualifications: Joi.string().required(),
  experience: Joi.string().required(),
  phone: Joi.number().required(),
  message: Joi.string().required(),
  email: Joi.string().email().required(),
});

const productValidation = Joi.object({
  name: Joi.string().required(),
  price: {
    wholesaler_price: Joi.number().required(),
    retailer_price: Joi.number().required(),
    distributor_price: Joi.number().required(),
  },
  description: Joi.string().required(),
  shipping_details: {
    weight: Joi.number().required(),
    height: Joi.number().required(),
    width: Joi.number().required(),
    depth: Joi.number().required(),
  },
  category: Joi.array(),
  orders: Joi.number().required(),
  inventory: Joi.number().required(),
  sku: Joi.string().required(),
});

const updateUserPrivacyValidation = Joi.object({
  is_private: Joi.boolean(),
});

const loginValidation = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(2).required(),
});

const emailValidation = Joi.object({
  email: Joi.string().email().lowercase().required(),
});

const passwordValidation = Joi.object({
  password: Joi.string().min(2).required(),
});

const createPostValidation = Joi.object({
  name: Joi.string().allow("").optional(),
  price: Joi.number(),
  mentions: Joi.string(),
  media_type: Joi.string().valid("image", "video", "audio", "text").required(),
  type: Joi.string().valid("open", "subscription", "premium").required(),
  is_highlight: Joi.boolean(),
  thumbnail: Joi.any(),
});

const postRatingValidation = Joi.object({
  rating: Joi.number().greater(0).less(6).required(),
});

const createMessageGroupValidation = Joi.object({
  usersList: Joi.array(),
  type: Joi.string().valid("single", "group").required(),
  name: Joi.string().min(3).max(30),
  description: Joi.string().min(2).max(1000),
});

const createFollowRequestUpdateValidation = Joi.object({
  status: Joi.string().valid("accepted", "rejected").required(),
});

const getMessageGroupValidation = Joi.object({
  sender: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
  receiver: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
});

const getPostsStatsValidation = Joi.object({
  id: Joi.string().required(),
});

const newsValidation = Joi.object({
  name: Joi.string().required(),
  type: Joi.string(),
  description: Joi.string().required(),
});
const newMessageValidation = Joi.object({
  conversationId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
  type: Joi.string().valid("image", "video", "audio", "text").required(),
  message: Joi.string().required(),
  sender: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
});

const newNotificationValidation = Joi.object({
  actor: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
  verb: Joi.string()
    .valid(
      "post",
      "rate",
      "comment",
      "follow-request",
      "follow-accept",
      "post-mention"
    )
    .required(),
  object: Joi.string().required(),
  receiver: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
});

const createGiftValidation = Joi.object({
  name: Joi.string().required(),
  cost: Joi.number().required(),
});
const paymentTypeValidation = Joi.object({
  type: Joi.string().required(),
  price: Joi.number().required(),
});
const blogValidation = Joi.object({
  title: Joi.string().required(),
  category: Joi.string().required(),
  description: Joi.string().required(),
  name: Joi.string().required(),
  date: Joi.date().required(),
  altDescription: Joi.string().allow(""),
});
const awardValidation = Joi.object({
  title: Joi.string().required(),
  date: Joi.date().required(),
  type: Joi.string().required(),
  year: Joi.number().required(),
  description: Joi.string().required(),
});

module.exports = {
  registerValidation,
  loginValidation,
  updateProspectValidation,
  newsValidation,
  productValidation,
  contactUsValidation,
  jobApplicationValidation,
  blogValidation,
  awardValidation,
};
