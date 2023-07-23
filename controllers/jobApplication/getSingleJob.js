const Job = require("../../models/JobApplications.model");

const getSingleJob = async (req, res, next) => {
  try {
    const { id } = req.params;

    const job = await Job.findOne({ _id: id });
    if (!job) {
      throw createError(404, "Job not found");
    }

    res.json({
      message: "success",
      job,
    });
  } catch (error) {
    console.log("error: ", error);
    next(error);
  }
};

module.exports = getSingleJob;
