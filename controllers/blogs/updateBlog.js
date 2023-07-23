const Blog = require("../../models/Blog.model");
const { blogValidation } = require("../../services/validation_schema");
const uploadFiles = require("../../services/upload-files");
const formidable = require("formidable");
const { ObjectId } = require("mongoose").Types;
const updateBlog = async (req, res, next) => {
  const { user } = req;
  // console.log(req, "req");
  // form.multiples = true;
  // form.parse(req, async (err, fields, files) => {
  //   if (err) {
  //     next(err);
  //   }
  try {
    const { blogId } = req.params;
    const form = new formidable.IncomingForm();
    form.multiples = true;
    form.parse(req, async (err, fields, files) => {
      if (err) {
        res.status(400);
        res.send(err);
      }
      let { title, category, description, name, date, altDescription } = fields;
      let allFileUploadedArray = [];

      if (!!files?.media === true) {
        const updatedfiles =
          !!files?.media === true &&
          files?.media?.length > 0 &&
          files?.media?.map((i) => Object.assign(i));

        const filesArray = !updatedfiles
          ? [Object.assign(files?.media)]
          : updatedfiles;

        if (updatedfiles?.length > 1) {
          allFileUploadedArray = await Promise.all(
            updatedfiles?.map(async (item) => {
              let location = item.path;
              const originalFileName = item.name;
              const fileType = item.type;
              const data = await uploadFiles.upload(
                location,
                originalFileName,
                `ifa/blogs`
              );
              return {
                url: data.Location,
                type: fileType,
              };
            })
          );
        } else if (!updatedfiles) {
          allFileUploadedArray = await Promise.all(
            filesArray?.map(async (item) => {
              let location = item.path;
              const originalFileName = item.name;
              const fileType = item.type;
              const data = await uploadFiles.upload(
                location,
                originalFileName,
                `ifa/blogs`
              );

              return {
                url: data.Location,
                type: fileType,
              };
            })
          );
        }
      }
      const blog = await Blog.findOneAndUpdate(
        { _id: ObjectId(blogId) },
        {
          title,
          description,
          category,
          name,
          date,
          altDescription,
        },
        {
          new: true,
        }
      );

      if (allFileUploadedArray?.length > 0 && !!allFileUploadedArray) {
        blog.media = allFileUploadedArray;
      }

      await blog.save();
      res.json({
        success: true,
        status: 200,
        message: "Blogs updated successfully",
        blog,
      });
    });
  } catch (error) {
    console.log(error, "error");
    next(error);
  }
};
module.exports = updateBlog;
