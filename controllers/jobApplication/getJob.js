const Job = require("../../models/JobApplications.model");

const getJob = async (req, res, next) => {
  const startIndex = parseInt(req.query.startIndex) || 0;
  const viewSize = parseInt(req.query.viewSize) || 10;
  const searchCriteria = {};

  if (req.query.keyword) {
    searchCriteria["$or"] = [
      {
        name: { $regex: `^${req.query.keyword}`, $options: "i" },
      },
    ];
  }
  try {
    const jobs = await Job.aggregate([
      { $match: searchCriteria },
      {
        $facet: {
          count: [
            {
              $count: "total",
            },
          ],

          data: [
            {
              $sort: {
                createdAt: -1,
              },
            },
            {
              $skip: startIndex,
            },
            {
              $limit: viewSize,
            },
          ],
        },
      },
    ]);

    res.json({
      success: true,
      message: "Jobs fetched successfully",
      jobs: jobs?.[0]?.data,
      totalJobs: jobs[0].count[0].total,
    });
  } catch (error) {
    console.log("error: ", error);
    next(error);
  }
};

module.exports = getJob;
