const createError = require("http-errors");
const News = require("../../models/News.model");
const { ObjectId } = require("mongoose").Types;
const getSingleNews = async (req, res, next) => {
  try {
    const { id } = req.params;
    // const product = await Product.findOne({ _id: id });
    const news = await News.aggregate([
      {
        $match: {
          _id: ObjectId(id),
        },
      },
    ]);
    if (!news) {
      throw createError(404, "News not found");
    }
    res.json({
      success: true,
      message: "News fetched successfully",
      data: news[0],
    });
    1;
  } catch (error) {
    console.log("error: ", error);
    next(error);
  }
};

module.exports = getSingleNews;
