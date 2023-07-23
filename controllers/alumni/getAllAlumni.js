const createError = require("http-errors");
const { ObjectId } = require("mongoose").Types;

const Alumni = require("../../models/Alumni.model");

const getAllAlumni = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const viewSize = parseInt(req.query.viewSize) || 10;
    const searchCriteria = {};

    if (req.query.keyword) {
      searchCriteria["$and"] = [
        {
          name: { $regex: `^${req.query.keyword.trim()}`, $options: "i" },
        },
      ];
    }
    const data = await Alumni.aggregate([
      {
        $match: searchCriteria,
      },
      {
        $facet: {
          count: [{ $count: "totalCount" }],
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
    const totalCount = await Alumni.countDocuments(searchCriteria)

    if (!data) throw createError.BadRequest("Alumni form not found");
    res.status(200).json({
      success: true,
      count:data.length,
      totalCount,
      data: data[0].data,
      total: data[0].count[0] ? data[0].count[0].total : 0,
    });
  } catch (error) {
    console.log("error: ", error);
    next(error);
  }
};


module.exports = getAllAlumni;
