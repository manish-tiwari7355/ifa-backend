const createError = require("http-errors");
const News = require("../../models/News.model");
const deleteNews = async (req, res, next) => {
  try {
    const { id } = req.params;
    const news = await News.findOne({ _id: id });
    if (!news) {
      throw createError(404, "news not found");
    }
    await news.remove();

    res.json({
      success: true,
      message: "news deleted successfully",
    });
  } catch (error) {
    console.log("error: ", error);
    next(error);
  }
};

module.exports = deleteNews;
