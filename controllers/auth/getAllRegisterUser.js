const createError = require("http-errors");

const RegisterUser = require("../../models/RegisterUser.model");
const { registerValidation } = require("../../services/validation_schema");
const getAllRegisterUser = async (req, res, next) => {
  const searchCriteria = {};
  const startIndex = parseInt(req.query.startIndex) || 0;
  const viewSize = parseInt(req.query.viewSize) || 10;

  if (req.query.keyword) {
    searchCriteria["$or"] = [
      {
        name: { $regex: `^${req.query.keyword}`, $options: "i" },
      },
    ];
  }

  try {
    const { id } = req.params;
    const registerUser = await RegisterUser.aggregate([
      { $match: searchCriteria },
      {
        $facet: {
          count: [
            {
              $count: "total",
            },
          ],

          data: [
            {
              $sort: {
                createdAt: -1,
              },
            },
            {
              $skip: startIndex,
            },
            {
              $limit: viewSize,
            },
          ],
        },
      },
    ]);
    if (!registerUser) {
      return next(createError(404, "User not found"));
    }
    res.status(200).json({
      message: "success",
      registerUser,
      totalCount: registerUser[0]?.count[0]?.total,
    });
  } catch (error) {
    console.log("error: ", error);
    next(error);
  }
};

module.exports = getAllRegisterUser;
