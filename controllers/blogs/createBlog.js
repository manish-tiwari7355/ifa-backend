// const createError = require("http-errors");
// const Product = require("../../models/Product.model");
const Blog = require("../../models/Blog.model");
const { blogValidation } = require("../../services/validation_schema");
const uploadFiles = require("../../services/upload-files");
const formidable = require("formidable");
const createBlog = async (req, res, next) => {
  console.log("req", req);
  const form = new formidable.IncomingForm();
  const { user } = req;
  form.multiples = true;
  form.parse(req, async (err, fields, files) => {
    if (err) {
      next(err);
    }

    try {
      const result = await blogValidation.validateAsync(fields);
      const { title, category, description, name, date, altDescription } =
        result;
      const filesArray = Object.values(files);
      console.log(files);
      let allFileUploadedArray = [];
      if (Object.keys(files)?.length > 0) {
        if (filesArray[0]?.length === undefined) {
          allFileUploadedArray = await Promise.all(
            filesArray?.map(async (item) => {
              // console.log(item, "item");
              let location = item.path;
              const originalFileName = item.name;
              const fileType = item.type;
              // uploads file.
              const data = await uploadFiles.upload(
                location,
                originalFileName,
                `gifts/${user._id}`
              );
              return {
                url: data.Location,
                type: fileType,
              };
            })
          );
        } else if (filesArray[0]?.length > 0) {
          allFileUploadedArray = await Promise.all(
            filesArray[0]?.map(async (item) => {
              console.log(item.path, "item");
              let location = item?.path;
              const originalFileName = item?.name;
              const fileType = item?.type;
              // uploads file.
              const data = await uploadFiles.upload(
                location,
                originalFileName,
                `ifa/category/${user._id}`
              );

              return {
                url: data.Location,
                type: fileType,
              };
            })
          );
        }
      }

      const blog = await Blog.create({
        title,
        description,
        category,
        name,
        date,
        altDescription,
      });

      if (allFileUploadedArray) {
        blog.media = allFileUploadedArray;
      }
      await blog.save();
      res.json({
        success: true,
        status: 200,
        message: "Blogs created successfully",
        blog,
      });
    } catch (error) {
      next(error);
    }
  });
};

module.exports = createBlog;
