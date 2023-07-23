const createError = require("http-errors");
const JobApplication = require("../../models/JobApplications.model");
const uploadFiles = require("../../services/upload-files");
const formidable = require("formidable");
const sendMessage = require("../../services/sendEmail");
const AppliedJobs = require("../../template/AppliedJobs");
const JobAppliedByUser = require("../../template/JobAppliedByUser");

const {
  jobApplicationValidation,
} = require("../../services/validation_schema");

const createJob = async (req, res, next) => {
  const form = new formidable.IncomingForm();
  form.multiples = true;
  form.parse(req, async (err, fields, files) => {
    if (err) {
      next(err);
    }

    try {
      const result = await jobApplicationValidation.validateAsync(fields);
      const {
        name,
        fathersName,
        qualifications,
        experience,
        message,
        email,
        phone,
      } = result;
      const filesArray = Object.values(files);

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
                `ifa/jobs`,
                null,
                fileType
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
                `ifa/jobs`,
                null,
                fileType
              );

              return {
                url: data.Location,
                type: fileType,
              };
            })
          );
        }
      }

      const job = new JobApplication({
        name,
        fathersName,
        qualifications,
        experience,
        message,
        email,
        phone,
      });

      if (allFileUploadedArray) {
        job.media = allFileUploadedArray;
      }

      await sendMessage.sendEmail(
        [email],
        "Job Application",
        AppliedJobs(job),
        job.media[0]?.url,
        allFileUploadedArray[0]?.type
      );
      await sendMessage.sendEmail2(
        [email],
        "Job Application",
        JobAppliedByUser(job)
      );
      await job.save();

      res.json({
        success: true,
        status: 200,
        message: "Jobs created successfully",
        job,
      });
    } catch (error) {
      next(error);
    }
  });
};

module.exports = createJob;
