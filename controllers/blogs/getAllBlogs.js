const Blog = require("../../models/Blog.model");

const getAllBlogs = async (req, res, next) => {
  const startIndex = parseInt(req.query.startIndex) || 0;
  const viewSize = parseInt(req.query.viewSize) || 5;
  const searchCriteria = {};

  if (req.query.keyword) {
    searchCriteria["$or"] = [
      { title: { $regex: `^${req.query.keyword}`, $options: "i" } },
    ];
  }
  if (req.query.category) {
    searchCriteria["$and"] = [
      { category: { $regex: req.query.category, $options: "i" } },
    ];
  }

  try {
    const blogs = await Blog.find(searchCriteria)
      .skip(startIndex)
      .limit(viewSize)
      .sort({ createdAt: -1 });
    const count = await Blog.find(searchCriteria).count();

    res.json({
      success: true,
      message: "Blogs fetched successfully",
      blogs,
      count: blogs?.filter((item) => item !== req.query.keyword).length,
      totalCount: count,
    });
  } catch (error) {
    console.log("error: ", error);
    next(error);
  }
};

module.exports = getAllBlogs;
