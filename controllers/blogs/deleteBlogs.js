const { ObjectId } = require("mongoose").Types;
const Blog = require("../../models/Blog.model");

const deleteBlogs = async (req, res, next) => {
  try {
    const { blogId } = req.params;
    await Blog.findOneAndDelete({ _id: ObjectId(blogId) });

    res.status(200).json({
      message: "Blog deleted successfully",
    });
  } catch (error) {
    console.log("error: ", error);
    next(error);
  }
};

module.exports = deleteBlogs;
