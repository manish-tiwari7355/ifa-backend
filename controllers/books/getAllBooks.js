const uploadFiles = require("../../services/upload-files");
const Books = require("../../models/Books.model");
const formidable = require("formidable");
const createError = require("http-errors");

const getAllBooks = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const viewSize = parseInt(req.query.viewSize) || 100;
    const searchCriteria = {};

    console.log("req.query.keyword", req.query.keyword);
    if (req.query.keyword) {
      searchCriteria["$and"] = [
        {
          title: { $regex: `^${req.query.keyword.trim()}`, $options: "i" },
        },
      ];
    }
    const data = await Books.aggregate([
      {
        $match: searchCriteria,
      },
      {
        $facet: {
          count: [{ $count: "totalCount" }],
          data: [
            {
              $skip: startIndex,
            },
            {
              $limit: viewSize,
            },
            {
              $group: {
                _id: "$classes",
                data: {
                  $addToSet: {
                    _id: "$_id",
                    bookName: "$bookName",
                    subject: "$subject",
                    publisher: "$publisher",
                    media:"$media"
                  },
                },
              },
            },
            // {
            //   $sort: {
            //     classes: 1,
            //   },
            // },
          ],
        },
      },
    ]);
    console.log(data, "lll");
    const manish = data[0]?.data?.sort((a, b) => {
      return a._id.split(" ")[1] - b._id.split(" ")[1];
    });

    console.log("manish", manish);
    const totalCount = await Books.countDocuments(searchCriteria);

    if (!data) throw createError.BadRequest("Notice Board not found");
    res.status(200).json({
      success: true,
      count: data.length,
      totalCount,
      data,
      total: data[0].count[0] ? data[0].count[0].total : 0,
    });
  } catch (error) {
    console.log("error: ", error);
    next(error);
  }
};

module.exports = getAllBooks;
