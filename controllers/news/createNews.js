const createError = require("http-errors");
const News = require("../../models/News.model");
const { newsValidation } = require("../../services/validation_schema");
const uploadFiles = require("../../services/upload-files");
const formidable = require("formidable");
const createNews = async (req, res, next) => {
  const form = new formidable.IncomingForm();
  form.multiples = true;
  form.parse(req, async (err, fields, files) => {
    if (err) {
      next(err);
    }
    console.log(JSON.stringify(files), "files");
    try {
      const result = await newsValidation.validateAsync(fields);
      const { name, description, type } = result;

      // const filesArray = Object.values(files);
      // filesArray?.map(async (item) => {
      //   let location = item.path;
      //   const originalFileName = item.name;
      //   const fileType = item.type;
      //   // uploads file.
      //   const data = await uploadFiles.upload(
      //     location,
      //     originalFileName,
      //     `users/${userId}/posts`
      //   );
      // });

      const news = new News({
        name,
        description,
        type,
        addedBy: req.user._id,
      });
      await news.save();
      res.json({
        success: true,
        message: "News added successfully",
        data: news,
      });
    } catch (error) {
      console.log("error: ", error);
      next(error);
    }
  });
};

module.exports = createNews;
