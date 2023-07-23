const Blog = require("../../models/Blog.model");

const getSingleBlog = async (req, res, next) => {
  try {
    const { blogId } = req.params;
    const blog = await Blog.findOne({ _id: blogId });
    res.status(200).json({
      message: "success",
      blog,
    });
  } catch (error) {
    console.log("error: ", error);
    next(error);
  }
};

module.exports = getSingleBlog;
