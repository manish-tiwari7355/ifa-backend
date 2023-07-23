const createError = require("http-errors");
const News = require("../../models/News.model");
const updateNews = async (req, res, next) => {
  try {
    const { id } = req.params;
    const news = await News.findOneAndUpdate(
      { _id: id },
      {
        name: req.body.name,

        description: req.body.description,
      },
      { new: true }
    );
    res.json({
      success: true,
      message: "News updated successfully",
      data: news,
    });
  } catch (error) {
    console.log("error: ", error);
    next(error);
  }
};

module.exports = updateNews;
